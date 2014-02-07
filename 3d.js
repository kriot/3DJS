function Engine3d()
{
	this.can; //canvas
	this.width;
	this.height;
	this.context;
	this.Update;
	this.drawData = new Array();
	this.eye;
	this.mouse = new Point2(0,0);
	this.mat;
	this.Init = function(canID, w, h, UpdateFunc, MouseFunct,KeyFunct, eye)
	{
		this.width = w;
		this.height = h;
		this.eye = eye;
		this.can = document.getElementById(canID);
		this.can.addEventListener("mousemove", MouseFunct);
		this.context = this.can.getContext("2d");
		this.Update = UpdateFunc;
		this.LoadIdentity();
	}
	this.Redraw = function()
	{
		this.context.clearRect(0,0,this.width, this.height);
		this.context.beginPath();
		for(i = 0; i < this.drawData.length; i++)
		{
			p1 = this.Calc(this.drawData[i].p1);
			p2 = this.Calc(this.drawData[i].p2);
			this.DrawLine(p1,p2);
		}
		this.context.stroke();
	}
	this.AddLine = function(line)
	{
		this.drawData.push(line);
		return this.drawData.length-1;
	}
	this.Calc = function(p)
	{
		p2 = p.MulMatrix(this.mat);
		p2.Div(p2.w);
		return p2;
	}
	this.DrawLine = function(p1, p2)
	{
		this.context.moveTo(p1.x+this.width/2,this.height/2 - p1.y);
		this.context.lineTo(p2.x+this.width/2,this.height/2 - p2.y);
	}
	this.LoadIdentity = function()
	{
		this.mat = new Matrix();
		for(i=0;i<4;i++)
			for(j=0;j<4;j++)
				this.mat.data[i][j] = (i==j?1:0);
	}
	this.Use = function(m)
	{
		this.mat = this.mat.Mul(m);
	}
}

function Line(p1,p2)
{
	this.p1 = p1;
	this.p2 = p2;
}
function Point3(x,y,z)
{
	this.x = x;
	this.y = y;
	this.z = z;
	this.w = 1;
	this.AddPoint = function(p2)
	{
		return new Point3(this.x+p2.x, this.y+p2.y, this.z+p2.z);
	}
	this.MulMatrix = function(m)
	{
		ret = new Point3(0,0,0);
		ret.x += m.data[0][0]*this.x + m.data[1][0]*this.y + m.data[2][0]*this.z + m.data[3][0]*this.w;
		ret.y += m.data[0][1]*this.x + m.data[1][1]*this.y + m.data[2][1]*this.z + m.data[3][1]*this.w;
		ret.z += m.data[0][2]*this.x + m.data[1][2]*this.y + m.data[2][2]*this.z + m.data[3][2]*this.w;
		ret.w += m.data[0][3]*this.x + m.data[1][3]*this.y + m.data[2][3]*this.z + m.data[3][3]*this.w;
		return ret;	
	}
	this.Div = function(k)
	{
		this.x/=k;
		this.y/=k;
		this.z/=k;
		this.w/=k;
	}
}
function Point2(x,y)
{
	this.x = x;
	this.y = y;
}
function Matrix()
{
	this.data = new Array(4);
	for(i = 0;i<4;i++)
		this.data[i] = new Array(4);
	this.Mul = function(m2)
	{
		ret = new Matrix();
		for(i = 0; i< 4;i++)
			for(j = 0; j <4; j++)
			{
				ret.data[i][j] = 0;
				for(k = 0; k<4;k++)
					ret.data[i][j] += this.data[i][k]*m2.data[k][j];
			}
		return ret
	}
	this.MakeT = function(p)
	{
		this.data = [[1, 0, 0, 0],[0, 1, 0, 0], [0, 0 ,1, 0],[p.x, p.y, p.z, 1]];
	}
	this.MakeS = function(s)
	{
		this.data = [[s.x, 0, 0, 0],[0, s.y, 0, 0], [0, 0 ,s.z, 0],[0, 0, 0, 1]];
	}
	this.MakeP = function(r)
	{
		this.data = [[1, 0, 0, 0],[0, 1, 0, 0], [0, 0 , 0, r],[0, 0, 0, 1]];
	}
}

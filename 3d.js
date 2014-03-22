function Engine3d()
{
	this.can; //canvas
	this.width;
	this.height;
	this.context;
	this.Update;
	this.mouse = new Point2(0,0);
	this.mat;
	this.proj;
	this.key = new Array();
	this.ticker;
	this.kLeft = 37;
	this.kRight = 39;
	this.kUp = 38;
	this.kDown = 40;
	this.Init = function(canID, w, h, UpdateFunc, MouseFunct, KeyUp, KeyDown, fps)
	{
		this.width = w;
		this.height = h;
		this.can = document.getElementById(canID);
		window.addEventListener("mousemove", MouseFunct);
		window.addEventListener("keydown", KeyDown);
		window.addEventListener("keyup",KeyUp);
		this.context = this.can.getContext("2d");
		this.Update = UpdateFunc;
		this.LoadIdentity();
		this.ticker = setInterval(Update,1000/fps);
	}
	this.DL = function(line)
	{
		p1 = this.Calc(line.p1);
		p2 = this.Calc(line.p2);
		this.DrawLine2(p1,p2);
	}
	this.Clear = function()
	{
		this.context.clearRect(0,0,this.width, this.height);
	}
	this.Calc = function(p)
	{
		p2 = p.MulMatrix(this.mat.Mul(this.proj));
		p2.Div(p2.w);
		return p2;
	}
	this.DrawLine2 = function(p1, p2)
	{
		this.context.beginPath();
		this.context.moveTo(p1.x+this.width/2,this.height/2 - p1.y);
		this.context.lineTo(p2.x+this.width/2,this.height/2 - p2.y);
		this.context.stroke();
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
		this.mat = m.Mul(this.mat);
	}
	this.GetM = function()
	{
		return this.mat;
	}
	this.SetM = function(m)
	{
		this.mat = m;
	}
	this.DrawModel = function(mod)
	{
		var ms = this.GetM();
		for(i=0;i<mod.length;i++)
		{
			obj = mod[i];
			if(obj.type=="DL")
				this.DL(new Line(new Point3(obj.s.x,obj.s.y,obj.s.z),new Point3(obj.e.x,obj.e.y,obj.e.z)));
			if(obj.type=="MT")
			{
				var m = new Matrix();
				m.MakeT(new Point3(obj.x,obj.y,obj.z));
				this.Use(m);
			}
		}
		this.SetM(ms);
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
		for(var i = 0; i< 4;i++)
			for(var j = 0; j <4; j++)
			{
				ret.data[i][j] = 0;
				for(var k = 0; k<4;k++)
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
	this.MakeRX = function(a)
	{
		this.data = [[1,0,0,0],[0,Math.cos(a),-Math.sin(a),0],[0,Math.sin(a),Math.cos(a),0],[0,0,0,1]];
	}
	this.MakeRY = function(a)
	{
		this.data = [[Math.cos(a),0,Math.sin(a),0],[0,1,0,0],[-Math.sin(a),0,Math.cos(a),0],[0,0,0,1]];
	}
	this.MakeRZ = function(a)
	{
		this.data = [[Math.cos(a),-Math.sin(a),0,0],[Math.sin(a), Math.cos(a),0,0],[0,0,1,0],[0,0,0,1]];
	}
}

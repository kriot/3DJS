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
	this.view = new Point3(0,0,0);
	this.viewangle = 0;
	this.Init = function(canID, w, h, UpdateFunc, MouseFunct,KeyFunct, eye)
	{
		this.width = w;
		this.height = h;
		this.eye = eye;
		this.can = document.getElementById(canID);
		this.can.addEventListener("mousemove", MouseFunct);
		this.context = this.can.getContext("2d");
		this.Update = UpdateFunc;
	}
	this.Redraw = function()
	{
		this.context.clearRect(0,0,this.width, this.height);
		this.context.beginPath();
		for(i = 0; i < this.drawData.length; i++)
		{
			this.DrawLine(this.Projection(this.drawData[i].p1.AddPoint(this.view)), this.Projection(this.drawData[i].p2.AddPoint(this.view)));
		}
		this.context.stroke();
	}
	this.AddLine = function(line)
	{
		this.drawData.push(line);
		return this.drawData.length-1;
	}
	this.DrawLine = function(p1, p2)
	{
		this.context.moveTo(p1.x+this.width/2,this.height/2 - p1.y);
		this.context.lineTo(p2.x+this.width/2,this.height/2 - p2.y);
	}
	this.Projection = function(p)
	{
		return new Point2(p.x*this.eye/(this.eye+p.z), p.y*this.eye/(this.eye+p.z));
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
	this.AddPoint = function(p2)
	{
		return new Point3(this.x+p2.x, this.y+p2.y, this.z+p2.z);
	}
}
function Point2(x,y)
{
	this.x = x;
	this.y = y;
}

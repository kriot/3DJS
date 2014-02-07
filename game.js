document.addEventListener("DOMContentLoaded", Load);
var eng;
var l;
function Load()
{
	eng = new Engine3d();
	eng.Init("canv", 640, 480, Update,Mouse,Kbd,1000);
	for(i = 0;i< 10;i++)
	{
		eng.AddLine(new Line(new Point3(i*10,-20,0), new Point3(i*10, -20, 2000)));
	}
	eng.AddLine(new Line(new Point3(50,50,0), new Point3(50, 50, 200)));
	setInterval(Update, 1000/20);
}

function Update()
{
	eng.LoadIdentity();
	mt = new Matrix();
	mt.MakeT(new Point3(50,50,50));
	ms = new Matrix();
	ms.MakeS(new Point3(2,2,2));
	mp = new Matrix();
	mp.MakeP(1/1000);
	eng.Use(mp);
	//eng.Use(ms);
	//eng.Use(mt);
	for(i = 0;i<10;i++)
	{
		eng.drawData[i].p1.y = -eng.mouse.y/4;
		eng.drawData[i].p2.y = -eng.mouse.y/4;
	}
//	eng.drawData[l].p2.x++;
	eng.Redraw();
}
function Mouse(event)
{
	eng.mouse = new Point2(event.clientX, event.clientY);
}
function Kbd()
{
}

document.addEventListener("DOMContentLoaded", Load);
var eng;
var l;
function Load()
{
	eng = new Engine3d();
	eng.Init("canv", 640, 480, Update,Mouse,Kbd,1000);
	setInterval(Update, 1000/20);
}

function Update()
{
	eng.LoadIdentity();
	eng.Clear();
	mt = new Matrix();
	mt.MakeT(new Point3((eng.mouse.x-500)/4,(500-eng.mouse.y)/4,1));
	//mt.MakeT(new Point3(0,0,0));
	ms = new Matrix();
	ms.MakeS(new Point3(2,2,2));
	mp = new Matrix();
	mp.MakeP(1/100);
	eng.Use(mt);
	eng.Use(mp);
	for(i = 0;i< 10;i++)
	{
		eng.DL(new Line(new Point3(i*10,-20,0), new Point3(i*10, -20, -2000)));
	}
	eng.LoadIdentity();
	mt2 = new Matrix();
	mt2.MakeT(new Point3(100,100,-100));
	eng.Use(mt2);
	eng.Use(mp);
	for(i = 0;i< 10;i++)
	{
		eng.DL(new Line(new Point3(i*10,-20,200), new Point3(i*10, -20, -2000)));
	}
	eng.LoadIdentity();
	eng.DL(new Line(new Point3(0,0,0), new Point3(0,10,0)));
	//eng.Use(ms);
	//eng.Use();
}
function Mouse(event)
{
	eng.mouse = new Point2(event.clientX, event.clientY);
}
function Kbd()
{
}

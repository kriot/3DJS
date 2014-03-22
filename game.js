document.addEventListener("DOMContentLoaded", Load);
var eng;
var l;
var x = 0;
var roty = 0;
function Load()
{
	eng = new Engine3d();
	eng.Init("canv", 640, 480, Update,Mouse,KeyUp,KeyDown,30);
}

function Update()
{
	if(eng.key[eng.kLeft])
		x--;
	if(eng.key[eng.kRight])
		x++;
	if(eng.key[eng.kUp])
		roty+=0.01;
	if(eng.key[eng.kDown])
		roty-=0.01;
	eng.LoadIdentity();
	eng.Clear();
	mt = new Matrix();
	mt.MakeT(new Point3(x,(500-eng.mouse.y)*4,1));
	mt1 = new Matrix();
	mt2 = new Matrix();
	mt3 = new Matrix();
	mt1.MakeT(new Point3(0,0,10000));
	mt2.MakeT(new Point3(0,0,-10000));
	mt3.MakeT(new Point3(0,0,5000));
	//mt.MakeT(new Point3(0,0,0));
	ms = new Matrix();
	ms.MakeS(new Point3(2,2,2));
	mp = new Matrix();
	mp.MakeP(1/500);
	eng.proj = mp;
	mr = new Matrix();
	mr.MakeRZ(eng.mouse.x/100);
	mry = new Matrix();
	mry.MakeRY(roty);
	eng.Use(mt1);
	eng.Use(mry);
	eng.Use(mt2);
	eng.Use(mt);
	eng.Use(mr);
	eng.Use(mt3);
	for(var i = 0;i< 10;i++)
	{
		eng.DL(new Line(new Point3(i*100,0,0), new Point3(i*100, 0, 8000)));
	}
	eng.DL(new Line(new Point3(0,0,0), new Point3(0,10,0)));
	tm = eng.GetM();
//	alert("olo");
	DrawPG(5,1000);
	eng.SetM(tm);
	/*
	eng.LoadIdentity();
	mt2 = new Matrix();
	mt2.MakeT(new Point3(100,100,-100));
	eng.Use(mt2);
	eng.Use(mp);
	for(i = 0;i< 10;i++)
	{
		eng.DL(new Line(new Point3(i*10,-20,200), new Point3(i*10, -20, -2000)));
	}*/
	eng.LoadIdentity();
	eng.DL(new Line(new Point3(0,0,0), new Point3(0,10,0)));
	//eng.Use(ms);
	//eng.Use();
}
function Mouse(event)
{
	eng.mouse = new Point2(event.clientX, event.clientY);
}
function KeyDown(event)
{
	eng.key[event.keyCode] = true;
}
function KeyUp(event)
{
	eng.key[event.keyCode] = false;
}
function DrawPG(n,r)
{
	var OLM = new Matrix();
	OLM.MakeRZ(2*Math.PI/n);
	for(var i=0;i<n;i++)
	{
		eng.DL(new Line(new Point3(0,0,0),new Point3(r,0,0)));
		eng.Use(OLM);
	}
}

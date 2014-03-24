3DJS
====

The contents:
 - The aim of the project
 - Stutures that are used
 - User guide
 - Developer guide
 - References

====
##The aim of the project

This is a simple library, that may be used for small application like as micro-games. It provides all needs to make simple 3D griphics (but without texture rendering) and some input interfaces.
All operations are made by 4x4 matrix.

It works on mobile platforms!

It helps you to understand how does OpenGL and XNA DirectX work.
##Data stuctures, algorithms and math analysis

The main idea of the project is using matrices to make any tranformations with points (or vectors). 

###How it works
Let all points are 4 demention vectors (x,y,z,1).
Let A is a transformations matrix (it may be translation, scale, rotation round X, Y or Z axis)
So all we need to make this operation with this vector is multiply our vector by this matrix.
We are able to make composition of matrices my multiplicte those.
In the end, we should multiplicate vector for projection matrix and normalize w (the lastest coordinate). We use 4x4 matrices only to have a possile make this operation.
Now we can draw line above two points on a 2d screen. (It's correct because 3d line goes to a line in one point projection)

Using matrices is good idea because it's simply (in comparsion with other methods) and fast. We can save now using matrix or load identity to normalize basics.

##The user guide
Standart user interface looks like white rectangle (white canvas). Thera may be some lines that are drown by developer's code. Standart user interaface doesn't provide any menus and buttons. It'a able to caught your mouse and/or keyboard.
You have to ask the program developer of any instructions and guides.
 
##The developer guide
###Linking
Firstly, it's nessesury to link 3d.js: in your .html file
```html
<script src="3d.js"></script>
```
###Initializing
Add to your DOContentLoaded method:
```js
eng = new Engine3D();
eng.Init("canv",640,480,Update,Mouse,KeyUp,KeyDown,30); //"canv" - ID of your canvas html5 element, 640,480 - resolution of canvas, Update,Mouse,KeyUp,KeyDown - event handlers, 30 - it's fps that you want.
```
Now you have to declare these event handlers (funcitons). Typical declaration:
```js
function Mouse(event)
{
	eng.mouse = new Point2(event.clientX, event.clientY); // we have to save actual mouse position
}
function KeyDown(event) // 
{
	eng.key[event.keyCode] = true; 
}
function KeyUp(event)
{
	eng.key[event.keyCode] = false;
}
``` 
You don't have to change these functions, it's the most useful version.
And ```Update``` you have to change - it contains logic of your application. It runs every time frame updates (in the best way, with fps you have declared)
###Realtime processing 
Examle of Update function:
```js
function Update()
{
	eng.LoadIdentity();
	eng.Clear();
	mp = new Matrix();
	mp.MakeP(1/500); // 1/500 - factor of projection. 
	eng.proj = mp;
	//here your code. Look down for comments.
}
```
"Here your code", but what I should write? What I am able to use?
* ```var m = new Matrix();``` - generates new matrix
* ```m.MakeT(p3);``` - makes matrix of Translation for p3 vector (```new Point3(x,y,z)```)
* ```m.MakeS(p3);``` makes matrix of scale for p3 vector (usualy uses x=y=z)
* ```m.MakeRX(a)``` - makes matrix of rotation round X axis
* ```m.MakeRY(a)``` - makes matrix of rotation round Y axis
* ```m.MakeRZ(a)``` - makes matrix of rotation round Z axis
* ```m.MakeP(k)``` - make matrix of projection
* ```Use(m)``` - applyes matrix m to now using matrix
* ```GetM()``` - return current matrix
* ```SetM(m)``` - sets currnt matrix
* ```DL(line)``` - draws line
* ```new Line(p3_1,p3_2)``` - makes new line from p3_1 to p3_2
###Examle
Examle of using: 3D Cube, that rotates with your mouse [GitHub Projcet](http://github.com/kriot/3DCube/)
##Refereces
####Math:
http://open.gl/transformations
http://en.wikipedia.org/wiki/Matrix_(mathematics)
####Realization:
http://www.w3schools.com/html/html5_canvas.asp
http://en.wikipedia.org/wiki/Microsoft_XNA - style of the system
####Inspired by:
http://www.opengl.org/

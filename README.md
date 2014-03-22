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

##The developer guide

##Refereces


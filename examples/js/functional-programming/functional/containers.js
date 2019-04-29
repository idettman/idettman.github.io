'use strict';

const Container = function Container (x)
{
	this.__value = x;
}

Container.of = function of (x)
{
	return new Container(x);
}

Container.prototype.map = function map (f)
{
	return new Container.of(f(this.__value));
}
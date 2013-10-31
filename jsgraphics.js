//Helper function to let you save the contents of the canvas
function downloadImg(){
  var dataURL = canvas.toDataURL();
  window.location = dataURL;
}


//Rounded rectangle helper
CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, radius) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  this.beginPath();

  var r = x + w;
  var b = y + h;
  this.moveTo(x+radius, y);
  this.lineTo(r-radius, y);
  this.quadraticCurveTo(r, y, r, y+radius);
  this.lineTo(r, y+h-radius);
  this.quadraticCurveTo(r, b, r-radius, b);
  this.lineTo(x+radius, b);
  this.quadraticCurveTo(x, b, x, b-radius);
  this.lineTo(x, y+radius);
  this.quadraticCurveTo(x, y, x+radius, y);

  return this;
}

CanvasRenderingContext2D.prototype.circle = function (x, y, radius) {
  this.arc(x, y, radius, 0, 2*Math.PI, false);
  return this;
}

CanvasRenderingContext2D.prototype.line = function (x1, y1, x2, y2) {
  this.moveTo(x1,y1);
  this.lineTo(x2,y2);
  return this;
}

CanvasRenderingContext2D.prototype.ellipse = function (left, top, width, height) {

  var kappa = 0.5522848, // 4 * ((√(2) - 1) / 3)
        xDis = width/2,
        yDis = height/2,
        x = left + xDis,
        y = top + yDis,
        ox = xDis * kappa,  // control point offset horizontal
        oy = yDis * kappa,  // control point offset vertical
        xe = x + xDis,      // x-end
        ye = y + yDis;      // y-end

    this.moveTo(x - xDis, y);
    this.bezierCurveTo(x - xDis, y - oy, x - ox, y - yDis, x, y - yDis);
    this.bezierCurveTo(x + ox, y - yDis, xe, y - oy, xe, y);
    this.bezierCurveTo(xe, y + oy, x + ox, ye, x, ye);
    this.bezierCurveTo(x - ox, ye, x - xDis, y + oy, x - xDis, y);

  return this;
}

CanvasRenderingContext2D.prototype.fillCanvas = function () {
	ctx.beginPath();
	var orig = ctx.fillStyle;
  ctx.fillStyle="white";
  ctx.rect(0,0,ctx.canvas.width, ctx.canvas.height);
  ctx.fill()
	ctx.fillStyle = orig;
}

CanvasRenderingContext2D.prototype.clipEllipse = function () {
  //Go black out the corners
  var oldStyle = this.fillStyle;
  this.fillStyle = "black";


  //Compute out quadratic points
  var kappa = 0.5522848, // 4 * ((√(2) - 1) / 3)
        x = this.canvas.width/2,
        y = this.canvas.height/2,
        ox = x * kappa,  // control point offset horizontal
        oy = y * kappa  // control point offset vertical


  //UL
  this.beginPath();
  this.moveTo(0, 0);
  this.lineTo(0, y);
  this.bezierCurveTo(0, y - oy, x - ox, 0, x, 0);
  this.closePath();
  this.fill();
  //UR
  this.beginPath();
  this.moveTo(x*2, 0);
  this.lineTo(x, 0);
  this.bezierCurveTo(x + ox, 0, x*2, y - oy, x*2, y);
  this.closePath();
  this.fill();
  //BR
  this.beginPath();
  this.moveTo(x*2, y*2);
  this.lineTo(x*2, y);
  this.bezierCurveTo(x*2, y + oy, x + ox, y*2, x, y*2);
  this.closePath();
  this.fill();
  //BL
  this.beginPath();
  this.moveTo(0, y*2);
  this.lineTo(x, y*2);
  this.bezierCurveTo(x - ox, y*2, 0, y + oy, 0, y);
  this.closePath();
  this.fill();

  return this;
}

function toColour(red, green, blue) {
	function pad(str){
		if(str.length < 2)
			return "0" + str;
		return str;
	}
	return "#" + pad(Math.round(red).toString(16)) + pad(Math.round(green).toString(16)) + pad(Math.round(blue).toString(16));
}

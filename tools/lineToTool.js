//a tool for drawing straight lines to the screen. Allows the user to preview
//the a line to the current mouse position before drawing the line to the 
//pixel array.
function LineToTool() {
	this.icon = "assets/lineTo.jpg";
	this.name = "LineTo";

	var startX = -1;
	var startY = -1;
	var drawing = false;
	var isActive = false;

	//draws the line to the screen 
	this.draw = function(palette) {
		if(!isActive) return;

		if (mouseIsPressed) {
			if (startX == -1) {
				startX = mouseX;
				startY = mouseY;
				drawing = true;
				loadPixels();
			} else {
				updatePixels();
				push();
				stroke(palette.foregroundColor);
				strokeWeight(this.slider.value());
				line(startX, startY, mouseX, mouseY);
				pop();
			}
		} else if (drawing) {
			let drw = {
				type: 'line',
				x1: startX,
				y1: startY,
				x2: mouseX,
				y2: mouseY,
				color: palette.foregroundColor,
				weight: this.slider.value(),
				display: function() {
					push();
					stroke(this.color);
					strokeWeight(this.weight);
					line(this.x1, this.y1, this.x2, this.y2);
					pop();
				}
			};
			drawings.push(drw);
			drawing = false;
			startX = -1;
			startY = -1;
			saveState();
		}
	};

	this.unselectTool = function() {
		drawing = false;
		startX = -1;
		startY = -1;
		isActive = false;
	};

	this.selectTool = function() {
		isActive = true;
	};

	this.strokeWeight=5;  
	this.slider=null;    
	this.populateOptions = function() {
		select(".options").style('background-color', '#333');
		
		this.label = createP("Line Weight");
		this.label.parent("optionsArea");
		this.label.style('color', '#fff');
		
		this.slider = createSlider(1, 20, 1);
		this.slider.parent("optionsArea");
	};
}

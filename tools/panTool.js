function PanTool(){
	this.icon = "assets/pan.png";
	this.name = "Pan";

	var startX = -1;
	var startY = -1;
	var isPanning = false;

	this.draw = function(){
		if(mouseIsPressed){
			if(startX == -1){
				startX = mouseX;
				startY = mouseY;
				isPanning = true;
				loadPixels();
			} else {
				// Calculate the difference in position
				let dx = mouseX - startX;
				let dy = mouseY - startY;
				
				// Update the position of all drawings
				for(let drawing of drawings){
					if(drawing.x !== undefined && drawing.y !== undefined){
						drawing.x += dx;
						drawing.y += dy;
					}
				}
				
				// Update starting position
				startX = mouseX;
				startY = mouseY;
				
				// Force redraw
				redraw();
			}
		} else {
			startX = -1;
			startY = -1;
			isPanning = false;
		}
	};

	this.mouseReleased = function() {
		startX = -1;
		startY = -1;
		isPanning = false;
	};
}

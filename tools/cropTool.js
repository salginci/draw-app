function CropTool(){
	this.icon = "assets/crop.png";
	this.name = "Crop";

	var startX = -1;
	var startY = -1;
	var isCropping = false;
	var isActive = false;

	this.draw = function(){
		if(!isActive) return;

		if(mouseIsPressed){
			if(startX == -1){
				startX = mouseX;
				startY = mouseY;
				isCropping = true;
				loadPixels();
			} else {
				// Draw crop rectangle preview
				updatePixels();
				push();
				noFill();
				stroke(255, 0, 0);  // Red outline for better visibility
				strokeWeight(2);
				setLineDash([5, 5]);
				rect(startX, startY, mouseX - startX, mouseY - startY);
				pop();
			}
		} else if(isCropping){
			// Perform crop when mouse is released
			let x = min(startX, mouseX);
			let y = min(startY, mouseY);
			let w = abs(mouseX - startX);
			let h = abs(mouseY - startY);
			
			// Ensure minimum crop size
			if(w < 10 || h < 10) {
				isCropping = false;
				startX = -1;
				startY = -1;
				return;
			}

			// Store current canvas content
			let currentCanvas = get();
			
			// Create new canvas with cropped size
			let newWidth = w;
			let newHeight = h;
			
			// Resize the main canvas
			resizeCanvas(newWidth, newHeight);
			
			// Clear the new canvas
			background(colourP.backgroundColour);
			
			// Draw the cropped portion
			image(currentCanvas, -x, -y);
			
			// Update drawings array to reflect new coordinates
			let croppedDrawings = [];
			for(let drawing of drawings) {
				if(drawing.type === 'image' || drawing.type === 'crop') {
					// Handle images differently
					let newDrw = {
						type: drawing.type,
						x: drawing.x - x,
						y: drawing.y - y,
						image: drawing.image,
						display: drawing.display
					};
					croppedDrawings.push(newDrw);
				} else {
					// Handle other drawings
					let newDrw = Object.assign({}, drawing);
					if(newDrw.x !== undefined) newDrw.x -= x;
					if(newDrw.y !== undefined) newDrw.y -= y;
					if(newDrw.x1 !== undefined) newDrw.x1 -= x;
					if(newDrw.y1 !== undefined) newDrw.y1 -= y;
					if(newDrw.x2 !== undefined) newDrw.x2 -= x;
					if(newDrw.y2 !== undefined) newDrw.y2 -= y;
					croppedDrawings.push(newDrw);
				}
			}
			
			// Update drawings array
			drawings = croppedDrawings;
			
			// Reset crop state
			isCropping = false;
			startX = -1;
			startY = -1;
			
			// Save state for undo
			saveState();
			
			// Force redraw
			redraw();
		}
	};

	// Helper function for dashed lines
	function setLineDash(list) {
		drawingContext.setLineDash(list);
	}

	this.unselectTool = function() {
		isCropping = false;
		startX = -1;
		startY = -1;
		isActive = false;
		// Clear any dashed line settings
		setLineDash([]);
	};

	this.selectTool = function() {
		isActive = true;
	};
}

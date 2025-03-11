function HelperFunctions() {

	//Jquery click events. Notice that there is no this. at the
	//start we don't need to do that here because the event will
	//be added to the button and doesn't 'belong' to the object

	//event handler for the clear button event. Clears the screen
	select("#clearButton").mouseClicked(function() {
		background(255, 255, 255);
		//call loadPixels to update the drawing state
		//this is needed for the mirror tool
		loadPixels();
        drawings=[];
	});

	//event handler for the save image button. saves the canvsa to the
	//local file system.
	select("#saveImageButton").mouseClicked(function() {
		saveCanvas("myPicture", "jpg");
	});

	this.downloadDrawing = function() {
		saveCanvas("myDrawing", "png");
	};

	this.importImage = function(file) {
		loadImage(file.data, img => {
			let drw = {
				type: 'image',
				x: width/2 - img.width/2,
				y: height/2 - img.height/2,
				image: img,
				display: function() {
					image(this.image, this.x, this.y);
				}
			};
			drawings.push(drw);
			saveState();
		});
	};

	this.clearCanvas = function() {
		if(confirm("Are you sure you want to clear the canvas? This action cannot be undone.")) {
			drawings = [];
			background(255);
			saveState();
		}
	};
}
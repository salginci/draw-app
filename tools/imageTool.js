function ImageTool(){
	this.icon = "assets/image.png";
	this.name = "Image";

	var selectedImage = null;
	var isPlacing = false;
	var justPlaced = false; // Add flag to track if we just placed an image
	var isActive = false; // Add flag to track if tool is active
	var ignoreNextClick = false;  // Add this flag

	this.draw = function(){
		if(!isActive) return; // Don't do anything if tool isn't active

		// Show selected image preview at mouse position if we're placing
		if(selectedImage && isPlacing) {
			push();
			imageMode(CENTER);
			tint(255, 127); // Semi-transparent preview
			image(selectedImage, mouseX, mouseY);
			pop();
			
			if(mouseIsPressed && !ignoreNextClick) {
				let drw = {
					type: 'image',
					x: mouseX,
					y: mouseY,
					image: selectedImage,
					display: function() {
						push();
						imageMode(CENTER);
						image(this.image, this.x, this.y);
						pop();
					}
				};
				drawings.push(drw);
				saveState();
				
				// Reset tool state
				selectedImage = null;
				isPlacing = false;
				isActive = false;  // Deactivate tool after placing
				
				// Prevent file dialog from opening immediately
				ignoreNextClick = true;
				setTimeout(() => {
					ignoreNextClick = false;
				}, 500);
			}
		}
		// Open file selector when clicked without an active image
		else if(mouseIsPressed && !isPlacing && !ignoreNextClick) {
			let input = createFileInput((file) => {
				if (file.type === 'image') {
					loadImage(file.data, (img) => {
						selectedImage = img;
						isPlacing = true;
					});
				}
			});
			input.hide();
			input.elt.click();
			mouseIsPressed = false;
		}
	};

	// Reset tool state when switching tools
	this.unselectTool = function() {
		selectedImage = null;
		isPlacing = false;
		justPlaced = false;
		isActive = false;
		ignoreNextClick = true;  // Ignore any click when unselecting
		setTimeout(() => {
			ignoreNextClick = false;
		}, 500);
	};

	this.selectTool = function() {
		isActive = true;
		ignoreNextClick = false;
	};
}

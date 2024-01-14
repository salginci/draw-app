function TextTool(){
	this.icon = "assets/text.png";
	this.name = "Text";

	var startMouseX = -1;
	var startMouseY = -1;
	var drawing = false;

	this.draw = function(){

		if(mouseIsPressed){
			if(startMouseX == -1){
				startMouseX = mouseX;
				startMouseY = mouseY;
				drawing = true;
                
               // Loads the current value of each pixel on the canvas into the pixels array. 
               // With this it has been preventing drawing lines for each mouseX and mouseY
			   loadPixels();
			}

			else{
                
		        updatePixels();
				// TODO Add text box and 
			}

		}

		else if(drawing){
			drawing = false;
			startMouseX = -1;
			startMouseY = -1;
		}
	};


}

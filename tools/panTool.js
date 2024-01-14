function PanTool(){
	this.icon = "assets/pan.png";
	this.name = "Pan";

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
                // Updates the canvas with the RGBA values in the pixels array.
		        updatePixels();
				/// move objects any related area.
			}

		}

		else if(drawing){
			drawing = false;
			startMouseX = -1;
			startMouseY = -1;
		}
	};


}

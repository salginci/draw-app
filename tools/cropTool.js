function CropTool(){
	this.icon = "assets/crop.png";
	this.name = "Crop";

	var startMouseX = -1;
	var startMouseY = -1;
	var cropping = false;
    var cropEnded=false;

	this.draw = function(){

		if(mouseIsPressed){
			if(startMouseX == -1){
				startMouseX = mouseX;
				startMouseY = mouseY;
				cropping = true;
               
			}
			else{
              
			}

		}

		else if(cropping){
            cropEnded=true;
			drawing = false;
		
		}
	};


}

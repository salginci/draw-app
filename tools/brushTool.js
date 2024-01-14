function BrushTool(){
	this.icon = "assets/brush.png";
	this.name = "Brush";

	var startMouseX = -1;
	var startMouseY = -1;
	var drawing = false;
	var previousMouseX = -1;
	var previousMouseY = -1;

	this.draw = function(){
		//if the mouse is pressed
		if(mouseIsPressed){
			if (previousMouseX == -1){
				previousMouseX = mouseX;
				previousMouseY = mouseY;
			}

			else{
                push();
                var weight=this.slider.value();
                
                strokeWeight( weight);
                // TODO instead of line try spreadtool
				line(previousMouseX, previousMouseY, mouseX, mouseY);
				pop();
                previousMouseX = mouseX;
				previousMouseY = mouseY;
			}
		}
		 else{
			previousMouseX = -1;
			previousMouseY = -1;
		}
	};
    
    
     this.strokeWeight=5;     
     this.slider=null;         
    
     this.populateOptions = function() {
          select(".options").style('background-color', '#333');
		 
          this.label = createP("Line Weight");
           this.label.parent("optionsArea");
          this.label.style('font-size', '14px');
         
          this.slider = createSlider(0, 20, this.strokeWeight,1);
          this.slider.size(100);
          this.slider.parent("optionsArea");		
	};

}

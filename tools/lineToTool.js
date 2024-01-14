//a tool for drawing straight lines to the screen. Allows the user to preview
//the a line to the current mouse position before drawing the line to the 
//pixel array.
function LineToTool(){
	this.icon = "assets/lineTo.jpg";
	this.name = "LineTo";

	var startMouseX = -1;
	var startMouseY = -1;
	var drawing = false;

	//draws the line to the screen 
	this.draw = function(){

		//only draw when mouse is clicked
		if(mouseIsPressed){
			//if it's the start of drawing a new line
			if(startMouseX == -1){
				startMouseX = mouseX;
				startMouseY = mouseY;
				drawing = true;
				//save the current pixel Array
				loadPixels();
			}

			else{
				//update the screen with the saved pixels to hide any previous
				//line between mouse pressed and released
				updatePixels();
				//draw the line
                var weight=this.slider.value();
                
                strokeWeight( weight);
			    line(startMouseX, startMouseY, mouseX, mouseY);
				pop();
				
			}

		}

		else if(drawing){
			//save the pixels with the most recent line and reset the
			//drawing bool and start locations
			loadPixels();
			drawing = false;
			startMouseX = -1;
			startMouseY = -1;
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

//Displays and handles the colour palette.
function ColourPalette(foregroundColorPicker,backgroundColorPicker,borderColorPicker) {
    
    // CUSTOM CODE START FOR ADVANCED COLOR PALETTE
    this.foregroundColorPicker=foregroundColorPicker;
    this.backgroundColorPicker=backgroundColorPicker;
    this.borderColorPicker = borderColorPicker;
    this.foregroundColor=color("#000000");
    this.backgroundColour = color("#ffffff");
    this.borderColor=color("#000000");
  
    
    this.foregroundColorChanged = (e)=>{
		//get the new colour from the id of the clicked element
        var jsEvent=e.srcElement;
        var c = jsEvent.value;
        this.foregroundColor=color(c);
		fill(c);
		stroke(c);
	}
    this.backgroundColorChanged = (e)=> {
		 
		var jsEvent=e.srcElement;
        var c = jsEvent.value;
        this.backgroundColour = color(c);
       
	}
      this.borderColorChanged = (e)=> {
		 
		var jsEvent=e.srcElement;
        var c = jsEvent.value;
        this.borderColor = color(c);
          console.log(this.borderColor);
       
	}
    // CUSTOM CODE END	 
	var self = this;

}
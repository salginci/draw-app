//Displays and handles the colour palette.
function ColourPalette(foregroundColorPicker,backgroundColorPicker) {
    
    // CUSTOM CODE START FOR ADVANCED COLOR PALETTE
    this.foregroundColorPicker=foregroundColorPicker;
    this.backgroundColorPicker=backgroundColorPicker;
    this.foregroundColor=color("#000000");
    this.backgroundColour = color("#ffffff");
    
    this.foregroundColorChanged = function(e) {
		//get the new colour from the id of the clicked element
        var jsEvent=e.srcElement;
        var c = jsEvent.value;
        this.foregroundColor=color(c);
		fill(c);
		stroke(c);
	}
    this.backgroundColorChanged = function(e) {
		 
		var jsEvent=e.srcElement;
        var c = jsEvent.value;
        this.backgroundColour = color(c);
       
	}
    // CUSTOM CODE END	 
	var self = this;

}
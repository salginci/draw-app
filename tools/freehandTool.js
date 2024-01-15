function FreehandTool() {
    //set an icon and a name for the object
    this.icon = "assets/freehand.jpg";
    this.name = "freehand";

    //to smoothly draw we'll draw a line from the previous mouse location
    //to the current mouse location. The following values store
    //the locations from the last frame. They are -1 to start with because
    //we haven't started drawing yet.
    var previousMouseX = -1;
    var previousMouseY = -1;

    this.draw = function () {
        //if the mouse is pressed
        if (mouseIsPressed) {
            //check if they previousX and Y are -1. set them to the current
            //mouse X and Y if they are.
            if (previousMouseX == -1) {
                previousMouseX = mouseX;
                previousMouseY = mouseY;
            }
            //if we already have values for previousX and Y we can draw a line from 
            //there to the current mouse location
            else {
                push();
                var weight = this.slider.value();

                strokeWeight(weight);
                line(previousMouseX, previousMouseY, mouseX, mouseY);
                pop();
                previousMouseX = mouseX;
                previousMouseY = mouseY;
            }
        }
        //if the user has released the mouse we want to set the previousMouse values 
        //back to -1.
        //try and comment out these lines and see what happens!
        else {
            previousMouseX = -1;
            previousMouseY = -1;
        }
    };


    this.strokeWeight = 5;
    this.slider = null;

    this.populateOptions = function () {
        // CUSTOM CODE START FOR Weight Option 
        select(".options").style('background-color', '#333');
        this.label = createP("Line Weight");
        this.label.parent("optionsArea");
        this.label.style('font-size', '14px');
        this.slider = createSlider(0, 20, this.strokeWeight, 1);
        this.slider.size(100);
        this.slider.parent("optionsArea");
        // CUSTOM CODE END
    };

}

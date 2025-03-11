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
    var isDrawing = false;

    this.draw = function () {
        if (mouseIsPressed) {
            // Check if mouse is inside canvas
            if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
                if (previousMouseX == -1) {
                    previousMouseX = mouseX;
                    previousMouseY = mouseY;
                    isDrawing = true;
                } else {
                    // Draw the current line segment
                    push();
                    var weight = this.slider.value();
                    strokeWeight(weight);
                    stroke(colourP.foregroundColor);
                    line(previousMouseX, previousMouseY, mouseX, mouseY);
                    pop();

                    // Save the line segment
                    let drw = {
                        type: 'freehand',
                        x1: previousMouseX,
                        y1: previousMouseY,
                        x2: mouseX,
                        y2: mouseY,
                        weight: weight,
                        color: colourP.foregroundColor,
                        display: function() {
                            push();
                            strokeWeight(this.weight);
                            stroke(this.color);
                            line(this.x1, this.y1, this.x2, this.y2);
                            pop();
                        }
                    };
                    drawings.push(drw);
                    
                    // Update previous position
                    previousMouseX = mouseX;
                    previousMouseY = mouseY;
                }
            }
        } else {
            // Reset when mouse is released
            if (isDrawing) {
                saveState();
            }
            isDrawing = false;
            previousMouseX = -1;
            previousMouseY = -1;
        }
    };

    this.mouseReleased = function() {
        if (isDrawing) {
            saveState();
        }
        isDrawing = false;
        previousMouseX = -1;
        previousMouseY = -1;
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

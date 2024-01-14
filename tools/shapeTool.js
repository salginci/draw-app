function ShapeTool() {
    this.icon = "assets/shape.png";
    this.name = "Shape";

    var startMouseX = -1;
    var startMouseY = -1;
    var drawing = false;

    // Initialize selectedShape to null
    this.selectedShape = null;

    // Draws the shape to the screen 
    this.draw = function () {
        // Only draw when the mouse is clicked
        if (mouseIsPressed) {
            // If it's the start of drawing a new shape
            if (startMouseX == -1) {
                startMouseX = mouseX;
                startMouseY = mouseY;
                drawing = true;
                // Save the current pixel array
                loadPixels();
            } else {
                // Update the screen with the saved pixels to hide any previous
                // shape between mouse pressed and released
                updatePixels();
                // Draw the shape based on the selectedShape
                var weight = this.slider.value();
                strokeWeight(weight);

                if (this.selectedShape == "rect") {
                    rect(startMouseX, startMouseY, mouseX - startMouseX, mouseY - startMouseY);
                } else if (this.selectedShape == "triangle") {
                    // Draw triangle logic
                } else if (this.selectedShape == "circle") {
                    // Draw circle logic
                }
            }
        } else if (drawing) {
            // Save the pixels with the most recent shape and reset the
            // drawing bool and start locations
            loadPixels();
            drawing = false;
            startMouseX = -1;
            startMouseY = -1;
        }
    };

    this.strokeWeight = 5;
    this.slider = null;

    this.populateOptions = function () {
        select(".options").style('background-color', '#333');

        this.label = createP("Line Weight");
        this.label.parent("optionsArea");
        this.label.style('font-size', '14px');
        this.slider = createSlider(0, 20, this.strokeWeight, 1);
        this.slider.size(100);
        this.slider.parent("optionsArea");

       
        this.rectangleButton = createButton("");
        this.rectangleButton.mousePressed(() => {
            this.selectedShape = "rect";
        });
        this.rectangleButton.class('rectangle-button');
        this.rectangleButton.parent("optionsArea");

        this.triangleButton = createButton("");
        this.triangleButton.mousePressed(() => {
            this.selectedShape = "triangle";
        });
        this.triangleButton.class('triangle-button');
        this.triangleButton.parent("optionsArea");

        this.circleButton = createButton("");
        this.circleButton.mousePressed(() => {
            this.selectedShape = "circle";
        });
        this.circleButton.class('circle-button');
        this.circleButton.parent("optionsArea");
    };
}

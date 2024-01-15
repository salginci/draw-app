function ShapeTool() {
    this.icon = "assets/shape.png";
    this.name = "Shape";

    var startMouseX = -1;
    var startMouseY = -1;
    var drawing = false;

    // Initialize selectedShape to null
    this.selectedShape = "rect";

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

                var weight = this.slider.value();
                push()
                strokeWeight(weight);


                // Update the screen with the saved pixels to hide any previous
                // shape between mouse pressed and released
                updatePixels();
                // Draw the shape based on the selectedShape



                if (this.selectedShape == "rect") {
                    rect(startMouseX, startMouseY, mouseX - startMouseX, mouseY - startMouseY);
                } else if (this.selectedShape == "triangle") {


                    var x1 = startMouseX;
                    var y1 = startMouseY;
                    var x2 = mouseX;
                    var y2 = mouseY;
                    var x3 = startMouseX + (mouseX - startMouseX) / 2;
                    var y3 = mouseY;


                    triangle(x1, y1, x2, y2, x3, y3);



                } else if (this.selectedShape == "circle") {

                    var centerX = (startMouseX + mouseX) / 2;
                    var centerY = (startMouseY + mouseY) / 2;
                    var radius = dist(startMouseX, startMouseY, mouseX, mouseY) / 2;


                    ellipse(centerX, centerY, radius * 2);
                }
            }

            pop();
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
    this.removeBorder = function () {
        var elements = document.querySelectorAll(".shape-button");

        // Loop through each element and apply the style
        elements.forEach(function (element) {
            element.style.border = "none";
        });
    }

    this.populateOptions = function () {
        // CUSTOM CODE FOR SPREAD OPTIONS
        select(".options").style('background-color', '#333');

        this.label = createP("Line Weight");
        this.label.parent("optionsArea");
        this.label.style('font-size', '14px');
        this.slider = createSlider(0, 20, this.strokeWeight, 1);
        this.slider.size(100);
        this.slider.parent("optionsArea");


        this.rectangleButton = createButton("");
        this.rectangleButton.mousePressed(() => {
            this.removeBorder();

            this.selectedShape = "rect";
            this.rectangleButton.style("border", "2px solid blue");
        });
        this.rectangleButton.class('shape-button rectangle-button');


        this.rectangleButton.parent("optionsArea");



        this.triangleButton = createButton("");
        this.triangleButton.mousePressed(() => {
            this.removeBorder();
            this.selectedShape = "triangle";
            this.triangleButton.style("border", "2px solid blue");
        });
        this.triangleButton.class('shape-button triangle-button');
        this.triangleButton.parent("optionsArea");



        this.circleButton = createButton("");
        this.circleButton.mousePressed(() => {
            this.removeBorder();
            this.selectedShape = "circle";
            this.circleButton.style("border", "2px solid blue");
        });
        this.circleButton.class('shape-button circle-button');
        this.circleButton.parent("optionsArea");
        // END OF CUSTOM CODE
    };
}

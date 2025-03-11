function ShapeTool() {
    this.icon = "assets/shape.png";
    this.name = "Shape";

    var startMouseX = -1;
    var startMouseY = -1;
    var drawing = false;
    var isActive = false;

    // Initialize shape properties
    this.selectedShape = "rect";
    this.filled = false;
    
    this.draw = function(palette) {
        if(!isActive) return;

        if (mouseIsPressed) {
            if (startMouseX == -1) {
                startMouseX = mouseX;
                startMouseY = mouseY;
                drawing = true;
                loadPixels();
            } else {
                updatePixels();
                
                // Preview the shape while drawing
                push();
                if (this.filled) {
                    fill(palette.foregroundColor);
                } else {
                    noFill();
                }
                stroke(palette.borderColor);
                strokeWeight(this.slider.value());

                // Draw different shapes based on selection
                switch(this.selectedShape) {
                    case "rect":
                        rect(startMouseX, startMouseY, mouseX - startMouseX, mouseY - startMouseY);
                        break;
                    case "ellipse":
                        let w = mouseX - startMouseX;
                        let h = mouseY - startMouseY;
                        ellipse(startMouseX + w/2, startMouseY + h/2, abs(w), abs(h));
                        break;
                    case "triangle":
                        triangle(
                            startMouseX, mouseY,  // Bottom left
                            startMouseX + (mouseX - startMouseX)/2, startMouseY,  // Top middle
                            mouseX, mouseY  // Bottom right
                        );
                        break;
                }
                pop();
            }
        } else if (drawing) {
            // When mouse is released, save the shape
            let drw = {
                type: 'shape',
                shape: this.selectedShape,
                x1: startMouseX,
                y1: startMouseY,
                x2: mouseX,
                y2: mouseY,
                filled: this.filled,
                weight: this.slider.value(),
                strokeColor: palette.borderColor,
                fillColor: palette.foregroundColor,
                display: function() {
                    push();
                    if (this.filled) {
                        fill(this.fillColor);
                    } else {
                        noFill();
                    }
                    stroke(this.strokeColor);
                    strokeWeight(this.weight);
                    
                    switch(this.shape) {
                        case "rect":
                            rect(this.x1, this.y1, this.x2 - this.x1, this.y2 - this.y1);
                            break;
                        case "ellipse":
                            let w = this.x2 - this.x1;
                            let h = this.y2 - this.y1;
                            ellipse(this.x1 + w/2, this.y1 + h/2, abs(w), abs(h));
                            break;
                        case "triangle":
                            triangle(
                                this.x1, this.y2,
                                this.x1 + (this.x2 - this.x1)/2, this.y1,
                                this.x2, this.y2
                            );
                            break;
                    }
                    pop();
                }
            };
            drawings.push(drw);
            drawing = false;
            startMouseX = -1;
            startMouseY = -1;
            saveState();
        }
    };

    this.unselectTool = function() {
        drawing = false;
        startMouseX = -1;
        startMouseY = -1;
        isActive = false;
    };

    this.selectTool = function() {
        isActive = true;
    };

    // Populate the options
    this.populateOptions = function() {
        select(".options").style('background-color', '#333');
        
        // Create shape buttons container
        let shapesContainer = createDiv();
        shapesContainer.parent("optionsArea");
        
        // Rectangle button
        let rectButton = createButton('');
        rectButton.class('shape-button rectangle-button');
        rectButton.parent(shapesContainer);
        rectButton.mousePressed(() => {
            this.selectedShape = 'rect';
            // Remove active class from all buttons
            selectAll('.shape-button').forEach(btn => btn.style('background-color', ''));
            rectButton.style('background-color', 'rgb(247 97 12)');
        });
        
        // Circle button
        let circleButton = createButton('');
        circleButton.class('shape-button circle-button');
        circleButton.parent(shapesContainer);
        circleButton.mousePressed(() => {
            this.selectedShape = 'ellipse';
            selectAll('.shape-button').forEach(btn => btn.style('background-color', ''));
            circleButton.style('background-color', 'rgb(247 97 12)');
        });
        
        // Triangle button
        let triangleButton = createButton('');
        triangleButton.class('shape-button triangle-button');
        triangleButton.parent(shapesContainer);
        triangleButton.mousePressed(() => {
            this.selectedShape = 'triangle';
            selectAll('.shape-button').forEach(btn => btn.style('background-color', ''));
            triangleButton.style('background-color', 'rgb(247 97 12)');
        });
        
        // Set initial active button
        rectButton.style('background-color', 'rgb(247 97 12)');
        
        // Fill checkbox
        this.fillCheckbox = createCheckbox('Filled', this.filled);
        this.fillCheckbox.parent("optionsArea");
        this.fillCheckbox.changed(() => {
            this.filled = this.fillCheckbox.checked();
        });
        
        // Stroke weight slider
        this.label = createP("Border Weight");
        this.label.parent("optionsArea");
        this.label.style('color', '#fff');
        this.slider = createSlider(1, 20, 1);
        this.slider.parent("optionsArea");
    };
}

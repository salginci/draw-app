//global variables that will store the toolbox colour palette
//amnd the helper functions
var toolbox = null;
var colourP = null;
var helpers = null;
var drawings = [];

var colPic; 

var foregroundColorPicker;
var backgroundColorPicker;
var borderColorPicker;
var cnv;

// Add state management
let undoStack = [];
let redoStack = [];

// Add buffer for drawing
let drawingBuffer;

function setup() {
    canvasContainer = select('#content');
    cnv = createCanvas(canvasContainer.size().width, canvasContainer.size().height);
    cnv.parent("content");
    
    pixelDensity(1);
    
    foregroundColorPicker = createColorPicker('#000000');
    foregroundColorPicker.parent(select('#foregroundColorSwatch'));
    
    backgroundColorPicker = createColorPicker('#fff');
    backgroundColorPicker.parent(select('#backgroundColorSwatch'));
    
    borderColorPicker = createColorPicker('#000');
    borderColorPicker.parent(select('#borderColorSwatch'));
   
    helpers = new HelperFunctions();
    colourP = new ColourPalette(foregroundColorPicker,backgroundColorPicker,borderColorPicker);
    
    foregroundColorPicker.changed(colourP.foregroundColorChanged);
    backgroundColorPicker.changed(colourP.backgroundColorChanged);
    borderColorPicker.changed(colourP.borderColorChanged);
    
    toolbox = new Toolbox();

    toolbox.addTool(new FreehandTool());
    toolbox.addTool(new LineToTool());
    toolbox.addTool(new SprayCanTool());
    toolbox.addTool(new MirrorDrawTool());
    toolbox.addTool(new BrushTool());
    toolbox.addTool(new ImageTool());
    toolbox.addTool(new CropTool());
    toolbox.addTool(new ShapeTool());
    
    drawingBuffer = createGraphics(width, height);
}

function draw() {
    background(colourP.backgroundColour);
    
    for (let drawing of drawings) {
        drawing.display();
    }
    
    if (toolbox.selectedTool.hasOwnProperty("draw")) {
        try {
            toolbox.selectedTool.draw(colourP);
        } catch (error) {
            handleError(error, 'tool.draw');
        }
    }
}

function saveState() {
    undoStack.push([...drawings]);
    redoStack = [];
}

function undo() {
    if (undoStack.length > 0) {
        redoStack.push([...drawings]);
        drawings = undoStack.pop();
        redraw();
    }
}

function redo() {
    if (redoStack.length > 0) {
        undoStack.push([...drawings]);
        drawings = redoStack.pop();
        redraw();
    }
}

// Add this function to handle drawing completion
function mouseReleased() {
    if (toolbox.selectedTool && toolbox.selectedTool.hasOwnProperty("mouseReleased")) {
        toolbox.selectedTool.mouseReleased();
    }
    saveState();
}

// Add error handling
function handleError(error, context) {
    console.error(`Error in ${context}:`, error);
    // Implement user feedback
}

function keyPressed() {
    // Undo: Ctrl/Cmd + Z
    if((keyCode === 90 && keyIsDown(CONTROL)) || (keyCode === 90 && keyIsDown(META))) {
        undo();
    }
    
    // Redo: Ctrl/Cmd + Y or Ctrl/Cmd + Shift + Z
    if((keyCode === 89 && keyIsDown(CONTROL)) || 
       (keyCode === 90 && keyIsDown(CONTROL) && keyIsDown(SHIFT))) {
        redo();
    }
    
    // Tool shortcuts
    switch(key.toLowerCase()) {
        case 'b': // Brush
            toolbox.selectTool('Brush');
            break;
        case 'l': // Line
            toolbox.selectTool('LineTo');
            break;
        case 's': // Shape
            toolbox.selectTool('Shape');
            break;
        case 'c': // Crop
            toolbox.selectTool('Crop');
            break;
    }
}
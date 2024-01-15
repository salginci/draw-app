//global variables that will store the toolbox colour palette
//amnd the helper functions
var toolbox = null;
var colourP = null;
var helpers = null;
 var colPic; 

var foregroundColorPicker ;
var backgroundColorPicker  ;
var cnv;


function setup() {
 
	//create a canvas to fill the content div from index.html
	canvasContainer = select('#content');
	cnv = createCanvas(canvasContainer.size().width, canvasContainer.size().height);
    background(255,0,0)
	cnv.parent("content");
    
    
    foregroundColorPicker = createColorPicker('#000000');
    foregroundColorPicker.parent(select('#foregroundColorSwatch'));
    
    backgroundColorPicker = createColorPicker('#fff');
    backgroundColorPicker.parent(select('#backgroundColorSwatch'));
    
 
   
	//create helper functions and the colour palette
	helpers = new HelperFunctions();
	colourP = new ColourPalette(foregroundColorPicker,backgroundColorPicker);
    
    
    
    // Add event handler to colorpalette object to handle color changes.
    foregroundColorPicker.changed(colourP.foregroundColorChanged);
    backgroundColorPicker.changed(colourP.backgroundColorChanged);
    

    
	//create a toolbox for storing the tools
	toolbox = new Toolbox();

	//add the tools to the toolbox.
	toolbox.addTool(new FreehandTool());
	toolbox.addTool(new LineToTool());
	toolbox.addTool(new SprayCanTool());
    toolbox.addTool(new MirrorDrawTool());
	toolbox.addTool(new BrushTool());
    toolbox.addTool(new ImageTool());
    toolbox.addTool(new CropTool());
    toolbox.addTool(new PanTool());
    toolbox.addTool(new ShapeTool());
    toolbox.addTool(new TextTool()); 
    
	background(255);
    
   
    

}

function draw() {
   
	//call the draw function from the selected tool.
	//hasOwnProperty is a javascript function that tests
	//if an object contains a particular method or property
	//if there isn't a draw method the app will alert the user
	
    // To be sure drawing happens only if user clicks in canvas this control added.
  //   if (mouseIsPressed && mouseX >= 0 && mouseY >= 0 && mouseX < width && mouseY < height) {
      
    if (toolbox.selectedTool.hasOwnProperty("draw")) {
		toolbox.selectedTool.draw();
	} else {
		alert("it doesn't look like your tool has a draw method!");
	}
   //  }
}
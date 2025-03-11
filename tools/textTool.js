function TextTool(){
	this.icon = "assets/text.png";
	this.name = "Text";

	var isTyping = false;
	var currentText = "";
	var textX = -1;
	var textY = -1;

	this.draw = function(palette){
		if(mouseIsPressed && !isTyping){
			isTyping = true;
			textX = mouseX;
			textY = mouseY;
			
			// Create input element
			let input = createElement('input');
			input.position(textX, textY);
			input.style('font-size', this.fontSize + 'px');
			input.style('font-family', this.fontFamily);
			
			// Handle text input completion
			input.elt.addEventListener('keydown', (e) => {
				if(e.key === 'Enter'){
					let drw = {
						type: 'text',
						x: textX,
						y: textY,
						content: input.value(),
						fontSize: this.fontSize,
						fontFamily: this.fontFamily,
						color: palette.foregroundColor,
						display: function(){
							push();
							textSize(this.fontSize);
							textFont(this.fontFamily);
							fill(this.color);
							text(this.content, this.x, this.y);
							pop();
						}
					};
					drawings.push(drw);
					saveState();
					input.remove();
					isTyping = false;
				}
			});
		}
	};

	// Text tool options
	this.fontSize = 16;
	this.fontFamily = 'Arial';

	this.populateOptions = function(){
		select(".options").style('background-color', '#333');
		
		// Font size slider
		this.label = createP("Font Size");
		this.label.parent("optionsArea");
		this.label.style('font-size', '14px');
		
		this.sizeSlider = createSlider(8, 72, this.fontSize);
		this.sizeSlider.parent("optionsArea");
		this.sizeSlider.input(() => {
			this.fontSize = this.sizeSlider.value();
		});
		
		// Font family selector
		this.fontSelect = createSelect();
		this.fontSelect.parent("optionsArea");
		this.fontSelect.option('Arial');
		this.fontSelect.option('Times New Roman');
		this.fontSelect.option('Courier New');
		this.fontSelect.changed(() => {
			this.fontFamily = this.fontSelect.value();
		});
	};
}

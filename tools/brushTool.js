function BrushTool() {
	this.icon = "assets/brush.png";
	this.name = "Brush";

	var previousMouseX = -1;
	var previousMouseY = -1;
	var isActive = false;
	this.selectedBrush = "round";

	this.draw = function(palette) {
		if(!isActive) return;

		if (mouseIsPressed) {
			if (previousMouseX == -1) {
				previousMouseX = mouseX;
				previousMouseY = mouseY;
			} else {
				let drw = {
					type: 'brush',
					x1: previousMouseX,
					y1: previousMouseY,
					x2: mouseX,
					y2: mouseY,
					brushType: this.selectedBrush,
					weight: this.slider.value(),
					color: palette.foregroundColor,
					display: function() {
						push();
						stroke(this.color);
						strokeWeight(this.weight);
						strokeCap(ROUND);
						if (this.brushType === "round") {
							line(this.x1, this.y1, this.x2, this.y2);
						} else if (this.brushType === "square") {
							strokeCap(SQUARE);
							line(this.x1, this.y1, this.x2, this.y2);
						} else if (this.brushType === "splatter") {
							for (let i = 0; i < 3; i++) {
								let offset = this.weight / 2;
								line(
									this.x1 + random(-offset, offset),
									this.y1 + random(-offset, offset),
									this.x2 + random(-offset, offset),
									this.y2 + random(-offset, offset)
								);
							}
						}
						pop();
					}
				};
				drawings.push(drw);

				// Draw current stroke
				push();
				stroke(palette.foregroundColor);
				strokeWeight(this.slider.value());
				strokeCap(ROUND);
				if (this.selectedBrush === "round") {
					line(previousMouseX, previousMouseY, mouseX, mouseY);
				} else if (this.selectedBrush === "square") {
					strokeCap(SQUARE);
					line(previousMouseX, previousMouseY, mouseX, mouseY);
				} else if (this.selectedBrush === "splatter") {
					for (let i = 0; i < 3; i++) {
						let offset = this.slider.value() / 2;
						line(
							previousMouseX + random(-offset, offset),
							previousMouseY + random(-offset, offset),
							mouseX + random(-offset, offset),
							mouseY + random(-offset, offset)
						);
					}
				}
				pop();

				previousMouseX = mouseX;
				previousMouseY = mouseY;
			}
		} else {
			previousMouseX = -1;
			previousMouseY = -1;
		}
	};

	this.unselectTool = function() {
		isActive = false;
	};

	this.selectTool = function() {
		isActive = true;
	};

	this.populateOptions = function() {
		select(".options").style('background-color', '#333');

		let roundButton = createButton('');
		roundButton.class('brush-button round-brush');
		roundButton.parent("optionsArea");
		roundButton.mousePressed(() => {
			this.selectedBrush = "round";
			selectAll('.brush-button').forEach(btn => btn.style('background-color', ''));
			roundButton.style('background-color', 'rgb(247 97 12)');
		});

		let squareButton = createButton('');
		squareButton.class('brush-button square-brush');
		squareButton.parent("optionsArea");
		squareButton.mousePressed(() => {
			this.selectedBrush = "square";
			selectAll('.brush-button').forEach(btn => btn.style('background-color', ''));
			squareButton.style('background-color', 'rgb(247 97 12)');
		});

		let splatterButton = createButton('');
		splatterButton.class('brush-button splatter-brush');
		splatterButton.parent("optionsArea");
		splatterButton.mousePressed(() => {
			this.selectedBrush = "splatter";
			selectAll('.brush-button').forEach(btn => btn.style('background-color', ''));
			splatterButton.style('background-color', 'rgb(247 97 12)');
		});

		roundButton.style('background-color', 'rgb(247 97 12)');

		this.label = createP("Brush Size");
		this.label.parent("optionsArea");
		this.label.style('color', '#fff');

		this.slider = createSlider(1, 50, 10);
		this.slider.parent("optionsArea");
	};
}

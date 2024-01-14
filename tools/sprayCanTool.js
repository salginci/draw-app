function SprayCanTool() {

    this.name = "sprayCanTool";
    this.icon = "assets/sprayCan.jpg";

    this.points = 13;
    this.spread = 10;
    this.radius = 5;
    this.draw = function () {
        
        
    this.radius = this.sliderRadius.value();
    this.points = this.sliderPoints.value();
    this.spread = this.sliderSpread.value();
        
        var r = random(5, this.radius);
        if (mouseIsPressed) {
            for (var i = 0; i < this.points; i++) {
                point(random(mouseX - this.spread, mouseX + this.spread), random(mouseY - this.spread, mouseY + this.spread));
            }
        }
    };


  
    this.sliderRadius = null;
 this.sliderPoints = null;
 this.sliderSpread = null;
    this.populateOptions = function () {
        select(".options").style('background-color', '#333');

        this.label = createP("Radius");
        this.label.parent("optionsArea");
        this.label.style('font-size', '14px');

        this.sliderRadius = createSlider(0, 20, this.radius, 1);
        this.sliderRadius.size(100);
        this.sliderRadius.parent("optionsArea");


        this.label = createP("Points");
        this.label.parent("optionsArea");
        this.label.style('font-size', '14px');

        this.sliderPoints = createSlider(0, 100, this.points, 1);
        this.sliderPoints.size(100);
        this.sliderPoints.parent("optionsArea");



        this.label = createP("Spread");
        this.label.parent("optionsArea");
        this.label.style('font-size', '14px');

        this.sliderSpread = createSlider(0, 100, this.spread, 1);
        this.sliderSpread.size(100);
        this.sliderSpread.parent("optionsArea");



    };

}

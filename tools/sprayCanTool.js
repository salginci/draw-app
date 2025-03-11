function SprayCanTool() {

    this.name = "sprayCanTool";
    this.icon = "assets/sprayCan.jpg";

    this.points = 13;
    this.spread = 10;
    this.radius = 5;

    this.draw = function (palette) {
        
       var rd = this.sliderRadius.value();
        var pt= this.sliderPoints.value();
        var sp= this.sliderSpread.value();
           if (mouseIsPressed) {
              
                 if (mouseY < 0 || mouseX < 0 ){
			 return;
			}
               
               
            var pointsArray=[];
               console.log(this.points);
               for (var i = 0; i < this.points; i++) {
                pointsArray.push({x:random(mouseX -  sp, mouseX +  sp),y: random(mouseY -  sp, mouseY +  sp)});
            }
               
                var clr=palette.borderColor;
               
                var frg=palette.foregroundColor;
                 
               
        var drw={
             x:mouseX,
            y:mouseY,
            radius:rd,
            pointsArray:pointsArray,
            spread:sp,
            strokeColor:clr,
             foregroundColor:frg,
            display:function()
            {
                push();
                
             stroke(this.strokeColor);
                  fill(this.foregroundColor)
               
            for (var i = 0; i < this.pointsArray.length; i++) {
              
                ellipse(this.pointsArray[i].x,this.pointsArray[i].y ,this.radius,this.radius );
            }
            
       
                pop();
            }
        }
        console.log("drawing");
        
        drawings.push(drw);
        
       // var r = random(5, this.radius);
        
        
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

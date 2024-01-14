
document.addEventListener('DOMContentLoaded', (event) => {
    // Assuming you have a function to open a color picker and apply the selected color
    function openColorPicker(swatch) {
        // Placeholder for color picker logic
        // Replace with actual code to open your color picker
        console.log('Open color picker for', swatch.id);
         Coloris({
             themeMode: 'dark',
    alpha: true
  });
    }

    // Add click event listener to the foreground color swatch
    var fgSwatch = document.getElementById('foregroundColorSwatch');
    fgSwatch.addEventListener('click', function() {
        openColorPicker(fgSwatch);
        // The color picker logic will handle updating the swatch color
    });

    // Add click event listener to the background color swatch
    var bgSwatch = document.getElementById('backgroundColorSwatch');
    bgSwatch.addEventListener('click', function() {
        openColorPicker(bgSwatch);
        
        // The color picker logic will handle updating the swatch color
    });
    
 
    
    
    
});
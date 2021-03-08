$(function () { 
    var canvas = document.createElement("canvas"); 

    // Width and height of canvas can 
    // be varied depending on the 
    // size of icon 
    canvas.width = 30; 
    canvas.height = 28; 

    // Set interval for allowing the 
    // font awesome icon to load 
    setInterval(() => { 
        var ctx = canvas.getContext("2d"); 

        // Setting the color of the icon 
        ctx.fillStyle = "gray"; 

        // Set size of cursor 
        ctx.font = "24px fontawesome"; 

        // '\uf0f9' is the unicode of 
        // the font awesome icon 
        ctx.fillText("\uf25a", 0, 20); 

        // Converting the canvas to image 
        var dataURL = canvas.toDataURL("imgs/moon.png"); 

        // Setting the cursor property 
        // to the image created 
        $("body").css( 
            "cursor", "url(" + dataURL + "), auto"); 
    }, 1000); 
});
document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll("nav a");
  
    links.forEach(link => {
        link.addEventListener("mousedown", function() {
            this.style.color = "rgb(0, 0, 0)"; // Change color when clicked
        });
  
        link.addEventListener("mouseup", function() {
            this.style.color = ""; // Revert color when released
        });
    });
});


// document.addEventListener("DOMContentLoaded", function() {
//     const links = document.querySelectorAll("nav a");
//     for (let i = 0; i < links.length; i++) {
//         links[i].addEventListener("mousedown", function() {
//             this.style.color = rgb(120, 1, 171); // Change color when clicked
//         });
      
//         links[i].addEventListener("mouseup", function() {
//             this.style.color = rgb(1, 117, 219); // Revert color when released
//         });
//     }
// })
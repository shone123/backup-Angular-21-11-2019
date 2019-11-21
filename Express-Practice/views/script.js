var d = document.createDocumentFragment();
for(var i = 1; i <= 10 ; i++){
    var element = document.createElement("input");
    element.type  = "button";
    element.id =  i;
    element.value = 'button' + i;
    element.addEventListener("click", function() {
        var t = $(this).attr('id'); 
        alert(t);
    });
    d.appendChild(element);
}
document.body.appendChild(d);



// var allButtonsOnPage = document.querySelectorAll('button');

// allButtonsOnPage.forEach(function(button, index) {
//   button.addEventListener('click', function() {
    
//   });
// });

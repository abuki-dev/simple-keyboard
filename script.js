const key=document.getElementsByClassName("key");
const display=document.getElementById("input");
const buttons=document.querySelectorAll("button");
function tolower(){
    for (const text of buttons) {
        if(text.innerText==="Space" || text.innerText==="Backspace" ){
            continue;
        }

        text.innerText=text.innerText.toLowerCase();
    }

}
function toupper(){
    for (const text of buttons) {
        if(text.innerText==="Space" || text.innerText==="Backspace" ){
            continue;
        }
        text.innerText=text.innerText[0].toUpperCase()+text.innerText.slice(1).toLowerCase();
    }

}

for (const element of buttons) {
    element.addEventListener("click",()=>{
        if(element.innerText==="Space"){
            display.value+=" ";
        }
        else if(element.innerText==="Backspace"){
        display.value=display.value.slice(0,display.value.length-1);
        }
        else if(element.innerText==="Shift"){
            tolower();
        }
        else if(element.innerText==="shift"){
            toupper();

        }
        else{
        display.value+=element.innerText;}
    })
    
}
window.addEventListener("keydown", (AA) => {
    // Search for a button that has the same data-key as the physical key pressed
    const pressedButton = document.querySelector(`[data-key="${AA.code}"]`);
    
    if (pressedButton) {
        pressedButton.click(); // This "fake clicks" your button!
    }
});
pressedButton.classList.add('active'); // Turn on the glow
setTimeout(() => pressedButton.classList.remove('active'), 150); // Turn it off after 150ms
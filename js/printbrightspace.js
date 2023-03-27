(function() {

// the name of the frame with the quiz content
const frame_name = "pageFrame"

// Get all the frames inside the iframe that hosts the quiz
let frames = document.querySelector("iframe").contentWindow.document.querySelectorAll("frame")
// let frames = document.querySelectorAll("frame")
let frame_url = window.location.origin 
for(let frame of frames)
{
    if(frame.getAttribute("name") === frame_name)
    {
        frame_url += frame.getAttribute("src")
        break;
    }
}
console.log(frame_url);

// This function runs on the startup of the window that hosts our quiz
function prepareForPrint(n)
{
    // Get the div that holds all the content of all the questions
    let superDiv = n.document.querySelector("form");
    // Create a new div that is first child of the div
    // Add styles to make left aligned and max width
    let parentDiv = n.document.createElement("div");
    superDiv.prepend(parentDiv);
    parentDiv.style.textAlign = "left";
    parentDiv.style.maxWidth = "740px";
    
    // Query to find all the heading for each question
    let elements = n.document.querySelectorAll(".dhdg_2")
    
    for(questionTitle of elements){
      if(questionTitle.className == 'dhdg_2'){
        let questionDiv = n.document.createElement("div");
        questionDiv.style.breakInside = "avoid-page";
        let questionBody = questionTitle.nextElementSibling.nextElementSibling
        console.log(questionTitle)
        questionDiv.append(questionTitle);
        console.log(questionBody)
        questionDiv.append(questionBody);
        parentDiv.append(questionDiv);
      } 
    }
    n.print();
}

// Open the window with the URL that just contains the quiz content
let n= window.open(frame_url); 
n.focus();
n.addEventListener('load', () => prepareForPrint(n), true);
})();




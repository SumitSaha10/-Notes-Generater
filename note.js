console.log('Hello this is my note website');
showNotes();
  //storing data in localstorage  

let btn = document.getElementById('btn');
btn.addEventListener("click", function(){
    let input =  document.getElementById('text-box').value;
     if (input.length<3) {
         let mesbox2 = document.getElementById("mesbox-2");
         mesbox2.style.display = 'block';
         document.getElementById('text-box').value = "";
         setTimeout(() => {
             mesbox2.style.display ="none";
         }, 2000);
     } 
     else {
        let mesbox1 = document.getElementById("mesbox-1");
        mesbox1.style.display = 'block';
        setTimeout(() => {
            mesbox1.style.display ="none";
        }, 3000);
       let ls = localStorage.getItem("notes");
   
       if (ls==null) {
           myObj = [];     
       }
        else {
          myObj = JSON.parse(ls); 
       }
       myObj.push(input);
       localStorage.setItem("notes",JSON.stringify(myObj));
       document.getElementById('text-box').value = "";
       showNotes();
     }
     
    
});

//showing notes
function showNotes(){
    let ls = localStorage.getItem("notes");

    if (ls==null) {
        myObj = [];     
    }
     else {
       myObj = JSON.parse(ls); 
    }
    let html ="";
myObj.forEach(function(element,index){
    let num = index+1;
    
    html += `
    <div class="cards">
    <h4>Note ${num}</h4>
    <p>${element}</p>
    <div class="btns">
        <button class="btn1" id ="${index}" onclick ="deleteNote(this.id)">
            Delete
        </button>
        <button class="btn2" id ="${index}" onclick ="markNote(this.id)">
            Mark as Important
        </button>
    </div>
</div> 
    `;
}) 
    let showNotes=document.getElementById('notes');
    showNotes.innerHTML=html;
  
}

 //searching functionality
 let search = document.getElementById('search');
 search.addEventListener('input',function(){
     let inputTxt = search.value;
     let cards = document.getElementsByClassName("cards");
     console.log('Hello this is me');
     Array.from(cards).forEach(function(elements){
         let para = elements.getElementsByTagName("p")[0].innerText;
         para = para.toLocaleLowerCase();
         if(para.includes(inputTxt))
         {
             elements.style.display ="block";
         }
         else{
            elements.style.display ="none";
         }
         
     });
 });

 //Deleting notes
 function deleteNote(index){
    console.log('Hello '+index);
    let ls = localStorage.getItem("notes");

    if (ls==null) {
        myObj = [];     
    }
     else {
       myObj = JSON.parse(ls); 
    }
    myObj.splice(index,1);
    localStorage.setItem("notes",JSON.stringify(myObj));
    showNotes();

 }

 //Marking notes
function markNote(elemNum) {
    console.log("this is running "+elemNum);
    let cards = document.getElementsByClassName("cards");
    Array.from(cards).forEach(function(element,index) {
        if (elemNum == index) {
            element.style.background ="red";
            element.style.border ="none";
            element.getElementsByTagName("h4")[0].style.color ="white";
            element.getElementsByTagName("p")[0].style.color ="white";

        }
    })
}

 
showNotes();
let addBtn=document.getElementById('addbtn');
let addtitle = document.getElementById('validationinput');
let addTxt= document.querySelector('textarea');
var storageContent ;
var notesObj; 
// add dynamic notes to localstorage of  a browser;
addBtn.addEventListener('click', function(){
    let storedContent = localStorage.getItem('note');
    if(storedContent == null){
        storageContent=[];
    }
    else{
        storageContent= JSON.parse(storedContent);
    }
    notesObj = {
        title  : addtitle.value,
        text : addTxt.value,
    }
    storageContent.push(notesObj);
    localStorage.setItem('note',JSON.stringify(storageContent));
    addtitle.value = '';
    addTxt.value = '';
    showNotes();
})
// show all the notes from localstorage of the browser
function showNotes(){
    let storedContent = localStorage.getItem('note');
    if(storedContent == null){
        storageContent=[];
    }
    else{
        storageContent= JSON.parse(storedContent);
    }
    let html = '';
    let noresult = `<p class="text-danger">Sorry! You have not any note. </p>`;
    storageContent.forEach(function(e,index) {
        if(e.mark == 'important'){
            html += `<div class="markcard card mx-4 my-3" style="width: 20rem;">
                    <div class="card-body">
                        <div class="mark"> <span>IMPORTANT</span></div>
                        <h5 class="card-title">${e.title}</h5>
                        <p class="card-text"> ${e.text}</p>
                        <button id="${index}" onclick="deletenote(this.id)" class="btn btn-danger btn-sm"><i class="fas fa-trash"></i> Delete</button> <button id="${index}" onclick="marknote(this.id)" class="importantbtn btn btn-primary btn-sm text-white mx-3"><i class="fas fa-star"></i> Important?</button>
                    </div>
                </div>`;
        }
        else{
            html += `<div class="card mx-4 my-3" style="width: 20rem;">
                    <div class="card-body">
                    <div class="replace"></div>
                        <h5 class="card-title">${e.title}</h5>
                        <p class="card-text"> ${e.text}</p>
                        <button id="${index}" onclick="deletenote(this.id)" class="btn btn-danger btn-sm"><i class="fas fa-trash"></i> Delete</button> <button id="${index}" onclick="marknote(this.id)" class="importantbtn btn btn-primary btn-sm text-white mx-3"><i class="fas fa-star"></i> Important?</button>
                    </div>
                </div>`;
        }
    })
    let show = document.getElementById('shownote');
    if(storageContent.length !=0){
        show.innerHTML = html;
    }
    else{
        show.innerHTML = noresult;
    }

}
// delete the click notes.
function deletenote(index) {
    console.log(index);
    let storedContent = localStorage.getItem('note');
    if(storedContent == null){
        storageContent=[];
    }
    else{
        storageContent= JSON.parse(storedContent);
    }
    storageContent.splice(index,1);
    localStorage.setItem('note',JSON.stringify(storageContent));
    showNotes();
    
}

//search functionlity
let searchTxt = document.getElementById('searchTxt');
searchTxt.addEventListener('input', function (){
    let searchInput= searchTxt.value.toLowerCase();
    let card = document.getElementsByClassName('card');
    Array.from(card).forEach(function (e) {
        let cardtitle = e.getElementsByTagName('h5')[0].innerText;
        let cardtext = e.getElementsByTagName('p')[0].innerText;
        if(cardtext.includes(searchInput) || cardtitle.includes(searchInput)){
            e.style.display = 'block';
        }
        else{
            e.style.display = 'none';
        }
    })
})

//important functionality
function marknote(index){
    let storedContent = localStorage.getItem('note');
    if(storedContent == null){
        storageContent=[];
    }
    else{
        storageContent= JSON.parse(storedContent);
    }
    gettitle = storageContent[index].title;
    gettext = storageContent[index].text;
    notesObj = {
        title : gettitle,
        text: gettext,
        mark : 'important'
    }
    storageContent.splice(index,1);
    console.log(storageContent);
    storageContent.push(notesObj);
    localStorage.setItem('note',JSON.stringify(storageContent));
    showNotes();
}
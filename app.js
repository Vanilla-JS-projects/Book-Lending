let newbook = document.getElementById('submit');
let list = document.getElementById('list');
let update = document.getElementById('update');
let clear = document.getElementById('clear');
let deletebook = document.getElementById('deletebook');
let fetchbyname = document.getElementById('getspecificbook');
let fetchbyauthor = document.getElementById('fetchbyauthor');
let fetchbyisbn = document.getElementById('fetchbyisbn');
let fetchbygenre = document.getElementById('fetchbygenre');
let fetchbypublication = document.getElementById('fetchbypublication');
let viewbookdetails = document.getElementById('viewbookdetails');


firebase.initializeApp({
  databaseURL: "https://booklending-1438c.firebaseio.com/"
})

const dbRef = firebase.database().ref('/books');



newbook.addEventListener('click', (e) => {
  let author  = document.getElementById('author').value;
  let availibility = document.getElementById('availibility').value;
  let genre = document.getElementById('genre').value;
  let isbn = document.getElementById('isbn').value;
  let publication = document.getElementById('publication').value;
  let title = document.getElementById('title').value;
  addBook(author,availibility,genre,isbn,publication,title);
  e.preventDefault();
    Clear();
})


list.addEventListener('click', (e) => {
  let listdiv = document.getElementById('listdiv');
  listBooks();
  e.preventDefault();
})

fetchbyname.addEventListener('click', (e) =>{
  let listdiv = document.getElementById('listdiv');
  let string = document.getElementById('title').value;
  getBookbyName(string,listdiv);
  e.preventDefault();
})

fetchbyauthor.addEventListener('click', (e) =>{
  let listdiv = document.getElementById('listdiv');
  let string = document.getElementById('author').value;
  getBookbyAuthor(string,listdiv);
  e.preventDefault();
})

fetchbyisbn.addEventListener('click', (e) =>{
  let listdiv = document.getElementById('listdiv');
  let string = document.getElementById('isbn').value;
  getBookbyISBN(string,listdiv);
  e.preventDefault();
})

fetchbypublication.addEventListener('click', (e) =>{
  let listdiv = document.getElementById('listdiv');
  let string = document.getElementById('publication').value;
  getBookbyPublication(string,listdiv);
  e.preventDefault();
})

fetchbygenre.addEventListener('click', (e) =>{
  let listdiv = document.getElementById('listdiv');
  let string = document.getElementById('genre').value;
  getBookbyGenre(string,listdiv);
  e.preventDefault();
})

viewbookdetails.addEventListener('click', (e) =>{
  let listdiv = document.getElementById('listdiv');
  let string = document.getElementById('title').value;
  viewBookDetails(string,listdiv);
  e.preventDefault();
})


deletebook.addEventListener('click', (e) =>{
  let listdiv = document.getElementById('listdiv');
  let title = document.getElementById('title').value;
  deleteBook(title,listdiv);
  e.preventDefault();
})


update.addEventListener('click', (e) =>{
  let listdiv = document.getElementById('listdiv');
  let author  = document.getElementById('author').value;
  let availibility = document.getElementById('availibility').value;
  let genre = document.getElementById('genre').value;
  let isbn = document.getElementById('isbn').value;
  let publication = document.getElementById('publication').value;
  let title = document.getElementById('title').value;
  updateBookDetails(author,availibility,genre,isbn,publication,title);
  e.preventDefault();
})

clear.addEventListener('click', (e) =>{
  Clear();
  e.preventDefault();
})


function updateBookDetails(author,availibility,genre,isbn,publication,title){
 dbRef.once('value').then(function(snapshot){
        JSON.stringify(snapshot.forEach(function(childSnapshot) {
            let bookTitle = JSON.stringify(childSnapshot.child("Title/"));
            let titlewithoutquote = bookTitle.replace(/\"/g, "");
            if (title==titlewithoutquote) 
            {
              let data= {
                 Author:author,
                 Availibility:availibility,
                 Genre:genre,
                 ISBN:isbn,
                 Publication:publication,
                 Title:title
              }

              dbRef.update(data);
            } 
        })); 
  }, 
  function(errorObject){
    alert(errorObject.code + "Error");
  });
}


function Clear(){
  let author  = document.getElementById('author');
  let availibility = document.getElementById('availibility');
  let genre = document.getElementById('genre');
  let isbn = document.getElementById('isbn');
  let publication = document.getElementById('publication');
  let title = document.getElementById('title');
  let listdiv = document.getElementById('listdiv');
  author.value = "";
  availibility.value="";
  genre.value="";
  isbn.value="";
  publication.value="";
  title.value="";
  listdiv.innerHTML = "";
}


function listBooks(){
    listdiv.innerHTML = ""; 
   dbRef.once('value').then(function(snapshot){
   JSON.stringify(snapshot.forEach(function(childSnapshot) {
        let bookTitle = childSnapshot.child("Title/");
        let bookAvailibility = childSnapshot.child('Availibility');
    listdiv.innerHTML += "<br><br>" + "Title:" + JSON.stringify(bookTitle) + "<br>" + "Availibility:" + JSON.stringify(bookAvailibility); 
  })); 
  }, 
  function(errorObject){
    alert(errorObject.code + "Error");
  });
}


function addBook(author,availibility,genre,isbn,publication,title) {
  let key = dbRef.push().getKey();
  dbRef.child(key).set({
    Author:author,
    Availibility:availibility,
    Genre:genre,
    ISBN:isbn,
    Publication:publication,
    Title:title
  });
  
  alert("New book Added");
}


function getBookbyName(string,listdiv){
   listdiv.innerHTML = "Books by name " + string + ":";  
   dbRef.once('value').then(function(snapshot){
        JSON.stringify(snapshot.forEach(function(childSnapshot) {
            let bookTitle = JSON.stringify(childSnapshot.child("Title/"));
            let titlewithoutquote = bookTitle.replace(/\"/g, "");
            if (string==titlewithoutquote) 
            {
              let bookAvailibility = childSnapshot.child('Availibility');
              listdiv.innerHTML += "<br><br>" + "Title:" + JSON.stringify(titlewithoutquote) + "<br>" + "Availibility:" + JSON.stringify(bookAvailibility);
            } 
        })); 
  }, 
  function(errorObject){
    alert(errorObject.code + "Error");
  });
}


function getBookbyAuthor(string,listdiv){
   listdiv.innerHTML = "Books by " + string + ":"; 
   dbRef.once('value').then(function(snapshot){
        JSON.stringify(snapshot.forEach(function(childSnapshot) {
            let bookTitle = JSON.stringify(childSnapshot.child("Title/"));
            let bookAuthor = JSON.stringify(childSnapshot.child("Author/"));
            let authorwithoutquote = bookAuthor.replace(/\"/g, "");
            let titlewithoutquote = bookTitle.replace(/\"/g, "");
            if (string==authorwithoutquote) 
            {
              let bookAvailibility = childSnapshot.child('Availibility');
              listdiv.innerHTML += "<br><br>Title:" + JSON.stringify(childSnapshot.child("Title/")) + "<br>" + "Availibility:" + JSON.stringify(bookAvailibility);
            } 
        })); 
  }, 
  function(errorObject){
    alert(errorObject.code + "Error");
  });
}

function getBookbyISBN(string,listdiv){
   listdiv.innerHTML = "Books matching ISBN " + string + ":" ; 
   dbRef.once('value').then(function(snapshot){
        JSON.stringify(snapshot.forEach(function(childSnapshot) {
            let bookTitle = JSON.stringify(childSnapshot.child("Title/"));
            let bookISBN = JSON.stringify(childSnapshot.child("ISBN/"));
            let isbnwithoutquote = bookISBN.replace(/\"/g, "");
            let titlewithoutquote = bookTitle.replace(/\"/g, "");
            if (string==isbnwithoutquote) 
            {
              let bookAvailibility = childSnapshot.child('Availibility');
              listdiv.innerHTML += "<br><br>" + "Title:" + JSON.stringify(childSnapshot.child("Title/")) + "<br>" + "Availibility:" + JSON.stringify(bookAvailibility);
            } 
        })); 
  }, 
  function(errorObject){
    alert(errorObject.code + "Error");
  });
}


function getBookbyPublication(string,listdiv){
   listdiv.innerHTML = "Books published by " + string + ":" ; 
   dbRef.once('value').then(function(snapshot){
        JSON.stringify(snapshot.forEach(function(childSnapshot) {
            let bookTitle = JSON.stringify(childSnapshot.child("Title/"));
            let bookPublication = JSON.stringify(childSnapshot.child("Publication/"));
            let publicationwithoutquote = bookPublication.replace(/\"/g, "");
            let titlewithoutquote = bookTitle.replace(/\"/g, "");
            if (string==publicationwithoutquote) 
            {
              let bookAvailibility = childSnapshot.child('Availibility');
              listdiv.innerHTML += "<br><br>" + "Title:" + JSON.stringify(childSnapshot.child("Title/")) + "<br>" + "Availibility:" + JSON.stringify(bookAvailibility);
            } 
        })); 
  }, 
  function(errorObject){
    alert(errorObject.code + "Error");
  });
}

function getBookbyGenre(string,listdiv){
   listdiv.innerHTML = "Books listed under " + string + " genre:" ; 
   dbRef.once('value').then(function(snapshot){
        JSON.stringify(snapshot.forEach(function(childSnapshot) {
            let bookTitle = JSON.stringify(childSnapshot.child("Title/"));
            let bookGenre = JSON.stringify(childSnapshot.child("Genre/"));
            let genrewithoutquote = bookGenre.replace(/\"/g, "");
            let titlewithoutquote = bookTitle.replace(/\"/g, "");
            if (string==genrewithoutquote) 
            {
              let bookAvailibility = childSnapshot.child('Availibility');
              listdiv.innerHTML += "<br><br>" + "Title:" + JSON.stringify(childSnapshot.child("Title/")) + "<br>" + "Availibility:" + JSON.stringify(bookAvailibility);
            } 
        })); 
  }, 
  function(errorObject){
    alert(errorObject.code + "Error");
  });
}

function deleteBook(title,listdiv){
   listdiv.innerHTML = ""; 
   dbRef.once('value').then(function(snapshot){
        JSON.stringify(snapshot.forEach(function(childSnapshot) {
            let bookTitle = JSON.stringify(childSnapshot.child("Title/"));
            let titlewithoutquote = bookTitle.replace(/\"/g, "");
            if (title==titlewithoutquote) 
            {
              let key = childSnapshot.key;
              dbRef.child(key).remove();
              listdiv.innerHTML += "<br><br> Book with " + "Title:" + JSON.stringify(titlewithoutquote) + " is deleted from database!" } 
        })); 
  }, 
  function(errorObject){
    alert(errorObject.code + "Error");
  });
}


function viewBookDetails(title,listdiv){
   listdiv.innerHTML = ""; 
   dbRef.once('value').then(function(snapshot){
    JSON.stringify(snapshot.forEach(function(childSnapshot) {
            let bookTitle = JSON.stringify(childSnapshot.child("Title/"));
            let titlewithoutquote = bookTitle.replace(/\"/g, "");
            if (title==titlewithoutquote) 
            {
              let temp = childSnapshot.val();
              let temp2 = JSON.stringify(temp);
              listdiv.innerHTML = temp2.replace(/\"/g, "");
            } 
        })); 
  }, 
  function(errorObject){
    alert(errorObject.code + "Error");
  });
}































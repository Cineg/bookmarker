//listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

//Save bookmark
function saveBookmark(e){

  //Get values from form
  let siteName = document.getElementById('siteName').value;
  let siteURL = document.getElementById('siteURL').value;

  if(!validateForm(siteName, siteURL)){
    return false;
  }

  //create bookmark object
  let bookmark = {
    name: siteName,
    url: siteURL
  }


  //test if bookmarks is null
  if(localStorage.getItem('bookmarks') === null){
    //init array
    let bookmarks = [];
    //add to array
    bookmarks.push(bookmark);
    //set to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    //get bookmarks from localStorage
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Add bookmark to array
    bookmarks.push(bookmark);
    //set to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  //clear form
  document.getElementById('myForm').reset();

  //Re-fetch bookmarks
  fetchBookmarks();

  //Prevent for from submitting
  e.preventDefault();
}

//delete bookmark
function deleteBookmark(url){
  console.log(url);
  //get bookmarks
  let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  //loop through bookmarks
  for (let i = 0; i < bookmarks.length; i++) {
    let bookmarkURL = bookmarks[i].url;
    if(bookmarkURL == url){
      bookmarks.splice(i, 1);
    }
  }
  //reset localstorage after deleting
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  //re-fetch bookmarks
  fetchBookmarks();
}


// fetch bookmarks
function fetchBookmarks(){
  let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  //get output id
  let bookmarksResults = document.getElementById('bookmarksResults');

  //build output
  bookmarksResults.innerHTML = '';

  for (let i = 0; i < bookmarks.length; i++) {
    let name = bookmarks[i].name;
    let url = bookmarks[i].url;

    bookmarksResults.innerHTML += '<div class="card">'+
                                  '<h3>' + name +
                                  '<a class="btn btn-secondary" target="_blank" href="'+url+'">'+' Visit '+'</a>'+
                                  '<a class="btn btn-danger" href="#" onclick="deleteBookmark(\''+url+'\')">'+' Delete '+'</a>'+
                                  '</h3>' +
                                  '</div>';
  }
}

function validateForm(siteName, siteURL){
  if(!siteName || !siteURL){
    alert("Please fill in the form");
    return false;
  }

  //checking if url is actually a URL
  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);
  if(!siteURL.match(regex)){
    alert('Please use valid url');
    return false;
  }

  return true;
}

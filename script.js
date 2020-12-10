var file;
let isChecked;
let url;
let isLoaded;
let urls = [];
let index;
let mobileDevice = false;
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
 // some code..
 mobileDevice = true;
}


var firebaseConfig = {
  // Personal firebase data goes here


};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
//
database = firebase.database();

var ref = database.ref('photosVol2')
ref.on('value', gotData, errData);
let textLink = document.getElementById('textLink')
textLink.onclick = function(){
  scroller();
}


var fileButton = document.getElementById('fileButton')
var checkbox = document.getElementById('checkBox')
var text = document.getElementById('text')

let vh = window.innerHeight * 0.01;

document.documentElement.style.setProperty('--vh', `${vh}px`);

fileButton.addEventListener('change',function(e){
  file = e.target.files[0];
  if(file.size > 7000000){
   alert("This file is too big... Please choose a file that's under 7MB");
   this.value = "";
}else{
  if(!mobileDevice){
    var image = document.getElementById('image');
    image.src = URL.createObjectURL(event.target.files[0]);
    let imageArea = document.getElementById('imageArea')


  }

  }
});


checkbox.addEventListener('change',function(e){
  if(checkbox.checked){
    uploadButton.removeAttribute("disabled");
  }else{
    uploadButton.setAttribute("disabled", true);
  }
});


function upload(){
  if(file != null && checkbox.checked){
    var randomName = Math.floor(Math.random()*1000000);
    var storageRef = firebase.storage().ref('photosVol2/' + randomName + file.name)
    var task = storageRef.put(file);


    task.on('state_changed',
    function progress(snapshot){

      //show progress
      var percentage = Math.floor((snapshot.bytesTransferred /
        snapshot.totalBytes) * 100);
        text.innerHTML = "Uploading: " + percentage + "%"
      },

      function error(err){

      },

      function complete(){
        text.innerHTML = "Complete"

        //add reference to database
        task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          url = downloadURL;
          saveImage(url);
        });


      });

    }

    if(file == null){
      text.innerHTML = "Select a file"
    }
  }






  function gotData(data){

    var src = document.getElementById("imageContainer");
    src.innerHTML = ""
    var photos = data.val();

    if(photos){
      var keys = Object.keys(photos);
      numPhotos = keys.length;

      for(var i = keys.length; i >= 0; i--){
        var key = keys[i];
        var ref = database.ref('photosVol2/' + key);
        ref.on('value',addImage);
        function addImage(data){
          var dbphoto = data.val();
          if(dbphoto != null){


            urls[i] = {
              url: dbphoto.url,
              title: dbphoto.name
            }


          }
        }

      }
      index = numPhotos -1;
      var img = document.createElement("img");
      img.classList.add("image")
      img.src = urls[index].url;

      var nm = document.createElement("P");
      if(urls[numPhotos-1].title == ""){
        nm.innerHTML = "<i>Untitled</i>"
      }else{
        nm.innerHTML = "<i>" + urls[index].title+"</i>"
      }
      var pg = document.createElement("P");
      pg.innerHTML = index + 1;
      src.appendChild(img);
      src.appendChild(nm)
      src.appendChild(pg)

  }
    //Remove upload form when reaching 100 photos
    if(numPhotos == 100){
      removeForm();
    }
    isLoaded = true;

  }


  function errData(err){
    console.log(err);
  }


  function saveImage(url){
    let name = document.getElementById('inp').value
    var photoURL = {
      url: url,
      name: name
    }
    ref.push(photoURL)
    uploadComplete();
  }


  function deleteEntries(ref){
  ref.remove();

}


function previewText(){
  let input =
  console.log(input.value)
}



function scroller(){
  console.log("he")
  let elmt = document.getElementById('flexContainer')
  elmt.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
}



function uploadComplete(){
  let cont = document.getElementById('IXcontainer')
  cont.innerHTML = "";

  var msg = document.createElement("P");
  msg.innerHTML = "Thank you for your contribution!<br> <br>If you want your photo withdrawn from this project you can contact us at any time. <br> <br>E-mail: contact@backendbooks.no <br> Instagram: @backendbooks"
  msg.classList.add("smaller")
  cont.appendChild(msg);
}


function goLeft(){

  if(index <= 0){

  }else if(index == 1){
    index -= 2;
    
    //left Page
    var pageL= document.getElementById("imageContainer");
    pageL.innerHTML = ""

    //right Page
    var pageR= document.getElementById("rightPageCont");
    pageR.innerHTML = ""
    pageR.style.background = "linear-gradient(270deg, rgba(255,255,255,1) 94%, rgba(236,236,236,1) 97%, rgba(160,160,160,1) 100%)"

    var img2 = document.createElement("img");
    img2.classList.add("image")
    img2.src = urls[index+1].url;

    var nm2 = document.createElement("P");
    if(urls[index+1].title == ""){
      nm2.innerHTML = "<i>Untitled</i>"
    }else{
      nm2.innerHTML = "<i>" + urls[index+1].title+"</i>"
    }
    var pg2 = document.createElement("P");
    pg2.innerHTML = index + 2;
    pageR.appendChild(img2);
    pageR.appendChild(nm2)
    pageR.appendChild(pg2)

  }else{
  index -= 2;

  //left Page
  var pageL= document.getElementById("imageContainer");
  pageL.innerHTML = ""

  var img = document.createElement("img");
  img.classList.add("image")
  img.src = urls[index].url;

  var nm = document.createElement("P");
  if(urls[index].title == ""){
    nm.innerHTML = "<i>Untitled</i>"
  }else{
    nm.innerHTML = "<i>" + urls[index].title+"</i>"
  }
  var pg = document.createElement("P");
  pg.innerHTML = index + 1;
  pageL.appendChild(img);
  pageL.appendChild(nm)
  pageL.appendChild(pg)


  //right Page
  var pageR= document.getElementById("rightPageCont");
  pageR.innerHTML = ""
  pageR.style.background = "linear-gradient(270deg, rgba(255,255,255,1) 94%, rgba(236,236,236,1) 97%, rgba(160,160,160,1) 100%)"

  var img2 = document.createElement("img");
  img2.classList.add("image")
  img2.src = urls[index+1].url;

  var nm2 = document.createElement("P");
  if(urls[index+1].title == ""){
    nm2.innerHTML = "<i>Untitled</i>"
  }else{
    nm2.innerHTML = "<i>" + urls[index+1].title+"</i>"
  }
  var pg2 = document.createElement("P");
  pg2.innerHTML = index + 2;
  pageR.appendChild(img2);
  pageR.appendChild(nm2)
  pageR.appendChild(pg2)
}
console.log(index)
}

function goRight(){

  if(index == numPhotos - 1){

  }else if(index == numPhotos - 3){
    index += 2;
    // left page
    var pageL= document.getElementById("imageContainer");
    pageL.innerHTML = ""

    var img = document.createElement("img");
    img.classList.add("image")
    img.src = urls[index].url;

    var nm = document.createElement("P");
    if(urls[index].title == ""){
      nm.innerHTML = "<i>Untitled</i>"
    }else{
      nm.innerHTML = "<i>" + urls[index].title+"</i>"
    }
    var pg = document.createElement("P");
    pg.innerHTML = index + 1;
    pageL.appendChild(img);
    pageL.appendChild(nm)
    pageL.appendChild(pg)

    //r page
    var pageR= document.getElementById("rightPageCont");
    pageR.innerHTML = ""
    pageR.style.background = ""
  }else{
  index += 2;

  //left page
  var pageL= document.getElementById("imageContainer");
  pageL.innerHTML = ""

  var img = document.createElement("img");
  img.classList.add("image")
  img.src = urls[index].url;

  var nm = document.createElement("P");
  if(urls[index].title == ""){
    nm.innerHTML = "<i>Untitled</i>"
  }else{
    nm.innerHTML = "<i>" + urls[index].title+"</i>"
  }
  var pg = document.createElement("P");
  pg.innerHTML = index + 1;
  pageL.appendChild(img);
  pageL.appendChild(nm)
  pageL.appendChild(pg)



  //right page
  var pageR= document.getElementById("rightPageCont");
  pageR.innerHTML = ""

  var img2 = document.createElement("img");
  img2.classList.add("image")
  img2.src = urls[index+1].url;

  var nm2 = document.createElement("P");
  if(urls[index+1].title == ""){
    nm2.innerHTML = "<i>Untitled</i>"
  }else{
    nm2.innerHTML = "<i>" + urls[index+1].title+"</i>"
  }
  var pg2 = document.createElement("P");
  pg2.innerHTML = index + 2;
  pageR.appendChild(img2);
  pageR.appendChild(nm2)
  pageR.appendChild(pg2)
}
console.log(index)
}



document.addEventListener('keydown', logKey);

function logKey(e) {
  console.log(e)
  if(e.key == "ArrowLeft"){
    goLeft();
  }
  if(e.key == "ArrowRight"){
    goRight();
  }
}


function removeForm(){
  let cont = document.getElementById('IXcontainer')
  cont.innerHTML = "";

}

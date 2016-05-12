'use strict'

function loadFile(method,url,args){
	var promise = new Promise(function(resolve, reject){
		var xhr;
		if (window.XMLHttpRequest) {
			xhr = new XMLHttpRequest();
		}else if (window.ActiveXObject) {
			//ie
			try{
				xhr = new ActiveXObject("Microsoft.XMLHTTP");
			}catch(e){
				try{
					xhr = new ActiveXObject("Msxml2.XMLHTTP");
				}catch(e){}
			}
		}
		xhr.open(method, url);
		xhr.responseType = "blob";
		
		xhr.onload = function(){
			if (xhr.readyState === 4 && xhr.status === 200) {
				resolve(xhr.response);
			}else{
				reject(xhr.statusText);
			}
		};
		xhr.onerror = function(){
			reject(xhr.statusText);
		};
		xhr.send();
	});

	return promise;
}

var img = document.getElementById("img");
 
  loadFile('POST','Koala.jpg').then(function(response) {
    // The first runs when the promise resolves, with the request.reponse
    // specified within the resolve() method.
    var imageURL = window.URL.createObjectURL(response);
    myImage.src = imageURL;
    body.appendChild(myImage);
    // The second runs when the promise
    // is rejected, and logs the Error specified with the reject() method.
  }, function(Error) {
    console.log(Error);
  });
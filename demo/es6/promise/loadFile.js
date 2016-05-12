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
 
  loadFile('GET','Koala.jpg').then(function(response) {
    var imageURL = window.URL.createObjectURL(response);
    img.src = imageURL;
      }, function(Error) {
    console.log(Error);
  });
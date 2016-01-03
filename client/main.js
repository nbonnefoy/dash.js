"use strict";

var data;

function loadJSON(callback) {
	var xobj = new XMLHttpRequest();
		xobj.overrideMimeType("application/json");
	xobj.open('GET', 'data.json', true); // Replace 'my_data' with the path to your file
	xobj.onreadystatechange = function () {
		  if (xobj.readyState == 4 && xobj.status == "200") {
			// Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
			callback(xobj.responseText);
		  }
	};
	xobj.send(null);  
 }

function playVideo(d) {
	var video,context,player;
	video = document.querySelector("video");
	context = new Dash.di.DashContext();
	player = new MediaPlayer(context);
	player.startup();
	player.attachView(video);
	player.setAutoPlay(true);
	player.attachSource(d.url, null, d.protData);
}

function updateSource(){
	data.url = document.getElementById("stream-url").value;
	data.protData["com.widevine.alpha"].httpRequestHeaders["dt-custom-data"] = document.getElementById("token").value;
	playVideo(data);
}

function init(){
	loadJSON(function(d){
		data = JSON.parse(d);
		document.getElementById("stream-url").value = data.url;
		document.getElementById("token").value = data.protData["com.widevine.alpha"].httpRequestHeaders["dt-custom-data"];
	});
}

document.addEventListener('DOMContentLoaded', init);
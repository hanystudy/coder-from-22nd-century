navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia
window.URL = window.URL || window.webkitURL

let camVideo = document.getElementById('camVideo')

function gotStream(stream) {
	if (window.URL) {
    camVideo.src = window.URL.createObjectURL(stream)
  }
	else // Opera
	{
    camVideo.src = stream
  }

	camVideo.onerror = function(e) {stream.stop()}
	stream.onended = noStream;
}

function noStream(e) {
	var msg = 'No camera available.';
	if (e.code == 1) {msg = 'User denied access to use camera.'}
	document.getElementById('errorMessage').textContent = msg
}

if (!navigator.getUserMedia)
{
	document.getElementById('errorMessage').innerHTML =
		'Sorry. <code>navigator.getUserMedia()</code> is not available.';
} else {
	navigator.getUserMedia({video: true}, gotStream, noStream);
}

export default camVideo

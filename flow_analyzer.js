with(window) AudioContext=AudioContext||webkitAudioContext;
var audioVisual=document.getElementById('spectrum'),
	canvas_context=canvas.getContext('2d'),
	context=new AudioContext(),
	audio=new Audio(),
	analyser=context.createAnalyser(),
	source=context.createMediaElementSource(audio);
with(audio)
	src='/sound/depe.ogg',
	controls=loop=autoplay=true,
	id='a',
	onended=function(){next()};
audioVisual.appendChild(audio);
source.connect(analyser);
with(analyser) fftSize=8192, connect(context.destination);
with(window) requestAnimFrame=(function(){return requestAnimationFrame||webkitRequestAnimationFrame||mozRequestAnimationFrame||function(callback){setTimeout(callback,1000/60)}})();
function async_get(url,callback){ with(x=new XMLHttpRequest()) onreadystatechange=function(){ return readyState==4 && status==200 && callback(responseText); }, open("GET",url,true), send(null); }
function next(){ async_get('/sound/_soundlist.php?rand=true',function(data){ console.log("playing "+data); audio.src=data; audio.play(); }); }
function pause(){ audio.pause(); button_pause.classList.remove("fa-pause"); link_pause.setAttribute("onclick","play()"); }
function play(){ audio.play(); button_pause.classList.add("fa-pause"); link_pause.setAttribute("onclick","pause()"); }
next(),(function t(){ window.requestAnimFrame(t);
	var i,j, sum, scaled_average, num_bars=canvas.width/4, data=new Uint8Array(2048), bin_size=0|(data.length/num_bars);
	analyser.getByteFrequencyData(data);
	with(canvas_context) fillStyle="#01FFA1", clearRect(0,0,canvas.width,canvas.height);
	for(i=0;i<num_bars;++i){
		sum=0; for(j=0;j<bin_size;++j) sum+=data[(i*bin_size)+j];
		scaled_average=canvas.height*sum/(bin_size*256);
		sum=canvas.width/num_bars;
		canvas_context.fillRect(i*sum,canvas.height,sum-2,-scaled_average);
	}
})();
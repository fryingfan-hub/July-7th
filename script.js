(function(){
  var bgLayer = document.getElementById('bg-layer');
  for(var i=0;i<10;i++){
    var b = document.createElement('div');
    b.className='bokeh';
    var size = 20+Math.random()*50;
    b.style.width=size+'px'; b.style.height=size+'px';
    b.style.left=(Math.random()*100)+'%';
    b.style.bottom='-'+(Math.random()*20)+'%';
    b.style.animationDuration=(10+Math.random()*10)+'s';
    b.style.animationDelay=(Math.random()*10)+'s';
    bgLayer.appendChild(b);
  }
  for(var j=0;j<8;j++){
    var f = document.createElement('div');
    f.className='firefly';
    f.style.left=(Math.random()*100)+'%';
    f.style.top=(30+Math.random()*60)+'%';
    f.style.animationDuration=(3+Math.random()*3)+'s';
    f.style.animationDelay=(Math.random()*4)+'s';
    bgLayer.appendChild(f);
  }
})();

function spawnButterflies(){
  document.querySelectorAll('.butterfly').forEach(function(el){ el.remove(); });
  var wrap = document.getElementById('bouquet-wrap');
  var positions = [{left:'20%', top:'30%'}, {left:'70%', top:'22%'}, {left:'45%', top:'40%'}];
  positions.forEach(function(p, idx){
    var b = document.createElement('div');
    b.className='butterfly';
    b.textContent='🦋';
    b.style.left = p.left; b.style.top = p.top;
    b.style.animationDelay = (3.6 + idx*0.6) + 's';
    wrap.appendChild(b);
  });
}
spawnButterflies();

document.querySelectorAll('.photo-frame').forEach(function(frame){
  frame.addEventListener('touchstart', function(){
    frame.classList.add('tap-sparkle');
    setTimeout(function(){ frame.classList.remove('tap-sparkle'); }, 900);
  }, {passive:true});
});

function spawnPetals(){
  document.querySelectorAll('.falling-petal').forEach(function(el){ el.remove(); });
  var wrap = document.getElementById('bouquet-wrap');
  for(var i=0;i<14;i++){
    var p = document.createElement('div');
    p.className='falling-petal';
    p.style.left=(Math.random()*100)+'%';
    p.style.animationDuration=(5+Math.random()*4)+'s';
    p.style.animationDelay=(3.6+Math.random()*4)+'s';
    p.style.transform='rotate('+(Math.random()*40)+'deg)';
    wrap.appendChild(p);
  }
}
spawnPetals();

function spawnFinalSparkles(){
  document.querySelectorAll('.final-sparkle').forEach(function(el){ el.remove(); });
  var wrap = document.getElementById('bouquet-wrap');
  var pts = [{l:'30%',t:'25%'},{l:'55%',t:'18%'},{l:'70%',t:'32%'},{l:'40%',t:'12%'},{l:'60%',t:'40%'}];
  pts.forEach(function(pt, idx){
    var s = document.createElement('div');
    s.className='final-sparkle';
    s.style.left = pt.l; s.style.top = pt.t;
    s.style.animationDelay = (4.3 + idx*0.12) + 's';
    wrap.appendChild(s);
  });
}
spawnFinalSparkles();

setTimeout(function(){
  document.getElementById('intro').classList.add('hide');
}, 3800);

setTimeout(function(){
  document.getElementById('message-card').classList.add('show');
}, 5200);

document.getElementById('bloom-again').addEventListener('click', function(){
  var svg = document.getElementById('bouquet-svg');
  var parent = svg.parentNode;
  var clone = svg.cloneNode(true);
  parent.replaceChild(clone, svg);
  spawnButterflies();
  spawnPetals();
  spawnFinalSparkles();
});

// Image Handler Logic
document.querySelectorAll('.photo-input').forEach(input => {
  input.addEventListener('change', function(e) {
    const file = e.target.files[0];
    const frame = this.closest('.photo-frame');
    const imgEl = frame.querySelector('.uploaded-img');
    
    if (file) {
      const reader = new FileReader();
      reader.onload = function(event) {
        imgEl.src = event.target.result;
        frame.classList.add('has-img');
      }
      reader.readAsDataURL(file);
    }
  });
});

// Fixed Image Resolver logic for hardcoded items
document.querySelectorAll('.uploaded-img').forEach(img => {
  const frame = img.closest('.photo-frame');
  
  function checkAndShowImage() {
    if (img.src && !img.src.includes('your-photo')) {
      frame.classList.add('has-img');
    }
  }

  if (img.complete) {
    checkAndShowImage();
  } else {
    img.addEventListener('load', checkAndShowImage);
  }
});

// Real Music Control Logic
const audio = document.getElementById('bg-music');
const playBtn = document.getElementById('play-btn');
const muteBtn = document.getElementById('mute-btn');
const volSlider = document.getElementById('vol-slider');

audio.volume = volSlider.value / 100;

playBtn.addEventListener('click', function(){
  if(audio.paused){
    audio.play().catch(err => console.log("Audio play blocked until user interaction."));
    playBtn.textContent = '⏸';
  } else {
    audio.pause();
    playBtn.textContent = '▶';
  }
});

muteBtn.addEventListener('click', function(){
  audio.muted = !audio.muted;
  muteBtn.textContent = audio.muted ? '🔇' : '🔊';
});

volSlider.addEventListener('input', function(){
  audio.volume = this.value / 100;
  if(audio.volume > 0 && audio.muted) {
    audio.muted = false;
    muteBtn.textContent = '🔊';
  }
});
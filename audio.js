class Soundscape{
 constructor(){this.enabled=false;this.track='';this.music=new Audio();this.music.loop=true;this.music.volume=0;this.ambience=new Audio('assets/music/rain-ambience.wav');this.ambience.loop=true;this.ambience.volume=0;this.volume=.32;this.sfx=.25;this.rain=.12;this.fade=null}
 unlock(){this.enabled=true;this.change(this.pending||'daylight');}
 change(key){this.pending=key;if(!this.enabled||this.track===key)return;clearInterval(this.fade);if(this.fading){this.fading.pause();this.fading.src=''}const previous=this.music,next=new Audio(`assets/music/${key}.wav`);this.fading=previous;next.loop=true;next.volume=0;this.music=next;this.track=key;next.play().catch(()=>{});let ticks=0;const oldVolume=previous.volume;this.fade=setInterval(()=>{ticks++;let x=Math.min(1,ticks/24);previous.volume=oldVolume*(1-x);next.volume=this.volume*x;if(x===1){previous.pause();previous.src='';this.fading=null;clearInterval(this.fade)}},40)}
 update(settings){this.volume=settings.music/100;this.sfx=settings.sfx/100;this.rain=settings.ambience/100;this.music.volume=this.volume;this.ambience.volume=this.isRaining?this.rain:0}
 weather(raining){this.isRaining=raining;this.ambience.volume=raining?this.rain:0;if(raining&&this.enabled)this.ambience.play().catch(()=>{});else this.ambience.pause()}
 click(choice=false){if(!this.enabled||!this.sfx)return;try{this.ctx??=new AudioContext();if(this.ctx.state==='suspended')this.ctx.resume();const t=this.ctx.currentTime,o=this.ctx.createOscillator(),g=this.ctx.createGain();o.type='sine';o.frequency.setValueAtTime(choice?740:550,t);o.frequency.exponentialRampToValueAtTime(choice?980:420,t+.07);g.gain.setValueAtTime(this.sfx*.045,t);g.gain.exponentialRampToValueAtTime(.0001,t+.12);o.connect(g).connect(this.ctx.destination);o.start(t);o.stop(t+.13)}catch{}}
 pause(){this.music.pause();this.ambience.pause();this.fading?.pause()}
 resume(){if(this.enabled){this.music.play().catch(()=>{});if(this.isRaining)this.ambience.play().catch(()=>{})}}
}
const sound=new Soundscape();
document.addEventListener('visibilitychange',()=>document.hidden?sound.pause():sound.resume());

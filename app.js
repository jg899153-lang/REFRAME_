window.__REFRAME_CMS__=window.__REFRAME_CMS__||{};window.__REFRAME_CMS__.media=window.__REFRAME_CMS__.media||{};window.__REFRAME_CMS__.media['assets/handmaiden.mp4']='assets/handmaiden.mp4';
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
let reduced=matchMedia('(prefers-reduced-motion: reduce)').matches; document.documentElement.classList.toggle('motion-off',reduced); document.documentElement.classList.toggle('motion-on',!reduced);
$('#menuToggle').onclick=()=>{let open=$('#nav').classList.toggle('open');$('#menuToggle').setAttribute('aria-expanded',String(open));$('#menuToggle span').textContent=open?'−':'＋'};
$$('nav a').forEach(a=>a.onclick=()=>{$('#nav').classList.remove('open');$('#menuToggle').setAttribute('aria-expanded','false')});
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.13});$$('.reveal').forEach(x=>observer.observe(x));
const clamp=(n,a=0,b=1)=>Math.max(a,Math.min(b,n));
splitKineticText('.hero-title .title-first,.hero-title .title-second','hero-glyph');
const heroGlyphs=$$('.hero-title .hero-glyph');
let queued=false;
const motionSections=[['#artist','.artist-grid']];
function drawIntroVortex(progress,disabled){
 const canvas=$('.intro-vortex');if(!canvas)return;
 const ctx=canvas.getContext('2d'),w=innerWidth,h=innerHeight,dpr=Math.min(devicePixelRatio||1,2);
 if(canvas.width!==Math.round(w*dpr)||canvas.height!==Math.round(h*dpr)){canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr)}
 ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,w,h);
 if(disabled||w<761||progress<=0||progress>=1)return;
 const intensity=Math.sin(progress*Math.PI),cx=w*.5,cy=h*.43,maxR=Math.hypot(w,h)*.56;
 ctx.lineWidth=.7;
 for(let arm=0;arm<5;arm++){
  ctx.beginPath();
  for(let j=0;j<=65;j++){
   const t=j/65,angle=arm*Math.PI*2/5+t*3.8-progress*3.3;
   const r=maxR*(.09+t*.91)*(1-progress*.76);
   const x=cx+Math.cos(angle)*r,y=cy+Math.sin(angle)*r*.74;
   if(j===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
  }
  ctx.strokeStyle=`rgba(213,199,161,${intensity*.20})`;ctx.stroke();
 }
 for(let i=0;i<160;i++){
  const seed=((i*73)%163)/163,angle=i*2.39996-progress*(2.2+seed*2.6);
  const r=maxR*(.14+seed*.86)*Math.pow(1-progress,.8),x=cx+Math.cos(angle)*r,y=cy+Math.sin(angle)*r*.76;
  ctx.fillStyle=`rgba(228,215,181,${intensity*(.12+seed*.40)})`;
  ctx.beginPath();ctx.arc(x,y,.5+(i%4)*.35,0,Math.PI*2);ctx.fill();
 }
}
function update(){
 queued=false;
 $('.scroll-progress').style.transform=`scaleX(${scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight)})`;
 $('#header').classList.toggle('scrolled',scrollY>30);

 const vh=innerHeight;
 const intro=$('#home').getBoundingClientRect();const p=clamp(-intro.top/Math.max(1,intro.height-vh));
 const smooth=(a,b)=>{const t=clamp((p-a)/(b-a));return t*t*(3-2*t)};
 const doorOpen=reduced?1:smooth(.03,.40),entryFade=reduced?1:smooth(.32,.56);
 $('.door-leaf-left').style.transform=`rotateY(${-doorOpen*106}deg)`;
 $('.door-leaf-right').style.transform=`rotateY(${doorOpen*106}deg)`;
 $('.door-scene').style.transform=`scale(${1+smooth(.16,.56)*1.5})`;
 $('.door-scene').style.opacity=String(1-entryFade);
 $('.door-scene').style.filter=`brightness(.76) saturate(.9) blur(${entryFade*3}px)`;
 const titleIn=reduced?1:smooth(.17,.38),reveal=reduced?1:smooth(.43,.73);
 $('.opening-title-layer').style.opacity=String(titleIn);
 $('.opening-title-layer').style.width=`${60-reveal*41.5}vw`;
 $('.opening-title-layer').style.filter=`blur(${(1-titleIn)*12}px)`;
 const aperture=reduced?1:smooth(.46,.76);
 const radius=Math.hypot(innerWidth*.5,innerHeight*.57)*1.01*aperture;
 $('.hero-title-art').style.opacity=String(aperture>0?1:0);
 $('.hero-title-art').style.clipPath=`circle(${radius}px at 50% 43%)`;
 $('.intro-dark-aperture').style.clipPath=`circle(${Math.hypot(innerWidth,innerHeight)*.53*smooth(.40,.73)}px at 50% 43%)`;
 $('.intro-dark-aperture').style.opacity=String(1-smooth(.72,.80));
 drawIntroVortex(aperture,reduced);
 $('.hero-title-art').style.transform='translate(-50%,-50%)';
 $('.hero-title-art').style.filter=`blur(${(1-aperture)*3}px)`;
 $('.curtain-stage .hero-back').style.opacity='0';
 $('.opening-year').style.opacity=String(reveal);
 $('.hero-copy').style.opacity='0';
 $('.curtain-stage .intro-foot').style.opacity=String(1-smooth(.50,.75));
 const ending=$('#ending').getBoundingClientRect();const ep=clamp((vh-ending.top)/(vh+ending.height));$('#ending').style.setProperty('--drift',`${-ep*65}px`);
 if(reduced)return;
 // Scroll both directions: text and image follow separate tracks.
 const pr=$('#poster').getBoundingClientRect();const enter=clamp((vh-pr.top)/vh);const pt=clamp(-pr.top/Math.max(1,pr.height-vh));
 const lift=clamp(pt/.3);const exit=clamp((pt-.56)/.44);
 $('.poster-copy').style.transform=`translate3d(0,${(1-enter)*95-exit*200}px,0)`;
 $('.poster-copy').style.opacity=String(1-exit*.82);
 $$('.poster-copy > *').forEach((el,i)=>{const step=clamp(enter*1.5-i*.035);el.style.transform=`translate3d(0,${(1-step)*48-exit*i*5}px,0)`;el.style.opacity=String(Math.max(.08,step))});
 $('.poster-frame').style.transform=`translate3d(0,${(1-enter)*180+(1-lift)*85-exit*110}px,0) rotate(${(1-lift)*-4+exit*2}deg) scale(${.9+lift*.1+exit*.06})`;
 $('.poster-frame').style.opacity=String(.4+enter*.6);
 $('.poster-frame img').style.transform=`scale(${1+exit*.035})`;
 for(const [id,child] of motionSections){const r=$(id).getBoundingClientRect();const en=clamp((vh-r.top)/(vh*.8));const out=clamp((-r.top-r.height*.28)/(vh*.75));const el=$(child);el.style.transform=`translate3d(0,${(1-en)*105-out*85}px,0)`;el.style.opacity=String(Math.max(.1,Math.min(1,en*1.5)*(1-out*.65)))}

 let t=clamp((pt-.43)/.57);
}
function requestUpdate(){if(!queued){requestAnimationFrame(update);queued=true}}
addEventListener('scroll',requestUpdate,{passive:true});
addEventListener('resize',requestUpdate);
const introStage=$('.curtain-stage');let introDragY=null,introDragScroll=0;
introStage.addEventListener('pointerdown',e=>{
 if(e.pointerType!=='mouse'||e.button!==0||e.target.closest('a,button'))return;
 introDragY=e.clientY;introDragScroll=scrollY;introStage.classList.add('is-dragging');document.documentElement.classList.add('intro-dragging');introStage.setPointerCapture(e.pointerId);
});
introStage.addEventListener('pointermove',e=>{
 if(introDragY===null)return;
 const end=$('#home').offsetTop+$('#home').offsetHeight-innerHeight;
 document.documentElement.scrollTop=clamp(introDragScroll+(introDragY-e.clientY)*1.0,$('#home').offsetTop,end);
});
function finishIntroDrag(){introDragY=null;introStage.classList.remove('is-dragging');document.documentElement.classList.remove('intro-dragging')}
introStage.addEventListener('pointerup',finishIntroDrag);introStage.addEventListener('pointercancel',finishIntroDrag);introStage.addEventListener('lostpointercapture',finishIntroDrag);
$('.motion-toggle').onclick=()=>{reduced=!reduced;document.documentElement.classList.toggle('motion-on',!reduced);document.documentElement.classList.toggle('motion-off',reduced);$('.motion-toggle').textContent=reduced?'움직임 꺼짐':'움직임 켜짐';$('.motion-toggle').setAttribute('aria-pressed',String(!reduced));update()};
const works=[{name:'아가씨',en:'THE HANDMAIDEN',description:'저택을 벗어나 새로운 세계로 향하는 인물의 여정.',text:'저택을 벗어나 새로운 세계로 향하는 인물의 여정을 영상으로 구성합니다. 공간과 인물의 일관성을 유지하며 장면의 움직임으로 감정을 전달합니다.',tools:'ComfyUI · Google Flow'},{name:'기생충',en:'PARASITE',description:'공간과 구도를 따라 다시 구성한 영화의 장면.',text:'영화의 장면 이미지를 바탕으로 영상을 구성합니다. 원작의 공간과 구도를 참고하며 장면 사이의 움직임이 자연스럽게 이어지도록 합니다.',tools:'AI 이미지·영상 생성 도구 · 영상 편집 도구'},{name:'헤어질 결심',en:'DECISION TO LEAVE',description:'시선과 카메라의 흐름으로 이어지는 기억.',text:'영화의 주요 장면을 AI 이미지와 영상으로 재구성합니다. 원작의 컷 길이와 카메라 흐름을 참고해 장면의 연결과 분위기를 표현합니다.',tools:'ComfyUI · Google Flow · 영상 편집 도구'},{name:'살인의 추억',en:'MEMORIES OF MURDER',description:'넓은 구도와 낮은 채도로 다시 바라본 현장.',text:'영화 속 현장의 공간과 인물 배치를 참고해 장면을 재구성합니다. 낮은 채도의 색감과 넓은 구도로 현장의 분위기와 긴장감을 전달합니다.',tools:'AI 이미지·영상 생성 도구 · 영상 편집 도구'}];for(let i=0;i<works.length;i++)for(const key of ['name','description','text','tools']){const value=window.__REFRAME_CMS__?.fields?.['work-'+i+'-'+key];if(value!==undefined)works[i][key]=value;}
const workOrder=[0,2,1,3];
const firstImage=document.querySelector('.film-cell .frame-image img');if(firstImage&&window.__REFRAME_CMS__?.media?.['assets/handmaiden.mp4']){const video=document.createElement('video');video.src='assets/handmaiden.mp4';video.muted=true;video.loop=true;video.playsInline=true;firstImage.replaceWith(video);}const filmWindow=$('.horizontal-film-window'), filmTrack=$('.horizontal-film-track'), filmCells=$$('.film-cell');
let dragX=null, dragStartOffset=0, dragOffset=0, dragMoved=false, selected=0;
const filmRibs=Array.from({length:80},(_,i)=>{const rib=document.createElement('i');rib.className='film-ribbon-segment';rib.setAttribute('aria-hidden','true');filmTrack.prepend(rib);return rib});
function renderSpatialFilm(position){
 const width=filmCells[0].offsetWidth,step=width+28,radius=step/.52;
 const reducedMotion=document.documentElement.classList.contains('motion-off')||matchMedia('(prefers-reduced-motion: reduce)').matches;
 const point=t=>{const angle=reducedMotion?0:Math.max(-1.35,Math.min(1.35,t*.52));return {x:reducedMotion?t*step:Math.sin(angle)*radius,z:reducedMotion?0:(Math.cos(angle)-1)*radius,angle:angle*180/Math.PI}};
 filmCells.forEach((cell,i)=>{const distance=((i-position+filmCells.length*100+filmCells.length/2)%filmCells.length)-filmCells.length/2;const p=point(distance);cell.style.setProperty('transform',`translate3d(${p.x-width/2}px,-50%,${p.z}px) rotateY(${p.angle}deg)`,'important');cell.style.opacity=String(Math.max(.24,1-Math.abs(distance)*.20));cell.style.filter=`brightness(${Math.max(.45,1-Math.abs(distance)*.17)})`;cell.style.zIndex=String(20-Math.round(Math.abs(distance)*3))});
 filmRibs.forEach((rib,i)=>{const t=-1+i/16-position,p=point(t),segment=step/16+1;rib.style.width=`${segment}px`;rib.style.transform=`translate3d(${p.x-segment/2}px,-50%,${p.z-3}px) rotateY(${p.angle}deg)`});
 filmTrack.style.transform='rotateX(-7deg) rotateZ(-2deg)';
}
function setFilmOffset(value){
 const cellWidth=filmCells[0].offsetWidth;
 const gap=28;
 const step=cellWidth+gap;
 const max=step*(filmCells.length-1);
 dragOffset=value;
 renderSpatialFilm(dragOffset/step);
 selectFilm(((Math.round(dragOffset/step)%4)+4)%4);
}
function selectFilm(index){
 selected=Math.max(0,Math.min(3,index));
 $('#workTitle').textContent=works[workOrder[selected]].name;
 $('#filmDescription').textContent=works[workOrder[selected]].description;
 $('.film-count').textContent='0'+(selected+1)+' / 04';
 filmCells.forEach((cell,i)=>{
  cell.classList.toggle('active',i===selected);
  const video=cell.querySelector('video');
  if(video){if(i===selected)video.play().catch(()=>{});else video.pause()}
 });
}
filmWindow.addEventListener('pointerdown',e=>{
 if(e.button!==0)return;
 dragX=e.clientX;dragStartOffset=dragOffset;dragMoved=false;filmWindow.setPointerCapture(e.pointerId);
});
filmWindow.addEventListener('pointermove',e=>{
 if(dragX===null)return;
 const delta=dragX-e.clientX;
 if(Math.abs(delta)>6)dragMoved=true;
 setFilmOffset(dragStartOffset+delta);
});
const endFilmDrag=()=>{dragX=null;const step=filmCells[0].offsetWidth+28;setFilmOffset(Math.round(dragOffset/step)*step)};
filmWindow.addEventListener('pointerup',endFilmDrag);filmWindow.addEventListener('pointercancel',endFilmDrag);
filmWindow.addEventListener('wheel',e=>{
 if(Math.abs(e.deltaY)>Math.abs(e.deltaX)){e.preventDefault();setFilmOffset(dragOffset+e.deltaY)}
},{passive:false});
filmCells.forEach((cell,i)=>cell.addEventListener('click',()=>{
 if(dragMoved){dragMoved=false;return}
 selectFilm(i);openWork()
}));
filmWindow.setAttribute('tabindex','0');
filmWindow.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();setFilmOffset((Math.round(dragOffset/(filmCells[0].offsetWidth+28))+(e.key==='ArrowRight'?1:-1))*(filmCells[0].offsetWidth+28))}});
addEventListener('resize',()=>setFilmOffset(dragOffset));setFilmOffset(0);
const modal=$('#modal');let previousFocus;function openModal(html){previousFocus=document.activeElement;$('#modalBody').innerHTML=html;modal.showModal();document.body.style.overflow='hidden';$('.modal-close').focus()}function close(){modal.close()}modal.addEventListener('close',()=>{$('#modalBody video')?.pause();$('#modalBody').innerHTML='';document.body.style.overflow='';previousFocus?.focus()});$('.modal-close').onclick=close;modal.addEventListener('click',e=>{if(e.target===modal){const r=modal.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)close()}});function poster(){openModal('<img class="modal-poster" src="assets/handmaiden-poster.png" alt="아가씨 포스터 원본 전체">')}$('#viewPoster').onclick=poster;$('#posterImage').onclick=poster;function openWork(){let w=works[workOrder[selected]];let video=selected===0?'handmaiden':selected===1?'decision':selected===2?'parasite':selected===3?'memories':null;openModal(`<article class="modal-work"><span class="eyebrow">0${selected+1} / ${w.en}</span><h2>${w.name}</h2>${video?`<video class="modal-video" controls playsinline preload="metadata" poster="assets/${video}.jpg"><source src="assets/${video}.mp4" type="video/mp4">이 브라우저에서 영상을 재생할 수 없습니다.</video>`:'<div class="status">영상 공개 준비 중 · 작품 소개</div>'}<p>${w.text}</p><br><span class="fine">사용 도구 / ${w.tools}</span><details><summary>프롬프트 아카이브</summary><p>실제 제작에 사용한 프롬프트 원문은 추후 공개합니다.</p></details></article>`)}
const storySection=$('#story-structure'),storyStage=$('.letter-stage'),letterSheet=$('.letter-sheet'),envelopeScene=$('.envelope-scene'),envelopeFront=$('.envelope-front');
let storyPointer=null,storyStartY=0,storyStartScroll=0;
function splitKineticText(selector,cls){
 $$(selector).forEach(el=>{
  if(el.dataset.splitDone)return;el.dataset.splitDone='1';const label=el.innerText||el.textContent;el.setAttribute('aria-label',label.replace(/\s+/g,' ').trim());el.setAttribute('role','text');
  const walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT),nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
  for(const node of nodes){const frag=document.createDocumentFragment(),segments=typeof Intl.Segmenter==='function'?[...new Intl.Segmenter(undefined,{granularity:'grapheme'}).segment(node.nodeValue)].map(x=>x.segment):Array.from(node.nodeValue);segments.forEach(ch=>{const span=document.createElement('span');span.className=cls;span.textContent=ch;span.setAttribute('aria-hidden','true');frag.append(span)});node.replaceWith(frag)}
 });
}
splitKineticText('#story-structure .letter-masthead span,#story-structure .letter-kicker,#story-structure .narrative-chapter h2 span,#story-structure .narrative-chapter h2 em,#story-structure .letter-subtitle,#story-structure .letter-copy,#story-structure .character-chapter h3,#story-structure .letter-keywords span,#story-structure .letter-signoff','letter-glyph');
function animateKineticText(el,progress){
 const glyphs=el.querySelectorAll('.narrative-glyph');if(!glyphs.length)return;const start=parseFloat(el.dataset.start||'0'),end=parseFloat(el.dataset.end||'1'),span=Math.max(.001,end-start),n=glyphs.length;
 glyphs.forEach((glyph,i)=>{const local=clamp(((progress-start)/span)*1.42-(i/Math.max(1,n-1))*.48);glyph.style.opacity=String(local);glyph.style.transform=`translate3d(0,${(1-local)*20}px,0) rotate(${(1-local)*2.5}deg)`;glyph.style.filter=`blur(${(1-local)*5}px)`});
}
// A scroll-driven paper gateway: a light slit, curled paper, an immersive image,
// then the same image settles into the existing exhibition frame.
const paperGateway=document.createElement('div');
paperGateway.className='paper-gateway';paperGateway.setAttribute('aria-hidden','true');
paperGateway.innerHTML='<div class="gateway-dark"></div><div class="gateway-picture"><img src="assets/handmaiden-poster.png" alt="" draggable="false"></div><div class="gateway-seam"></div><div class="gateway-paper"></div>';
storyStage.append(paperGateway);
const gatewayPicture=paperGateway.querySelector('.gateway-picture'),gatewayPaper=paperGateway.querySelector('.gateway-paper');
const paperStrips=[];
for(let i=0;i<16;i++){
 const strip=letterSheet.cloneNode(true);strip.classList.add('paper-strip');strip.removeAttribute('aria-label');strip.setAttribute('aria-hidden','true');
 strip.querySelectorAll('[id]').forEach(el=>el.removeAttribute('id'));
 strip.style.clipPath=`inset(0 ${Math.max(0,100-(i+1)*6.25-.12)}% 0 ${Math.max(0,i*6.25-.12)}%)`;
 gatewayPaper.append(strip);paperStrips.push(strip);
}
function updatePaperPortal(progress){
 const ease=t=>{t=clamp(t);return t*t*(3-2*t)},track=(a,b)=>ease((progress-a)/(b-a));
 const disabled=document.documentElement.classList.contains('motion-off')||matchMedia('(prefers-reduced-motion: reduce)').matches;
 const focus=track(.49,.59),curl=track(.59,.76),settle=track(.80,.95),handoff=track(.91,1);
 const active=progress>.49&&progress<1&&!disabled;
 paperGateway.style.visibility=active?'visible':'hidden';
 const posterSection=$('#poster');
 const posterBounds=posterSection.getBoundingClientRect();
 const characterSection=document.getElementById('narrative');
 const storyStart=characterSection.getBoundingClientRect().top+scrollY;
 const characterEnd=posterSection.getBoundingClientRect().bottom+scrollY-innerHeight;
 const colorFade=ease(clamp((scrollY-storyStart)/Math.max(1,characterEnd-storyStart)));
 const cmsBase=window.__REFRAME_CMS__?.settings?.baseColor;let cmsIndex=0;const colorChannel=(a,b)=>{if(cmsBase&&/^#[a-f0-9]{6}$/i.test(cmsBase)){a=parseInt(cmsBase.slice(1+cmsIndex*2,3+cmsIndex*2),16);cmsIndex++}return Math.round(a+(b-a)*colorFade)};
 const exhibitTone=`rgb(${colorChannel(53,16)},${colorChannel(17,7)},${colorChannel(31,15)})`;
 document.documentElement.style.setProperty('--exhibit-tone',exhibitTone);
 posterSection.style.setProperty('--poster-tone',exhibitTone);
 posterSection.style.opacity=disabled?'1':String(handoff);
 posterSection.style.pointerEvents=progress>.96||disabled?'auto':'none';
 if(disabled){letterSheet.style.visibility='visible';return}
 const rect=letterSheet.getBoundingClientRect(),stageRect=storyStage.getBoundingClientRect();
 const w=rect.width,h=rect.height,cx=rect.left+w/2,cy=rect.top-stageRect.top+h/2;
 letterSheet.style.visibility=progress>=.59?'hidden':'visible';
 letterSheet.style.filter=`brightness(${1-focus*.28})`;
 $('.letter-page-masthead').style.opacity=String(1-focus);
 envelopeScene.style.filter=`brightness(${1-focus*.7})`;
 paperGateway.querySelector('.gateway-dark').style.opacity=String(focus*.94*(1-settle));
 const target=$('#posterImage').getBoundingClientRect(),posterRect=posterSection.getBoundingClientRect();
 const tx=target.left,ty=target.top-posterRect.top,tw=target.width,th=target.height;
 const mix=(a,b,t)=>a+(b-a)*t;
 const slit=track(.565,.77);
 // The opening belongs to the letter, never to the centre of the viewport.
 // Keep the complete poster within the paper before moving it to its final frame.
 const imageWidth=Math.min(w*.78,h*.84*tw/Math.max(1,th)),imageHeight=imageWidth*th/Math.max(1,tw);
 const grow=1+track(.72,.82)*.12;
 const pictureWidth=imageWidth*grow,pictureHeight=imageHeight*grow;
 const pictureX=mix(cx,innerWidth/2,curl),pictureY=mix(cy,innerHeight/2,curl);
 const openingWidth=mix(0,pictureWidth,slit);
 Object.assign(gatewayPicture.style,{
  left:`${mix(pictureX-pictureWidth/2,tx,settle)}px`,top:`${mix(pictureY-pictureHeight/2,ty,settle)}px`,
  width:`${mix(pictureWidth,tw,settle)}px`,height:`${mix(pictureHeight,th,settle)}px`,
  opacity:String(track(.55,.59)*(1-handoff)),
  clipPath:`inset(0 ${Math.max(0,(1-openingWidth/pictureWidth)*50)*(1-settle)}% round 1px)`,
  filter:`brightness(${mix(.55,1,track(.61,.80))}) blur(${(1-track(.57,.70))*5}px)`
 });
 const seam=paperGateway.querySelector('.gateway-seam');
 // Light is the rim of the actual opening, not a separate expanding colour block.
 const lightFade=track(.65,.79),lightIn=track(.555,.585);
 Object.assign(seam.style,{left:`${pictureX}px`,top:`${pictureY-pictureHeight/2}px`,height:`${pictureHeight}px`,width:`${Math.max(1,openingWidth)}px`,opacity:String(lightIn*(1-lightFade)*.72),filter:`blur(${.3+slit*1.2}px)`,transform:'translateX(-50%)'});
 const zoom=1+track(.61,.79)*.35;
 gatewayPaper.style.transformOrigin=`${cx}px ${cy}px`;
 gatewayPaper.style.transform=`translate(${(innerWidth/2-cx)*curl}px,${(innerHeight/2-cy)*curl}px) scale(${zoom})`;
 gatewayPaper.style.opacity=String((progress>=.59?1:0)*(1-track(.735,.80)));
 const segment=w/16;
 for(let side=0;side<2;side++){
  let edge=(side===0?-w/2:w/2)+(side===0?-1:1)*curl*w*.12,z=0;
  for(let j=0;j<8;j++){
   const i=side===0?j:15-j,sign=side===0?1:-1;
   const angle=sign*curl*(12+Math.pow((j+.5)/8,1.6)*100),rad=angle*Math.PI/180;
   const x=edge+sign*Math.cos(rad)*segment/2,depth=z+Math.sin(Math.abs(rad))*segment/2;
   const originalX=(i+.5)*segment-w/2,strip=paperStrips[i];
   Object.assign(strip.style,{left:`${cx-w/2}px`,top:`${cy-h/2}px`,width:`${w}px`,height:`${h}px`,visibility:'visible',opacity:'1',transformOrigin:`${(i+.5)*segment}px 50%`,transform:`translate3d(${x-originalX}px,0,${depth}px) rotateY(${angle}deg)`,filter:`brightness(${1-curl*(.12+j*.025)})`});
   edge+=sign*Math.cos(rad)*segment;z+=Math.sin(Math.abs(rad))*segment;
  }
 }
}
let posterRevealFrame=0,posterRevealRunning=false,posterRevealPlayed=false;
function startPosterReveal(){
 if(posterRevealRunning||posterRevealPlayed||reduced||document.documentElement.classList.contains('motion-off'))return;
 posterRevealRunning=true;posterRevealPlayed=true;
 const start=scrollY,end=storySection.getBoundingClientRect().top+scrollY+storySection.offsetHeight-innerHeight;
 const began=performance.now();
 const tick=now=>{
  const t=clamp((now-began)/Math.max(1000,Number(window.__REFRAME_CMS__?.settings?.posterDuration)||4200)),ease=t*t*(3-2*t);
  window.scrollTo({top:start+(end-start)*ease,behavior:'instant'});
  if(t<1)posterRevealFrame=requestAnimationFrame(tick);else{posterRevealRunning=false;updateLetter();requestUpdate()}
 };
 posterRevealFrame=requestAnimationFrame(tick);
}
storyStage.addEventListener('wheel',e=>{
 if(reduced||document.documentElement.classList.contains('motion-off'))return;
 const p=clamp(-storySection.getBoundingClientRect().top/Math.max(1,storySection.offsetHeight-innerHeight));
 if(posterRevealRunning){if(e.deltaY<0){cancelAnimationFrame(posterRevealFrame);posterRevealRunning=false}else e.preventDefault();return}
 if(e.deltaY>0&&p>=.31&&p<.98&&!posterRevealPlayed){startPosterReveal()}
},{passive:false});
function updateLetter(){
 const entry=clamp((innerHeight-storySection.getBoundingClientRect().top)/innerHeight);
 storyStage.style.opacity=String(entry*entry*(3-2*entry));

 const bounds=storySection.getBoundingClientRect();const travel=Math.max(1,storySection.offsetHeight-innerHeight);const progress=clamp(-bounds.top/travel);
 if(progress<.30&&!posterRevealRunning)posterRevealPlayed=false;
 if(progress>=.48&&progress<.98&&!posterRevealPlayed)startPosterReveal();
 const ease=t=>{t=clamp(t);return t*t*(3-2*t)};
 const open=ease(progress/.04),exit=0,textProgress=clamp(progress/.10);
 const offset=25-open*32,scale=.8+open*.2;
 letterSheet.style.transform=`translate3d(-50%,calc(-50% + ${offset}vh),0) scale(${scale})`;
 letterSheet.style.opacity=String(ease(progress/.02)*(1-exit));
 const envelopeTransform='translate3d(-50%,-50%,0)';envelopeScene.style.transform=envelopeTransform;envelopeFront.style.transform=envelopeTransform;
 const envelopeOpacity=1-ease((progress-.24)/.18);envelopeScene.style.opacity=String(envelopeOpacity);envelopeFront.style.opacity=String(envelopeOpacity);
 envelopeFront.style.clipPath=`polygon(0 ${52+open*28}%,50% ${75+open*22}%,100% ${52+open*28}%,100% 100%,0 100%)`;
 const narrative=clamp((textProgress-.04)/.28),character=clamp((textProgress-.42)/.28);
 const n=$('.narrative-chapter'),c=$('.character-chapter'),divider=$('.letter-divider'),sign=$('.letter-signoff');
 n.style.opacity=String(narrative);n.style.transform=`translate3d(0,${(1-narrative)*24}px,0)`;
 divider.style.opacity=String(clamp((textProgress-.26)/.18));
 c.style.opacity=String(character);c.style.transform=`translate3d(0,${(1-character)*24}px,0)`;
 sign.style.opacity=String(clamp((textProgress-.69)/.2));
 const textTracks=[['.letter-masthead span',.02,.12],['.letter-kicker',.03,.14],['.narrative-chapter h2 span,.narrative-chapter h2 em',.06,.23],['.letter-subtitle',.12,.25],['.narrative-chapter .letter-copy',.17,.34],['.character-chapter .letter-kicker',.25,.37],['.character-chapter h3',.29,.44],['.character-chapter .letter-copy',.35,.51],['.letter-keywords span',.47,.61],['.letter-signoff',.56,.67]];
 textTracks.forEach(([sel,start,end])=>letterSheet.querySelectorAll(sel).forEach(el=>animateLetterGlyphs(el,textProgress,start,end)));
 storyStage.style.setProperty('--letter-open',progress);storyStage.style.setProperty('--letter-exit',exit);storyStage.style.setProperty('--letter-wipe',`${(1-exit)*100}%`);$('.story-drag-hint').style.opacity=String(1-clamp(progress/.72));
 updatePaperPortal(progress);
}
function animateLetterGlyphs(el,progress,start,end){const glyphs=el.querySelectorAll('.letter-glyph');if(!glyphs.length)return;const n=glyphs.length,span=end-start;glyphs.forEach((glyph,i)=>{const p=clamp(((progress-start)/span)*1.8-(i/Math.max(1,n-1))*.5);glyph.style.opacity=String(p);glyph.style.transform=`translate3d(0,${(1-p)*12}px,0) rotate(${(1-p)*1.6}deg)`;glyph.style.filter=`blur(${(1-p)*4}px)`})}
storyStage.addEventListener('pointerdown',e=>{if(e.button!==0&&e.pointerType==='mouse')return;storyPointer=e.pointerId;storyStartY=e.clientY;storyStartScroll=scrollY;storyStage.setPointerCapture(e.pointerId)});
storyStage.addEventListener('pointermove',e=>{if(storyPointer!==e.pointerId||posterRevealRunning)return;const travel=Math.max(1,storySection.offsetHeight-innerHeight);const sectionStart=storySection.getBoundingClientRect().top+scrollY;const desired=Math.max(sectionStart,Math.min(sectionStart+travel,storyStartScroll+storyStartY-e.clientY));window.scrollTo(0,desired)});
const endStoryDrag=()=>{storyPointer=null};storyStage.addEventListener('pointerup',endStoryDrag);storyStage.addEventListener('pointercancel',endStoryDrag);
addEventListener('scroll',updateLetter,{passive:true});addEventListener('resize',updateLetter);updateLetter();
const narrativeSection=$('#narrative'),narrativeStage=$('.narrative-stage');
splitKineticText('.narrative-masthead span,.narrative-kicker,.narrative-title,.narrative-subtitle,.narrative-description,.character-title,.character-description,.character-keywords','narrative-glyph');
let narrativePointer=null,narrativeStartY=0,narrativeStartScroll=0;
function updateNarrative(){
 const rect=narrativeSection.getBoundingClientRect(),travel=Math.max(1,narrativeSection.offsetHeight-innerHeight),progress=clamp(-rect.top/travel),sectionProgress=progress,exit=clamp((sectionProgress-.94)/.06);
 const entry=clamp((innerHeight-rect.top)/innerHeight);narrativeStage.style.setProperty('--character-entry',String(entry*entry*(3-2*entry)));
 narrativeStage.style.setProperty('--entry-feather',`${(1-entry)*28}vh`);
 narrativeStage.style.setProperty('--narrative-progress',progress);narrativeStage.style.setProperty('--narrative-exit',exit);
 const still=$('.narrative-still'),story=$('.narrative-story'),copy=$('.character-copy');
 const stillIn=clamp(progress/.26),storyIn=clamp((progress-.08)/.35),copyIn=clamp((progress-.47)/.28);
 still.style.opacity=String(stillIn*(1-exit));still.style.filter=`blur(${(1-stillIn)*5}px)`;still.style.transform=`translateY(${(1-stillIn)*42-exit*30}px) scale(${.98+stillIn*.02})`;
 story.style.opacity=String(storyIn*(1-exit));story.style.transform=`translateY(${(1-storyIn)*32-exit*30}px)`;
 copy.style.opacity=String(copyIn*(1-exit));copy.style.transform=`translateY(${(1-copyIn)*36-exit*28}px)`;
 $$('.narrative-figure').forEach((figure,i)=>{const start=parseFloat(figure.dataset.enter),span=.13,enter=clamp((progress-start)/span);figure.style.opacity=String(enter*(1-exit));figure.style.transform=`translate3d(0,${(1-enter)*100-exit*36}px,0) scale(${.965+enter*.035})`;figure.style.filter=`blur(${(1-enter)*7}px) drop-shadow(0 14px 18px #120e0d44)`});
 $$('.kinetic-text').forEach(el=>animateKineticText(el,progress));$('.narrative-drag-hint').style.opacity=String((1-clamp(progress/.9))*(1-exit));
}
narrativeStage.addEventListener('pointerdown',e=>{if(e.button!==0&&e.pointerType==='mouse')return;narrativePointer=e.pointerId;narrativeStartY=e.clientY;narrativeStartScroll=scrollY;narrativeStage.setPointerCapture(e.pointerId)});
narrativeStage.addEventListener('pointermove',e=>{if(narrativePointer!==e.pointerId)return;const travel=Math.max(1,narrativeSection.offsetHeight-innerHeight),start=narrativeSection.getBoundingClientRect().top+scrollY;window.scrollTo(0,Math.max(start,Math.min(start+travel,narrativeStartScroll+narrativeStartY-e.clientY)))});
const endNarrativeDrag=()=>{narrativePointer=null};narrativeStage.addEventListener('pointerup',endNarrativeDrag);narrativeStage.addEventListener('pointercancel',endNarrativeDrag);
addEventListener('scroll',updateNarrative,{passive:true});addEventListener('resize',updateNarrative);updateNarrative();
const sectionObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){$$('nav a').forEach(a=>a.classList.toggle('active',a.hash==='#'+e.target.id))}}),{rootMargin:'-30% 0px -45% 0px'});['story-structure','poster','narrative','films','artist'].forEach(id=>sectionObserver.observe(document.getElementById(id)));
// Transitional colour fields provide breathing room without empty hard cuts.
for(const [id,from,to] of [['artist','#0d1410','#e4d6b8'],['ending','#e4d6b8','#0d1410']]){
 const bridge=document.createElement('div');bridge.className='exhibition-bridge';bridge.dataset.next=id;bridge.setAttribute('aria-hidden','true');
 bridge.style.background=`linear-gradient(180deg,${from},${to})`;document.getElementById(id).before(bridge);
}
requestUpdate();updateLetter();updateNarrative();

update();

if(reduced){$('.motion-toggle').textContent='움직임 꺼짐';$('.motion-toggle').setAttribute('aria-pressed','false')}

/* Video-textured meshes: drag bends the actual image surface. */
(()=>{
 const stage=document.querySelector('#films .film-stage-horizontal');if(!stage)return;
 const canvas=document.createElement('canvas');canvas.className='elastic-screen-canvas';canvas.setAttribute('aria-hidden','true');stage.append(canvas);
 const gl=canvas.getContext('webgl',{alpha:true,antialias:true,premultipliedAlpha:false});if(!gl){canvas.remove();return}
 const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches||document.documentElement.classList.contains('motion-off');
 const vertex=`attribute vec2 uv; varying vec2 vUV;uniform float center,depth,angle,bend,ratio,aspect;void main(){vUV=uv;float u=uv.x-.5;float z=bend*(1.-4.*u*u);float x=u*cos(angle)+z*sin(angle);z=-u*sin(angle)+z*cos(angle)+depth;float perspective=3.5/(3.5-z);gl_Position=vec4((center+x)*ratio*perspective,(uv.y-.5)*aspect*ratio*perspective,0.,1.);}`;
 const fragment=`precision mediump float;
varying vec2 vUV;uniform sampler2D image;uniform float mediaAspect,frameAspect,light,alpha;
float noise(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
void main(){
 vec2 uv=vUV;float rail=.095;float side=.014;
 vec3 col;float outAlpha=alpha;
 if(uv.y<rail||uv.y>1.-rail||uv.x<side||uv.x>1.-side){
  float grain=(noise(floor(uv*vec2(1900.,1100.)))-.5)*.028;
  col=vec3(.115,.073,.043)+grain;
  float edge=min(uv.y,1.-uv.y);
  col+=vec3(.11,.072,.031)*exp(-abs(edge-.006)*270.);
  col+=vec3(.055,.036,.014)*exp(-abs(edge-(rail-.009))*420.);
  if(edge<rail){
   vec2 hole=vec2((fract(uv.x*22.)-.5)*frameAspect/22.,edge-rail*.5);
   vec2 size=vec2(frameAspect/22.*.27,rail*.27);
   vec2 q=abs(hole)-size+vec2(.005);
   float sd=length(max(q,0.))+min(max(q.x,q.y),0.)-.005;
   float cut=1.-smoothstep(-.001,.001,sd);
   outAlpha*=1.-cut;
   col+=vec3(.14,.10,.055)*exp(-abs(sd)*750.);
  }
 }else{
  vec2 p=vec2((uv.x-side)/(1.-2.*side),1.-(uv.y-rail)/(1.-2.*rail));
  float imageFrame=frameAspect*(1.-2.*side)/(1.-2.*rail);
  if(mediaAspect>imageFrame)p.y=(p.y-.5)*mediaAspect/imageFrame+.5;
  else p.x=(p.x-.5)*imageFrame/mediaAspect+.5;
  col=vec3(.035,.025,.025);
  if(p.x>=0.&&p.x<=1.&&p.y>=0.&&p.y<=1.)col=texture2D(image,p).rgb;
 }
 gl_FragColor=vec4(col*light,outAlpha);
}`;
 function shader(type,source){const s=gl.createShader(type);gl.shaderSource(s,source);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(s));return s}
 let program;try{program=gl.createProgram();gl.attachShader(program,shader(gl.VERTEX_SHADER,vertex));gl.attachShader(program,shader(gl.FRAGMENT_SHADER,fragment));gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error('link');}catch{canvas.remove();return}
 gl.useProgram(program);const uniforms={};for(const n of ['center','depth','angle','bend','ratio','aspect','mediaAspect','frameAspect','light','alpha'])uniforms[n]=gl.getUniformLocation(program,n);
 const points=[];for(let i=0;i<56;i++){let a=i/56,b=(i+1)/56;points.push(a,0,b,0,a,1,a,1,b,0,b,1)}const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(points),gl.STATIC_DRAW);const loc=gl.getAttribLocation(program,'uv');gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);
 const sources=filmCells.map(cell=>cell.querySelector('video,img'));const textures=sources.map(()=>{const t=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,t);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,1,1,0,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array([24,15,20,255]));gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);return t});
 const wrap=v=>((v+2)%4+4)%4-2;
 let hoverIndex=-1,hoverX=0,hoverY=0;const hoverAmount=filmCells.map(()=>0);
 let position=dragOffset/(filmCells[0].offsetWidth+28),velocity=0,bend=0,pointer=null,startX=0,startY=0,lastX=0,lastTime=0,moved=false,axis=null,raf=0,previous=0,visible=true,hits=[];
 const originalOpen=openWork;
 function wake(){if(!raf)raf=requestAnimationFrame(draw)}
 function draw(time){raf=0;const dt=Math.min(2.5,(time-(previous||time))/16.667)||1;previous=time;
  if(pointer===null){position+=velocity*dt;velocity*=Math.pow(.94,dt);if(Math.abs(velocity)<.001){velocity=0;position+=(Math.round(position)-position)*Math.min(1,.1*dt)}}
  hoverAmount.forEach((value,i)=>{const goal=!reduced()&&pointer===null&&i===hoverIndex?1:0;hoverAmount[i]+=(goal-value)*Math.min(1,.12*dt)});
  const target=reduced()?0:Math.max(-.24,Math.min(.24,-velocity*2.6));bend+=(target-bend)*Math.min(1,.16*dt);
  position=((position%4)+4)%4;const selectedIndex=((Math.round(position)%4)+4)%4;if(selected!==selectedIndex)selectFilm(selectedIndex);
  const r=stage.getBoundingClientRect(),dpr=Math.min(devicePixelRatio||1,2),w=Math.round(r.width*dpr),h=Math.round(r.height*dpr);if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h}gl.viewport(0,0,w,h);gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT);
  const screenWidth=Math.min(r.width*(r.width<760?.84:.57),1000),screenHeight=Math.min(r.height*.72,screenWidth*.64),frameAspect=screenWidth/screenHeight;hits=[];
  const planes=filmCells.map((_,i)=>({i,d:wrap(i-position)})).sort((a,b)=>Math.abs(b.d)-Math.abs(a.d));
  for(const {i,d}of planes){const lift=hoverAmount[i];const a=reduced()?0:d*.64+hoverX*.065*lift,center=reduced()?d*1.06:Math.sin(a)*1.62,depth=reduced()?0:(Math.cos(a)-1)*1.62+lift*.48,opacity=Math.max(0,Math.min(1,(2-Math.abs(d))*3));const media=sources[i];gl.bindTexture(gl.TEXTURE_2D,textures[i]);try{if(media.tagName==='VIDEO'?media.readyState>=2:media.complete&&media.naturalWidth)gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,media)}catch{}
   const values={center,depth,angle:-a,bend,ratio:screenWidth/r.width*2,aspect:r.width/r.height/frameAspect,mediaAspect:(media.videoWidth||media.naturalWidth||16)/(media.videoHeight||media.naturalHeight||9),frameAspect,light:Math.min(1.08,Math.max(.5,1-Math.abs(d)*.2)+lift*.09),alpha:opacity};for(const [n,v]of Object.entries(values))gl.uniform1f(uniforms[n],v);gl.drawArrays(gl.TRIANGLES,0,points.length/2);
   const p=3.5/(3.5-depth),cx=r.width/2+center*screenWidth*p,half=screenWidth*Math.cos(a)*p/2;hits.push({i,cx,half,height:screenHeight*p,d:Math.abs(d)});
  }
  stage.style.setProperty('--light-x',`${50+bend*55}%`);if(visible&&!document.hidden)wake();
 }
 function down(e){if(e.button!==0)return;e.stopImmediatePropagation();pointer=e.pointerId;startX=lastX=e.clientX;startY=e.clientY;lastTime=performance.now();moved=false;axis=null;velocity=0;filmWindow.setPointerCapture(e.pointerId);hoverIndex=-1;stage.classList.add('is-pulling');wake()}
 function move(e){if(pointer!==e.pointerId)return;e.stopImmediatePropagation();const dx=e.clientX-startX,dy=e.clientY-startY;if(!axis&&Math.hypot(dx,dy)>6)axis=Math.abs(dx)>Math.abs(dy)?'x':'y';if(axis==='y')return;if(Math.abs(dx)>6)moved=true;const now=performance.now(),delta=(lastX-e.clientX)/Math.max(240,stage.clientWidth*.57);position+=delta;velocity=velocity*.4+delta/Math.max(.3,(now-lastTime)/16.667)*.6;lastX=e.clientX;lastTime=now;wake()}
 function up(e){if(pointer!==e.pointerId)return;e.stopImmediatePropagation();pointer=null;stage.classList.remove('is-pulling');if(!moved&&e.type!=='pointercancel'){const r=stage.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;const hit=hits.filter(h=>Math.abs(x-h.cx)<h.half&&Math.abs(y-r.height/2)<h.height/2).sort((a,b)=>a.d-b.d)[0];if(hit){selectFilm(hit.i);position+=wrap(hit.i-position);velocity=0;originalOpen();modal.querySelector('video')?.play().catch(()=>{})}}wake()}
 function hover(e){if(e.pointerType==='touch'||pointer!==null)return;const r=stage.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;const hit=hits.filter(h=>Math.abs(x-h.cx)<h.half&&Math.abs(y-r.height/2)<h.height/2).sort((a,b)=>a.d-b.d)[0];hoverIndex=hit?hit.i:-1;hoverX=hit?Math.max(-1,Math.min(1,(x-hit.cx)/hit.half)):0;hoverY=(y/r.height-.5)*2;filmWindow.style.cursor=hit?'pointer':'grab';wake()}
 filmWindow.addEventListener('pointermove',hover);
 filmWindow.addEventListener('pointerleave',()=>{hoverIndex=-1;hoverX=hoverY=0;filmWindow.style.cursor='grab';wake()});
 for(const [type,fn]of [['pointerdown',down],['pointermove',move],['pointerup',up],['pointercancel',up]])filmWindow.addEventListener(type,fn,true);
 filmWindow.addEventListener('click',e=>{e.stopImmediatePropagation();e.preventDefault()},true);
 filmWindow.addEventListener('wheel',e=>{e.stopImmediatePropagation();if(Math.abs(e.deltaX)>Math.abs(e.deltaY)||e.shiftKey){e.preventDefault();velocity+=Math.max(-.08,Math.min(.08,(e.deltaX||e.deltaY)*.0005));wake()}},{capture:true,passive:false});
 filmWindow.addEventListener('keydown',e=>{if(['ArrowRight','ArrowLeft'].includes(e.key)){e.stopImmediatePropagation();e.preventDefault();position=Math.round(position)+(e.key==='ArrowRight'?1:-1);velocity=0;wake()}else if(e.key==='Enter'||e.key===' '){e.preventDefault();originalOpen()}},true);
 canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();stage.classList.remove('elastic-ready');cancelAnimationFrame(raf);raf=0});
 new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)wake()}).observe(stage);document.addEventListener('visibilitychange',()=>{if(!document.hidden)wake()});addEventListener('resize',wake);
 stage.classList.add('elastic-ready');wake();
})();
/* Native scrolling owns the poster handoff: no forced scroll or input lock. */
(()=>{
 if(typeof startPosterReveal!=='function')return;
 cancelAnimationFrame(posterRevealFrame);posterRevealRunning=false;
 startPosterReveal=function(){posterRevealPlayed=true;posterRevealRunning=false;};
})();
/* The artist spread follows the approved two-tier editorial reference. */
(()=>{
 const artist=document.querySelector('#artist'),grid=artist?.querySelector('.artist-grid');if(!grid)return;
 const title=grid.querySelector('.display'),intro=grid.querySelector('.artist-intro'),fine=grid.querySelector('.fine');
 const banner=document.createElement('div');banner.className='artist-banner';banner.innerHTML='<div class="artist-banner-top"><span>RE:FRAME</span><i></i><span>THE ARTIST</span></div><div class="artist-banner-title"></div><div class="artist-banner-bottom"><div class="artist-banner-credit"></div><p>Behind the Frame<br>Artist Introduction</p></div>';
 banner.querySelector('.artist-banner-title').append(title);banner.querySelector('.artist-banner-credit').append(fine);grid.before(banner);
 const quote=document.createElement('div');quote.className='artist-quote';quote.append(intro);grid.firstElementChild.replaceWith(quote);
})();
/* Typography enters once; reading and accordion interactions remain undisturbed. */
(()=>{const artist=document.querySelector('#artist');if(!artist)return;const observer=new IntersectionObserver(entries=>{if(entries[0].isIntersecting){artist.classList.add('artist-arrived');observer.disconnect()}},{threshold:.15});observer.observe(artist)})();
/* Use the supplied lettering itself, preserving its exact flourishes. */
(()=>{const title=document.querySelector('.artist-banner .display');if(!title)return;title.textContent='';const art=document.createElement('img');art.className='artist-signature-art';art.src='assets/artist-signature.svg';art.alt='Artist';title.append(art);
 const card=document.querySelector('#artist .artist-grid');if(card){const shell=document.createElement('div');shell.className='artist-paper-shell';card.before(shell);shell.append(card);const observer=new IntersectionObserver(entries=>{if(entries[0].isIntersecting){card.classList.add('paper-entered');shell.classList.add('paper-show');observer.disconnect()}},{threshold:.2});observer.observe(card)}
})();
/* Two connected editorial leaves: an interactive title and a lace ending. */
(()=>{
 const artist=document.querySelector('#artist'),banner=artist?.querySelector('.artist-banner'),shell=artist?.querySelector('.artist-paper-shell');if(!banner||!shell)return;
 banner.classList.add('showroom-sheet');
 const title=banner.querySelector('.display'),holder=banner.querySelector('.artist-banner-title');
 const button=document.createElement('button');button.className='artist-title-trigger';button.type='button';button.setAttribute('aria-expanded','false');button.setAttribute('aria-controls','artist-reading-panel');button.setAttribute('aria-label','작가 소개 펼치기');button.append(title);holder.append(button);
 shell.id='artist-reading-panel';shell.hidden=true;
 const cue=document.createElement('span');cue.className='artist-open-cue';cue.textContent='타이틀을 눌러 작가 소개 보기';button.append(cue);
 button.addEventListener('click',()=>{const open=button.getAttribute('aria-expanded')!=='true';button.setAttribute('aria-expanded',String(open));shell.hidden=!open;artist.classList.toggle('artist-reading',open);cue.textContent=open?'작가 소개 접기':'타이틀을 눌러 작가 소개 보기';if(open){shell.animate([{opacity:0,transform:'translateY(-14px)'},{opacity:1,transform:'translateY(0)'}],{duration:matchMedia('(prefers-reduced-motion: reduce)').matches?0:600,easing:'cubic-bezier(.2,.7,.2,1)'})}});
 const stage=document.querySelector('#ending .ending-stage');if(!stage)return;
 const panel=document.createElement('div');panel.className='lace-ending-sheet';panel.innerHTML='<span class="ending-edition">RE:FRAME · ONLINE CINEMA EXHIBITION</span><img class="ending-title-print" src="assets/opening-title-letters.png" alt="RE:FRAME"><p class="ending-message">다시 본 장면, 새롭게 남는 기억.</p><p class="ending-thanks">관람해 주셔서 감사합니다.</p>';
 const links=stage.querySelector('.ending-links'),credits=stage.querySelector('.footer-bottom');if(links)panel.append(links);if(credits)panel.append(credits);stage.append(panel);
 const rings=document.createElement('div');rings.className='ending-binder-rings';rings.setAttribute('aria-hidden','true');rings.innerHTML='<i></i><i></i><i></i>';panel.prepend(rings);
 const observer=new IntersectionObserver(entries=>{if(entries[0].isIntersecting){panel.classList.add('ending-paper-visible');observer.disconnect()}},{threshold:.2});observer.observe(panel);
})();
/* Preserve the approved full-screen artwork and illuminate only its letter strokes. */
(()=>{
 const panel=document.querySelector('.lace-ending-sheet');if(!panel)return;panel.classList.add('approved-ending');panel.innerHTML='';
 const art=document.createElement('img');art.className='ending-approved-art';art.src='assets/ending-approved.png';art.alt='RE:FRAME — 다시 본 장면, 새롭게 남는 기억. 관람해 주셔서 감사합니다.';panel.append(art);
 for(const [label,target,cls]of [['처음으로','#home','ending-home-hit'],['작품 다시 보기','#poster','ending-works-hit']]){const a=document.createElement('a');a.href=target;a.className='ending-art-link '+cls;a.textContent=label;panel.append(a)}
 const canvas=document.createElement('canvas');canvas.className='ending-letter-light';canvas.setAttribute('aria-hidden','true');panel.append(canvas);const ctx=canvas.getContext('2d');if(!ctx)return;
 const mask=document.createElement('canvas'),sweep=document.createElement('canvas'),m=mask.getContext('2d',{willReadFrequently:true}),s=sweep.getContext('2d');let points=[],raf=0,visible=false,ready=false,origin=0;
 const reduce=()=>matchMedia('(prefers-reduced-motion: reduce)').matches||document.documentElement.classList.contains('motion-off');
 function prepare(){try{const w=art.naturalWidth,h=art.naturalHeight;mask.width=sweep.width=w;mask.height=sweep.height=h;m.drawImage(art,0,0);const data=m.getImageData(0,0,w,h);for(let y=0;y<h;y++)for(let x=0;x<w;x++){const i=(y*w+x)*4;const ink=x>w*.055&&x<w*.945&&y>h*.265&&y<h*.60&&data.data[i]>190&&data.data[i+1]>155&&data.data[i+2]>95;data.data[i]=255;data.data[i+1]=244;data.data[i+2]=203;data.data[i+3]=ink?255:0;if(ink&&x%5===0&&y%5===0)points.push({x,y})}m.putImageData(data,0,0);ready=true;wake()}catch{ready=false}}
 function wake(){if(!raf&&visible&&ready&&!document.hidden&&!reduce())raf=requestAnimationFrame(draw)}
 function draw(time){raf=0;if(!visible||document.hidden||reduce()){ctx.clearRect(0,0,canvas.width,canvas.height);return}if(!origin)origin=time;const t=(time-origin)/1000,w=mask.width,h=mask.height,r=panel.getBoundingClientRect(),dpr=Math.min(devicePixelRatio||1,1.5);const cw=Math.round(r.width*dpr),ch=Math.round(r.height*dpr);if(canvas.width!==cw||canvas.height!==ch){canvas.width=cw;canvas.height=ch}
  s.clearRect(0,0,w,h);s.globalCompositeOperation='source-over';const x=((t/8)%1)*(w*1.6)-w*.3;const g=s.createLinearGradient(x-w*.13,0,x+w*.13,h*.07);g.addColorStop(0,'#ffe9a000');g.addColorStop(.34,'#ffd88b22');g.addColorStop(.5,'#fff8d9f0');g.addColorStop(.66,'#ffd88b22');g.addColorStop(1,'#ffe9a000');s.fillStyle=g;s.fillRect(0,0,w,h);s.globalCompositeOperation='destination-in';s.drawImage(mask,0,0);
  ctx.clearRect(0,0,cw,ch);ctx.save();ctx.scale(cw/w,ch/h);ctx.globalCompositeOperation='screen';ctx.shadowColor='#f5c873';ctx.shadowBlur=14;ctx.drawImage(sweep,0,0);ctx.shadowBlur=0;
  if(points.length)for(let k=0;k<9;k++){const life=(t+k*.53)%4,generation=Math.floor((t+k*.53)/4),seed=Math.sin(k*14.7+generation*77.3)*43758.5,index=(Math.floor((seed-Math.floor(seed))*points.length)+Math.floor(life*5))%points.length,p=points[index],a=Math.pow(Math.sin(life/4*Math.PI),6)*.85,size=3+Math.sin(k*4)*1.3;if(a<.015)continue;ctx.save();ctx.translate(p.x,p.y);ctx.globalAlpha=a;ctx.shadowColor='#f7cc77';ctx.shadowBlur=13;ctx.strokeStyle='#fff3c3';ctx.lineWidth=.8;ctx.beginPath();ctx.moveTo(-size*2,0);ctx.lineTo(size*2,0);ctx.moveTo(0,-size*2);ctx.lineTo(0,size*2);ctx.stroke();ctx.fillStyle='#fffbea';ctx.beginPath();ctx.arc(0,0,1.3,0,Math.PI*2);ctx.fill();ctx.restore()}
  ctx.restore();wake();
 }
 if(art.complete&&art.naturalWidth)prepare();else art.addEventListener('load',prepare,{once:true});
 const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)wake();else{cancelAnimationFrame(raf);raf=0}},{threshold:.05});observer.observe(panel);
 document.addEventListener('visibilitychange',()=>{if(!document.hidden)wake()});document.querySelector('.motion-toggle')?.addEventListener('click',()=>{ctx.clearRect(0,0,canvas.width,canvas.height);wake()});addEventListener('resize',wake);
})();
/* One final artist spread, with closing navigation in the same page. */
(()=>{
 const artist=document.querySelector('#artist'),banner=artist?.querySelector('.artist-banner'),trigger=banner?.querySelector('.artist-title-trigger'),ending=document.querySelector('#ending');if(!artist||!banner||!trigger||!ending)return;
 const art=document.createElement('img');art.className='unified-artist-art';art.src='assets/artist-approved.png';art.alt='Artist — 김지민, VFX / AI VISUAL ART. 타이틀을 눌러 작가 소개 보기';
 trigger.classList.add('unified-artist-trigger');trigger.innerHTML='<span class="sr-only">작가 소개 열기 또는 닫기</span>';banner.replaceChildren(art,trigger);banner.classList.add('unified-artist-banner');
 ending.querySelectorAll('canvas').forEach(canvas=>canvas.remove());
 ending.innerHTML='<div class="unified-closing"><p>다시 본 장면, 새롭게 남는 기억.</p><span>관람해 주셔서 감사합니다.</span><nav aria-label="전시 마무리"><a href="#home">처음으로</a><a href="#poster">작품 다시 보기</a></nav><small>RE:FRAME · © 2026 KIM JIMIN</small></div>';
 artist.append(ending);artist.classList.add('artist-and-ending');
})();
/* Envelope credits live below the existing Artist title; that title is untouched. */
(()=>{
 const ending=document.querySelector('#ending');if(!ending)return;ending.classList.add('envelope-ending');
 ending.innerHTML=`<div class="credits-heading"><span>RE:FRAME · END CREDITS</span><span>영화의 장면을 다시 보다</span><span>KIM JIMIN / 2026</span></div>
 <div class="credits-scene" aria-label="전시의 포스터와 장면을 담은 기념 봉투">
 <svg class="credits-thread" viewBox="0 0 1400 900" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="M-20 650C240 170 790 70 1050 100S1220 350 1050 280S670 180 710 530S1240 890 1440 540M-30 480C300 380 380 900 900 790S1260 400 1440 360"/></svg>
 <div class="credits-envelope-back"></div><div class="credits-insert-mask">
 <figure class="credits-photo credits-salon" tabindex="0"><div class="credits-photo-surface"><img src="assets/salon.png" alt="저택 응접실의 두 인물"><figcaption>01 / THE HANDMAIDEN</figcaption></div></figure>
 <figure class="credits-photo credits-poster" tabindex="0"><div class="credits-photo-surface"><img src="assets/handmaiden-poster.png" alt="올리브색 의상을 입은 인물의 포스터"><figcaption>POSTER / RE:FRAME</figcaption></div></figure>
 <figure class="credits-photo credits-meadow" tabindex="0"><div class="credits-photo-surface"><img src="assets/opening-field-background.png" alt="짐가방을 들고 초원을 달리는 두 인물"><figcaption>A NEW BEGINNING</figcaption></div></figure>
 <div class="credits-ticket"><span>RE:FRAME</span><i></i><span>2026</span></div></div>
 <div class="credits-envelope-front"><div class="credits-envelope-fold"></div><div class="credits-front-copy"><div class="credits-logo"><img src="assets/opening-title-letters.png" alt="RE:FRAME"></div><p>다시 본 장면, 새롭게 남는 기억.</p><div class="credits-rule"></div><p class="credits-makers">기획 · 디자인 · 제작&nbsp; 김지민</p><p class="credits-tools">AI VISUAL ART · ComfyUI · Google Flow</p></div></div>
 </div><div class="credits-closing"><p>관람해 주셔서 감사합니다.</p><nav aria-label="전시 마무리"><a href="#home">처음으로</a><a href="#poster">작품 다시 보기</a></nav><small>© 2026 KIM JIMIN</small></div>`;
 const scene=ending.querySelector('.credits-scene');let frame=0,aimX=0,aimY=0;
 const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches||document.documentElement.classList.contains('motion-off');
 const apply=()=>{frame=0;scene.style.setProperty('--mx',aimX);scene.style.setProperty('--my',aimY)};
 scene.addEventListener('pointermove',e=>{if(e.pointerType==='touch'||reduced())return;const r=scene.getBoundingClientRect();aimX=Math.max(-1,Math.min(1,(e.clientX-r.left)/r.width*2-1));aimY=Math.max(-1,Math.min(1,(e.clientY-r.top)/r.height*2-1));if(!frame)frame=requestAnimationFrame(apply)});
 scene.addEventListener('pointerleave',()=>{aimX=aimY=0;if(!frame)frame=requestAnimationFrame(apply)});
 const observer=new IntersectionObserver(entries=>{if(entries[0].isIntersecting){ending.classList.add('credits-visible');observer.disconnect()}},{threshold:.18});observer.observe(scene);
})();
/* Restore the pre-merge live Artist heading without altering its biography toggle. */
(()=>{
 const banner=document.querySelector('#artist .artist-banner'),trigger=banner?.querySelector('.artist-title-trigger');if(!banner||!trigger)return;
 banner.className='artist-banner showroom-sheet restored-artist';trigger.className='artist-title-trigger';trigger.innerHTML='<h2 class="display"><img class="artist-signature-art" src="assets/artist-signature.svg" alt="Artist"></h2><span class="artist-open-cue">타이틀을 눌러 작가 소개 보기</span>';
 banner.innerHTML='<div class="artist-banner-top"><span>RE:FRAME</span><i></i><span>THE ARTIST</span></div><div class="artist-banner-title"></div><div class="artist-banner-bottom"><div class="artist-banner-credit"><span class="fine">김지민 · JIMIN KIM<br>VFX / AI VISUAL ART</span></div><p>Behind the Frame<br>Artist Introduction</p></div>';
 banner.querySelector('.artist-banner-title').append(trigger);
 trigger.addEventListener('click',()=>{const open=trigger.getAttribute('aria-expanded')==='true';trigger.querySelector('.artist-open-cue').textContent=open?'작가 소개 접기':'타이틀을 눌러 작가 소개 보기'});
 document.querySelector('.credits-thread')?.remove();
})();
/* A type-only artist page: visible biography, generous space, no paper or collage. */
(()=>{
 const artist=document.querySelector('#artist');if(!artist)return;
 const source=[...artist.querySelectorAll('.artist-details details')].map(item=>({title:item.querySelector('summary')?.childNodes[0]?.textContent?.trim(),body:item.querySelector('p')?.textContent?.trim()}));
 const banner=artist.querySelector('.artist-banner'),shell=artist.querySelector('.artist-paper-shell');if(!banner)return;
 const page=document.createElement('div');page.className='artist-type-page';
 page.innerHTML='<div class="artist-type-meta"><span>RE:FRAME</span><span>BEHIND THE FRAME · 2026</span></div><h2 class="artist-type-title" aria-label="Artist"><img src="assets/artist-signature.svg" alt="Artist"></h2><div class="artist-type-body"><div class="artist-type-identity"><p class="artist-type-name">김지민 <span>KIM JIMIN</span></p><p class="artist-type-role">VFX / AI VISUAL ART</p><h3>영화를 바라보고,<br>다시 만드는 사람.</h3></div><div class="artist-type-writing"><p class="artist-type-bio"></p><div class="artist-type-notes"></div></div></div>';
 page.querySelector('.artist-type-bio').textContent=source[0]?.body||'VFX를 전공하며 영화의 구도와 색감, 분위기를 참고해 AI 이미지와 영상을 제작합니다. 이번 전시에서는 영화의 장면을 새로운 시선으로 재구성한 작품을 소개합니다.';
 for(const item of source.slice(1)){const section=document.createElement('div');section.className='artist-type-note';const h=document.createElement('h3'),p=document.createElement('p');h.textContent=item.title;p.textContent=item.body;section.append(h,p);page.querySelector('.artist-type-notes').append(section)}
 banner.replaceWith(page);shell?.remove();artist.classList.add('artist-typography-only');
 const blocks=[page.querySelector('.artist-type-meta'),page.querySelector('.artist-type-title'),...page.querySelectorAll('.artist-type-identity > *, .artist-type-bio, .artist-type-note')];
 const reduce=()=>matchMedia('(prefers-reduced-motion: reduce)').matches||document.documentElement.classList.contains('motion-off');
 const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(!entry.isIntersecting)continue;observer.unobserve(entry.target);if(!reduce())entry.target.animate([{opacity:.12,transform:'translateY(22px)',filter:'blur(5px)'},{opacity:1,transform:'translateY(0)',filter:'blur(0px)'}],{duration:1000,delay:Number(entry.target.dataset.artistDelay||0),easing:'cubic-bezier(.16,1,.3,1)',fill:'backwards'})}},{threshold:.12});
 blocks.forEach((block,i)=>{block.dataset.artistDelay=String(Math.min(i%4*90,270));observer.observe(block)});
})();
/* Unbind the document portfolio; a sheet emerges from its existing cover seam. */
(()=>{
 const ending=document.querySelector('#ending');if(!ending)return;
 const artist=document.querySelector('#artist');if(artist?.contains(ending))artist.after(ending);
 ending.className='document-ending';
 ending.innerHTML=`<div class="document-stage"><img class="document-plate" src="assets/ending-document.jpg" alt="초원과 응접실 사진, 레이스와 황동 소품을 얹은 자주색 서류철">
 <div class="document-slot" aria-hidden="true"></div><div class="document-sheet-window"><article class="document-sheet" aria-label="전시 마무리 서류"><span class="document-edition">RE:FRAME · ONLINE CINEMA EXHIBITION</span><p class="document-message">다시 본 장면,<br>새롭게 남는 기억.</p><p class="document-thanks">관람해 주셔서 감사합니다.</p><div class="document-credit">기획 · 디자인 · 제작 김지민<br><span>AI VISUAL ART · 2026</span></div><h2 class="document-final-title"><img src="assets/opening-title-letters.png" alt="RE:FRAME"></h2></article></div>
 <div class="document-cover-lip" aria-hidden="true"></div>
 <svg class="document-cords" viewBox="0 0 1600 900" preserveAspectRatio="none" aria-hidden="true"><defs><filter id="cord-shadow"><feDropShadow dx="0" dy="3" stdDeviation="2" flood-opacity=".6"/></filter></defs><g class="document-cord-left"><path d="M-80 515 C230 515 500 515 800 515 Q860 490 810 477 Q770 482 800 515"/><path d="M-80 542 C230 542 500 542 800 542"/></g><g class="document-cord-right"><path d="M1680 515 C1300 515 1050 515 800 515 Q735 545 790 556 Q835 546 800 515"/><path d="M1680 542 C1300 542 1050 542 800 542"/></g></svg>
 <nav class="document-nav" aria-label="전시 마무리"><a href="#home">처음으로</a><button type="button" class="document-replay">다시 펼치기</button><a href="#poster">작품 다시 보기</a></nav></div>`;
 const stage=ending.querySelector('.document-stage'),sheet=ending.querySelector('.document-sheet');let played=false;
 const reduce=()=>matchMedia('(prefers-reduced-motion: reduce)').matches||document.documentElement.classList.contains('motion-off');
 function play(){played=true;stage.classList.remove('document-open');void stage.offsetWidth;if(reduce()){stage.classList.add('document-static');return}stage.classList.remove('document-static');stage.classList.add('document-open')}
 ending.querySelector('.document-replay').addEventListener('click',play);
 const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)&&!played){play();observer.disconnect()}},{threshold:.48});observer.observe(stage);
 document.querySelector('.motion-toggle')?.addEventListener('click',()=>{if(reduce())stage.classList.add('document-static')});
})();

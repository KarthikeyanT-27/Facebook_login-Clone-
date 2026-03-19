const $ = id => document.getElementById(id);
const isEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const isPhone = v => /^\+?[\d\s\-(]{7,}$/.test(v);

/* DOB */
(()=>{
  const dd=$('dDay');
  for(let d=1;d<=31;d++){const o=document.createElement('option');o.value=o.textContent=d;dd.appendChild(o);}
  const dy=$('dYr'), now=new Date().getFullYear();
  for(let y=now;y>=now-100;y--){const o=document.createElement('option');o.value=o.textContent=y;dy.appendChild(o);}
})();

/* Toast */
function toast(msg){
  const t=$('toast');$('toastMsg').textContent=msg;
  t.classList.add('show');setTimeout(()=>t.classList.remove('show'),3200);
}

/* Login */
function setErr(fieldId, wrapId, msg){
  $(fieldId).classList.add('err-inp');
  $(wrapId).textContent = msg;
}
function clrErr(fieldId, wrapId){
  $(fieldId).classList.remove('err-inp');
  $(wrapId).textContent = '';
}

$('email').addEventListener('input', ()=>clrErr('email','fe-email'));
$('password').addEventListener('input', ()=>clrErr('password','fe-pw'));

$('loginForm').addEventListener('submit', e=>{
  e.preventDefault();
  clrErr('email','fe-email'); clrErr('password','fe-pw');
  const ev=$('email').value.trim(), pv=$('password').value;
  let ok=true;
  if(!ev){setErr('email','fe-email','What\'s your email address or mobile number?');ok=false;}
  else if(!isEmail(ev)&&!isPhone(ev)){setErr('email','fe-email','The email address or phone number you entered isn\'t connected to an account.');ok=false;}
  if(ok&&!pv){setErr('password','fe-pw','Enter your password.');ok=false;}
  else if(ok&&pv.length<6){setErr('password','fe-pw','The password you\'ve entered is incorrect.');ok=false;}
  if(!ok)return;

  const btn=$('loginBtn');
  btn.classList.add('loading');$('btnTxt').textContent='Logging in…';
  setTimeout(()=>{btn.classList.remove('loading');$('btnTxt').textContent='Log in';toast('👋 Welcome! (Demo only)');},1600);
});

/* Modal */
const overlay=$('overlay');
function openModal(){overlay.classList.add('open');document.body.style.overflow='hidden';setTimeout(()=>$('fn').focus(),200);}
function closeModal(){
  overlay.classList.remove('open');document.body.style.overflow='';
  $('suForm').reset();
  document.querySelectorAll('.sf').forEach(f=>{f.classList.remove('err');const s=f.querySelector('.se');if(s)s.textContent='';});
}
$('openSignup').addEventListener('click',openModal);
$('modalClose').addEventListener('click',closeModal);
overlay.addEventListener('click',e=>{if(e.target===overlay)closeModal();});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal();});

/* Signup */
function suErr(w,e,m){$(w).classList.add('err');$(e).textContent=m;}
function suOk(w,e){$(w).classList.remove('err');$(e).textContent='';}
[['fn','w-fn','e-fn'],['ln','w-ln','e-ln'],['em','w-em','e-em'],['pw2','w-pw2','e-pw2']].forEach(([id,w,e])=>{
  $(id).addEventListener('input',()=>suOk(w,e));
});
$('suForm').addEventListener('submit',e=>{
  e.preventDefault();let ok=true;
  const fn=$('fn').value.trim(),ln=$('ln').value.trim(),em=$('em').value.trim(),pw=$('pw2').value;
  if(!fn){suErr('w-fn','e-fn',"What's your name?");ok=false;}else suOk('w-fn','e-fn');
  if(!ln){suErr('w-ln','e-ln',"What's your name?");ok=false;}else suOk('w-ln','e-ln');
  if(!em){suErr('w-em','e-em','Enter a mobile number or email address.');ok=false;}
  else if(!isEmail(em)&&!isPhone(em)){suErr('w-em','e-em','Please enter a valid email or mobile number.');ok=false;}
  else suOk('w-em','e-em');
  if(!pw){suErr('w-pw2','e-pw2','Enter a combination of at least 6 numbers, letters and punctuation marks.');ok=false;}
  else if(pw.length<6){suErr('w-pw2','e-pw2','Your password must be at least 6 characters.');ok=false;}
  else suOk('w-pw2','e-pw2');
  if(!ok)return;
  closeModal();toast('🎉 Account created! (Demo only)');
});

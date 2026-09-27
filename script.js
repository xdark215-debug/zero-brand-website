const $ = s => document.querySelector(s), $$ = s => document.querySelectorAll(s);

const menuBtn = $('#menuBtn');
const nav = $('#mainNav');
const searchPanel = $('#searchPanel');
const searchInput = $('#siteSearch');
const results = $('#searchResults');

const menuStyle=document.createElement('style');
menuStyle.textContent=`
.no-scroll{overflow:hidden!important}
.zero-menu-panel{position:fixed;inset:0 0 0 auto;width:min(430px,92vw);z-index:9999;background:#101010;color:#f2f2ee;border-left:1px solid #555;transform:translateX(105%);transition:transform .28s ease;box-shadow:-20px 0 60px rgba(0,0,0,.3);padding:22px 24px;overflow:auto;font-family:inherit}
.zero-menu-panel.open{transform:translateX(0)}
.zero-menu-head{display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #555;padding-bottom:18px;font-size:11px;letter-spacing:2px}
.zero-menu-head button{background:none;border:0;color:#fff;font-size:30px;line-height:1;cursor:pointer;width:44px;height:44px}
.zero-menu-status{display:flex;gap:12px;align-items:center;font-size:9px;letter-spacing:2px;padding:18px 0;color:#888}.zero-menu-status b{color:#fff}
.zero-menu-links{display:grid;border-top:1px solid #333}
.zero-menu-links a,.zero-menu-links button{appearance:none;border:0;border-bottom:1px solid #333;background:transparent;color:#fff;text-decoration:none;text-align:left;display:grid;grid-template-columns:42px 1fr 28px;align-items:center;padding:20px 0;font:700 15px inherit;letter-spacing:1px;cursor:pointer}
.zero-menu-links a span,.zero-menu-links button span{font-size:9px;color:#777}.zero-menu-links i{font-style:normal;text-align:right;color:#777}.zero-menu-links a:hover,.zero-menu-links button:hover{padding-left:8px;background:linear-gradient(90deg,rgba(255,255,255,.06),transparent)}
.zero-menu-circuit{position:relative;height:130px;margin-top:30px;border:1px solid #333;background:linear-gradient(90deg,transparent 49%,#242424 50%,transparent 51%),linear-gradient(transparent 49%,#242424 50%,transparent 51%);background-size:28px 28px;overflow:hidden;color:#666;font-size:9px;letter-spacing:2px;padding:12px}
.zero-menu-circuit span{position:absolute;height:1px;background:#777;width:85px}.zero-menu-circuit span:nth-child(1){top:34px;left:18px}.zero-menu-circuit span:nth-child(2){top:78px;right:18px;width:120px}.zero-menu-circuit span:nth-child(3){bottom:24px;left:70px;width:55px}.zero-menu-circuit b{position:absolute;bottom:12px;right:12px;font-size:8px;font-weight:400}
@media(max-width:700px){.zero-menu-panel{width:100%;padding:20px}.zero-menu-links a,.zero-menu-links button{min-height:58px}}
`;
document.head.appendChild(menuStyle);

function buildMenu(){
  if(document.querySelector('#zeroMenuPanel')) return;
  const panel=document.createElement('aside');
  panel.id='zeroMenuPanel'; panel.className='zero-menu-panel'; panel.setAttribute('aria-hidden','true');
  panel.innerHTML=`<div class="zero-menu-head"><span>ZERO / MENU</span><button type="button" id="zeroMenuClose" aria-label="Close menu">×</button></div><div class="zero-menu-status"><span>SYSTEM</span><b>ONLINE</b><span>///</span></div><nav class="zero-menu-links" aria-label="ZERO quick navigation"><a href="#top" data-menu-action="home"><span>01</span>HOME<i>↗</i></a><button type="button" data-menu-action="search"><span>02</span>SEARCH<i>⌕</i></button><a href="#collections" data-menu-action="new"><span>03</span>NEW<i>↗</i></a><a href="#journal" data-menu-action="updates"><span>04</span>UPDATES<i>↗</i></a><a href="#about" data-menu-action="about"><span>05</span>ABOUT<i>↗</i></a><a href="#contact" data-menu-action="contact"><span>06</span>CONTACT<i>↗</i></a></nav><div class="zero-menu-circuit" aria-hidden="true"><span></span><span></span><span></span><b>ZERO//SYS_001</b></div>`;
  document.body.appendChild(panel);
  const close=()=>{panel.classList.remove('open');panel.setAttribute('aria-hidden','true');document.body.classList.remove('no-scroll');menuBtn?.setAttribute('aria-expanded','false');};
  const open=()=>{panel.classList.add('open');panel.setAttribute('aria-hidden','false');document.body.classList.add('no-scroll');menuBtn?.setAttribute('aria-expanded','true');};
  menuBtn?.addEventListener('click',()=>panel.classList.contains('open')?close():open());
  $('#zeroMenuClose')?.addEventListener('click',close);
  panel.addEventListener('click',e=>{const item=e.target.closest('[data-menu-action]');if(!item)return;const action=item.dataset.menuAction;if(action==='search'){close();openSearch();return;}close();if(action==='home')window.scrollTo({top:0,behavior:'smooth'});});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&panel.classList.contains('open'))close();});
}
buildMenu();

$$('#mainNav a').forEach(a=>a.addEventListener('click',()=>nav?.classList.remove('open')));

const pages=[['Collections','Explore future ZERO chapters and the visual system.','#collections'],['About ZERO','The philosophy behind starting from zero.','#about'],['Journal','Studio notes and announcements from ZERO.','#journal'],['Community','Join the ZERO mailing list and follow the brand.','#contact']];
function renderSearch(q=''){if(!results)return;const term=q.trim().toLowerCase();const found=pages.filter(x=>(x[0]+' '+x[1]).toLowerCase().includes(term));results.innerHTML=found.length?found.map(x=>`<a class="search-result" href="${x[2]}"><b>${x[0]}</b><p>${x[1]}</p></a>`).join(''):'<p>No ZERO result found.</p>' ;$$('.search-result').forEach(a=>a.addEventListener('click',closeSearch));}
function openSearch(){if(!searchPanel)return;searchPanel.hidden=false;document.body.classList.add('no-scroll');renderSearch();setTimeout(()=>searchInput?.focus(),60)}
function closeSearch(){if(!searchPanel)return;searchPanel.hidden=true;document.body.classList.remove('no-scroll')}
$('#searchBtn')?.addEventListener('click',openSearch);$('#closeSearch')?.addEventListener('click',closeSearch);searchInput?.addEventListener('input',e=>renderSearch(e.target.value));document.addEventListener('keydown',e=>{if(e.key==='Escape'&&searchPanel&&!searchPanel.hidden)closeSearch()});renderSearch();

const collectionCopy={'001':['ORIGIN','The first chapter. A visual language built around starting with nothing and choosing to build.'],'002':['MACHINE','A future-facing chapter built around systems, movement, engineering and controlled chaos.'],'003':['UNKNOWN','An experimental chapter where ZERO pushes beyond the familiar.']};
$$('.collection-card').forEach(card=>card.addEventListener('click',()=>{$$('.collection-card').forEach(c=>c.classList.remove('active'));card.classList.add('active');const id=card.dataset.collection,[name,copy]=collectionCopy[id];const detail=$('#collectionDetail');if(detail)detail.innerHTML=`<span>SELECTED / ${id}</span><strong>${name}</strong><p>${copy}</p>`;}));

const form=$('#subscribeForm');form?.addEventListener('submit',e=>{e.preventDefault();const email=$('#email')?.value.trim();if(!email)return;try{localStorage.setItem('zeroSubscriber',email)}catch(_){}const msg=$('#formMessage');if(msg)msg.textContent='YOU ARE ON THE ZERO LIST. WATCH THIS SPACE.';form.reset()});try{if(localStorage.getItem('zeroSubscriber')&&$('#formMessage'))$('#formMessage').textContent='ZERO LIST / REGISTERED ON THIS DEVICE.'}catch(_){}
$$('[data-coming]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const msg=$('#formMessage');if(msg)msg.textContent=`${a.dataset.coming.toUpperCase()} LINK WILL BE ADDED BEFORE LAUNCH.`;$('#contact')?.scrollIntoView({behavior:'smooth'})}));

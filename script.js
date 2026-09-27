const $ = s => document.querySelector(s), $$ = s => document.querySelectorAll(s);

const menuBtn = $('#menuBtn');
const nav = $('#mainNav');
const searchPanel = $('#searchPanel');
const searchInput = $('#siteSearch');
const results = $('#searchResults');

/* ZERO mobile menu: HOME / SEARCH / NEW / UPDATES / ABOUT / CONTACT */
function buildMenu(){
  if(document.querySelector('#zeroMenuPanel')) return;
  const panel=document.createElement('aside');
  panel.id='zeroMenuPanel';
  panel.className='zero-menu-panel';
  panel.setAttribute('aria-hidden','true');
  panel.innerHTML=`
    <div class="zero-menu-head"><span>ZERO / MENU</span><button type="button" id="zeroMenuClose" aria-label="Close menu">×</button></div>
    <div class="zero-menu-status"><span>SYSTEM</span><b>ONLINE</b><span>///</span></div>
    <nav class="zero-menu-links" aria-label="ZERO quick navigation">
      <a href="#top" data-menu-action="home"><span>01</span>HOME<i>↗</i></a>
      <button type="button" data-menu-action="search"><span>02</span>SEARCH<i>⌕</i></button>
      <a href="#collections" data-menu-action="new"><span>03</span>NEW<i>↗</i></a>
      <a href="#journal" data-menu-action="updates"><span>04</span>UPDATES<i>↗</i></a>
      <a href="#about" data-menu-action="about"><span>05</span>ABOUT<i>↗</i></a>
      <a href="#contact" data-menu-action="contact"><span>06</span>CONTACT<i>↗</i></a>
    </nav>
    <div class="zero-menu-circuit" aria-hidden="true"><span></span><span></span><span></span><b>ZERO//SYS_001</b></div>`;
  document.body.appendChild(panel);

  const close=()=>{panel.classList.remove('open');panel.setAttribute('aria-hidden','true');document.body.classList.remove('no-scroll');menuBtn?.setAttribute('aria-expanded','false');};
  const open=()=>{panel.classList.add('open');panel.setAttribute('aria-hidden','false');document.body.classList.add('no-scroll');menuBtn?.setAttribute('aria-expanded','true');};
  menuBtn?.addEventListener('click',()=>panel.classList.contains('open')?close():open);
  $('#zeroMenuClose')?.addEventListener('click',close);
  panel.addEventListener('click',e=>{
    const item=e.target.closest('[data-menu-action]'); if(!item) return;
    const action=item.dataset.menuAction;
    if(action==='search'){close();openSearch();return;}
    close();
    if(action==='home') window.scrollTo({top:0,behavior:'smooth'});
  });
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&panel.classList.contains('open'))close();});
}
buildMenu();

/* Keep desktop navigation useful too. */
$$('#mainNav a').forEach(a=>a.addEventListener('click',()=>nav?.classList.remove('open')));

const pages=[
  ['Collections','Explore future ZERO chapters and the visual system.','#collections'],
  ['About ZERO','The philosophy behind starting from zero.','#about'],
  ['Journal','Studio notes and announcements from ZERO.','#journal'],
  ['Community','Join the ZERO mailing list and follow the brand.','#contact']
];
function renderSearch(q=''){
  if(!results) return;
  const term=q.trim().toLowerCase();
  const found=pages.filter(x=>(x[0]+' '+x[1]).toLowerCase().includes(term));
  results.innerHTML=found.length?found.map(x=>`<a class="search-result" href="${x[2]}"><b>${x[0]}</b><p>${x[1]}</p></a>`).join(''):'<p>No ZERO result found.</p>';
  $$('.search-result').forEach(a=>a.addEventListener('click',closeSearch));
}
function openSearch(){
  if(!searchPanel) return;
  searchPanel.hidden=false; document.body.classList.add('no-scroll'); renderSearch();
  setTimeout(()=>searchInput?.focus(),60);
}
function closeSearch(){
  if(!searchPanel) return;
  searchPanel.hidden=true; document.body.classList.remove('no-scroll');
}
$('#searchBtn')?.addEventListener('click',openSearch);
$('#closeSearch')?.addEventListener('click',closeSearch);
searchInput?.addEventListener('input',e=>renderSearch(e.target.value));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&searchPanel&&!searchPanel.hidden)closeSearch();});
renderSearch();

const collectionCopy={
  '001':['ORIGIN','The first chapter. A visual language built around starting with nothing and choosing to build.'],
  '002':['MACHINE','A future-facing chapter built around systems, movement, engineering and controlled chaos.'],
  '003':['UNKNOWN','An experimental chapter where ZERO pushes beyond the familiar.']
};
$$('.collection-card').forEach(card=>card.addEventListener('click',()=>{
  $$('.collection-card').forEach(c=>c.classList.remove('active')); card.classList.add('active');
  const id=card.dataset.collection,[name,copy]=collectionCopy[id];
  const detail=$('#collectionDetail'); if(detail) detail.innerHTML=`<span>SELECTED / ${id}</span><strong>${name}</strong><p>${copy}</p>`;
}));

const form=$('#subscribeForm');
form?.addEventListener('submit',e=>{
  e.preventDefault(); const email=$('#email')?.value.trim(); if(!email) return;
  try{localStorage.setItem('zeroSubscriber',email);}catch(_){ }
  const msg=$('#formMessage'); if(msg) msg.textContent='YOU ARE ON THE ZERO LIST. WATCH THIS SPACE.';
  form.reset();
});
try{if(localStorage.getItem('zeroSubscriber')&&$('#formMessage')) $('#formMessage').textContent='ZERO LIST / REGISTERED ON THIS DEVICE.';}catch(_){ }

$$('[data-coming]').forEach(a=>a.addEventListener('click',e=>{
  e.preventDefault(); const msg=$('#formMessage'); if(msg) msg.textContent=`${a.dataset.coming.toUpperCase()} LINK WILL BE ADDED BEFORE LAUNCH.`;
  $('#contact')?.scrollIntoView({behavior:'smooth'});
}));

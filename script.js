const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
const menuBtn=$('#menuBtn'), menuPanel=$('#menuPanel');
function closeMenu(){menuPanel.hidden=true;menuBtn.setAttribute('aria-expanded','false');document.body.classList.remove('no-scroll')}
menuBtn?.addEventListener('click',()=>{const open=menuPanel.hidden;menuPanel.hidden=!open;menuBtn.setAttribute('aria-expanded',String(open));document.body.classList.toggle('no-scroll',open)});
$$('.menu-inner a').forEach(a=>a.addEventListener('click',closeMenu));

const searchPanel=$('#searchPanel'), searchInput=$('#siteSearch'), results=$('#searchResults');
const pages=[
 ['New','The latest ZERO chapter and launch direction.','#new'],
 ['Collections','Explore the ZERO collection chapters.','#collections'],
 ['About ZERO','The philosophy behind starting from zero.','#about'],
 ['Journal','Studio notes, announcements and updates.','#journal'],
 ['Community','Follow the ZERO build and future releases.','#contact']
];
function closeSearch(){searchPanel.hidden=true;document.body.classList.remove('no-scroll')}
function renderSearch(query=''){
 results.replaceChildren();
 const term=query.trim().toLowerCase();
 const found=pages.filter(p=>(p[0]+' '+p[1]).toLowerCase().includes(term));
 if(!found.length){const p=document.createElement('p');p.textContent='No ZERO result found.';results.appendChild(p);return}
 found.forEach(p=>{const a=document.createElement('a');a.className='search-result';a.href=p[2];const strong=document.createElement('strong');strong.textContent=p[0];const desc=document.createElement('p');desc.textContent=p[1];a.append(strong,desc);a.addEventListener('click',closeSearch);results.appendChild(a)})
}
$('#searchBtn')?.addEventListener('click',()=>{searchPanel.hidden=false;document.body.classList.add('no-scroll');renderSearch();setTimeout(()=>searchInput?.focus(),50)});
$('#closeSearch')?.addEventListener('click',closeSearch);
searchInput?.addEventListener('input',e=>renderSearch(e.target.value));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(!searchPanel.hidden)closeSearch();else closeMenu()}});

$$('[data-coming]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();alert(`${a.dataset.coming} link will be added when ZERO launches its official account.`)}));

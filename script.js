const $=s=>document.querySelector(s);const $$=s=>document.querySelectorAll(s);
const menu=$('#menu'),overlay=$('#overlay'),menuBtn=$('#menuBtn'),closeMenu=$('#closeMenu');
const searchPanel=$('#searchPanel'),searchBtn=$('#searchBtn'),closeSearch=$('#closeSearch'),searchForm=$('#searchForm'),searchInput=$('#searchInput'),searchStatus=$('#searchStatus');
const cart=$('#cart'),bagBtn=$('#bagBtn'),closeCart=$('#closeCart'),cartItems=$('#cartItems'),cartTotal=$('#cartTotal'),bagCount=$('#bagCount');
let bag=[];
function setMenu(open){menu.classList.toggle('open',open);overlay.classList.toggle('open',open);menu.setAttribute('aria-hidden',String(!open));menuBtn.setAttribute('aria-expanded',String(open));document.body.style.overflow=open?'hidden':''}
menuBtn.onclick=()=>setMenu(true);closeMenu.onclick=()=>setMenu(false);overlay.onclick=()=>{setMenu(false);cart.classList.remove('open')};
$$('.menu a').forEach(a=>a.onclick=()=>setMenu(false));
function setSearch(open){searchPanel.classList.toggle('open',open);searchPanel.setAttribute('aria-hidden',String(!open));if(open)setTimeout(()=>searchInput.focus(),100)}
searchBtn.onclick=()=>setSearch(true);closeSearch.onclick=()=>setSearch(false);
searchForm.onsubmit=e=>{e.preventDefault();const q=searchInput.value.trim().toLowerCase();if(!q){searchStatus.textContent='Type a product or collection to search.';return}const matches=[...$$('.product')].filter(p=>p.dataset.name.toLowerCase().includes(q)||p.dataset.category.includes(q));searchStatus.textContent=matches.length?`${matches.length} result${matches.length>1?'s':''} found.`:'No matching products yet.';if(matches[0]){setSearch(false);matches[0].scrollIntoView({behavior:'smooth',block:'center'})}};
document.addEventListener('keydown',e=>{if(e.key==='Escape'){setMenu(false);setSearch(false);cart.classList.remove('open')}});
$$('[data-filter]').forEach(btn=>btn.onclick=()=>{const f=btn.dataset.filter;$$('.product').forEach(p=>p.style.display=f==='all'||p.dataset.category===f?'':'none');$('#new').scrollIntoView({behavior:'smooth'});});
function money(n){return `₱${n.toLocaleString('en-PH')}`}
function renderBag(){bagCount.textContent=bag.reduce((s,x)=>s+x.qty,0);if(!bag.length){cartItems.innerHTML='<div style="padding:30px 0;color:#777;font-size:12px">Your bag is empty.</div>';cartTotal.textContent='₱0';return}cartItems.innerHTML=bag.map((x,i)=>`<div class="cart-row"><div class="cart-thumb">ZERO</div><div><p>${x.name}</p><span>${money(x.price)} × ${x.qty}</span></div><button class="remove" data-remove="${i}">REMOVE</button></div>`).join('');cartTotal.textContent=money(bag.reduce((s,x)=>s+x.price*x.qty,0));$$('[data-remove]').forEach(b=>b.onclick=()=>{bag.splice(+b.dataset.remove,1);renderBag()})}
$$('[data-add]').forEach(b=>b.onclick=()=>{const name=b.dataset.add,price=+b.dataset.price;const found=bag.find(x=>x.name===name);found?found.qty++:bag.push({name,price,qty:1});renderBag();cart.classList.add('open')});
bagBtn.onclick=()=>{renderBag();cart.classList.add('open')};closeCart.onclick=()=>cart.classList.remove('open');
$('#checkout').onclick=()=>alert(bag.length?'Checkout demo: your cart is ready.':'Your bag is empty.');
renderBag();

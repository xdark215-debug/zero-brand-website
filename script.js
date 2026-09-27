const drawer=document.getElementById("drawer");
const menuBtn=document.getElementById("menuBtn");
const closeMenu=document.getElementById("closeMenu");
const searchPanel=document.getElementById("searchPanel");
const searchBtn=document.getElementById("searchBtn");
const closeSearch=document.getElementById("closeSearch");
const searchForm=document.getElementById("searchForm");
const backdrop=document.createElement("div");
backdrop.className="drawer-backdrop";
backdrop.setAttribute("aria-hidden","true");
document.body.appendChild(backdrop);

function setMenu(open){
  if(!drawer||!menuBtn)return;
  drawer.classList.toggle("open",open);
  drawer.setAttribute("aria-hidden",String(!open));
  menuBtn.setAttribute("aria-expanded",String(open));
  document.body.classList.toggle("menu-open",open);
  backdrop.classList.toggle("open",open);
}
function setSearch(open){
  if(!searchPanel)return;
  searchPanel.classList.toggle("open",open);
  searchPanel.setAttribute("aria-hidden",String(!open));
  if(open){const input=document.getElementById("searchInput"); if(input){input.value=""; input.focus();}}
}
menuBtn?.addEventListener("click",()=>setMenu(!drawer.classList.contains("open")));
closeMenu?.addEventListener("click",()=>setMenu(false));
backdrop.addEventListener("click",()=>setMenu(false));
drawer?.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>setMenu(false)));
searchBtn?.addEventListener("click",()=>setSearch(true));
closeSearch?.addEventListener("click",()=>setSearch(false));
searchForm?.addEventListener("submit",e=>{
 e.preventDefault();
 const input=document.getElementById("searchInput"); const q=(input?.value||"").trim().toLowerCase();
 if(!q)return;
 const targets=[...document.querySelectorAll("main section, main article")];
 const found=targets.find(el=>(el.textContent||"").toLowerCase().includes(q));
 if(found){found.scrollIntoView({behavior:"smooth",block:"start"});setSearch(false);}
 else if(input){input.value="";input.placeholder="No match — try NEW, SHOP, STORY";}
});
document.addEventListener("keydown",e=>{
 if(e.key==="Escape"){setMenu(false);setSearch(false);}
});

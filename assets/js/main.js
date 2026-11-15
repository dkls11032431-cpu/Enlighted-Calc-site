(function(){
const toggle=document.querySelector('.menu-toggle'),nav=document.querySelector('.nav');
if(toggle&&nav){toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.textContent=open?'×':'☰';});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.textContent='☰';}));}
const year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();
const path=location.pathname.replace('index.html','').replace(/\/$/,'');
if(path){const labels={'electrical':'Electrical','solar':'Solar','energy-management':'Energy Management','backup-power':'UPS & DG','iot-automation':'IoT & Automation','calculators':'Calculators','finance':'Finance','reviews':'Reviews','about':'About','contact':'Contact'};const parts=path.split('/').filter(Boolean),list=document.createElement('ol'),home=document.createElement('li'),homeLink=document.createElement('a');homeLink.href='/';homeLink.textContent='Home';home.append(homeLink);list.append(home);let cumulative='';parts.forEach((part,index)=>{cumulative+='/'+part;const item=document.createElement('li'),label=labels[part]||part.split('-').map(w=>w.charAt(0).toUpperCase()+w.slice(1)).join(' ');if(index<parts.length-1){const link=document.createElement('a');link.href=cumulative+'/';link.textContent=label;item.append(link);}else{item.textContent=label;item.setAttribute('aria-current','page');}list.append(item);});const crumb=document.createElement('nav');crumb.className='breadcrumb';crumb.setAttribute('aria-label','Breadcrumb');crumb.append(list);const main=document.querySelector('main');if(main)main.insertAdjacentElement('beforebegin',crumb);const active=nav&&nav.querySelector('a[href="/'+parts[0]+'/"]');if(active)active.setAttribute('aria-current','page');}
})();

/* GA4 engagement events via the installed Google Tag Manager dataLayer. */
document.addEventListener('click',function(event){
 const target=event.target instanceof Element?event.target:null;
 if(!target)return;
 const link=target.closest('a[href]');
 if(link){
  let url;
  try{url=new URL(link.href,location.href);}catch(_){url=null;}
  if(url&&/^https?:$/.test(url.protocol)&&url.origin!==location.origin){
   const affiliate=/amazon\./i.test(url.hostname)&&/(?:[?&])tag=enlightedinc-21(?:&|$)/i.test(url.search);
   window.dataLayer=window.dataLayer||[];
   window.dataLayer.push({
    event:affiliate?'affiliate_click':'outbound_click',
    link_url:url.href,
    link_text:(link.innerText||link.getAttribute('aria-label')||'').trim().slice(0,120),
    page_path:location.pathname
   });
  }
 }
 const button=target.closest('button,[role="button"],input[type="button"],input[type="submit"]');
 if(button){
  const label=(button.innerText||button.value||button.getAttribute('aria-label')||'').trim();
  if(/calculate|estimate|solar sizing|size system|check runtime|calculate usage/i.test(label)){
   window.dataLayer=window.dataLayer||[];
   window.dataLayer.push({
    event:'calculator_used',
    calculator_name:document.querySelector('main h1')?.textContent.trim()||document.title,
    calculator_action:label.slice(0,100),
    page_path:location.pathname
   });
  }
 }
},true);

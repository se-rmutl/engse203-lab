(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const c of a.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function r(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(t){if(t.ep)return;t.ep=!0;const a=r(t);fetch(t.href,a)}})();async function p({simulateError:e=!1}={}){if(e)throw new Error("Simulated error: data source is unavailable");const s=new URL("data/learning-tasks.json","/engse203-lab02-solution/"),r=await fetch(s);if(!r.ok)throw new Error(`Unable to load tasks (HTTP ${r.status})`);const n=await r.json();if(!Array.isArray(n))throw new Error("The data source returned an invalid task collection");return n}const g={todo:"To do",doing:"In progress",done:"Done"};function m(e){return g[e]??"Unknown"}function h(e,{query:s="",status:r="all"}={}){const n=s.trim().toLowerCase();return e.filter(t=>r==="all"||t.status===r).filter(({title:t,topic:a,tags:c=[]})=>[t,a,...c].join(" ").toLowerCase().includes(n)).sort((t,a)=>t.week-a.week)}function y(e){return e.reduce((s,{status:r})=>({...s,total:s.total+1,[r]:(s[r]??0)+1}),{total:0,todo:0,doing:0,done:0})}function l(e){return String(e).replace(/[&<>"']/g,s=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"})[s])}function u(e,s,r){e.className=`message ${s}`,e.textContent=r}function L(e,s){const r=[["Total",s.total],["To do",s.todo],["In progress",s.doing],["Done",s.done]];e.innerHTML=r.map(([n,t])=>`
        <article class="stat-card">
          <span>${n}</span>
          <strong>${t}</strong>
        </article>
      `).join("")}function w(e,s){if(s.length===0){e.innerHTML=`
      <article class="empty-state">
        <h2>ไม่พบรายการที่ตรงกับเงื่อนไข</h2>
        <p>ลองเปลี่ยนคำค้นหาหรือตัวกรองสถานะ</p>
      </article>
    `;return}e.innerHTML=s.map(({week:r,title:n,topic:t,status:a,tags:c=[]})=>`
        <article class="task-card">
          <div class="task-meta">
            <span class="badge">Week ${r}</span>
            <span class="badge status-${l(a)}">${m(a)}</span>
          </div>
          <h2>${l(n)}</h2>
          <p>${l(t)}</p>
          <div class="tags">
            ${c.map(f=>`<span class="tag">${l(f)}</span>`).join("")}
          </div>
        </article>
      `).join("")}const o={message:document.querySelector("#app-message"),stats:document.querySelector("#stats"),taskList:document.querySelector("#task-list"),search:document.querySelector("#search"),status:document.querySelector("#status-filter")},i={tasks:[],query:"",status:"all"};function d(){const e=h(i.tasks,{query:i.query,status:i.status});L(o.stats,y(i.tasks)),w(o.taskList,e)}async function T(){try{u(o.message,"loading","กำลังโหลดข้อมูล...");const e=new URLSearchParams(window.location.search);i.tasks=await p({simulateError:e.get("simulateError")==="1"}),d(),u(o.message,"success",`โหลดข้อมูล ${i.tasks.length} รายการแล้ว`)}catch(e){console.error("Unable to load dashboard:",e),o.stats.innerHTML="",o.taskList.innerHTML="",u(o.message,"error",`ไม่สามารถโหลดข้อมูลได้: ${e.message}`)}finally{console.info("Learning Dashboard load attempt finished.")}}o.search.addEventListener("input",e=>{i.query=e.target.value,d()});o.status.addEventListener("change",e=>{i.status=e.target.value,d()});T();

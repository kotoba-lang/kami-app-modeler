const state={tool:'Select',distance:.5,history:['Create cube']};
const $=s=>document.querySelector(s); const render=()=>{ $('#tool').textContent=state.tool; $('#distanceValue').textContent=state.distance.toFixed(2); $('#faces').textContent=`${6+state.history.length-1} faces`; $('#cube').style.height=`${150+state.history.length*state.distance*18}px`; $('#history').innerHTML=state.history.map(x=>`<li>${x}</li>`).join(''); };
document.querySelectorAll('[data-tool]').forEach(b=>b.onclick=()=>{state.tool=b.textContent;render()});
$('#distance').oninput=e=>{state.distance=+e.target.value;render()};
$('#extrude').onclick=()=>{state.history.push(`Extrude face · ${state.distance.toFixed(2)}m`);render()};
$('#undo').onclick=()=>{if(state.history.length>1)state.history.pop();render()};
$('#export').onclick=()=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(state,null,2)],{type:'application/json'}));a.download='kami-modeler-project.json';a.click();URL.revokeObjectURL(a.href)};render();

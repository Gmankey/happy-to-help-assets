/* HAPPY TO HELP — M14 external-script execution feasibility canary.
 * Test-only, not a game runtime. No changes to approved artwork.
 * This file deliberately draws the UI; the ChatGPT wrapper must not.
 */
(function () {
  'use strict';
  var marker='HTH_M14_EXTERNAL_RENDERER_LOADED';
  var art='https://cdn.jsdelivr.net/gh/Gmankey/happy-to-help-assets@02e4cfd7ab8cf7391e79ca66512a30a320ac4a63/m1-approved-v1/';
  var power='https://cdn.jsdelivr.net/gh/Gmankey/happy-to-help-assets@02e4cfd7ab8cf7391e79ca66512a30a320ac4a63/m2-cam03-clean/CAM3_CLEAN_FIXED_BACKGROUND_v7.webp';
  function mount(root) {
    if(!root || root.dataset.hthM14Mounted)return false;
    root.dataset.hthM14Mounted='yes';
    root.innerHTML='';
    root.style.cssText='border:1px solid #53837c;background:#0e181b;color:#e4f2ee;padding:10px;border-radius:8px;font:13px system-ui';
    var ok=document.createElement('div');
    ok.textContent='PASS: External renderer JS executed (M14)';
    ok.style.cssText='font-weight:700;color:#9bffd1;margin-bottom:8px';
    root.appendChild(ok);
    var row=document.createElement('div');row.style.cssText='display:flex;gap:8px;margin-bottom:8px';
    var holder=document.createElement('div');holder.style.cssText='position:relative;width:100%;aspect-ratio:2/1;overflow:hidden;background:#000';
    var image=document.createElement('img');image.alt='Approved test camera background';image.style.cssText='width:100%;height:100%;display:block;object-fit:fill';
    var cover=document.createElement('div');cover.style.cssText='position:absolute;inset:0;pointer-events:none;background:#000';
    holder.append(image,cover);root.append(row,holder);
    var tag=document.createElement('div');tag.style.cssText='margin-top:8px;color:#bdd0c9';root.append(tag);
    var camera=1,lighting=10;
    function draw(){image.src=camera===1?art+'BG-01_LAB_SHELL.png':power;cover.style.opacity=camera===1?(1-lighting/100):0;tag.textContent='Camera '+camera+' | Light '+lighting+'% | updated locally; no ChatGPT message';}
    [['CAM 01',1],['CAM 03',3]].forEach(function(item){var b=document.createElement('button');b.textContent=item[0];b.style.cssText='padding:7px;border-radius:4px;border:1px solid #6f9b90;background:#183136;color:white;cursor:pointer';b.onclick=function(){camera=item[1];draw()};row.append(b)});
    var b=document.createElement('button');b.textContent='Toggle 10% / 100%';b.style.cssText='padding:7px;border-radius:4px;border:1px solid #6f9b90;background:#183136;color:white;cursor:pointer';b.onclick=function(){lighting=lighting===10?100:10;draw()};row.append(b);
    draw();return true;
  }
  globalThis.HTH_M14_PROBE={marker:marker,mount:mount};
})();

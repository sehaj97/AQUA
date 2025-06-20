javascript:(function(){function injectStyle(id,css){if(!document.getElementById(id)){const style=document.createElement('style');style.id=id;style.textContent=css;document.head.appendChild(style)}}
function removeElements(selector){document.querySelectorAll(selector).forEach(el=>el.remove())}
function forEachNode(nodes,fn){Array.prototype.forEach.call(nodes,fn)}
function getAriaLabelText(element){return element.getAttribute('aria-label')}
function getElementsWithAriaLabel(skipHeaderFooter=!1){let elements=Array.from(document.querySelectorAll('[aria-label]'));if(skipHeaderFooter){elements=elements.filter(el=>!el.closest('header, footer'))}
return elements}
const AQUA_DISABLED_KEY='__AQUA_BUTTONS_DISABLED__';function saveButtonsDisabledState(isDisabled){try{localStorage.setItem(AQUA_DISABLED_KEY,isDisabled?'1':'0')}catch(e){}}
function getButtonsDisabledState(){try{return localStorage.getItem(AQUA_DISABLED_KEY)==='1'}catch(e){return!1}}
const existingPopup=document.getElementById('aqua-popup');if(existingPopup){existingPopup.remove();console.log('Removed existing popup.');return}
const popupHost=document.createElement('div');popupHost.id='aqua-popup';popupHost.style.position='fixed';popupHost.style.top='20px';popupHost.style.left='20px';popupHost.style.transform='translateX(-50%)';popupHost.style.zIndex='100001';popupHost.style.cursor='';const shadow=popupHost.attachShadow({mode:'open'});const style=document.createElement('style');style.textContent=`
    #aqua-popup-main {
      position: fixed !important;
      background: linear-gradient(135deg, #1d1d1d, #333) !important;
      color: #fff !important;
      padding: 20px !important;
      border: 1px solid #444 !important;
      border-radius: 12px !important;
      box-shadow: 0 8px 16px rgba(0,0,0,0.6) !important;
      z-index: 10000 !important;
      font-family: 'Roboto', Arial, sans-serif !important;
      width: 340px !important;
      max-height: 75vh !important;
      overflow-y: hidden !important;
      text-align: center !important;
      animation: slideIn 0.3s ease-out !important;
    }
    @keyframes slideIn {
      from { opacity: 0; transform: translate(-50%, -55%);}
      to { opacity: 1; transform: translate(-50%, -50%);}
    }
    #aqua-popup-main h3 {
      font-size: 20px !important;
      margin: 2px !important;
      color: #00c2ff !important;
      font-weight: 700 !important;
      text-transform: uppercase !important;
    }
    #aqua-popup-main p {
      font-size: 14px !important;
      margin: 0 !important;
      color: #bbb !important;
      line-height: 1.5 !important;
    }
    #aqua-popup-main ul {
      margin: 12px 0 !important;
      padding: 0 !important;
      list-style: none !important;
      text-align: left !important;
    }
    #aqua-popup-main ul li {
      font-size: 13px !important;
      color: #ddd !important;
      margin-bottom: 6px !important;
      display: flex !important;
      align-items: center !important;
    }
    #aqua-popup-main ul li::before {
      content: '•';
      color: #00c2ff !important;
      margin-right: 8px !important;
    }
    #aqua-popup-main button {
      display: block !important;
      width: 90% !important;
      margin: 5px !important;
      padding: 10px !important;
      font-size: 14px !important;
      font-weight: bold !important;
      color: #fff !important;
      background: linear-gradient(135deg, #00c2ff, #007bff) !important;
      border: none !important;
      border-radius: 8px !important;
      cursor: pointer !important;
      transition: background 0.3s ease !important;
      box-shadow: 0 4px 8px rgba(0,0,0,0.2) !important;
    }
    #aqua-popup-main button:hover {
      background: linear-gradient(135deg, #007bff, #0056b3) !important;
    }
    #aqua-popup-main button:disabled {
      background: #555 !important;
      cursor: not-allowed !important;
    }
    #aqua-popup-main .close-button {
      position: absolute !important;
      top: 10px !important;
      right: 10px !important;
      background: #ff4d4d !important;
      color: #fff !important;
      border: none !important;
      border-radius: 50% !important;
      font-size: 16px !important;
      width: 15px !important;
      height: 15px !important;
      cursor: pointer !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      transition: background 0.3s ease !important;
      z-index: 10001 !important;
    }
    #aqua-popup-main .close-button:hover { background: #cc0000 !important; }
    #button-container {
      display: grid !important;
      grid-template-columns: 1fr 1fr !important;
      gap: 8px !important;
      margin: 2px 0 !important;
    }
    #button-container button {
      flex: 1 !important;
      max-width: 100% !important;
      text-align: center !important;
    }
    .highlighted-aria-label {
      position: relative !important;
      outline: 3px solid #ffc107 !important;
      background-color: rgba(255,193,7,0.2) !important;
      cursor: pointer !important;
      transition: all 0.3s ease-in-out !important;
    }
    .highlighted-aria-label:hover {
      outline: 3px solid #e6a700 !important;
      background-color: rgba(255,193,7,0.3) !important;
    }
    .aria-label-tooltip {
      position: absolute !important;
      top: -35px !important;
      left: 50% !important;
      transform: translateX(-50%) !important;
      background: #444 !important;
      color: #fff !important;
      padding: 8px 12px !important;
      border-radius: 6px !important;
      font-size: 12px !important;
      white-space: nowrap !important;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1) !important;
      z-index: 100000 !important;
      opacity: 0 !important;
      visibility: hidden !important;
      transition: all 0.3s ease-in-out !important;
      max-width: 300px !important;
      overflow-wrap: break-word !important;
    }
    .highlighted-aria-label:hover .aria-label-tooltip {
      opacity: 1 !important;
      visibility: visible !important;
    }
    .inline-aria-label {
      display: inline-block !important;
      background: #ff8800 !important;
      color: #fff !important;
      padding: 6px 10px !important;
      border-radius: 12px !important;
      font-size: 12px !important;
      font-weight: 600 !important;
      margin-left: 6px !important;
      z-index: 10000 !important;
      transition: background 0.3s ease-in-out !important;
      position: relative !important;
    }
    .inline-aria-label:hover { background: #0056b3 !important; }
    `;const popupElement=document.createElement('div');popupElement.id='aqua-popup-main';popupElement.innerHTML=`
    <div id="aqua-popup-header" style="user-select: none; padding: 8px 0 0 0; display: flex; align-items: center;">
      <button id="aqua-drag-btn" title="Drag AQUA popup" style="position: absolute;width: 40px !important;height: 40px !important;font-size: 30px!important;cursor: move !important;border-radius: 50% !important;top: 10px !important;padding: 0px !important;background: linear-gradient(135deg, yellow, orange) !important;">&curren;</button>
      <h3 style="margin:0; padding:0 12px; flex:1;">AQUA</h3>
      <button class="close-button" id="close-popup" style="float:right;position: absolute;width: 40px !important;height: 40px !important;font-size: 30px!important;cursor: crosshair !important;border-radius: 50% !important;top: 10px !important;padding: 0px !important;">&times;</button>
    </div>
    <p>
    <sub>Version 2.1</sub></p>
    <p><strong>Accessibility Quality User-first Assurance</strong> (AQUA). You can select a tool:
      <select id="aqua-tool-dropdown" style="margin-left: 8px; padding: 4px 8px; border-radius: 4px; width:80%;">
        <option value="COAQUA">CO-Aqua - Content Only AQUA</option>
        <option value="ALT">ALT - Test aria-label attributes.</option>
        <option value="ARG">ARG - Run axe accessibility checks.</option>
        <option value="IT">IT - Check images alt tags, formats and fallbacks.</option>
        <option value="FORMALT">FORMALT - check for forms alt, aria labels and aria labeledby.</option>
      </select>
    </p>
    <div id="aqua-tool-sections">
      <div class="aqua-tool-section" id="section-COAQUA" style="display: none;">
        <h3>CO-AQUA</h3>
        <div>
          <button id="co-highlight-and-inline-labels-skip">Highlight Aria-labels with tooltips on hover (Skip Header/Footer)</button>
          <button id="co-always-show-inline-labels-skip">Show All Labels Always (Skip Header/Footer)</button>
          <button id="co-show-alt-text-skip">Check Image Alt Text (Skip Header/Footer)</button>
          <button id="co-form-aria-checker">form aria checks</button>
          <h4>Reset<h4>
          <button id="aqua-revert">Revert All AQUA Changes</button>
          <button id="remove-actions">Refresh(if revert caused issues)</button>
        </div>
      </div>
      <div class="aqua-tool-section" id="section-ALT" style="display: none;">
        <h3>ALT</h3>
        <div>
          <button id="highlight-and-inline-labels-skip">Highlight Aria-labels with tooltips on hover (Skip Header/Footer)</button>
          <button id="always-show-inline-labels-skip">Show All Labels Always (Skip Header/Footer)</button>
          <button id="highlight-and-inline-labels">Highlight Aria-labels with tooltips on hover</button>
          <button id="always-show-inline-labels">Show Tooltips Always</button>
          <button id="always-show-inline-labels-2">Show All Labels Always</button>
          <button id="aqua-revert">Revert All AQUA Changes</button>
        </div>
      </div>
      <div class="aqua-tool-section" id="section-ARG" style="display: none;">
        <h3>ARG</h3>
        <div>
          <button id="button-arg">Run Axe Checks</button>
          <button id="aqua-revert">Revert All AQUA Changes</button>
        </div>
      </div>
      <div class="aqua-tool-section" id="section-IT" style="display: none;">
        <h3>IT</h3>
        <div>
          <button id="show-alt-text-skip">Check Image Alt Text (Skip Header/Footer)</button>
          <button id="inline-image-labels-skip">Check Image Formats (Skip Header/Footer)</button>
          <button id="show-alt-text">Check Image Alt Text</button>
          <button id="inline-image-labels">Check Image Formats</button>
          <button id="aqua-revert">Revert All AQUA Changes</button>
        </div>
      </div>
      <div class="aqua-tool-section" id="section-FORMALT" style="display: none;">
        <h3>FORMALT</h3>
        <div>
          <button id="form-aria-checker">form aria checks</button>
          <button id="aqua-revert">Revert All AQUA Changes</button>
        </div>
      </div>
    </div>
    `;shadow.appendChild(style);shadow.appendChild(popupElement);(function makeDraggable(popup,dragBtnSelector){let isDragging=!1,startX,startY,startLeft,startTop;const dragBtn=popup.shadowRoot?popup.shadowRoot.querySelector(dragBtnSelector):popup.querySelector(dragBtnSelector);if(dragBtn){dragBtn.style.cursor='move';function onMouseDown(e){if(e.button!==0)return;isDragging=!0;popup.style.transform='';startX=e.clientX;startY=e.clientY;const rect=popup.getBoundingClientRect();startLeft=rect.left;startTop=rect.top;document.addEventListener('mousemove',onMouseMove);document.addEventListener('mouseup',onMouseUp);e.preventDefault()}
function onMouseMove(e){if(!isDragging)return;let newLeft=startLeft+(e.clientX-startX);let newTop=startTop+(e.clientY-startY);const minLeft=0,minTop=0;const maxLeft=window.innerWidth-popup.offsetWidth;const maxTop=window.innerHeight-popup.offsetHeight;newLeft=Math.max(minLeft,Math.min(newLeft,maxLeft));newTop=Math.max(minTop,Math.min(newTop,maxTop));popup.style.left=newLeft+'px';popup.style.top=newTop+'px'}
function onMouseUp(){isDragging=!1;document.removeEventListener('mousemove',onMouseMove);document.removeEventListener('mouseup',onMouseUp)}
dragBtn.addEventListener('mousedown',onMouseDown);dragBtn.addEventListener('touchstart',function(e){if(e.touches.length!==1)return;isDragging=!0;popup.style.transform='';startX=e.touches[0].clientX;startY=e.touches[0].clientY;const rect=popup.getBoundingClientRect();startLeft=rect.left;startTop=rect.top;document.addEventListener('touchmove',onTouchMove,{passive:!1});document.addEventListener('touchend',onTouchEnd)});function onTouchMove(e){if(!isDragging||e.touches.length!==1)return;let newLeft=startLeft+(e.touches[0].clientX-startX);let newTop=startTop+(e.touches[0].clientY-startY);const minLeft=0,minTop=0;const maxLeft=window.innerWidth-popup.offsetWidth;const maxTop=window.innerHeight-popup.offsetHeight;newLeft=Math.max(minLeft,Math.min(newLeft,maxLeft));newTop=Math.max(minTop,Math.min(newTop,maxTop));popup.style.left=newLeft+'px';popup.style.top=newTop+'px';e.preventDefault()}
function onTouchEnd(){isDragging=!1;document.removeEventListener('touchmove',onTouchMove);document.removeEventListener('touchend',onTouchEnd)}}})(popupHost,'#aqua-drag-btn');function showAquaToolSection(selected){shadow.querySelectorAll('.aqua-tool-section').forEach(sec=>sec.style.display='none');const section=shadow.querySelector(`#section-${selected}`);if(section)section.style.display=''}
showAquaToolSection('COAQUA');function registerAquaButtonHandlers(){function getAllAquaRevertButtons(){return Array.from(shadow.querySelectorAll('#aqua-revert'))}
function getAllActionButtons(){return Array.from(shadow.querySelectorAll('button')).filter(btn=>btn.id&&btn.id!=='remove-actions'&&btn.id!=='close-popup'&&btn.id!=='aqua-revert'&&btn.id!=='aqua-drag-btn')}
const closeBtn=shadow.querySelector('#close-popup');if(closeBtn){closeBtn.onclick=()=>{popupHost.remove();console.log('Popup closed.');const anyDisabled=getAllActionButtons().some(btn=>btn.disabled);saveButtonsDisabledState(anyDisabled)}}
function disableAllButtonsExceptRemove(){getAllActionButtons().forEach(btn=>btn.disabled=!0);saveButtonsDisabledState(!0)}
function enableAllButtonsExceptRemove(){getAllActionButtons().forEach(btn=>btn.disabled=!1);saveButtonsDisabledState(!1)}
if(getButtonsDisabledState()){setTimeout(()=>{disableAllButtonsExceptRemove()},0)}
const removeActionsBtn=shadow.querySelector('#remove-actions');if(removeActionsBtn){removeActionsBtn.onclick=()=>location.reload()}
getAllAquaRevertButtons().forEach(btn=>{btn.onclick=function(){document.querySelectorAll('.highlighted-aria-label').forEach(el=>el.classList.remove('highlighted-aria-label'));removeElements('.inline-aria-label');document.querySelectorAll('.inline-label-container').forEach(container=>{while(container.firstChild){container.parentNode.insertBefore(container.firstChild,container)}
container.remove()});removeElements('.inline-image-label');removeElements('.alt-text-label');document.querySelectorAll('.highlighted-media').forEach(el=>el.classList.remove('highlighted-media'));document.querySelectorAll('.form-check-highlight').forEach(el=>el.classList.remove('form-check-highlight'));document.querySelectorAll('.form-check-valid').forEach(el=>el.classList.remove('form-check-valid'));removeElements('.form-check-tooltip');['highlight-aria-label-style','inline-aria-label-style','inline-image-style','always-inline-label-style','form-checker-style','alt-text-style'].forEach(id=>{const style=document.getElementById(id);if(style)style.remove();});const argPopup=document.getElementById('arg-popup');if(argPopup)argPopup.remove();document.querySelectorAll('[id^="axeLoader"]').forEach(el=>el.remove());enableAllButtonsExceptRemove();console.log('AQUA changes reverted.')}});const highlightAndInlineLabelsBtn=shadow.querySelector('#highlight-and-inline-labels');if(highlightAndInlineLabelsBtn){highlightAndInlineLabelsBtn.onclick=function(){disableAllButtonsExceptRemove();(function(){const highlighted=document.querySelectorAll('.highlighted-aria-label');if(highlighted.length){highlighted.forEach(el=>el.remove());console.log('Removed existing highlights.');return}
injectStyle('highlight-aria-label-style',`
                .highlighted-aria-label {
                  position: relative !important;
                  outline: 2px solid #ff8800 !important;
                  background-color: rgba(255,200,0,0.2) !important;
                  cursor: pointer !important;
                }
              `);document.querySelectorAll('[aria-label]').forEach(el=>{if(!el.classList.contains('highlighted-aria-label'))el.classList.add('highlighted-aria-label');});console.log(`${document.querySelectorAll('[aria-label]').length} elements with aria-label were highlighted.`)})();(function(){const inlineLabels=document.querySelectorAll('.inline-aria-label');if(inlineLabels.length){inlineLabels.forEach(label=>label.remove());console.log('Removed inline labels.');return}
injectStyle('inline-aria-label-style',`
                .inline-aria-label { display: none !important; position: relative !important; background: #333 !important; color: #fff !important; padding: 4px 8px !important; border-radius: 4px !important; font-size: 12px !important; white-space: nowrap !important; z-index: 10000 !important; }
                .inline-label-container:hover .inline-aria-label { display: block !important; }
                .inline-label-container { position: relative !important; }
              `);document.querySelectorAll('[aria-label]').forEach(el=>{if(el.querySelector('.inline-aria-label'))return;const container=document.createElement('div');container.className='inline-label-container';el.parentNode.insertBefore(container,el);container.appendChild(el);const label=document.createElement('div');label.className='inline-aria-label';label.textContent=el.getAttribute('aria-label');container.appendChild(label)});console.log(`${document.querySelectorAll('[aria-label]').length} elements with aria-label were labeled inline.`)})()}}
const alwaysShowInlineLabelsBtn=shadow.querySelector('#always-show-inline-labels');if(alwaysShowInlineLabelsBtn){alwaysShowInlineLabelsBtn.onclick=function(){disableAllButtonsExceptRemove();const highlighted=document.querySelectorAll('.highlighted-aria-label');if(highlighted.length){highlighted.forEach(el=>el.remove());console.log('Removed existing highlights.');return}
injectStyle('highlight-aria-label-style',`
              .highlighted-aria-label {
                position: relative !important;
                outline: 2px solid #ff8800 !important;
                background-color: rgba(255,200,0,0.2) !important;
                cursor: pointer !important;
              }
            `);const elements=document.querySelectorAll('[aria-label]');elements.forEach(el=>{if(!el.classList.contains('highlighted-aria-label'))el.classList.add('highlighted-aria-label');});console.log(`${elements.length} elements with aria-label were highlighted.`);const inlineLabels=document.querySelectorAll('.inline-aria-label');if(inlineLabels.length){inlineLabels.forEach(label=>label.remove());console.log('Removed inline labels.');return}
injectStyle('inline-aria-label-style',`
              .inline-aria-label { display: block !important; position: relative !important; background: #333 !important; color: #fff !important; padding: 4px 8px !important; border-radius: 4px !important; font-size: 12px !important; white-space: nowrap !important; z-index: 10000 !important; }
              .inline-label-container { position: relative !important; }
            `);elements.forEach(el=>{if(el.querySelector('.inline-aria-label'))return;const container=document.createElement('div');container.className='inline-label-container';el.parentNode.insertBefore(container,el);container.appendChild(el);const label=document.createElement('div');label.className='inline-aria-label';label.textContent=el.getAttribute('aria-label');container.appendChild(label)});console.log(`${elements.length} elements with aria-label were labeled inline.`)}}
const alwaysShowInlineLabels2Btn=shadow.querySelector('#always-show-inline-labels-2');if(alwaysShowInlineLabels2Btn){alwaysShowInlineLabels2Btn.onclick=function(){disableAllButtonsExceptRemove();(function(){const highlighted=document.querySelectorAll('.highlighted-aria-label');if(highlighted.length){highlighted.forEach(el=>el.remove());console.log('Removed existing highlights.');return}
injectStyle('highlight-aria-label-style',`
                .highlighted-aria-label {
                  position: relative !important;
                  outline: 2px solid #ff8800 !important;
                  background-color: rgba(255,200,0,0.2) !important;
                  cursor: pointer !important;
                }
              `);document.querySelectorAll('[aria-label]').forEach(el=>{if(!el.classList.contains('highlighted-aria-label'))el.classList.add('highlighted-aria-label');});console.log(`${document.querySelectorAll('[aria-label]').length} elements with aria-label were highlighted.`)})();const elements=document.querySelectorAll('[aria-label]');elements.forEach(el=>{if(!el.querySelector('.inline-aria-label')){const label=document.createElement('span');label.className='inline-aria-label';label.textContent=el.getAttribute('aria-label');el.appendChild(label)}});injectStyle('always-inline-label-style',`
              .inline-aria-label { display: inline-block !important; }
            `);console.log('Inline labels are now always visible.')}}
const buttonArgBtn=shadow.querySelector('#button-arg');if(buttonArgBtn){buttonArgBtn.onclick=function(){popupHost.remove();console.log('Popup closed.');const anyDisabled=getAllActionButtons().some(btn=>btn.disabled);saveButtonsDisabledState(anyDisabled)}}
const inlineImageLabelsBtn=shadow.querySelector('#inline-image-labels');if(inlineImageLabelsBtn){inlineImageLabelsBtn.onclick=function(){disableAllButtonsExceptRemove();(function(){const inlineLabels=document.querySelectorAll('.inline-image-label');if(inlineLabels.length){inlineLabels.forEach(label=>label.remove());console.log('Removed existing inline labels.');return}
injectStyle('inline-image-style',`
                .inline-image-label {
                  display: inline-block !important;
                  background: #ffc107 !important;
                  color: #fff !important;
                  padding: 4px 8px !important;
                  border-radius: 6px !important;
                  font-size: 12px !important;
                  margin-left: 6px !important;
                  white-space: nowrap !important;
                  z-index: 10000 !important;
                }
              `);const images=document.querySelectorAll('img, picture, svg');images.forEach(image=>{if(image.querySelector('.inline-image-label'))return;let labelContent='';if(image.tagName.toLowerCase()==='img'){const src=image.src||'unknown';const ext=src.split('.').pop().split('?')[0].toLowerCase();labelContent=`Image: ${ext || 'unknown'}`}else if(image.tagName.toLowerCase()==='picture'){const sources=Array.from(image.querySelectorAll('source'));const fallback=image.querySelector('img');const types=sources.map(src=>src.type||'unknown');const fallbackType=fallback?fallback.src.split('.').pop().split('?')[0].toLowerCase():'none';labelContent=`Picture with fallbacks: ${types.join(', ')}; Fallback: ${fallbackType}`}
const label=document.createElement('span');label.className='inline-image-label';label.textContent=labelContent;image.parentNode.insertBefore(label,image.nextSibling)});console.log(`${images.length} images and picture tags labeled inline.`)})()}}
const coHighlightAndInlineLabelsSkipBtn=shadow.querySelector('#co-highlight-and-inline-labels-skip');if(coHighlightAndInlineLabelsSkipBtn){coHighlightAndInlineLabelsSkipBtn.onclick=function(){disableAllButtonsExceptRemove();(function(){const highlighted=document.querySelectorAll('.highlighted-aria-label');if(highlighted.length){highlighted.forEach(el=>el.classList.remove('highlighted-aria-label'));console.log('Removed existing highlights.');return}
injectStyle('highlight-aria-label-style',`
                .highlighted-aria-label {
                  position: relative !important;
                  outline: 2px solid #ff8800 !important;
                  background-color: rgba(255,200,0,0.2) !important;
                  cursor: pointer !important;
                }
              `);const elements=getElementsWithAriaLabel(!0);elements.forEach(el=>{if(!el.classList.contains('highlighted-aria-label'))el.classList.add('highlighted-aria-label');});console.log(`${elements.length} elements with aria-label were highlighted, excluding header and footer.`)})();(function(){const inlineLabels=document.querySelectorAll('.inline-aria-label');if(inlineLabels.length){inlineLabels.forEach(label=>label.remove());console.log('Removed inline labels.');return}
injectStyle('inline-aria-label-style',`
                .inline-aria-label { display: none !important; position: relative !important; background: #333 !important; color: #fff !important; padding: 4px 8px !important; border-radius: 4px !important; font-size: 12px !important; white-space: nowrap !important; z-index: 10000 !important; }
                .inline-label-container:hover .inline-aria-label { display: block !important; }
                .inline-label-container { position: relative !important; }
              `);const elements=getElementsWithAriaLabel(!0);elements.forEach(el=>{if(el.querySelector('.inline-aria-label'))return;const container=document.createElement('div');container.className='inline-label-container';el.parentNode.insertBefore(container,el);container.appendChild(el);const label=document.createElement('div');label.className='inline-aria-label';label.textContent=el.getAttribute('aria-label');container.appendChild(label)});console.log(`${elements.length} elements with aria-label were labeled inline.`)})()}}
const highlightAndInlineLabelsSkipBtn=shadow.querySelector('#highlight-and-inline-labels-skip');if(highlightAndInlineLabelsSkipBtn){highlightAndInlineLabelsSkipBtn.onclick=function(){disableAllButtonsExceptRemove();(function(){const highlighted=document.querySelectorAll('.highlighted-aria-label');if(highlighted.length){highlighted.forEach(el=>el.classList.remove('highlighted-aria-label'));console.log('Removed existing highlights.');return}
injectStyle('highlight-aria-label-style',`
                .highlighted-aria-label {
                  position: relative !important;
                  outline: 2px solid #ff8800 !important;
                  background-color: rgba(255,200,0,0.2) !important;
                  cursor: pointer !important;
                }
              `);const elements=getElementsWithAriaLabel(!0);elements.forEach(el=>{if(!el.classList.contains('highlighted-aria-label'))el.classList.add('highlighted-aria-label');});console.log(`${elements.length} elements with aria-label were highlighted, excluding header and footer.`)})();(function(){const inlineLabels=document.querySelectorAll('.inline-aria-label');if(inlineLabels.length){inlineLabels.forEach(label=>label.remove());console.log('Removed inline labels.');return}
injectStyle('inline-aria-label-style',`
                .inline-aria-label { display: none !important; position: relative !important; background: #333 !important; color: #fff !important; padding: 4px 8px !important; border-radius: 4px !important; font-size: 12px !important; white-space: nowrap !important; z-index: 10000 !important; }
                .inline-label-container:hover .inline-aria-label { display: block !important; }
                .inline-label-container { position: relative !important; }
              `);const elements=getElementsWithAriaLabel(!0);elements.forEach(el=>{if(el.querySelector('.inline-aria-label'))return;const container=document.createElement('div');container.className='inline-label-container';el.parentNode.insertBefore(container,el);container.appendChild(el);const label=document.createElement('div');label.className='inline-aria-label';label.textContent=el.getAttribute('aria-label');container.appendChild(label)});console.log(`${elements.length} elements with aria-label were labeled inline.`)})()}}
const coAlwaysShowInlineLabelsSkipBtn=shadow.querySelector('#co-always-show-inline-labels-skip');if(coAlwaysShowInlineLabelsSkipBtn){coAlwaysShowInlineLabelsSkipBtn.onclick=function(){disableAllButtonsExceptRemove();(function(){const highlighted=document.querySelectorAll('.highlighted-aria-label');if(highlighted.length){highlighted.forEach(el=>el.classList.remove('highlighted-aria-label'));console.log('Removed existing highlights.');return}
injectStyle('highlight-aria-label-style',`
        .highlighted-aria-label {
          position: relative !important;
          outline: 2px solid #ff8800 !important;
          background-color: rgba(255,200,0,0.2) !important;
          cursor: pointer !important;
        }
      `);const elements=getElementsWithAriaLabel(!0);elements.forEach(el=>{if(!el.classList.contains('highlighted-aria-label'))el.classList.add('highlighted-aria-label');});console.log(`${elements.length} elements with aria-label were highlighted, excluding header and footer.`)})();const elements=getElementsWithAriaLabel(!0);removeElements('.inline-aria-label');elements.forEach(el=>{const tooltip=document.createElement('div');tooltip.className='inline-aria-label';tooltip.textContent=el.getAttribute('aria-label');el.appendChild(tooltip)});console.log(`${elements.length} tooltips added for aria-label elements, excluding header/footer.`)}}
const alwaysShowInlineLabelsSkipBtn=shadow.querySelector('#always-show-inline-labels-skip');if(alwaysShowInlineLabelsSkipBtn){alwaysShowInlineLabelsSkipBtn.onclick=function(){disableAllButtonsExceptRemove();(function(){const highlighted=document.querySelectorAll('.highlighted-aria-label');if(highlighted.length){highlighted.forEach(el=>el.classList.remove('highlighted-aria-label'));console.log('Removed existing highlights.');return}
injectStyle('highlight-aria-label-style',`
                .highlighted-aria-label {
                  position: relative !important;
                  outline: 2px solid #ff8800 !important;
                  background-color: rgba(255,200,0,0.2) !important;
                  cursor: pointer !important;
                }
              `);const elements=getElementsWithAriaLabel(!0);elements.forEach(el=>{if(!el.classList.contains('highlighted-aria-label'))el.classList.add('highlighted-aria-label');});console.log(`${elements.length} elements with aria-label were highlighted, excluding header and footer.`)})();const elements=getElementsWithAriaLabel(!0);removeElements('.inline-aria-label');elements.forEach(el=>{const tooltip=document.createElement('div');tooltip.className='inline-aria-label';tooltip.textContent=el.getAttribute('aria-label');el.appendChild(tooltip)});console.log(`${elements.length} tooltips added for aria-label elements, excluding header/footer.`)}}
const inlineImageLabelsSkipBtn=shadow.querySelector('#inline-image-labels-skip');if(inlineImageLabelsSkipBtn){inlineImageLabelsSkipBtn.onclick=function(){disableAllButtonsExceptRemove();(function(){const inlineLabels=document.querySelectorAll('.inline-image-label');if(inlineLabels.length){inlineLabels.forEach(label=>label.remove());console.log('Removed existing inline labels.');return}
injectStyle('inline-image-style',`
                .inline-image-label {
                  display: inline-block !important;
                  background: #ffc107 !important;
                  color: #fff !important;
                  padding: 4px 8px !important;
                  border-radius: 6px !important;
                  font-size: 12px !important;
                  margin-left: 6px !important;
                  white-space: nowrap !important;
                  z-index: 10000 !important;
                }
              `);const images=Array.from(document.querySelectorAll('img, picture')).filter(el=>!el.closest('header, footer'));images.forEach(image=>{if(image.querySelector('.inline-image-label'))return;let labelContent='';if(image.tagName.toLowerCase()==='img'){const src=image.src||'unknown';const ext=src.split('.').pop().split('?')[0].toLowerCase();labelContent=`Image: ${ext || 'unknown'}`}else if(image.tagName.toLowerCase()==='picture'){const sources=Array.from(image.querySelectorAll('source'));const fallback=image.querySelector('img');const types=sources.map(src=>src.type||'unknown');const fallbackType=fallback?fallback.src.split('.').pop().split('?')[0].toLowerCase():'none';labelContent=`Picture with fallbacks: ${types.join(', ')}; Fallback: ${fallbackType}`}
const label=document.createElement('span');label.className='inline-image-label';label.textContent=labelContent;image.parentNode.insertBefore(label,image.nextSibling)});console.log(`${images.length} images and picture tags labeled inline.`)})()}}
const formAriaCheckerBtn=shadow.querySelector('#form-aria-checker');if(formAriaCheckerBtn){formAriaCheckerBtn.onclick=function(){injectStyle('form-checker-style',`
                  .form-check-highlight { position: relative; outline: 2px solid red; background-color: rgba(255,0,0,0.1);}
                  .form-check-valid { position: relative; outline: 2px solid green; background-color: rgba(0,255,0,0.1);}
                  .form-check-tooltip {
                    position: absolute; top: -30px; left: 50%; transform: translateX(-50%);
                    background: #333; color: #fff; padding: 6px 12px; border-radius: 4px;
                    font-size: 12px; z-index: 1000; white-space: nowrap;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1); opacity: 1; transition: opacity 0.2s, visibility 0.2s;
                  }
                `);document.querySelectorAll('form input, form textarea, form select, form fieldset').forEach(element=>{element.classList.remove('form-check-highlight','form-check-valid');const existingTooltip=element.parentNode.querySelector('.form-check-tooltip');if(existingTooltip)existingTooltip.remove();if(element.getAttribute('aria-hidden')==='true')return;let tooltipMessage='';let isValid=!0;const labelledBy=element.getAttribute('aria-labelledby');if(labelledBy){const ids=labelledBy.trim().split(/\s+/);let hasValidId=!1;ids.forEach(id=>{const labelElement=document.getElementById(id);if(labelElement){hasValidId=!0;tooltipMessage+=`aria-labelledby "${id}": "${labelElement.textContent.trim() || 'No visible text'}". `}else{tooltipMessage+=`Invalid aria-labelledby ID: "${id}". `}});if(!hasValidId)isValid=!1}
const ariaLabel=element.getAttribute('aria-label');if(ariaLabel!==null){if(!ariaLabel.trim()||ariaLabel.trim().length<3){tooltipMessage+='aria-label is empty or not meaningful. ';isValid=!1}else{tooltipMessage+=`aria-label: "${ariaLabel.trim()}". `}}
const tooltip=document.createElement('div');tooltip.className='form-check-tooltip';if(!isValid){element.classList.add('form-check-highlight');tooltip.textContent=tooltipMessage.trim()}else{element.classList.add('form-check-valid');tooltip.textContent=`Accessible element: ${tooltipMessage.trim()}`}
element.parentNode.style.position='relative';element.parentNode.appendChild(tooltip)});console.log('Form accessibility issues have been checked.')}}
const coFormAriaCheckerBtn=shadow.querySelector('#co-form-aria-checker');if(coFormAriaCheckerBtn){coFormAriaCheckerBtn.onclick=function(){injectStyle('form-checker-style',`
                  .form-check-highlight { position: relative; outline: 2px solid red; background-color: rgba(255,0,0,0.1);}
                  .form-check-valid { position: relative; outline: 2px solid green; background-color: rgba(0,255,0,0.1);}
                  .form-check-tooltip {
                    position: absolute; top: -30px; left: 50%; transform: translateX(-50%);
                    background: #333; color: #fff; padding: 6px 12px; border-radius: 4px;
                    font-size: 12px; z-index: 1000; white-space: nowrap;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1); opacity: 1; transition: opacity 0.2s, visibility 0.2s;
                  }
                `);document.querySelectorAll('form input, form textarea, form select, form fieldset').forEach(element=>{element.classList.remove('form-check-highlight','form-check-valid');const existingTooltip=element.parentNode.querySelector('.form-check-tooltip');if(existingTooltip)existingTooltip.remove();if(element.getAttribute('aria-hidden')==='true')return;let tooltipMessage='';let isValid=!0;const labelledBy=element.getAttribute('aria-labelledby');if(labelledBy){const ids=labelledBy.trim().split(/\s+/);let hasValidId=!1;ids.forEach(id=>{const labelElement=document.getElementById(id);if(labelElement){hasValidId=!0;tooltipMessage+=`aria-labelledby "${id}": "${labelElement.textContent.trim() || 'No visible text'}". `}else{tooltipMessage+=`Invalid aria-labelledby ID: "${id}". `}});if(!hasValidId)isValid=!1}
const ariaLabel=element.getAttribute('aria-label');if(ariaLabel!==null){if(!ariaLabel.trim()||ariaLabel.trim().length<3){tooltipMessage+='aria-label is empty or not meaningful. ';isValid=!1}else{tooltipMessage+=`aria-label: "${ariaLabel.trim()}". `}}
const tooltip=document.createElement('div');tooltip.className='form-check-tooltip';if(!isValid){element.classList.add('form-check-highlight');tooltip.textContent=tooltipMessage.trim()}else{element.classList.add('form-check-valid');tooltip.textContent=`Accessible element: ${tooltipMessage.trim()}`}
element.parentNode.style.position='relative';element.parentNode.appendChild(tooltip)});console.log('Form accessibility issues have been checked.')}}
function injectAltTextStyle(){injectStyle('alt-text-style',`
              .alt-text-label {
                display: inline-block !important;
                background: #ff8800 !important;
                color: #fff !important;
                padding: 6px 10px !important;
                border-radius: 12px !important;
                font-size: 12px !important;
                font-weight: 600 !important;
                margin-left: 6px !important;
                z-index: 10000 !important;
                transition: background 0.3s ease-in-out !important;
                position: relative !important;
              }
              .highlighted-media {
                outline: 3px solid #007bff !important;
                background-color: rgba(0,123,255,0.1) !important;
              }
            `)}
function findAccessibleText(element){const alt=element.getAttribute('alt');const ariaLabel=element.getAttribute('aria-label');const labelledById=element.getAttribute('aria-labelledby');const labelledByElement=labelledById?document.getElementById(labelledById):null;if(alt)return `Alt: "${alt}"`;if(ariaLabel)return `Aria-label: "${ariaLabel}"`;if(labelledByElement)return `Aria-labelledby: "${labelledByElement.textContent.trim()}"`;return null}
function findParentAccessibleText(element){let parent=element.parentElement;while(parent){const accessibleText=findAccessibleText(parent);if(accessibleText)return accessibleText;parent=parent.parentElement}
return'No accessible text found.'}
const showAltTextBtn=shadow.querySelector('#show-alt-text');if(showAltTextBtn){showAltTextBtn.onclick=function(){injectAltTextStyle();const elements=document.querySelectorAll('img, picture, svg');elements.forEach(element=>{element.classList.add('highlighted-media');const existingLabel=element.querySelector('.alt-text-label');if(existingLabel)existingLabel.remove();let accessibleText=findAccessibleText(element)||findParentAccessibleText(element);const label=document.createElement('span');label.className='alt-text-label';label.textContent=accessibleText;element.style.position='relative';element.parentNode.insertBefore(label,element.nextSibling)});console.log(`${elements.length} media elements labeled with accessible text.`)}}
const showAltTextSkipBtn=shadow.querySelector('#show-alt-text-skip');const coShowAltTextSkipBtn=shadow.querySelector('#co-show-alt-text-skip');if(showAltTextSkipBtn||coShowAltTextSkipBtn){if(showAltTextSkipBtn)showAltTextSkipBtn.onclick=function(){injectAltTextStyle();const elements=Array.from(document.querySelectorAll('img, picture, svg')).filter(el=>!el.closest('header, footer'));elements.forEach(element=>{element.classList.add('highlighted-media');const existingLabel=element.querySelector('.alt-text-label');if(existingLabel)existingLabel.remove();let accessibleText=findAccessibleText(element)||findParentAccessibleText(element);const label=document.createElement('span');label.className='alt-text-label';label.textContent=accessibleText;element.style.position='relative';element.parentNode.insertBefore(label,element.nextSibling)});console.log(`${elements.length} media elements labeled with accessible text.`)};if(coShowAltTextSkipBtn)coShowAltTextSkipBtn.onclick=function(){injectAltTextStyle();const elements=Array.from(document.querySelectorAll('img, picture, svg')).filter(el=>!el.closest('header, footer'));elements.forEach(element=>{element.classList.add('highlighted-media');const existingLabel=element.querySelector('.alt-text-label');if(existingLabel)existingLabel.remove();let accessibleText=findAccessibleText(element)||findParentAccessibleText(element);const label=document.createElement('span');label.className='alt-text-label';label.textContent=accessibleText;element.style.position='relative';element.parentNode.insertBefore(label,element.nextSibling)});console.log(`${elements.length} media elements labeled with accessible text.`)}}}
registerAquaButtonHandlers();shadow.querySelector('#aqua-tool-dropdown').addEventListener('change',function(e){showAquaToolSection(e.target.value);registerAquaButtonHandlers()});document.body.appendChild(popupHost)})()

javascript:(function(){function injectStyle(id,css){if(!document.getElementById(id)){const style=document.createElement('style');style.id=id;style.textContent=css;document.head.appendChild(style)}}
function removeElements(selector){document.querySelectorAll(selector).forEach(el=>el.remove())}
function forEachNode(nodes,fn){Array.prototype.forEach.call(nodes,fn)}
function getAriaLabelText(element){return element.getAttribute('aria-label')}
function getElementsWithAriaLabel(skipHeaderFooter=!1){let elements=Array.from(document.querySelectorAll('[aria-label]'));if(skipHeaderFooter){elements=elements.filter(el=>!el.closest('header, footer'))}
return elements}
const AQUA_DISABLED_KEY='__AQUA_BUTTONS_DISABLED__';function saveButtonsDisabledState(isDisabled){try{localStorage.setItem(AQUA_DISABLED_KEY,isDisabled?'1':'0')}catch(e){}}
function getButtonsDisabledState(){try{return localStorage.getItem(AQUA_DISABLED_KEY)==='1'}catch(e){return!1}}
injectStyle('aqua-popup-style',`
    #aqua-popup {
      position: fixed !important;
      top: 50% !important;
      left: 50% !important;
      transform: translate(-50%, -50%) !important;
      background: linear-gradient(135deg, #1d1d1d, #333) !important;
      color: #fff !important;
      padding: 20px !important;
      border: 1px solid #444 !important;
      border-radius: 12px !important;
      box-shadow: 0 8px 16px rgba(0,0,0,0.6) !important;
      z-index: 10000 !important;
      font-family: 'Roboto', Arial, sans-serif !important;
      width: 360px !important;
      max-height: 75vh !important;
      overflow-y: auto !important;
      text-align: center !important;
      animation: slideIn 0.3s ease-out !important;
    }
    @keyframes slideIn {
      from { opacity: 0; transform: translate(-50%, -55%);}
      to { opacity: 1; transform: translate(-50%, -50%);}
    }
    #aqua-popup h3 {
      font-size: 20px !important;
      margin: 2px !important;
      color: #00c2ff !important;
      font-weight: 700 !important;
      text-transform: uppercase !important;
    }
    #aqua-popup p {
      font-size: 14px !important;
      margin: 0 !important;
      color: #bbb !important;
      line-height: 1.5 !important;
    }
    #aqua-popup ul {
      margin: 12px 0 !important;
      padding: 0 !important;
      list-style: none !important;
      text-align: left !important;
    }
    #aqua-popup ul li {
      font-size: 13px !important;
      color: #ddd !important;
      margin-bottom: 6px !important;
      display: flex !important;
      align-items: center !important;
    }
    #aqua-popup ul li::before {
      content: '•';
      color: #00c2ff !important;
      margin-right: 8px !important;
    }
    #aqua-popup button {
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
    #aqua-popup button:hover {
      background: linear-gradient(135deg, #007bff, #0056b3) !important;
    }
    #aqua-popup button:disabled {
      background: #555 !important;
      cursor: not-allowed !important;
    }
    #aqua-popup .close-button {
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
    #aqua-popup .close-button:hover { background: #cc0000 !important; }
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
  `);const existingPopup=document.getElementById('aqua-popup');if(existingPopup){existingPopup.remove();console.log('Removed existing popup.');return}
const popupElement=document.createElement('div');popupElement.id='aqua-popup';popupElement.innerHTML=`
    <button class="close-button" id="close-popup">&times;</button>
    <h3>AQUA</h3>
    <p>
    <sub>Version 2</sub></p>
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
    `;function showAquaToolSection(selected){popupElement.querySelectorAll('.aqua-tool-section').forEach(sec=>sec.style.display='none');const section=popupElement.querySelector(`#section-${selected}`);if(section)section.style.display=''}
showAquaToolSection('COAQUA');function registerAquaButtonHandlers(){function getAllAquaRevertButtons(){return Array.from(popupElement.querySelectorAll('#aqua-revert'))}
function getAllActionButtons(){return Array.from(popupElement.querySelectorAll('button')).filter(btn=>btn.id&&btn.id!=='remove-actions'&&btn.id!=='close-popup'&&btn.id!=='aqua-revert')}
const closeBtn=popupElement.querySelector('#close-popup');if(closeBtn){closeBtn.onclick=()=>{popupElement.remove();console.log('Popup closed.');const anyDisabled=getAllActionButtons().some(btn=>btn.disabled);saveButtonsDisabledState(anyDisabled)}}
function disableAllButtonsExceptRemove(){getAllActionButtons().forEach(btn=>btn.disabled=!0);saveButtonsDisabledState(!0)}
function enableAllButtonsExceptRemove(){getAllActionButtons().forEach(btn=>btn.disabled=!1);saveButtonsDisabledState(!1)}
if(getButtonsDisabledState()){setTimeout(()=>{disableAllButtonsExceptRemove()},0)}
const removeActionsBtn=popupElement.querySelector('#remove-actions');if(removeActionsBtn){removeActionsBtn.onclick=()=>location.reload()}
getAllAquaRevertButtons().forEach(btn=>{btn.onclick=function(){document.querySelectorAll('.highlighted-aria-label').forEach(el=>el.classList.remove('highlighted-aria-label'));removeElements('.inline-aria-label');document.querySelectorAll('.inline-label-container').forEach(container=>{while(container.firstChild){container.parentNode.insertBefore(container.firstChild,container)}
container.remove()});removeElements('.inline-image-label');removeElements('.alt-text-label');document.querySelectorAll('.highlighted-media').forEach(el=>el.classList.remove('highlighted-media'));document.querySelectorAll('.form-check-highlight').forEach(el=>el.classList.remove('form-check-highlight'));document.querySelectorAll('.form-check-valid').forEach(el=>el.classList.remove('form-check-valid'));removeElements('.form-check-tooltip');['highlight-aria-label-style','inline-aria-label-style','inline-image-style','always-inline-label-style','form-checker-style','alt-text-style'].forEach(id=>{const style=document.getElementById(id);if(style)style.remove();});const argPopup=document.getElementById('arg-popup');if(argPopup)argPopup.remove();document.querySelectorAll('[id^="axeLoader"]').forEach(el=>el.remove());enableAllButtonsExceptRemove();console.log('AQUA changes reverted.')}});const highlightAndInlineLabelsBtn=popupElement.querySelector('#highlight-and-inline-labels');if(highlightAndInlineLabelsBtn){highlightAndInlineLabelsBtn.onclick=function(){disableAllButtonsExceptRemove();(function(){const highlighted=document.querySelectorAll('.highlighted-aria-label');if(highlighted.length){highlighted.forEach(el=>el.remove());console.log('Removed existing highlights.');return}
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
const alwaysShowInlineLabelsBtn=popupElement.querySelector('#always-show-inline-labels');if(alwaysShowInlineLabelsBtn){alwaysShowInlineLabelsBtn.onclick=function(){disableAllButtonsExceptRemove();const highlighted=document.querySelectorAll('.highlighted-aria-label');if(highlighted.length){highlighted.forEach(el=>el.remove());console.log('Removed existing highlights.');return}
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
const alwaysShowInlineLabels2Btn=popupElement.querySelector('#always-show-inline-labels-2');if(alwaysShowInlineLabels2Btn){alwaysShowInlineLabels2Btn.onclick=function(){disableAllButtonsExceptRemove();(function(){const highlighted=document.querySelectorAll('.highlighted-aria-label');if(highlighted.length){highlighted.forEach(el=>el.remove());console.log('Removed existing highlights.');return}
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
const buttonArgBtn=popupElement.querySelector('#button-arg');if(buttonArgBtn){buttonArgBtn.onclick=function(){popupElement.remove();console.log('Popup closed.');const anyDisabled=getAllActionButtons().some(btn=>btn.disabled);saveButtonsDisabledState(anyDisabled);function showLoader(){const loader=document.createElement('div');loader.id=`axeLoader-${Math.random().toString(36).substr(2, 9)}`;loader.setAttribute('aria-hidden','true');loader.setAttribute('style',`
                position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
                font-size: 20px; color: #fff; background-color: rgba(0,0,0,0.7);
                padding: 20px; border-radius: 5px; z-index: 9999;
              `);loader.textContent='Running accessibility checks...';document.body.appendChild(loader)}
function hideLoader(){const loader=document.querySelector('[id^="axeLoader"]');if(loader)loader.remove();}
function injectAxeAndRun(){if(typeof axe==='undefined'){const script=document.createElement('script');script.src='https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.10.0/axe.min.js';script.onload=runAxe;document.head.appendChild(script)}else{runAxe()}}
function runAxe(){showLoader();axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa','best-practice']},resultTypes:['violations','incomplete'],iframes:!0,shadowDom:!0,exclude:[['[id^="axeLoader"]','[id^="aqua-popup"]']],},function(error,results){hideLoader();if(error){console.error(error);return}
displayResults(results)})}
function displayResults(results){const container=document.createElement('div');container.id='arg-popup';container.setAttribute('style',`
                position: fixed; top: 10%; left: 25%; width: 50%; height: 80%;
                background-color: #fff; color: #000; overflow: auto; z-index: 9999;
                padding: 60px 20px 20px 20px; box-shadow: 0 0 10px rgba(0,0,0,0.5);
                font-family: Arial, sans-serif; border-radius: 8px;
              `);const highlightedElements=[];function highlightElement(targetSelector){const el=document.querySelector(targetSelector);if(!el)return;let originalBorder=el.getAttribute('data-original-border');if(!originalBorder){originalBorder=el.style.border;el.setAttribute('data-original-border',originalBorder)}
el.style.border='5px solid red';if(!highlightedElements.includes(el))highlightedElements.push(el);}
const closeBtn=document.createElement('button');closeBtn.textContent='X';closeBtn.setAttribute('style',`
                position: fixed; top: calc(10% + 10px); right: calc(25% + 10px);
                padding: 5px 10px; background-color: #f44336; color: #fff;
                border: none; border-radius: 3px; cursor: pointer; z-index: 10000;
              `);closeBtn.onclick=()=>{document.body.removeChild(container);document.body.removeChild(closeBtn);document.body.removeChild(highlightAllBtn)};document.body.appendChild(closeBtn);const highlightAllBtn=document.createElement('button');highlightAllBtn.textContent='Highlight All Issues';highlightAllBtn.setAttribute('style',`
                position: fixed; top: calc(10% + 50px); right: calc(25% + 10px);
                padding: 5px 10px; background-color: #2196F3; color: #fff;
                border: none; border-radius: 3px; cursor: pointer; z-index: 10000;
              `);highlightAllBtn.onclick=()=>highlightAllViolations(results.violations);document.body.appendChild(highlightAllBtn);function highlightAllViolations(violations){violations.forEach(violation=>{violation.nodes.forEach(node=>{if(node.target&&node.target.length){node.target.forEach(targetSelector=>highlightElement(targetSelector))}})})}
function createSection(title,items,type){const card=document.createElement('details');card.setAttribute('style','margin-bottom: 15px; border: 1px solid #ddd; border-radius: 5px; padding: 10px; background-color: #f9f9f9;');const summary=document.createElement('summary');summary.textContent=title;summary.setAttribute('style','font-weight: bold; cursor: pointer;');card.appendChild(summary);const section=document.createElement('div');if(items.length){items.forEach((item,idx)=>{const details=document.createElement('details');details.setAttribute('style','margin-bottom: 10px;');const itemSummary=document.createElement('summary');itemSummary.setAttribute('style','cursor: pointer; font-weight: bold;');itemSummary.textContent=`${idx + 1}. ${item.description}`;details.appendChild(itemSummary);const contentDiv=document.createElement('div');contentDiv.setAttribute('style','margin-left: 20px; margin-top: 5px;');const explanation=document.createElement('p');explanation.textContent=getFriendlyExplanation(item,type);contentDiv.appendChild(explanation);const learnMoreLink=document.createElement('a');learnMoreLink.href=item.helpUrl;learnMoreLink.textContent='Learn more about this issue';learnMoreLink.target='_blank';learnMoreLink.setAttribute('style','display: block; margin-bottom: 10px; color: #2196F3; text-decoration: none;');contentDiv.appendChild(learnMoreLink);if(item.nodes&&item.nodes.length){const nodesList=document.createElement('ul');item.nodes.forEach(node=>{const nodeItem=document.createElement('li');const codeBlock=document.createElement('code');codeBlock.textContent=node.html.trim();codeBlock.setAttribute('style','display: block; background-color: #f5f5f5; padding: 5px; border-radius: 3px; margin-bottom: 5px; white-space: pre-wrap;');const highlightLink=document.createElement('a');highlightLink.href='#';highlightLink.textContent='Highlight Element on Page';highlightLink.style.color='#2196F3';highlightLink.style.textDecoration='none';if(node.target&&node.target.length){const targetSelector=node.target[0];highlightLink.onclick=function(e){e.preventDefault();const el=document.querySelector(targetSelector);if(el){el.scrollIntoView({behavior:'smooth',block:'center'});highlightElement(targetSelector)}}}else{highlightLink.style.color='gray';highlightLink.onclick=e=>e.preventDefault()}
nodeItem.appendChild(codeBlock);nodeItem.appendChild(highlightLink);nodesList.appendChild(nodeItem)});contentDiv.appendChild(nodesList)}
details.appendChild(contentDiv);section.appendChild(details)})}else{const noItems=document.createElement('p');noItems.textContent='No issues found in this category.';section.appendChild(noItems)}
card.appendChild(section);container.appendChild(card)}
function getFriendlyExplanation(item,type){if(type==='violations')return `Issue: ${item.description} This needs to be fixed to improve accessibility.`;if(type==='incomplete')return'This item requires manual review to determine if there is an accessibility issue.';return''}
createSection('Accessibility Issues to Fix:',results.violations,'violations');createSection('Accessibility Issues Needing Manual Review:',results.incomplete,'incomplete');document.body.appendChild(container)}
if(document.readyState==='complete')injectAxeAndRun();else window.addEventListener('load',injectAxeAndRun)}}
const inlineImageLabelsBtn=popupElement.querySelector('#inline-image-labels');if(inlineImageLabelsBtn){inlineImageLabelsBtn.onclick=function(){disableAllButtonsExceptRemove();(function(){const inlineLabels=document.querySelectorAll('.inline-image-label');if(inlineLabels.length){inlineLabels.forEach(label=>label.remove());console.log('Removed existing inline labels.');return}
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
const coHighlightAndInlineLabelsSkipBtn=popupElement.querySelector('#co-highlight-and-inline-labels-skip');if(coHighlightAndInlineLabelsSkipBtn){coHighlightAndInlineLabelsSkipBtn.onclick=function(){disableAllButtonsExceptRemove();(function(){const highlighted=document.querySelectorAll('.highlighted-aria-label');if(highlighted.length){highlighted.forEach(el=>el.classList.remove('highlighted-aria-label'));console.log('Removed existing highlights.');return}
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
const highlightAndInlineLabelsSkipBtn=popupElement.querySelector('#highlight-and-inline-labels-skip');if(highlightAndInlineLabelsSkipBtn){highlightAndInlineLabelsSkipBtn.onclick=function(){disableAllButtonsExceptRemove();(function(){const highlighted=document.querySelectorAll('.highlighted-aria-label');if(highlighted.length){highlighted.forEach(el=>el.classList.remove('highlighted-aria-label'));console.log('Removed existing highlights.');return}
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
const coAlwaysShowInlineLabelsSkipBtn=popupElement.querySelector('#co-always-show-inline-labels-skip');if(coAlwaysShowInlineLabelsSkipBtn){coAlwaysShowInlineLabelsSkipBtn.onclick=function(){disableAllButtonsExceptRemove();(function(){const highlighted=document.querySelectorAll('.highlighted-aria-label');if(highlighted.length){highlighted.forEach(el=>el.classList.remove('highlighted-aria-label'));console.log('Removed existing highlights.');return}
injectStyle('highlight-aria-label-style',`
        .highlighted-aria-label {
          position: relative !important;
          outline: 2px solid #ff8800 !important;
          background-color: rgba(255,200,0,0.2) !important;
          cursor: pointer !important;
        }
      `);const elements=getElementsWithAriaLabel(!0);elements.forEach(el=>{if(!el.classList.contains('highlighted-aria-label'))el.classList.add('highlighted-aria-label');});console.log(`${elements.length} elements with aria-label were highlighted, excluding header and footer.`)})();const elements=getElementsWithAriaLabel(!0);removeElements('.inline-aria-label');elements.forEach(el=>{const tooltip=document.createElement('div');tooltip.className='inline-aria-label';tooltip.textContent=el.getAttribute('aria-label');el.appendChild(tooltip)});console.log(`${elements.length} tooltips added for aria-label elements, excluding header/footer.`)}}
const alwaysShowInlineLabelsSkipBtn=popupElement.querySelector('#always-show-inline-labels-skip');if(alwaysShowInlineLabelsSkipBtn){alwaysShowInlineLabelsSkipBtn.onclick=function(){disableAllButtonsExceptRemove();(function(){const highlighted=document.querySelectorAll('.highlighted-aria-label');if(highlighted.length){highlighted.forEach(el=>el.classList.remove('highlighted-aria-label'));console.log('Removed existing highlights.');return}
injectStyle('highlight-aria-label-style',`
                .highlighted-aria-label {
                  position: relative !important;
                  outline: 2px solid #ff8800 !important;
                  background-color: rgba(255,200,0,0.2) !important;
                  cursor: pointer !important;
                }
              `);const elements=getElementsWithAriaLabel(!0);elements.forEach(el=>{if(!el.classList.contains('highlighted-aria-label'))el.classList.add('highlighted-aria-label');});console.log(`${elements.length} elements with aria-label were highlighted, excluding header and footer.`)})();const elements=getElementsWithAriaLabel(!0);removeElements('.inline-aria-label');elements.forEach(el=>{const tooltip=document.createElement('div');tooltip.className='inline-aria-label';tooltip.textContent=el.getAttribute('aria-label');el.appendChild(tooltip)});console.log(`${elements.length} tooltips added for aria-label elements, excluding header/footer.`)}}
const inlineImageLabelsSkipBtn=popupElement.querySelector('#inline-image-labels-skip');if(inlineImageLabelsSkipBtn){inlineImageLabelsSkipBtn.onclick=function(){disableAllButtonsExceptRemove();(function(){const inlineLabels=document.querySelectorAll('.inline-image-label');if(inlineLabels.length){inlineLabels.forEach(label=>label.remove());console.log('Removed existing inline labels.');return}
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
const formAriaCheckerBtn=popupElement.querySelector('#form-aria-checker');if(formAriaCheckerBtn){formAriaCheckerBtn.onclick=function(){injectStyle('form-checker-style',`
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
const coFormAriaCheckerBtn=popupElement.querySelector('#co-form-aria-checker');if(coFormAriaCheckerBtn){coFormAriaCheckerBtn.onclick=function(){injectStyle('form-checker-style',`
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
const showAltTextBtn=popupElement.querySelector('#show-alt-text');if(showAltTextBtn){showAltTextBtn.onclick=function(){injectAltTextStyle();const elements=document.querySelectorAll('img, picture, svg');elements.forEach(element=>{element.classList.add('highlighted-media');const existingLabel=element.querySelector('.alt-text-label');if(existingLabel)existingLabel.remove();let accessibleText=findAccessibleText(element)||findParentAccessibleText(element);const label=document.createElement('span');label.className='alt-text-label';label.textContent=accessibleText;element.style.position='relative';element.parentNode.insertBefore(label,element.nextSibling)});console.log(`${elements.length} media elements labeled with accessible text.`)}}
const showAltTextSkipBtn=popupElement.querySelector('#show-alt-text-skip');const coShowAltTextSkipBtn=popupElement.querySelector('#co-show-alt-text-skip');if(showAltTextSkipBtn||coShowAltTextSkipBtn){showAltTextSkipBtn.onclick=function(){injectAltTextStyle();const elements=Array.from(document.querySelectorAll('img, picture, svg')).filter(el=>!el.closest('header, footer'));elements.forEach(element=>{element.classList.add('highlighted-media');const existingLabel=element.querySelector('.alt-text-label');if(existingLabel)existingLabel.remove();let accessibleText=findAccessibleText(element)||findParentAccessibleText(element);const label=document.createElement('span');label.className='alt-text-label';label.textContent=accessibleText;element.style.position='relative';element.parentNode.insertBefore(label,element.nextSibling)});console.log(`${elements.length} media elements labeled with accessible text.`)};coShowAltTextSkipBtn.onclick=function(){injectAltTextStyle();const elements=Array.from(document.querySelectorAll('img, picture, svg')).filter(el=>!el.closest('header, footer'));elements.forEach(element=>{element.classList.add('highlighted-media');const existingLabel=element.querySelector('.alt-text-label');if(existingLabel)existingLabel.remove();let accessibleText=findAccessibleText(element)||findParentAccessibleText(element);const label=document.createElement('span');label.className='alt-text-label';label.textContent=accessibleText;element.style.position='relative';element.parentNode.insertBefore(label,element.nextSibling)});console.log(`${elements.length} media elements labeled with accessible text.`)}}}
registerAquaButtonHandlers();popupElement.querySelector('#aqua-tool-dropdown').addEventListener('change',function(e){showAquaToolSection(e.target.value);registerAquaButtonHandlers()});document.body.appendChild(popupElement)})()

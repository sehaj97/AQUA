javascript: (function () {
    // --- Utility Functions ---

    function injectStyle(id, css) {
        if (!document.getElementById(id)) {
            const style = document.createElement('style');
            style.id = id;
            style.textContent = css;
            document.head.appendChild(style);
        }
    }

    function removeElements(selector) {
        document.querySelectorAll(selector).forEach(el => el.remove());
    }

    function forEachNode(nodes, fn) {
        Array.prototype.forEach.call(nodes, fn);
    }

    function getAriaLabelText(element) {
        return element.getAttribute('aria-label');
    }

    function getElementsWithAriaLabel(skipHeaderFooter = false) {
        let elements = Array.from(document.querySelectorAll('[aria-label]'));
        if (skipHeaderFooter) {
            elements = elements.filter(el => !el.closest('header, footer'));
        }
        return elements;
    }

    // --- State Management for Button Disabled State ---
    const AQUA_DISABLED_KEY = '__AQUA_BUTTONS_DISABLED__';
    function saveButtonsDisabledState(isDisabled) {
        try {
            localStorage.setItem(AQUA_DISABLED_KEY, isDisabled ? '1' : '0');
        } catch (e) { }
    }
    function getButtonsDisabledState() {
        try {
            return localStorage.getItem(AQUA_DISABLED_KEY) === '1';
        } catch (e) { return false; }
    }

    // --- Remove Existing Popup ---
    const existingPopup = document.getElementById('aqua-popup-two');
    if (existingPopup) {
        existingPopup.remove();
        console.log('Removed existing popup.');
        return;
    }

    // --- Popup HTML (Shadow DOM) ---
    const popupHost = document.createElement('div');
    popupHost.id = 'aqua-popup-two';
    popupHost.style.position = 'fixed';
    popupHost.style.top = '20px';
    popupHost.style.left = '20px';
    popupHost.style.transform = 'translateX(-50%)';
    popupHost.style.zIndex = '100001';
    popupHost.style.cursor = ''; // Remove move cursor from whole popup

    // Attach shadow root to isolate popup from page CSS
    const shadow = popupHost.attachShadow({ mode: 'open' });

    // --- Popup Styles (in Shadow DOM) ---
    const style = document.createElement('style');
    style.textContent = `
    #aqua-popup-two-main {
      position: fixed !important;
      /* Glassmorphism background */
      background: rgba(30, 34, 40, 0.03) !important;
      backdrop-filter: blur(2px) saturate(110%) !important;
      -webkit-backdrop-filter: blur(2px) saturate(110%) !important;
      color: #fff !important;
      padding: 20px !important;
      border: 1px solid rgba(68, 68, 68, 0.35) !important;
      border-radius: 18px !important;
      box-shadow: 0 8px 32px 0 rgba(0,0,0,0.25) !important;
      z-index: 10000 !important;
      font-family: 'Roboto', Arial, sans-serif !important;
      width: 340px !important;
      max-height: 75vh !important;
      text-align: center !important;
      animation: slideIn 0.3s ease-out !important;
      /* subtle border for glass effect */
      outline: 1.5px solid rgba(255,255,255,0.08) !important;
      overflow-y:scroll;
    }
    @keyframes slideIn {
      from { opacity: 0; transform: translate(-50%, -55%);}
      to { opacity: 1; transform: translate(-50%, -50%);}
    }
    #aqua-popup-two-main h3 {
      font-size: 20px !important;
      margin: 2px !important;
      color: #000000 !important;
      font-weight: 700 !important;
      text-transform: uppercase !important;
      text-shadow: 0 2px 8px rgba(0,0,0,0.18) !important;
    }
    #aqua-popup-two-main p {
      font-size: 14px !important;
      margin: 0 !important;
      color: black !important;
      line-height: 1.5 !important;
      text-shadow: 0 1px 4px rgba(0,0,0,0.10) !important;
    }
    #aqua-popup-two-main ul {
      margin: 12px 0 !important;
      padding: 0 !important;
      list-style: none !important;
      text-align: left !important;
    }
    #aqua-popup-two-main ul li {
      font-size: 13px !important;
      color: #f3f3f3 !important;
      margin-bottom: 6px !important;
      display: flex !important;
      align-items: center !important;
      text-shadow: 0 1px 4px rgba(0,0,0,0.10) !important;
    }
    #aqua-popup-two-main ul li::before {
      content: '•';
      color: #00c2ff !important;
      margin-right: 8px !important;
    }
    #aqua-popup-two-main button {
      display: block !important;
      width: 300px !important;
      margin: 5px !important;
      padding: 10px !important;
      font-size: 14px !important;
      font-weight: bold !important;
      color: #fff !important;
      background: linear-gradient(135deg, rgba(0,194,255,0.85), rgba(0,123,255,0.85)) !important;
      border: none !important;
      border-radius: 8px !important;
      cursor: pointer !important;
      transition: background 0.3s ease, box-shadow 0.3s !important;
      box-shadow: 0 4px 16px rgba(0,0,0,0.10) !important;
      backdrop-filter: blur(2px) !important;
    }
    #aqua-popup-two-main button:hover {
      background: linear-gradient(135deg, rgba(0,123,255,0.95), rgba(0,86,179,0.95)) !important;
      box-shadow: 0 6px 24px rgba(0,0,0,0.18) !important;
    }
    #aqua-popup-two-main button:disabled {
      background: rgba(85,85,85,0.7) !important;
      cursor: not-allowed !important;
    }
    #aqua-popup-two-main .close-button {
      position: absolute !important;
      top: 10px !important;
      right: 10px !important;
      background: rgba(255,77,77,0.85) !important;
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
      box-shadow: 0 2px 8px rgba(0,0,0,0.10) !important;
      backdrop-filter: blur(2px) !important;
    }
    #aqua-popup-two-main .close-button:hover { background: rgba(204,0,0,0.95) !important; }
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
      background-color: rgba(255,193,7,0.18) !important;
      cursor: pointer !important;
      transition: all 0.3s ease-in-out !important;
      border-radius: 6px !important;
      backdrop-filter: blur(2px) !important;
    }
    .highlighted-aria-label:hover {
      outline: 3px solid #e6a700 !important;
      background-color: rgba(255,193,7,0.28) !important;
    }
    .aria-label-tooltip {
      position: absolute !important;
      top: -35px !important;
      left: 50% !important;
      transform: translateX(-50%) !important;
      background: rgba(68, 68, 68, 0.85) !important;
      color: #fff !important;
      padding: 8px 12px !important;
      border-radius: 6px !important;
      font-size: 12px !important;
      white-space: nowrap !important;
      box-shadow: 0 4px 8px rgba(0,0,0,0.10) !important;
      z-index: 100000 !important;
      opacity: 0 !important;
      visibility: hidden !important;
      transition: all 0.3s ease-in-out !important;
      max-width: 300px !important;
      overflow-wrap: break-word !important;
      backdrop-filter: blur(2px) !important;
    }
    .highlighted-aria-label:hover .aria-label-tooltip {
      opacity: 1 !important;
      visibility: visible !important;
    }
    .inline-aria-label {
      display: inline-block !important;
      background: rgba(255,136,0,0.85) !important;
      color: #fff !important;
      padding: 6px 10px !important;
      border-radius: 12px !important;
      font-size: 12px !important;
      font-weight: 600 !important;
      margin-left: 6px !important;
      z-index: 10000 !important;
      transition: background 0.3s ease-in-out !important;
      position: relative !important;
      backdrop-filter: blur(2px) !important;
      text-shadow: 0 1px 4px rgba(0,0,0,0.10) !important;
    }
    .inline-aria-label:hover { background: rgba(0,86,179,0.95) !important; }
    `;

    // --- Popup HTML (in Shadow DOM) ---
    const popupElement = document.createElement('div');
    popupElement.id = 'aqua-popup-two-main';
    popupElement.innerHTML = `
    <style>
      .aqua-btn-tooltip-container {
        position: relative;
        display: inline-block;
      }
      .aqua-btn-tooltip {
        visibility: hidden;
        opacity: 0;
        width: max-content;
        max-width: 260px;
        background: rgba(34,34,34,0.92);
        color: #fff;
        text-align: center;
        border-radius: 6px;
        padding: 6px 12px;
        position: absolute;
        z-index: 100001;
        bottom: 120%;
        left: 50%;
        transform: translateX(-50%);
        font-size: 13px;
        pointer-events: none;
        transition: opacity 0.2s;
        box-shadow: 0 2px 8px rgba(0,0,0,0.13);
        white-space: pre-line;
      }
      .aqua-btn-tooltip-container:hover .aqua-btn-tooltip,
      .aqua-btn-tooltip-container:focus-within .aqua-btn-tooltip {
        visibility: visible;
        opacity: 1;
      }
    </style>
    <div id="aqua-popup-two-header" style="user-select: none; padding: 8px 0 0 0; display: flex; align-items: center;">
      <span class="aqua-btn-tooltip-container">
        <button id="aqua-drag-btn" title="Drag AQUA popup" style="position: absolute;width: 40px !important;height: 40px !important;font-size: 30px !important;cursor: move!important;border-radius: 50% !important;top: -49px !important;
    left: -25px !important;padding: 0px !important;background: linear-gradient(135deg, yellow, orange) !important;">&curren;</button>
        <span class="aqua-btn-tooltip">Drag</span>
      </span>
      <h3 style="
        margin: 0 auto !important;
        padding: 0 20px;
        flex: 1;
        background: linear-gradient(90deg, #f5f5f5 0%, #d3d3d3 100%);
        color: #222;
        height: 32px;
        width: fit-content;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2em;
        font-weight: 700;
        box-shadow: 0 2px 8px rgba(0,0,0,0.07);
      ">AQUA</h3>
      <span class="aqua-btn-tooltip-container">
        <button class="close-button" id="close-popup" style="float:right;position: absolute;width: 40px !important;height: 40px !important;font-size: 30px!important;cursor: pointer !important;border-radius: 50% !important;padding: 0px !important;top: -49px !important;
    left: -25px !important;">&times;</button>
        <span class="aqua-btn-tooltip">Close</span>
      </span>
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
    <h3 style="
        margin: 0 auto !important;
        padding: 0 20px;
        flex: 1;
        background: linear-gradient(90deg, #f5f5f5 0%, #d3d3d3 100%);
        color: #222;
        height: 32px;
        min-width: 80px;
        width: fit-content;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2em;
        font-weight: 700;
        box-shadow: 0 2px 8px rgba(0,0,0,0.07);
      ">CO-AQUA</h3>
        <div>
          <span class="aqua-btn-tooltip-container">
            <button id="co-highlight-and-inline-labels-skip">Highlight Aria-labels</button>
            <span class="aqua-btn-tooltip">Highlight elements with <b>aria-label</b> (skipping header/footer). Value shown in tooltip on hover.</span>
          </span>
          <span class="aqua-btn-tooltip-container">
            <button id="co-always-show-inline-labels-skip">Display ALL Aria-labels</button>
            <span class="aqua-btn-tooltip">Show all <b>aria-label</b> values inline (skipping header/footer).</span>
          </span>
          <span class="aqua-btn-tooltip-container">
            <button id="co-show-alt-text-skip">Check Image Alt Text (Skip Header/Footer)</button>
            <span class="aqua-btn-tooltip">Show <b>alt</b> text for images (skipping header/footer).</span>
          </span>
          <span class="aqua-btn-tooltip-container">
            <button id="co-form-aria-checker">form aria checks</button>
            <span class="aqua-btn-tooltip">Check forms for <b>alt</b>, <b>aria-label</b>, and <b>aria-labelledby</b> attributes.</span>
          </span>
          <span class="aqua-btn-tooltip-container">
            <button id="aqua-revert">Revert All AQUA Changes</button>
            <span class="aqua-btn-tooltip">Remove all highlights and revert changes made by AQUA.</span>
          </span>
          <span class="aqua-btn-tooltip-container">
            <button id="remove-actions">Refresh(if revert caused issues)</button>
            <span class="aqua-btn-tooltip">Reload/refresh the page if revert caused issues.</span>
          </span>
        </div>
      </div>
      <div class="aqua-tool-section" id="section-ALT" style="display: none;">
        <h3 style="
        margin: 0 auto !important;
        padding: 0 20px;
        flex: 1;
        background: linear-gradient(90deg, #f5f5f5 0%, #d3d3d3 100%);
        color: #222;
        height: 32px;
        min-width: 80px;
        width: fit-content;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2em;
        font-weight: 700;
        box-shadow: 0 2px 8px rgba(0,0,0,0.07);
      ">ALT</h3>
        <div>
          <span class="aqua-btn-tooltip-container">
            <button id="highlight-and-inline-labels-skip">Highlight Aria-labels with tooltips on hover (Skip Header/Footer)</button>
            <span class="aqua-btn-tooltip">Highlight elements with <b>aria-label</b> (skipping header/footer). Shows tooltip on hover.</span>
          </span>
          <span class="aqua-btn-tooltip-container">
            <button id="always-show-inline-labels-skip">Show All Labels Always (Skip Header/Footer)</button>
            <span class="aqua-btn-tooltip">Show all <b>aria-label</b> values inline (skipping header/footer).</span>
          </span>
          <span class="aqua-btn-tooltip-container">
            <button id="highlight-and-inline-labels">Highlight Aria-labels with tooltips on hover</button>
            <span class="aqua-btn-tooltip">Highlight elements with <b>aria-label</b>. Shows tooltip on hover.</span>
          </span>
          <span class="aqua-btn-tooltip-container">
            <button id="always-show-inline-labels">Show Tooltips Always</button>
            <span class="aqua-btn-tooltip">Show all <b>aria-label</b> tooltips always (not just on hover).</span>
          </span>
          <span class="aqua-btn-tooltip-container">
            <button id="always-show-inline-labels-2">Show All Labels Always</button>
            <span class="aqua-btn-tooltip">Show all <b>aria-label</b> values inline.</span>
          </span>
          <span class="aqua-btn-tooltip-container">
            <button id="aqua-revert">Revert All AQUA Changes</button>
            <span class="aqua-btn-tooltip">Remove all highlights and revert changes made by AQUA.</span>
          </span>
        </div>
      </div>
      <div class="aqua-tool-section" id="section-ARG" style="display: none;">
       <h3 style="
        margin: 0 auto !important;
        padding: 0 20px;
        flex: 1;
        background: linear-gradient(90deg, #f5f5f5 0%, #d3d3d3 100%);
        color: #222;
        height: 32px;
        min-width: 80px;
        width: fit-content;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2em;
        font-weight: 700;
        box-shadow: 0 2px 8px rgba(0,0,0,0.07);
      ">ARG</h3>
        <div>
          <span class="aqua-btn-tooltip-container">
            <button id="button-arg">Run Axe Checks</button>
            <span class="aqua-btn-tooltip">Run <b>axe-core</b> accessibility checks on the page.</span>
          </span>
          <span class="aqua-btn-tooltip-container">
            <button id="aqua-revert">Revert All AQUA Changes</button>
            <span class="aqua-btn-tooltip">Remove all highlights and revert changes made by AQUA.</span>
          </span>
        </div>
      </div>
      <div class="aqua-tool-section" id="section-IT" style="display: none;">
        <h3 style="
        margin: 0 auto !important;
        padding: 0 20px;
        flex: 1;
        background: linear-gradient(90deg, #f5f5f5 0%, #d3d3d3 100%);
        color: #222;
        height: 32px;
        min-width: 80px;
        width: fit-content;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2em;
        font-weight: 700;
        box-shadow: 0 2px 8px rgba(0,0,0,0.07);
      ">IT</h3>
        <div>
          <span class="aqua-btn-tooltip-container">
            <button id="show-alt-text-skip">Check Image Alt Text (Skip Header/Footer)</button>
            <span class="aqua-btn-tooltip">Show <b>alt</b> text for images (skipping header/footer).</span>
          </span>
          <span class="aqua-btn-tooltip-container">
            <button id="inline-image-labels-skip">Check Image Formats (Skip Header/Footer)</button>
            <span class="aqua-btn-tooltip">Check image formats (skipping header/footer).</span>
          </span>
          <span class="aqua-btn-tooltip-container">
            <button id="show-alt-text">Check Image Alt Text</button>
            <span class="aqua-btn-tooltip">Show <b>alt</b> text for all images.</span>
          </span>
          <span class="aqua-btn-tooltip-container">
            <button id="inline-image-labels">Check Image Formats</button>
            <span class="aqua-btn-tooltip">Check image formats for all images.</span>
          </span>
          <span class="aqua-btn-tooltip-container">
            <button id="aqua-revert">Revert All AQUA Changes</button>
            <span class="aqua-btn-tooltip">Remove all highlights and revert changes made by AQUA.</span>
          </span>
        </div>
      </div>
      <div class="aqua-tool-section" id="section-FORMALT" style="display: none;">
      <h3 style="
        margin: 0 auto !important;
        padding: 0 20px;
        flex: 1;
        background: linear-gradient(90deg, #f5f5f5 0%, #d3d3d3 100%);
        color: #222;
        height: 32px;
        min-width: 80px;
        width: fit-content;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2em;
        font-weight: 700;
        box-shadow: 0 2px 8px rgba(0,0,0,0.07);
      ">FORMALT</h3>
        <div>
          <span class="aqua-btn-tooltip-container">
            <button id="form-aria-checker">form aria checks</button>
            <span class="aqua-btn-tooltip">Check forms for <b>alt</b>, <b>aria-label</b>, and <b>aria-labelledby</b> attributes.</span>
          </span>
          <span class="aqua-btn-tooltip-container">
            <button id="aqua-revert">Revert All AQUA Changes</button>
            <span class="aqua-btn-tooltip">Remove all highlights and revert changes made by AQUA.</span>
          </span>
        </div>
      </div>
    </div>
    `;

    // Add style and popup to shadow root
    shadow.appendChild(style);
    shadow.appendChild(popupElement);

    // --- Make popup draggable by holding the drag button only ---
    (function makeDraggable(popup, dragBtnSelector) {
        let isDragging = false, startX, startY, startLeft, startTop;

        // Use shadowRoot for querySelector
        const dragBtn = popup.shadowRoot
            ? popup.shadowRoot.querySelector(dragBtnSelector)
            : popup.querySelector(dragBtnSelector);
        if (dragBtn) {

            function onMouseDown(e) {
                if (e.button !== 0) return; // Only left mouse
                isDragging = true;
                // Remove transform for accurate positioning
                popup.style.transform = '';
                startX = e.clientX;
                startY = e.clientY;
                // Get current position
                const rect = popup.getBoundingClientRect();
                startLeft = rect.left;
                startTop = rect.top;
                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', onMouseUp);
                e.preventDefault();
            }
            function onMouseMove(e) {
                if (!isDragging) return;
                let newLeft = startLeft + (e.clientX - startX);
                let newTop = startTop + (e.clientY - startY);

                // Keep within viewport
                const minLeft = 0, minTop = 0;
                const maxLeft = window.innerWidth - popup.offsetWidth;
                const maxTop = window.innerHeight - popup.offsetHeight;
                newLeft = Math.max(minLeft, Math.min(newLeft, maxLeft));
                newTop = Math.max(minTop, Math.min(newTop, maxTop));

                popup.style.left = newLeft + 'px';
                popup.style.top = newTop + 'px';
            }
            function onMouseUp() {
                isDragging = false;
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            }
            dragBtn.addEventListener('mousedown', onMouseDown);

            // Touch support
            dragBtn.addEventListener('touchstart', function (e) {
                if (e.touches.length !== 1) return;
                isDragging = true;
                popup.style.transform = '';
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
                const rect = popup.getBoundingClientRect();
                startLeft = rect.left;
                startTop = rect.top;
                document.addEventListener('touchmove', onTouchMove, { passive: false });
                document.addEventListener('touchend', onTouchEnd);
            });
            function onTouchMove(e) {
                if (!isDragging || e.touches.length !== 1) return;
                let newLeft = startLeft + (e.touches[0].clientX - startX);
                let newTop = startTop + (e.touches[0].clientY - startY);

                // Keep within viewport
                const minLeft = 0, minTop = 0;
                const maxLeft = window.innerWidth - popup.offsetWidth;
                const maxTop = window.innerHeight - popup.offsetHeight;
                newLeft = Math.max(minLeft, Math.min(newLeft, maxLeft));
                newTop = Math.max(minTop, Math.min(newTop, maxTop));

                popup.style.left = newLeft + 'px';
                popup.style.top = newTop + 'px';
                e.preventDefault();
            }
            function onTouchEnd() {
                isDragging = false;
                document.removeEventListener('touchmove', onTouchMove);
                document.removeEventListener('touchend', onTouchEnd);
            }
        }
    })(popupHost, '#aqua-drag-btn');

    // Show only the section for the selected tool
    function showAquaToolSection(selected) {
        // Hide all sections
        shadow.querySelectorAll('.aqua-tool-section').forEach(sec => sec.style.display = 'none');
        // Show the selected section
        const section = shadow.querySelector(`#section-${selected}`);
        if (section) section.style.display = '';
    }

    // Set initial section (COAQUA)
    showAquaToolSection('COAQUA');

    // --- Button Handler Registration ---
    // All button handler logic is now in this function, which is called on load and on dropdown change
    function registerAquaButtonHandlers() {
        // --- Helper: Get all unique revert buttons and action buttons ---
        function getAllAquaRevertButtons() {
            return Array.from(shadow.querySelectorAll('#aqua-revert'));
        }
        function getAllActionButtons() {
            // Exclude remove-actions, close-popup, and revert
            return Array.from(shadow.querySelectorAll('button')).filter(btn =>
                btn.id &&
                btn.id !== 'remove-actions' &&
                btn.id !== 'close-popup' &&
                btn.id !== 'aqua-revert' &&
                btn.id !== 'aqua-drag-btn'
            );
        }

        // --- Popup Close Button ---
        const closeBtn = shadow.querySelector('#close-popup');
        if (closeBtn) {
            closeBtn.onclick = () => {
                popupHost.remove();
                console.log('Popup closed.');
                // Save disabled state on close
                const anyDisabled = getAllActionButtons().some(btn => btn.disabled);
                saveButtonsDisabledState(anyDisabled);
            };
        }

        // --- Disable All Buttons Except Remove/Close/Revert ---
        function disableAllButtonsExceptRemove() {
            getAllActionButtons().forEach(btn => btn.disabled = true);
            saveButtonsDisabledState(true);
        }

        // --- Enable All Buttons Except Remove/Close/Revert ---
        function enableAllButtonsExceptRemove() {
            getAllActionButtons().forEach(btn => btn.disabled = false);
            saveButtonsDisabledState(false);
        }

        // --- On Popup Open: Restore Disabled State ---
        if (getButtonsDisabledState()) {
            setTimeout(() => {
                disableAllButtonsExceptRemove();
            }, 0);
        }

        // --- Reset Button ---
        const removeActionsBtn = shadow.querySelector('#remove-actions');
        if (removeActionsBtn) {
            removeActionsBtn.onclick = () => {
                localStorage.removeItem(AQUA_DISABLED_KEY);
                location.reload();
            };
        }

        // --- Revert Button Functionality ---
        getAllAquaRevertButtons().forEach(btn => {
            btn.onclick = function () {
                // Remove all AQUA-added classes and elements
                // Remove highlights
                document.querySelectorAll('.highlighted-aria-label').forEach(el => el.classList.remove('highlighted-aria-label'));
                // Remove inline aria labels
                removeElements('.inline-aria-label');
                // Remove inline label containers and move children back
                document.querySelectorAll('.inline-label-container').forEach(container => {
                    while (container.firstChild) {
                        container.parentNode.insertBefore(container.firstChild, container);
                    }
                    container.remove();
                });
                // Remove image labels
                removeElements('.inline-image-label');
                // Remove alt text labels
                removeElements('.alt-text-label');
                // Remove highlighted-media class
                document.querySelectorAll('.highlighted-media').forEach(el => el.classList.remove('highlighted-media'));
                // Remove form checker classes and tooltips
                document.querySelectorAll('.form-check-highlight').forEach(el => el.classList.remove('form-check-highlight'));
                document.querySelectorAll('.form-check-valid').forEach(el => el.classList.remove('form-check-valid'));
                removeElements('.form-check-tooltip');
                // Remove injected styles (except aqua-popup-two-style)
                [
                    'highlight-aria-label-style',
                    'inline-aria-label-style',
                    'inline-image-style',
                    'always-inline-label-style',
                    'form-checker-style',
                    'alt-text-style'
                ].forEach(id => {
                    const style = document.getElementById(id);
                    if (style) style.remove();
                });
                // Remove any .arg-popup overlays
                const argPopup = document.getElementById('arg-popup');
                if (argPopup) argPopup.remove();
                // Remove any axeLoader overlays
                document.querySelectorAll('[id^="axeLoader"]').forEach(el => el.remove());
                // Enable all buttons
                enableAllButtonsExceptRemove();
                console.log('AQUA changes reverted.');
            };
        });

        // --- ALT: Highlight and Tooltip ---
        const highlightAndInlineLabelsBtn = shadow.querySelector('#highlight-and-inline-labels');
        if (highlightAndInlineLabelsBtn) {
            highlightAndInlineLabelsBtn.onclick = function () {
                disableAllButtonsExceptRemove();

                // Highlight
                (function () {
                    const highlighted = document.querySelectorAll('.highlighted-aria-label');
                    if (highlighted.length) {
                        highlighted.forEach(el => el.remove());
                        console.log('Removed existing highlights.');
                        return;
                    }
                    injectStyle('highlight-aria-label-style', `
                .highlighted-aria-label {
                  position: relative !important;
                  outline: 2px solid #ff8800 !important;
                  background-color: rgba(255,200,0,0.2) !important;
                  cursor: pointer !important;
                }
              `);
                    document.querySelectorAll('[aria-label]').forEach(el => {
                        if (!el.classList.contains('highlighted-aria-label')) el.classList.add('highlighted-aria-label');
                    });
                    console.log(`${document.querySelectorAll('[aria-label]').length} elements with aria-label were highlighted.`);
                })();

                // Inline label on hover
                (function () {
                    const inlineLabels = document.querySelectorAll('.inline-aria-label');
                    if (inlineLabels.length) {
                        inlineLabels.forEach(label => label.remove());
                        console.log('Removed inline labels.');
                        return;
                    }
                    injectStyle('inline-aria-label-style', `
                .inline-aria-label { display: none !important; position: relative !important; background: #333 !important; color: #fff !important; padding: 4px 8px !important; border-radius: 4px !important; font-size: 12px !important; white-space: nowrap !important; z-index: 10000 !important; }
                .inline-label-container:hover .inline-aria-label { display: block !important; }
                .inline-label-container { position: relative !important; }
              `);
                    document.querySelectorAll('[aria-label]').forEach(el => {
                        if (el.querySelector('.inline-aria-label')) return;
                        const container = document.createElement('div');
                        container.className = 'inline-label-container';
                        el.parentNode.insertBefore(container, el);
                        container.appendChild(el);
                        const label = document.createElement('div');
                        label.className = 'inline-aria-label';
                        label.textContent = el.getAttribute('aria-label');
                        container.appendChild(label);
                    });
                    console.log(`${document.querySelectorAll('[aria-label]').length} elements with aria-label were labeled inline.`);
                })();
            };
        }

        // --- ALT: Always Show Inline Labels (block) ---
        const alwaysShowInlineLabelsBtn = shadow.querySelector('#always-show-inline-labels');
        if (alwaysShowInlineLabelsBtn) {
            alwaysShowInlineLabelsBtn.onclick = function () {
                disableAllButtonsExceptRemove();

                // Highlight
                const highlighted = document.querySelectorAll('.highlighted-aria-label');
                if (highlighted.length) {
                    highlighted.forEach(el => el.remove());
                    console.log('Removed existing highlights.');
                    return;
                }
                injectStyle('highlight-aria-label-style', `
              .highlighted-aria-label {
                position: relative !important;
                outline: 2px solid #ff8800 !important;
                background-color: rgba(255,200,0,0.2) !important;
                cursor: pointer !important;
              }
            `);
                const elements = document.querySelectorAll('[aria-label]');
                elements.forEach(el => {
                    if (!el.classList.contains('highlighted-aria-label')) el.classList.add('highlighted-aria-label');
                });
                console.log(`${elements.length} elements with aria-label were highlighted.`);

                // Inline label always visible (block)
                const inlineLabels = document.querySelectorAll('.inline-aria-label');
                if (inlineLabels.length) {
                    inlineLabels.forEach(label => label.remove());
                    console.log('Removed inline labels.');
                    return;
                }
                injectStyle('inline-aria-label-style', `
              .inline-aria-label { display: block !important; position: relative !important; background: #333 !important; color: #fff !important; padding: 4px 8px !important; border-radius: 4px !important; font-size: 12px !important; white-space: nowrap !important; z-index: 10000 !important; }
              .inline-label-container { position: relative !important; }
            `);
                elements.forEach(el => {
                    if (el.querySelector('.inline-aria-label')) return;
                    const container = document.createElement('div');
                    container.className = 'inline-label-container';
                    el.parentNode.insertBefore(container, el);
                    container.appendChild(el);
                    const label = document.createElement('div');
                    label.className = 'inline-aria-label';
                    label.textContent = el.getAttribute('aria-label');
                    container.appendChild(label);
                });
                console.log(`${elements.length} elements with aria-label were labeled inline.`);
            };
        }

        // --- ALT: Always Show Inline Labels (inline-block) ---
        const alwaysShowInlineLabels2Btn = shadow.querySelector('#always-show-inline-labels-2');
        if (alwaysShowInlineLabels2Btn) {
            alwaysShowInlineLabels2Btn.onclick = function () {
                disableAllButtonsExceptRemove();

                // Highlight
                (function () {
                    const highlighted = document.querySelectorAll('.highlighted-aria-label');
                    if (highlighted.length) {
                        highlighted.forEach(el => el.remove());
                        console.log('Removed existing highlights.');
                        return;
                    }
                    injectStyle('highlight-aria-label-style', `
                .highlighted-aria-label {
                  position: relative !important;
                  outline: 2px solid #ff8800 !important;
                  background-color: rgba(255,200,0,0.2) !important;
                  cursor: pointer !important;
                }
              `);
                    document.querySelectorAll('[aria-label]').forEach(el => {
                        if (!el.classList.contains('highlighted-aria-label')) el.classList.add('highlighted-aria-label');
                    });
                    console.log(`${document.querySelectorAll('[aria-label]').length} elements with aria-label were highlighted.`);
                })();

                // Inline label always visible (inline-block)
                const elements = document.querySelectorAll('[aria-label]');
                elements.forEach(el => {
                    if (!el.querySelector('.inline-aria-label')) {
                        const label = document.createElement('span');
                        label.className = 'inline-aria-label';
                        label.textContent = el.getAttribute('aria-label');
                        el.appendChild(label);
                    }
                });
                injectStyle('always-inline-label-style', `
              .inline-aria-label { display: inline-block !important; }
            `);
                console.log('Inline labels are now always visible.');
            };
        }

        // --- ARG: Run Axe Accessibility Checks ---
        const buttonArgBtn = shadow.querySelector('#button-arg');
        if (buttonArgBtn) {
            buttonArgBtn.onclick = function () {
                popupHost.remove();
                console.log('Popup closed.');

                // Save disabled state on close
                const anyDisabled = getAllActionButtons().some(btn => btn.disabled);
                saveButtonsDisabledState(anyDisabled);


                function showLoader() {
                    const loader = document.createElement('div');
                    loader.id = `axeLoader-${Math.random().toString(36).substr(2, 9)}`;
                    loader.setAttribute('aria-hidden', 'true');
                    loader.setAttribute('style', `
                position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
                font-size: 20px; color: #fff; background-color: rgba(0,0,0,0.7);
                padding: 20px; border-radius: 5px; z-index: 9999;
              `);
                    loader.textContent = 'Running accessibility checks...';
                    document.body.appendChild(loader);
                }

                function hideLoader() {
                    const loader = document.querySelector('[id^="axeLoader"]');
                    if (loader) loader.remove();
                }

                function injectAxeAndRun() {
                    if (typeof axe === 'undefined') {
                        const script = document.createElement('script');
                        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.10.0/axe.min.js';
                        script.onload = runAxe;
                        document.head.appendChild(script);
                    } else {
                        runAxe();
                    }
                }

                function runAxe() {
                    showLoader();
                    axe.run(
                        document,
                        {
                            runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'] },
                            resultTypes: ['violations', 'incomplete'],
                            iframes: true,
                            shadowDom: true,
                            exclude: [['[id^="axeLoader"]', '[id^="aqua-popup"]']],
                        },
                        function (error, results) {
                            hideLoader();
                            if (error) {
                                console.error(error);
                                return;
                            }
                            displayResults(results);
                        }
                    );
                }

                function displayResults(results) {
                    // Overlay container
                    const container = document.createElement('div');
                    container.id = 'arg-popup';
                    container.setAttribute('style', `
                position: fixed; top: 10%; left: 25%; width: 50%; height: 80%;
                background-color: #fff; color: #000; overflow: auto; z-index: 9999;
                padding: 60px 20px 20px 20px; box-shadow: 0 0 10px rgba(0,0,0,0.5);
                font-family: Arial, sans-serif; border-radius: 8px;
              `);

                    // Highlighted elements tracker
                    const highlightedElements = [];

                    function highlightElement(targetSelector) {
                        const el = document.querySelector(targetSelector);
                        if (!el) return;
                        let originalBorder = el.getAttribute('data-original-border');
                        if (!originalBorder) {
                            originalBorder = el.style.border;
                            el.setAttribute('data-original-border', originalBorder);
                        }
                        el.style.border = '5px solid red';
                        if (!highlightedElements.includes(el)) highlightedElements.push(el);
                    }

                    // Close button
                    const closeBtn = document.createElement('button');
                    closeBtn.textContent = 'X';
                    closeBtn.setAttribute('style', `
                position: fixed; top: calc(10% + 10px); right: calc(25% + 10px);
                padding: 5px 10px; background-color: #f44336; color: #fff;
                border: none; border-radius: 3px; cursor: pointer; z-index: 10000;
              `);
                    closeBtn.onclick = () => {
                        document.body.removeChild(container);
                        document.body.removeChild(closeBtn);
                        document.body.removeChild(highlightAllBtn);
                    };
                    document.body.appendChild(closeBtn);

                    // Highlight all button
                    const highlightAllBtn = document.createElement('button');
                    highlightAllBtn.textContent = 'Highlight All Issues';
                    highlightAllBtn.setAttribute('style', `
                position: fixed; top: calc(10% + 50px); right: calc(25% + 10px);
                padding: 5px 10px; background-color: #2196F3; color: #fff;
                border: none; border-radius: 3px; cursor: pointer; z-index: 10000;
              `);
                    highlightAllBtn.onclick = () => highlightAllViolations(results.violations);
                    document.body.appendChild(highlightAllBtn);

                    function highlightAllViolations(violations) {
                        violations.forEach(violation => {
                            violation.nodes.forEach(node => {
                                if (node.target && node.target.length) {
                                    node.target.forEach(targetSelector => highlightElement(targetSelector));
                                }
                            });
                        });
                    }

                    function createSection(title, items, type) {
                        const card = document.createElement('details');
                        card.setAttribute('style', 'margin-bottom: 15px; border: 1px solid #ddd; border-radius: 5px; padding: 10px; background-color: #f9f9f9;');
                        const summary = document.createElement('summary');
                        summary.textContent = title;
                        summary.setAttribute('style', 'font-weight: bold; cursor: pointer;');
                        card.appendChild(summary);
                        const section = document.createElement('div');

                        if (items.length) {
                            items.forEach((item, idx) => {
                                const details = document.createElement('details');
                                details.setAttribute('style', 'margin-bottom: 10px;');
                                const itemSummary = document.createElement('summary');
                                itemSummary.setAttribute('style', 'cursor: pointer; font-weight: bold;');
                                itemSummary.textContent = `${idx + 1}. ${item.description}`;
                                details.appendChild(itemSummary);

                                const contentDiv = document.createElement('div');
                                contentDiv.setAttribute('style', 'margin-left: 20px; margin-top: 5px;');
                                const explanation = document.createElement('p');
                                explanation.textContent = getFriendlyExplanation(item, type);
                                contentDiv.appendChild(explanation);

                                const learnMoreLink = document.createElement('a');
                                learnMoreLink.href = item.helpUrl;
                                learnMoreLink.textContent = 'Learn more about this issue';
                                learnMoreLink.target = '_blank';
                                learnMoreLink.setAttribute('style', 'display: block; margin-bottom: 10px; color: #2196F3; text-decoration: none;');
                                contentDiv.appendChild(learnMoreLink);

                                if (item.nodes && item.nodes.length) {
                                    const nodesList = document.createElement('ul');
                                    item.nodes.forEach(node => {
                                        const nodeItem = document.createElement('li');
                                        const codeBlock = document.createElement('code');
                                        codeBlock.textContent = node.html.trim();
                                        codeBlock.setAttribute('style', 'display: block; background-color: #f5f5f5; padding: 5px; border-radius: 3px; margin-bottom: 5px; white-space: pre-wrap;');
                                        const highlightLink = document.createElement('a');
                                        highlightLink.href = '#';
                                        highlightLink.textContent = 'Highlight Element on Page';
                                        highlightLink.style.color = '#2196F3';
                                        highlightLink.style.textDecoration = 'none';

                                        if (node.target && node.target.length) {
                                            const targetSelector = node.target[0];
                                            highlightLink.onclick = function (e) {
                                                e.preventDefault();
                                                const el = document.querySelector(targetSelector);
                                                if (el) {
                                                    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                                    highlightElement(targetSelector);
                                                }
                                            };
                                        } else {
                                            highlightLink.style.color = 'gray';
                                            highlightLink.onclick = e => e.preventDefault();
                                        }

                                        nodeItem.appendChild(codeBlock);
                                        nodeItem.appendChild(highlightLink);
                                        nodesList.appendChild(nodeItem);
                                    });
                                    contentDiv.appendChild(nodesList);
                                }
                                details.appendChild(contentDiv);
                                section.appendChild(details);
                            });
                        } else {
                            const noItems = document.createElement('p');
                            noItems.textContent = 'No issues found in this category.';
                            section.appendChild(noItems);
                        }
                        card.appendChild(section);
                        container.appendChild(card);
                    }

                    function getFriendlyExplanation(item, type) {
                        if (type === 'violations') return `Issue: ${item.description} This needs to be fixed to improve accessibility.`;
                        if (type === 'incomplete') return 'This item requires manual review to determine if there is an accessibility issue.';
                        return '';
                    }

                    createSection('Accessibility Issues to Fix:', results.violations, 'violations');
                    createSection('Accessibility Issues Needing Manual Review:', results.incomplete, 'incomplete');
                    document.body.appendChild(container);
                }

                if (document.readyState === 'complete') injectAxeAndRun();
                else window.addEventListener('load', injectAxeAndRun);
            };
        }

        // --- IT: Inline Labels for Images format checks ---
        const inlineImageLabelsBtn = shadow.querySelector('#inline-image-labels');
        if (inlineImageLabelsBtn) {
            inlineImageLabelsBtn.onclick = function () {
                disableAllButtonsExceptRemove();

                (function () {
                    const inlineLabels = document.querySelectorAll('.inline-image-label');
                    if (inlineLabels.length) {
                        inlineLabels.forEach(label => label.remove());
                        console.log('Removed existing inline labels.');
                        return;
                    }
                    injectStyle('inline-image-style', `
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
              `);
                    const images = document.querySelectorAll('img, picture, svg');
                    images.forEach(image => {
                        if (image.querySelector('.inline-image-label')) return;
                        let labelContent = '';
                        if (image.tagName.toLowerCase() === 'img') {
                            const src = image.src || 'unknown';
                            const ext = src.split('.').pop().split('?')[0].toLowerCase();
                            labelContent = `Image: ${ext || 'unknown'}`;
                        } else if (image.tagName.toLowerCase() === 'picture') {
                            const sources = Array.from(image.querySelectorAll('source'));
                            const fallback = image.querySelector('img');
                            const types = sources.map(src => src.type || 'unknown');
                            const fallbackType = fallback ? fallback.src.split('.').pop().split('?')[0].toLowerCase() : 'none';
                            labelContent = `Picture with fallbacks: ${types.join(', ')}; Fallback: ${fallbackType}`;
                        }
                        const label = document.createElement('span');
                        label.className = 'inline-image-label';
                        label.textContent = labelContent;
                        image.parentNode.insertBefore(label, image.nextSibling);
                    });
                    console.log(`${images.length} images and picture tags labeled inline.`);
                })();
            };
        }

        // --- ALT: Highlight Aria-labels (Skip Header/Footer) ---
        const coHighlightAndInlineLabelsSkipBtn = shadow.querySelector('#co-highlight-and-inline-labels-skip');
        if (coHighlightAndInlineLabelsSkipBtn) {
            coHighlightAndInlineLabelsSkipBtn.onclick = function () {
                disableAllButtonsExceptRemove();

                // Highlight
                (function () {
                    const highlighted = document.querySelectorAll('.highlighted-aria-label');
                    if (highlighted.length) {
                        highlighted.forEach(el => el.classList.remove('highlighted-aria-label'));
                        console.log('Removed existing highlights.');
                        return;
                    }
                    injectStyle('highlight-aria-label-style', `
                .highlighted-aria-label {
                  position: relative !important;
                  outline: 2px solid #ff8800 !important;
                  background-color: rgba(255,200,0,0.2) !important;
                  cursor: pointer !important;
                }
              `);
                    const elements = getElementsWithAriaLabel(true);
                    elements.forEach(el => {
                        if (!el.classList.contains('highlighted-aria-label')) el.classList.add('highlighted-aria-label');
                    });
                    console.log(`${elements.length} elements with aria-label were highlighted, excluding header and footer.`);
                })();

                // Inline label on hover
                (function () {
                    const inlineLabels = document.querySelectorAll('.inline-aria-label');
                    if (inlineLabels.length) {
                        inlineLabels.forEach(label => label.remove());
                        console.log('Removed inline labels.');
                        return;
                    }
                    injectStyle('inline-aria-label-style', `
                .inline-aria-label { display: none !important; position: relative !important; background: #333 !important; color: #fff !important; padding: 4px 8px !important; border-radius: 4px !important; font-size: 12px !important; white-space: nowrap !important; z-index: 10000 !important; }
                .inline-label-container:hover .inline-aria-label { display: block !important; }
                .inline-label-container { position: relative !important; }
              `);
                    const elements = getElementsWithAriaLabel(true);
                    elements.forEach(el => {
                        if (el.querySelector('.inline-aria-label')) return;
                        const container = document.createElement('div');
                        container.className = 'inline-label-container';
                        el.parentNode.insertBefore(container, el);
                        container.appendChild(el);
                        const label = document.createElement('div');
                        label.className = 'inline-aria-label';
                        label.textContent = el.getAttribute('aria-label');
                        container.appendChild(label);
                    });
                    console.log(`${elements.length} elements with aria-label were labeled inline.`);
                })();
            };
        }
        const highlightAndInlineLabelsSkipBtn = shadow.querySelector('#highlight-and-inline-labels-skip');
        if (highlightAndInlineLabelsSkipBtn) {
            highlightAndInlineLabelsSkipBtn.onclick = function () {
                disableAllButtonsExceptRemove();

                // Highlight
                (function () {
                    const highlighted = document.querySelectorAll('.highlighted-aria-label');
                    if (highlighted.length) {
                        highlighted.forEach(el => el.classList.remove('highlighted-aria-label'));
                        console.log('Removed existing highlights.');
                        return;
                    }
                    injectStyle('highlight-aria-label-style', `
                .highlighted-aria-label {
                  position: relative !important;
                  outline: 2px solid #ff8800 !important;
                  background-color: rgba(255,200,0,0.2) !important;
                  cursor: pointer !important;
                }
              `);
                    const elements = getElementsWithAriaLabel(true);
                    elements.forEach(el => {
                        if (!el.classList.contains('highlighted-aria-label')) el.classList.add('highlighted-aria-label');
                    });
                    console.log(`${elements.length} elements with aria-label were highlighted, excluding header and footer.`);
                })();

                // Inline label on hover
                (function () {
                    const inlineLabels = document.querySelectorAll('.inline-aria-label');
                    if (inlineLabels.length) {
                        inlineLabels.forEach(label => label.remove());
                        console.log('Removed inline labels.');
                        return;
                    }
                    injectStyle('inline-aria-label-style', `
                .inline-aria-label { display: none !important; position: relative !important; background: #333 !important; color: #fff !important; padding: 4px 8px !important; border-radius: 4px !important; font-size: 12px !important; white-space: nowrap !important; z-index: 10000 !important; }
                .inline-label-container:hover .inline-aria-label { display: block !important; }
                .inline-label-container { position: relative !important; }
              `);
                    const elements = getElementsWithAriaLabel(true);
                    elements.forEach(el => {
                        if (el.querySelector('.inline-aria-label')) return;
                        const container = document.createElement('div');
                        container.className = 'inline-label-container';
                        el.parentNode.insertBefore(container, el);
                        container.appendChild(el);
                        const label = document.createElement('div');
                        label.className = 'inline-aria-label';
                        label.textContent = el.getAttribute('aria-label');
                        container.appendChild(label);
                    });
                    console.log(`${elements.length} elements with aria-label were labeled inline.`);
                })();
            };
        }
        // --- ALT: Always Show Tooltips (Skip Header/Footer) ---
        const coAlwaysShowInlineLabelsSkipBtn = shadow.querySelector('#co-always-show-inline-labels-skip');
        if (coAlwaysShowInlineLabelsSkipBtn) {
            coAlwaysShowInlineLabelsSkipBtn.onclick = function () {
                disableAllButtonsExceptRemove();

                // Highlight
                (function () {
                    const highlighted = document.querySelectorAll('.highlighted-aria-label');
                    if (highlighted.length) {
                        highlighted.forEach(el => el.classList.remove('highlighted-aria-label'));
                        console.log('Removed existing highlights.');
                        return;
                    }
                    injectStyle('highlight-aria-label-style', `
        .highlighted-aria-label {
          position: relative !important;
          outline: 2px solid #ff8800 !important;
          background-color: rgba(255,200,0,0.2) !important;
          cursor: pointer !important;
        }

    .inline-aria-label {
        display: inline-block !important;
        background: rgba(255,136,0,0.85) !important;
        color: #fff !important;
        padding: 6px 10px !important;
        border-radius: 12px !important;
        font-size: 12px !important;
        font-weight: 600 !important;
        margin-left: 6px !important;
        z-index: 10000 !important;
        transition: background 0.3s ease-in-out !important;
        position: relative !important;
        backdrop-filter: blur(2px) !important;
        text-shadow: 0 1px 4px rgba(0,0,0,0.10) !important;
      }
      `);
                    const elements = getElementsWithAriaLabel(true);
                    elements.forEach(el => {
                        if (!el.classList.contains('highlighted-aria-label')) el.classList.add('highlighted-aria-label');
                    });
                    console.log(`${elements.length} elements with aria-label were highlighted, excluding header and footer.`);
                })();

                // Inline tooltips always visible
                const elements = getElementsWithAriaLabel(true);
                removeElements('.inline-aria-label');
                elements.forEach(el => {
                    const tooltip = document.createElement('div');
                    tooltip.className = 'inline-aria-label';
                    tooltip.textContent = el.getAttribute('aria-label');
                    el.appendChild(tooltip);
                });
                console.log(`${elements.length} tooltips added for aria-label elements, excluding header/footer.`);
            };
        }
        const alwaysShowInlineLabelsSkipBtn = shadow.querySelector('#always-show-inline-labels-skip');
        if (alwaysShowInlineLabelsSkipBtn) {
            alwaysShowInlineLabelsSkipBtn.onclick = function () {
                disableAllButtonsExceptRemove();

                // Highlight
                (function () {
                    const highlighted = document.querySelectorAll('.highlighted-aria-label');
                    if (highlighted.length) {
                        highlighted.forEach(el => el.classList.remove('highlighted-aria-label'));
                        console.log('Removed existing highlights.');
                        return;
                    }
                    injectStyle('highlight-aria-label-style', `
                .highlighted-aria-label {
                  position: relative !important;
                  outline: 2px solid #ff8800 !important;
                  background-color: rgba(255,200,0,0.2) !important;
                  cursor: pointer !important;
                }

    .inline-aria-label {
        display: inline-block !important;
        background: rgba(255,136,0,0.85) !important;
        color: #fff !important;
        padding: 6px 10px !important;
        border-radius: 12px !important;
        font-size: 12px !important;
        font-weight: 600 !important;
        margin-left: 6px !important;
        z-index: 10000 !important;
        transition: background 0.3s ease-in-out !important;
        position: relative !important;
        backdrop-filter: blur(2px) !important;
        text-shadow: 0 1px 4px rgba(0,0,0,0.10) !important;
      }
              `);
                    const elements = getElementsWithAriaLabel(true);
                    elements.forEach(el => {
                        if (!el.classList.contains('highlighted-aria-label')) el.classList.add('highlighted-aria-label');
                    });
                    console.log(`${elements.length} elements with aria-label were highlighted, excluding header and footer.`);
                })();

                // Inline tooltips always visible
                const elements = getElementsWithAriaLabel(true);
                removeElements('.inline-aria-label');
                elements.forEach(el => {
                    const tooltip = document.createElement('div');
                    tooltip.className = 'inline-aria-label';
                    tooltip.textContent = el.getAttribute('aria-label');
                    el.appendChild(tooltip);
                });
                console.log(`${elements.length} tooltips added for aria-label elements, excluding header/footer.`);
            };
        }

        // --- IT: Inline Image Labels (Skip Header/Footer) ---
        const inlineImageLabelsSkipBtn = shadow.querySelector('#inline-image-labels-skip');
        if (inlineImageLabelsSkipBtn) {
            inlineImageLabelsSkipBtn.onclick = function () {
                disableAllButtonsExceptRemove();

                (function () {
                    const inlineLabels = document.querySelectorAll('.inline-image-label');
                    if (inlineLabels.length) {
                        inlineLabels.forEach(label => label.remove());
                        console.log('Removed existing inline labels.');
                        return;
                    }
                    injectStyle('inline-image-style', `
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
              `);
                    const images = Array.from(document.querySelectorAll('img, picture')).filter(el => !el.closest('header, footer'));
                    images.forEach(image => {
                        if (image.querySelector('.inline-image-label')) return;
                        let labelContent = '';
                        if (image.tagName.toLowerCase() === 'img') {
                            const src = image.src || 'unknown';
                            const ext = src.split('.').pop().split('?')[0].toLowerCase();
                            labelContent = `Image: ${ext || 'unknown'}`;
                        } else if (image.tagName.toLowerCase() === 'picture') {
                            const sources = Array.from(image.querySelectorAll('source'));
                            const fallback = image.querySelector('img');
                            const types = sources.map(src => src.type || 'unknown');
                            const fallbackType = fallback ? fallback.src.split('.').pop().split('?')[0].toLowerCase() : 'none';
                            labelContent = `Picture with fallbacks: ${types.join(', ')}; Fallback: ${fallbackType}`;
                        }
                        const label = document.createElement('span');
                        label.className = 'inline-image-label';
                        label.textContent = labelContent;
                        image.parentNode.insertBefore(label, image.nextSibling);
                    });
                    console.log(`${images.length} images and picture tags labeled inline.`);
                })();
            };
        }

        // --- FORMALT: Form Aria Checker ---
        const formAriaCheckerBtn = shadow.querySelector('#form-aria-checker');
        if (formAriaCheckerBtn) {
            formAriaCheckerBtn.onclick = function () {
                injectStyle('form-checker-style', `
                  .form-check-highlight { position: relative; outline: 2px solid red; background-color: rgba(255,0,0,0.1);}
                  .form-check-valid { position: relative; outline: 2px solid green; background-color: rgba(0,255,0,0.1);}
                  .form-check-tooltip {
                    position: absolute; top: -30px; left: 50%; transform: translateX(-50%);
                    background: #333; color: #fff; padding: 6px 12px; border-radius: 4px;
                    font-size: 12px; z-index: 1000; white-space: nowrap;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1); opacity: 1; transition: opacity 0.2s, visibility 0.2s;
                  }
                `);

                document.querySelectorAll('form input, form textarea, form select, form fieldset').forEach(element => {
                    element.classList.remove('form-check-highlight', 'form-check-valid');
                    const existingTooltip = element.parentNode.querySelector('.form-check-tooltip');
                    if (existingTooltip) existingTooltip.remove();
                    if (element.getAttribute('aria-hidden') === 'true') return;

                    let tooltipMessage = '';
                    let isValid = true;

                    // aria-labelledby
                    const labelledBy = element.getAttribute('aria-labelledby');
                    if (labelledBy) {
                        const ids = labelledBy.trim().split(/\s+/);
                        let hasValidId = false;
                        ids.forEach(id => {
                            const labelElement = document.getElementById(id);
                            if (labelElement) {
                                hasValidId = true;
                                tooltipMessage += `aria-labelledby "${id}": "${labelElement.textContent.trim() || 'No visible text'}". `;
                            } else {
                                tooltipMessage += `Invalid aria-labelledby ID: "${id}". `;
                            }
                        });
                        if (!hasValidId) isValid = false;
                    }

                    // aria-label
                    const ariaLabel = element.getAttribute('aria-label');
                    if (ariaLabel !== null) {
                        if (!ariaLabel.trim() || ariaLabel.trim().length < 3) {
                            tooltipMessage += 'aria-label is empty or not meaningful. ';
                            isValid = false;
                        } else {
                            tooltipMessage += `aria-label: "${ariaLabel.trim()}". `;
                        }
                    }

                    // Highlight and tooltip
                    const tooltip = document.createElement('div');
                    tooltip.className = 'form-check-tooltip';
                    if (!isValid) {
                        element.classList.add('form-check-highlight');
                        tooltip.textContent = tooltipMessage.trim();
                    } else {
                        element.classList.add('form-check-valid');
                        tooltip.textContent = `Accessible element: ${tooltipMessage.trim()}`;
                    }
                    element.parentNode.style.position = 'relative';
                    element.parentNode.appendChild(tooltip);
                });

                console.log('Form accessibility issues have been checked.');
            };
        }
        const coFormAriaCheckerBtn = shadow.querySelector('#co-form-aria-checker');
        if (coFormAriaCheckerBtn) {
            coFormAriaCheckerBtn.onclick = function () {
                injectStyle('form-checker-style', `
                  .form-check-highlight { position: relative; outline: 2px solid red; background-color: rgba(255,0,0,0.1);}
                  .form-check-valid { position: relative; outline: 2px solid green; background-color: rgba(0,255,0,0.1);}
                  .form-check-tooltip {
                    position: absolute; top: -30px; left: 50%; transform: translateX(-50%);
                    background: #333; color: #fff; padding: 6px 12px; border-radius: 4px;
                    font-size: 12px; z-index: 1000; white-space: nowrap;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1); opacity: 1; transition: opacity 0.2s, visibility 0.2s;
                  }
                `);

                document.querySelectorAll('form input, form textarea, form select, form fieldset').forEach(element => {
                    element.classList.remove('form-check-highlight', 'form-check-valid');
                    const existingTooltip = element.parentNode.querySelector('.form-check-tooltip');
                    if (existingTooltip) existingTooltip.remove();
                    if (element.getAttribute('aria-hidden') === 'true') return;

                    let tooltipMessage = '';
                    let isValid = true;

                    // aria-labelledby
                    const labelledBy = element.getAttribute('aria-labelledby');
                    if (labelledBy) {
                        const ids = labelledBy.trim().split(/\s+/);
                        let hasValidId = false;
                        ids.forEach(id => {
                            const labelElement = document.getElementById(id);
                            if (labelElement) {
                                hasValidId = true;
                                tooltipMessage += `aria-labelledby "${id}": "${labelElement.textContent.trim() || 'No visible text'}". `;
                            } else {
                                tooltipMessage += `Invalid aria-labelledby ID: "${id}". `;
                            }
                        });
                        if (!hasValidId) isValid = false;
                    }

                    // aria-label
                    const ariaLabel = element.getAttribute('aria-label');
                    if (ariaLabel !== null) {
                        if (!ariaLabel.trim() || ariaLabel.trim().length < 3) {
                            tooltipMessage += 'aria-label is empty or not meaningful. ';
                            isValid = false;
                        } else {
                            tooltipMessage += `aria-label: "${ariaLabel.trim()}". `;
                        }
                    }

                    // Highlight and tooltip
                    const tooltip = document.createElement('div');
                    tooltip.className = 'form-check-tooltip';
                    if (!isValid) {
                        element.classList.add('form-check-highlight');
                        tooltip.textContent = tooltipMessage.trim();
                    } else {
                        element.classList.add('form-check-valid');
                        tooltip.textContent = `Accessible element: ${tooltipMessage.trim()}`;
                    }
                    element.parentNode.style.position = 'relative';
                    element.parentNode.appendChild(tooltip);
                });

                console.log('Form accessibility issues have been checked.');
            };
        }

        // --- IT: Show Alt Text Labels ---
        function injectAltTextStyle() {
            injectStyle('alt-text-style', `
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
            `);
        }

        function findAccessibleText(element) {
            const alt = element.getAttribute('alt');
            const ariaLabel = element.getAttribute('aria-label');
            const labelledById = element.getAttribute('aria-labelledby');
            const labelledByElement = labelledById ? document.getElementById(labelledById) : null;
            if (alt) return `Alt: "${alt}"`;
            if (ariaLabel) return `Aria-label: "${ariaLabel}"`;
            if (labelledByElement) return `Aria-labelledby: "${labelledByElement.textContent.trim()}"`;
            return null;
        }

        function findParentAccessibleText(element) {
            let parent = element.parentElement;
            while (parent) {
                const accessibleText = findAccessibleText(parent);
                if (accessibleText) return accessibleText;
                parent = parent.parentElement;
            }
            return 'No accessible text found.';
        }

        const showAltTextBtn = shadow.querySelector('#show-alt-text');
        if (showAltTextBtn) {
            showAltTextBtn.onclick = function () {
                injectAltTextStyle();
                const elements = document.querySelectorAll('img, picture, svg');
                elements.forEach(element => {
                    element.classList.add('highlighted-media');
                    const existingLabel = element.querySelector('.alt-text-label');
                    if (existingLabel) existingLabel.remove();
                    let accessibleText = findAccessibleText(element) || findParentAccessibleText(element);
                    const label = document.createElement('span');
                    label.className = 'alt-text-label';
                    label.textContent = accessibleText;
                    element.style.position = 'relative';
                    element.parentNode.insertBefore(label, element.nextSibling);
                });
                console.log(`${elements.length} media elements labeled with accessible text.`);
            };
        }

        const showAltTextSkipBtn = shadow.querySelector('#show-alt-text-skip');
        const coShowAltTextSkipBtn = shadow.querySelector('#co-show-alt-text-skip');
        if (showAltTextSkipBtn || coShowAltTextSkipBtn) {
            if (showAltTextSkipBtn) showAltTextSkipBtn.onclick = function () {
                injectAltTextStyle();
                const elements = Array.from(document.querySelectorAll('img, picture, svg')).filter(el => !el.closest('header, footer'));
                elements.forEach(element => {
                    element.classList.add('highlighted-media');
                    const existingLabel = element.querySelector('.alt-text-label');
                    if (existingLabel) existingLabel.remove();
                    let accessibleText = findAccessibleText(element) || findParentAccessibleText(element);
                    const label = document.createElement('span');
                    label.className = 'alt-text-label';
                    label.textContent = accessibleText;
                    element.style.position = 'relative';
                    element.parentNode.insertBefore(label, element.nextSibling);
                });
                console.log(`${elements.length} media elements labeled with accessible text.`);
            };
            if (coShowAltTextSkipBtn) coShowAltTextSkipBtn.onclick = function () {
                injectAltTextStyle();
                const elements = Array.from(document.querySelectorAll('img, picture, svg')).filter(el => !el.closest('header, footer'));
                elements.forEach(element => {
                    element.classList.add('highlighted-media');
                    const existingLabel = element.querySelector('.alt-text-label');
                    if (existingLabel) existingLabel.remove();
                    let accessibleText = findAccessibleText(element) || findParentAccessibleText(element);
                    const label = document.createElement('span');
                    label.className = 'alt-text-label';
                    label.textContent = accessibleText;
                    element.style.position = 'relative';
                    element.parentNode.insertBefore(label, element.nextSibling);
                });
                console.log(`${elements.length} media elements labeled with accessible text.`);
            };
        }
    }

    // Register handlers initially
    registerAquaButtonHandlers();

    // Listen for dropdown changes
    shadow.querySelector('#aqua-tool-dropdown').addEventListener('change', function (e) {
        showAquaToolSection(e.target.value);
        // Re-register handlers for new visible section
        registerAquaButtonHandlers();
    });

    document.body.appendChild(popupHost);

})();

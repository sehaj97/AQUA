javascript: (function () {
    // Check if the popup already exists
    const existingPopup = document.getElementById("aria-label-popup");
    if (existingPopup) {
        existingPopup.remove();
        console.log("Popup removed.");
        return;
    }

    // Define styles for the popup and elements
    const popupStyleId = "aria-label-popup-style";
    if (!document.getElementById(popupStyleId)) {
        const popupStyleElement = document.createElement("style");
        popupStyleElement.id = popupStyleId;
        popupStyleElement.textContent = `
            /* Popup Styles */
            #aria-label-popup {
                position: fixed !important;
                top: 50% !important;
                left: 50% !important;
                transform: translate(-50%, -50%) !important;
                background: linear-gradient(135deg, #ffffff, #f3f3f3) !important;
                color: #333 !important;
                padding: 24px !important;
                border: 1px solid #ddd !important;
                border-radius: 16px !important;
                box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15) !important;
                z-index: 10000 !important;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
                width: 400px !important;
                text-align: center !important;
                animation: fadeIn 0.4s ease-in-out !important;
            }

            @keyframes fadeIn {
                from {
                    opacity: 0;
                    transform: translate(-50%, -55%);
                }
                to {
                    opacity: 1;
                    transform: translate(-50%, -50%);
                }
            }

            #aria-label-popup h3 {
                margin: 0 0 16px !important;
                font-size: 20px !important;
                color: #007bff !important;
            }

            #aria-label-popup button {
                display: block !important;
                margin: 12px auto !important;
                padding: 12px 20px !important;
                font-size: 14px !important;
                font-weight: 600 !important;
                color: #fff !important;
                background: linear-gradient(135deg, #007bff, #0056b3) !important;
                border: none !important;
                border-radius: 24px !important;
                cursor: pointer !important;
                text-align: center !important;
                transition: all 0.3s ease !important;
                box-shadow: 0 6px 10px rgba(0, 0, 0, 0.1) !important;
                width: 80%;
            }

            #aria-label-popup button:hover {
                background: linear-gradient(135deg, #0056b3, #004099) !important;
                box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2) !important;
                transform: scale(1.05) !important;
            }

            #aria-label-popup .close-btn {
                position: absolute !important;
                top: 8px !important;
                right: 8px !important;
                background: linear-gradient(135deg, #ff4d4d, #cc0000) !important;
                color: #fff !important;
                border: none !important;
                border-radius: 50% !important;
                font-size: 16px !important;
                width: 24px !important;
                height: 24px !important;
                cursor: pointer !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1) !important;
            }

            #aria-label-popup .close-btn:hover {
                background: linear-gradient(135deg, #cc0000, #990000) !important;
                transform: scale(1.1) !important;
            }

            .aria-label-highlight {
                position: relative !important;
                outline: 2px solid #ff8800 !important;
                background-color: rgba(255, 200, 0, 0.2) !important;
                cursor: pointer !important;
            }

            .aria-label-inline {
                display: inline-block !important;
                background: #ff8800 !important;
                color: #fff !important;
                padding: 4px 8px !important;
                border-radius: 12px !important;
                font-size: 12px !important;
                margin-left: 4px !important;
                z-index: 10000 !important;
            }
        `;
        document.head.appendChild(popupStyleElement);
    }

    // Create the popup element
    const popupElement = document.createElement("div");
    popupElement.id = "aria-label-popup";
    popupElement.innerHTML = `
        <button class="close-btn">&times;</button>
        <h3>ARIA Label Tools - ALT Version 1</h3>
        <button id="highlight-only">Highlight Only</button>
        <button id="highlight-and-inline">Highlight + Inline Labels</button>
    `;
    document.body.appendChild(popupElement);

    // Close button functionality
    const closeButton = popupElement.querySelector(".close-btn");
    closeButton.onclick = function () {
        popupElement.remove();
        console.log("Popup closed.");
    };

    // Button actions
    const highlightAndInlineButton = document.getElementById("highlight-and-inline");
    const highlightOnlyButton = document.getElementById("highlight-only");

    highlightAndInlineButton.onclick = function () {
        const elementsWithAriaLabel = document.querySelectorAll("[aria-label]");
        elementsWithAriaLabel.forEach((element) => {
            if (!element.classList.contains("aria-label-highlight")) {
                element.classList.add("aria-label-highlight");
                const ariaLabel = element.getAttribute("aria-label");
                const inlineLabel = document.createElement("span");
                inlineLabel.className = "aria-label-inline";
                inlineLabel.textContent = ariaLabel;
                element.appendChild(inlineLabel);
            }
        });
        console.log(`${elementsWithAriaLabel.length} elements were highlighted and labeled.`);
    };

    highlightOnlyButton.onclick = function () {
        const elementsWithAriaLabel = document.querySelectorAll("[aria-label]");
        elementsWithAriaLabel.forEach((element) => {
            if (!element.classList.contains("aria-label-highlight")) {
                element.classList.add("aria-label-highlight");
            }
        });
        console.log(`${elementsWithAriaLabel.length} elements were highlighted.`);
    };
})();

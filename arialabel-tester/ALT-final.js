javascript: (function () {
    // Check if the popup already exists and remove it if so
    const existingPopupElement = document.getElementById('aria-label-popup');
    if (existingPopupElement) {
        existingPopupElement.remove();
        console.log('Removed existing popup.');
        return;
    }

    // Inject styles for the popup and highlights
    const popupStylesheetId = 'aria-label-popup-style';
    if (!document.getElementById(popupStylesheetId)) {
        const popupStylesheet = document.createElement('style');
        popupStylesheet.id = popupStylesheetId;
        popupStylesheet.textContent = `
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
    
        #aria-label-popup button {
            display: inline-block !important;
            margin: 12px 8px !important;
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
        }
    
        #aria-label-popup button:hover {
            background: linear-gradient(135deg, #0056b3, #004099) !important;
            box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2) !important;
            transform: scale(1.05) !important;
        }
    
        #aria-label-popup button:disabled {
            background: #c0c0c0 !important;
            cursor: not-allowed !important;
            box-shadow: none !important;
        }
    
        #aria-label-popup button:hover:enabled {
            background: linear-gradient(135deg, #0056b3, #004099) !important;
        }
    
        #aria-label-popup .close-button {
            position: absolute !important;
            top: 12px !important;
            right: 12px !important;
            background: linear-gradient(135deg, #ff4d4d, #cc0000) !important;
            color: #fff !important;
            border: none !important;
            border-radius: 20% !important;
            font-size: 16px !important;
            width: 24px !important;
            height: 24px !important;
            cursor: pointer !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1) !important;
        }
    
        #aria-label-popup .close-button:hover {
            background: linear-gradient(135deg, #cc0000, #990000) !important;
            transform: scale(1.1) !important;
        }
    
        .highlighted-aria-label {
            position: relative !important;
            outline: 3px solid #ffc107 !important;
            background-color: rgba(255, 193, 7, 0.2) !important;
            cursor: pointer !important;
            transition: all 0.3s ease-in-out !important;
        }
    
        .highlighted-aria-label:hover {
            outline: 3px solid #e6a700 !important;
            background-color: rgba(255, 193, 7, 0.3) !important;
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
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1) !important;
    z-index: 100000 !important;
    opacity: 0 !important;
    visibility: hidden !important;
    transition: all 0.3s ease-in-out !important;
    max-width: 300px !important; /* Optional: limit tooltip width */
    overflow-wrap: break-word !important; /* Handle long text gracefully */
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
    
        .inline-aria-label:hover {
            background: #0056b3 !important;
        }

        #aria-label-popup h3 {
            margin: 0 0 16px !important;
            font-size: 20px !important;
            color: #007bff !important;
        }
    `;


        document.head.appendChild(popupStylesheet);
    }

    // Create popup
    const popupElement = document.createElement('div');
    popupElement.id = 'aria-label-popup';
    popupElement.innerHTML = `
      <button class="close-button" id="close-popup">&times;</button>
        <h3>ARIA Label Tester - ALT</h3>
        <button id="highlight-and-inline-labels">Highlight and View Aria-labels in Tooltips</button>
        <button id="always-show-inline-labels">View ALL tooltips for arialabel elements</button>
        <button id="always-show-inline-labels-2">View ALL arialabels inline</button>
        <button id="remove-actions">Remove Actions</button>
    `;
    document.body.appendChild(popupElement);

    // Close button functionality
    document.querySelector('.close-button').onclick = function () {
        popupElement.remove();
        console.log('Popup closed.');
    };
    // Function to disable all buttons except "Remove Actions" and "Close Popup"
    const disableAllButtonsExceptRemove = () => {
        const buttons = popupElement.querySelectorAll('button');
        buttons.forEach((button) => {
            if (button.id !== 'remove-actions' && button.id !== 'close-popup') {
                button.disabled = true; // Disable other buttons
            }
        });
    };


    // Function to enable all buttons
    const enableAllButtons = () => {
        const buttons = popupElement.querySelectorAll('button');
        buttons.forEach((button) => {
            button.disabled = false;
        });
    };
    // Add Remove Actions button functionality
    document.getElementById('remove-actions').onclick = function () {
        enableAllButtons();
        // Remove all highlights
        document.querySelectorAll('.highlighted-aria-label').forEach((element) => {
            element.classList.remove('highlighted-aria-label');
        });
        // Remove inline labels
        document.querySelectorAll('.inline-aria-label').forEach((label) => label.remove());
        // Remove inline label containers
        document.querySelectorAll('.inline-label-container').forEach((container) => {
            const element = container.firstChild;
            container.replaceWith(element);
        });
        // Remove stylesheets added by the script
        ['highlight-aria-label-style', 'inline-aria-label-style', 'always-inline-label-style'].forEach((id) => {
            const stylesheet = document.getElementById(id);
            if (stylesheet) stylesheet.remove();
        });
        console.log('All actions have been removed.');
    };

    // Button: Combine actions
    document.getElementById('highlight-and-inline-labels').onclick = function () {
        disableAllButtonsExceptRemove();
        // Highlight elements with aria-label
        (function () {
            const highlightedElements = document.querySelectorAll('.highlighted-aria-label');
            if (highlightedElements.length > 0) {
                highlightedElements.forEach((element) => element.remove());
                console.log('Removed existing highlights.');
                return;
            }
            const highlightStylesheetId = 'highlight-aria-label-style';
            if (!document.getElementById(highlightStylesheetId)) {
                const highlightStylesheet = document.createElement('style');
                highlightStylesheet.id = highlightStylesheetId;
                highlightStylesheet.textContent = `
                    .highlighted-aria-label {
                        position: relative !important;
                        outline: 2px solid #ff8800 !important;
                        background-color: rgba(255, 200, 0, 0.2) !important;
                        cursor: pointer !important;
                    }
                `;
                document.head.appendChild(highlightStylesheet);
            }
            const elementsWithAriaLabel = document.querySelectorAll('[aria-label]');
            elementsWithAriaLabel.forEach((element) => {
                if (element.classList.contains('highlighted-aria-label')) return;
                element.classList.add('highlighted-aria-label');
            });
            console.log(`${elementsWithAriaLabel.length} elements with aria-label were highlighted.`);
        })();

        // show inline labels for elements with aria-label on hover
        (function () {
            const inlineLabels = document.querySelectorAll('.inline-aria-label');
            if (inlineLabels.length > 0) {
                inlineLabels.forEach((label) => label.remove());
                console.log('Removed inline labels.');
                return;
            }
            const inlineStylesheetId = 'inline-aria-label-style';
            if (!document.getElementById(inlineStylesheetId)) {
                const inlineStylesheet = document.createElement('style');
                inlineStylesheet.id = inlineStylesheetId;
                inlineStylesheet.textContent = `
                    .inline-aria-label {
                        display: none !important;
                        position: relative !important;
                        background: #333 !important;
                        color: #fff !important;
                        padding: 4px 8px !important;
                        border-radius: 4px !important;
                        font-size: 12px !important;
                        white-space: nowrap !important;
                        z-index: 10000 !important;
                    }
                    .inline-label-container:hover .inline-aria-label {
                        display: block !important;
                    }
                    .inline-label-container {
                        position: relative !important;
                    }
                `;
                document.head.appendChild(inlineStylesheet);
            }
            const elementsWithAriaLabel = document.querySelectorAll('[aria-label]');
            elementsWithAriaLabel.forEach((element) => {
                if (element.querySelector('.inline-aria-label')) return;
                const labelContainer = document.createElement('div');
                labelContainer.className = 'inline-label-container';
                element.parentNode.insertBefore(labelContainer, element);
                labelContainer.appendChild(element);
                const inlineLabelElement = document.createElement('div');
                inlineLabelElement.className = 'inline-aria-label';
                inlineLabelElement.textContent = element.getAttribute('aria-label');
                labelContainer.appendChild(inlineLabelElement);
            });
            console.log(`${elementsWithAriaLabel.length} elements with aria-label were labeled inline.`);
        })();
    };

    // Button: highlight and Always Show Labels
    document.getElementById('always-show-inline-labels').onclick = function () {
        disableAllButtonsExceptRemove();
        // highlight the element
        const highlightedElements = document.querySelectorAll('.highlighted-aria-label');
        if (highlightedElements.length > 0) {
            highlightedElements.forEach((element) => element.remove());
            console.log('Removed existing highlights.');
            return;
        }
        const highlightStylesheetId = 'highlight-aria-label-style';
        if (!document.getElementById(highlightStylesheetId)) {
            const highlightStylesheet = document.createElement('style');
            highlightStylesheet.id = highlightStylesheetId;
            highlightStylesheet.textContent = `
                    .highlighted-aria-label {
                        position: relative !important;
                        outline: 2px solid #ff8800 !important;
                        background-color: rgba(255, 200, 0, 0.2) !important;
                        cursor: pointer !important;
                    }
                `;
            document.head.appendChild(highlightStylesheet);
        }
        const elementsWithAriaLabel = document.querySelectorAll('[aria-label]');
        elementsWithAriaLabel.forEach((element) => {
            if (element.classList.contains('highlighted-aria-label')) return;
            element.classList.add('highlighted-aria-label');
        });
        console.log(`${elementsWithAriaLabel.length} elements with aria-label were highlighted.`);

        const inlineLabels = document.querySelectorAll('.inline-aria-label');
        if (inlineLabels.length > 0) {
            inlineLabels.forEach((label) => label.remove());
            console.log('Removed inline labels.');
            return;
        }
        const inlineStylesheetId = 'inline-aria-label-style';
        if (!document.getElementById(inlineStylesheetId)) {
            const inlineStylesheet = document.createElement('style');
            inlineStylesheet.id = inlineStylesheetId;
            inlineStylesheet.textContent = `
                .inline-aria-label {
                    display: block !important;
                    position: relative !important;
                    background: #333 !important;
                    color: #fff !important;
                    padding: 4px 8px !important;
                    border-radius: 4px !important;
                    font-size: 12px !important;
                    white-space: nowrap !important;
                    z-index: 10000 !important;
                }
                .inline-label-container {
                    position: relative !important;
                }
            `;
            document.head.appendChild(inlineStylesheet);
        }
        elementsWithAriaLabel.forEach((element) => {
            if (element.querySelector('.inline-aria-label')) return;
            const labelContainer = document.createElement('div');
            labelContainer.className = 'inline-label-container';
            element.parentNode.insertBefore(labelContainer, element);
            labelContainer.appendChild(element);
            const inlineLabelElement = document.createElement('div');
            inlineLabelElement.className = 'inline-aria-label';
            inlineLabelElement.textContent = element.getAttribute('aria-label');
            labelContainer.appendChild(inlineLabelElement);
        });
        console.log(`${elementsWithAriaLabel.length} elements with aria-label were labeled inline.`);

    };


    // Button: Always Show Inline Labels
    document.getElementById('always-show-inline-labels-2').onclick = function () {
        disableAllButtonsExceptRemove();
        // Highlight elements with aria-label
        (function () {
            const highlightedElements = document.querySelectorAll('.highlighted-aria-label');
            if (highlightedElements.length > 0) {
                highlightedElements.forEach((element) => element.remove());
                console.log('Removed existing highlights.');
                return;
            }
            const highlightStylesheetId = 'highlight-aria-label-style';
            if (!document.getElementById(highlightStylesheetId)) {
                const highlightStylesheet = document.createElement('style');
                highlightStylesheet.id = highlightStylesheetId;
                highlightStylesheet.textContent = `
                    .highlighted-aria-label {
                        position: relative !important;
                        outline: 2px solid #ff8800 !important;
                        background-color: rgba(255, 200, 0, 0.2) !important;
                        cursor: pointer !important;
                    }
                `;
                document.head.appendChild(highlightStylesheet);
            }
            const elementsWithAriaLabel = document.querySelectorAll('[aria-label]');
            elementsWithAriaLabel.forEach((element) => {
                if (element.classList.contains('highlighted-aria-label')) return;
                element.classList.add('highlighted-aria-label');
            });
            console.log(`${elementsWithAriaLabel.length} elements with aria-label were highlighted.`);
        })();
        const elementsWithAriaLabel = document.querySelectorAll('[aria-label]');
        elementsWithAriaLabel.forEach((element) => {
            if (!element.querySelector('.inline-aria-label')) {
                const inlineLabel = document.createElement('span');
                inlineLabel.className = 'inline-aria-label';
                inlineLabel.textContent = element.getAttribute('aria-label');
                element.appendChild(inlineLabel);
            }
        });
        const inlineStylesheetId = 'always-inline-label-style';
        if (!document.getElementById(inlineStylesheetId)) {
            const inlineStylesheet = document.createElement('style');
            inlineStylesheet.id = inlineStylesheetId;
            inlineStylesheet.textContent = `
                .inline-aria-label {
                    display: inline-block !important;
                }
            `;
            document.head.appendChild(inlineStylesheet);
        }
        console.log('Inline labels are now always visible.');
    };

})();

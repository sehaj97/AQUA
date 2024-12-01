javascript: (function () {
    // Check if the popup already exists and remove it if so
    const existingPopupElement = document.getElementById('aqua-popup');
    if (existingPopupElement) {
        existingPopupElement.remove();
        console.log('Removed existing popup.');
        return;
    }

    // Inject styles for the popup and highlights
    const popupStylesheetId = 'aqua-popup-style';
    if (!document.getElementById(popupStylesheetId)) {

        const popupStylesheet = document.createElement('style');
        popupStylesheet.id = popupStylesheetId;
        popupStylesheet.textContent = `
        #aqua-popup {
            position: fixed !important;
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
            background: linear-gradient(135deg, #1d1d1d, #333) !important;
            color: #ffffff !important;
            padding: 20px !important;
            border: 1px solid #444 !important;
            border-radius: 12px !important;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.6) !important;
            z-index: 10000 !important;
            font-family: 'Roboto', Arial, sans-serif !important;
            width: 360px !important;
            max-height: 75vh !important; /* Restrict height */
            overflow-y: auto !important; /* Scrollable content */
            text-align: center !important;
            animation: slideIn 0.3s ease-out !important;
        }
    
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translate(-50%, -55%);
            }
            to {
                opacity: 1;
                transform: translate(-50%, -50%);
            }
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
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2) !important;
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
    z-index: 10001 !important; /* Ensure it stays on top */
}

#aqua-popup .close-button:hover {
    background: #cc0000 !important;
}

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
    `;
        document.head.appendChild(popupStylesheet);

    }

    // Create popup
    const popupElement = document.createElement('div');
    popupElement.id = 'aqua-popup';
    // Updated popup content
    popupElement.innerHTML = `
<button class="close-button" id="close-popup">&times;</button>
<h3>AQUA</h3>
<p>
    Hi, I am <strong>Accessibility Quality User-first Assurance</strong>. You can call me AQUA. I provide tools for:
    <ul>
        <li><strong>ALT</strong> - Test aria-label attributes.</li>
        <li><strong>ARG</strong> - Run axe accessibility checks.</li>
        <li><strong>IT</strong> - Check images alt tags, formats and fallbacks.</li>
        <li><strong>FORMALT</strong> - check for forms alt, aria labels and aria labeledby.</li>
    </ul>
</p>
<h3>ALT</h3>
<div id="button-container">
<button id="highlight-and-inline-labels-skip">Highlight Aria-labels with tooltips on hover (Skip Header/Footer)</button>
<button id="always-show-inline-labels-skip">Show All Labels Always (Skip Header/Footer)</button>
    <button id="highlight-and-inline-labels">Highlight Aria-labels with tooltips on hover</button>
    <button id="always-show-inline-labels">Show Tooltips Always</button>
    <button id="always-show-inline-labels-2">Show All Labels Always</button>
</div>
<h3>ARG</h3>
<div id="button-container">
    <button id="button-arg">Run Axe Checks</button>
</div>
<h3>IT</h3>
<div id="button-container">
    <button id="show-alt-text-skip">Check Image Alt Text (Skip Header/Footer)</button>
    <button id="inline-image-labels-skip">Check Image Formats (Skip Header/Footer)</button>
    <button id="show-alt-text">Check Image Alt Text</button>
    <button id="inline-image-labels">Check Image Formats</button>
</div>
<h3>FORMALT</h3>
<div id="button-container">
    <button id="form-aria-checker">form aria checks</button>
</div>
<h3>Reset</h3>
<div id="button-container">
    <button id="remove-actions">Refresh to use other functions</button>
</div>
`;

    document.body.appendChild(popupElement);

    // Close button functionality
    document.getElementById('close-popup').addEventListener('click', function () {
        const popup = document.getElementById('aqua-popup');
        if (popup) {
            popup.remove();
            console.log('Popup closed.');
        }
    });

    // Function to disable all buttons except "Remove Actions" and "Close Popup"
    const disableAllButtonsExceptRemove = () => {
        const buttons = popupElement.querySelectorAll('button');
        buttons.forEach((button) => {
            if (button.id !== 'remove-actions' && button.id !== 'close-popup') {
                button.disabled = true; // Disable other buttons
            }
        });
    };

    document.getElementById('remove-actions').onclick = function () {
        location.reload();
    };

    // ALT Button: highlight and tooltip
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

    // ALT Button: highlight and show tooltip
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

    // ALT Button: Always Show Inline Labels
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

    // AGR Button: axe checker tool
    document.querySelector('#button-arg').onclick = function () {

        popupElement.remove();
        console.log('Popup closed.');
        // Function to show a loader while Axe is running
        function showLoader() {
            var loader = document.createElement('div');
            loader.setAttribute(
                'style',
                `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: 20px;
                color: #fff;
                background-color: rgba(0, 0, 0, 0.7);
                padding: 20px;
                border-radius: 5px;
                z-index: 9999;
            `
            );
            loader.id = `axeLoader-${Math.random().toString(36).substr(2, 9)}`; // Random ID
            loader.setAttribute('aria-hidden', 'true'); // Hide from assistive tech
            loader.textContent = 'Running accessibility checks...';
            document.body.appendChild(loader);
        }

        // Function to hide the loader when results are ready
        function hideLoader() {
            var loader = document.querySelector('[id^="axeLoader"]');
            if (loader) {
                loader.remove();
            }
        }

        function injectAxeAndRun() {
            if (typeof axe === 'undefined') {
                var script = document.createElement('script');
                script.src = 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.10.0/axe.min.js';
                script.onload = function () {
                    runAxe();
                };
                document.head.appendChild(script);
            } else {
                runAxe();
            }
        }

        function runAxe() {
            showLoader(); // Show loader before running Axe
            axe.run(
                document,
                {
                    runOnly: {
                        type: 'tag',
                        values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'],
                    },
                    resultTypes: ['violations', 'incomplete'],
                    iframes: true,
                    shadowDom: true,
                    exclude: [['[id^="axeLoader"]', '[id^="aqua-popup"]']], // Use prefix selector to ignore all id's
                },
                function (error, results) {
                    hideLoader(); // Hide loader after results are ready
                    if (error) {
                        console.error(error);
                        return;
                    }
                    displayResults(results);
                }
            );
        }

        function displayResults(results) {
            // Create a container div for the results overlay
            var container = document.createElement('div');
            container.setAttribute(
                'style',
                `
                position: fixed;
                top: 10%;
                left: 25%;
                width: 50%;
                height: 80%;
                background-color: #fff;
                color: #000;
                overflow: auto;
                z-index: 9999;
                padding: 60px 20px 20px 20px;
                box-shadow: 0 0 10px rgba(0,0,0,0.5);
                font-family: Arial, sans-serif;
                border-radius: 8px;
            `
            );

            container.setAttribute(
                'id',
                `arg-popup`
            );
            // Rest of your code for displaying results
            // Array to keep track of highlighted elements
            var highlightedElements = [];

            // Function to highlight an element
            function highlightElement(targetSelector) {
                var element = document.querySelector(targetSelector);
                if (!element) return;

                // Save the original border style
                var originalBorder = element.getAttribute('data-original-border');
                if (!originalBorder) {
                    originalBorder = element.style.border;
                    element.setAttribute('data-original-border', originalBorder);
                }
                // Apply highlight style
                element.style.border = '5px solid red';

                // Keep track of highlighted elements
                if (!highlightedElements.includes(element)) {
                    highlightedElements.push(element);
                }
            }

            // Create a close button for the overlay
            var closeBtn = document.createElement('button');
            closeBtn.textContent = 'X';
            closeBtn.setAttribute(
                'style',
                `
                position: fixed;
                top: calc(10% + 10px);
                right: calc(25% + 10px);
                padding: 5px 10px;
                background-color: #f44336;
                color: #fff;
                border: none;
                border-radius: 3px;
                cursor: pointer;
                z-index: 10000;
            `
            );
            closeBtn.onclick = function () {
                document.body.removeChild(container);
                document.body.removeChild(closeBtn);
                document.body.removeChild(highlightAllBtn);
            };
            document.body.appendChild(closeBtn);

            // Create a button to highlight all violations
            var highlightAllBtn = document.createElement('button');
            highlightAllBtn.textContent = 'Highlight All Issues';
            highlightAllBtn.setAttribute(
                'style',
                `
                position: fixed;
                top: calc(10% + 50px);
                right: calc(25% + 10px);
                padding: 5px 10px;
                background-color: #2196F3;
                color: #fff;
                border: none;
                border-radius: 3px;
                cursor: pointer;
                z-index: 10000;
            `
            );
            highlightAllBtn.onclick = function () {
                highlightAllViolations(results.violations);
            };
            document.body.appendChild(highlightAllBtn);

            // Function to highlight all violation elements
            function highlightAllViolations(violations) {
                violations.forEach(function (violation) {
                    violation.nodes.forEach(function (node) {
                        if (node.target && node.target.length > 0) {
                            node.target.forEach(function (targetSelector) {
                                highlightElement(targetSelector);
                            });
                        }
                    });
                });
            }

            // Function to create sections for each result type
            function createSection(titleText, items, type) {
                var card = document.createElement('details');
                card.setAttribute('style', 'margin-bottom: 15px; border: 1px solid #ddd; border-radius: 5px; padding: 10px; background-color: #f9f9f9;');
                var summary = document.createElement('summary');
                summary.textContent = titleText;
                summary.setAttribute('style', 'font-weight: bold; cursor: pointer;');
                card.appendChild(summary);
                var section = document.createElement('div');

                if (items.length > 0) {
                    items.forEach(function (item, index) {
                        var details = document.createElement('details');
                        details.setAttribute('style', 'margin-bottom: 10px;');
                        var summary = document.createElement('summary');
                        summary.setAttribute('style', 'cursor: pointer; font-weight: bold;');
                        summary.textContent = (index + 1) + '. ' + item.description;
                        details.appendChild(summary);

                        var contentDiv = document.createElement('div');
                        contentDiv.setAttribute('style', 'margin-left: 20px; margin-top: 5px;');
                        var explanation = document.createElement('p');
                        explanation.textContent = getFriendlyExplanation(item, type);
                        contentDiv.appendChild(explanation);

                        var learnMoreLink = document.createElement('a');
                        learnMoreLink.href = item.helpUrl;
                        learnMoreLink.textContent = 'Learn more about this issue';
                        learnMoreLink.target = '_blank';
                        learnMoreLink.setAttribute('style', 'display: block; margin-bottom: 10px; color: #2196F3; text-decoration: none;');
                        contentDiv.appendChild(learnMoreLink);

                        if (item.nodes && item.nodes.length > 0) {
                            var nodesList = document.createElement('ul');
                            item.nodes.forEach(function (node) {
                                var nodeItem = document.createElement('li');
                                var codeBlock = document.createElement('code');
                                codeBlock.textContent = node.html.trim();
                                codeBlock.setAttribute('style', 'display: block; background-color: #f5f5f5; padding: 5px; border-radius: 3px; margin-bottom: 5px; white-space: pre-wrap;');
                                var highlightLink = document.createElement('a');
                                highlightLink.href = '#';
                                highlightLink.textContent = 'Highlight Element on Page';
                                highlightLink.style.color = '#2196F3';
                                highlightLink.style.textDecoration = 'none';

                                if (node.target && node.target.length > 0) {
                                    var targetSelector = node.target[0];
                                    highlightLink.onclick = function (e) {
                                        e.preventDefault();
                                        var element = document.querySelector(targetSelector);
                                        if (element) {
                                            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                            highlightElement(targetSelector);
                                        }
                                    };
                                } else {
                                    highlightLink.style.color = 'gray';
                                    highlightLink.onclick = function (e) {
                                        e.preventDefault();
                                    };
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
                    var noItems = document.createElement('p');
                    noItems.textContent = 'No issues found in this category.';
                    section.appendChild(noItems);
                }

                card.appendChild(section);
                container.appendChild(card);
            }

            // Function to provide user-friendly explanations
            function getFriendlyExplanation(item, type) {
                switch (type) {
                    case 'violations':
                        return 'Issue: ' + item.description + ' This needs to be fixed to improve accessibility.';
                    case 'incomplete':
                        return 'This item requires manual review to determine if there is an accessibility issue.';
                    default:
                        return '';
                }
            }

            // Display Violations
            createSection('Accessibility Issues to Fix:', results.violations, 'violations');
            // Display Incomplete
            createSection('Accessibility Issues Needing Manual Review:', results.incomplete, 'incomplete');
            // Append the results container to the body
            document.body.appendChild(container);
        }

        // Wait for the page to fully load before running the accessibility checks
        if (document.readyState === 'complete') {
            injectAxeAndRun();
        } else {
            window.addEventListener('load', injectAxeAndRun);
        }
    };

    // IT Button: Inline Labels for Images format checks
    document.getElementById('inline-image-labels').onclick = function () {
        disableAllButtonsExceptRemove();

        // Add inline labels
        (function () {
            // Remove existing inline labels if present
            const inlineLabels = document.querySelectorAll('.inline-image-label');
            if (inlineLabels.length > 0) {
                inlineLabels.forEach((label) => label.remove());
                console.log('Removed existing inline labels.');
                return;
            }

            // Add inline styles if not already present
            const inlineStylesheetId = 'inline-image-style';
            if (!document.getElementById(inlineStylesheetId)) {
                const inlineStylesheet = document.createElement('style');
                inlineStylesheet.id = inlineStylesheetId;
                inlineStylesheet.textContent = `
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
            `;
                document.head.appendChild(inlineStylesheet);
            }

            // Find images and picture elements
            const images = document.querySelectorAll('img, picture, svg');

            images.forEach((image) => {
                if (image.querySelector('.inline-image-label')) return;

                // Determine inline label content
                let labelContent = '';
                if (image.tagName.toLowerCase() === 'img') {
                    const src = image.src || 'unknown';
                    const ext = src.split('.').pop().split('?')[0].toLowerCase();
                    labelContent = `Image: ${ext || 'unknown'}`;
                } else if (image.tagName.toLowerCase() === 'picture') {
                    const sources = Array.from(image.querySelectorAll('source'));
                    const fallback = image.querySelector('img');
                    const types = sources.map((src) => src.type || 'unknown');
                    const fallbackType = fallback ? fallback.src.split('.').pop().split('?')[0].toLowerCase() : 'none';
                    labelContent = `Picture with fallbacks: ${types.join(', ')}; Fallback: ${fallbackType}`;
                }

                // Add inline label
                const label = document.createElement('span');
                label.className = 'inline-image-label';
                label.textContent = labelContent;
                image.parentNode.insertBefore(label, image.nextSibling);
            });

            console.log(`${images.length} images and picture tags labeled inline.`);
        })();
    };

    // Highlight Aria-labels (Skip Header/Footer)
    document.getElementById('highlight-and-inline-labels-skip').onclick = function () {
        disableAllButtonsExceptRemove();

        // Highlight elements with aria-label
        (function () {
            const highlightedElements = document.querySelectorAll('.highlighted-aria-label');
            if (highlightedElements.length > 0) {
                highlightedElements.forEach((element) => element.classList.remove('highlighted-aria-label'));
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

            const elementsWithAriaLabel = Array.from(document.querySelectorAll('[aria-label]'))
                .filter((element) => !element.closest('header, footer')); // Skip elements inside header and footer

            elementsWithAriaLabel.forEach((element) => {
                if (!element.classList.contains('highlighted-aria-label')) {
                    element.classList.add('highlighted-aria-label');
                }
            });

            console.log(`${elementsWithAriaLabel.length} elements with aria-label were highlighted, excluding header and footer.`);
        })();

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
            const elementsWithAriaLabel = Array.from(document.querySelectorAll('[aria-label]'))
                .filter((element) => !element.closest('header, footer')); // Skip elements inside header and footer

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

    // Show always Tooltips (Skip Header/Footer)
    document.getElementById('always-show-inline-labels-skip').onclick = function () {
        disableAllButtonsExceptRemove();
        // Highlight elements with aria-label
        (function () {
            const highlightedElements = document.querySelectorAll('.highlighted-aria-label');
            if (highlightedElements.length > 0) {
                highlightedElements.forEach((element) => element.classList.remove('highlighted-aria-label'));
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

            const elementsWithAriaLabel = Array.from(document.querySelectorAll('[aria-label]'))
                .filter((element) => !element.closest('header, footer')); // Skip elements inside header and footer

            elementsWithAriaLabel.forEach((element) => {
                if (!element.classList.contains('highlighted-aria-label')) {
                    element.classList.add('highlighted-aria-label');
                }
            });

            console.log(`${elementsWithAriaLabel.length} elements with aria-label were highlighted, excluding header and footer.`);
        })();

        const elementsWithAriaLabel = Array.from(document.querySelectorAll('[aria-label]'))
            .filter((element) => !element.closest('header, footer')); // Skip elements inside header and footer

        // Remove existing inline tooltips
        document.querySelectorAll('.inline-aria-label').forEach((tooltip) => {
            tooltip.remove();
        });

        // Add inline tooltips to filtered elements
        elementsWithAriaLabel.forEach((element) => {
            const tooltip = document.createElement('div');
            tooltip.className = 'inline-aria-label';
            tooltip.textContent = element.getAttribute('aria-label');
            element.appendChild(tooltip);
        });

        console.log(`${filteredElements.length} tooltips added for aria-label elements, excluding header/footer.`);
    };

    document.getElementById('inline-image-labels-skip').onclick = function () {
        {
            disableAllButtonsExceptRemove();

            // Add inline labels
            (function () {
                // Remove existing inline labels if present
                const inlineLabels = document.querySelectorAll('.inline-image-label');
                if (inlineLabels.length > 0) {
                    inlineLabels.forEach((label) => label.remove());
                    console.log('Removed existing inline labels.');
                    return;
                }

                // Add inline styles if not already present
                const inlineStylesheetId = 'inline-image-style';
                if (!document.getElementById(inlineStylesheetId)) {
                    const inlineStylesheet = document.createElement('style');
                    inlineStylesheet.id = inlineStylesheetId;
                    inlineStylesheet.textContent = `
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
                `;
                    document.head.appendChild(inlineStylesheet);
                }
                const images = Array.from(document.querySelectorAll('img, picture'))
                    .filter((element) => !element.closest('header, footer')); // Skip elements inside header and footer

                images.forEach((image) => {
                    if (image.querySelector('.inline-image-label')) return;

                    // Determine inline label content
                    let labelContent = '';
                    if (image.tagName.toLowerCase() === 'img') {
                        const src = image.src || 'unknown';
                        const ext = src.split('.').pop().split('?')[0].toLowerCase();
                        labelContent = `Image: ${ext || 'unknown'}`;
                    } else if (image.tagName.toLowerCase() === 'picture') {
                        const sources = Array.from(image.querySelectorAll('source'));
                        const fallback = image.querySelector('img');
                        const types = sources.map((src) => src.type || 'unknown');
                        const fallbackType = fallback ? fallback.src.split('.').pop().split('?')[0].toLowerCase() : 'none';
                        labelContent = `Picture with fallbacks: ${types.join(', ')}; Fallback: ${fallbackType}`;
                    }

                    // Add inline label
                    const label = document.createElement('span');
                    label.className = 'inline-image-label';
                    label.textContent = labelContent;
                    image.parentNode.insertBefore(label, image.nextSibling);
                });

                console.log(`${images.length} images and picture tags labeled inline.`);
            })();
        }
    };

    document.getElementById('form-aria-checker').onclick = function () {
        // Inject styles for highlights and tooltips
        const formCheckerStylesheetId = 'form-checker-style';
        if (!document.getElementById(formCheckerStylesheetId)) {
            const formCheckerStylesheet = document.createElement('style');
            formCheckerStylesheet.id = formCheckerStylesheetId;
            formCheckerStylesheet.textContent = `
                .form-check-highlight {
                    position: relative;
                    outline: 2px solid red;
                    background-color: rgba(255, 0, 0, 0.1);
                }
    
                .form-check-valid {
                    position: relative;
                    outline: 2px solid green;
                    background-color: rgba(0, 255, 0, 0.1);
                }
    
                .form-check-tooltip {
                    position: absolute;
                    top: -30px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: #333;
                    color: #fff;
                    padding: 6px 12px;
                    border-radius: 4px;
                    font-size: 12px;
                    z-index: 1000;
                    white-space: nowrap;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    opacity: 1;
                    transition: opacity 0.2s ease, visibility 0.2s ease;
                }
            `;
            document.head.appendChild(formCheckerStylesheet);
        }

        // Check all input, textarea, select, and fieldset elements within forms
        document.querySelectorAll('form input, form textarea, form select, form fieldset').forEach((element) => {
            // Remove existing highlights and tooltips
            element.classList.remove('form-check-highlight', 'form-check-valid');
            const existingTooltip = element.parentNode.querySelector('.form-check-tooltip');
            if (existingTooltip) existingTooltip.remove();

            // Skip elements with aria-hidden="true"
            if (element.getAttribute('aria-hidden') === 'true') {
                return;
            }

            let tooltipMessage = '';
            let isValid = true;

            // Check for aria-labelledby
            const labelledBy = element.getAttribute('aria-labelledby');
            if (labelledBy) {
                const ids = labelledBy.trim().split(/\s+/); // Split by whitespace
                let hasValidId = false;

                ids.forEach((id) => {
                    const labelElement = document.getElementById(id);
                    if (labelElement) {
                        hasValidId = true;
                        tooltipMessage += `aria-labelledby "${id}": "${labelElement.textContent.trim() || 'No visible text'}". `;
                    } else {
                        tooltipMessage += `Invalid aria-labelledby ID: "${id}". `;
                    }
                });

                if (!hasValidId) {
                    isValid = false;
                }
            }

            // Check for aria-label
            const ariaLabel = element.getAttribute('aria-label');
            if (ariaLabel !== null) {
                if (!ariaLabel.trim() || ariaLabel.trim().length < 3) {
                    tooltipMessage += 'aria-label is empty or not meaningful. ';
                    isValid = false;
                } else {
                    tooltipMessage += `aria-label: "${ariaLabel.trim()}". `;
                }
            }

            // Highlight element and add tooltip
            if (!isValid) {
                element.classList.add('form-check-highlight');

                // Create a tooltip for invalid elements
                const tooltip = document.createElement('div');
                tooltip.className = 'form-check-tooltip';
                tooltip.textContent = tooltipMessage.trim();
                element.parentNode.style.position = 'relative'; // Ensure the parent has position
                element.parentNode.appendChild(tooltip);
            } else {
                // Mark valid elements
                element.classList.add('form-check-valid');

                // Create a tooltip for valid elements
                const tooltip = document.createElement('div');
                tooltip.className = 'form-check-tooltip';
                tooltip.textContent = `Accessible element: ${tooltipMessage.trim()}`;
                element.parentNode.style.position = 'relative'; // Ensure the parent has position
                element.parentNode.appendChild(tooltip);
            }
        });

        console.log('Form accessibility issues have been checked.');
    };

    document.getElementById('show-alt-text').onclick = function () {
        // Inject styles for alt-text labels
        const altTextStylesheetId = 'alt-text-style';
        if (!document.getElementById(altTextStylesheetId)) {
            const altTextStylesheet = document.createElement('style');
            altTextStylesheet.id = altTextStylesheetId;
            altTextStylesheet.textContent = `
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
                    background-color: rgba(0, 123, 255, 0.1) !important;
                }
            `;
            document.head.appendChild(altTextStylesheet);
        }

        // Function to find accessible text
        const findAccessibleText = (element) => {
            const alt = element.getAttribute('alt');
            const ariaLabel = element.getAttribute('aria-label');
            const labelledById = element.getAttribute('aria-labelledby');
            const labelledByElement = labelledById ? document.getElementById(labelledById) : null;

            if (alt) return `Alt: "${alt}"`;
            if (ariaLabel) return `Aria-label: "${ariaLabel}"`;
            if (labelledByElement) return `Aria-labelledby: "${labelledByElement.textContent.trim()}"`;
            return null;
        };

        // Function to find parent accessible text
        const findParentAccessibleText = (element) => {
            let parent = element.parentElement;
            while (parent) {
                const accessibleText = findAccessibleText(parent);
                if (accessibleText) return accessibleText;
                parent = parent.parentElement;
            }
            return 'No accessible text found.';
        };

        // Highlight and label elements
        const elements = document.querySelectorAll('img, picture, svg');
        elements.forEach((element) => {
            element.classList.add('highlighted-media');

            // Remove existing labels
            const existingLabel = element.querySelector('.alt-text-label');
            if (existingLabel) existingLabel.remove();

            // Find accessible text
            let accessibleText = findAccessibleText(element);
            if (!accessibleText) {
                accessibleText = findParentAccessibleText(element);
            }

            // Add label
            const label = document.createElement('span');
            label.className = 'alt-text-label';
            label.textContent = accessibleText;
            element.style.position = 'relative';
            element.parentNode.insertBefore(label, element.nextSibling);
        });

        console.log(`${elements.length} media elements labeled with accessible text.`);
    };

    document.getElementById('show-alt-text-skip').onclick = function () {
        // Inject styles for alt-text labels
        const altTextStylesheetId = 'alt-text-style';
        if (!document.getElementById(altTextStylesheetId)) {
            const altTextStylesheet = document.createElement('style');
            altTextStylesheet.id = altTextStylesheetId;
            altTextStylesheet.textContent = `
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
                    background-color: rgba(0, 123, 255, 0.1) !important;
                }
            `;
            document.head.appendChild(altTextStylesheet);
        }

        // Function to find accessible text
        const findAccessibleText = (element) => {
            const alt = element.getAttribute('alt');
            const ariaLabel = element.getAttribute('aria-label');
            const labelledById = element.getAttribute('aria-labelledby');
            const labelledByElement = labelledById ? document.getElementById(labelledById) : null;

            if (alt) return `Alt: "${alt}"`;
            if (ariaLabel) return `Aria-label: "${ariaLabel}"`;
            if (labelledByElement) return `Aria-labelledby: "${labelledByElement.textContent.trim()}"`;
            return null;
        };

        // Function to find parent accessible text
        const findParentAccessibleText = (element) => {
            let parent = element.parentElement;
            while (parent) {
                const accessibleText = findAccessibleText(parent);
                if (accessibleText) return accessibleText;
                parent = parent.parentElement;
            }
            return 'No accessible text found.';
        };

        // Highlight and label elements
        const elements = Array.from(document.querySelectorAll('img, picture, svg'))
            .filter((element) => !element.closest('header, footer'));
        elements.forEach((element) => {
            element.classList.add('highlighted-media');

            // Remove existing labels
            const existingLabel = element.querySelector('.alt-text-label');
            if (existingLabel) existingLabel.remove();

            // Find accessible text
            let accessibleText = findAccessibleText(element);
            if (!accessibleText) {
                accessibleText = findParentAccessibleText(element);
            }

            // Add label
            const label = document.createElement('span');
            label.className = 'alt-text-label';
            label.textContent = accessibleText;
            element.style.position = 'relative';
            element.parentNode.insertBefore(label, element.nextSibling);
        });

        console.log(`${elements.length} media elements labeled with accessible text.`);
    };

})();

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
            background: linear-gradient(135deg, #ffffff, #f3f3f3) !important;
            color: #333 !important;
            padding: 16px 24px !important;
            border: 1px solid #ddd !important;
            border-radius: 16px !important;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15) !important;
            z-index: 10000 !important;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
            width: 400px !important;
            max-height: 80vh !important; /* Restrict height */
            overflow-y: auto !important; /* Scrollable content */
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

        #aqua-popup button {
            display: inline-block !important;
            margin: 8px 4px !important;
            padding: 8px 16px !important;
            font-size: 14px !important;
            font-weight: 600 !important;
            color: #fff !important;
            background: linear-gradient(135deg, #007bff, #0056b3) !important;
            border: none !important;
            border-radius: 16px !important;
            cursor: pointer !important;
            text-align: center !important;
            transition: all 0.3s ease !important;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1) !important;
        }

        #aqua-popup button:hover {
            background: linear-gradient(135deg, #0056b3, #004099) !important;
            transform: scale(1.05) !important;
        }

        #aqua-popup button:disabled {
            background: #c0c0c0 !important;
            cursor: not-allowed !important;
            box-shadow: none !important;
        }

        #aqua-popup .close-button {
            position: absolute !important;
            top: 8px !important;
            right: 8px !important;
            background: #ff4d4d !important;
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
        }

        #aqua-popup .close-button:hover {
            background: #cc0000 !important;
        }

        #aqua-popup h3 {
            margin: 8px 0 12px !important;
            font-size: 18px !important;
            color: #007bff !important;
        }

        #aqua-popup p {
            font-size: 14px !important;
            margin-bottom: 12px !important;
            line-height: 1.4 !important;
        }

        #aqua-popup ul {
            text-align: left !important;
            margin: 0 0 16px !important;
            padding: 0 16px !important;
            list-style: disc !important;
        }

        #aqua-popup ul li {
            margin-bottom: 8px !important;
            font-size: 14px !important;
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
#button-container {
    display: flex !important;
    flex-wrap: wrap !important;
    justify-content: center !important;
    gap: 8px !important; /* Space between buttons */
    margin-top: 16px !important;
}

#button-container button {
    flex: 1 1 auto !important; /* Make buttons flexible */
    max-width: 180px !important; /* Optional: Limit button width */
    text-align: center !important;
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
        <li><strong>IT</strong> - Check image formats and fallbacks.</li>
    </ul>
</p>
<h3>ALT</h3>
<div id="button-container">
    <button id="highlight-and-inline-labels">Highlight Aria-labels and view on hover</button>
    <button id="always-show-inline-labels">Show Tooltips</button>
    <button id="always-show-inline-labels-2">Inline Labels</button>
<button id="highlight-and-inline-labels-skip">Highlight Aria-labels (Skip Header/Footer)</button>
<button id="always-show-inline-labels-skip">Show Tooltips (Skip Header/Footer)</button>
</div>
<h3>ARG</h3>
<div id="button-container">
    <button id="button-arg">Run Axe Checks</button>
</div>
<h3>IT</h3>
<div id="button-container">
    <button id="inline-image-labels">Check Image Formats</button>
    <button id="inline-image-labels-skip">Check Image Formats (Skip Header/Footer)</button>
    <button id="show-alt-text">Check Image Alt Text</button>
    <button id="show-alt-text-skip">Check Image Alt Text (Skip Header/Footer)</button>
</div>
<div id="button-container">
    <button id="remove-actions">Reset Highlights</button>
</div>
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
        ['highlight-aria-label-style', 'inline-aria-label-style', 'always-inline-label-style', 'highlight-image-style', 'inline-image-style'].forEach((id) => {
            const stylesheet = document.getElementById(id);
            if (stylesheet) stylesheet.remove();
        });
        console.log('All actions have been removed.');
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

    // IT Button: Inline Labels for Images
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
            const images = document.querySelectorAll('img, picture');
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

    // IT Button:  show alt texts
    document.getElementById('show-alt-text').onclick = function () {
        disableAllButtonsExceptRemove();

        // Add alt text labels
        (function () {
            // Remove existing alt text labels if present
            const altLabels = document.querySelectorAll('.alt-text-label');
            if (altLabels.length > 0) {
                altLabels.forEach((label) => label.remove());
                console.log('Removed existing alt text labels.');
                return;
            }

            // Add alt text styles if not already present
            const altTextStylesheetId = 'alt-text-style';
            if (!document.getElementById(altTextStylesheetId)) {
                const altTextStylesheet = document.createElement('style');
                altTextStylesheet.id = altTextStylesheetId;
                altTextStylesheet.textContent = `
                    .alt-text-label {
                        display: inline-block !important;
                        background: #ffc107  !important;
                        color: #fff !important;
                        padding: 4px 8px !important;
                        border-radius: 6px !important;
                        font-size: 12px !important;
                        margin-left: 6px !important;
                        white-space: nowrap !important;
                        z-index: 10000 !important;
                    }
                `;
                document.head.appendChild(altTextStylesheet);
            }

            // Find images
            const images = document.querySelectorAll('img');
            images.forEach((image) => {
                if (image.querySelector('.alt-text-label')) return;

                // Determine alt text content
                const altText = image.getAttribute('alt') || 'No alt text';

                // Create label for alt text
                const altLabel = document.createElement('span');
                altLabel.className = 'alt-text-label';
                altLabel.textContent = `Alt: ${altText}`;

                // Add label next to the image
                image.parentNode.insertBefore(altLabel, image.nextSibling);
            });

            console.log(`${images.length} images labeled with alt text.`);
        })();
    };

    // remove from header and footer
    const hideHeaderFooterChanges = (className) => {
        document.querySelectorAll('header, footer').forEach((element) => {
            element.querySelectorAll(`.${className}`).forEach((child) => {
                child.remove();
            });
        });
    };

    // Updated duplicate buttons with simplified skip logic

    document.getElementById('highlight-and-inline-labels-skip').onclick = function () {
        document.getElementById('highlight-and-inline-labels').click(); // Run the existing function
        hideHeaderFooterChanges('highlighted-aria-label'); // Remove highlights in header/footer
        console.log('Highlighted aria-labels (skipping header and footer).');
    };

    document.getElementById('always-show-inline-labels-skip').onclick = function () {
        document.getElementById('always-show-inline-labels').click(); // Run the existing function
        hideHeaderFooterChanges('inline-aria-label'); // Remove tooltips in header/footer
        console.log('Displayed tooltips for aria-labels (skipping header and footer).');
    };

    document.getElementById('inline-image-labels-skip').onclick = function () {
        document.getElementById('inline-image-labels').click(); // Run the existing function
        hideHeaderFooterChanges('inline-image-label'); // Remove inline image labels in header/footer
        console.log('Displayed image formats (skipping header and footer).');
    };

    document.getElementById('show-alt-text-skip').onclick = function () {
        document.getElementById('show-alt-text').click(); // Run the existing function
        hideHeaderFooterChanges('alt-text-label'); // Remove alt text labels in header/footer
        console.log('Displayed alt text for images (skipping header and footer).');
    };

})();

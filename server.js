import express, { json } from 'express';
import puppeteer from 'puppeteer-extra';
import { AxePuppeteer } from '@axe-core/puppeteer';
import { join } from 'path';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

puppeteer.use(StealthPlugin());

const app = express();
app.use(json());
app.use(express.static('.'));

// Function to analyze a single URL
async function analyzeUrl(url) {
    try {
        const browser = await puppeteer.launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--ignore-certificate-errors',
                '--ignore-certificate-errors-spki-list',
                '--disable-gpu',
                '--disable-dev-shm-usage',
            ],
        });
        const page = await browser.newPage();

        await page.setUserAgent(
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) ' +
            'AppleWebKit/537.36 (KHTML, like Gecko) ' +
            'Chrome/114.0.5735.198 Safari/537.36'
        );
        await page.setExtraHTTPHeaders({
            'Accept-Language': 'en-US,en;q=0.9',
        });
        await page.setRequestInterception(true);
        page.on('request', (request) => {
            const resourceType = request.resourceType();
            if (['image', 'media', 'stylesheet', 'font'].includes(resourceType)) {
                request.abort(); // Block these resources
            } else {
                request.continue();
            }
        });
        await page.goto(url, { waitUntil: 'load', timeout: 600000 });
        // Inject the axe-core CDN script
        await page.addScriptTag({
            url: 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.4.1/axe.min.js'
        });
        const memoryBefore = await page.metrics();
        console.log("Memory usage before Axe:", memoryBefore);
        const results = await page.evaluate(async () => {
            // Ensure axe is available in the page context
            if (!window.axe) throw new Error('axe-core not found on the page');

            // Run axe analysis with specific rules and options (customize as needed)
            return await window.axe.run({
                runOnly: {
                    type: 'tag',
                    values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'],
                },
                resultTypes: ['violations'],
                iframes: false,
                shadowDom: false,
            });
        });

        const memoryAfter = await page.metrics();
        console.log("Memory usage after Axe:", memoryAfter);
        await browser.close();
        return { url, violations: results.violations };
    } catch (error) {
        console.error(`Error during analysis of ${url}:`, error);
        return { url, error: error.message };
    }
}

// Endpoint to handle multiple URLs for accessibility analysis
app.post('/analyze-multiple', async (req, res) => {
    const urls = req.body.urls;

    if (!Array.isArray(urls) || urls.length === 0) {
        res.json({ error: 'No URLs provided or invalid format.' });
        return;
    }

    try {
        // Analyze all URLs asynchronously
        const results = await Promise.all(urls.map(analyzeUrl));
        res.json({ results });
    } catch (error) {
        console.error('Error during analysis:', error);
        res.json({ error: 'An error occurred during the analysis.' });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

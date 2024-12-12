import express, { json } from 'express';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import chromium from '@sparticuz/chromium';

const __dirname = dirname(fileURLToPath(import.meta.url));
puppeteer.use(StealthPlugin());

const app = express();
app.use(json());
app.use(express.static('.'));

// Function to analyze a single URL
async function analyzeUrl(browser, url) {
    try {
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
        return { url, violations: results.violations };
    } catch (error) {
        console.error(`Error during analysis of ${url}:`, error);
        return { url, error: error.message };
    }
}

async function analyzeMultipleUrls(urls) {

    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || '/app/.apt/usr/bin/google-chrome'
    });

    const results = [];
    try {
        for (const url of urls) {
            const result = await analyzeUrl(browser, url);
            results.push(result);
        }
    } finally {
        await browser.close();
    }
    return results;
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
        const results = await analyzeMultipleUrls(urls);
        res.json({ results });
    } catch (error) {
        console.error('Error during analysis:', error);
        res.json({ error: 'An error occurred during the analysis.' });
    }
});

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, "index.html"));
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

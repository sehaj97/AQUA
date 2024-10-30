import express, { json } from 'express';
import puppeteer from 'puppeteer-extra';
import { AxePuppeteer } from '@axe-core/puppeteer';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import path from 'path';
import { fileURLToPath } from 'url';

puppeteer.use(StealthPlugin());

const app = express();
app.use(json());
app.use(express.static('.'));

// Get directory name for static file serving in ES modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Utility function to sanitize and validate URLs
function cleanUrl(url) {
    // Trim whitespace and remove URL parameters and fragments
    url = url.trim().split(/[?#]/)[0];

    // Ensure URL starts with http/https and contains "www"
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
    }
    if (!url.includes('www.')) {
        url = url.replace(/https?:\/\//, '$&www.');
    }

    // Ensure URL ends with "/"
    if (!url.endsWith('/')) {
        url += '/';
    }

    return url;
}

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

        await page.setExtraHTTPHeaders({ 'Accept-Language': 'en-US,en;q=0.9' });
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 120000 });

        const results = await new AxePuppeteer(page).analyze();
        await browser.close();

        return { url, violations: results.violations };
    } catch (error) {
        console.error(`Error during analysis of ${url}:`, error);
        return { url, error: error.message };
    }
}

// Endpoint to handle multiple URLs for accessibility analysis
app.post('/analyze-multiple', async (req, res) => {
    let { urls } = req.body;

    if (!Array.isArray(urls) || urls.length === 0) {
        res.json({ error: 'No URLs provided or invalid format.' });
        return;
    }

    // Clean and validate URLs
    urls = urls.map(cleanUrl);

    const noIssues = [];
    const withIssues = [];
    const errors = [];

    for (const url of urls) {
        const result = await analyzeUrl(url);
        if (result.error) {
            errors.push(result);
        } else if (result.violations.length === 0) {
            noIssues.push(result);
        } else {
            withIssues.push(result);
        }
    }

    // Send the grouped results
    res.json({
        noIssues,
        withIssues,
        errors,
        totalProcessed: urls.length,
    });
});

// Root route to serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index2.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

import express, { json } from 'express';
import puppeteer from 'puppeteer-extra';
import { AxePuppeteer } from '@axe-core/puppeteer';
import { join } from 'path';

// Add stealth plugin and use defaults (all tricks to hide Puppeteer usage)
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
puppeteer.use(StealthPlugin());

const app = express();
app.use(json());

// Serve static files from the 'public' directory
app.use(express.static('.'));

// Endpoint to handle the accessibility analysis
app.post('/analyze', async (req, res) => {
    const url = req.body.url;

    if (!url) {
        res.json({ error: 'No URL provided.' });
        return;
    }

    try {
        // Launch Puppeteer with additional arguments
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

        // Set a custom user agent
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) ' +
            'AppleWebKit/537.36 (KHTML, like Gecko) ' +
            'Chrome/114.0.5735.198 Safari/537.36');

        // Optionally, set extra HTTP headers
        await page.setExtraHTTPHeaders({
            'Accept-Language': 'en-US,en;q=0.9',
        });

        // Navigate to the URL with increased timeout
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 120000 });

        // Run axe-core analysis
        const results = await new AxePuppeteer(page).analyze();

        await browser.close();

        res.json({ violations: results.violations });
    } catch (error) {
        console.error('Error during analysis:', error);
        res.json({ error: error.message });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

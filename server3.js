import express from 'express';
import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
app.use(express.json());

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.post('/analyze-multiple', async (req, res) => {
    const urls = req.body.urls;

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
        res.status(400).json({ error: 'No URLs provided or invalid format.' });
        return;
    }

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

        // Analyze each URL in parallel
        const results = await Promise.all(urls.map(async (url) => {
            const page = await browser.newPage();
            try {
                await page.setRequestInterception(true);
                page.on('request', (request) => {
                    const resourceType = request.resourceType();
                    if (['image', 'media', 'stylesheet', 'font'].includes(resourceType)) {
                        request.abort(); // Block these resources
                    } else {
                        request.continue();
                    }
                });
                await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 300000 });

                // Inject the `axe-core` script from the CDN
                await page.addScriptTag({ url: 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.10.0/axe.min.js' });

                // Wait for `axe` to be available, then run it
                const analysis = await page.evaluate(async () => {
                    return await axe.run({
                        runOnly: {
                            type: 'tag',
                            values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'],
                        },
                        resultTypes: ['violations'],
                        iframes: false,
                        shadowDom: false,
                    });
                });

                return { url, violations: analysis.violations };
            } catch (error) {
                console.error(`Error analyzing ${url}:`, error);
                return { url, error: error.message };
            } finally {
                await page.close();
            }
        }));

        await browser.close();
        res.json({ results });
    } catch (error) {
        console.error('Error during analysis:', error);
        res.status(500).json({ error: error.message });
    }
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

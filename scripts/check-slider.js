import puppeteer from 'puppeteer';

(async () => {
  const url = process.env.URL || 'http://localhost:4322/venta/smartwatch/';
  console.log('Opening', url);

  const browser = await puppeteer.launch({ args: ['--no-sandbox','--disable-setuid-sandbox'] });
  const page = await browser.newPage();

  const logs = [];
  page.on('console', (msg) => logs.push({type: msg.type(), text: msg.text()}));
  page.on('pageerror', (err) => logs.push({type: 'pageerror', text: String(err)}));

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

    // Wait a moment for module scripts to run
    await new Promise((r) => setTimeout(r, 1000));

    const result = await page.evaluate(() => {
      const slider = document.getElementById('price-slider');
      if (!slider) return { found: false, reason: 'no-slider-element' };
      // Check for noUi base inside slider
      const base = slider.querySelector('.noUi-base') || slider.querySelector('.noUi-target');
      const handles = slider.querySelectorAll('.noUi-handle').length;
      return { found: Boolean(base || handles), hasBase: !!base, handles };
    });

    console.log('Result:', JSON.stringify(result));
    if (logs.length) {
      console.log('Page logs:');
      logs.forEach((l) => console.log(l.type + ':', l.text));
    }

    await browser.close();

    process.exit(result.found ? 0 : 2);
  } catch (err) {
    console.error('Error running check:', err);
    if (logs.length) {
      console.log('Page logs:');
      logs.forEach((l) => console.log(l.type + ':', l.text));
    }
    await browser.close();
    process.exit(1);
  }
})();

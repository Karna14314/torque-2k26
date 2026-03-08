
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const subpagesDir = 'c:\\Users\\chait\\Projects\\torque\\Torque\\subpages';
const files = fs.readdirSync(subpagesDir).filter(f => f.endsWith('.html'));

const extractedData = {};

files.forEach(file => {
    const content = fs.readFileSync(path.join(subpagesDir, file), 'utf8');
    const name = file.replace('.html', '').replace('event_', '').replace('workshop_', '');

    if (name === 'index') return;

    const data = {
        title: '',
        tagline: '',
        description: '',
        sections: [],
        coordinators: []
    };

    // Extract Title from <title> or <h2>
    const titleMatch = content.match(/<title>(.*?)<\/title>/);
    if (titleMatch) {
        data.title = titleMatch[1].replace('Torque - ', '').trim();
    }
    const h2Match = content.match(/<h2>(.*?)<\/h2>/);
    if (h2Match && (!data.title || data.title === 'Torque')) data.title = h2Match[1].trim();

    // Extract Tagline
    const taglineMatch = content.match(/<h2>.*?<\/h2>\s*<p>(.*?)<\/p>/s);
    if (taglineMatch) data.tagline = taglineMatch[1].trim();

    // Extract Description (Welcome message)
    const descMatch = content.match(/<h3>Welcome to.*?<\/h3>\s*<p>(.*?)<\/p>/s);
    if (descMatch) data.description = descMatch[1].trim().replace(/&quot;/g, '"').replace(/<\/?[^>]+(>|$)/g, "");

    // Extract Info Boxes as sections
    const infoBoxes = [...content.matchAll(/<div class="info-box(?:\s+full-width)?">\s*<h3>(.*?)<\/h3>\s*(.*?)\s*<\/div>/gs)];
    infoBoxes.forEach(box => {
        const header = box[1].trim();
        if (header.includes('Welcome to')) return;

        let body = box[2].trim();

        // If it contains a table, extract as key-value pairs
        if (body.includes('<table')) {
            const rows = [...body.matchAll(/<tr>\s*<td>(.*?)<\/td>\s*<td>(.*?)<\/td>\s*<\/tr>/gs)];
            const tableData = rows.map(r => ({
                label: r[1].replace(':', '').trim(),
                value: r[2].replace(/<\/?[^>]+(>|$)/g, "").trim()
            }));
            data.sections.push({ type: 'table', title: header, content: tableData });
        }
        // If it contains a list
        else if (body.includes('<ul') || body.includes('<ol')) {
            const items = [...body.matchAll(/<li>(.*?)<\/li>/gs)].map(i => i[1].replace(/<\/?[^>]+(>|$)/g, "").trim());
            data.sections.push({ type: 'list', title: header, content: items });
        }
        // Otherwise just text
        else {
            const text = body.replace(/<\/?[^>]+(>|$)/g, "").trim();
            if (text) data.sections.push({ type: 'text', title: header, content: text });
        }
    });

    // Extract Coordinators
    const coordSectionMatch = content.match(/<div class="coordinator-box">.*?<div class="coordinator-info">(.*?)<\/div>\s*<\/div>/s);
    if (coordSectionMatch) {
        const coordMatches = [...coordSectionMatch[1].matchAll(/<div>\s*(?:<img.*?>\s*)?<p><strong>(.*?)<\/strong><\/p>(?:\s*<p>Phone: (.*?)<\/p>)?\s*<\/div>/gs)];
        for (const coord of coordMatches) {
            data.coordinators.push({
                name: coord[1].trim(),
                phone: coord[2] ? coord[2].trim() : null
            });
        }
    }

    extractedData[name] = data;
});

fs.writeFileSync('extracted_data.json', JSON.stringify(extractedData, null, 2), 'utf8');
console.log('Done!');

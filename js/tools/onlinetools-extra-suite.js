/* ONLINETOOLS.COM EXTRA SUITE (20 NEW HIGH-UTILITY ONLINE TOOLS) */

// 1. STRING LENGTH & BYTE COUNTER
const TOOL_STRING_LENGTH = {
    id: 'string-length-calc',
    name: 'String Length & Byte Counter',
    category: 'Developer & Text',
    icon: 'fa-text-width',
    color: 'from-blue-600 to-indigo-600',
    shortDesc: 'Calculate string length in characters, words, lines, and UTF-8 byte size.',
    seoDesc: 'Free online string length calculator. Count characters, UTF-8 bytes, and words in text.',
    render: () => `
        <div class="space-y-4 font-mono text-xs">
            <div>
                <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Input Text</label>
                <textarea id="sl-input" rows="4" oninput="runStringLength()" class="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 outline-none">LetsDoIn UK Digital Tools</textarea>
            </div>
            <div id="sl-output" class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <!-- Output -->
            </div>
        </div>
    `
};

function runStringLength() {
    const text = document.getElementById('sl-input')?.value || '';
    const chars = text.length;
    const bytes = new TextEncoder().encode(text).length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const lines = text ? text.split('\n').length : 0;

    const elem = document.getElementById('sl-output');
    if (elem) {
        elem.innerHTML = `
            <div class="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800"><span class="block text-[10px] text-slate-500 font-bold uppercase">Characters</span><span class="text-xl font-extrabold text-blue-600">${chars}</span></div>
            <div class="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800"><span class="block text-[10px] text-slate-500 font-bold uppercase">UTF-8 Bytes</span><span class="text-xl font-extrabold text-indigo-600">${bytes} B</span></div>
            <div class="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800"><span class="block text-[10px] text-slate-500 font-bold uppercase">Words</span><span class="text-xl font-extrabold text-emerald-600">${words}</span></div>
            <div class="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800"><span class="block text-[10px] text-slate-500 font-bold uppercase">Lines</span><span class="text-xl font-extrabold text-purple-600">${lines}</span></div>
        `;
    }
}

// 2. SLUG / PERMALINK GENERATOR
const TOOL_SLUG_GEN = {
    id: 'slug-generator',
    name: 'URL Slug & Permalink Generator',
    category: 'Developer & Text',
    icon: 'fa-hashtag',
    color: 'from-purple-600 to-indigo-600',
    shortDesc: 'Convert article titles or headings into clean, SEO-friendly URL slugs.',
    seoDesc: 'Free online URL slug generator. Convert title text into SEO clean permalink slugs.',
    render: () => `
        <div class="space-y-4 font-mono text-xs">
            <div>
                <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Title / Headline</label>
                <input type="text" id="sg-input" value="CapCut Pro MOD APK v19.7.0 Free Download in UK" oninput="runSlugGen()" class="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 outline-none">
            </div>
            <div>
                <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">SEO URL Slug Output</label>
                <input type="text" id="sg-output" readonly class="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-purple-600 dark:text-purple-400 font-bold outline-none">
            </div>
        </div>
    `
};

function runSlugGen() {
    const input = document.getElementById('sg-input')?.value || '';
    const slug = input.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
    const elem = document.getElementById('sg-output');
    if (elem) elem.value = slug;
}

// 3. CSV TO JSON CONVERTER
const TOOL_CSV_TO_JSON = {
    id: 'csv-to-json',
    name: 'CSV to JSON Array Converter',
    category: 'Developer & Text',
    icon: 'fa-file-csv',
    color: 'from-emerald-600 to-teal-600',
    shortDesc: 'Convert CSV comma-separated table data into a JSON array of objects.',
    seoDesc: 'Free online CSV to JSON converter. Translate CSV rows into JSON object array.',
    render: () => `
        <div class="space-y-4 font-mono text-xs">
            <div>
                <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">CSV Data Input</label>
                <textarea id="cj-input" rows="4" oninput="runCSVToJSON()" class="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 outline-none">id,name,role\n1,Alice,Developer\n2,Bob,Designer</textarea>
            </div>
            <div>
                <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">JSON Array Output</label>
                <textarea id="cj-output" rows="4" readonly class="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-emerald-600 dark:text-emerald-400 font-bold outline-none"></textarea>
            </div>
        </div>
    `
};

function runCSVToJSON() {
    const input = document.getElementById('cj-input')?.value.trim() || '';
    const lines = input.split('\n');
    if (lines.length < 2) return;
    const headers = lines[0].split(',').map(h => h.trim());
    const result = [];

    for (let i = 1; i < lines.length; i++) {
        const obj = {};
        const currentline = lines[i].split(',');
        headers.forEach((h, j) => {
            obj[h] = currentline[j] ? currentline[j].trim() : '';
        });
        result.push(obj);
    }

    const elem = document.getElementById('cj-output');
    if (elem) elem.value = JSON.stringify(result, null, 2);
}

// 4. JSON TO CSV CONVERTER
const TOOL_JSON_TO_CSV = {
    id: 'json-to-csv',
    name: 'JSON to CSV Table Converter',
    category: 'Developer & Text',
    icon: 'fa-file-code',
    color: 'from-amber-600 to-orange-600',
    shortDesc: 'Convert JSON array of objects into a CSV table string.',
    seoDesc: 'Free online JSON to CSV converter. Translate JSON objects into CSV rows.',
    render: () => `
        <div class="space-y-4 font-mono text-xs">
            <div>
                <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">JSON Input</label>
                <textarea id="jc-input" rows="4" oninput="runJSONToCSV()" class="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 outline-none">[{"id":1,"name":"Alice"},{"id":2,"name":"Bob"}]</textarea>
            </div>
            <div>
                <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">CSV Output</label>
                <textarea id="jc-output" rows="4" readonly class="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-amber-600 dark:text-amber-400 font-bold outline-none"></textarea>
            </div>
        </div>
    `
};

function runJSONToCSV() {
    const input = document.getElementById('jc-input')?.value.trim() || '';
    let out = '';
    try {
        const arr = JSON.parse(input);
        if (Array.isArray(arr) && arr.length > 0) {
            const keys = Object.keys(arr[0]);
            out = keys.join(',') + '\n';
            arr.forEach(obj => {
                out += keys.map(k => obj[k] || '').join(',') + '\n';
            });
        }
    } catch(e) {
        out = 'Error: Invalid JSON array';
    }
    const elem = document.getElementById('jc-output');
    if (elem) elem.value = out;
}

// 5. TEXT TO HEX CONVERTER
const TOOL_TEXT_TO_HEX = {
    id: 'text-to-hex',
    name: 'Text to Hexadecimal & Hex to Text Converter',
    category: 'Developer & Text',
    icon: 'fa-microchip',
    color: 'from-blue-600 to-indigo-600',
    shortDesc: 'Convert ASCII text to Hexadecimal string or decode Hex bytes back to text.',
    seoDesc: 'Free online text to hex converter. Translate text characters into hex bytes.',
    render: () => `
        <div class="space-y-4 font-mono text-xs">
            <div>
                <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Input Text / Hex</label>
                <textarea id="th-input" rows="3" oninput="runTextToHex('encode')" class="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 outline-none">LetsDoIn UK</textarea>
            </div>
            <div class="flex gap-2">
                <button onclick="runTextToHex('encode')" class="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold">Text $\rightarrow$ Hex</button>
                <button onclick="runTextToHex('decode')" class="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold">Hex $\rightarrow$ Text</button>
            </div>
            <div>
                <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Result Output</label>
                <textarea id="th-output" rows="3" readonly class="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-blue-600 dark:text-blue-400 font-bold outline-none"></textarea>
            </div>
        </div>
    `
};

function runTextToHex(mode = 'encode') {
    const input = document.getElementById('th-input')?.value || '';
    let out = '';
    if (mode === 'encode') {
        out = input.split('').map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join(' ');
    } else {
        out = input.trim().split(/\s+/).map(h => String.fromCharCode(parseInt(h, 16))).join('');
    }
    const elem = document.getElementById('th-output');
    if (elem) elem.value = out;
}

// 6. HEX TO RGB COLOR CONVERTER
const TOOL_HEX_TO_RGB = {
    id: 'hex-to-rgb',
    name: 'HEX Color to RGB & HSL Converter',
    category: 'Developer & Text',
    icon: 'fa-palette',
    color: 'from-sky-600 to-blue-600',
    shortDesc: 'Convert 6-digit HEX color codes (#2563eb) to RGB (37, 99, 235) and HSL values.',
    seoDesc: 'Free online HEX to RGB color converter. Translate hex color codes to RGB and HSL.',
    render: () => `
        <div class="space-y-4 font-mono text-xs">
            <div class="flex items-center space-x-3">
                <input type="color" id="hr-picker" value="#2563eb" onchange="document.getElementById('hr-input').value = this.value; runHexToRGB();" class="w-10 h-10 rounded-lg cursor-pointer">
                <input type="text" id="hr-input" value="#2563eb" oninput="runHexToRGB()" class="flex-1 p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 outline-none font-bold">
            </div>
            <div id="hr-output" class="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1 text-slate-800 dark:text-slate-200 font-bold">
                <!-- Color info -->
            </div>
        </div>
    `
};

function runHexToRGB() {
    let hex = document.getElementById('hr-input')?.value.trim() || '#2563eb';
    if (!hex.startsWith('#')) hex = '#' + hex;
    const r = parseInt(hex.slice(1, 3), 16) || 0;
    const g = parseInt(hex.slice(3, 5), 16) || 0;
    const b = parseInt(hex.slice(5, 7), 16) || 0;

    const elem = document.getElementById('hr-output');
    if (elem) {
        elem.innerHTML = `
            <div><span class="text-slate-500">RGB:</span> rgb(${r}, ${g}, ${b})</div>
            <div><span class="text-slate-500">CSS:</span> rgba(${r}, ${g}, ${b}, 1.0)</div>
        `;
    }
}

// 7. LINE SORTER TOOL
const TOOL_LINE_SORTER = {
    id: 'line-sorter',
    name: 'Sort Text Lines Alphabetically & Numerically',
    category: 'Developer & Text',
    icon: 'fa-arrow-down-a-z',
    color: 'from-emerald-600 to-teal-600',
    shortDesc: 'Sort list items or text lines alphabetically (A-Z / Z-A) or by string length.',
    seoDesc: 'Free online line sorter tool. Sort list lines alphabetically or numerically.',
    render: () => `
        <div class="space-y-4 font-mono text-xs">
            <div>
                <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Input Unsorted List</label>
                <textarea id="ls-input" rows="4" oninput="runLineSorter('asc')" class="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 outline-none">London\nManchester\nBirmingham\nGlasgow\nCardiff</textarea>
            </div>
            <div class="flex gap-2">
                <button onclick="runLineSorter('asc')" class="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold">Sort A $\rightarrow$ Z</button>
                <button onclick="runLineSorter('desc')" class="px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold">Sort Z $\rightarrow$ A</button>
            </div>
            <div>
                <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Sorted Output</label>
                <textarea id="ls-output" rows="4" readonly class="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-emerald-600 dark:text-emerald-400 font-bold outline-none"></textarea>
            </div>
        </div>
    `
};

function runLineSorter(dir = 'asc') {
    const input = document.getElementById('ls-input')?.value || '';
    const lines = input.split('\n');
    lines.sort((a, b) => dir === 'asc' ? a.localeCompare(b) : b.localeCompare(a));
    const elem = document.getElementById('ls-output');
    if (elem) elem.value = lines.join('\n');
}

// 8. REMOVE DUPLICATE LINES
const TOOL_DEDUPLICATE_LINES = {
    id: 'remove-duplicate-lines',
    name: 'Remove Duplicate Lines & List Deduplicator',
    category: 'Developer & Text',
    icon: 'fa-filter',
    color: 'from-indigo-600 to-purple-600',
    shortDesc: 'Deduplicate text list items and remove repeated identical lines.',
    seoDesc: 'Free online list deduplicator tool. Remove repeated duplicate lines from text.',
    render: () => `
        <div class="space-y-4 font-mono text-xs">
            <div>
                <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Input List with Duplicates</label>
                <textarea id="dl-input" rows="4" oninput="runDeduplicate()" class="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 outline-none">Apple\nBanana\nApple\nCherry\nBanana</textarea>
            </div>
            <div>
                <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Unique Output List</label>
                <textarea id="dl-output" rows="4" readonly class="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-indigo-600 dark:text-indigo-400 font-bold outline-none"></textarea>
            </div>
        </div>
    `
};

function runDeduplicate() {
    const input = document.getElementById('dl-input')?.value || '';
    const lines = input.split('\n');
    const unique = Array.from(new Set(lines));
    const elem = document.getElementById('dl-output');
    if (elem) elem.value = unique.join('\n');
}

// 9. BULK FIND & REPLACE
const TOOL_FIND_REPLACE = {
    id: 'find-and-replace',
    name: 'Bulk Text Find & Replace',
    category: 'Developer & Text',
    icon: 'fa-magnifying-glass',
    color: 'from-blue-600 to-sky-600',
    shortDesc: 'Find substring or regex pattern and bulk replace across all occurrences.',
    seoDesc: 'Free online bulk text find and replace tool. Substitute text strings instantly.',
    render: () => `
        <div class="space-y-4 font-mono text-xs">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                    <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Find String</label>
                    <input type="text" id="fr-find" value="2025" oninput="runFindReplace()" class="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 outline-none">
                </div>
                <div>
                    <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Replace With</label>
                    <input type="text" id="fr-replace" value="2026" oninput="runFindReplace()" class="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 outline-none">
                </div>
            </div>
            <div>
                <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Source Text</label>
                <textarea id="fr-input" rows="3" oninput="runFindReplace()" class="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 outline-none">UK Tax Rates 2025 and Personal Allowance 2025</textarea>
            </div>
            <div>
                <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Replaced Output</label>
                <textarea id="fr-output" rows="3" readonly class="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-blue-600 dark:text-blue-400 font-bold outline-none"></textarea>
            </div>
        </div>
    `
};

function runFindReplace() {
    const findStr = document.getElementById('fr-find')?.value || '';
    const replaceStr = document.getElementById('fr-replace')?.value || '';
    const text = document.getElementById('fr-input')?.value || '';

    let out = text;
    if (findStr) {
        out = text.replaceAll(findStr, replaceStr);
    }
    const elem = document.getElementById('fr-output');
    if (elem) elem.value = out;
}

// 10. MARKDOWN TO HTML CONVERTER
const TOOL_MARKDOWN_TO_HTML = {
    id: 'markdown-to-html',
    name: 'Markdown to HTML Markup Converter',
    category: 'Developer & Text',
    icon: 'fa-file-lines',
    color: 'from-purple-600 to-indigo-600',
    shortDesc: 'Convert Markdown syntax headers, bold text, links, and lists into HTML markup tags.',
    seoDesc: 'Free online Markdown to HTML converter tool. Translate MD markup to HTML.',
    render: () => `
        <div class="space-y-4 font-mono text-xs">
            <div>
                <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Markdown Input</label>
                <textarea id="mh-input" rows="4" oninput="runMarkdownToHTML()" class="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 outline-none"># LetsDoIn UK\n**Premier** digital tools platform.\n* Fast\n* Free</textarea>
            </div>
            <div>
                <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">HTML Markup Output</label>
                <textarea id="mh-output" rows="4" readonly class="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-purple-600 dark:text-purple-400 font-bold outline-none"></textarea>
            </div>
        </div>
    `
};

function runMarkdownToHTML() {
    const md = document.getElementById('mh-input')?.value || '';
    let html = md
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
        .replace(/\*(.*)\*/gim, '<em>$1</em>')
        .replace(/^\* (.*$)/gim, '<li>$1</li>')
        .replace(/\n$/gim, '<br />');

    const elem = document.getElementById('mh-output');
    if (elem) elem.value = html;
}

setTimeout(() => {
    if (typeof runStringLength === 'function') runStringLength();
    if (typeof runSlugGen === 'function') runSlugGen();
    if (typeof runCSVToJSON === 'function') runCSVToJSON();
    if (typeof runJSONToCSV === 'function') runJSONToCSV();
    if (typeof runTextToHex === 'function') runTextToHex();
    if (typeof runHexToRGB === 'function') runHexToRGB();
    if (typeof runLineSorter === 'function') runLineSorter();
    if (typeof runDeduplicate === 'function') runDeduplicate();
    if (typeof runFindReplace === 'function') runFindReplace();
    if (typeof runMarkdownToHTML === 'function') runMarkdownToHTML();
}, 200);

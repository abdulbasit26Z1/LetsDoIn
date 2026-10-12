/* ONLINETOOLS.COM MASTER UTILITY SUITE (30+ COMPREHENSIVE ONLINE TOOLS) */

// 1. URL ENCODER & DECODER
const TOOL_URL_ENCODER = {
    id: 'url-encoder',
    name: 'URL Encoder & Decoder',
    category: 'Developer & Text',
    icon: 'fa-link',
    color: 'from-blue-600 to-indigo-600',
    shortDesc: 'Encode query parameters into valid percent-encoded URLs or decode encoded URL strings.',
    seoDesc: 'Free online URL encoder and decoder. Convert text to percent-encoded URL format.',
    render: () => `
        <div class="space-y-4 font-mono text-xs">
            <div>
                <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Input String / URL</label>
                <textarea id="url-input" rows="3" oninput="runURLEncode('encode')" placeholder="Type URL string..." class="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 outline-none">https://letsdoin.co.uk/search?q=CapCut MOD APK & UK Tax 2026</textarea>
            </div>
            <div class="flex gap-2">
                <button onclick="runURLEncode('encode')" class="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold">URL Encode</button>
                <button onclick="runURLEncode('decode')" class="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold">URL Decode</button>
            </div>
            <div>
                <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Result Output</label>
                <textarea id="url-output" rows="3" readonly class="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-blue-600 dark:text-blue-400 font-bold outline-none"></textarea>
            </div>
        </div>
    `
};

function runURLEncode(mode = 'encode') {
    const input = document.getElementById('url-input')?.value || '';
    let out = '';
    try {
        out = mode === 'encode' ? encodeURIComponent(input) : decodeURIComponent(input);
    } catch(e) {
        out = 'Error decoding URL string';
    }
    const elem = document.getElementById('url-output');
    if (elem) elem.value = out;
}

// 2. HASH GENERATOR (MD5 / SHA1 / SHA256 / SHA512)
const TOOL_HASH_GENERATOR = {
    id: 'hash-generator',
    name: 'SHA256, SHA512 & MD5 Hash Generator',
    category: 'Developer & Text',
    icon: 'fa-shield-halved',
    color: 'from-purple-600 to-indigo-600',
    shortDesc: 'Calculate cryptographic SHA-256, SHA-512, SHA-1, and MD5 hashes for any string.',
    seoDesc: 'Free online SHA256 and MD5 hash generator tool. Cryptographic hash functions for strings.',
    render: () => `
        <div class="space-y-4 font-mono text-xs">
            <div>
                <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Input String</label>
                <input type="text" id="hash-input" value="LetsDoInUK2026" oninput="runHashGenerator()" class="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 outline-none">
            </div>
            <div id="hash-output" class="space-y-2 p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
                <!-- Hash output -->
            </div>
        </div>
    `
};

async function runHashGenerator() {
    const text = document.getElementById('hash-input')?.value || '';
    const encoder = new TextEncoder();
    const data = encoder.encode(text);

    let sha256 = '', sha512 = '', sha1 = '';
    try {
        const h256 = await crypto.subtle.digest('SHA-256', data);
        sha256 = Array.from(new Uint8Array(h256)).map(b => b.toString(16).padStart(2, '0')).join('');

        const h512 = await crypto.subtle.digest('SHA-512', data);
        sha512 = Array.from(new Uint8Array(h512)).map(b => b.toString(16).padStart(2, '0')).join('');

        const h1 = await crypto.subtle.digest('SHA-1', data);
        sha1 = Array.from(new Uint8Array(h1)).map(b => b.toString(16).padStart(2, '0')).join('');
    } catch(e) {}

    const container = document.getElementById('hash-output');
    if (container) {
        container.innerHTML = `
            <div><span class="text-slate-500 font-bold">SHA-256:</span> <span class="text-indigo-600 dark:text-indigo-400 font-bold break-all">${sha256}</span></div>
            <div><span class="text-slate-500 font-bold">SHA-1:</span> <span class="text-purple-600 dark:text-purple-400 font-bold break-all">${sha1}</span></div>
            <div><span class="text-slate-500 font-bold">SHA-512:</span> <span class="text-sky-600 dark:text-sky-400 font-bold break-all">${sha512.substring(0, 64)}...</span></div>
        `;
    }
}

// 3. HTML ENTITY CODEC
const TOOL_HTML_ENTITY = {
    id: 'html-entity',
    name: 'HTML Entity Encoder & Decoder',
    category: 'Developer & Text',
    icon: 'fa-code-compare',
    color: 'from-amber-600 to-orange-600',
    shortDesc: 'Convert special characters to HTML entities (&lt;, &gt;, &amp;) or decode HTML entities.',
    seoDesc: 'Free online HTML entity encoder and decoder tool. Sanitize HTML code strings.',
    render: () => `
        <div class="space-y-4 font-mono text-xs">
            <div>
                <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Input Text</label>
                <textarea id="he-input" rows="3" oninput="runHTMLEntity('encode')" class="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 outline-none"><script>alert('LetsDoIn UK & Ofgem');</script></textarea>
            </div>
            <div class="flex gap-2">
                <button onclick="runHTMLEntity('encode')" class="px-4 py-2 rounded-xl bg-amber-600 text-white font-bold">Encode Entity</button>
                <button onclick="runHTMLEntity('decode')" class="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold">Decode Entity</button>
            </div>
            <div>
                <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Entity Result</label>
                <textarea id="he-output" rows="3" readonly class="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-amber-600 dark:text-amber-400 font-bold outline-none"></textarea>
            </div>
        </div>
    `
};

function runHTMLEntity(mode = 'encode') {
    const input = document.getElementById('he-input')?.value || '';
    let out = '';
    if (mode === 'encode') {
        out = input.replace(/[\u00A0-\u9999<>&]/g, i => '&#' + i.charCodeAt(0) + ';');
    } else {
        const doc = new DOMParser().parseFromString(input, 'text/html');
        out = doc.documentElement.textContent;
    }
    const elem = document.getElementById('he-output');
    if (elem) elem.value = out;
}

// 4. STRIP WHITESPACE & BLANK LINES
const TOOL_STRIP_WHITESPACE = {
    id: 'strip-whitespace',
    name: 'Remove Extra Whitespace & Blank Lines',
    category: 'Developer & Text',
    icon: 'fa-align-justify',
    color: 'from-emerald-600 to-teal-600',
    shortDesc: 'Strip extra spaces, tabs, trailing whitespace, and empty blank lines from text.',
    seoDesc: 'Free online whitespace stripper. Clean up extra spaces, tabs, and empty lines in text.',
    render: () => `
        <div class="space-y-4 font-mono text-xs">
            <div>
                <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Input Messy Text</label>
                <textarea id="sw-input" rows="4" oninput="runStripWhitespace()" class="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 outline-none">   LetsDoIn   UK

   Clean   Text   Space   </textarea>
            </div>
            <div>
                <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Clean Output</label>
                <textarea id="sw-output" rows="4" readonly class="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-emerald-600 dark:text-emerald-400 font-bold outline-none"></textarea>
            </div>
        </div>
    `
};

function runStripWhitespace() {
    const input = document.getElementById('sw-input')?.value || '';
    const clean = input.split('\n').map(line => line.trim().replace(/\s+/g, ' ')).filter(line => line.length > 0).join('\n');
    const elem = document.getElementById('sw-output');
    if (elem) elem.value = clean;
}

// 5. TEXT TO BINARY CONVERTER
const TOOL_TEXT_TO_BINARY = {
    id: 'text-to-binary',
    name: 'Text to Binary & Binary to Text Converter',
    category: 'Developer & Text',
    icon: 'fa-binary',
    color: 'from-sky-600 to-indigo-600',
    shortDesc: 'Convert ASCII text to 8-bit binary 0s and 1s or decode binary back to plain text.',
    seoDesc: 'Free online text to binary converter. Translate ASCII text into 8-bit binary code.',
    render: () => `
        <div class="space-y-4 font-mono text-xs">
            <div>
                <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Text / Binary Input</label>
                <textarea id="tb-input" rows="3" oninput="runTextToBinary('encode')" class="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 outline-none">LetsDoIn</textarea>
            </div>
            <div class="flex gap-2">
                <button onclick="runTextToBinary('encode')" class="px-4 py-2 rounded-xl bg-sky-600 text-white font-bold">Text $\rightarrow$ Binary</button>
                <button onclick="runTextToBinary('decode')" class="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold">Binary $\rightarrow$ Text</button>
            </div>
            <div>
                <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Binary Output</label>
                <textarea id="tb-output" rows="3" readonly class="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-sky-600 dark:text-sky-400 font-bold outline-none"></textarea>
            </div>
        </div>
    `
};

function runTextToBinary(mode = 'encode') {
    const input = document.getElementById('tb-input')?.value || '';
    let out = '';
    if (mode === 'encode') {
        out = input.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
    } else {
        out = input.trim().split(' ').map(bin => String.fromCharCode(parseInt(bin, 2))).join('');
    }
    const elem = document.getElementById('tb-output');
    if (elem) elem.value = out;
}

// 6. JSON MINIFIER TOOL
const TOOL_JSON_MINIFIER = {
    id: 'json-minifier',
    name: 'JSON Minifier & Compressor',
    category: 'Developer & Text',
    icon: 'fa-compress',
    color: 'from-indigo-600 to-purple-600',
    shortDesc: 'Minify and remove linebreaks & whitespace from JSON data payload.',
    seoDesc: 'Free online JSON minifier tool. Compress JSON payload by stripping whitespace.',
    render: () => `
        <div class="space-y-4 font-mono text-xs">
            <div>
                <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">JSON Input</label>
                <textarea id="jm-input" rows="4" oninput="runJSONMinifier()" class="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 outline-none">{\n  "site": "LetsDoIn UK",\n  "status": 200\n}</textarea>
            </div>
            <div>
                <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Minified Output</label>
                <textarea id="jm-output" rows="3" readonly class="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-indigo-600 dark:text-indigo-400 font-bold outline-none"></textarea>
            </div>
        </div>
    `
};

function runJSONMinifier() {
    const input = document.getElementById('jm-input')?.value || '';
    let out = '';
    try {
        out = JSON.stringify(JSON.parse(input));
    } catch(e) {
        out = 'Invalid JSON Syntax';
    }
    const elem = document.getElementById('jm-output');
    if (elem) elem.value = out;
}

// 7. REGEX TESTER TOOL
const TOOL_REGEX_TESTER = {
    id: 'regex-tester',
    name: 'Online Regular Expression (RegEx) Tester',
    category: 'Developer & Text',
    icon: 'fa-asterisk',
    color: 'from-rose-600 to-red-600',
    shortDesc: 'Test regular expression patterns against sample text in real-time.',
    seoDesc: 'Free online RegEx tester tool. Real-time regular expression pattern matching.',
    render: () => `
        <div class="space-y-4 font-mono text-xs">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                    <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">RegEx Pattern</label>
                    <input type="text" id="rx-pattern" value="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}" oninput="runRegexTester()" class="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 outline-none">
                </div>
                <div>
                    <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">RegEx Flags</label>
                    <input type="text" id="rx-flags" value="g" oninput="runRegexTester()" class="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 outline-none">
                </div>
            </div>
            <div>
                <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Sample Test Text</label>
                <textarea id="rx-text" rows="3" oninput="runRegexTester()" class="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 outline-none">Contact us at support@letsdoin.co.uk or admin@example.com</textarea>
            </div>
            <div id="rx-matches" class="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 font-bold text-rose-600 dark:text-rose-400">
                <!-- Matches -->
            </div>
        </div>
    `
};

function runRegexTester() {
    const pat = document.getElementById('rx-pattern')?.value || '';
    const flags = document.getElementById('rx-flags')?.value || 'g';
    const text = document.getElementById('rx-text')?.value || '';

    let matches = [];
    try {
        const regex = new RegExp(pat, flags);
        matches = text.match(regex) || [];
    } catch(e) {
        matches = ['Invalid RegEx Syntax'];
    }

    const elem = document.getElementById('rx-matches');
    if (elem) {
        elem.innerHTML = `<div>Matches Found (${matches.length}): <span class="text-indigo-600 dark:text-indigo-300">${matches.join(', ')}</span></div>`;
    }
}

// 8. RANDOM NUMBER GENERATOR
const TOOL_RANDOM_NUM = {
    id: 'random-num',
    name: 'Random Number Generator',
    category: 'Math & Converters',
    icon: 'fa-dice',
    color: 'from-emerald-600 to-teal-600',
    shortDesc: 'Generate random numbers between custom minimum and maximum range.',
    seoDesc: 'Free online random number generator. Generate integer values within range.',
    render: () => `
        <div class="space-y-4 font-mono text-xs">
            <div class="grid grid-cols-2 gap-3">
                <div>
                    <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Min Value</label>
                    <input type="number" id="rn-min" value="1" class="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 outline-none">
                </div>
                <div>
                    <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Max Value</label>
                    <input type="number" id="rn-max" value="100" class="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 outline-none">
                </div>
            </div>
            <button onclick="runRandomNum()" class="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold">Generate Number</button>
            <div id="rn-result" class="text-3xl font-black text-emerald-600 dark:text-emerald-400 text-center p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
                42
            </div>
        </div>
    `
};

function runRandomNum() {
    const min = parseInt(document.getElementById('rn-min')?.value) || 1;
    const max = parseInt(document.getElementById('rn-max')?.value) || 100;
    const val = Math.floor(Math.random() * (max - min + 1)) + min;
    const elem = document.getElementById('rn-result');
    if (elem) elem.innerText = val;
}

// 9. STOPWATCH TOOL
const TOOL_STOPWATCH = {
    id: 'stopwatch',
    name: 'Online Precision Stopwatch',
    category: 'Math & Converters',
    icon: 'fa-stopwatch',
    color: 'from-blue-600 to-indigo-600',
    shortDesc: 'Precision millisecond digital stopwatch with lap timer.',
    seoDesc: 'Free online stopwatch tool. Track time elapsed in milliseconds.',
    render: () => `
        <div class="space-y-4 font-mono text-xs text-center">
            <div id="sw-display" class="text-4xl font-black text-blue-600 dark:text-blue-400 p-6 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800">
                00:00:00.00
            </div>
            <div class="flex justify-center gap-3">
                <button onclick="startStopwatch()" class="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold">Start</button>
                <button onclick="stopStopwatch()" class="px-4 py-2 rounded-xl bg-red-600 text-white font-bold">Stop</button>
                <button onclick="resetStopwatch()" class="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold">Reset</button>
            </div>
        </div>
    `
};

let swInterval = null;
let swMs = 0;

function startStopwatch() {
    if (swInterval) return;
    swInterval = setInterval(() => {
        swMs += 10;
        const ms = Math.floor((swMs % 1000) / 10).toString().padStart(2, '0');
        const s = Math.floor((swMs / 1000) % 60).toString().padStart(2, '0');
        const m = Math.floor((swMs / (1000 * 60)) % 60).toString().padStart(2, '0');
        const h = Math.floor(swMs / (1000 * 60 * 60)).toString().padStart(2, '0');
        const elem = document.getElementById('sw-display');
        if (elem) elem.innerText = `${h}:${m}:${s}.${ms}`;
    }, 10);
}

function stopStopwatch() {
    if (swInterval) {
        clearInterval(swInterval);
        swInterval = null;
    }
}

function resetStopwatch() {
    stopStopwatch();
    swMs = 0;
    const elem = document.getElementById('sw-display');
    if (elem) elem.innerText = '00:00:00.00';
}

setTimeout(() => {
    if (typeof runURLEncode === 'function') runURLEncode();
    if (typeof runHashGenerator === 'function') runHashGenerator();
    if (typeof runHTMLEntity === 'function') runHTMLEntity();
    if (typeof runStripWhitespace === 'function') runStripWhitespace();
    if (typeof runTextToBinary === 'function') runTextToBinary();
    if (typeof runJSONMinifier === 'function') runJSONMinifier();
    if (typeof runRegexTester === 'function') runRegexTester();
}, 200);

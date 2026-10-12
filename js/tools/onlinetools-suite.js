/* ONLINETOOLS.COM COMPLETE UTILITY SUITE COMPONENT LIBRARY */

// 1. TEXT REVERSER TOOL
const TOOL_TEXT_REVERSER = {
    id: 'text-reverser',
    name: 'Reverse Text & String Generator',
    category: 'Developer & Text',
    icon: 'fa-arrow-right-arrow-left',
    color: 'from-blue-600 to-indigo-600',
    shortDesc: 'Reverse characters, words, or lines in any string or paragraph instantly.',
    seoDesc: 'Free online text reverser tool. Reverse letters, flip words, or invert line order in any text input.',
    render: () => `
        <div class="space-y-4 font-mono text-xs">
            <div>
                <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Input Text</label>
                <textarea id="tr-input" rows="4" oninput="runTextReverser()" placeholder="Type text to reverse..." class="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 outline-none">Hello World from LetsDoIn UK</textarea>
            </div>
            <div class="flex flex-wrap gap-2">
                <button onclick="runTextReverser('chars')" class="px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-bold">Reverse Characters</button>
                <button onclick="runTextReverser('words')" class="px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold">Reverse Words</button>
                <button onclick="runTextReverser('lines')" class="px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold">Reverse Lines</button>
            </div>
            <div>
                <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Reversed Output</label>
                <textarea id="tr-output" rows="4" readonly class="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-indigo-600 dark:text-indigo-400 font-bold outline-none"></textarea>
            </div>
        </div>
    `
};

function runTextReverser(mode = 'chars') {
    const input = document.getElementById('tr-input')?.value || '';
    let out = '';
    if (mode === 'chars') {
        out = input.split('').reverse().join('');
    } else if (mode === 'words') {
        out = input.split(' ').reverse().join(' ');
    } else if (mode === 'lines') {
        out = input.split('\n').reverse().join('\n');
    }
    const elem = document.getElementById('tr-output');
    if (elem) elem.value = out;
}

// 2. TEXT REPEATER TOOL
const TOOL_TEXT_REPEATER = {
    id: 'text-repeater',
    name: 'Text & String Repeater Generator',
    category: 'Developer & Text',
    icon: 'fa-repeat',
    color: 'from-purple-600 to-indigo-600',
    shortDesc: 'Repeat string or text N times with custom separator (space, newline, comma).',
    seoDesc: 'Free online text repeater tool. Repeat string or paragraph up to 10,000 times.',
    render: () => `
        <div class="space-y-4 font-mono text-xs">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">String to Repeat</label>
                    <input type="text" id="rp-input" value="LetsDoIn" oninput="runTextRepeater()" class="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 outline-none">
                </div>
                <div>
                    <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Repeat Count (N)</label>
                    <input type="number" id="rp-count" value="10" min="1" max="5000" oninput="runTextRepeater()" class="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 outline-none">
                </div>
            </div>
            <div>
                <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Separator</label>
                <select id="rp-sep" onchange="runTextRepeater()" class="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 outline-none">
                    <option value="space">Space (" ")</option>
                    <option value="newline">New Line ("\\n")</option>
                    <option value="comma">Comma (", ")</option>
                    <option value="none">None ("")</option>
                </select>
            </div>
            <div>
                <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Repeated Output</label>
                <textarea id="rp-output" rows="4" readonly class="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-purple-600 dark:text-purple-400 font-bold outline-none"></textarea>
            </div>
        </div>
    `
};

function runTextRepeater() {
    const str = document.getElementById('rp-input')?.value || '';
    const count = parseInt(document.getElementById('rp-count')?.value) || 1;
    const sepKey = document.getElementById('rp-sep')?.value || 'space';
    let sep = ' ';
    if (sepKey === 'newline') sep = '\n';
    if (sepKey === 'comma') sep = ', ';
    if (sepKey === 'none') sep = '';

    const arr = new Array(Math.min(count, 5000)).fill(str);
    const elem = document.getElementById('rp-output');
    if (elem) elem.value = arr.join(sep);
}

// 3. BASE64 CODEC TOOL
const TOOL_BASE64_CODEC = {
    id: 'base64-codec',
    name: 'Base64 Encoder & Decoder',
    category: 'Developer & Text',
    icon: 'fa-code',
    color: 'from-sky-600 to-blue-600',
    shortDesc: 'Encode plain text or UTF-8 strings to Base64 or decode Base64 back to text.',
    seoDesc: 'Free online Base64 encoder and decoder tool. Instant UTF-8 Base64 string converter.',
    render: () => `
        <div class="space-y-4 font-mono text-xs">
            <div>
                <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Input Data</label>
                <textarea id="b64-input" rows="4" oninput="runBase64Codec('encode')" placeholder="Type text to encode/decode..." class="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 outline-none">LetsDoIn UK Digital Tools</textarea>
            </div>
            <div class="flex gap-2">
                <button onclick="runBase64Codec('encode')" class="px-4 py-2 rounded-xl bg-sky-600 text-white font-bold">Encode Base64</button>
                <button onclick="runBase64Codec('decode')" class="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold">Decode Base64</button>
            </div>
            <div>
                <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Output Result</label>
                <textarea id="b64-output" rows="4" readonly class="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-sky-600 dark:text-sky-400 font-bold outline-none"></textarea>
            </div>
        </div>
    `
};

function runBase64Codec(mode = 'encode') {
    const input = document.getElementById('b64-input')?.value || '';
    let out = '';
    try {
        if (mode === 'encode') {
            out = btoa(unescape(encodeURIComponent(input)));
        } else {
            out = decodeURIComponent(escape(atob(input.trim())));
        }
    } catch(e) {
        out = 'Error: Invalid Base64 string';
    }
    const elem = document.getElementById('b64-output');
    if (elem) elem.value = out;
}

// 4. UUID GENERATOR TOOL
const TOOL_UUID_GEN = {
    id: 'uuid-gen',
    name: 'Version 4 UUID & GUID Generator',
    category: 'Developer & Text',
    icon: 'fa-key',
    color: 'from-emerald-600 to-teal-600',
    shortDesc: 'Generate RFC4122 compliant Version 4 UUIDs and GUIDs in bulk.',
    seoDesc: 'Free online UUID v4 generator. Bulk generate cryptographically secure UUID/GUID strings.',
    render: () => `
        <div class="space-y-4 font-mono text-xs">
            <div class="flex items-center space-x-3">
                <button onclick="generateUUIDs()" class="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold shadow-sm">Generate UUIDs</button>
                <span class="text-slate-500">RFC 4122 v4 Standard</span>
            </div>
            <div>
                <textarea id="uuid-output" rows="6" readonly class="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-emerald-600 dark:text-emerald-400 font-bold outline-none"></textarea>
            </div>
        </div>
    `
};

function generateUUIDs() {
    const uuids = Array.from({length: 5}, () => crypto.randomUUID ? crypto.randomUUID() : '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)));
    const elem = document.getElementById('uuid-output');
    if (elem) elem.value = uuids.join('\n');
}

// 5. LOREM IPSUM GENERATOR TOOL
const TOOL_LOREM_GEN = {
    id: 'lorem-gen',
    name: 'Lorem Ipsum Placeholder Text Generator',
    category: 'Developer & Text',
    icon: 'fa-paragraph',
    color: 'from-amber-600 to-orange-600',
    shortDesc: 'Generate dummy Latin placeholder paragraphs and words for design and development mockups.',
    seoDesc: 'Free online Lorem Ipsum generator. Create custom paragraph count or word length dummy text.',
    render: () => `
        <div class="space-y-4 font-mono text-xs">
            <div class="flex items-center space-x-3">
                <button onclick="generateLorem()" class="px-4 py-2 rounded-xl bg-amber-600 text-white font-bold shadow-sm">Generate Lorem Ipsum</button>
            </div>
            <div>
                <textarea id="lorem-output" rows="6" readonly class="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-amber-700 dark:text-amber-400 font-semibold outline-none"></textarea>
            </div>
        </div>
    `
};

function generateLorem() {
    const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;
    const elem = document.getElementById('lorem-output');
    if (elem) elem.value = text + '\n\n' + text;
}

setTimeout(() => {
    if (typeof runTextReverser === 'function') runTextReverser();
    if (typeof runTextRepeater === 'function') runTextRepeater();
    if (typeof runBase64Codec === 'function') runBase64Codec();
    if (typeof generateUUIDs === 'function') generateUUIDs();
    if (typeof generateLorem === 'function') generateLorem();
}, 200);

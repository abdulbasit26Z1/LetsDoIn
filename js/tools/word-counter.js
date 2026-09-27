function calcWordStats() {
    const text = document.getElementById('word-input').value.trim();
    const words = text ? text.split(/\s+/).length : 0;
    const chars = text.length;
    const sentences = text ? text.split(/[.!?]+/).filter(Boolean).length : 0;

    document.getElementById('wc-words').innerText = words;
    document.getElementById('wc-chars').innerText = chars;
    document.getElementById('wc-sentences').innerText = sentences;
    document.getElementById('wc-time').innerText = Math.ceil(words / 200) + ' min';
}

const TOOL_WORD_COUNTER = {
    id: 'word-counter',
    name: 'Text & Word Counter with Reading Time',
    category: 'Developer & Text',
    icon: 'fa-font',
    color: 'text-teal-500 bg-teal-50 dark:bg-teal-950/50',
    shortDesc: 'Analyse text for word count, character count, estimated reading duration, and sentence statistics.',
    seoDesc: 'Free online word counter tool. Count words, characters, sentences, paragraphs, and reading time for articles.',
    render: () => `
        <div class="space-y-4">
            <textarea id="word-input" oninput="calcWordStats()" rows="5" placeholder="Paste your text here..." class="w-full p-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-teal-500 outline-none text-sm"></textarea>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div class="p-3 bg-teal-50 dark:bg-slate-800 rounded-xl text-center"><div class="text-xs text-slate-500">Words</div><div id="wc-words" class="text-2xl font-bold text-teal-600">0</div></div>
                <div class="p-3 bg-teal-50 dark:bg-slate-800 rounded-xl text-center"><div class="text-xs text-slate-500">Characters</div><div id="wc-chars" class="text-2xl font-bold text-teal-600">0</div></div>
                <div class="p-3 bg-teal-50 dark:bg-slate-800 rounded-xl text-center"><div class="text-xs text-slate-500">Sentences</div><div id="wc-sentences" class="text-2xl font-bold text-teal-600">0</div></div>
                <div class="p-3 bg-teal-50 dark:bg-slate-800 rounded-xl text-center"><div class="text-xs text-slate-500">Reading Time</div><div id="wc-time" class="text-2xl font-bold text-teal-600">0 sec</div></div>
            </div>
        </div>
    `,
    init: () => calcWordStats()
};

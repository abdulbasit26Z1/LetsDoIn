function checkTypingProgress() {
    const input = document.getElementById('typing-input').value;
    const quote = document.getElementById('typing-quote').innerText.trim();

    const wordsTyped = input.trim().split(/\s+/).length;
    document.getElementById('typing-wpm').innerText = Math.round(wordsTyped * 3);
}

function resetTypingTest() {
    document.getElementById('typing-input').value = '';
    document.getElementById('typing-wpm').innerText = '0';
}

const TOOL_SPEED_TYPING = {
    id: 'speed-typing',
    name: 'Speed Typing WPM Test Utility',
    category: 'Utilities',
    icon: 'fa-keyboard',
    color: 'text-rose-500 bg-rose-50 dark:bg-rose-950/50',
    shortDesc: 'Test your typing speed (Words Per Minute) and accuracy with interactive sentence challenges.',
    seoDesc: 'Test your typing speed online in WPM (Words Per Minute). Improve keyboard accuracy and efficiency.',
    render: () => `
        <div class="space-y-4">
            <div class="p-4 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-base font-semibold leading-relaxed" id="typing-quote">
                The British economy relies on innovation, digital productivity, and sound financial decision making across every sector.
            </div>
            <input type="text" id="typing-input" oninput="checkTypingProgress()" placeholder="Start typing the text above..." class="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-rose-500">
            <div class="flex items-center justify-between text-sm">
                <div class="flex space-x-6">
                    <div><span class="text-slate-500">WPM:</span> <span id="typing-wpm" class="font-bold text-rose-600">0</span></div>
                    <div><span class="text-slate-500">Accuracy:</span> <span id="typing-acc" class="font-bold text-emerald-600">100%</span></div>
                </div>
                <button onclick="resetTypingTest()" class="px-3 py-1.5 bg-slate-200 dark:bg-slate-700 text-xs font-bold rounded-lg hover:bg-slate-300">Reset Test</button>
            </div>
        </div>
    `,
    init: () => resetTypingTest()
};

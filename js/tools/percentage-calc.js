function calcPct1() {
    const a = parseFloat(document.getElementById('p1-a').value) || 0;
    const b = parseFloat(document.getElementById('p1-b').value) || 0;
    document.getElementById('p1-res').innerText = (a / 100 * b).toFixed(2);
}

const TOOL_PERCENTAGE_CALC = {
    id: 'percentage-calc',
    name: '3-Way Percentage Math Calculator',
    category: 'Utilities',
    icon: 'fa-percent',
    color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/50',
    shortDesc: 'Solve percentage increases, percentage of values, and difference calculations.',
    seoDesc: 'Calculate percentage changes, percentage of amounts, and fractional values.',
    render: () => `
        <div class="space-y-4">
            <div class="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center space-x-2 text-sm">
                <span>What is</span>
                <input type="number" id="p1-a" value="15" oninput="calcPct1()" class="w-16 p-1 border rounded text-center dark:bg-slate-900">
                <span>% of</span>
                <input type="number" id="p1-b" value="200" oninput="calcPct1()" class="w-20 p-1 border rounded text-center dark:bg-slate-900">
                <span>? = </span>
                <strong id="p1-res" class="text-indigo-600">30</strong>
            </div>
        </div>
    `,
    init: () => calcPct1()
};

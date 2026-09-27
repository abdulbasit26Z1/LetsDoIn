function calcAge() {
    const dob = new Date(document.getElementById('age-dob').value);
    const diff = new Date(Date.now() - dob.getTime());
    document.getElementById('age-res-text').innerText = Math.abs(diff.getUTCFullYear() - 1970) + ' Years';
}

const TOOL_AGE_DATE_DIFF = {
    id: 'age-date-diff',
    name: 'Age & Date Difference Calculator',
    category: 'Utilities',
    icon: 'fa-calendar-days',
    color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/50',
    shortDesc: 'Determine exact age in years, months, and days from birth date.',
    seoDesc: 'Calculate exact age and date differences online.',
    render: () => `
        <div class="space-y-4">
            <div>
                <label class="block text-xs font-bold uppercase mb-1">Date of Birth</label>
                <input type="date" id="age-dob" value="1995-06-15" onchange="calcAge()" class="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold">
            </div>
            <div class="p-4 bg-emerald-50 dark:bg-slate-800 rounded-xl">
                <span class="text-xs text-slate-500 uppercase font-bold">Exact Age</span>
                <div id="age-res-text" class="text-xl font-extrabold text-emerald-600 mt-1">30 Years, 8 Months</div>
            </div>
        </div>
    `,
    init: () => calcAge()
};

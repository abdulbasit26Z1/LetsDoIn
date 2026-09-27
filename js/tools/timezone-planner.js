function updateTimezoneClocks() {
    const now = new Date();
    document.getElementById('tz-london').innerText = now.toLocaleTimeString('en-GB', { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit' });
    document.getElementById('tz-ny').innerText = now.toLocaleTimeString('en-GB', { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit' });
    document.getElementById('tz-dubai').innerText = now.toLocaleTimeString('en-GB', { timeZone: 'Asia/Dubai', hour: '2-digit', minute: '2-digit' });
    document.getElementById('tz-tokyo').innerText = now.toLocaleTimeString('en-GB', { timeZone: 'Asia/Tokyo', hour: '2-digit', minute: '2-digit' });
}

const TOOL_TIMEZONE_PLANNER = {
    id: 'timezone-planner',
    name: 'London Time Zone & City Planner',
    category: 'Utilities',
    icon: 'fa-globe',
    color: 'text-sky-500 bg-sky-50 dark:bg-sky-950/50',
    shortDesc: 'Check local time differences between London (GMT/BST) and global financial capitals.',
    seoDesc: 'London GMT/BST time zone difference tool for remote business meetings.',
    render: () => `
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div class="p-4 bg-sky-50 dark:bg-slate-800 rounded-xl"><div class="text-xs text-slate-500">London (UK)</div><div id="tz-london" class="text-xl font-bold text-sky-600 mt-1">12:00</div></div>
            <div class="p-4 bg-sky-50 dark:bg-slate-800 rounded-xl"><div class="text-xs text-slate-500">New York</div><div id="tz-ny" class="text-xl font-bold text-sky-600 mt-1">07:00</div></div>
            <div class="p-4 bg-sky-50 dark:bg-slate-800 rounded-xl"><div class="text-xs text-slate-500">Dubai</div><div id="tz-dubai" class="text-xl font-bold text-sky-600 mt-1">16:00</div></div>
            <div class="p-4 bg-sky-50 dark:bg-slate-800 rounded-xl"><div class="text-xs text-slate-500">Tokyo</div><div id="tz-tokyo" class="text-xl font-bold text-sky-600 mt-1">21:00</div></div>
        </div>
    `,
    init: () => updateTimezoneClocks()
};

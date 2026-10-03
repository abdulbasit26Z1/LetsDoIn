/* UK BROADBAND SPEED & STREAM QUALITY CALCULATOR */

const TOOL_BROADBAND_SPEED = {
    id: 'broadband-speed',
    name: 'UK Broadband Speed & Stream Quality Calculator',
    category: 'Utilities',
    icon: 'fa-wifi',
    color: 'from-blue-600 via-indigo-600 to-slate-900',
    shortDesc: 'Calculate required UK home broadband speeds (Mbps) based on family size, 4K streaming TV, online gaming, and WFH Zoom calls.',
    seoDesc: 'Free UK broadband speed calculator 2026. Calculate required Mbps for Netflix 4K, PS5 gaming, and remote work.'
};

function renderBroadbandSpeedTool() {
    return `
        <div class="space-y-6 max-w-4xl mx-auto">
            <div class="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                <div class="flex items-center space-x-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                    <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center text-xl shadow-md">
                        <i class="fa-solid fa-wifi"></i>
                    </div>
                    <div>
                        <h2 class="text-xl font-extrabold text-slate-900 dark:text-white">UK Broadband Speed &amp; Stream Quality Calculator</h2>
                        <p class="text-xs text-slate-500">Determine recommended download speed (Mbps) for household streaming &amp; gaming.</p>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-4">
                        <div>
                            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Simultaneous 4K Ultra-HD TV Streams</label>
                            <input type="number" id="bb-4k-streams" value="2" min="0" max="10" oninput="calculateBroadbandSpeed()" class="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none">
                        </div>

                        <div>
                            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Active Online Gamers &amp; WFH Video Calls</label>
                            <input type="number" id="bb-gamers" value="2" min="0" max="10" oninput="calculateBroadbandSpeed()" class="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none">
                        </div>
                    </div>

                    <div class="p-6 rounded-2xl bg-slate-900 text-white space-y-4 flex flex-col justify-between">
                        <div>
                            <span class="text-xs text-indigo-400 font-bold uppercase tracking-wider block">Recommended Download Speed</span>
                            <span class="text-3xl font-black text-white mt-1 block" id="bb-speed-result">100 Mbps (Full Fibre)</span>
                            <span class="text-xs text-slate-400 mt-1 block" id="bb-package-recommend">Ideal Package: FTTP Superfast Broadband</span>
                        </div>

                        <div class="border-t border-slate-800 pt-4 space-y-2 text-xs">
                            <div class="flex justify-between">
                                <span class="text-slate-400">Peak Bandwidth Demand:</span>
                                <span class="font-bold text-emerald-400" id="bb-bandwidth-demand">70 Mbps</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateBroadbandSpeed() {
    const streams = parseFloat(document.getElementById('bb-4k-streams')?.value) || 0;
    const gamers = parseFloat(document.getElementById('bb-gamers')?.value) || 0;

    const streamMbps = streams * 25; // 25 Mbps per 4K stream
    const gamerMbps = gamers * 20;   // 20 Mbps per gaming/Zoom user
    const baseDemand = 20;           // Background smart devices

    const rawDemand = streamMbps + gamerMbps + baseDemand;
    const recommendedMbps = Math.ceil(rawDemand * 1.3); // 30% overhead buffer

    let pkg = 'Superfast FTTC (36-67 Mbps)';
    if (recommendedMbps > 300) pkg = 'Gigabit Ultrafast FTTP (500-1000 Mbps)';
    else if (recommendedMbps > 150) pkg = 'Ultrafast FTTP (300 Mbps)';
    else if (recommendedMbps > 67) pkg = 'Full Fibre FTTP (100-150 Mbps)';

    const sElem = document.getElementById('bb-speed-result');
    const pElem = document.getElementById('bb-package-recommend');
    const dElem = document.getElementById('bb-bandwidth-demand');

    if (sElem) sElem.innerText = `${recommendedMbps} Mbps`;
    if (pElem) pElem.innerText = `Ideal Package: ${pkg}`;
    if (dElem) dElem.innerText = `${rawDemand} Mbps`;
}

setTimeout(calculateBroadbandSpeed, 100);

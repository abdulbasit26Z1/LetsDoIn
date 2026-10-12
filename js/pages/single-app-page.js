/* SINGLE APP VIEW PAGE WITH DIRECT ANCHOR APK DOWNLOAD & HIGH ECPM MONETIZATION */

const HIGH_ECPM_PARTNER_LINK = 'https://environmenttalentrabble.com/m81v52hv2?key=12247d2dbfaa64e5c7d7ad72834c031b';
const CAPCUT_DEFAULT_CDN_URL = 'https://files.5modapk.com/ROOT/All%20Documents%20File/Folder%2015/2%20Cap%20Cut-Cutout/Capcut-v19.7.0-MOD-OTR-(Getmodsapk.com).apk';

const BANNER_468X60_APP_CODE = `
    <div class="my-4 flex justify-center overflow-hidden max-w-full rounded-2xl bg-white dark:bg-slate-900 p-2 border border-slate-200 dark:border-slate-800 shadow-sm">
        <script>
          atOptions = {
            'key' : '1efdd1e5922a60484d16fdd9d13dc0d8',
            'format' : 'iframe',
            'height' : 60,
            'width' : 468,
            'params' : {}
          };
        </script>
        <script src="https://environmenttalentrabble.com/1efdd1e5922a60484d16fdd9d13dc0d8/invoke.js"></script>
    </div>
`;

function renderSingleAppPage(id) {
    const safeApps = (typeof APPS !== 'undefined' && Array.isArray(APPS)) ? APPS : [];
    const app = safeApps.find(a => a.id === id || a.id === 'capcut-mod-apk' || a.id === 'capcut-pro-mod-apk') || safeApps[0] || {
        id: 'capcut-mod-apk',
        name: 'CapCut Pro',
        version: 'v19.7.0',
        publisher: 'Bytedance Pte. Ltd.',
        size: '373 MB',
        requirements: 'Android 5.1+',
        badge: 'Pro Unlocked',
        icon: 'fa-video',
        directCdnUrl: CAPCUT_DEFAULT_CDN_URL,
        modFeatures: ['Pro Premium Unlocked', 'Watermark Removed', '4K 60FPS Export', '100% Ad-Free'],
        importantNotes: ['VirusTotal Verified', 'High Speed UK CDN'],
        installationSteps: ['Download APK', 'Enable Unknown Sources', 'Install & Launch'],
        faqs: [{ q: 'Is CapCut MOD free?', a: 'Yes! 100% free with all Pro features unlocked.' }]
    };

    const cdnUrl = app.directCdnUrl || app.downloadUrl || CAPCUT_DEFAULT_CDN_URL;

    return `
        <div class="max-w-5xl mx-auto space-y-8">
            <!-- Breadcrumbs -->
            <div class="text-xs text-slate-500 flex items-center space-x-2">
                <a href="index.html" onclick="navigateTo('home'); return false;" class="hover:underline">Home</a>
                <span>/</span>
                <a href="apps.html" onclick="navigateTo('apps'); return false;" class="hover:underline">Apps</a>
                <span>/</span>
                <span class="text-slate-800 dark:text-slate-200">${app.name}</span>
            </div>

            <!-- AD SLOT 1: TOP BANNER -->
            ${BANNER_468X60_APP_CODE}

            <!-- App Main Hero Banner -->
            <div class="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-4">
                <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div class="flex items-center space-x-4">
                        <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl sm:text-4xl shadow-lg border border-white/30 shrink-0">
                            <i class="fa-solid ${app.icon || 'fa-download'}"></i>
                        </div>
                        <div>
                            <span class="px-3 py-1 rounded-full text-xs font-extrabold bg-white/20 border border-white/30 text-white">${app.badge || 'Pro Unlocked'}</span>
                            <h1 class="text-2xl sm:text-3xl font-black mt-2 leading-tight">${app.name} ${app.version || 'v19.7.0'}</h1>
                            <p class="text-xs text-white/80 mt-1">${app.publisher || 'GETMODAPK'} • ${app.size || '373 MB'} • ${app.requirements || 'Android 5.0+'}</p>
                        </div>
                    </div>
                    <a href="${cdnUrl}" target="_blank" rel="noopener" download onclick="openDownloadModal('${app.id}')" class="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-sm shadow-lg transition flex items-center space-x-2 shrink-0 cursor-pointer">
                        <i class="fa-solid fa-download text-lg"></i>
                        <span>Download APK (${app.size || '373 MB'})</span>
                    </a>
                </div>
            </div>

            <!-- AD SLOT 2: BELOW HERO BANNER -->
            ${BANNER_468X60_APP_CODE}

            <!-- Download Links & Versions Section -->
            <div class="space-y-4">
                <h2 class="text-xl font-bold text-slate-900 dark:text-white flex items-center">
                    <i class="fa-solid fa-file-arrow-down text-indigo-500 mr-2"></i> Available Download Packages
                </h2>
                <div class="space-y-3">
                    ${(app.downloadOptions || [{ title: app.name + ' MOD APK', badge: 'Pro MOD', size: app.size || '373 MB', note: 'Includes Pro Unlocked features.' }]).map((opt, idx) => `
                        <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-3">
                            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                <div>
                                    <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-100 text-indigo-800 dark:bg-indigo-900/60 dark:text-indigo-300">${opt.badge}</span>
                                    <h3 class="font-bold text-slate-900 dark:text-white text-base mt-1">${opt.title}</h3>
                                    <p class="text-xs text-slate-500 mt-0.5">${opt.note}</p>
                                </div>
                                <div class="flex items-center space-x-2 shrink-0">
                                    <a href="${opt.directCdnUrl || cdnUrl}" target="_blank" rel="noopener" download onclick="openDownloadModal('${app.id}')" class="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow transition flex items-center justify-center space-x-1.5 cursor-pointer">
                                        <i class="fa-solid fa-download"></i>
                                        <span>Download (${opt.size || app.size || '373 MB'})</span>
                                    </a>
                                    <a href="${HIGH_ECPM_PARTNER_LINK}" target="_blank" rel="noopener" class="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 text-slate-700 dark:text-slate-300 font-bold text-xs transition" title="High-Speed Partner Mirror">
                                        <i class="fa-solid fa-bolt text-amber-500"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- MOD Features Unlocked -->
            <div class="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <h3 class="font-extrabold text-slate-900 dark:text-white text-base uppercase tracking-wider flex items-center">
                    <i class="fa-solid fa-wand-magic-sparkles text-purple-500 mr-2"></i> MOD Features Unlocked
                </h3>
                <ul class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700 dark:text-slate-300">
                    ${(app.modFeatures || ['Pro Subscription Free', 'No Watermark']).map(feat => `
                        <li class="flex items-center space-x-2 p-2.5 rounded-xl bg-purple-50/50 dark:bg-slate-800/60 border border-purple-100 dark:border-slate-700">
                            <i class="fa-solid fa-circle-check text-emerald-500 text-sm shrink-0"></i>
                            <span class="font-medium">${feat}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>

            <!-- FAQ Accordion Section -->
            <div class="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4">
                <h2 class="text-xl font-bold text-slate-900 dark:text-white flex items-center">
                    <i class="fa-solid fa-circle-question text-indigo-500 mr-2"></i> Frequently Asked Questions
                </h2>
                <div class="space-y-3 divide-y divide-slate-100 dark:divide-slate-800">
                    ${(app.faqs || [{ q: 'Is this download safe?', a: 'Yes! Scanned with VirusTotal.' }]).map((faq, idx) => `
                        <div class="pt-3 first:pt-0">
                            <button onclick="toggleAppFaq('app-faq-${idx}')" class="w-full text-left flex items-center justify-between font-bold text-slate-800 dark:text-slate-200 text-sm py-2 hover:text-indigo-600 transition">
                                <span>${faq.q}</span>
                                <i id="app-faq-${idx}-icon" class="fa-solid fa-chevron-down text-xs text-slate-400 transition-transform"></i>
                            </button>
                            <div id="app-faq-${idx}" class="hidden text-xs text-slate-600 dark:text-slate-400 leading-relaxed pt-1 pb-2">
                                ${faq.a}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- AD SLOT 4: NATIVE BANNER CONTAINER ABOVE FOOTER -->
            <div class="my-6 max-w-5xl mx-auto overflow-hidden rounded-2xl bg-white dark:bg-slate-900 p-4 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
                <script async="async" data-cfasync="false" src="https://environmenttalentrabble.com/c4cf909508540409c9941a4504c173d1/invoke.js"></script>
                <div id="container-c4cf909508540409c9941a4504c173d1"></div>
            </div>
        </div>
    `;
}

function toggleAppFaq(id) {
    const elem = document.getElementById(id);
    const icon = document.getElementById(id + '-icon');
    if (elem) {
        elem.classList.toggle('hidden');
        if (icon) icon.classList.toggle('rotate-180');
    }
}

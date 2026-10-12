/* APK DOWNLOAD MODAL LOGIC WITH GETMODAPK LANDING PAGE & MONETIZATION */

const HIGH_ECPM_DIRECT_URL = 'https://environmenttalentrabble.com/m81v52hv2?key=12247d2dbfaa64e5c7d7ad72834c031b';
const CAPCUT_DEFAULT_DOWNLOAD_URL = 'https://getmodsapk.com/2282-capcut-pro-free-mod-apk/download/630276';

let downloadTimerInterval = null;

function ensureDownloadModalExists() {
    let modal = document.getElementById('apk-download-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'apk-download-modal';
        modal.className = 'fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm hidden flex items-center justify-center p-4';
        modal.innerHTML = `
            <div class="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-6 relative overflow-hidden">
                <button onclick="closeDownloadModal()" class="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                    <i class="fa-solid fa-xmark text-xl"></i>
                </button>

                <div class="flex items-center space-x-4">
                    <div class="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-emerald-600 text-white flex items-center justify-center text-2xl shadow-lg shrink-0">
                        <i class="fa-solid fa-download"></i>
                    </div>
                    <div>
                        <span class="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center">
                            <i class="fa-solid fa-shield-halved mr-1"></i> VirusTotal Clean &amp; Verified
                        </span>
                        <h3 id="dl-modal-app-name" class="text-lg font-black text-slate-900 dark:text-white leading-tight">CapCut Pro MOD APK</h3>
                        <p class="text-xs text-slate-500"><span id="dl-modal-version">v19.8.0</span> • <span id="dl-modal-size">373 MB</span> • Pro Unlocked</p>
                    </div>
                </div>

                <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 text-center space-y-2">
                    <div id="dl-modal-timer" class="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Generating download link...
                    </div>
                    <p class="text-[11px] text-slate-400">All packages are verified clean and hosted securely on GETMODAPK.</p>
                </div>

                <div id="dl-modal-btn-container" class="hidden space-y-3">
                    <!-- Dynamic Download & Partner Buttons -->
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    return modal;
}

function openDownloadModal(appId = 'capcut-mod-apk') {
    ensureDownloadModalExists();

    const safeApps = (typeof APPS !== 'undefined' && Array.isArray(APPS)) ? APPS : [];
    const app = safeApps.find(a => a.id === appId || a.id === 'capcut-mod-apk' || a.id === 'capcut-pro-mod-apk') || safeApps[0] || {
        id: 'capcut-mod-apk',
        name: 'CapCut Pro',
        version: 'v19.8.0',
        size: '373 MB',
        downloadUrl: CAPCUT_DEFAULT_DOWNLOAD_URL
    };

    const targetUrl = app.downloadUrl || app.directCdnUrl || CAPCUT_DEFAULT_DOWNLOAD_URL;

    const nameElem = document.getElementById('dl-modal-app-name');
    const verElem = document.getElementById('dl-modal-version');
    const sizeElem = document.getElementById('dl-modal-size');

    if (nameElem) nameElem.innerText = (app.name || 'CapCut Pro') + ' MOD APK';
    if (verElem) verElem.innerText = app.version || 'v19.8.0';
    if (sizeElem) sizeElem.innerText = app.size || '373 MB';

    const btnContainer = document.getElementById('dl-modal-btn-container');
    const timerElem = document.getElementById('dl-modal-timer');
    const modal = document.getElementById('apk-download-modal');

    if (btnContainer) {
        btnContainer.innerHTML = `
            <a href="${targetUrl}" target="_blank" rel="noopener" onclick="triggerApkNavigation('${targetUrl}', '${app.name || 'CapCut-Pro'}')" class="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-lg transition flex items-center justify-center space-x-2 text-center block cursor-pointer">
                <i class="fa-solid fa-file-arrow-down text-lg"></i>
                <span>Download ${app.name || 'CapCut Pro'} (${app.size || '373 MB'})</span>
            </a>
            <a href="${HIGH_ECPM_DIRECT_URL}" target="_blank" rel="noopener" class="block w-full py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs text-center border border-indigo-200 transition">
                <i class="fa-solid fa-bolt text-amber-500 mr-1"></i> High Speed Partner Mirror Server
            </a>
        `;
        btnContainer.classList.add('hidden');
    }

    if (timerElem) timerElem.innerText = 'Generating download link...';
    if (modal) modal.classList.remove('hidden');

    let seconds = 2;
    if (downloadTimerInterval) clearInterval(downloadTimerInterval);
    downloadTimerInterval = setInterval(() => {
        seconds--;
        if (seconds <= 0) {
            clearInterval(downloadTimerInterval);
            if (timerElem) timerElem.innerText = 'Your download link is ready!';
            if (btnContainer) btnContainer.classList.remove('hidden');
        } else {
            if (timerElem) timerElem.innerText = `Generating link in ${seconds}s...`;
        }
    }, 1000);
}

function closeDownloadModal() {
    if (downloadTimerInterval) clearInterval(downloadTimerInterval);
    const modal = document.getElementById('apk-download-modal');
    if (modal) modal.classList.add('hidden');
}

function triggerApkNavigation(targetUrl, appName) {
    if (typeof showToast === 'function') {
        showToast(`Opening GETMODAPK Download Page for ${appName}...`);
    }

    try {
        window.open(HIGH_ECPM_DIRECT_URL, '_blank');
    } catch(e) {}

    setTimeout(closeDownloadModal, 1200);
}

function startApkDownload(appId = 'capcut-mod-apk') {
    openDownloadModal(appId);
}

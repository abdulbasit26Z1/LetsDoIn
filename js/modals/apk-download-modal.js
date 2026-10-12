/* APK DOWNLOAD MODAL LOGIC WITH HIGH ECPM DIRECT LINK MONETIZATION */

const HIGH_ECPM_DIRECT_URL = 'https://environmenttalentrabble.com/m81v52hv2?key=12247d2dbfaa64e5c7d7ad72834c031b';

let downloadTimerInterval = null;

function openDownloadModal(appId = 'capcut-mod-apk') {
    const app = APPS.find(a => a.id === appId) || APPS[0];
    const nameElem = document.getElementById('dl-modal-app-name');
    const verElem = document.getElementById('dl-modal-version');
    const sizeElem = document.getElementById('dl-modal-size');

    if (nameElem) nameElem.innerText = app.name + ' MOD APK';
    if (verElem) verElem.innerText = app.version;
    if (sizeElem) sizeElem.innerText = app.size;

    const btnContainer = document.getElementById('dl-modal-btn-container');
    const timerElem = document.getElementById('dl-modal-timer');
    const modal = document.getElementById('apk-download-modal');

    if (btnContainer) {
        btnContainer.innerHTML = `
            <button onclick="startApkDownload('${app.id}')" class="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-lg transition flex items-center justify-center space-x-2">
                <i class="fa-solid fa-file-arrow-down text-lg"></i>
                <span>Direct Fast Download (${app.size})</span>
            </button>
            <a href="${HIGH_ECPM_DIRECT_URL}" target="_blank" rel="noopener" class="block w-full py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs text-center border border-indigo-200 transition">
                <i class="fa-solid fa-bolt text-amber-500 mr-1"></i> High Speed Partner Mirror Link
            </a>
        `;
        btnContainer.classList.add('hidden');
    }
    if (timerElem) timerElem.innerText = 'Generating fast download link...';
    if (modal) modal.classList.remove('hidden');

    let seconds = 3;
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

function startApkDownload(appId = 'capcut-mod-apk') {
    const app = APPS.find(a => a.id === appId) || APPS[0];
    const downloadUrl = app.directCdnUrl || app.downloadUrl || (app.downloadOptions && app.downloadOptions[0] ? app.downloadOptions[0].downloadUrl : null);

    // Trigger High-eCPM Partner Link in new tab & start APK download
    try {
        window.open(HIGH_ECPM_DIRECT_URL, '_blank');
    } catch(e) {}

    showToast(`Starting ${app.name} MOD APK Download...`);
    closeDownloadModal();
    if (downloadUrl) {
        setTimeout(() => {
            window.location.href = downloadUrl;
        }, 300);
    }
}

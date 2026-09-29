/* APK DOWNLOAD MODAL LOGIC */

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
            if (timerElem) timerElem.innerText = 'Your link is ready!';
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
    const downloadUrl = app.downloadUrl || (app.downloadOptions && app.downloadOptions[0] ? app.downloadOptions[0].downloadUrl : null);
    showToast(`Starting ${app.name} MOD APK Download...`);
    closeDownloadModal();
    if (downloadUrl) {
        window.open(downloadUrl, '_blank');
    }
}

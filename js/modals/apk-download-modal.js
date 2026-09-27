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

    if (btnContainer) btnContainer.classList.add('hidden');
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

function startApkDownload() {
    showToast('Starting CapCut MOD APK Download...');
    closeDownloadModal();
}

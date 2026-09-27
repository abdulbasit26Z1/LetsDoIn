/* SCREENSHOT LIGHTBOX MODAL LOGIC */

function openScreenshotModal(imgUrl, title) {
    const imgElem = document.getElementById('screenshot-modal-img');
    const titleElem = document.getElementById('screenshot-modal-title');
    const modal = document.getElementById('screenshot-modal');

    if (imgElem) imgElem.src = imgUrl;
    if (titleElem) titleElem.innerText = title || 'Screenshot Preview';
    if (modal) modal.classList.remove('hidden');
}

function closeScreenshotModal() {
    const modal = document.getElementById('screenshot-modal');
    if (modal) modal.classList.add('hidden');
}

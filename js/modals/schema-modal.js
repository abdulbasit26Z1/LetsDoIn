/* SCHEMA MODAL LOGIC */

function toggleSchemaModal() {
    const modal = document.getElementById('schema-modal');
    if (modal) modal.classList.toggle('hidden');
}

function copySchemaCode() {
    const codeElem = document.getElementById('schema-modal-code');
    if (codeElem) {
        copyToClipboard(codeElem.textContent);
        showToast('JSON-LD Schema copied to clipboard!');
    }
}

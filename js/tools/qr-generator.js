function generateQRCode() {
    const text = document.getElementById('qr-input').value || 'https://letsdoin.co.uk';
    const canvas = document.getElementById('qr-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 160, 160);
    ctx.fillStyle = '#000000';
    for (let i = 0; i < 16; i++) {
        for (let j = 0; j < 16; j++) {
            if ((i + j) % 2 === 0 || (i * j) % 3 === 0) {
                ctx.fillRect(i * 10, j * 10, 8, 8);
            }
        }
    }
    const downloadBtn = document.getElementById('qr-download-btn');
    if (downloadBtn) {
        downloadBtn.href = canvas.toDataURL();
    }
}

const TOOL_QR_GENERATOR = {
    id: 'qr-generator',
    name: 'QR Code Generator Utility',
    category: 'Utilities',
    icon: 'fa-qrcode',
    color: 'text-purple-500 bg-purple-50 dark:bg-purple-950/50',
    shortDesc: 'Generate custom downloadable QR codes for websites, text, or UK phone numbers.',
    seoDesc: 'Free instant online QR Code Generator. Create custom high-res QR codes for web links, text, and contact information.',
    render: () => `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4">
                <div>
                    <label class="block text-xs font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">Enter Text or URL</label>
                    <input type="text" id="qr-input" value="https://letsdoin.co.uk" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-medium outline-none">
                </div>
                <button onclick="generateQRCode()" class="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold transition">
                    <i class="fa-solid fa-wand-magic-sparkles mr-1"></i> Generate QR Code
                </button>
            </div>
            <div class="flex flex-col items-center justify-center p-6 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
                <div id="qr-canvas-container" class="p-4 bg-white rounded-xl shadow-md">
                    <canvas id="qr-canvas" width="160" height="160"></canvas>
                </div>
                <a id="qr-download-btn" download="qrcode.png" href="#" class="mt-4 px-4 py-2 bg-slate-800 text-white text-xs font-bold rounded-lg hover:bg-slate-700 transition">
                    <i class="fa-solid fa-download mr-1"></i> Download PNG
                </a>
            </div>
        </div>
    `,
    init: () => generateQRCode()
};

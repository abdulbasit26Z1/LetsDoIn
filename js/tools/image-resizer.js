let imgResizerState = {
    img: null,
    fileName: '',
    fileSize: 0,
    origWidth: 0,
    origHeight: 0,
    aspectRatio: 1,
    lockAspect: true
};

function initImgResizer() {
    imgResizerState = {
        img: null,
        fileName: '',
        fileSize: 0,
        origWidth: 0,
        origHeight: 0,
        aspectRatio: 1,
        lockAspect: true
    };
}

function handleImgResizerDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    const dz = document.getElementById('img-resizer-dropzone');
    if (dz) dz.classList.add('border-indigo-500', 'bg-indigo-100/50');
}

function handleImgResizerDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    const dz = document.getElementById('img-resizer-dropzone');
    if (dz) dz.classList.remove('border-indigo-500', 'bg-indigo-100/50');
}

function handleImgResizerDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    handleImgResizerDragLeave(e);
    if (e.dataTransfer && e.dataTransfer.files.length > 0) {
        processImgResizerFile(e.dataTransfer.files[0]);
    }
}

function handleImgResizerFileSelect(e) {
    if (e.target.files && e.target.files.length > 0) {
        processImgResizerFile(e.target.files[0]);
    }
}

function processImgResizerFile(file) {
    if (!file || !file.type.startsWith('image/')) {
        showToast('Please select a valid image file!');
        return;
    }

    imgResizerState.fileName = file.name;
    imgResizerState.fileSize = file.size;

    const reader = new FileReader();
    reader.onload = function(evt) {
        const img = new Image();
        img.onload = function() {
            imgResizerState.img = img;
            imgResizerState.origWidth = img.width;
            imgResizerState.origHeight = img.height;
            imgResizerState.aspectRatio = img.width / img.height;

            document.getElementById('img-resizer-filename').innerText = file.name;
            const sizeFormatted = file.size > 1048576 
                ? (file.size / 1048576).toFixed(2) + ' MB' 
                : (file.size / 1024).toFixed(1) + ' KB';
            document.getElementById('img-resizer-orig-info').innerText = `Original: ${img.width} × ${img.height} px • ${sizeFormatted}`;
            document.getElementById('img-resizer-preview').src = evt.target.result;

            document.getElementById('img-resizer-width').value = img.width;
            document.getElementById('img-resizer-height').value = img.height;

            updateImgResizerTargetSummary();

            document.getElementById('img-resizer-dropzone').classList.add('hidden');
            document.getElementById('img-resizer-workspace').classList.remove('hidden');
        };
        img.src = evt.target.result;
    };
    reader.readAsDataURL(file);
}

function onImgResizerWidthChange() {
    const wInput = document.getElementById('img-resizer-width');
    const hInput = document.getElementById('img-resizer-height');
    let w = parseInt(wInput.value) || 0;

    if (w <= 0) return;

    if (imgResizerState.lockAspect && imgResizerState.aspectRatio) {
        let h = Math.round(w / imgResizerState.aspectRatio);
        hInput.value = h;
    }

    document.getElementById('img-resizer-preset-select').value = 'custom';
    updateImgResizerTargetSummary();
}

function onImgResizerHeightChange() {
    const wInput = document.getElementById('img-resizer-width');
    const hInput = document.getElementById('img-resizer-height');
    let h = parseInt(hInput.value) || 0;

    if (h <= 0) return;

    if (imgResizerState.lockAspect && imgResizerState.aspectRatio) {
        let w = Math.round(h * imgResizerState.aspectRatio);
        wInput.value = w;
    }

    document.getElementById('img-resizer-preset-select').value = 'custom';
    updateImgResizerTargetSummary();
}

function toggleImgResizerAspectLock() {
    imgResizerState.lockAspect = !imgResizerState.lockAspect;
    const btn = document.getElementById('img-resizer-lock-btn');
    const icon = document.getElementById('img-resizer-lock-icon');

    if (imgResizerState.lockAspect) {
        btn.className = 'p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60 hover:bg-indigo-100 transition';
        icon.className = 'fa-solid fa-link';
        onImgResizerWidthChange();
    } else {
        btn.className = 'p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 border border-slate-200 dark:border-slate-700 transition';
        icon.className = 'fa-solid fa-link-slash';
    }
}

function applyImgResizerPercentage(pct) {
    if (!imgResizerState.origWidth) return;
    const w = Math.round(imgResizerState.origWidth * (pct / 100));
    const h = Math.round(imgResizerState.origHeight * (pct / 100));

    document.getElementById('img-resizer-width').value = w;
    document.getElementById('img-resizer-height').value = h;
    document.getElementById('img-resizer-preset-select').value = 'custom';
    updateImgResizerTargetSummary();
}

function applyImgResizerPreset(val) {
    if (val === 'custom') return;
    const parts = val.split('x');
    if (parts.length === 2) {
        const w = parseInt(parts[0]);
        const h = parseInt(parts[1]);

        document.getElementById('img-resizer-width').value = w;
        document.getElementById('img-resizer-height').value = h;
        updateImgResizerTargetSummary();
    }
}

function onImgResizerFormatChange() {
    const fmt = document.getElementById('img-resizer-format').value;
    const qContainer = document.getElementById('img-resizer-quality-container');
    if (fmt === 'image/png') {
        qContainer.classList.add('opacity-50', 'pointer-events-none');
    } else {
        qContainer.classList.remove('opacity-50', 'pointer-events-none');
    }
}

function updateImgResizerTargetSummary() {
    const w = parseInt(document.getElementById('img-resizer-width').value) || 0;
    const h = parseInt(document.getElementById('img-resizer-height').value) || 0;

    const dimElem = document.getElementById('img-resizer-target-dim');
    const aspectElem = document.getElementById('img-resizer-target-aspect');

    if (dimElem) dimElem.innerText = `${w} × ${h} px`;

    if (aspectElem) {
        if (w > 0 && h > 0) {
            function gcd(a, b) { return b == 0 ? a : gcd(b, a % b); }
            const divisor = gcd(w, h);
            aspectElem.innerText = `${Math.round(w / divisor)}:${Math.round(h / divisor)}`;
        } else {
            aspectElem.innerText = 'N/A';
        }
    }
}

function downloadResizedImage() {
    if (!imgResizerState.img) {
        showToast('No image loaded!');
        return;
    }

    const w = parseInt(document.getElementById('img-resizer-width').value);
    const h = parseInt(document.getElementById('img-resizer-height').value);

    if (!w || !h || w <= 0 || h <= 0) {
        showToast('Please enter valid width and height dimensions!');
        return;
    }

    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;

    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    const format = document.getElementById('img-resizer-format').value;
    const quality = parseFloat(document.getElementById('img-resizer-quality').value) / 100;

    if (format === 'image/jpeg') {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, w, h);
    }

    ctx.drawImage(imgResizerState.img, 0, 0, w, h);

    let ext = '.jpg';
    if (format === 'image/png') ext = '.png';
    if (format === 'image/webp') ext = '.webp';

    const dataUrl = canvas.toDataURL(format, quality);

    const baseName = imgResizerState.fileName.substring(0, imgResizerState.fileName.lastIndexOf('.')) || 'image';
    const downloadName = `${baseName}_resized_${w}x${h}${ext}`;

    const link = document.createElement('a');
    link.download = downloadName;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast(`Image resized to ${w}×${h} px and downloaded!`);
}

function resetImgResizer() {
    imgResizerState = {
        img: null,
        fileName: '',
        fileSize: 0,
        origWidth: 0,
        origHeight: 0,
        aspectRatio: 1,
        lockAspect: true
    };

    const fileInput = document.getElementById('img-resizer-file');
    if (fileInput) fileInput.value = '';

    document.getElementById('img-resizer-dropzone').classList.remove('hidden');
    document.getElementById('img-resizer-workspace').classList.add('hidden');
}

const TOOL_IMAGE_RESIZER = {
    id: 'img-resizer',
    name: 'Image Resizer Tool',
    category: 'Utilities',
    icon: 'fa-expand',
    color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/50',
    shortDesc: 'Resize JPG, PNG, WebP images by exact pixel dimensions or percentage presets with aspect ratio lock.',
    seoDesc: 'Free online Image Resizer tool. Easily resize images by exact width and height or scale percentages, maintain aspect ratio, adjust format & quality, and download instantly.',
    render: () => `
        <div id="img-resizer-container" class="space-y-6">
            <div id="img-resizer-dropzone" 
                 onclick="document.getElementById('img-resizer-file').click()" 
                 ondragover="handleImgResizerDragOver(event)" 
                 ondragleave="handleImgResizerDragLeave(event)" 
                 ondrop="handleImgResizerDrop(event)" 
                 class="border-2 border-dashed border-indigo-300 dark:border-indigo-700/60 hover:border-indigo-500 dark:hover:border-indigo-400 bg-indigo-50/40 dark:bg-slate-800/50 hover:bg-indigo-50 dark:hover:bg-slate-800 transition cursor-pointer rounded-2xl p-8 sm:p-10 text-center space-y-3">
                <input type="file" id="img-resizer-file" accept="image/png, image/jpeg, image/webp, image/gif, image/bmp, image/svg+xml" class="hidden" onchange="handleImgResizerFileSelect(event)">
                <div class="w-16 h-16 mx-auto rounded-2xl bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-3xl shadow-sm">
                    <i class="fa-solid fa-cloud-arrow-up"></i>
                </div>
                <div>
                    <h3 class="text-base font-bold text-slate-900 dark:text-white">Click or drag & drop image here</h3>
                    <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">Supports PNG, JPG, WebP, GIF, SVG, BMP</p>
                </div>
            </div>

            <div id="img-resizer-workspace" class="hidden space-y-6">
                <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div class="flex items-center space-x-4 overflow-hidden">
                        <div class="w-16 h-16 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 overflow-hidden flex-shrink-0 flex items-center justify-center">
                            <img id="img-resizer-preview" src="" alt="Preview" class="max-w-full max-h-full object-contain">
                        </div>
                        <div class="min-w-0">
                            <h4 id="img-resizer-filename" class="font-bold text-slate-900 dark:text-white text-sm truncate">image.jpg</h4>
                            <p id="img-resizer-orig-info" class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Original: 1920 × 1080 px • 1.2 MB</p>
                        </div>
                    </div>
                    <button onclick="resetImgResizer()" class="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center gap-1.5 flex-shrink-0">
                        <i class="fa-solid fa-arrow-rotate-left"></i> Change Image
                    </button>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div class="space-y-5 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <h3 class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">1. Target Dimensions</h3>
                        <div>
                            <label class="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">Quick Scale Presets</label>
                            <div class="grid grid-cols-5 gap-2">
                                <button onclick="applyImgResizerPercentage(25)" class="py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-indigo-50 hover:border-indigo-300 dark:hover:bg-slate-800 transition">25%</button>
                                <button onclick="applyImgResizerPercentage(50)" class="py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-indigo-50 hover:border-indigo-300 dark:hover:bg-slate-800 transition">50%</button>
                                <button onclick="applyImgResizerPercentage(75)" class="py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-indigo-50 hover:border-indigo-300 dark:hover:bg-slate-800 transition">75%</button>
                                <button onclick="applyImgResizerPercentage(100)" class="py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-indigo-50 hover:border-indigo-300 dark:hover:bg-slate-800 transition">100%</button>
                                <button onclick="applyImgResizerPercentage(150)" class="py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-indigo-50 hover:border-indigo-300 dark:hover:bg-slate-800 transition">150%</button>
                            </div>
                        </div>

                        <div>
                            <label class="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Standard Aspect & Size Presets</label>
                            <select id="img-resizer-preset-select" onchange="applyImgResizerPreset(this.value)" class="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-indigo-500">
                                <option value="custom">Custom Dimensions</option>
                                <option value="1920x1080">Full HD (1920 × 1080)</option>
                                <option value="1280x720">HD (1280 × 720)</option>
                                <option value="1080x1080">Instagram Square (1080 × 1080)</option>
                                <option value="1080x1920">Instagram Story / Reel (1080 × 1920)</option>
                                <option value="1200x675">Twitter / X Header (1200 × 675)</option>
                                <option value="800x600">Standard Web (800 × 600)</option>
                                <option value="300x300">Thumbnail (300 × 300)</option>
                            </select>
                        </div>

                        <div class="grid grid-cols-12 gap-2 items-center pt-1">
                            <div class="col-span-5">
                                <label class="block text-xs font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">Width (px)</label>
                                <input type="number" id="img-resizer-width" min="1" max="10000" oninput="onImgResizerWidthChange()" class="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 outline-none text-sm">
                            </div>
                            
                            <div class="col-span-2 flex flex-col items-center justify-center pt-5">
                                <button id="img-resizer-lock-btn" onclick="toggleImgResizerAspectLock()" title="Toggle Aspect Ratio Lock" class="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60 hover:bg-indigo-100 transition">
                                    <i id="img-resizer-lock-icon" class="fa-solid fa-link"></i>
                                </button>
                            </div>

                            <div class="col-span-5">
                                <label class="block text-xs font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">Height (px)</label>
                                <input type="number" id="img-resizer-height" min="1" max="10000" oninput="onImgResizerHeightChange()" class="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 outline-none text-sm">
                            </div>
                        </div>
                    </div>

                    <div class="space-y-5 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
                        <div class="space-y-4">
                            <h3 class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">2. Output Format & Compression</h3>
                            <div>
                                <label class="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Export Format</label>
                                <select id="img-resizer-format" onchange="onImgResizerFormatChange()" class="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-indigo-500">
                                    <option value="image/png">PNG (Lossless, Transparent)</option>
                                    <option value="image/jpeg" selected>JPG / JPEG (Standard Web)</option>
                                    <option value="image/webp">WebP (Modern Compact Format)</option>
                                </select>
                            </div>

                            <div id="img-resizer-quality-container">
                                <div class="flex justify-between items-center text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                                    <span>Compression Quality</span>
                                    <span id="img-resizer-quality-val" class="font-bold text-indigo-600 dark:text-indigo-400">85%</span>
                                </div>
                                <input type="range" id="img-resizer-quality" min="10" max="100" value="85" oninput="document.getElementById('img-resizer-quality-val').innerText = this.value + '%'" class="w-full accent-indigo-600">
                            </div>

                            <div class="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1 text-xs">
                                <div class="flex justify-between text-slate-500">
                                    <span>Target Output:</span>
                                    <span id="img-resizer-target-dim" class="font-bold text-slate-800 dark:text-slate-200">1920 × 1080 px</span>
                                </div>
                                <div class="flex justify-between text-slate-500">
                                    <span>Aspect Ratio:</span>
                                    <span id="img-resizer-target-aspect" class="font-semibold text-slate-700 dark:text-slate-300">16:9</span>
                                </div>
                            </div>
                        </div>

                        <button onclick="downloadResizedImage()" class="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm transition shadow-md flex items-center justify-center gap-2 mt-2">
                            <i class="fa-solid fa-download"></i> Download Resized Image
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `,
    init: () => initImgResizer()
};

/* IMAGE COMPRESSOR TOOL LOGIC */
let imgCompState = {
    img: null,
    fileName: '',
    fileType: '',
    origSize: 0,
    compressedBlob: null,
    compressedDataUrl: '',
    compressedSize: 0
};

function initImgCompressor() {
    imgCompState = {
        img: null,
        fileName: '',
        fileType: '',
        origSize: 0,
        compressedBlob: null,
        compressedDataUrl: '',
        compressedSize: 0
    };
}

function handleImgCompDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    const dz = document.getElementById('img-comp-dropzone');
    if (dz) dz.classList.add('border-blue-500', 'bg-blue-100/50');
}

function handleImgCompDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    const dz = document.getElementById('img-comp-dropzone');
    if (dz) dz.classList.remove('border-blue-500', 'bg-blue-100/50');
}

function handleImgCompDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    handleImgCompDragLeave(e);
    if (e.dataTransfer && e.dataTransfer.files.length > 0) {
        processImgCompFile(e.dataTransfer.files[0]);
    }
}

function handleImgCompFileSelect(e) {
    if (e.target.files && e.target.files.length > 0) {
        processImgCompFile(e.target.files[0]);
    }
}

function processImgCompFile(file) {
    if (!file || !file.type.startsWith('image/')) {
        showToast('Please select a valid image file!');
        return;
    }

    imgCompState.fileName = file.name;
    imgCompState.fileType = file.type;
    imgCompState.origSize = file.size;

    const reader = new FileReader();
    reader.onload = function(evt) {
        const img = new Image();
        img.onload = function() {
            imgCompState.img = img;

            document.getElementById('img-comp-filename').innerText = file.name;
            document.getElementById('img-comp-dimensions').innerText = `${img.width} × ${img.height} px`;
            document.getElementById('img-comp-orig-size').innerText = formatBytes(file.size);
            document.getElementById('img-comp-orig-preview').src = evt.target.result;

            document.getElementById('img-comp-dropzone').classList.add('hidden');
            document.getElementById('img-comp-workspace').classList.remove('hidden');

            runImgCompressor();
        };
        img.src = evt.target.result;
    };
    reader.readAsDataURL(file);
}

function updateImgCompQualityLabel(val) {
    document.getElementById('img-comp-quality-val').innerText = val + '%';
}

function runImgCompressor() {
    if (!imgCompState.img) return;

    const quality = parseFloat(document.getElementById('img-comp-quality').value) / 100;
    let formatSelection = document.getElementById('img-comp-format').value;
    const maxWidthSel = document.getElementById('img-comp-max-width').value;

    let targetMime = formatSelection === 'original' ? imgCompState.fileType : formatSelection;
    if (!targetMime || targetMime === '') targetMime = 'image/jpeg';

    let w = imgCompState.img.width;
    let h = imgCompState.img.height;

    if (maxWidthSel !== 'none') {
        const maxW = parseInt(maxWidthSel);
        if (w > maxW) {
            h = Math.round(h * (maxW / w));
            w = maxW;
        }
    }

    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;

    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    if (targetMime === 'image/jpeg') {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, w, h);
    }

    ctx.drawImage(imgCompState.img, 0, 0, w, h);

    canvas.toBlob((blob) => {
        if (!blob) {
            showToast('Error during compression!');
            return;
        }

        imgCompState.compressedBlob = blob;
        imgCompState.compressedSize = blob.size;

        const url = URL.createObjectURL(blob);
        imgCompState.compressedDataUrl = url;

        document.getElementById('img-comp-new-preview').src = url;
        document.getElementById('img-comp-new-size').innerText = formatBytes(blob.size);

        const orig = imgCompState.origSize;
        const newSize = blob.size;
        const savedPct = Math.round(((orig - newSize) / orig) * 100);

        const badge = document.getElementById('img-comp-badge');
        if (savedPct >= 0) {
            badge.innerText = `-${savedPct}%`;
            badge.className = 'px-2 py-0.5 text-[10px] font-extrabold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 rounded-full';
        } else {
            badge.innerText = `+${Math.abs(savedPct)}%`;
            badge.className = 'px-2 py-0.5 text-[10px] font-extrabold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 rounded-full';
        }
    }, targetMime, quality);
}

function downloadCompressedImage() {
    if (!imgCompState.compressedDataUrl) {
        showToast('No compressed image available!');
        return;
    }

    let formatSelection = document.getElementById('img-comp-format').value;
    let targetMime = formatSelection === 'original' ? imgCompState.fileType : formatSelection;

    let ext = '.jpg';
    if (targetMime === 'image/png') ext = '.png';
    if (targetMime === 'image/webp') ext = '.webp';

    const baseName = imgCompState.fileName.substring(0, imgCompState.fileName.lastIndexOf('.')) || 'image';
    const downloadName = `${baseName}_compressed${ext}`;

    const link = document.createElement('a');
    link.download = downloadName;
    link.href = imgCompState.compressedDataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast(`Compressed image downloaded! (${formatBytes(imgCompState.compressedSize)})`);
}

function resetImgCompressor() {
    initImgCompressor();
    const fileInput = document.getElementById('img-comp-file');
    if (fileInput) fileInput.value = '';

    document.getElementById('img-comp-dropzone').classList.remove('hidden');
    document.getElementById('img-comp-workspace').classList.add('hidden');
}

function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

const TOOL_IMAGE_COMPRESSOR = {
    id: 'img-compressor',
    name: 'Image Compressor & WebP Optimizer',
    category: 'Utilities',
    icon: 'fa-compress',
    color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/50',
    shortDesc: 'Compress PNG, JPG, WebP images to shrink file size up to 90% with live quality side-by-side comparison.',
    seoDesc: 'Free online Image Compressor & WebP Optimizer. Compress images directly in your browser, adjust compression levels, convert formats, and see instant side-by-side file size savings.',
    render: () => `
        <div id="img-comp-container" class="space-y-6">
            <!-- Dropzone & File Input -->
            <div id="img-comp-dropzone"
                 onclick="document.getElementById('img-comp-file').click()"
                 ondragover="handleImgCompDragOver(event)"
                 ondragleave="handleImgCompDragLeave(event)"
                 ondrop="handleImgCompDrop(event)"
                 class="border-2 border-dashed border-blue-300 dark:border-blue-700/60 hover:border-blue-500 dark:hover:border-blue-400 bg-blue-50/40 dark:bg-slate-800/50 hover:bg-blue-50 dark:hover:bg-slate-800 transition cursor-pointer rounded-2xl p-8 sm:p-10 text-center space-y-3">
                <input type="file" id="img-comp-file" accept="image/png, image/jpeg, image/webp, image/bmp, image/gif" class="hidden" onchange="handleImgCompFileSelect(event)">
                <div class="w-16 h-16 mx-auto rounded-2xl bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center text-3xl shadow-sm">
                    <i class="fa-solid fa-file-zipper"></i>
                </div>
                <div>
                    <h3 class="text-base font-bold text-slate-900 dark:text-white">Click or drag & drop image to compress</h3>
                    <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">Supports PNG, JPG, WebP, GIF, BMP (Browser-based local compression)</p>
                </div>
            </div>

            <!-- Workspace (Hidden initially) -->
            <div id="img-comp-workspace" class="hidden space-y-6">
                <!-- Image Header & Header Actions -->
                <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div class="flex items-center space-x-3 overflow-hidden">
                        <div class="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-lg flex-shrink-0">
                            <i class="fa-solid fa-image"></i>
                        </div>
                        <div class="min-w-0">
                            <h4 id="img-comp-filename" class="font-bold text-slate-900 dark:text-white text-sm truncate">image.jpg</h4>
                            <p id="img-comp-dimensions" class="text-xs text-slate-500 dark:text-slate-400">1920 × 1080 px</p>
                        </div>
                    </div>
                    <button onclick="resetImgCompressor()" class="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center gap-1.5 flex-shrink-0">
                        <i class="fa-solid fa-arrow-rotate-left"></i> Change Image
                    </button>
                </div>

                <!-- Compression Control Panel -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div>
                        <div class="flex justify-between items-center text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                            <span>Compression Quality</span>
                            <span id="img-comp-quality-val" class="font-bold text-blue-600 dark:text-blue-400">75%</span>
                        </div>
                        <input type="range" id="img-comp-quality" min="10" max="100" value="75" oninput="updateImgCompQualityLabel(this.value)" onchange="runImgCompressor()" class="w-full accent-blue-600 cursor-pointer">
                    </div>

                    <div>
                        <label class="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Target Format</label>
                        <select id="img-comp-format" onchange="runImgCompressor()" class="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="original">Keep Original Format</option>
                            <option value="image/webp" selected>WebP (Next-Gen Compact)</option>
                            <option value="image/jpeg">JPEG / JPG</option>
                            <option value="image/png">PNG (Lossless)</option>
                        </select>
                    </div>

                    <div>
                        <label class="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Max Width (Optional)</label>
                        <select id="img-comp-max-width" onchange="runImgCompressor()" class="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="none" selected>No Resizing (Original Resolution)</option>
                            <option value="1920">Max 1920 px (Full HD)</option>
                            <option value="1280">Max 1280 px (HD)</option>
                            <option value="800">Max 800 px (Web Standard)</option>
                        </select>
                    </div>
                </div>

                <!-- Comparison & Savings Stats Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Original Image Card -->
                    <div class="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 flex flex-col justify-between">
                        <div>
                            <div class="flex justify-between items-center mb-2">
                                <span class="text-xs font-bold uppercase tracking-wider text-slate-500">Original Image</span>
                                <span id="img-comp-orig-size" class="text-xs font-bold text-slate-700 dark:text-slate-300">1.50 MB</span>
                            </div>
                            <div class="h-48 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 overflow-hidden flex items-center justify-center p-2">
                                <img id="img-comp-orig-preview" src="" alt="Original" class="max-h-full max-w-full object-contain">
                            </div>
                        </div>
                    </div>

                    <!-- Compressed Image Card -->
                    <div class="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 flex flex-col justify-between">
                        <div>
                            <div class="flex justify-between items-center mb-2">
                                <span class="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">Compressed Image</span>
                                <div class="flex items-center space-x-2">
                                    <span id="img-comp-new-size" class="text-xs font-bold text-emerald-600 dark:text-emerald-400">320 KB</span>
                                    <span id="img-comp-badge" class="px-2 py-0.5 text-[10px] font-extrabold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 rounded-full">-78%</span>
                                </div>
                            </div>
                            <div class="h-48 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 overflow-hidden flex items-center justify-center p-2">
                                <img id="img-comp-new-preview" src="" alt="Compressed" class="max-h-full max-w-full object-contain">
                            </div>
                        </div>

                        <button onclick="downloadCompressedImage()" class="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition shadow-md flex items-center justify-center gap-2 mt-3">
                            <i class="fa-solid fa-download"></i> Download Compressed Image
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `,
    init: () => initImgCompressor()
};

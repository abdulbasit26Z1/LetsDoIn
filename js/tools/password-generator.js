function genPassword() {
    const len = parseInt(document.getElementById('pass-len').value);
    document.getElementById('pass-len-val').innerText = len;
    const syms = document.getElementById('pass-sym').checked;
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    if (syms) chars += "!@#$%^&*()_+-=";

    let pass = "";
    for (let i = 0; i < len; i++) {
        pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    document.getElementById('pass-output').value = pass;
}

const TOOL_PASSWORD_GENERATOR = {
    id: 'password-generator',
    name: 'Random Password Generator',
    category: 'Security',
    icon: 'fa-lock',
    color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/50',
    shortDesc: 'Generate strong, cryptographic passwords with customizable symbols and length sliders.',
    seoDesc: 'Free online strong password generator. Create secure passwords with entropy meter and instant clipboard copy.',
    render: () => `
        <div class="space-y-4">
            <div class="flex items-center space-x-2">
                <input type="text" id="pass-output" readonly class="w-full p-3 font-mono font-bold bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 text-lg">
                <button onclick="copyToClipboard(document.getElementById('pass-output').value)" class="px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs"><i class="fa-solid fa-copy"></i></button>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                    <label class="block font-bold mb-1">Length: <span id="pass-len-val">16</span></label>
                    <input type="range" id="pass-len" min="8" max="32" value="16" oninput="genPassword()" class="w-full">
                </div>
                <div class="flex flex-wrap gap-3 items-center pt-2">
                    <label class="flex items-center space-x-1"><input type="checkbox" id="pass-sym" checked onchange="genPassword()"> <span>Symbols</span></label>
                    <label class="flex items-center space-x-1"><input type="checkbox" id="pass-num" checked onchange="genPassword()"> <span>Numbers</span></label>
                </div>
            </div>
        </div>
    `,
    init: () => genPassword()
};

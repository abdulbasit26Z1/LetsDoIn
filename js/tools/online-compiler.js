/* MULTI-LANGUAGE ONLINE CODE COMPILER & RUNNER */

const COMPILER_LANGUAGES = {
    javascript: {
        name: 'JavaScript (Node.js / Browser)',
        pistonLang: 'javascript',
        version: '18.15.0',
        ext: 'js',
        icon: 'fa-brands fa-js text-yellow-400',
        template: `// Multi-Language Online Compiler - JavaScript\nconsole.log("Hello, World from JavaScript!");\n\nconst numbers = [1, 2, 3, 4, 5];\nconst squared = numbers.map(n => n * n);\nconsole.log("Squared numbers:", squared);\n\nfunction calculateFactorial(n) {\n    if (n <= 1) return 1;\n    return n * calculateFactorial(n - 1);\n}\nconsole.log("Factorial of 6:", calculateFactorial(6));`
    },
    python: {
        name: 'Python 3',
        pistonLang: 'python',
        version: '3.10.0',
        ext: 'py',
        icon: 'fa-brands fa-python text-blue-400',
        template: `# Multi-Language Online Compiler - Python 3\ndef main():\n    print("Hello, World from Python!")\n    \n    # Generate Fibonacci sequence\n    a, b = 0, 1\n    fib = []\n    for _ in range(10):\n        fib.append(a)\n        a, b = b, a + b\n    print("Fibonacci sequence:", fib)\n\nif __name__ == "__main__":\n    main()`
    },
    cpp: {
        name: 'C++ (GCC)',
        pistonLang: 'cpp',
        version: '10.2.0',
        ext: 'cpp',
        icon: 'fa-solid fa-code text-blue-500',
        template: `// Multi-Language Online Compiler - C++\n#include <iostream>\n#include <vector>\n\nint main() {\n    std::cout << "Hello, World from C++!" << std::endl;\n    \n    std::vector<int> numbers = {10, 20, 30, 40, 50};\n    int sum = 0;\n    for(int n : numbers) {\n        sum += n;\n    }\n    std::cout << "Sum of elements: " << sum << std::endl;\n    return 0;\n}`
    },
    java: {
        name: 'Java (OpenJDK)',
        pistonLang: 'java',
        version: '15.0.2',
        ext: 'java',
        icon: 'fa-brands fa-java text-orange-500',
        template: `// Multi-Language Online Compiler - Java\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World from Java!");\n        \n        long factorial = 1;\n        for (int i = 1; i <= 10; i++) {\n            factorial *= i;\n        }\n        System.out.println("Factorial of 10: " + factorial);\n    }\n}`
    },
    c: {
        name: 'C (GCC)',
        pistonLang: 'c',
        version: '10.2.0',
        ext: 'c',
        icon: 'fa-solid fa-c text-indigo-400',
        template: `// Multi-Language Online Compiler - C\n#include <stdio.h>\n\nint main() {\n    printf("Hello, World from C!\\n");\n    int x = 15, y = 25;\n    printf("Sum: %d + %d = %d\\n", x, y, x + y);\n    return 0;\n}`
    },
    csharp: {
        name: 'C# (.NET)',
        pistonLang: 'csharp',
        version: '6.12.0',
        ext: 'cs',
        icon: 'fa-solid fa-hashtag text-purple-500',
        template: `// Multi-Language Online Compiler - C#\nusing System;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine("Hello, World from C#!");\n        string site = "LetsDoIn UK Multi-Compiler";\n        Console.WriteLine(site.ToUpper());\n    }\n}`
    },
    go: {
        name: 'Go (Golang)',
        pistonLang: 'go',
        version: '1.16.2',
        ext: 'go',
        icon: 'fa-solid fa-cubes text-cyan-400',
        template: `// Multi-Language Online Compiler - Go\npackage main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, World from Go!")\n    numbers := []int{10, 20, 30, 40}\n    fmt.Println("Slice numbers:", numbers)\n}`
    },
    rust: {
        name: 'Rust (Rustc)',
        pistonLang: 'rust',
        version: '1.68.2',
        ext: 'rs',
        icon: 'fa-solid fa-gear text-amber-500',
        template: `// Multi-Language Online Compiler - Rust\nfn main() {\n    println!("Hello, World from Rust!");\n    let sum: i32 = (1..=10).sum();\n    println!("Sum from 1 to 10 is {}", sum);\n}`
    },
    php: {
        name: 'PHP Engine',
        pistonLang: 'php',
        version: '8.2.3',
        ext: 'php',
        icon: 'fa-brands fa-php text-indigo-400',
        template: `<?php\n// Multi-Language Online Compiler - PHP\necho "Hello, World from PHP!\\n";\n$frameworks = ["Laravel", "Symfony", "LetsDoIn"];\nforeach ($frameworks as $fw) {\n    echo "Framework: " . $fw . "\\n";\n}\n?>`
    },
    ruby: {
        name: 'Ruby Engine',
        pistonLang: 'ruby',
        version: '3.0.1',
        ext: 'rb',
        icon: 'fa-solid fa-gem text-red-500',
        template: `# Multi-Language Online Compiler - Ruby\nputs "Hello, World from Ruby!"\n3.times do |i|\n  puts "Iteration #{i + 1}"\nend`
    },
    typescript: {
        name: 'TypeScript',
        pistonLang: 'typescript',
        version: '5.0.3',
        ext: 'ts',
        icon: 'fa-solid fa-code text-blue-400',
        template: `// Multi-Language Online Compiler - TypeScript\ninterface Student {\n    id: number;\n    name: string;\n    grade: string;\n}\n\nconst student: Student = {\n    id: 101,\n    name: "Emma Watson",\n    grade: "A*"\n};\n\nconsole.log(\`Student \${student.name} (\${student.id}) Grade: \${student.grade}\`);`
    },
    html: {
        name: 'HTML / CSS / JS Live Sandbox',
        pistonLang: 'html',
        version: '5',
        ext: 'html',
        icon: 'fa-brands fa-html5 text-orange-500',
        template: `<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    body {\n      font-family: 'Inter', sans-serif;\n      text-align: center;\n      padding: 40px;\n      background: #0f172a;\n      color: #f8fafc;\n    }\n    .card {\n      background: #1e293b;\n      padding: 30px;\n      border-radius: 20px;\n      border: 1px solid #334155;\n      display: inline-block;\n      box-shadow: 0 10px 25px rgba(0,0,0,0.3);\n    }\n    button {\n      background: #6366f1;\n      color: white;\n      border: none;\n      padding: 12px 24px;\n      border-radius: 12px;\n      font-weight: bold;\n      font-size: 14px;\n      cursor: pointer;\n      transition: 0.2s;\n    }\n    button:hover {\n      background: #4f46e5;\n      transform: scale(1.05);\n    }\n  </style>\n</head>\n<body>\n  <div class="card">\n    <h2>LetsDoIn Live Web Sandbox</h2>\n    <p>Edit HTML, CSS, and JS to see instant live preview below!</p>\n    <button onclick="interactiveDemo()">Run Interactive Action</button>\n    <p id="output-msg" style="margin-top: 15px; color: #38bdf8; font-weight: bold;"></p>\n  </div>\n  <script>\n    function interactiveDemo() {\n      document.getElementById('output-msg').innerText = "Hello from Web Sandbox! Executed at " + new Date().toLocaleTimeString();\n    }\n  </script>\n</body>\n</html>`
    }
};

let currentCompilerLang = 'javascript';

function initOnlineCompiler() {
    setTimeout(() => {
        changeCompilerLanguage('javascript');
    }, 50);
}

function changeCompilerLanguage(langKey) {
    if (!COMPILER_LANGUAGES[langKey]) return;
    currentCompilerLang = langKey;

    const langConfig = COMPILER_LANGUAGES[langKey];
    const editor = document.getElementById('compiler-code-editor');
    if (editor) {
        editor.value = langConfig.template;
        updateCompilerLineCount();
    }

    const badge = document.getElementById('compiler-lang-badge');
    if (badge) {
        badge.innerText = langConfig.name;
    }

    const previewContainer = document.getElementById('compiler-live-preview-box');
    const terminalBox = document.getElementById('compiler-terminal-box');

    if (langKey === 'html') {
        if (previewContainer) previewContainer.classList.remove('hidden');
        if (terminalBox) terminalBox.classList.add('hidden');
    } else {
        if (previewContainer) previewContainer.classList.add('hidden');
        if (terminalBox) terminalBox.classList.remove('hidden');
    }
}

function handleCompilerKeyDown(e) {
    if (e.key === 'Tab') {
        e.preventDefault();
        const start = e.target.selectionStart;
        const end = e.target.selectionEnd;
        e.target.value = e.target.value.substring(0, start) + '    ' + e.target.value.substring(end);
        e.target.selectionStart = e.target.selectionEnd = start + 4;
        updateCompilerLineCount();
    }
}

function updateCompilerLineCount() {
    const editor = document.getElementById('compiler-code-editor');
    const lineBadge = document.getElementById('compiler-line-count');
    if (editor && lineBadge) {
        const lines = editor.value.split('\n').length;
        lineBadge.innerText = `${lines} ${lines === 1 ? 'Line' : 'Lines'}`;
    }
}

async function runCodeCompiler() {
    const code = document.getElementById('compiler-code-editor').value;
    const stdin = document.getElementById('compiler-stdin-input') ? document.getElementById('compiler-stdin-input').value : '';
    const statusElem = document.getElementById('compiler-status-pill');
    const outputElem = document.getElementById('compiler-output');

    if (!code.trim()) {
        showToast('Please enter some code to compile!');
        return;
    }

    const langConfig = COMPILER_LANGUAGES[currentCompilerLang];

    if (currentCompilerLang === 'html') {
        if (statusElem) {
            statusElem.className = 'px-2.5 py-1 text-xs font-bold rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30';
            statusElem.innerText = 'Rendered Live';
        }
        const iframe = document.getElementById('compiler-live-iframe');
        if (iframe) {
            iframe.srcdoc = code;
        }
        showToast('Live Web HTML Preview updated!');
        return;
    }

    if (statusElem) {
        statusElem.className = 'px-2.5 py-1 text-xs font-bold rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 animate-pulse';
        statusElem.innerText = 'Compiling & Executing...';
    }

    if (outputElem) {
        outputElem.innerText = 'Compiling and running code on server sandbox...\n';
    }

    const startTime = performance.now();

    try {
        const response = await fetch('https://emkc.org/api/v2/piston/execute', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                language: langConfig.pistonLang,
                version: '*',
                files: [
                    {
                        name: `main.${langConfig.ext}`,
                        content: code
                    }
                ],
                stdin: stdin
            })
        });

        const elapsed = ((performance.now() - startTime) / 1000).toFixed(2);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.run) {
            let resultText = '';
            if (data.run.stdout) resultText += data.run.stdout;
            if (data.run.stderr) resultText += (resultText ? '\n[Errors / Warnings]\n' : '') + data.run.stderr;
            if (!resultText) resultText = '[Program executed with no console output]';

            if (outputElem) outputElem.innerText = resultText;

            if (statusElem) {
                if (data.run.code === 0 && !data.run.stderr) {
                    statusElem.className = 'px-2.5 py-1 text-xs font-bold rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30';
                    statusElem.innerText = `Success (${elapsed}s)`;
                } else {
                    statusElem.className = 'px-2.5 py-1 text-xs font-bold rounded-full bg-red-500/20 text-red-400 border border-red-500/30';
                    statusElem.innerText = `Exit Code ${data.run.code} (${elapsed}s)`;
                }
            }
            showToast(`Code executed in ${elapsed}s`);
        } else {
            throw new Error('Unexpected execution API response format.');
        }
    } catch (err) {
        if (currentCompilerLang === 'javascript') {
            try {
                let logs = [];
                const customConsole = {
                    log: (...args) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : a).join(' ')),
                    error: (...args) => logs.push('[ERROR] ' + args.join(' ')),
                    warn: (...args) => logs.push('[WARN] ' + args.join(' '))
                };

                const runFunc = new Function('console', code);
                runFunc(customConsole);

                const elapsed = ((performance.now() - startTime) / 1000).toFixed(2);
                if (outputElem) outputElem.innerText = logs.join('\n') || '[Local JS Executed - No console output]';
                if (statusElem) {
                    statusElem.className = 'px-2.5 py-1 text-xs font-bold rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30';
                    statusElem.innerText = `Local JS Success (${elapsed}s)`;
                }
                showToast('Executed locally in browser sandbox!');
                return;
            } catch (jsErr) {
                if (outputElem) outputElem.innerText = `JavaScript Runtime Error: ${jsErr.message}`;
            }
        } else {
            if (outputElem) outputElem.innerText = `Execution Error: Could not connect to remote compilation engine.\n${err.message}\n\nPlease check your internet connection.`;
        }

        if (statusElem) {
            statusElem.className = 'px-2.5 py-1 text-xs font-bold rounded-full bg-red-500/20 text-red-400 border border-red-500/30';
            statusElem.innerText = 'Execution Failed';
        }
    }
}

function copyCompilerCode() {
    const editor = document.getElementById('compiler-code-editor');
    if (editor) {
        copyToClipboard(editor.value);
        showToast('Code copied to clipboard!');
    }
}

function clearCompilerCode() {
    const editor = document.getElementById('compiler-code-editor');
    if (editor) {
        editor.value = '';
        updateCompilerLineCount();
        showToast('Code editor cleared.');
    }
}

function downloadCompilerCode() {
    const editor = document.getElementById('compiler-code-editor');
    if (!editor || !editor.value) {
        showToast('Code editor is empty!');
        return;
    }

    const langConfig = COMPILER_LANGUAGES[currentCompilerLang];
    const fileName = `main.${langConfig.ext}`;
    const blob = new Blob([editor.value], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast(`Downloaded ${fileName}`);
}

const TOOL_ONLINE_COMPILER = {
    id: 'online-compiler',
    name: 'Multi-Language Online Code Compiler',
    category: 'Developer & Text',
    icon: 'fa-code',
    color: 'text-violet-500 bg-violet-50 dark:bg-violet-950/50',
    shortDesc: 'Write, compile, and execute code online in JavaScript, Python, C++, Java, C, C#, Go, Rust, PHP, Ruby, TypeScript, and HTML/CSS.',
    seoDesc: 'Free online multi-language code compiler and runner. Write, compile, and execute JavaScript, Python, C++, Java, C, C#, Go, Rust, PHP, Ruby, TypeScript, and live HTML/CSS.',
    render: () => `
        <div id="online-compiler-container" class="space-y-6">
            <!-- Header Toolbar -->
            <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-950 text-violet-600 dark:text-violet-400 flex items-center justify-center font-bold text-lg">
                        <i class="fa-solid fa-code"></i>
                    </div>
                    <div>
                        <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Select Programming Language</label>
                        <select id="compiler-lang-select" onchange="changeCompilerLanguage(this.value)" class="bg-transparent font-extrabold text-slate-900 dark:text-white text-sm outline-none cursor-pointer">
                            <option value="javascript">JavaScript (Node.js)</option>
                            <option value="python">Python 3</option>
                            <option value="cpp">C++ (GCC)</option>
                            <option value="java">Java (OpenJDK)</option>
                            <option value="c">C (GCC)</option>
                            <option value="csharp">C# (.NET)</option>
                            <option value="go">Go (Golang)</option>
                            <option value="rust">Rust (Rustc)</option>
                            <option value="php">PHP Engine</option>
                            <option value="ruby">Ruby Engine</option>
                            <option value="typescript">TypeScript</option>
                            <option value="html">HTML / CSS / JS Live Web</option>
                        </select>
                    </div>
                </div>

                <!-- Action Toolbar -->
                <div class="flex items-center space-x-2 w-full sm:w-auto">
                    <button onclick="copyCompilerCode()" title="Copy Code" class="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold transition flex items-center gap-1.5">
                        <i class="fa-solid fa-copy"></i> Copy
                    </button>
                    <button onclick="clearCompilerCode()" title="Clear Code" class="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold transition flex items-center gap-1.5">
                        <i class="fa-solid fa-trash"></i> Clear
                    </button>
                    <button onclick="downloadCompilerCode()" title="Download Code File" class="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold transition flex items-center gap-1.5">
                        <i class="fa-solid fa-download"></i> Save
                    </button>
                    <button onclick="runCodeCompiler()" class="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold transition shadow-md flex items-center gap-2">
                        <i class="fa-solid fa-play"></i> Run Code
                    </button>
                </div>
            </div>

            <!-- Editor & Output Grid -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <!-- Code Editor Column -->
                <div class="lg:col-span-7 space-y-3">
                    <div class="flex justify-between items-center px-1">
                        <span id="compiler-lang-badge" class="text-xs font-bold text-violet-600 dark:text-violet-400 uppercase tracking-wider">JavaScript (Node.js)</span>
                        <span id="compiler-line-count" class="text-xs text-slate-400 font-mono">12 Lines</span>
                    </div>

                    <div class="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl">
                        <textarea id="compiler-code-editor"
                                  onkeydown="handleCompilerKeyDown(event)"
                                  oninput="updateCompilerLineCount()"
                                  rows="18"
                                  spellcheck="false"
                                  class="w-full p-4 font-mono text-xs text-slate-100 bg-slate-950 outline-none resize-y leading-relaxed focus:ring-1 focus:ring-violet-500 rounded-2xl"></textarea>
                    </div>

                    <!-- STDIN Optional Input Accordion -->
                    <div class="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1.5">
                        <label class="block text-[11px] font-bold uppercase tracking-wider text-slate-500">Standard Input (STDIN) - Optional</label>
                        <input type="text" id="compiler-stdin-input" placeholder="Pass input args or user input lines here..." class="w-full px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 font-mono text-xs text-slate-800 dark:text-slate-200 outline-none">
                    </div>
                </div>

                <!-- Terminal / Preview Output Column -->
                <div class="lg:col-span-5 space-y-3">
                    <div class="flex justify-between items-center px-1">
                        <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Execution Output Terminal</span>
                        <span id="compiler-status-pill" class="px-2.5 py-0.5 text-[11px] font-bold rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-300 dark:border-slate-700">Idle</span>
                    </div>

                    <!-- Terminal Output Box -->
                    <div id="compiler-terminal-box" class="h-[430px] rounded-2xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs text-emerald-400 overflow-y-auto shadow-2xl flex flex-col justify-between">
                        <pre id="compiler-output" class="whitespace-pre-wrap break-words leading-relaxed">Press "Run Code" button to compile and execute program output...</pre>
                        <div class="pt-3 border-t border-slate-800/80 text-[10px] text-slate-500 flex justify-between">
                            <span>LetsDoIn Multi-Language Engine</span>
                            <span>Powered by Piston API / Browser Sandbox</span>
                        </div>
                    </div>

                    <!-- Live Web Iframe Container (for HTML) -->
                    <div id="compiler-live-preview-box" class="hidden h-[430px] rounded-2xl bg-white border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xl">
                        <iframe id="compiler-live-iframe" class="w-full h-full border-none" title="Live Preview"></iframe>
                    </div>
                </div>
            </div>
        </div>
    `,
    init: () => initOnlineCompiler()
};

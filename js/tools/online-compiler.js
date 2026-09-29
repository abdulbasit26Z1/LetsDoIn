/* MULTI-LANGUAGE ONLINE CODE COMPILER, MYSQL DATABASE & VS CODE ONLINE CODESPACE */

const COMPILER_LANGUAGES = {
    javascript: {
        id: 'javascript',
        fileName: 'main.js',
        name: 'JavaScript (Node.js)',
        pistonLang: 'javascript',
        version: '18.15.0',
        ext: 'js',
        icon: 'fa-brands fa-js text-yellow-400',
        template: `// VS Code Online Codespace - JavaScript\nconsole.log("Hello, World from JavaScript Codespace!");\n\nconst numbers = [1, 2, 3, 4, 5];\nconst squared = numbers.map(n => n * n);\nconsole.log("Squared numbers:", squared);\n\nfunction calculateFactorial(n) {\n    if (n <= 1) return 1;\n    return n * calculateFactorial(n - 1);\n}\nconsole.log("Factorial of 6:", calculateFactorial(6));`
    },
    python: {
        id: 'python',
        fileName: 'script.py',
        name: 'Python 3',
        pistonLang: 'python',
        version: '3.10.0',
        ext: 'py',
        icon: 'fa-brands fa-python text-blue-400',
        template: `# VS Code Online Codespace - Python 3\ndef main():\n    print("Hello, World from Python Codespace!")\n    \n    # Generate Fibonacci sequence\n    a, b = 0, 1\n    fib = []\n    for _ in range(10):\n        fib.append(a)\n        a, b = b, a + b\n    print("Fibonacci sequence:", fib)\n\nif __name__ == "__main__":\n    main()`
    },
    mysql: {
        id: 'mysql',
        fileName: 'database.sql',
        name: 'MySQL / SQL Database',
        pistonLang: 'sqlite3',
        version: '3.36.0',
        ext: 'sql',
        icon: 'fa-solid fa-database text-amber-400',
        template: `-- VS Code Online Codespace - MySQL / SQL Database Engine\n-- Create sample tables and execute relational queries\n\nCREATE TABLE users (\n    id INT PRIMARY KEY,\n    name VARCHAR(50),\n    email VARCHAR(100),\n    role VARCHAR(20),\n    joined_date DATE\n);\n\nINSERT INTO users VALUES \n(1, 'Alice Smith', 'alice@example.com', 'Admin', '2026-01-15'),\n(2, 'Bob Jones', 'bob@example.com', 'Developer', '2026-02-01'),\n(3, 'Charlie Brown', 'charlie@example.com', 'Designer', '2026-03-10'),\n(4, 'Diana Prince', 'diana@example.com', 'Manager', '2026-04-20');\n\nCREATE TABLE orders (\n    order_id INT PRIMARY KEY,\n    user_id INT,\n    product VARCHAR(50),\n    amount DECIMAL(10,2)\n);\n\nINSERT INTO orders VALUES\n(101, 1, 'MacBook Pro', 1999.99),\n(102, 2, 'Dell XPS 15', 1499.50),\n(103, 1, 'Keychron Keyboard', 120.00),\n(104, 3, '4K Monitor', 450.00);\n\n-- Query 1: Retrieve all registered users\nSELECT * FROM users;\n\n-- Query 2: Relational JOIN between users and orders\nSELECT u.name, u.role, o.product, o.amount \nFROM users u \nJOIN orders o ON u.id = o.user_id;`
    },
    cpp: {
        id: 'cpp',
        fileName: 'main.cpp',
        name: 'C++ (GCC)',
        pistonLang: 'cpp',
        version: '10.2.0',
        ext: 'cpp',
        icon: 'fa-solid fa-code text-blue-500',
        template: `// VS Code Online Codespace - C++\n#include <iostream>\n#include <vector>\n\nint main() {\n    std::cout << "Hello, World from C++!" << std::endl;\n    \n    std::vector<int> numbers = {10, 20, 30, 40, 50};\n    int sum = 0;\n    for(int n : numbers) {\n        sum += n;\n    }\n    std::cout << "Sum of elements: " << sum << std::endl;\n    return 0;\n}`
    },
    java: {
        id: 'java',
        fileName: 'Main.java',
        name: 'Java (OpenJDK)',
        pistonLang: 'java',
        version: '15.0.2',
        ext: 'java',
        icon: 'fa-brands fa-java text-orange-500',
        template: `// VS Code Online Codespace - Java\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World from Java!");\n        \n        long factorial = 1;\n        for (int i = 1; i <= 10; i++) {\n            factorial *= i;\n        }\n        System.out.println("Factorial of 10: " + factorial);\n    }\n}`
    },
    c: {
        id: 'c',
        fileName: 'main.c',
        name: 'C (GCC)',
        pistonLang: 'c',
        version: '10.2.0',
        ext: 'c',
        icon: 'fa-solid fa-c text-indigo-400',
        template: `// VS Code Online Codespace - C\n#include <stdio.h>\n\nint main() {\n    printf("Hello, World from C!\\n");\n    int x = 15, y = 25;\n    printf("Sum: %d + %d = %d\\n", x, y, x + y);\n    return 0;\n}`
    },
    csharp: {
        id: 'csharp',
        fileName: 'Program.cs',
        name: 'C# (.NET)',
        pistonLang: 'csharp',
        version: '6.12.0',
        ext: 'cs',
        icon: 'fa-solid fa-hashtag text-purple-500',
        template: `// VS Code Online Codespace - C#\nusing System;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine("Hello, World from C#!");\n        string site = "LetsDoIn VS Code Online";\n        Console.WriteLine(site.ToUpper());\n    }\n}`
    },
    go: {
        id: 'go',
        fileName: 'main.go',
        name: 'Go (Golang)',
        pistonLang: 'go',
        version: '1.16.2',
        ext: 'go',
        icon: 'fa-solid fa-cubes text-cyan-400',
        template: `// VS Code Online Codespace - Go\npackage main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, World from Go!")\n    numbers := []int{10, 20, 30, 40}\n    fmt.Println("Slice numbers:", numbers)\n}`
    },
    rust: {
        id: 'rust',
        fileName: 'main.rs',
        name: 'Rust (Rustc)',
        pistonLang: 'rust',
        version: '1.68.2',
        ext: 'rs',
        icon: 'fa-solid fa-gear text-amber-500',
        template: `// VS Code Online Codespace - Rust\nfn main() {\n    println!("Hello, World from Rust!");\n    let sum: i32 = (1..=10).sum();\n    println!("Sum from 1 to 10 is {}", sum);\n}`
    },
    php: {
        id: 'php',
        fileName: 'index.php',
        name: 'PHP Engine',
        pistonLang: 'php',
        version: '8.2.3',
        ext: 'php',
        icon: 'fa-brands fa-php text-indigo-400',
        template: `<?php\n// VS Code Online Codespace - PHP\necho "Hello, World from PHP!\\n";\n$frameworks = ["Laravel", "Symfony", "LetsDoIn"];\nforeach ($frameworks as $fw) {\n    echo "Framework: " . $fw . "\\n";\n}\n?>`
    },
    ruby: {
        id: 'ruby',
        fileName: 'app.rb',
        name: 'Ruby Engine',
        pistonLang: 'ruby',
        version: '3.0.1',
        ext: 'rb',
        icon: 'fa-solid fa-gem text-red-500',
        template: `# VS Code Online Codespace - Ruby\nputs "Hello, World from Ruby!"\n3.times do |i|\n  puts "Iteration #{i + 1}"\nend`
    },
    typescript: {
        id: 'typescript',
        fileName: 'index.ts',
        name: 'TypeScript',
        pistonLang: 'typescript',
        version: '5.0.3',
        ext: 'ts',
        icon: 'fa-solid fa-code text-blue-400',
        template: `// VS Code Online Codespace - TypeScript\ninterface Student {\n    id: number;\n    name: string;\n    grade: string;\n}\n\nconst student: Student = {\n    id: 101,\n    name: "Emma Watson",\n    grade: "A*"\n};\n\nconsole.log(\`Student \${student.name} (\${student.id}) Grade: \${student.grade}\`);`
    },
    html: {
        id: 'html',
        fileName: 'index.html',
        name: 'HTML / CSS / JS Live Sandbox',
        pistonLang: 'html',
        version: '5',
        ext: 'html',
        icon: 'fa-brands fa-html5 text-orange-500',
        template: `<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    body {\n      font-family: 'Inter', sans-serif;\n      text-align: center;\n      padding: 30px;\n      background: #0f172a;\n      color: #f8fafc;\n    }\n    .card {\n      background: #1e293b;\n      padding: 24px;\n      border-radius: 16px;\n      border: 1px solid #334155;\n      display: inline-block;\n      box-shadow: 0 10px 25px rgba(0,0,0,0.3);\n    }\n    button {\n      background: #007acc;\n      color: white;\n      border: none;\n      padding: 10px 20px;\n      border-radius: 8px;\n      font-weight: bold;\n      font-size: 13px;\n      cursor: pointer;\n      transition: 0.2s;\n    }\n    button:hover {\n      background: #0062a3;\n      transform: scale(1.05);\n    }\n  </style>\n</head>\n<body>\n  <div class="card">\n    <h2>VS Code Codespace Web Sandbox</h2>\n    <p>Edit HTML, CSS, and JS to see instant live preview!</p>\n    <button onclick="interactiveDemo()">Run Interactive Action</button>\n    <p id="output-msg" style="margin-top: 15px; color: #38bdf8; font-weight: bold;"></p>\n  </div>\n  <script>\n    function interactiveDemo() {\n      document.getElementById('output-msg').innerText = "Hello from VS Code Sandbox! Executed at " + new Date().toLocaleTimeString();\n    }\n  </script>\n</body>\n</html>`
    }
};

// In-Memory Separate Codespaces Storage
const compilerCodespaces = {};
Object.keys(COMPILER_LANGUAGES).forEach(k => {
    compilerCodespaces[k] = COMPILER_LANGUAGES[k].template;
});

let currentCompilerLang = 'javascript';
let isCompilerFullScreen = false;
let sqlJsInstance = null;

function initOnlineCompiler() {
    setTimeout(() => {
        toggleCompilerFullScreen(true);
        changeCompilerLanguage('javascript');
    }, 100);
}

function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function toggleCompilerFullScreen(forceState) {
    const container = document.getElementById('vscode-compiler-container');
    const btnIcon = document.getElementById('compiler-fullscreen-icon');
    const btnText = document.getElementById('compiler-fullscreen-text');

    if (!container) return;

    if (typeof forceState === 'boolean') {
        isCompilerFullScreen = forceState;
    } else {
        isCompilerFullScreen = !isCompilerFullScreen;
    }

    if (isCompilerFullScreen) {
        container.classList.add('fixed', 'inset-0', 'z-50', 'bg-[#1e1e1e]', 'p-0', 'overflow-hidden', 'flex', 'flex-col', 'h-screen');
        document.body.classList.add('overflow-hidden');
        if (btnIcon) btnIcon.className = 'fa-solid fa-compress';
        if (btnText) btnText.innerText = 'Exit Fullscreen';
    } else {
        container.classList.remove('fixed', 'inset-0', 'z-50', 'bg-[#1e1e1e]', 'p-0', 'overflow-hidden', 'flex', 'flex-col', 'h-screen');
        document.body.classList.remove('overflow-hidden');
        if (btnIcon) btnIcon.className = 'fa-solid fa-expand';
        if (btnText) btnText.innerText = 'Fullscreen';
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isCompilerFullScreen) {
        toggleCompilerFullScreen(false);
    }
});

function changeCompilerLanguage(newLangKey) {
    if (!COMPILER_LANGUAGES[newLangKey]) return;

    // Save current active editor code into its separate codespace buffer before switching
    const currentEditor = document.getElementById('compiler-code-editor');
    if (currentEditor && currentCompilerLang) {
        compilerCodespaces[currentCompilerLang] = currentEditor.value;
    }

    currentCompilerLang = newLangKey;
    const langConfig = COMPILER_LANGUAGES[newLangKey];

    // Load code from current language's separate codespace buffer
    if (currentEditor) {
        currentEditor.value = compilerCodespaces[newLangKey] || langConfig.template;
        updateCompilerLineCount();
    }

    const dropdown = document.getElementById('compiler-lang-select');
    if (dropdown) dropdown.value = newLangKey;

    const activeFileName = document.getElementById('vscode-active-filename');
    if (activeFileName) {
        activeFileName.innerText = langConfig.fileName;
    }

    const tabTitle = document.getElementById('vscode-tab-title');
    if (tabTitle) {
        tabTitle.innerText = langConfig.fileName;
    }

    const statusLang = document.getElementById('vscode-status-lang');
    if (statusLang) {
        statusLang.innerText = langConfig.name;
    }

    // Highlight active file in Explorer Sidebar
    Object.keys(COMPILER_LANGUAGES).forEach(k => {
        const item = document.getElementById(`vscode-file-item-${k}`);
        if (item) {
            if (k === newLangKey) {
                item.className = 'flex items-center space-x-2 px-3 py-1.5 rounded bg-[#37373d] text-white font-bold cursor-pointer transition text-xs border-l-2 border-[#007acc] shadow';
            } else {
                item.className = 'flex items-center space-x-2 px-3 py-1.5 rounded hover:bg-[#2a2d2e] text-slate-400 hover:text-slate-200 cursor-pointer transition text-xs';
            }
        }
    });

    if (newLangKey === 'mysql') {
        switchCompilerTab('sqltables');
    } else if (newLangKey === 'html') {
        switchCompilerTab('htmlpreview');
    } else {
        switchCompilerTab('terminal');
    }
}

function switchCompilerTab(tabKey) {
    const terminalBox = document.getElementById('compiler-terminal-box');
    const sqlTablesBox = document.getElementById('compiler-sql-tables-box');
    const livePreviewBox = document.getElementById('compiler-live-preview-box');

    const btnTerminal = document.getElementById('compiler-tab-terminal');
    const btnSqlTables = document.getElementById('compiler-tab-sqltables');
    const btnHtmlPreview = document.getElementById('compiler-tab-htmlpreview');

    if (terminalBox) terminalBox.classList.add('hidden');
    if (sqlTablesBox) sqlTablesBox.classList.add('hidden');
    if (livePreviewBox) livePreviewBox.classList.add('hidden');

    const defaultTabStyle = 'px-3 py-1 text-xs font-semibold text-slate-400 hover:text-white transition cursor-pointer border-b-2 border-transparent';
    const activeTabStyle = 'px-3 py-1 text-xs font-bold text-white transition cursor-pointer border-b-2 border-[#007acc] bg-[#1e1e1e]';

    if (btnTerminal) btnTerminal.className = defaultTabStyle;
    if (btnSqlTables) btnSqlTables.className = defaultTabStyle;
    if (btnHtmlPreview) btnHtmlPreview.className = defaultTabStyle;

    if (tabKey === 'sqltables') {
        if (sqlTablesBox) sqlTablesBox.classList.remove('hidden');
        if (btnSqlTables) btnSqlTables.className = activeTabStyle;
    } else if (tabKey === 'htmlpreview') {
        if (livePreviewBox) livePreviewBox.classList.remove('hidden');
        if (btnHtmlPreview) btnHtmlPreview.className = activeTabStyle;
    } else {
        if (terminalBox) terminalBox.classList.remove('hidden');
        if (btnTerminal) btnTerminal.className = activeTabStyle;
    }
}

function resetCurrentCodespace() {
    const langConfig = COMPILER_LANGUAGES[currentCompilerLang];
    if (!langConfig) return;

    if (confirm(`Reset ${langConfig.fileName} codespace to initial template?`)) {
        compilerCodespaces[currentCompilerLang] = langConfig.template;
        const editor = document.getElementById('compiler-code-editor');
        if (editor) editor.value = langConfig.template;
        updateCompilerLineCount();
        showToast(`Reset ${langConfig.fileName} to default template`);
    }
}

function handleCompilerKeyDown(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        runCodeCompiler();
        return;
    }

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
    const lineNumbers = document.getElementById('vscode-line-numbers');

    if (editor) {
        compilerCodespaces[currentCompilerLang] = editor.value;

        const lines = editor.value.split('\n').length;
        if (lineBadge) lineBadge.innerText = `Ln 1, Col 1 (${lines} lines)`;

        if (lineNumbers) {
            let nums = '';
            for (let i = 1; i <= Math.max(lines, 25); i++) {
                nums += `<div>${i}</div>`;
            }
            lineNumbers.innerHTML = nums;
        }
    }
}

async function initSqlJsEngine() {
    if (sqlJsInstance) return sqlJsInstance;

    try {
        if (!window.initSqlJs) {
            await new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = 'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/sql-wasm.js';
                script.onload = resolve;
                script.onerror = () => reject(new Error('Failed to load SQL.js WASM Engine'));
                document.head.appendChild(script);
            });
        }

        const SQL = await window.initSqlJs({
            locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`
        });

        sqlJsInstance = SQL;
        return SQL;
    } catch (err) {
        console.warn('WASM SQL Engine Init Fallback:', err);
        return null;
    }
}

async function runSqlCompiler(code) {
    const statusElem = document.getElementById('compiler-status-pill');
    const outputElem = document.getElementById('compiler-output');
    const sqlTablesOutput = document.getElementById('compiler-sql-tables-output');

    switchCompilerTab('sqltables');

    if (statusElem) {
        statusElem.className = 'px-2.5 py-0.5 text-xs font-bold rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse';
        statusElem.innerText = 'Executing Query...';
    }

    const startTime = performance.now();

    try {
        const SQL = await initSqlJsEngine();

        if (SQL) {
            const db = new SQL.Database();
            let results = [];
            let execError = null;

            try {
                results = db.exec(code);
            } catch (sqlErr) {
                execError = sqlErr.message;
            }

            const elapsed = ((performance.now() - startTime) / 1000).toFixed(3);

            if (execError) {
                if (statusElem) {
                    statusElem.className = 'px-2.5 py-0.5 text-xs font-bold rounded bg-red-500/20 text-red-300 border border-red-500/30';
                    statusElem.innerText = `Error (${elapsed}s)`;
                }
                if (outputElem) outputElem.innerText = `MySQL Syntax Error:\n${execError}`;
                if (sqlTablesOutput) {
                    sqlTablesOutput.innerHTML = `
                        <div class="p-3 rounded bg-red-950/50 border border-red-800 text-red-300 font-mono text-xs">
                            <div class="font-bold flex items-center gap-2 mb-1 text-red-400">
                                <i class="fa-solid fa-triangle-exclamation"></i> MySQL Query Error
                            </div>
                            <div>${escapeHtml(execError)}</div>
                        </div>
                    `;
                }
                showToast('MySQL Query Error');
                return;
            }

            let schemaTables = [];
            try {
                const schemaRes = db.exec("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';");
                if (schemaRes.length > 0 && schemaRes[0].values) {
                    schemaTables = schemaRes[0].values.map(row => row[0]);
                }
            } catch (e) {}

            let schemaSummaryHtml = '';
            if (schemaTables.length > 0) {
                schemaSummaryHtml = `
                    <div class="p-2.5 bg-[#252526] rounded border border-[#333333] text-xs">
                        <div class="font-bold text-slate-300 mb-1.5 flex items-center justify-between">
                            <span class="flex items-center gap-1.5 text-amber-400"><i class="fa-solid fa-database"></i> Database Schema Explorer</span>
                            <span class="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold">${schemaTables.length} Active Table${schemaTables.length > 1 ? 's' : ''}</span>
                        </div>
                        <div class="flex flex-wrap gap-2">
                            ${schemaTables.map(tbl => {
                                let cnt = 0;
                                try {
                                    const cRes = db.exec(`SELECT COUNT(*) FROM "${tbl}";`);
                                    if (cRes.length > 0) cnt = cRes[0].values[0][0];
                                } catch (e) {}
                                return `<span class="px-2 py-1 rounded bg-[#1e1e1e] text-slate-200 border border-[#333333] font-mono text-[11px]"><i class="fa-solid fa-table text-indigo-400 mr-1"></i>${escapeHtml(tbl)} <span class="text-slate-400">(${cnt} rows)</span></span>`;
                            }).join('')}
                        </div>
                    </div>
                `;
            }

            let tablesHtml = '';
            if (results.length === 0) {
                tablesHtml = `
                    <div class="p-3 rounded bg-[#252526] border border-[#333333] text-slate-300 font-mono text-xs">
                        <i class="fa-solid fa-check-circle text-emerald-400 mr-2"></i> SQL statements executed successfully. (No SELECT result set returned).
                    </div>
                `;
            } else {
                results.forEach((res, idx) => {
                    const columns = res.columns;
                    const values = res.values;

                    tablesHtml += `
                        <div class="space-y-1.5">
                            <div class="flex items-center justify-between text-xs font-mono font-bold text-slate-300">
                                <span><i class="fa-solid fa-table-list text-sky-400 mr-1.5"></i> Result Set #${idx + 1}</span>
                                <span class="px-2 py-0.5 rounded bg-[#252526] text-emerald-400 text-[11px] font-bold">${values.length} row${values.length !== 1 ? 's' : ''}</span>
                            </div>
                            <div class="overflow-x-auto rounded border border-[#333333] bg-[#1e1e1e]">
                                <table class="w-full text-left font-mono text-xs border-collapse">
                                    <thead>
                                        <tr class="bg-[#252526] text-slate-200 border-b border-[#333333]">
                                            <th class="p-2 w-10 text-center text-slate-500 border-r border-[#333333]">#</th>
                                            ${columns.map(col => `<th class="p-2 font-bold border-r border-[#333333] last:border-r-0">${escapeHtml(col)}</th>`).join('')}
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-[#252526] text-slate-300">
                                        ${values.map((row, rIdx) => `
                                            <tr class="hover:bg-[#2a2d2e] transition">
                                                <td class="p-2 text-center text-slate-500 bg-[#1e1e1e] border-r border-[#333333] font-bold">${rIdx + 1}</td>
                                                ${row.map(val => `<td class="p-2 border-r border-[#333333] last:border-r-0 whitespace-nowrap">${val === null ? '<span class="text-slate-500 italic">NULL</span>' : escapeHtml(String(val))}</td>`).join('')}
                                            </tr>
                                        `).join('')}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    `;
                });
            }

            if (sqlTablesOutput) {
                sqlTablesOutput.innerHTML = `
                    <div class="space-y-3">
                        ${schemaSummaryHtml}
                        ${tablesHtml}
                    </div>
                `;
            }

            if (outputElem) {
                let summaryTxt = `MySQL Script executed in ${elapsed}s.\nResult Sets: ${results.length}\nActive Tables: ${schemaTables.join(', ') || 'None'}\n\n`;
                results.forEach((r, i) => {
                    summaryTxt += `--- Result Set #${i + 1} (${r.columns.join(', ')}) ---\n`;
                    r.values.forEach(valRow => {
                        summaryTxt += valRow.join(' | ') + '\n';
                    });
                    summaryTxt += '\n';
                });
                outputElem.innerText = summaryTxt;
            }

            if (statusElem) {
                statusElem.className = 'px-2.5 py-0.5 text-xs font-bold rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30';
                statusElem.innerText = `Success (${elapsed}s)`;
            }

            showToast(`MySQL executed in ${elapsed}s`);
            return;
        }
    } catch (e) {
        console.warn('WASM execution error:', e);
    }
}

async function runCodeCompiler() {
    const code = document.getElementById('compiler-code-editor').value;
    const stdin = document.getElementById('compiler-stdin-input') ? document.getElementById('compiler-stdin-input').value : '';
    const statusElem = document.getElementById('compiler-status-pill');
    const outputElem = document.getElementById('compiler-output');

    if (!code.trim()) {
        showToast('Please enter code or queries to run!');
        return;
    }

    if (currentCompilerLang === 'mysql') {
        runSqlCompiler(code);
        return;
    }

    const langConfig = COMPILER_LANGUAGES[currentCompilerLang];

    if (currentCompilerLang === 'html') {
        switchCompilerTab('htmlpreview');
        if (statusElem) {
            statusElem.className = 'px-2.5 py-0.5 text-xs font-bold rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30';
            statusElem.innerText = 'Rendered Live';
        }
        const iframe = document.getElementById('compiler-live-iframe');
        if (iframe) {
            iframe.srcdoc = code;
        }
        showToast('Live Web Sandbox updated!');
        return;
    }

    switchCompilerTab('terminal');

    if (statusElem) {
        statusElem.className = 'px-2.5 py-0.5 text-xs font-bold rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse';
        statusElem.innerText = 'Running...';
    }

    if (outputElem) {
        outputElem.innerText = 'Executing code in VS Code sandbox...\n';
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
                    statusElem.className = 'px-2.5 py-0.5 text-xs font-bold rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30';
                    statusElem.innerText = `Success (${elapsed}s)`;
                } else {
                    statusElem.className = 'px-2.5 py-0.5 text-xs font-bold rounded bg-red-500/20 text-red-300 border border-red-500/30';
                    statusElem.innerText = `Exit Code ${data.run.code} (${elapsed}s)`;
                }
            }
            showToast(`Code executed in ${elapsed}s`);
        } else {
            throw new Error('Unexpected execution response.');
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
                if (outputElem) outputElem.innerText = logs.join('\n') || '[Local JS Executed - No output]';
                if (statusElem) {
                    statusElem.className = 'px-2.5 py-0.5 text-xs font-bold rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30';
                    statusElem.innerText = `Success (${elapsed}s)`;
                }
                showToast('Executed locally in browser sandbox!');
                return;
            } catch (jsErr) {
                if (outputElem) outputElem.innerText = `JavaScript Runtime Error: ${jsErr.message}`;
            }
        }

        if (statusElem) {
            statusElem.className = 'px-2.5 py-0.5 text-xs font-bold rounded bg-red-500/20 text-red-300 border border-red-500/30';
            statusElem.innerText = 'Failed';
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
    const fileName = langConfig.fileName;
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
    name: 'VS Code Online - Code Compiler & MySQL IDE',
    category: 'Developer & Text',
    icon: 'fa-code',
    color: 'text-sky-500 bg-sky-50 dark:bg-sky-950/50',
    shortDesc: 'Authentic Visual Studio Code online IDE compiler & MySQL database runner with separate file codespaces, default full-screen mode, and live HTML preview.',
    seoDesc: 'Authentic Visual Studio Code online IDE compiler and MySQL database engine. Execute JavaScript, Python, MySQL tables, C++, Java, C, C#, Go, Rust, PHP, Ruby, TypeScript, and HTML/CSS.',
    render: () => `
        <div id="vscode-compiler-container" class="rounded-xl overflow-hidden bg-[#1e1e1e] text-[#cccccc] border border-[#333333] shadow-2xl font-sans select-none flex flex-col h-full min-h-[680px]">
            
            <!-- VS Code Window Titlebar -->
            <div class="h-9 bg-[#323233] border-b border-[#252526] px-3 flex items-center justify-between text-xs text-[#cccccc]">
                <!-- Mac Control Dots & Title -->
                <div class="flex items-center space-x-2">
                    <div class="flex items-center space-x-1.5 mr-2">
                        <span class="w-3 h-3 rounded-full bg-[#ff5f56] inline-block"></span>
                        <span class="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block"></span>
                        <span class="w-3 h-3 rounded-full bg-[#27c93f] inline-block"></span>
                    </div>
                    <span id="vscode-active-filename" class="font-mono text-slate-300 font-bold">main.js</span>
                    <span class="text-slate-500 text-[11px] hidden sm:inline">- VS Code Online Codespace</span>
                </div>

                <!-- Top Language Dropdown & Quick Actions -->
                <div class="flex items-center space-x-2">
                    <select id="compiler-lang-select" onchange="changeCompilerLanguage(this.value)" class="bg-[#252526] border border-[#3c3c3c] text-white text-xs font-bold py-0.5 px-2 rounded outline-none cursor-pointer">
                        ${Object.keys(COMPILER_LANGUAGES).map(k => `
                            <option value="${k}">${COMPILER_LANGUAGES[k].name}</option>
                        `).join('')}
                    </select>

                    <button onclick="runCodeCompiler()" title="Run Code (Ctrl+Enter)" class="px-3 py-1 rounded bg-[#007acc] hover:bg-[#0062a3] text-white font-bold text-xs transition flex items-center gap-1.5 shadow">
                        <i class="fa-solid fa-play text-[10px]"></i> Run
                    </button>

                    <button onclick="toggleCompilerFullScreen()" id="compiler-fullscreen-btn" title="Toggle Fullscreen" class="p-1 px-2 rounded bg-[#2d2d2d] hover:bg-[#3c3c3c] text-slate-300 text-xs transition">
                        <i id="compiler-fullscreen-icon" class="fa-solid fa-compress"></i>
                        <span id="compiler-fullscreen-text" class="hidden sm:inline ml-1 text-[11px]">Exit Fullscreen</span>
                    </button>

                    <button onclick="resetCurrentCodespace()" title="Reset File Codespace" class="p-1 px-2 rounded bg-[#2d2d2d] hover:bg-[#3c3c3c] text-amber-400 text-xs transition">
                        <i class="fa-solid fa-rotate-left"></i>
                    </button>

                    <button onclick="copyCompilerCode()" title="Copy Code" class="p-1 px-2 rounded bg-[#2d2d2d] hover:bg-[#3c3c3c] text-slate-300 text-xs transition">
                        <i class="fa-solid fa-copy"></i>
                    </button>

                    <button onclick="downloadCompilerCode()" title="Download File" class="p-1 px-2 rounded bg-[#2d2d2d] hover:bg-[#3c3c3c] text-slate-300 text-xs transition">
                        <i class="fa-solid fa-download"></i>
                    </button>
                </div>
            </div>

            <!-- VS Code Workspace Grid -->
            <div class="flex-1 flex overflow-hidden">
                <!-- Activity Bar (Far Left Icon Strip) -->
                <div class="w-11 bg-[#333333] flex flex-col items-center py-3 space-y-4 text-slate-400 border-r border-[#252526]">
                    <button title="Explorer" class="text-white text-base hover:text-white transition"><i class="fa-solid fa-files"></i></button>
                    <button title="Search" class="hover:text-white transition text-sm"><i class="fa-solid fa-magnifying-glass"></i></button>
                    <button title="Source Control" class="hover:text-white transition text-sm"><i class="fa-solid fa-code-branch"></i></button>
                    <button title="Run & Debug" class="hover:text-white transition text-sm"><i class="fa-solid fa-play"></i></button>
                    <button title="Extensions" class="hover:text-white transition text-sm"><i class="fa-solid fa-cubes"></i></button>
                    <div class="flex-1"></div>
                    <button title="Settings" class="hover:text-white transition text-sm"><i class="fa-solid fa-gear"></i></button>
                </div>

                <!-- Explorer Sidebar (File Tree with Codespace Buffers) -->
                <div class="w-48 bg-[#252526] border-r border-[#1e1e1e] flex flex-col text-xs hidden sm:flex">
                    <div class="p-2 font-bold uppercase tracking-wider text-[10px] text-slate-400 border-b border-[#1e1e1e] flex items-center justify-between">
                        <span>WORKSPACE FILES</span>
                        <i class="fa-solid fa-code-commit text-slate-500"></i>
                    </div>
                    <div class="p-1 space-y-0.5 overflow-y-auto flex-1 font-mono">
                        ${Object.keys(COMPILER_LANGUAGES).map(k => {
                            const lang = COMPILER_LANGUAGES[k];
                            return `
                                <div id="vscode-file-item-${k}" onclick="changeCompilerLanguage('${k}')" class="flex items-center space-x-2 px-3 py-1.5 rounded hover:bg-[#2a2d2e] text-slate-400 hover:text-slate-200 cursor-pointer transition text-xs">
                                    <i class="${lang.icon} text-sm"></i>
                                    <span>${lang.fileName}</span>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>

                <!-- Main Editor & Terminal Splitted Area -->
                <div class="flex-1 flex flex-col bg-[#1e1e1e] overflow-hidden">
                    <!-- Editor Pane -->
                    <div class="flex-1 flex flex-col min-h-[340px]">
                        <!-- Editor Top Tab Bar -->
                        <div class="h-8 bg-[#2d2d2d] flex items-center px-2 space-x-1 border-b border-[#1e1e1e]">
                            <div class="px-3 py-1 bg-[#1e1e1e] text-white text-xs font-mono font-bold flex items-center gap-2 border-t-2 border-[#007acc] rounded-t">
                                <i class="fa-solid fa-file-code text-[#007acc] text-xs"></i>
                                <span id="vscode-tab-title">main.js</span>
                            </div>
                        </div>

                        <!-- Code Editor Gutter + Textarea -->
                        <div class="flex-1 flex relative bg-[#1e1e1e] overflow-hidden">
                            <!-- Line Numbers Gutter -->
                            <div id="vscode-line-numbers" class="w-10 py-3 bg-[#1e1e1e] text-right pr-2 text-[#858585] font-mono text-xs select-none border-r border-[#2d2d2d] leading-relaxed">
                                <div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div><div>7</div><div>8</div><div>9</div><div>10</div>
                            </div>

                            <!-- Textarea Code Input -->
                            <textarea id="compiler-code-editor"
                                      onkeydown="handleCompilerKeyDown(event)"
                                      oninput="updateCompilerLineCount()"
                                      spellcheck="false"
                                      placeholder="Write code or SQL queries here..."
                                      class="flex-1 p-3 font-mono text-xs sm:text-sm text-[#d4d4d4] bg-[#1e1e1e] outline-none resize-none leading-relaxed selection:bg-[#264f78]"></textarea>
                        </div>

                        <!-- STDIN Input Row -->
                        <div class="px-3 py-1.5 bg-[#252526] border-t border-[#333333] flex items-center space-x-2 text-xs">
                            <span class="font-bold text-slate-400 font-mono">STDIN:</span>
                            <input type="text" id="compiler-stdin-input" placeholder="Pass input arguments here..." class="flex-1 bg-[#1e1e1e] border border-[#3c3c3c] text-slate-200 px-2 py-0.5 rounded font-mono outline-none focus:border-[#007acc]">
                        </div>
                    </div>

                    <!-- Bottom Integrated Terminal Panel -->
                    <div class="h-56 bg-[#1e1e1e] border-t border-[#2d2d2d] flex flex-col">
                        <!-- Terminal Tabs Header -->
                        <div class="h-7 bg-[#252526] border-b border-[#333333] flex items-center justify-between px-3 text-xs">
                            <div class="flex items-center space-x-2 font-mono">
                                <button id="compiler-tab-terminal" onclick="switchCompilerTab('terminal')" class="px-3 py-1 text-xs font-bold text-white transition cursor-pointer border-b-2 border-[#007acc] bg-[#1e1e1e]">TERMINAL</button>
                                <button id="compiler-tab-sqltables" onclick="switchCompilerTab('sqltables')" class="px-3 py-1 text-xs font-semibold text-slate-400 hover:text-white transition cursor-pointer border-b-2 border-transparent">MYSQL TABLES</button>
                                <button id="compiler-tab-htmlpreview" onclick="switchCompilerTab('htmlpreview')" class="px-3 py-1 text-xs font-semibold text-slate-400 hover:text-white transition cursor-pointer border-b-2 border-transparent">LIVE WEB</button>
                            </div>
                            <span id="compiler-status-pill" class="px-2 py-0.5 text-[10px] font-bold rounded bg-[#2d2d2d] text-slate-300">Ready</span>
                        </div>

                        <!-- Terminal Panel Body -->
                        <div class="flex-1 p-3 font-mono text-xs overflow-y-auto">
                            <div id="compiler-terminal-box" class="h-full">
                                <pre id="compiler-output" class="whitespace-pre-wrap break-words text-[#4ec9b0] leading-relaxed">Press "Run" (Ctrl+Enter) to execute code in VS Code sandbox...</pre>
                            </div>

                            <div id="compiler-sql-tables-box" class="hidden h-full">
                                <div id="compiler-sql-tables-output" class="space-y-2">
                                    <div class="p-3 bg-[#252526] rounded border border-[#333333] text-slate-400 text-xs">
                                        Select MySQL in Explorer/Dropdown and click "Run" to execute SQL statements.
                                    </div>
                                </div>
                            </div>

                            <div id="compiler-live-preview-box" class="hidden h-full bg-white rounded overflow-hidden">
                                <iframe id="compiler-live-iframe" class="w-full h-full border-none" title="Live Preview"></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- VS Code Bottom Blue Status Bar -->
            <div class="h-6 bg-[#007acc] text-white text-[11px] px-3 flex items-center justify-between font-mono font-medium">
                <div class="flex items-center space-x-3">
                    <span class="flex items-center gap-1"><i class="fa-solid fa-code-branch text-[10px]"></i> main*</span>
                    <span id="compiler-line-count">Ln 1, Col 1</span>
                    <span id="vscode-status-lang">JavaScript</span>
                </div>
                <div class="flex items-center space-x-3">
                    <span>Spaces: 4</span>
                    <span>UTF-8</span>
                    <span>LetsDoIn Engine</span>
                </div>
            </div>
        </div>
    `,
    init: () => initOnlineCompiler()
};

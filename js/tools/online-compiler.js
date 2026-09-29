/* MULTI-LANGUAGE ONLINE CODE COMPILER, MYSQL DATABASE & LIVE RUNNER */

const COMPILER_LANGUAGES = {
    javascript: {
        name: 'JavaScript (Node.js)',
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
    mysql: {
        name: 'MySQL / SQL Database',
        pistonLang: 'sqlite3',
        version: '3.36.0',
        ext: 'sql',
        icon: 'fa-solid fa-database text-amber-400',
        template: `-- Online MySQL / SQL Database Engine
-- Create sample tables and execute relational queries

CREATE TABLE users (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(100),
    role VARCHAR(20),
    joined_date DATE
);

INSERT INTO users VALUES
(1, 'Alice Smith', 'alice@example.com', 'Admin', '2026-01-15'),
(2, 'Bob Jones', 'bob@example.com', 'Developer', '2026-02-01'),
(3, 'Charlie Brown', 'charlie@example.com', 'Designer', '2026-03-10'),
(4, 'Diana Prince', 'diana@example.com', 'Manager', '2026-04-20');

CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    user_id INT,
    product VARCHAR(50),
    amount DECIMAL(10,2)
);

INSERT INTO orders VALUES
(101, 1, 'MacBook Pro', 1999.99),
(102, 2, 'Dell XPS 15', 1499.50),
(103, 1, 'Keychron Keyboard', 120.00),
(104, 3, '4K Monitor', 450.00);

-- Query 1: Retrieve all registered users
SELECT * FROM users;

-- Query 2: Relational JOIN between users and orders
SELECT u.name, u.role, o.product, o.amount
FROM users u
JOIN orders o ON u.id = o.user_id;`
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
        template: `<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    body {\n      font-family: 'Inter', sans-serif;\n      text-align: center;\n      padding: 30px;\n      background: #0f172a;\n      color: #f8fafc;\n    }\n    .card {\n      background: #1e293b;\n      padding: 24px;\n      border-radius: 16px;\n      border: 1px solid #334155;\n      display: inline-block;\n      box-shadow: 0 10px 25px rgba(0,0,0,0.3);\n    }\n    button {\n      background: #6366f1;\n      color: white;\n      border: none;\n      padding: 10px 20px;\n      border-radius: 10px;\n      font-weight: bold;\n      font-size: 13px;\n      cursor: pointer;\n      transition: 0.2s;\n    }\n    button:hover {\n      background: #4f46e5;\n      transform: scale(1.05);\n    }\n  </style>\n</head>\n<body>\n  <div class="card">\n    <h2>LetsDoIn Live Web Sandbox</h2>\n    <p>Edit HTML, CSS, and JS to see instant live preview!</p>\n    <button onclick="interactiveDemo()">Run Interactive Action</button>\n    <p id="output-msg" style="margin-top: 15px; color: #38bdf8; font-weight: bold;"></p>\n  </div>\n  <script>\n    function interactiveDemo() {\n      document.getElementById('output-msg').innerText = "Hello from Web Sandbox! Executed at " + new Date().toLocaleTimeString();\n    }\n  </script>\n</body>\n</html>`
    }
};

let currentCompilerLang = 'javascript';
let isCompilerFullScreen = false;
let sqlJsInstance = null;

function initOnlineCompiler() {
    setTimeout(() => {
        changeCompilerLanguage('javascript');
    }, 50);
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

function toggleCompilerFullScreen() {
    const container = document.getElementById('online-compiler-container');
    const btnIcon = document.getElementById('compiler-fullscreen-icon');
    const btnText = document.getElementById('compiler-fullscreen-text');

    if (!container) return;

    isCompilerFullScreen = !isCompilerFullScreen;

    if (isCompilerFullScreen) {
        container.classList.add('fixed', 'inset-0', 'z-50', 'bg-slate-950', 'p-4', 'sm:p-6', 'overflow-y-auto', 'flex', 'flex-col', 'h-screen');
        document.body.classList.add('overflow-hidden');
        if (btnIcon) btnIcon.className = 'fa-solid fa-compress';
        if (btnText) btnText.innerText = 'Exit Fullscreen';
        showToast('Full Screen Mode Enabled (Press Esc to Exit)');
    } else {
        container.classList.remove('fixed', 'inset-0', 'z-50', 'bg-slate-950', 'p-4', 'sm:p-6', 'overflow-y-auto', 'flex', 'flex-col', 'h-screen');
        document.body.classList.remove('overflow-hidden');
        if (btnIcon) btnIcon.className = 'fa-solid fa-expand';
        if (btnText) btnText.innerText = 'Fullscreen';
        showToast('Exited Full Screen Mode');
    }
}

// Exit Fullscreen on Escape Key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isCompilerFullScreen) {
        toggleCompilerFullScreen();
    }
});

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

    // Adjust Tab Visibility
    if (langKey === 'mysql') {
        switchCompilerTab('sqltables');
    } else if (langKey === 'html') {
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

    // Reset Box Visibility
    if (terminalBox) terminalBox.classList.add('hidden');
    if (sqlTablesBox) sqlTablesBox.classList.add('hidden');
    if (livePreviewBox) livePreviewBox.classList.add('hidden');

    // Reset Tab Button Styling
    const defaultTabStyle = 'px-3 py-1 text-xs font-bold rounded-lg text-slate-400 hover:text-white transition';
    const activeTabStyle = 'px-3 py-1 text-xs font-bold rounded-lg bg-violet-600 text-white shadow-sm transition';

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

function handleCompilerKeyDown(e) {
    // Handle Ctrl+Enter or Cmd+Enter to Run Code
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        runCodeCompiler();
        return;
    }

    // Handle Tab Indentation
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
        statusElem.className = 'px-2.5 py-0.5 text-xs font-bold rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 animate-pulse';
        statusElem.innerText = 'Executing MySQL Query...';
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
                    statusElem.className = 'px-2.5 py-0.5 text-xs font-bold rounded-full bg-red-500/20 text-red-400 border border-red-500/30';
                    statusElem.innerText = `MySQL Error (${elapsed}s)`;
                }
                if (outputElem) outputElem.innerText = `MySQL Syntax/Execution Error:\n${execError}`;
                if (sqlTablesOutput) {
                    sqlTablesOutput.innerHTML = `
                        <div class="p-4 rounded-xl bg-red-950/40 border border-red-800/60 text-red-300 font-mono text-xs">
                            <div class="font-bold flex items-center gap-2 mb-1 text-red-400">
                                <i class="fa-solid fa-triangle-exclamation"></i> MySQL Query Execution Error
                            </div>
                            <div class="leading-relaxed">${escapeHtml(execError)}</div>
                        </div>
                    `;
                }
                showToast('MySQL Query Execution Error');
                return;
            }

            // Inspect Schema Tables
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
                    <div class="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs">
                        <div class="font-bold text-slate-300 mb-2 flex items-center justify-between">
                            <span class="flex items-center gap-1.5"><i class="fa-solid fa-database text-amber-400"></i> Database Schema Explorer</span>
                            <span class="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold">${schemaTables.length} Active Table${schemaTables.length > 1 ? 's' : ''}</span>
                        </div>
                        <div class="flex flex-wrap gap-2">
                            ${schemaTables.map(tbl => {
                                let cnt = 0;
                                try {
                                    const cRes = db.exec(`SELECT COUNT(*) FROM "${tbl}";`);
                                    if (cRes.length > 0) cnt = cRes[0].values[0][0];
                                } catch (e) {}
                                return `<span class="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 font-mono text-[11px]"><i class="fa-solid fa-table text-indigo-400 mr-1"></i>${escapeHtml(tbl)} <span class="text-slate-400">(${cnt} rows)</span></span>`;
                            }).join('')}
                        </div>
                    </div>
                `;
            }

            // Build Output HTML Data Tables
            let tablesHtml = '';
            if (results.length === 0) {
                tablesHtml = `
                    <div class="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-mono text-xs">
                        <i class="fa-solid fa-check-circle text-emerald-400 mr-2"></i> SQL statements executed successfully. (No SELECT result set returned).
                    </div>
                `;
            } else {
                results.forEach((res, idx) => {
                    const columns = res.columns;
                    const values = res.values;

                    tablesHtml += `
                        <div class="space-y-2">
                            <div class="flex items-center justify-between text-xs font-mono font-bold text-slate-300">
                                <span><i class="fa-solid fa-table-list text-violet-400 mr-1.5"></i> Result Set #${idx + 1}</span>
                                <span class="px-2 py-0.5 rounded bg-slate-800 text-emerald-400 text-[11px] font-bold">${values.length} row${values.length !== 1 ? 's' : ''} returned</span>
                            </div>
                            <div class="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900 shadow-lg">
                                <table class="w-full text-left font-mono text-xs border-collapse">
                                    <thead>
                                        <tr class="bg-slate-800/90 text-slate-200 border-b border-slate-700">
                                            <th class="p-2.5 w-10 text-center text-slate-500 border-r border-slate-700">#</th>
                                            ${columns.map(col => `<th class="p-2.5 font-bold border-r border-slate-700 last:border-r-0">${escapeHtml(col)}</th>`).join('')}
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-slate-800 text-slate-300">
                                        ${values.map((row, rIdx) => `
                                            <tr class="hover:bg-slate-800/50 transition">
                                                <td class="p-2.5 text-center text-slate-500 bg-slate-950/40 border-r border-slate-800 font-bold">${rIdx + 1}</td>
                                                ${row.map(val => `<td class="p-2.5 border-r border-slate-800 last:border-r-0 whitespace-nowrap">${val === null ? '<span class="text-slate-500 italic">NULL</span>' : escapeHtml(String(val))}</td>`).join('')}
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
                    <div class="space-y-4">
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
                statusElem.className = 'px-2.5 py-0.5 text-xs font-bold rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30';
                statusElem.innerText = `MySQL Success (${elapsed}s)`;
            }

            showToast(`MySQL Query Executed in ${elapsed}s`);
            return;
        }
    } catch (e) {
        console.warn('WASM execution error, trying API fallback:', e);
    }

    // Remote API Fallback for SQLite/MySQL
    try {
        const response = await fetch('https://emkc.org/api/v2/piston/execute', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                language: 'sqlite3',
                version: '*',
                files: [{ name: 'query.sql', content: code }]
            })
        });

        const elapsed = ((performance.now() - startTime) / 1000).toFixed(2);
        const data = await response.json();

        if (data.run) {
            const rawOut = data.run.stdout || data.run.stderr || '[Query Executed]';
            if (outputElem) outputElem.innerText = rawOut;
            if (sqlTablesOutput) {
                sqlTablesOutput.innerHTML = `
                    <div class="p-4 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300 whitespace-pre-wrap">${escapeHtml(rawOut)}</div>
                `;
            }
            if (statusElem) {
                statusElem.className = 'px-2.5 py-0.5 text-xs font-bold rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30';
                statusElem.innerText = `MySQL Success (${elapsed}s)`;
            }
        }
    } catch (apiErr) {
        if (statusElem) {
            statusElem.className = 'px-2.5 py-0.5 text-xs font-bold rounded-full bg-red-500/20 text-red-400 border border-red-500/30';
            statusElem.innerText = 'MySQL Execution Failed';
        }
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
            statusElem.className = 'px-2.5 py-0.5 text-xs font-bold rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30';
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
        statusElem.className = 'px-2.5 py-0.5 text-xs font-bold rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 animate-pulse';
        statusElem.innerText = 'Compiling & Executing...';
    }

    if (outputElem) {
        outputElem.innerText = 'Compiling and executing code on server sandbox...\n';
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
                    statusElem.className = 'px-2.5 py-0.5 text-xs font-bold rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30';
                    statusElem.innerText = `Success (${elapsed}s)`;
                } else {
                    statusElem.className = 'px-2.5 py-0.5 text-xs font-bold rounded-full bg-red-500/20 text-red-400 border border-red-500/30';
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
                    statusElem.className = 'px-2.5 py-0.5 text-xs font-bold rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30';
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
            statusElem.className = 'px-2.5 py-0.5 text-xs font-bold rounded-full bg-red-500/20 text-red-400 border border-red-500/30';
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
    name: 'Multi-Language & MySQL Online Code Compiler',
    category: 'Developer & Text',
    icon: 'fa-code',
    color: 'text-violet-500 bg-violet-50 dark:bg-violet-950/50',
    shortDesc: 'Compact multi-language online compiler & MySQL database runner with interactive tables, full-screen mode, and live HTML preview.',
    seoDesc: 'Compact multi-language code compiler and MySQL online database engine. Execute JavaScript, Python, MySQL tables, C++, Java, C, C#, Go, Rust, PHP, Ruby, TypeScript, and HTML/CSS.',
    render: () => `
        <div id="online-compiler-container" class="space-y-4 transition-all duration-300">
            <!-- Header Compact Toolbar -->
            <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 sm:p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl text-white">
                <div class="flex items-center space-x-3">
                    <div class="w-9 h-9 rounded-xl bg-violet-600/30 border border-violet-500/40 text-violet-400 flex items-center justify-center font-bold text-base shadow-inner">
                        <i class="fa-solid fa-terminal"></i>
                    </div>
                    <div>
                        <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Environment / Language</label>
                        <select id="compiler-lang-select" onchange="changeCompilerLanguage(this.value)" class="bg-transparent font-extrabold text-white text-xs sm:text-sm outline-none cursor-pointer hover:text-violet-300 transition">
                            <option value="javascript" class="bg-slate-900 text-white">JavaScript (Node.js)</option>
                            <option value="python" class="bg-slate-900 text-white">Python 3</option>
                            <option value="mysql" class="bg-slate-900 text-amber-400 font-bold">MySQL / SQL Database</option>
                            <option value="cpp" class="bg-slate-900 text-white">C++ (GCC)</option>
                            <option value="java" class="bg-slate-900 text-white">Java (OpenJDK)</option>
                            <option value="c" class="bg-slate-900 text-white">C (GCC)</option>
                            <option value="csharp" class="bg-slate-900 text-white">C# (.NET)</option>
                            <option value="go" class="bg-slate-900 text-white">Go (Golang)</option>
                            <option value="rust" class="bg-slate-900 text-white">Rust (Rustc)</option>
                            <option value="php" class="bg-slate-900 text-white">PHP Engine</option>
                            <option value="ruby" class="bg-slate-900 text-white">Ruby Engine</option>
                            <option value="typescript" class="bg-slate-900 text-white">TypeScript</option>
                            <option value="html" class="bg-slate-900 text-white">HTML / CSS / JS Live Web</option>
                        </select>
                    </div>
                </div>

                <!-- Action Controls Bar -->
                <div class="flex flex-wrap items-center gap-2 justify-end">
                    <button onclick="toggleCompilerFullScreen()" id="compiler-fullscreen-btn" title="Toggle Fullscreen Mode" class="px-3 py-1.5 rounded-xl border border-slate-700 bg-slate-800/80 text-slate-200 hover:bg-slate-700 text-xs font-semibold transition flex items-center gap-1.5 shadow-sm">
                        <i id="compiler-fullscreen-icon" class="fa-solid fa-expand text-indigo-400"></i>
                        <span id="compiler-fullscreen-text" class="hidden sm:inline">Fullscreen</span>
                    </button>

                    <button onclick="copyCompilerCode()" title="Copy Code" class="px-2.5 py-1.5 rounded-xl border border-slate-700 bg-slate-800/80 text-slate-200 hover:bg-slate-700 text-xs font-semibold transition flex items-center gap-1.5">
                        <i class="fa-solid fa-copy text-slate-400"></i> <span class="hidden sm:inline">Copy</span>
                    </button>

                    <button onclick="clearCompilerCode()" title="Clear Editor" class="px-2.5 py-1.5 rounded-xl border border-slate-700 bg-slate-800/80 text-slate-200 hover:bg-slate-700 text-xs font-semibold transition flex items-center gap-1.5">
                        <i class="fa-solid fa-trash text-slate-400"></i> <span class="hidden sm:inline">Clear</span>
                    </button>

                    <button onclick="downloadCompilerCode()" title="Save File" class="px-2.5 py-1.5 rounded-xl border border-slate-700 bg-slate-800/80 text-slate-200 hover:bg-slate-700 text-xs font-semibold transition flex items-center gap-1.5">
                        <i class="fa-solid fa-download text-slate-400"></i> <span class="hidden sm:inline">Save</span>
                    </button>

                    <button onclick="runCodeCompiler()" class="px-4 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold transition shadow-lg flex items-center gap-2 border border-violet-400/30">
                        <i class="fa-solid fa-play"></i> Run <span class="hidden sm:inline text-[10px] text-violet-200 opacity-80">(Ctrl+Enter)</span>
                    </button>
                </div>
            </div>

            <!-- Compact Split Editor & Output Panel -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1">
                <!-- Editor Pane -->
                <div class="lg:col-span-7 flex flex-col space-y-2">
                    <div class="flex justify-between items-center px-1">
                        <span id="compiler-lang-badge" class="text-xs font-bold text-violet-400 uppercase tracking-wider">JavaScript (Node.js)</span>
                        <span id="compiler-line-count" class="text-xs text-slate-400 font-mono">12 Lines</span>
                    </div>

                    <div class="relative flex-1 rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-xl flex flex-col">
                        <textarea id="compiler-code-editor"
                                  onkeydown="handleCompilerKeyDown(event)"
                                  oninput="updateCompilerLineCount()"
                                  rows="16"
                                  spellcheck="false"
                                  placeholder="Write code or SQL queries here..."
                                  class="w-full flex-1 p-3.5 font-mono text-xs sm:text-sm text-slate-100 bg-slate-950 outline-none resize-y leading-relaxed focus:ring-1 focus:ring-violet-500 rounded-2xl"></textarea>
                    </div>

                    <!-- STDIN Optional Input Bar -->
                    <div class="p-2.5 bg-slate-900 rounded-2xl border border-slate-800 space-y-1">
                        <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Standard Input (STDIN)</label>
                        <input type="text" id="compiler-stdin-input" placeholder="Enter input arguments or data lines here..." class="w-full px-3 py-1 rounded-xl border border-slate-800 bg-slate-950 font-mono text-xs text-slate-200 outline-none focus:border-violet-500 transition">
                    </div>
                </div>

                <!-- Output Terminal Pane -->
                <div class="lg:col-span-5 flex flex-col space-y-2">
                    <!-- Tab Navigation Header -->
                    <div class="flex items-center justify-between px-1">
                        <div class="flex items-center space-x-1 p-0.5 rounded-xl bg-slate-900 border border-slate-800">
                            <button id="compiler-tab-terminal" onclick="switchCompilerTab('terminal')" class="px-3 py-1 text-xs font-bold rounded-lg bg-violet-600 text-white shadow-sm transition">Terminal</button>
                            <button id="compiler-tab-sqltables" onclick="switchCompilerTab('sqltables')" class="px-3 py-1 text-xs font-bold rounded-lg text-slate-400 hover:text-white transition"><i class="fa-solid fa-table mr-1 text-amber-400"></i> MySQL Tables</button>
                            <button id="compiler-tab-htmlpreview" onclick="switchCompilerTab('htmlpreview')" class="px-3 py-1 text-xs font-bold rounded-lg text-slate-400 hover:text-white transition"><i class="fa-solid fa-globe mr-1 text-blue-400"></i> Live Web</button>
                        </div>
                        <span id="compiler-status-pill" class="px-2.5 py-0.5 text-[11px] font-bold rounded-full bg-slate-800 text-slate-400 border border-slate-700">Ready</span>
                    </div>

                    <!-- Output Container Box -->
                    <div class="flex-1 min-h-[380px] rounded-2xl bg-slate-950 border border-slate-800 p-3.5 font-mono text-xs overflow-hidden shadow-2xl flex flex-col">
                        <!-- Terminal View -->
                        <div id="compiler-terminal-box" class="flex-1 overflow-y-auto flex flex-col justify-between">
                            <pre id="compiler-output" class="whitespace-pre-wrap break-words leading-relaxed text-emerald-400">Press "Run" (Ctrl+Enter) to compile and execute program output...</pre>
                            <div class="pt-2 border-t border-slate-900 text-[10px] text-slate-500 flex justify-between">
                                <span>LetsDoIn Execution Engine</span>
                                <span>Sandbox Mode</span>
                            </div>
                        </div>

                        <!-- MySQL Data Tables View -->
                        <div id="compiler-sql-tables-box" class="hidden flex-1 overflow-y-auto space-y-3">
                            <div id="compiler-sql-tables-output" class="space-y-3">
                                <div class="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 text-xs">
                                    <i class="fa-solid fa-database text-amber-400 mr-2"></i> Select MySQL in language menu and click "Run" to execute SQL queries and inspect formatted relational data tables.
                                </div>
                            </div>
                        </div>

                        <!-- Live Web HTML Sandbox Preview -->
                        <div id="compiler-live-preview-box" class="hidden flex-1 rounded-xl bg-white overflow-hidden">
                            <iframe id="compiler-live-iframe" class="w-full h-full border-none" title="Live Preview"></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    init: () => initOnlineCompiler()
};

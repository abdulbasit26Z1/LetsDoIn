/* HOME PAGE VIEW */

function renderHomePage() {
    const safeTools = (typeof TOOLS !== 'undefined' && Array.isArray(TOOLS)) ? TOOLS : [];
    const safeBlogs = (typeof BLOGS !== 'undefined' && Array.isArray(BLOGS)) ? BLOGS : [];
    const safeApps = (typeof APPS !== 'undefined' && Array.isArray(APPS)) ? APPS : [];

    return `
        <div class="space-y-8 sm:space-y-12">
            <!-- Hero Section -->
            <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-10 lg:p-12 shadow-2xl border border-slate-800">
                <div class="relative z-10 max-w-3xl space-y-4">
                    <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold">
                        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        <span>UK Editorial, Developer IDEs &amp; Daily Utility Platform</span>
                    </div>
                    <h1 class="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                        British Financial Clarity, <span class="uk-gradient-text">VS Code &amp; Cisco Packet Tracer</span>
                    </h1>
                    <p class="text-slate-300 text-xs sm:text-base leading-relaxed">
                        Authoritative British editorial insight on personal finance, HMRC tax bands, and Ofgem energy price tariffs, combined with VS Code Online IDE, Cisco Packet Tracer Online, and ${safeTools.length}+ privacy-first daily utilities.
                    </p>
                    <div class="flex flex-col sm:flex-row flex-wrap gap-2.5 sm:gap-3 pt-2 w-full">
                        <button onclick="navigateTo('tool', 'cisco-packet-tracer')" class="w-full sm:w-auto px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm shadow-lg transition flex items-center justify-center">
                            <i class="fa-solid fa-network-wired mr-2 text-indigo-300"></i> Cisco Packet Tracer Online
                        </button>
                        <button onclick="navigateTo('tool', 'online-compiler')" class="w-full sm:w-auto px-5 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs sm:text-sm shadow-lg transition flex items-center justify-center">
                            <i class="fa-solid fa-code mr-2 text-sky-300"></i> VS Code Online IDE &amp; MySQL
                        </button>
                        <button onclick="navigateTo('app', 'capcut-mod-apk')" class="w-full sm:w-auto px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs sm:text-sm shadow-lg transition flex items-center justify-center">
                            <i class="fa-solid fa-mobile-screen-button mr-2 text-purple-300"></i> CapCut MOD APK v19.7.0
                        </button>
                        <button onclick="navigateTo('tools')" class="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 transition flex items-center justify-center">
                            <i class="fa-solid fa-calculator mr-2 text-emerald-400"></i> All ${safeTools.length}+ Utilities
                        </button>
                    </div>
                </div>
            </div>

            <!-- Featured Mobile Apps & MODs Section -->
            <div class="space-y-4 sm:space-y-6">
                <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                    <div>
                        <h2 class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Featured Mobile Apps &amp; MODs</h2>
                        <p class="text-xs text-slate-500">Unlocked mobile video editors and utility APK downloads</p>
                    </div>
                    <button onclick="navigateTo('apps')" class="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline self-start sm:self-auto">View All Apps &rarr;</button>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    ${safeApps.map(app => `
                        <div onclick="navigateTo('app', '${app.id}')" class="group cursor-pointer p-5 sm:p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-purple-500/50 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4">
                            <div class="flex items-center space-x-3 sm:space-x-4">
                                <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr ${app.color} text-white flex items-center justify-center text-xl sm:text-2xl shadow-md shrink-0">
                                    <i class="fa-solid ${app.icon}"></i>
                                </div>
                                <div class="min-w-0">
                                    <span class="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-300">${app.badge}</span>
                                    <h3 class="font-black text-slate-900 dark:text-white text-base sm:text-lg group-hover:text-purple-600 transition mt-1 truncate">${app.fullName}</h3>
                                    <p class="text-[11px] sm:text-xs text-slate-500">${app.publisher} • ${app.version} • ${app.size}</p>
                                </div>
                            </div>
                            <p class="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">${app.shortDesc}</p>
                            <div class="pt-2 flex items-center justify-between text-xs font-bold text-purple-600 dark:text-purple-400">
                                <span>Get ${app.name} MOD APK Download (${app.size})</span>
                                <i class="fa-solid fa-arrow-right"></i>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Featured Developer Tools Spotlight -->
            <div class="space-y-4 sm:space-y-6">
                <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                    <div>
                        <h2 class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Featured Developer IDEs &amp; Simulators</h2>
                        <p class="text-xs text-slate-500">Browser-based IDEs with separate codespaces, MySQL sandbox, and Cisco IOS CLI</p>
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div onclick="navigateTo('tool', 'online-compiler')" class="group cursor-pointer p-5 sm:p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-sky-500/50 shadow-sm hover:shadow-md transition space-y-4">
                        <div class="flex items-center space-x-3 sm:space-x-4">
                            <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-sky-600 text-white flex items-center justify-center text-xl sm:text-2xl shadow-md shrink-0">
                                <i class="fa-solid fa-code"></i>
                            </div>
                            <div>
                                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-sky-100 text-sky-800 dark:bg-sky-900/60 dark:text-sky-300">VS Code IDE</span>
                                <h3 class="font-black text-slate-900 dark:text-white text-base sm:text-lg group-hover:text-sky-600 transition mt-1">VS Code Online IDE &amp; MySQL Database</h3>
                                <p class="text-[11px] sm:text-xs text-slate-500">13 Languages • Separate Codespaces • WASM MySQL Engine</p>
                            </div>
                        </div>
                        <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">Full Visual Studio Code web experience with Explorer sidebar, line numbers, terminal panel, in-memory per-file codespaces, and MySQL data table renderer.</p>
                        <div class="pt-2 flex items-center justify-between text-xs font-bold text-sky-600 dark:text-sky-400">
                            <span>Open VS Code IDE Codespace &rarr;</span>
                        </div>
                    </div>

                    <div onclick="navigateTo('tool', 'cisco-packet-tracer')" class="group cursor-pointer p-5 sm:p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 shadow-sm hover:shadow-md transition space-y-4">
                        <div class="flex items-center space-x-3 sm:space-x-4">
                            <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-xl sm:text-2xl shadow-md shrink-0">
                                <i class="fa-solid fa-network-wired"></i>
                            </div>
                            <div>
                                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-indigo-100 text-indigo-800 dark:bg-indigo-900/60 dark:text-indigo-300">Cisco v8.2 Pro</span>
                                <h3 class="font-black text-slate-900 dark:text-white text-base sm:text-lg group-hover:text-indigo-600 transition mt-1">Cisco Packet Tracer Online Simulator</h3>
                                <p class="text-[11px] sm:text-xs text-slate-500">Cisco IOS CLI • Routers &amp; Switches • Live ICMP Ping</p>
                            </div>
                        </div>
                        <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">Interactive Cisco Packet Tracer environment with Cisco 2911 routers, 2960 switches, PC Desktop Web Browser app, and Cisco IOS CLI command terminal.</p>
                        <div class="pt-2 flex items-center justify-between text-xs font-bold text-indigo-600 dark:text-indigo-400">
                            <span>Launch Cisco Packet Tracer Simulator &rarr;</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Featured UK ETF & Investment Tools Section -->
            <div class="space-y-4 sm:space-y-6">
                <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                    <div>
                        <div class="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300 text-[10px] font-extrabold mb-1">
                            <i class="fa-solid fa-chart-line"></i>
                            <span>High Volume &amp; Search CPC Opportunity</span>
                        </div>
                        <h2 class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">UK ETF &amp; Investment Calculators</h2>
                        <p class="text-xs text-slate-500">Calculate tax-free ISA growth, S&amp;P 500 ETF returns, HMRC £3k CGT allowances &amp; DRIP compounding</p>
                    </div>
                    <button onclick="navigateTo('tools')" class="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline self-start sm:self-auto">All Finance Tools &rarr;</button>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div onclick="navigateTo('tool', 'isa-growth-calc')" class="group cursor-pointer p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 shadow-sm hover:shadow-md transition space-y-3">
                        <div class="flex items-center justify-between">
                            <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 flex items-center justify-center text-lg">
                                <i class="fa-solid fa-piggy-bank"></i>
                            </div>
                            <span class="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">ISA £20k</span>
                        </div>
                        <div>
                            <h3 class="font-bold text-slate-900 dark:text-white text-sm group-hover:text-emerald-600 transition">Stocks &amp; Shares ISA Growth</h3>
                            <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">Tax-free wealth growth within the £20,000/year allowance vs taxable accounts.</p>
                        </div>
                    </div>

                    <div onclick="navigateTo('tool', 'etf-return-calc')" class="group cursor-pointer p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 shadow-sm hover:shadow-md transition space-y-3">
                        <div class="flex items-center justify-between">
                            <div class="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 flex items-center justify-center text-lg">
                                <i class="fa-solid fa-chart-line"></i>
                            </div>
                            <span class="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-md">GBP £</span>
                        </div>
                        <div>
                            <h3 class="font-bold text-slate-900 dark:text-white text-sm group-hover:text-blue-600 transition">S&amp;P 500 &amp; Global ETF Returns</h3>
                            <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">Model VUSA, VWRP, EQQQ, and ISF compound growth, dividends &amp; TER fees.</p>
                        </div>
                    </div>

                    <div onclick="navigateTo('tool', 'cgt-calculator')" class="group cursor-pointer p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 shadow-sm hover:shadow-md transition space-y-3">
                        <div class="flex items-center justify-between">
                            <div class="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 flex items-center justify-center text-lg">
                                <i class="fa-solid fa-sack-dollar"></i>
                            </div>
                            <span class="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-md">HMRC £3k</span>
                        </div>
                        <div>
                            <h3 class="font-bold text-slate-900 dark:text-white text-sm group-hover:text-indigo-600 transition">Capital Gains Tax Allowance</h3>
                            <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">Check CGT tax on ETF, stock, crypto and property sales using £3,000 AEA.</p>
                        </div>
                    </div>

                    <div onclick="navigateTo('tool', 'drip-calculator')" class="group cursor-pointer p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 shadow-sm hover:shadow-md transition space-y-3">
                        <div class="flex items-center justify-between">
                            <div class="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-300 flex items-center justify-center text-lg">
                                <i class="fa-solid fa-arrows-rotate"></i>
                            </div>
                            <span class="text-[10px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 px-2 py-0.5 rounded-md">DRIP</span>
                        </div>
                        <div>
                            <h3 class="font-bold text-slate-900 dark:text-white text-sm group-hover:text-teal-600 transition">DRIP Dividend Reinvestment</h3>
                            <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">See how reinvesting ETF dividends accelerates compound growth vs cash payouts.</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Featured UK Articles Grid -->
            <div class="space-y-4 sm:space-y-6">
                <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                    <div>
                        <h2 class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Featured Editorial Guides</h2>
                        <p class="text-xs text-slate-500">In-depth analysis written specifically for UK residents</p>
                    </div>
                    <button onclick="navigateTo('blogs')" class="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline self-start sm:self-auto">View All Guides &rarr;</button>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    ${safeBlogs.map(blog => typeof renderBlogCard === 'function' ? renderBlogCard(blog) : '').join('')}
                </div>
            </div>

            <!-- Everyday Utilities Grid Preview -->
            <div class="space-y-4 sm:space-y-6">
                <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                    <div>
                        <h2 class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Daily Life Tools &amp; Calculators</h2>
                        <p class="text-xs text-slate-500">${safeTools.length}+ browser-based interactive tools with dedicated in-page SEO</p>
                    </div>
                    <button onclick="navigateTo('tools')" class="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline self-start sm:self-auto">View All Tools &rarr;</button>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    ${safeTools.slice(0, 8).map(tool => typeof renderToolCard === 'function' ? renderToolCard(tool) : '').join('')}
                </div>
            </div>
        </div>
    `;
}

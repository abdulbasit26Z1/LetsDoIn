/* HOME PAGE VIEW */

function renderHomePage() {
    return `
        <div class="space-y-12">
            <!-- Hero Section -->
            <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-8 sm:p-12 shadow-2xl border border-slate-800">
                <div class="relative z-10 max-w-3xl space-y-4">
                    <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold">
                        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        <span>UK Editorial & Daily Utility Platform</span>
                    </div>
                    <h1 class="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                        British Financial Clarity & <span class="uk-gradient-text">20+ Daily Life Utilities</span>
                    </h1>
                    <p class="text-slate-300 text-sm sm:text-base leading-relaxed">
                        Authoritative British editorial insight on personal finance, HMRC tax bands, Ofgem energy price tariffs, combined with browser-based privacy-first tools for daily life in Great Britain.
                    </p>
                    <div class="flex flex-wrap gap-3 pt-2">
                        <button onclick="navigateTo('tools')" class="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm shadow-lg transition flex items-center">
                            <i class="fa-solid fa-calculator mr-2"></i> Explore ${TOOLS.length}+ Daily Life Tools
                        </button>
                        <button onclick="navigateTo('app', 'capcut-mod-apk')" class="px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs sm:text-sm shadow-lg transition flex items-center">
                            <i class="fa-solid fa-mobile-screen-button mr-2"></i> CapCut MOD APK v19.7.0
                        </button>
                        <button onclick="navigateTo('blogs')" class="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 transition flex items-center">
                            <i class="fa-solid fa-newspaper mr-2"></i> Read UK Guides
                        </button>
                    </div>
                </div>
            </div>

            <!-- Featured CapCut MOD & Mobile Apps Section -->
            <div class="space-y-6">
                <div class="flex justify-between items-end">
                    <div>
                        <h2 class="text-2xl font-bold text-slate-900 dark:text-white">Featured Mobile Apps & MODs</h2>
                        <p class="text-xs text-slate-500">Unlocked mobile video editors and utility APK downloads</p>
                    </div>
                    <button onclick="navigateTo('apps')" class="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline">View All Apps &rarr;</button>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    ${APPS.map(app => `
                        <div onclick="navigateTo('app', '${app.id}')" class="group cursor-pointer p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-purple-500/50 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4">
                            <div class="flex items-center space-x-4">
                                <div class="w-14 h-14 rounded-2xl bg-gradient-to-tr ${app.color} text-white flex items-center justify-center text-2xl shadow-md shrink-0">
                                    <i class="fa-solid ${app.icon}"></i>
                                </div>
                                <div class="min-w-0">
                                    <span class="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-300">${app.badge}</span>
                                    <h3 class="font-black text-slate-900 dark:text-white text-lg group-hover:text-purple-600 transition mt-1 truncate">${app.fullName}</h3>
                                    <p class="text-xs text-slate-500">${app.publisher} • ${app.version} • ${app.size}</p>
                                </div>
                            </div>
                            <p class="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">${app.shortDesc}</p>
                            <div class="pt-2 flex items-center justify-between text-xs font-bold text-purple-600 dark:text-purple-400">
                                <span>Get CapCut MOD APK Download (${app.size})</span>
                                <i class="fa-solid fa-arrow-right"></i>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Featured UK Articles Grid -->
            <div class="space-y-6">
                <div class="flex justify-between items-end">
                    <div>
                        <h2 class="text-2xl font-bold text-slate-900 dark:text-white">Featured Editorial Guides</h2>
                        <p class="text-xs text-slate-500">In-depth analysis written specifically for UK residents</p>
                    </div>
                    <button onclick="navigateTo('blogs')" class="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline">View All Guides &rarr;</button>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    ${BLOGS.map(blog => renderBlogCard(blog)).join('')}
                </div>
            </div>

            <!-- Everyday Utilities Grid Preview -->
            <div class="space-y-6">
                <div class="flex justify-between items-end">
                    <div>
                        <h2 class="text-2xl font-bold text-slate-900 dark:text-white">Daily Life Tools & Calculators</h2>
                        <p class="text-xs text-slate-500">${TOOLS.length}+ browser-based interactive tools with dedicated in-page SEO</p>
                    </div>
                    <button onclick="navigateTo('tools')" class="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline">View All Tools &rarr;</button>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    ${TOOLS.slice(0, 8).map(tool => renderToolCard(tool)).join('')}
                </div>
            </div>
        </div>
    `;
}

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
                        <button onclick="navigateTo('blogs')" class="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 transition flex items-center">
                            <i class="fa-solid fa-newspaper mr-2"></i> Read UK Guides
                        </button>
                    </div>
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

/* APPS & MODS PAGE VIEWS */

function renderAppsPage() {
    return `
        <div class="space-y-6 max-w-6xl mx-auto">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 class="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center">
                        <i class="fa-solid fa-mobile-screen-button text-purple-600 mr-3"></i> Premium Apps & MOD Downloads
                    </h1>
                    <p class="text-sm text-slate-500 mt-1">Free modified Android applications with unlocked Pro & VIP features, watermark removers, and ad-free experience.</p>
                </div>
                <input type="text" id="app-hub-search" onkeyup="filterAppsHubList()" placeholder="Search apps (e.g., CapCut, VideoShow, AI)..." class="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm w-full md:w-72 focus:ring-2 focus:ring-indigo-500 outline-none">
            </div>

            <!-- Featured Apps Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="apps-hub-grid">
                ${APPS.map(app => renderAppCard(app)).join('')}
                ${RELATED_APPS.map(rel => `
                    <div onclick="openDownloadModal('${rel.id}')" class="group cursor-pointer p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-purple-500/50 shadow-sm hover:shadow-md transition space-y-3">
                        <div class="flex items-center justify-between">
                            <div class="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/50 text-purple-600 flex items-center justify-center text-xl overflow-hidden shrink-0">
                                <img src="${rel.image}" alt="${rel.name}" class="w-full h-full object-cover">
                            </div>
                            <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-300">${rel.modBadge}</span>
                        </div>
                        <div>
                            <h3 class="font-bold text-slate-900 dark:text-white text-sm group-hover:text-purple-600 transition">${rel.fullName} MOD APK</h3>
                            <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">Version ${rel.version} • ${rel.size} • ${rel.category}</p>
                        </div>
                        <div class="pt-2 text-xs font-semibold text-purple-600 dark:text-purple-400 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                            <span>Download MOD</span>
                            <i class="fa-solid fa-download"></i>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function renderAppCard(app) {
    return `
        <div onclick="navigateTo('app', '${app.id}')" class="group cursor-pointer p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 shadow-sm hover:shadow-md transition space-y-4 flex flex-col justify-between">
            <div class="space-y-3">
                <div class="flex items-start justify-between">
                    <div class="w-14 h-14 rounded-2xl bg-gradient-to-tr ${app.color} text-white flex items-center justify-center text-2xl shadow-md shrink-0">
                        <i class="fa-solid ${app.icon}"></i>
                    </div>
                    <span class="px-2.5 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300">${app.badge}</span>
                </div>
                <div>
                    <span class="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">${app.category}</span>
                    <h3 class="font-extrabold text-slate-900 dark:text-white text-base group-hover:text-indigo-600 transition leading-snug">${app.fullName}</h3>
                </div>
                <p class="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">${app.shortDesc}</p>
            </div>
            <div class="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-indigo-600 dark:text-indigo-400">
                <span>View Full App Details & Download</span>
                <i class="fa-solid fa-arrow-right"></i>
            </div>
        </div>
    `;
}

function renderSingleAppPage(id) {
    const app = APPS.find(a => a.id === id) || APPS[0];

    // Trigger comment list render after DOM insertion
    setTimeout(() => {
        renderCapCutComments();
    }, 50);

    return `
        <div class="space-y-8 max-w-6xl mx-auto">
            <!-- Top Search & Partner Header Bar -->
            <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                <div class="flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div class="flex items-center space-x-3 w-full sm:w-auto">
                        <div class="w-9 h-9 rounded-xl bg-gradient-to-r from-red-600 via-purple-600 to-indigo-600 flex items-center justify-center text-white font-black text-sm shadow shrink-0">
                            GM
                        </div>
                        <span class="font-bold text-sm text-slate-900 dark:text-white tracking-tight">GETMODAPK <span class="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">Partner Hub</span></span>
                    </div>
                    <div class="relative w-full sm:w-80">
                        <input type="text" id="app-search-input" onkeyup="searchSiteContent()" placeholder="Search apps, games, and more..." class="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:ring-2 focus:ring-indigo-500 outline-none text-slate-800 dark:text-slate-100">
                        <i class="fa-solid fa-magnifying-glass absolute left-3 top-2.5 text-slate-400 text-xs"></i>
                    </div>
                </div>

                <!-- Recent Searches & Pill Navigation -->
                <div class="flex items-center space-x-2 text-xs overflow-x-auto pb-1 text-slate-600 dark:text-slate-400">
                    <span class="font-bold text-slate-500 text-[11px] uppercase tracking-wider shrink-0">Recent Searches:</span>
                    <button onclick="navigateTo('app', 'capcut-mod-apk')" class="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-300 text-xs font-medium whitespace-nowrap">CapCut MOD APK</button>
                    <button onclick="navigateTo('home')" class="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-medium whitespace-nowrap">Home</button>
                    <button onclick="navigateTo('apps')" class="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-medium whitespace-nowrap">Games & Apps</button>
                    <button onclick="navigateTo('blogs')" class="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-medium whitespace-nowrap">Blog & Guides</button>
                </div>
            </div>

            <!-- Breadcrumb Navigation -->
            <div class="text-xs text-slate-500 flex items-center space-x-2">
                <a href="javascript:void(0)" onclick="navigateTo('home')" class="hover:underline">Home</a>
                <span>/</span>
                <a href="javascript:void(0)" onclick="navigateTo('apps')" class="hover:underline">Apps</a>
                <span>/</span>
                <a href="javascript:void(0)" onclick="navigateTo('apps')" class="hover:underline">Video Players</a>
                <span>/</span>
                <span class="text-slate-800 dark:text-slate-200 font-semibold truncate">${app.fullName}</span>
            </div>

            <!-- Main Showcase Hero Card -->
            <div class="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-slate-100 dark:border-slate-800 pb-6">
                    <div class="flex items-center space-x-5">
                        <div class="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr ${app.color} text-white flex items-center justify-center text-4xl shadow-xl shrink-0">
                            <i class="fa-solid ${app.icon}"></i>
                        </div>
                        <div class="space-y-1">
                            <div class="flex flex-wrap items-center gap-2">
                                <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-100 text-indigo-800 dark:bg-indigo-900/60 dark:text-indigo-300 uppercase">${app.category}</span>
                                <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300 flex items-center"><i class="fa-solid fa-shield-halved mr-1"></i> ${app.badge}</span>
                            </div>
                            <h1 class="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">${app.fullName}</h1>
                            <div class="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-1">
                                <span><i class="fa-solid fa-tag mr-1 text-indigo-500"></i> ${app.version}</span>
                                <span>•</span>
                                <span><i class="fa-solid fa-calendar mr-1 text-indigo-500"></i> ${app.lastUpdated}</span>
                                <span>•</span>
                                <span class="text-amber-500 font-bold flex items-center"><i class="fa-solid fa-star mr-1"></i> ${app.rating} (${app.votes.toLocaleString()} votes)</span>
                                <span>•</span>
                                <span class="text-emerald-600 font-bold"><i class="fa-solid fa-thumbs-up mr-1"></i> ${app.satisfactionPct} Satisfaction</span>
                            </div>
                        </div>
                    </div>

                    <!-- Direct Download Button CTA -->
                    <div class="w-full md:w-auto flex flex-col items-stretch md:items-end space-y-2 shrink-0">
                        <button onclick="openDownloadModal('${app.id}')" class="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-extrabold text-base shadow-xl hover:shadow-2xl transition transform hover:-translate-y-0.5 flex items-center justify-center space-x-2">
                            <i class="fa-solid fa-download text-xl"></i>
                            <span>Download CapCut MOD APK</span>
                        </button>
                        <p class="text-[11px] text-slate-400 text-center md:text-right"><i class="fa-solid fa-check-double text-emerald-500 mr-1"></i> Fast Download Server • Direct APK File (${app.size})</p>
                    </div>
                </div>

                <!-- Short Summary Box -->
                <p class="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/60">
                    ${app.shortDesc}
                </p>

                <!-- App Details Grid / Metadata -->
                <div>
                    <h3 class="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider mb-3 flex items-center">
                        <i class="fa-solid fa-circle-info text-indigo-500 mr-2"></i> App Specifications & Info
                    </h3>
                    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs">
                        <div class="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                            <span class="text-slate-400 block text-[10px] uppercase font-bold">App Name</span>
                            <span class="font-bold text-slate-800 dark:text-slate-200 mt-0.5 block">${app.name}</span>
                        </div>
                        <div class="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                            <span class="text-slate-400 block text-[10px] uppercase font-bold">Version</span>
                            <span class="font-bold text-slate-800 dark:text-slate-200 mt-0.5 block">${app.version}</span>
                        </div>
                        <div class="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                            <span class="text-slate-400 block text-[10px] uppercase font-bold">Last Updated</span>
                            <span class="font-bold text-slate-800 dark:text-slate-200 mt-0.5 block">${app.lastUpdated}</span>
                        </div>
                        <div class="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                            <span class="text-slate-400 block text-[10px] uppercase font-bold">Publisher</span>
                            <span class="font-bold text-slate-800 dark:text-slate-200 mt-0.5 block truncate">${app.publisher}</span>
                        </div>
                        <div class="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                            <span class="text-slate-400 block text-[10px] uppercase font-bold">Requirements</span>
                            <span class="font-bold text-slate-800 dark:text-slate-200 mt-0.5 block">${app.requirements}</span>
                        </div>
                        <div class="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                            <span class="text-slate-400 block text-[10px] uppercase font-bold">Category</span>
                            <span class="font-bold text-slate-800 dark:text-slate-200 mt-0.5 block">${app.category}</span>
                        </div>
                        <div class="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                            <span class="text-slate-400 block text-[10px] uppercase font-bold">Size</span>
                            <span class="font-bold text-slate-800 dark:text-slate-200 mt-0.5 block">${app.size}</span>
                        </div>
                        <div class="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                            <span class="text-slate-400 block text-[10px] uppercase font-bold">Platform</span>
                            <span class="font-bold text-slate-800 dark:text-slate-200 mt-0.5 block">${app.platform}</span>
                        </div>
                        <div class="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                            <span class="text-slate-400 block text-[10px] uppercase font-bold">Price</span>
                            <span class="font-bold text-emerald-600 mt-0.5 block">${app.price}</span>
                        </div>
                        <div class="p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800">
                            <span class="text-indigo-600 dark:text-indigo-400 block text-[10px] uppercase font-bold">MOD Info</span>
                            <span class="font-extrabold text-indigo-700 dark:text-indigo-300 mt-0.5 block">${app.badge}</span>
                        </div>
                    </div>
                </div>

                <!-- Screenshots Gallery Carousel / Grid -->
                <div>
                    <h3 class="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider mb-3 flex items-center justify-between">
                        <span class="flex items-center"><i class="fa-solid fa-images text-indigo-500 mr-2"></i> CapCut Screenshots (7 Screens)</span>
                        <span class="text-xs text-slate-400 font-normal">Click any screenshot to zoom</span>
                    </h3>
                    <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                        ${app.screenshots.map(s => `
                            <div onclick="openScreenshotModal('${s.url}', '${s.title}')" class="group cursor-pointer rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 aspect-[9/16] bg-slate-100 dark:bg-slate-800 relative shadow-sm hover:shadow-md transition">
                                <img src="${s.url}" alt="${s.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300">
                                <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white">
                                    <i class="fa-solid fa-magnifying-glass-plus text-lg"></i>
                                </div>
                                <div class="absolute bottom-0 inset-x-0 bg-slate-900/80 p-1 text-[10px] text-center text-white truncate">
                                    Screenshot ${s.id}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>

            <!-- Main Layout Grid (Table of Contents Sidebar + Full Detailed Article Content) -->
            <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <!-- Sidebar Table of Contents -->
                <div class="lg:col-span-1 space-y-6">
                    <div class="sticky top-24 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                        <h4 class="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center">
                            <i class="fa-solid fa-list-check text-indigo-500 mr-2"></i> Table of Contents
                        </h4>
                        <nav class="space-y-2 text-xs">
                            <a href="#intro" class="block text-slate-600 dark:text-slate-400 hover:text-indigo-600 transition">Introduction</a>
                            <a href="#capcut-details" class="block text-slate-600 dark:text-slate-400 hover:text-indigo-600 transition">1. What is CapCut App?</a>
                            <a href="#core-features" class="block text-slate-600 dark:text-slate-400 hover:text-indigo-600 transition">2. Core Editing Features</a>
                            <a href="#mod-mode-explained" class="block text-slate-600 dark:text-slate-400 hover:text-indigo-600 transition">3. What is MOD / Pro Mode?</a>
                            <a href="#comparison-table" class="block text-slate-600 dark:text-slate-400 hover:text-indigo-600 transition">4. Free vs Pro vs MOD Table</a>
                            <a href="#mod-privileges" class="block text-slate-600 dark:text-slate-400 hover:text-indigo-600 transition">5. Full MOD Privileges</a>
                            <a href="#overlay-editor" class="block text-slate-600 dark:text-slate-400 hover:text-indigo-600 transition">6. Video Photo Overlay</a>
                            <a href="#watermark-removal" class="block text-slate-600 dark:text-slate-400 hover:text-indigo-600 transition">7. No Watermark & Ad-Free</a>
                            <a href="#install-guide" class="block text-slate-600 dark:text-slate-400 hover:text-indigo-600 transition">8. Installation & Safety</a>
                            <a href="#verdict" class="block text-slate-600 dark:text-slate-400 hover:text-indigo-600 transition">Final Verdict</a>
                            <a href="#related-posts" class="block text-slate-600 dark:text-slate-400 hover:text-indigo-600 transition">Related MOD Apps</a>
                            <a href="#comments-section" class="block text-slate-600 dark:text-slate-400 hover:text-indigo-600 transition">User Comments</a>
                        </nav>

                        <div class="pt-4 border-t border-slate-200 dark:border-slate-800">
                            <button onclick="openDownloadModal('${app.id}')" class="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow transition flex items-center justify-center">
                                <i class="fa-solid fa-download mr-1.5"></i> Download APK (${app.size})
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Main Body Article Text -->
                <article class="lg:col-span-3 space-y-8 bg-white dark:bg-slate-900 p-6 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">

                    <!-- Intro Section -->
                    <div id="intro" class="space-y-4">
                        <h2 class="text-2xl font-black text-slate-900 dark:text-white border-b pb-3 border-slate-200 dark:border-slate-800 flex items-center">
                            <i class="fa-solid fa-circle-play text-indigo-500 mr-2 text-xl"></i> Introduction
                        </h2>
                        <p class="leading-relaxed text-slate-700 dark:text-slate-300">
                            Do You know the reason why we all love capturing photos and videos on every trip and meeting new friends? No, It's not for making others feel jealous, but it basically stands for creating some never-ending memories. We'll all die one day, but these memories will be there every day, providing our son and daughter our advice. Well, That's all the piece of knowledge I wanted to share with you, but apart from that, I've something incredible for you today, i.e., <strong>CapCut MOD APK</strong>. If You're a professional video editor and a video-photo overlay lover, you must have heard the name of this superior Android video editing protocol, named CapCut. According to the developers, the CapCut Android app is developed for all the professional artists who don't have much time to use Laptops and Personal Computers to use exceptional apps like Wondershare Filmora and create the best edits. You can elsewhere download the CapCut app and enjoy free professional editing on your Android smartphone. Additionally, Suppose You're new to this video editing era, or even a professionalist, wandering for the free premium subscription of CapCut APK. In that case, You can download CapCut MOD APK through the below download link. Again, CapCut MOD APK is also an incredible software to Edit Photos and Videos, with the only alteration named free premium subscription within the same interface. Must try it first, and you'll literally get amazed!
                        </p>
                    </div>

                    <!-- Detailed App Section 1 -->
                    <div id="capcut-details" class="space-y-4 pt-4">
                        <h2 class="text-xl font-bold text-slate-900 dark:text-white border-b pb-2 border-slate-200 dark:border-slate-800 flex items-center">
                            <i class="fa-solid fa-laptop-code text-indigo-500 mr-2"></i> 1. Full Details of CapCut App (What is CapCut?)
                        </h2>
                        <p class="leading-relaxed text-slate-700 dark:text-slate-300">
                            <strong>CapCut</strong> (originally known as Viamaker) is an all-in-one professional mobile video editing application developed by Bytedance Pte. Ltd. (the tech giant behind TikTok). Designed specifically to bridge the gap between simple mobile phone clips and high-end desktop video editing suites like Adobe Premiere Pro and Wondershare Filmora, CapCut has grown into the world's #1 video editor for smartphones with over 500 million active users.
                        </p>
                        <p class="leading-relaxed text-slate-700 dark:text-slate-300">
                            The application empowers content creators, YouTube YouTubers, TikTokers, Instagram Influencers, and digital marketers to produce studio-grade 4K videos directly from their Android devices. Unlike standard mobile video editors that offer rigid preset trims, CapCut features a non-linear multi-track editing timeline, precision frame trimming, advanced color grading, AI auto-captions, keyframe animation physics, and speed velocity curves.
                        </p>
                    </div>

                    <!-- Core Features Section -->
                    <div id="core-features" class="space-y-4 pt-4">
                        <h2 class="text-xl font-bold text-slate-900 dark:text-white border-b pb-2 border-slate-200 dark:border-slate-800">
                            2. Core Editing Capabilities & Tools Inside CapCut
                        </h2>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-2">
                                <h3 class="font-extrabold text-sm text-indigo-600 dark:text-indigo-400 flex items-center">
                                    <i class="fa-solid fa-layer-group mr-2"></i> Multi-Track Timeline
                                </h3>
                                <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Combine multiple layers of video clips, photo overlays, audio tracks, text titles, and adjustment layers on a single multi-layer timeline interface.
                                </p>
                            </div>
                            <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-2">
                                <h3 class="font-extrabold text-sm text-indigo-600 dark:text-indigo-400 flex items-center">
                                    <i class="fa-solid fa-gauge-high mr-2"></i> Speed Velocity Curves
                                </h3>
                                <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Create smooth speed ramps (Fast-to-Slow motion transitions) and Optical Flow smooth slow-motion effects up to 0.1x frame rate.
                                </p>
                            </div>
                            <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-2">
                                <h3 class="font-extrabold text-sm text-indigo-600 dark:text-indigo-400 flex items-center">
                                    <i class="fa-solid fa-wand-magic-sparkles mr-2"></i> AI Auto-Captions & Subtitles
                                </h3>
                                <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Speech-to-text recognition automatically generates animated subtitles in 30+ languages with synchronized text templates and lyrics.
                                </p>
                            </div>
                            <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-2">
                                <h3 class="font-extrabold text-sm text-indigo-600 dark:text-indigo-400 flex items-center">
                                    <i class="fa-solid fa-scissors mr-2"></i> AI Background Cutout & Chroma Key
                                </h3>
                                <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Remove background from video subjects automatically without green screens or use advanced Chroma Key green screen color removal.
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- What is MOD Mode Section -->
                    <div id="mod-mode-explained" class="space-y-4 pt-4">
                        <h2 class="text-xl font-bold text-slate-900 dark:text-white border-b pb-2 border-slate-200 dark:border-slate-800 flex items-center">
                            <i class="fa-solid fa-unlock-keyhole text-emerald-500 mr-2"></i> 3. What is MOD Mode & Pro Unlocked?
                        </h2>
                        <p class="leading-relaxed text-slate-700 dark:text-slate-300">
                            <strong>MOD Mode (Modified APK)</strong> refers to the customized version of CapCut where all paid <strong>CapCut Pro Subscription</strong> features have been unlocked directly in the code structure. In the standard official version of CapCut downloaded from Google Play Store, thousands of premium filters, 3D text effects, body retouch tools, 4K export presets, and exclusive transitions are locked behind a paid monthly subscription (CapCut Pro).
                        </p>
                        <p class="leading-relaxed text-slate-700 dark:text-slate-300">
                            When you run <strong>CapCut MOD APK (MOD Mode)</strong>, the app unlocks all Pro assets, removes all brand watermarks from your final video exports, disables online advertisements, and allows unrestricted 4K 60FPS high-bitrate rendering completely free of charge.
                        </p>
                    </div>

                    <!-- Feature Comparison Table -->
                    <div id="comparison-table" class="space-y-4 pt-4">
                        <h2 class="text-xl font-bold text-slate-900 dark:text-white border-b pb-2 border-slate-200 dark:border-slate-800">
                            4. Side-by-Side Comparison: Official Free vs Pro vs MOD APK
                        </h2>
                        <div class="overflow-x-auto">
                            <table class="w-full text-left text-xs border-collapse border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
                                <thead class="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold">
                                    <tr>
                                        <th class="p-3 border border-slate-200 dark:border-slate-700">Feature</th>
                                        <th class="p-3 border border-slate-200 dark:border-slate-700">Official Free Version</th>
                                        <th class="p-3 border border-slate-200 dark:border-slate-700">CapCut Pro (Paid)</th>
                                        <th class="p-3 border border-slate-200 dark:border-slate-700 text-purple-600 dark:text-purple-400 font-extrabold">CapCut MOD APK (MOD Mode)</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-slate-200 dark:divide-slate-700 text-slate-700 dark:text-slate-300">
                                    <tr>
                                        <td class="p-3 font-semibold">Subscription Cost</td>
                                        <td class="p-3 text-slate-500">Free (Limited)</td>
                                        <td class="p-3 text-amber-600 font-bold">~$7.99 / month</td>
                                        <td class="p-3 text-emerald-600 font-extrabold">100% Free Forever</td>
                                    </tr>
                                    <tr>
                                        <td class="p-3 font-semibold">Watermark Removal</td>
                                        <td class="p-3 text-red-500 font-medium">End clip added</td>
                                        <td class="p-3 text-emerald-600">Removed</td>
                                        <td class="p-3 text-emerald-600 font-bold">100% Auto-Removed</td>
                                    </tr>
                                    <tr>
                                        <td class="p-3 font-semibold">VIP Filters & Effects (1000+)</td>
                                        <td class="p-3 text-slate-400"><i class="fa-solid fa-lock text-red-400"></i> Locked</td>
                                        <td class="p-3 text-emerald-600">Unlocked</td>
                                        <td class="p-3 text-emerald-600 font-bold"><i class="fa-solid fa-lock-open text-emerald-500 mr-1"></i> Fully Unlocked</td>
                                    </tr>
                                    <tr>
                                        <td class="p-3 font-semibold">Ad-Free Experience</td>
                                        <td class="p-3 text-red-500 font-medium">Banner & Popup Ads</td>
                                        <td class="p-3 text-emerald-600">No Ads</td>
                                        <td class="p-3 text-emerald-600 font-bold">100% Ad-Free</td>
                                    </tr>
                                    <tr>
                                        <td class="p-3 font-semibold">4K 60FPS High-Bitrate Export</td>
                                        <td class="p-3 text-slate-400">Compressed</td>
                                        <td class="p-3 text-emerald-600">Full Quality</td>
                                        <td class="p-3 text-emerald-600 font-bold">Full 4K Ultra HD 60FPS</td>
                                    </tr>
                                    <tr>
                                        <td class="p-3 font-semibold">AI Background & Body Effects</td>
                                        <td class="p-3 text-slate-400">Basic</td>
                                        <td class="p-3 text-emerald-600">Pro Unlocked</td>
                                        <td class="p-3 text-emerald-600 font-bold">All AI Tools Unlocked</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Detailed MOD Privileges -->
                    <div id="mod-privileges" class="space-y-4 pt-4">
                        <h2 class="text-xl font-bold text-slate-900 dark:text-white border-b pb-2 border-slate-200 dark:border-slate-800">
                            5. Deep Breakdown of Unlocked MOD Mode Privileges
                        </h2>
                        <ul class="space-y-3 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                            <li class="p-4 rounded-2xl bg-indigo-50/60 dark:bg-slate-800/60 border border-indigo-100 dark:border-slate-700/60 flex items-start space-x-3">
                                <i class="fa-solid fa-crown text-amber-500 text-lg mt-0.5 shrink-0"></i>
                                <div>
                                    <strong class="text-sm font-bold text-slate-900 dark:text-white block">Free Pro Subscription Access</strong>
                                    Enjoy full Pro membership perks inside CapCut without logging into paid accounts or entering credit card details.
                                </div>
                            </li>
                            <li class="p-4 rounded-2xl bg-emerald-50/60 dark:bg-slate-800/60 border border-emerald-100 dark:border-slate-700/60 flex items-start space-x-3">
                                <i class="fa-solid fa-ban text-emerald-500 text-lg mt-0.5 shrink-0"></i>
                                <div>
                                    <strong class="text-sm font-bold text-slate-900 dark:text-white block">No Sticky Watermarks</strong>
                                    All exported videos are generated without the CapCut end watermark logo, maintaining professional presentation for social media publishing.
                                </div>
                            </li>
                            <li class="p-4 rounded-2xl bg-purple-50/60 dark:bg-slate-800/60 border border-purple-100 dark:border-slate-700/60 flex items-start space-x-3">
                                <i class="fa-solid fa-rectangle-ad text-purple-500 text-lg mt-0.5 shrink-0"></i>
                                <div>
                                    <strong class="text-sm font-bold text-slate-900 dark:text-white block">Zero Ad-Interruption</strong>
                                    Clean editing workflow with all online banner ads and interstitial popups removed.
                                </div>
                            </li>
                            <li class="p-4 rounded-2xl bg-blue-50/60 dark:bg-slate-800/60 border border-blue-100 dark:border-slate-700/60 flex items-start space-x-3">
                                <i class="fa-solid fa-photo-film text-blue-500 text-lg mt-0.5 shrink-0"></i>
                                <div>
                                    <strong class="text-sm font-bold text-slate-900 dark:text-white block">500+ Filters, 600+ Stickers & 1000+ Effects</strong>
                                    Gain unrestricted access to CapCut's vast online creative library containing trending TikTok templates, 3D text effects, glitches, lens flares, and funny stickers.
                                </div>
                            </li>
                        </ul>
                    </div>

                    <!-- Overlay Editor Section -->
                    <div id="overlay-editor" class="space-y-4 pt-4">
                        <h2 class="text-xl font-bold text-slate-900 dark:text-white border-b pb-2 border-slate-200 dark:border-slate-800">
                            6. Video & Photo Overlay Protocol Explained
                        </h2>
                        <p class="leading-relaxed text-slate-700 dark:text-slate-300">
                            The <strong>Video Overlay Protocol (Picture-in-Picture / PIP)</strong> is one of CapCut MOD APK's most powerful features. It allows you to overlay photos, graphics, or secondary video tracks on top of your primary background track with pinpoint alignment.
                        </p>
                        <p class="leading-relaxed text-slate-700 dark:text-slate-300">
                            By combining overlay tracks with CapCut's blend modes (Multiply, Screen, Darken, Overlay, Burn), mask shapes (Circle, Rectangle, Filmstrip), and keyframe animation, you can create professional split-screen reaction videos, cinematic double exposure edits, and multi-layer photo-video collages.
                        </p>
                    </div>

                    <!-- Watermark & Ads Section -->
                    <div id="watermark-removal" class="space-y-4 pt-4">
                        <h2 class="text-xl font-bold text-slate-900 dark:text-white border-b pb-2 border-slate-200 dark:border-slate-800">
                            7. Watermark Removal & Ad-Free Editing Experience
                        </h2>
                        <p class="leading-relaxed text-slate-700 dark:text-slate-300">
                            Watermarks steal professionalism from edited videos. In standard video editing software, removing watermarks requires monthly payments. CapCut MOD APK features automated watermark suppression: when you render and export your finished project, the final video file is saved cleanly to your device storage without any CapCut logo or trailing promotional clip.
                        </p>
                    </div>

                    <!-- Installation & Safety Guide -->
                    <div id="install-guide" class="space-y-4 pt-4 p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                        <h2 class="text-xl font-bold text-slate-900 dark:text-white flex items-center">
                            <i class="fa-solid fa-download text-emerald-500 mr-2"></i> 8. How to Install CapCut MOD APK Step-by-Step
                        </h2>
                        <ol class="list-decimal pl-5 space-y-2 text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                            <li><strong>Enable Unknown Sources:</strong> Go to your Android phone's <em>Settings &rarr; Security / Apps &rarr; Install Unknown Apps</em> and grant permission for your browser.</li>
                            <li><strong>Download APK File:</strong> Click the green <strong>Download CapCut MOD APK</strong> button above to fetch the `CapCut-v19.7.0-MOD-ProUnlocked.apk` file (183 MB).</li>
                            <li><strong>Install APK:</strong> Open your device Download manager or File Explorer, tap the downloaded APK, and press <strong>Install</strong>.</li>
                            <li><strong>Launch & Enjoy:</strong> Open CapCut and enjoy 100% Pro Unlocked editing without watermarks or ads!</li>
                        </ol>
                        <div class="pt-2 flex items-center space-x-2 text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
                            <i class="fa-solid fa-shield-virus text-base"></i>
                            <span>Scanned with VirusTotal (0/64 Detections) • Safe, Anti-Ban Protected & Root Not Required</span>
                        </div>
                    </div>

                    <!-- Final Verdict -->
                    <div id="verdict" class="space-y-4 pt-4 p-6 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800">
                        <h2 class="text-xl font-black text-indigo-900 dark:text-indigo-200 flex items-center">
                            <i class="fa-solid fa-flag-checkered mr-2 text-indigo-600"></i> Final Verdict
                        </h2>
                        <p class="leading-relaxed text-slate-700 dark:text-slate-300">
                            Ultimately, You're now ready to download the free premium version of our CapCut Android app. Forget all those free simplistic effects and make friends with the trendy premium filters and most astonishing effects as the CapCut MOD APK delivers you all that stuff without charging a single dollar. We only need you to make a simple struggle by hitting the below download link and downloading CapCut MOD APK! Enjoy it!!
                        </p>
                        <div class="pt-2">
                            <button onclick="openDownloadModal('${app.id}')" class="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-lg transition">
                                <i class="fa-solid fa-download mr-2"></i> Download CapCut MOD APK v19.7.0 Now
                            </button>
                        </div>
                    </div>

                    <!-- Related Posts Grid -->
                    <div id="related-posts" class="space-y-4 pt-8 border-t border-slate-200 dark:border-slate-800">
                        <div class="flex items-center justify-between">
                            <h3 class="text-lg font-bold text-slate-900 dark:text-white flex items-center">
                                <i class="fa-solid fa-layer-group text-indigo-500 mr-2"></i> Related Posts & MOD Apps
                            </h3>
                            <span class="text-xs text-slate-400">9 Apps Available</span>
                        </div>
                        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            ${RELATED_APPS.map(rel => `
                                <div onclick="openDownloadModal('${rel.id}')" class="group cursor-pointer p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/60 hover:border-indigo-500/50 transition flex items-center space-x-3 shadow-sm hover:shadow-md">
                                    <div class="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-slate-200 dark:bg-slate-700">
                                        <img src="${rel.image}" alt="${rel.name}" class="w-full h-full object-cover group-hover:scale-105 transition">
                                    </div>
                                    <div class="overflow-hidden space-y-0.5">
                                        <div class="flex items-center space-x-1">
                                            <span class="text-[10px] font-bold px-1.5 py-0.2 bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-300 rounded">${rel.modBadge}</span>
                                        </div>
                                        <h4 class="font-bold text-xs text-slate-900 dark:text-white truncate group-hover:text-indigo-600 transition">${rel.name}</h4>
                                        <div class="text-[11px] text-slate-400 flex items-center space-x-2">
                                            <span>${rel.category}</span>
                                            <span>•</span>
                                            <span>${rel.size}</span>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Comments Section -->
                    <div id="comments-section" class="space-y-6 pt-8 border-t border-slate-200 dark:border-slate-800">
                        <div class="flex items-center justify-between">
                            <h3 id="capcut-comments-count" class="text-lg font-bold text-slate-900 dark:text-white flex items-center">
                                <i class="fa-solid fa-comments text-indigo-500 mr-2"></i> Comments (0)
                            </h3>
                            <span class="text-xs text-slate-400">Share your feedback</span>
                        </div>

                        <!-- Comment Submission Form -->
                        <form onsubmit="postCapCutComment(event)" class="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 space-y-4">
                            <h4 class="text-xs font-bold uppercase text-slate-700 dark:text-slate-300">Leave a Comment</h4>
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Your Name *</label>
                                    <input type="text" id="comment-name" required placeholder="Enter your name" class="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs focus:ring-2 focus:ring-indigo-500 outline-none text-slate-800 dark:text-slate-100">
                                </div>
                                <div>
                                    <label class="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Your Email *</label>
                                    <input type="email" id="comment-email" required placeholder="Enter your email" class="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs focus:ring-2 focus:ring-indigo-500 outline-none text-slate-800 dark:text-slate-100">
                                </div>
                            </div>
                            <div>
                                <label class="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Write your comment... *</label>
                                <textarea id="comment-text" required rows="3" placeholder="Share your experience with CapCut MOD APK..." class="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs focus:ring-2 focus:ring-indigo-500 outline-none text-slate-800 dark:text-slate-100"></textarea>
                            </div>
                            <button type="submit" class="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow transition">
                                <i class="fa-solid fa-paper-plane mr-1.5"></i> Post Comment
                            </button>
                        </form>

                        <!-- Comments List -->
                        <div id="capcut-comments-list" class="space-y-3">
                            <!-- Populated dynamically -->
                        </div>
                    </div>

                </article>
            </div>
        </div>
    `;
}

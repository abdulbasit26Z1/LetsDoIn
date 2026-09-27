/* APPS HUB PAGE VIEW */

function renderAppsPage() {
    return `
        <div class="space-y-6">
            <div>
                <h1 class="text-3xl font-extrabold text-slate-900 dark:text-white">Featured Apps & MODs</h1>
                <p class="text-sm text-slate-500 mt-1">Direct safe downloads for unlocked utility & creative mobile applications.</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                ${APPS.map(app => `
                    <div onclick="navigateTo('app', '${app.id}')" class="group cursor-pointer p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-purple-500/50 shadow-sm hover:shadow-md transition space-y-4">
                        <div class="flex items-center space-x-4">
                            <div class="w-14 h-14 rounded-2xl bg-gradient-to-tr ${app.color} text-white flex items-center justify-center text-2xl shadow-md">
                                <i class="fa-solid ${app.icon}"></i>
                            </div>
                            <div>
                                <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-300">${app.badge}</span>
                                <h3 class="font-extrabold text-slate-900 dark:text-white text-lg group-hover:text-purple-600 transition mt-0.5">${app.name}</h3>
                                <p class="text-xs text-slate-500">${app.version} • ${app.size}</p>
                            </div>
                        </div>
                        <p class="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">${app.shortDesc}</p>
                        <div class="pt-2 flex items-center justify-between text-xs font-bold text-purple-600 dark:text-purple-400">
                            <span>View App Details & Download APK</span>
                            <i class="fa-solid fa-arrow-right"></i>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

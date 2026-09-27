/* SINGLE APP VIEW PAGE */

function renderSingleAppPage(id) {
    const app = APPS.find(a => a.id === id) || APPS[0];
    return `
        <div class="max-w-4xl mx-auto space-y-8">
            <div class="text-xs text-slate-500 flex items-center space-x-2">
                <a href="javascript:void(0)" onclick="navigateTo('home')" class="hover:underline">Home</a>
                <span>/</span>
                <a href="javascript:void(0)" onclick="navigateTo('apps')" class="hover:underline">Apps</a>
                <span>/</span>
                <span class="text-slate-800 dark:text-slate-200">${app.name}</span>
            </div>

            <div class="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div class="flex items-center space-x-4">
                        <div class="w-16 h-16 rounded-2xl bg-gradient-to-tr ${app.color} text-white flex items-center justify-center text-3xl shadow-lg">
                            <i class="fa-solid ${app.icon}"></i>
                        </div>
                        <div>
                            <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-300">${app.badge}</span>
                            <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">${app.fullName}</h1>
                            <p class="text-xs text-slate-500 mt-0.5">${app.publisher} • ${app.version} • ${app.size} • ${app.requirements}</p>
                        </div>
                    </div>
                    <button onclick="openDownloadModal('${app.id}')" class="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-lg transition flex items-center space-x-2 shrink-0">
                        <i class="fa-solid fa-download"></i>
                        <span>Download APK (${app.size})</span>
                    </button>
                </div>

                <div class="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                    <h3 class="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wider">MOD Features Unlocked</h3>
                    <ul class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
                        ${app.modFeatures.map(feat => `
                            <li class="flex items-center space-x-2">
                                <i class="fa-solid fa-circle-check text-emerald-500"></i>
                                <span>${feat}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        </div>
    `;
}

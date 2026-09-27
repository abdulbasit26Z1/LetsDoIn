/* READ LOG MODAL LOGIC */

function openFullScreenReadLog() {
    renderReadLogModalData();
    const modal = document.getElementById('fullscreen-read-log');
    if (modal) modal.classList.remove('hidden');
}

function closeFullScreenReadLog() {
    const modal = document.getElementById('fullscreen-read-log');
    if (modal) modal.classList.add('hidden');
}

function renderReadLogModalData() {
    const countElem = document.getElementById('log-stat-count');
    const timeElem = document.getElementById('log-stat-time');
    const scrollElem = document.getElementById('log-stat-scroll');
    const catElem = document.getElementById('log-stat-category');

    if (countElem) countElem.innerText = state.readLog.length;
    if (timeElem) timeElem.innerText = (state.readLog.length * 8) + ' mins';
    if (scrollElem) scrollElem.innerText = state.readLog.length > 0 ? '92%' : '0%';
    if (catElem) catElem.innerText = state.readLog.length > 0 ? state.readLog[0].category : 'N/A';

    const tbody = document.getElementById('read-log-table-body');
    if (!tbody) return;

    if (state.readLog.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="p-4 text-center text-xs text-slate-500">No reading history recorded yet. Explore articles to populate your log!</td></tr>`;
        return;
    }

    tbody.innerHTML = state.readLog.map(item => `
        <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40">
            <td class="p-3 font-semibold text-slate-900 dark:text-white">${item.title}</td>
            <td class="p-3"><span class="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-100 text-indigo-800 dark:bg-indigo-900/60 dark:text-indigo-300">${item.category}</span></td>
            <td class="p-3 text-xs text-slate-500">${item.timestamp}</td>
            <td class="p-3 text-xs">${item.readTime}</td>
            <td class="p-3 text-xs font-bold text-emerald-600">${item.scrollDepth}</td>
            <td class="p-3 text-right">
                <button onclick="navigateTo('blog', '${item.id}'); closeFullScreenReadLog()" class="px-2 py-1 bg-indigo-50 text-indigo-600 rounded text-xs font-bold hover:bg-indigo-100">Revisit</button>
            </td>
        </tr>
    `).join('');
}

function clearReadLog() {
    state.readLog = [];
    localStorage.removeItem('uk_read_log');
    renderReadLogModalData();
    showToast('Read history log cleared successfully.');
}

function exportReadLog() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state.readLog, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", "uk_read_log.json");
    document.body.appendChild(dlAnchor);
    dlAnchor.click();
    dlAnchor.remove();
    showToast('Exported reading log in JSON format.');
}

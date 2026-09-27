/* BLOGS HUB PAGE VIEW */

function renderBlogsPage() {
    return `
        <div class="space-y-6">
            <div>
                <h1 class="text-3xl font-extrabold text-slate-900 dark:text-white">UK Editorial Articles & Guides</h1>
                <p class="text-sm text-slate-500 mt-1">Structured British analysis on tax, living costs, and business compliance.</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                ${BLOGS.map(blog => renderBlogCard(blog)).join('')}
            </div>
        </div>
    `;
}

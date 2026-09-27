/* ADVANCED GOOGLE RICH CARDS SEO & COMPREHENSIVE KEYWORD ENGINE */

const SITE_URL = 'https://letsdoin.co.uk';

/* KEYWORD MAP FOR ALL TOOLS */
const TOOL_KEYWORDS_MAP = {
    'uk-take-home-pay': 'UK take home pay calculator, UK salary calculator 2025/2026, HMRC tax calculator, income tax bands UK, National insurance rate 8%, net pay calculator UK, salary after tax pension student loan, UK salary breakdown',
    'vat-calculator': 'UK VAT calculator, add VAT 20%, remove VAT 20%, 5% reduced VAT calculator, gross net VAT calculator UK, HMRC Value Added Tax, invoice VAT calculator, UK sales tax calculator',
    'appliance-cost': 'UK electrical appliance running cost calculator, kWh electricity cost UK, Ofgem price cap electricity rate, how much does a 2000W heater cost to run UK, daily electricity cost calculator, energy bill saver UK',
    'mortgage-calc': 'UK mortgage calculator, home loan repayment calculator, monthly mortgage interest UK, property loan term interest burden, UK mortgage interest rate 2026, property loan repayment estimator',
    'img-resizer': 'online image resizer tool, resize image PNG JPG WebP, change image dimensions pixels, batch aspect ratio lock image resizer, web image optimizer free, quick scale image presets',
    'img-compressor': 'online image compressor, WebP optimizer, reduce image file size, compress PNG JPG WebP, image compression tool',
    'online-compiler': 'online code compiler, online IDE, Python compiler, C++ compiler, Java compiler, JavaScript runner, multi-language compiler',
    'qr-generator': 'free QR code generator, create downloadable PNG QR code, website URL QR code, contact text QR code generator, high resolution QR code online, custom QR code generator free',
    'word-counter': 'online word counter tool, character count reading duration, sentence paragraph counter, article word count estimator, reading time calculator, text statistics tool',
    'speed-typing': 'speed typing test WPM, words per minute typing test online, keyboard accuracy test, typing speed test online free, British sentence typing practice',
    'password-generator': 'random password generator, strong cryptographic password generator, secure online password maker, custom symbol length password generator, password entropy strength meter',
    'bmi-calculator': 'BMI calculator NHS, body mass index UK, healthy weight range calculator, metric imperial BMI calculator, adult weight category NHS, NHS standard BMI test',
    'case-converter': 'text case converter, UPPERCASE lowercase title case, camelCase kebab-case converter, online text formatting tool, convert text case instant',
    'fuel-trip-cost': 'UK car fuel trip cost calculator, petrol diesel journey cost pounds, MPG fuel efficiency calculator UK, road trip fuel expense, cost per mile petrol calculator',
    'json-formatter': 'JSON formatter prettify online, JSON validator syntax checker, JSON minifier online, format JSON code free, developer JSON editor',
    'compound-interest': 'compound interest calculator UK, savings investment growth projector, Stocks Shares ISA compound return, monthly deposit compound interest, UK wealth growth model',
    'unit-converter': 'universal unit converter, miles to kilometres converter, metric imperial length mass temperature converter online, quick conversion tool',
    'timezone-planner': 'London time zone converter, GMT BST time differences, London New York Dubai Tokyo city clock planner, UK local time difference, global meeting timezone planner',
    'tip-splitter': 'restaurant tip bill splitter UK, split bill among friends, gratuity percentage calculator UK, per person dining cost estimator',
    'discount-calc': 'discount sale savings calculator, high street sale final price, clearance discount calculator UK, percentage off sale price estimator',
    'water-tracker': 'daily water intake calculator, hydration target litres glasses, recommended daily water by weight, UK health hydration tool',
    'calorie-bmr': 'BMR calorie calculator, Basal Metabolic Rate Mifflin St Jeor, daily maintenance calories UK, TDEE calorie estimator, daily calorie intake',
    'percentage-calc': '3 way percentage math calculator, percentage change calculator, percentage of value calculator online, percentage increase decrease',
    'age-date-diff': 'age date difference calculator, exact age in years months days, date of birth age calculator, date duration calculator',
    'council-tax-finder': 'UK council tax band estimator, 1991 property value tax band, council tax valuation band A B C D E, municipal local authority tax band'
};

/* KEYWORD MAP FOR EDITORIAL BLOG ARTICLES */
const BLOG_KEYWORDS_MAP = {
    'capcut-mod-apk': 'CapCut MOD APK v19.7.0, CapCut Pro Unlocked download, CapCut no watermark Android, video overlay photo editor MOD, CapCut premium unlocked 2026, ad free video editing Android',
    'uk-tax-finance-2026': 'UK personal finance 2026, HMRC tax bands 2025/2026, £12570 personal allowance freeze, £20000 ISA limit strategy, 60% effective tax trap pension sacrifice, Lifetime ISA LISA bonus UK',
    'uk-energy-efficiency-grants': 'UK energy efficiency grants, Ofgem price cap savings 2026, £7500 Boiler Upgrade Scheme heat pump, ECO4 free insulation scheme, smart meter time of use tariffs, Octopus energy tariffs UK',
    'uk-remote-work-productivity': 'UK remote work tax relief, £6 per week WFH allowance HMRC, Day 1 flexible working rights UK, home office productivity guide, remote work utility expense claim',
    'uk-business-hmrc-vat': 'starting small business UK, £90000 VAT registration threshold, sole trader vs Ltd company HMRC, Making Tax Digital compliance 2026, UK corporation tax thresholds'
};

/* GLOBAL MASTER KEYWORD LIST */
const GLOBAL_KEYWORDS = 'UK tax calculator, VAT calculator UK, UK energy bill cost, British lifestyle guides, salary breakdown UK, daily life tools, CapCut MOD APK UK, image resizer, QR code generator, BMI calculator, mortgage repayment UK, compound interest ISA, fuel trip cost UK';

function updatePageSEO() {
    const safeTools = (typeof TOOLS !== 'undefined' && Array.isArray(TOOLS)) ? TOOLS : [];
    const safeBlogs = (typeof BLOGS !== 'undefined' && Array.isArray(BLOGS)) ? BLOGS : [];
    const safeApps = (typeof APPS !== 'undefined' && Array.isArray(APPS)) ? APPS : [];

    const defaultTool = { id: 'uk-take-home-pay', name: 'LetsDoIn Utility Tool', category: 'Utilities', seoDesc: 'Free UK online calculation utility tool.' };
    const defaultBlog = { id: 'uk-tax-finance-2026', title: 'UK Editorial Guide', category: 'Guide', readTime: '5 min', wordCount: 1000, date: '2026', author: 'LetsDoIn Team', summary: 'UK editorial guide.', image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1000&q=80' };
    const defaultApp = { id: 'capcut-mod-apk', name: 'CapCut', fullName: 'CapCut MOD APK', version: 'v19.7.0', requirements: 'Android 5.1+', size: '183 MB', category: 'Video', shortDesc: 'CapCut MOD APK Pro Unlocked', rating: 4.8, votes: 12000, badge: 'Pro Unlocked' };

    let title = 'LetsDoIn UK | Premier UK Guides, Wealth & Daily Life Utilities';
    let description = 'Discover in-depth UK editorial guides, financial breakdown tools, energy cost estimators, and daily life utilities designed specifically for British residents.';
    let keywords = GLOBAL_KEYWORDS;
    let canonical = SITE_URL + '/';
    let ogType = 'website';
    let ogImage = 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80';
    let jsonLdGraph = [];

    // UK Geo-Targeting & Regional Meta Tags
    setMetaTag('geo.region', 'GB');
    setMetaTag('geo.placename', 'London, United Kingdom');
    setMetaTag('geo.position', '51.5074;-0.1278');
    setMetaTag('ICBM', '51.5074, -0.1278');
    setMetaTag('content-language', 'en-gb');
    setMetaTag('theme-color', '#0f172a');

    // Base Organization & WebSite Schemas
    const siteSchema = {
        "@type": "WebSite",
        "@id": SITE_URL + "/#website",
        "url": SITE_URL + "/",
        "name": "LetsDoIn UK",
        "description": description,
        "keywords": GLOBAL_KEYWORDS,
        "inLanguage": "en-GB",
        "publisher": { "@id": SITE_URL + "/#organization" },
        "potentialAction": {
            "@type": "SearchAction",
            "target": SITE_URL + "/tools.html?q={search_term_string}",
            "query-input": "required name=search_term_string"
        }
    };

    const orgSchema = {
        "@type": "Organization",
        "@id": SITE_URL + "/#organization",
        "name": "LetsDoIn UK",
        "url": SITE_URL + "/",
        "logo": {
            "@type": "ImageObject",
            "url": "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=300&q=80",
            "width": 300,
            "height": 300
        },
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "100 Bishopsgate",
            "addressLocality": "London",
            "postalCode": "EC2N 4AG",
            "addressCountry": "GB"
        },
        "areaServed": {
            "@type": "Country",
            "name": "United Kingdom",
            "alternateName": "UK"
        },
        "sameAs": [
            "https://twitter.com/LetsDoInUK",
            "https://facebook.com/LetsDoInUK"
        ]
    };

    jsonLdGraph.push(siteSchema, orgSchema);

    try {
        const currentView = (typeof state !== 'undefined' && state.currentView) ? state.currentView : (window.DEFAULT_VIEW || 'home');

        if (currentView === 'home') {
            title = 'LetsDoIn UK | Premier UK Guides, Wealth & Daily Life Utilities';
            keywords = GLOBAL_KEYWORDS;
            canonical = SITE_URL + '/index.html';

            if (safeTools.length > 0) {
                const homeCarousel = {
                    "@type": "ItemList",
                    "@id": canonical + "#featured-carousel",
                    "name": "Featured UK Tools & Editorial Guides",
                    "itemListElement": safeTools.slice(0, 5).map((tool, index) => ({
                        "@type": "ListItem",
                        "position": index + 1,
                        "name": tool.name,
                        "url": `${SITE_URL}/${tool.id}.html`
                    }))
                };
                jsonLdGraph.push(homeCarousel);
            }

        } else if (currentView === 'blogs') {
            title = 'UK Editorial Articles & Financial Guides (2026 Edition) | LetsDoIn UK';
            description = 'Comprehensive British guides on personal finance, HMRC tax bands, Ofgem energy price cap savings, and business compliance.';
            keywords = 'UK financial guides, HMRC tax bands 2026, UK energy cap guide, British business VAT, £12570 personal allowance, ISA tax strategy UK, UK small business HMRC';
            canonical = SITE_URL + '/blogs.html';

            jsonLdGraph.push({
                "@type": "CollectionPage",
                "@id": canonical + "#collection",
                "url": canonical,
                "name": title,
                "description": description,
                "keywords": keywords,
                "inLanguage": "en-GB"
            });

            if (safeBlogs.length > 0) {
                const blogsCarousel = {
                    "@type": "ItemList",
                    "@id": canonical + "#blogs-carousel",
                    "name": "UK Editorial Articles Carousel",
                    "itemListElement": safeBlogs.map((blog, index) => ({
                        "@type": "ListItem",
                        "position": index + 1,
                        "name": blog.title,
                        "url": `${SITE_URL}/blog.html?id=${blog.id}`
                    }))
                };
                jsonLdGraph.push(blogsCarousel);
            }

        } else if (currentView === 'blog') {
            const activeId = (typeof state !== 'undefined' && state.activeBlogId) ? state.activeBlogId : (window.DEFAULT_BLOG_ID || 'capcut-mod-apk');
            const blog = safeBlogs.find(b => b.id === activeId) || safeBlogs[0] || defaultBlog;
            title = `${blog.title} | LetsDoIn UK Guide`;
            description = blog.summary;
            keywords = BLOG_KEYWORDS_MAP[blog.id] || `${blog.category}, UK guide, ${blog.title.toLowerCase()}`;
            canonical = `${SITE_URL}/blog.html?id=${blog.id}`;
            ogType = 'article';
            ogImage = blog.image;

            jsonLdGraph.push({
                "@type": "BlogPosting",
                "@id": canonical + "#article",
                "headline": blog.title,
                "description": blog.summary,
                "keywords": keywords,
                "image": [
                    blog.image,
                    blog.image.replace("w=1000", "w=800&h=600"),
                    blog.image.replace("w=1000", "w=600&h=600")
                ],
                "datePublished": "2026-01-01T08:00:00+00:00",
                "dateModified": "2026-02-15T12:00:00+00:00",
                "author": { "@type": "Person", "name": blog.author },
                "publisher": { "@id": SITE_URL + "/#organization" },
                "inLanguage": "en-GB",
                "wordCount": blog.wordCount,
                "mainEntityOfPage": { "@type": "WebPage", "@id": canonical }
            });

            jsonLdGraph.push({
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL + "/index.html" },
                    { "@type": "ListItem", "position": 2, "name": "Guides", "item": SITE_URL + "/blogs.html" },
                    { "@type": "ListItem", "position": 3, "name": blog.title, "item": canonical }
                ]
            });

        } else if (currentView === 'tools') {
            title = 'Free Daily Life Utilities & Calculators | LetsDoIn UK';
            description = 'Free online UK calculators for take-home salary, VAT, mortgage repayments, energy costs, image resizing, and QR code generation.';
            keywords = 'UK online calculators, UK tax calculator, VAT calculator, image resizer, QR generator, BMI calculator, WPM typing test, password generator, compound interest calculator';
            canonical = SITE_URL + '/tools.html';

            jsonLdGraph.push({
                "@type": "CollectionPage",
                "@id": canonical + "#tools-hub",
                "url": canonical,
                "name": title,
                "description": description,
                "keywords": keywords,
                "inLanguage": "en-GB"
            });

            if (safeTools.length > 0) {
                const toolsCarousel = {
                    "@type": "ItemList",
                    "@id": canonical + "#tools-carousel",
                    "name": "UK Interactive Calculators & Tools Carousel",
                    "itemListElement": safeTools.map((tool, index) => ({
                        "@type": "ListItem",
                        "position": index + 1,
                        "name": tool.name,
                        "url": `${SITE_URL}/${tool.id}.html`
                    }))
                };
                jsonLdGraph.push(toolsCarousel);
            }

        } else if (currentView === 'tool') {
            const activeId = (typeof state !== 'undefined' && state.activeToolId) ? state.activeToolId : (window.DEFAULT_TOOL_ID || 'uk-take-home-pay');
            const tool = safeTools.find(t => t.id === activeId) || safeTools[0] || defaultTool;
            title = `${tool.name} (Free UK Online Utility) | LetsDoIn UK`;
            description = tool.seoDesc;
            keywords = TOOL_KEYWORDS_MAP[tool.id] || `${tool.name}, ${tool.category} tool, UK calculator, free online ${tool.name}`;
            canonical = `${SITE_URL}/${tool.id}.html`;
            ogType = 'website';

            jsonLdGraph.push({
                "@type": "WebApplication",
                "@id": canonical + "#app",
                "name": tool.name,
                "url": canonical,
                "description": tool.seoDesc,
                "keywords": keywords,
                "applicationCategory": tool.category + "Application",
                "operatingSystem": "All",
                "browserRequirements": "Requires JavaScript. Requires HTML5 Browser.",
                "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "GBP"
                }
            });

            jsonLdGraph.push({
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL + "/index.html" },
                    { "@type": "ListItem", "position": 2, "name": "Tools", "item": SITE_URL + "/tools.html" },
                    { "@type": "ListItem", "position": 3, "name": tool.name, "item": canonical }
                ]
            });

        } else if (currentView === 'apps') {
            title = 'Featured Mobile Apps & Unlocked MOD APKs | LetsDoIn UK';
            description = 'Direct safe downloads for unlocked utility & creative mobile applications including CapCut MOD APK v19.7.0 Pro Unlocked.';
            keywords = 'CapCut MOD APK UK, CapCut Pro Unlocked download, Android video editor MOD, unlocked APK downloads, CapCut no watermark Android';
            canonical = SITE_URL + '/apps.html';

            if (safeApps.length > 0) {
                const appsCarousel = {
                    "@type": "ItemList",
                    "@id": canonical + "#apps-carousel",
                    "name": "Featured Mobile Apps Carousel",
                    "itemListElement": safeApps.map((app, index) => ({
                        "@type": "ListItem",
                        "position": index + 1,
                        "name": app.name,
                        "url": `${SITE_URL}/app.html?id=${app.id}`
                    }))
                };
                jsonLdGraph.push(appsCarousel);
            }

        } else if (currentView === 'app') {
            const activeId = (typeof state !== 'undefined' && state.activeAppId) ? state.activeAppId : (window.DEFAULT_APP_ID || 'capcut-mod-apk');
            const app = safeApps.find(a => a.id === activeId) || safeApps[0] || defaultApp;
            title = `${app.fullName} Free Download | LetsDoIn UK`;
            description = app.shortDesc;
            keywords = `${app.name}, ${app.badge}, CapCut MOD APK, Android APK, ${app.category}, Pro Unlocked APK, video editor MOD`;
            canonical = `${SITE_URL}/app.html?id=${app.id}`;

            jsonLdGraph.push({
                "@type": "SoftwareApplication",
                "@id": canonical + "#software",
                "name": app.fullName,
                "operatingSystem": app.requirements,
                "applicationCategory": "MultimediaApplication",
                "softwareVersion": app.version,
                "fileSize": app.size,
                "keywords": keywords,
                "offers": { "@type": "Offer", "price": "0", "priceCurrency": "GBP" },
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": app.rating,
                    "ratingCount": app.votes
                }
            });
        }
    } catch(err) {
        console.warn('SEO Manager Notice:', err);
    }

    // Update Document Meta Tags dynamically
    document.title = title;

    setMetaTag('description', description);
    setMetaTag('keywords', keywords);

    // OpenGraph
    setMetaProperty('og:title', title);
    setMetaProperty('og:description', description);
    setMetaProperty('og:url', canonical);
    setMetaProperty('og:type', ogType);
    setMetaProperty('og:image', ogImage);
    setMetaProperty('og:site_name', 'LetsDoIn UK');
    setMetaProperty('og:locale', 'en_GB');

    // Twitter Card
    setMetaName('twitter:card', 'summary_large_image');
    setMetaName('twitter:title', title);
    setMetaName('twitter:description', description);
    setMetaName('twitter:image', ogImage);

    // Canonical link
    let canonicalLink = document.querySelector("link[rel='canonical']");
    if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonical);

    // Hreflang link
    let hreflangLink = document.querySelector("link[hreflang='en-GB']");
    if (!hreflangLink) {
        hreflangLink = document.createElement('link');
        hreflangLink.setAttribute('rel', 'alternate');
        hreflangLink.setAttribute('hreflang', 'en-GB');
        document.head.appendChild(hreflangLink);
    }
    hreflangLink.setAttribute('href', canonical);

    // Inject JSON-LD Schema Graph
    const finalSchema = {
        "@context": "https://schema.org",
        "@graph": jsonLdGraph
    };

    let scriptElem = document.getElementById('google-json-ld');
    if (!scriptElem) {
        scriptElem = document.createElement('script');
        scriptElem.id = 'google-json-ld';
        scriptElem.type = 'application/ld+json';
        document.head.appendChild(scriptElem);
    }
    scriptElem.textContent = JSON.stringify(finalSchema, null, 2);

    const modalCodeElem = document.getElementById('schema-modal-code');
    if (modalCodeElem) {
        modalCodeElem.textContent = JSON.stringify(finalSchema, null, 2);
    }
}

function setMetaTag(name, content) {
    let elem = document.querySelector(`meta[name='${name}']`);
    if (!elem) {
        elem = document.createElement('meta');
        elem.setAttribute('name', name);
        document.head.appendChild(elem);
    }
    elem.setAttribute('content', content);
}

function setMetaProperty(property, content) {
    let elem = document.querySelector(`meta[property='${property}']`);
    if (!elem) {
        elem = document.createElement('meta');
        elem.setAttribute('property', property);
        document.head.appendChild(elem);
    }
    elem.setAttribute('content', content);
}

function setMetaName(name, content) {
    setMetaTag(name, content);
}

/* ADVANCED GLOBAL SEO, RICH SCHEMA.ORG JSON-LD GRAPH & KEYWORD TARGETING ENGINE */

const SITE_URL = 'https://letsdoin.co.uk';

/* MASTER KEYWORD MAP FOR ALL 55+ TOOLS */
const TOOL_KEYWORDS_MAP = {
    'uk-take-home-pay': 'UK take home pay calculator, UK salary calculator 2025/2026, HMRC tax calculator, income tax bands UK, National insurance rate 8%, net pay calculator UK, salary after tax pension student loan, UK salary breakdown',
    'vat-calculator': 'UK VAT calculator, add VAT 20%, remove VAT 20%, 5% reduced VAT calculator, gross net VAT calculator UK, HMRC Value Added Tax, invoice VAT calculator, UK sales tax calculator',
    'appliance-cost': 'UK electrical appliance running cost calculator, kWh electricity cost UK, Ofgem price cap electricity rate, daily electricity cost calculator, energy bill saver UK',
    'mortgage-calc': 'UK mortgage calculator, home loan repayment calculator, monthly mortgage interest UK, property loan term interest burden, UK mortgage interest rate 2026, property loan repayment estimator',
    'sdlt-calc': 'UK stamp duty calculator, SDLT rates 2026, first time buyer stamp duty, buy to let stamp duty surcharge, property purchase tax England',
    'student-loan-calc': 'UK student loan calculator, Plan 2 repayment, Plan 5 threshold 2026, masters loan repayment rate, student loan deduction salary',
    'inheritance-tax': 'UK inheritance tax calculator, IHT 40 percent rate, nil rate band £325000, residence nil rate band £175000, estate planning UK',
    'dividend-tax': 'UK dividend tax calculator, dividend allowance £500, Ltd company director dividend tax, basic higher dividend rate HMRC',
    'isa-growth-calc': 'UK Stocks and Shares ISA calculator, ISA allowance calculator 2026, £20000 ISA limit, tax free investment growth UK, HMRC ISA tax savings',
    'etf-return-calc': 'S&P 500 ETF calculator GBP, VUSA Vanguard calculator, VWRP FTSE All World returns, EQQQ Nasdaq 100 ETF calculator UK, TER fund fee calculator',
    'cgt-calculator': 'UK Capital Gains Tax calculator, CGT allowance £3000, ETF share sale tax UK, HMRC CGT rates 2026, crypto property capital gains tax',
    'drip-calculator': 'DRIP calculator UK, dividend reinvestment plan calculator, compound dividend returns, DRIP vs cash payout, extra shares accumulated',
    'ev-petrol-cost': 'UK EV vs petrol cost calculator, electric car home charging tariff, Octopus Intelligent Go 7.5p, per mile EV savings vs petrol',
    'solar-payback': 'UK solar panel payback calculator, solar PV battery savings, Smart Export Guarantee SEG tariff income, solar payback years UK',
    'heat-pump-cost': 'UK heat pump vs gas boiler cost calculator, Boiler Upgrade Scheme BUS £7500 grant, COP efficiency heating bill UK',
    'air-fryer-cost': 'UK air fryer vs oven energy cost calculator, Ninja air fryer electricity cost, pence per meal cooking savings UK',
    'broadband-speed': 'UK broadband speed calculator, required Mbps Netflix 4K, PS5 gaming broadband speed, FTTP full fibre speed estimator',
    'broadband-price-hike': 'UK broadband mid contract price rise calculator, BT EE Sky Virgin Media CPI price hike, April mid contract price rise',
    'pension-relief': 'UK pension tax relief calculator, 20 percent 40 percent tax relief, workplace pension salary sacrifice NI savings',
    'side-hustle-tax': 'UK side hustle tax calculator, Vinted Etsy eBay Airbnb HMRC tax, £1000 trading allowance, self assessment threshold',
    'ssp-calculator': 'UK statutory sick pay calculator, SSP £116.75 weekly rate, sick leave 3 waiting days rule, employer sick pay UK',
    'maternity-pay': 'UK statutory maternity pay calculator, SMP 39 weeks pay rate, 90 percent average weekly earnings, maternity leave calculator',
    'rent-vs-buy': 'UK rent vs buy property calculator, cost of renting vs buying UK, mortgage equity wealth gain, buying a home vs renting',
    'commute-cost': 'UK train commute vs drive cost calculator, National Rail season ticket, HMRC 45p mile driving fuel parking cost',
    'car-ved-tax': 'UK car tax VED band calculator, road tax CO2 rates 2026, £190 standard rate, £40000 luxury car supplement',
    'childcare-cost': 'UK childcare cost calculator, 30 free hours funding savings, Tax-Free Childcare £2000 bonus top up',
    'degree-classifier': 'UK university degree classification calculator, 1st 2:1 2:2 3rd honours weighted module average, UK uni grade estimator',
    'uk-savings-tax': 'UK personal savings allowance tax calculator, bank interest tax rates HMRC, £1000 PSA basic rate, £500 PSA higher rate',
    'stamp-duty-scotland': 'Scotland LBTT calculator, Wales LTT property tax, Revenue Scotland LBTT rates 2026, Additional Dwelling Supplement ADS',
    'overtime-pay-calc': 'UK overtime pay calculator, time and a half 1.5x calculator, double time pay UK, overtime tax NI deduction estimator',
    'universal-credit-calc': 'Universal credit calculator UK, UC 55% taper rate, work allowance £404 £673, DWP Universal credit monthly payment',
    'child-benefit-tax': 'High income child benefit charge calculator, HICBC tax clawback £60000 £80000, child benefit repayment HMRC',
    'img-resizer': 'online image resizer tool, resize image PNG JPG WebP, change image dimensions pixels, batch aspect ratio lock image resizer, web image optimizer free',
    'img-compressor': 'online image compressor, WebP optimizer, reduce image file size, compress PNG JPG WebP, image compression tool',
    'online-compiler': 'online code compiler, online IDE, Python compiler, C++ compiler, Java compiler, JavaScript runner, multi-language compiler, MySQL online compiler',
    'cisco-packet-tracer': 'Cisco Packet Tracer online, Cisco Packet Tracer simulator, Cisco IOS CLI simulator, online network topology simulator, router switch simulator, CCNA online lab',
    'qr-generator': 'free QR code generator, create downloadable PNG QR code, website URL QR code, contact text QR code generator, high resolution QR code online',
    'word-counter': 'online word counter tool, character count reading duration, sentence paragraph counter, article word count estimator, text statistics tool',
    'speed-typing': 'speed typing test WPM, words per minute typing test online, keyboard accuracy test, British sentence typing practice',
    'password-generator': 'random password generator, strong cryptographic password generator, secure online password maker, custom symbol length password generator',
    'bmi-calculator': 'BMI calculator NHS, body mass index UK, healthy weight range calculator, metric imperial BMI calculator, NHS standard BMI test',
    'case-converter': 'text case converter, UPPERCASE lowercase title case, camelCase kebab-case converter, online text formatting tool',
    'fuel-trip-cost': 'UK car fuel trip cost calculator, petrol diesel journey cost pounds, MPG fuel efficiency calculator UK, road trip fuel expense',
    'json-formatter': 'JSON formatter prettify online, JSON validator syntax checker, JSON minifier online, developer JSON editor',
    'compound-interest': 'compound interest calculator UK, savings investment growth projector, Stocks Shares ISA compound return, UK wealth growth model',
    'unit-converter': 'universal unit converter, miles to kilometres converter, metric imperial length mass temperature converter online',
    'timezone-planner': 'London time zone converter, GMT BST time differences, London New York Dubai Tokyo city clock planner',
    'tip-splitter': 'restaurant tip bill splitter UK, split bill among friends, gratuity percentage calculator UK',
    'discount-calc': 'discount sale savings calculator, high street sale final price, clearance discount calculator UK',
    'water-tracker': 'daily water intake calculator, hydration target litres glasses, UK health hydration tool',
    'calorie-bmr': 'BMR calorie calculator, Basal Metabolic Rate Mifflin St Jeor, daily maintenance calories UK, TDEE calorie estimator',
    'percentage-calc': '3 way percentage math calculator, percentage change calculator, percentage increase decrease',
    'age-date-diff': 'age date difference calculator, exact age in years months days, date duration calculator',
    'council-tax-finder': 'UK council tax band estimator, 1991 property value tax band, municipal local authority tax band'
};

/* MASTER KEYWORD MAP FOR EDITORIAL GUIDES */
const BLOG_KEYWORDS_MAP = {
    'capcut-mod-apk': 'CapCut Pro MOD, CapCut Pro MOD APK v19.7.0, CapCut Pro MOD download, CapCut Pro MOD APK no watermark, CapCut Pro MOD 2026, CapCut Pro Unlocked MOD APK, CapCut Pro MOD free subscription',
    'uk-tax-finance-2026': 'UK personal finance 2026, HMRC tax bands 2025/2026, £12570 personal allowance freeze, £20000 ISA limit strategy, 60% effective tax trap pension sacrifice, Lifetime ISA LISA bonus UK',
    'uk-energy-efficiency-grants': 'UK energy efficiency grants, Ofgem price cap savings 2026, £7500 Boiler Upgrade Scheme heat pump, ECO4 free insulation scheme, smart meter time of use tariffs, Octopus energy tariffs UK',
    'uk-remote-work-productivity': 'UK remote work tax relief, £6 per week WFH allowance HMRC, Day 1 flexible working rights UK, home office productivity guide, remote work utility expense claim',
    'uk-business-hmrc-vat': 'starting small business UK, £90000 VAT registration threshold, sole trader vs Ltd company HMRC, Making Tax Digital compliance 2026, UK corporation tax thresholds',
    'student-loan-plan5-guide': 'UK student loan Plan 5 vs Plan 2, Plan 5 threshold £25000, 40 year student loan write off, graduate tax England 2026',
    'heat-pump-grant-guide': 'Boiler Upgrade Scheme BUS £7500 grant, Air Source Heat Pump cost UK, COP efficiency gas boiler comparison',
    'isa-investment-strategy': 'UK ISA investment strategy 2026, Stocks and Shares ISA vs Cash ISA, £20000 ISA allowance tax hacks, Lifetime ISA bonus',
    'side-hustle-tax-rules': 'UK side hustle tax guide, HMRC digital platform reporting rules, Vinted Etsy eBay tax threshold, £1000 trading allowance'
};

/* MASTER KEYWORD MAP FOR APPS */
const APP_KEYWORDS_MAP = {
    'capcut-mod-apk': 'CapCut Pro MOD, CapCut Pro MOD APK v19.7.0, CapCut Pro MOD download, CapCut Pro MOD APK no watermark, CapCut Pro MOD 2026, CapCut Pro Unlocked MOD APK',
    'subway-surfers-mod-apk': 'Subway Surfers MOD APK v3.69.2, Subway Surfers unlimited coins and keys, Subway Surfers MOD menu download UK, Subway Surfers unlocked characters hoverboards',
    'videoshow-mod-apk': 'VideoShow Pro MOD APK v11.0.7, VideoShow VIP unlocked, VideoShow no watermark 4K export',
    'helloface-mod-apk': 'HelloFace AI Premium MOD APK v6.3.6, HelloFace AI face swap unlocked, HelloFace Pro APK download',
    'vinkle-mod-apk': 'Vinkle AI Music Video Editor MOD APK v6.0.0, Vinkle 3D transitions unlocked, Vinkle no watermark APK'
};

const GLOBAL_KEYWORDS = 'CapCut Pro MOD, CapCut Pro MOD APK v19.7.0, CapCut Pro Unlocked, Subway Surfers MOD APK, UK tax calculator, VAT calculator UK, UK energy bill cost, British lifestyle guides, salary breakdown UK, daily life tools, image resizer, QR code generator, BMI calculator, mortgage repayment UK, compound interest ISA, fuel trip cost UK';

function updatePageSEO() {
    const safeTools = (typeof TOOLS !== 'undefined' && Array.isArray(TOOLS)) ? TOOLS : [];
    const safeBlogs = (typeof BLOGS !== 'undefined' && Array.isArray(BLOGS)) ? BLOGS : [];
    const safeApps = (typeof APPS !== 'undefined' && Array.isArray(APPS)) ? APPS : [];

    const defaultTool = { id: 'uk-take-home-pay', name: 'LetsDoIn Utility Tool', category: 'Utilities', seoDesc: 'Free UK online calculation utility tool.' };
    const defaultBlog = { id: 'uk-tax-finance-2026', title: 'UK Editorial Guide', category: 'Guide', readTime: '5 min', wordCount: 1000, date: '2026', author: 'LetsDoIn Team', summary: 'UK editorial guide.', image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1000&q=80' };
    const defaultApp = { id: 'capcut-mod-apk', name: 'CapCut', fullName: 'CapCut MOD APK', version: 'v19.7.0', requirements: 'Android 5.1+', size: '373 MB', category: 'Video', shortDesc: 'CapCut MOD APK Pro Unlocked', rating: 4.9, votes: 28940, badge: 'Pro Unlocked' };

    let title = 'LetsDoIn UK | Premier UK Guides, Wealth & 55+ Daily Life Utilities';
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
        "alternateName": ["LetsDoIn", "LetsDoIn.uk", "LetsDoIn UK Network"],
        "description": description,
        "keywords": GLOBAL_KEYWORDS,
        "inLanguage": ["en-GB", "en-US", "en-CA", "en-AU", "en-IE", "en-NZ"],
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
        "alternateName": "LetsDoIn Digital UK",
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
        "areaServed": [
            { "@type": "Country", "name": "United Kingdom", "alternateName": "UK" },
            { "@type": "Country", "name": "United States" },
            { "@type": "Country", "name": "Canada" },
            { "@type": "Country", "name": "Australia" },
            { "@type": "Country", "name": "Ireland" }
        ],
        "knowsAbout": [
            "UK Income Tax & HMRC Tax Bands",
            "Ofgem Energy Price Cap Regulations",
            "Stocks & Shares ISA Compound Wealth",
            "Cisco Packet Tracer Networking",
            "CapCut Pro Video Editing Studio",
            "Android MOD Applications"
        ],
        "sameAs": [
            "https://twitter.com/LetsDoInUK",
            "https://facebook.com/LetsDoInUK",
            "https://github.com/LetsDoInUK"
        ]
    };

    jsonLdGraph.push(siteSchema, orgSchema);

    try {
        const currentView = (typeof state !== 'undefined' && state.currentView) ? state.currentView : (window.DEFAULT_VIEW || 'home');

        if (currentView === 'home') {
            title = 'LetsDoIn UK | Premier UK Guides, Wealth & 55+ Daily Life Utilities';
            keywords = GLOBAL_KEYWORDS;
            canonical = SITE_URL + '/index.html';

            if (safeTools.length > 0) {
                const homeCarousel = {
                    "@type": "ItemList",
                    "@id": canonical + "#featured-carousel",
                    "name": "Featured Standalone UK Utilities & Tools",
                    "itemListElement": safeTools.slice(0, 10).map((tool, index) => ({
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
                        "url": `${SITE_URL}/${blog.id}.html`
                    }))
                };
                jsonLdGraph.push(blogsCarousel);
            }

        } else if (currentView === 'blog') {
            const activeId = (typeof state !== 'undefined' && state.activeBlogId) ? state.activeBlogId : (window.DEFAULT_BLOG_ID || 'uk-tax-finance-2026');
            const blog = safeBlogs.find(b => b.id === activeId) || safeBlogs[0] || defaultBlog;
            title = `${blog.title} | LetsDoIn UK Guide`;
            description = blog.summary;
            keywords = BLOG_KEYWORDS_MAP[blog.id] || `${blog.category}, UK guide, ${blog.title.toLowerCase()}`;
            canonical = `${SITE_URL}/${blog.id}.html`;
            ogType = 'article';
            ogImage = blog.image;

            jsonLdGraph.push({
                "@type": "TechArticle",
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
                "author": { "@type": "Person", "name": blog.author || "LetsDoIn Editorial Team" },
                "publisher": { "@id": SITE_URL + "/#organization" },
                "inLanguage": "en-GB",
                "wordCount": blog.wordCount || 1200,
                "citation": [
                    "https://www.gov.uk/income-tax-rates",
                    "https://www.ofgem.gov.uk/",
                    "https://www.hmrc.gov.uk/"
                ],
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
            title = '55+ Free Standalone Daily Life Utilities & Calculators | LetsDoIn UK';
            description = 'Explore 55+ free interactive standalone daily life utilities and calculators designed for UK residents. Salary, VAT, Energy, Savings Tax, Universal Credit, Image Resizer, QR Generator & more.';
            keywords = 'UK online calculators, UK tax calculator, VAT calculator, image resizer, QR generator, BMI calculator, WPM typing test, password generator, compound interest calculator, universal credit calculator';
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
                    "name": "55+ Standalone UK Interactive Calculators Carousel",
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
            title = `${tool.name} (Free Standalone Tool) | LetsDoIn UK`;
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
                "applicationCategory": (tool.category || "Financial") + "Application",
                "operatingSystem": "All (Windows, macOS, Linux, iOS, Android)",
                "browserRequirements": "Requires JavaScript. Requires HTML5 Canvas / WebGL Web Browser.",
                "featureList": [
                    "100% Free Client-Side Calculation",
                    "No Account or Personal Data Transmitted",
                    "Updated for 2025/2026 UK Regulations"
                ],
                "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "GBP"
                },
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.9",
                    "ratingCount": "18450"
                },
                "author": { "@id": SITE_URL + "/#organization" }
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
                        "url": `${SITE_URL}/${app.id}.html`
                    }))
                };
                jsonLdGraph.push(appsCarousel);
            }

        } else if (currentView === 'app') {
            const activeId = (typeof state !== 'undefined' && state.activeAppId) ? state.activeAppId : (window.DEFAULT_APP_ID || 'capcut-mod-apk');
            const app = safeApps.find(a => a.id === activeId) || safeApps[0] || defaultApp;
            title = `${app.fullName} Free Download | LetsDoIn UK`;
            description = app.shortDesc;
            keywords = APP_KEYWORDS_MAP[app.id] || `${app.name}, ${app.badge}, Subway Surfers MOD APK, CapCut MOD APK, Android APK UK, ${app.category}, Unlimited Coins Keys APK`;
            canonical = `${SITE_URL}/${app.id}.html`;

            jsonLdGraph.push({
                "@type": "SoftwareApplication",
                "@id": canonical + "#software",
                "name": app.fullName,
                "operatingSystem": app.requirements || "Android 5.0+",
                "applicationCategory": "MultimediaApplication",
                "softwareVersion": app.version || "v19.7.0",
                "fileSize": app.size || "373 MB",
                "keywords": keywords,
                "offers": { "@type": "Offer", "price": "0", "priceCurrency": "GBP" },
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": app.rating || 4.9,
                    "ratingCount": app.votes || 28940
                },
                "publisher": { "@id": SITE_URL + "/#organization" },
                "downloadUrl": app.directCdnUrl || app.downloadUrl || canonical
            });

            jsonLdGraph.push({
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL + "/index.html" },
                    { "@type": "ListItem", "position": 2, "name": "Apps & MODs", "item": SITE_URL + "/apps.html" },
                    { "@type": "ListItem", "position": 3, "name": app.name, "item": canonical }
                ]
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

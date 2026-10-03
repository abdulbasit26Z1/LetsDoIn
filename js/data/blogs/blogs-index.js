/* BLOGS COLLECTION INDEX */
const BLOGS = [
    typeof BLOG_CAPCUT !== 'undefined' ? BLOG_CAPCUT : null,
    typeof BLOG_TAX_FINANCE !== 'undefined' ? BLOG_TAX_FINANCE : null,
    typeof BLOG_ENERGY_GRANTS !== 'undefined' ? BLOG_ENERGY_GRANTS : null,
    typeof BLOG_REMOTE_WORK !== 'undefined' ? BLOG_REMOTE_WORK : null,
    typeof BLOG_BUSINESS_VAT !== 'undefined' ? BLOG_BUSINESS_VAT : null,
    typeof BLOG_STUDENT_LOAN_PLAN5 !== 'undefined' ? BLOG_STUDENT_LOAN_PLAN5 : null,
    typeof BLOG_HEAT_PUMP_GRANT !== 'undefined' ? BLOG_HEAT_PUMP_GRANT : null,
    typeof BLOG_ISA_STRATEGY !== 'undefined' ? BLOG_ISA_STRATEGY : null,
    typeof BLOG_SIDE_HUSTLE_RULES !== 'undefined' ? BLOG_SIDE_HUSTLE_RULES : null
].filter(b => b !== null);

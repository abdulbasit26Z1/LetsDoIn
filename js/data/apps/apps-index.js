/* FEATURED MOBILE APPS INDEX */
const APPS = [
    typeof APP_CAPCUT !== 'undefined' ? APP_CAPCUT : null,
    typeof APP_SUBWAY_SURFERS !== 'undefined' ? APP_SUBWAY_SURFERS : null,
    typeof APP_VIDEOSHOW !== 'undefined' ? APP_VIDEOSHOW : null,
    typeof APP_HELLOFACE !== 'undefined' ? APP_HELLOFACE : null,
    typeof APP_VINKLE !== 'undefined' ? APP_VINKLE : null
].filter(a => a !== null);

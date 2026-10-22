function version()
{
    document.write('<h2>Cisco Packet Tracer Mobile v3.0 - Loading ...</h2>');
}
function isAndroid()
{
	return /Android/i.test(navigator.userAgent);
}
function isIos()
{
	return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}
function progress()
{
	document.write('<progress max="100"></progress>');
}
function setFontSize()
{
   pagesized=window.innerHeight/60;
   pagesized=Math.max(pagesized,10);
   pagesized=Math.min(pagesized,50);
   document.body.style.fontSize=pagesized;
}

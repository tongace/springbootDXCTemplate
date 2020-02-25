_browser = {};

function detectBrowser() {
    var uagent = navigator.userAgent.toLowerCase(),
        match = '';
    _browser.chrome = /webkit/.test(uagent) && /chrome/.test(uagent) && !/edge/.test(uagent);
    _browser.firefox = /mozilla/.test(uagent) && /firefox/.test(uagent);
    _browser.msie = /msie/.test(uagent) || /trident/.test(uagent) || /edge/.test(uagent);
    _browser.safari = /safari/.test(uagent) && /applewebkit/.test(uagent) && !/chrome/.test(uagent);
    _browser.opr = /mozilla/.test(uagent) && /applewebkit/.test(uagent) &&
        /chrome/.test(uagent) && /safari/.test(uagent) &&
        /opr/.test(uagent);
    _browser.version = '';
    for (x in _browser) {
        if (_browser[x]) {
            match = uagent.match(
                new RegExp("(" + (x === "msie" ? "msie|edge" : x) + ")( |\/)([0-9]+)")
            );
            if (match) {
                _browser.version = match[3];
            } else {
                match = uagent.match(new RegExp("rv:([0-9]+)"));
                _browser.version = match ? match[1] : "";
            }
            break;
        }
    }
    _browser.opera = _browser.opr;
    delete _browser.opr;
}
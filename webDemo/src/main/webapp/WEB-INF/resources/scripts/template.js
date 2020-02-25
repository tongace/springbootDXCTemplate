//<![CDATA[
$(document).ready(function () {
    // browser detection
    detectBrowser();
    if (!(_browser.chrome || (_browser.msie && _browser.version >= 11) || _browser.safari)) {
        window.location.replace("/demo/browserdoesnotsupport");
    }
    // end browser detection
    $.each($('form'), function (indexInArray, valueOfElement) {
        $(valueOfElement).on('submit', function (event) {
            event.preventDefault();
            return false;
        });
    });
    $('.ui.dimmer').dimmer({
        closable: false
    });
    $('body').on('click', '#menucaller', function () {
        $('.ui.sidebar')
            .sidebar('setting', 'transition', 'push')
            .sidebar('toggle');
    });
    // required for set active menu
    DXCUtils.setActiveMenu($('#currentScreenId').val());
    // end required for set active menu
    // menu and button authorization
    DXCUtils.authorizationRender($('#currentScreenId').val());
    // end menu and button authorization

    // timer
    var displayDBServerTime = function () {
        $.ajax({
            "async": true,
            "cache": false,
            "url": "/demo/common/dbservertime",
            "type": "GET"
        }).done(function (responseData, textStatus, jqXHR) {
            let dateTime = new Date(responseData);
            $('.time').text(moment(dateTime).format('DD MMM YYYY HH:mm:ss'));
            setInterval(function () {
                dateTime.setTime((dateTime.getTime() + 1000));
                $('.time').text(moment(dateTime).format('DD MMM YYYY HH:mm:ss'));
            }, 1000);
        });
    };
    // call displayDBServerTime immediately
    displayDBServerTime();
    // repeat call every 5 min to for update
    setInterval(displayDBServerTime, 300000);
});
//]]>
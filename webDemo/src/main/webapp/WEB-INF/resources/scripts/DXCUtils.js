var DXCUtils = (function ($) {
    // class properties
    return {
        COMBOBOX_ALL: 'All',
        COMBOBOX_SELECT: 'Select',
        toggleGroupMenu: function (obj) {
            var menuGroup = $(obj).parent();
            menuGroup.children(".menu").toggle();
            // hide all other menu group
            var allOtherMenuGroup = $(obj).parent().siblings();
            if (allOtherMenuGroup != null) {
                for (var ii = 0; ii < allOtherMenuGroup.length; ii++) {
                    var otherMenuGroup = allOtherMenuGroup[ii];
                    if ($(otherMenuGroup).children(".menu").is(':visible')) {
                        $(otherMenuGroup).children(".menu").hide();
                    }
                }
            }
            return false;
        },
        setActiveMenu: function (screenId) {
            var creenIdObj = $('#' + screenId)
            creenIdObj.toggleClass("active");
            creenIdObj.parent().show();
            creenIdObj.parent().parent().siblings().children(".menu").hide();
            return false;
        },
        authorizationRender: function (screenId) {
            // $.ajax({
            //         "async": true,
            //         "cache": false,
            //         "url": "/wBX0/common/rest/getAuthorizationInfo/" + screenId,
            //         "method": "GET"
            //     }).done(function (responseData, textStatus, jqXHR) {
            //         // menu group
            //         if (responseData.menuGroups[0] != null) {
            //             for (var ii = 0; ii < responseData.menuGroups.length; ii++) {
            //                 var menuGroupId = responseData.menuGroups[ii];
            //                 $("#" + menuGroupId).attr("data-auth", "yes");
            //             }
            //         }
            //         // menu subgroup
            //         if (responseData.menuSubGroups[0] != null) {
            //             for (var ii = 0; ii < responseData.menuSubGroups.length; ii++) {
            //                 var menuSubGroupId = responseData.menuSubGroups[ii];
            //                 $("#" + menuSubGroupId).attr("data-auth", "yes");
            //             }
            //         }
            //         // menu item
            //         if (responseData.menuItems[0] != null) {
            //             for (ii = 0; ii < responseData.menuItems.length; ii++) {
            //                 var menuItemId = responseData.menuItems[ii];
            //                 $("#" + menuItemId).attr("data-auth", "yes");
            //             }
            //         }
            //         // buuton
            //         if (responseData.alcButtons[0] != null) {
            //             for (ii = 0; ii < responseData.alcButtons.length; ii++) {
            //                 var alcButton = responseData.alcButtons[ii];
            //                 $("#" + alcButton).attr("data-auth", "yes");
            //             }
            //         }
            //         $("[data-auth='no']").empty();
            //         $("[data-auth='no']").remove();
            //     })
            //     .fail(function (jqXHR, textStatus, errorThrown) {
            //         console.log(jqXHR.status);
            //         console.log(errorThrown);
            //     });
        },
        createSelectOption: function (selectObj, comboList, firstItemText) {
            //selectObj.empty();
            selectObj.find('option').remove().end();
            if (firstItemText != null) {
                selectObj.append($('<option>', {
                    value: firstItemText,
                    text: firstItemText
                }));
            }
            if (comboList != null) {
                for (var ii = 0; ii < comboList.length; ii++) {
                    var item = comboList[ii];
                    selectObj.append($('<option>', {
                        value: item.value,
                        text: item.name
                    }));
                }
            }
        },
        getValueFromFieldOfForm: function (formId, fieldId) {
            return $('#' + formId).form('get field', fieldId).val();
        },
        formatDate: function (javaDate, format) {
            if (S(javaDate).isEmpty()) {
                return '';
            } else {
                return moment(new Date(javaDate)).format(format);
            }
        },
        parseDate: function (stringDate, format) {
            if (S(stringDate).isEmpty()) {
                return null;
            } else {
                return moment(stringDate, format).toDate();
            }
        },
        parseDateForDB: function (stringDate, format) {
            if (S(stringDate).isEmpty()) {
                return null;
            } else {
                return moment(stringDate, format).toDate().getTime();
            }
        },
        showLoading: function () {
            $('.pusher').ploading({
                useAddOns: ['plspinkit'],
                action: 'show',
                spinner: 'wave',
                maskColor: 'rgba(0, 0, 0, 0.9)',
                destroyAfterHide: true
            });
            $('body').css('overflow', 'hidden');
        },
        hideLoading: function () {
            $('.pusher').ploading({
                action: 'hide'
            });
            $('body').removeAttr('style');
        },
        comfirmModal: function (confirmMessage, params) {
            var messageCode = confirmMessage.substring(0, confirmMessage.indexOf(":"));
            $('#confirmingModal').children(".header").empty();
            $('#confirmingModal').children(".content").empty();
            $('#confirmingModal').children(".header").removeClass("yellow red green");
            $('#confirmingModal').children(".header").append(messageCode);
            if (params != null) {
                for (var indexInArray = 0; indexInArray < params.length; indexInArray++) {
                    var valueOfElement = params[indexInArray];
                    confirmMessage = confirmMessage.replace('{' + indexInArray + '}', valueOfElement);
                }
            }
            var firstConlon = confirmMessage.indexOf(':');
            var messageType = confirmMessage.substring(firstConlon - 3, firstConlon);
            switch (messageType) {
                case 'WRN':
                    $('#confirmingModal').children(".header").addClass("yellow");
                    break;
                case 'CFM':
                    $('#confirmingModal').children(".header").addClass("green");
                    break;
            }
            $('#confirmingModal').children(".content").append(confirmMessage);
            return $('#confirmingModal');
        },
        alertModal: function (alertMessage, params) {
            var messageCode = alertMessage.substring(0, alertMessage.indexOf(":"));
            $('#alertModal').children(".header").empty();
            $('#alertModal').children(".content").empty();
            $('#alertModal').children(".header").removeClass("yellow red green");
            $('#alertModal').children(".header").append(messageCode);
            if (params != null) {
                for (var indexInArray = 0; indexInArray < params.length; indexInArray++) {
                    var valueOfElement = params[indexInArray];
                    alertMessage = alertMessage.replace('{' + indexInArray + '}', valueOfElement);
                }
            }
            var firstConlon = alertMessage.indexOf(':');
            var messageType = alertMessage.substring(firstConlon - 3, firstConlon);
            switch (messageType) {
                case 'INF':
                    $('#alertModal').children(".header").addClass("green");
                    break;
                case 'WRN':
                    $('#alertModal').children(".header").addClass("yellow");
                    break;
                case 'ERR':
                    $('#alertModal').children(".header").addClass("red");
                    break;
            }
            $('#alertModal').children(".content").append(alertMessage);
            return $('#alertModal');
        },
        stringEmpty: function (param) {
            return (S(param).isEmpty() ? '' : param);
        },
        sumPropertyOfArrayOfObject: function (itemsArray, property) {
            if (_.isArray(itemsArray) === false) {
                return 0;
            } else {
                var sumVal = 0;
                if (itemsArray[0] != null) {
                    for (var indexInArray = 0; indexInArray < itemsArray.length; indexInArray++) {
                        var valueOfElement = itemsArray[indexInArray];
                        sumVal = sumVal + numeral(valueOfElement[property]).value();
                    }
                }
                return sumVal;
            }
        },
        maxPropertyOfArrayOfObject: function (itemsArray, property) {
            if (_.isArray(itemsArray) === false) {
                return null;
            } else {
                var dataArr = [];
                for (var ii = 0; ii < itemsArray.length; ii++) {
                    var objVal = itemsArray[ii][property];
                    if (S(objVal).isEmpty() == false) {
                        dataArr.push(objVal);
                    }
                }
                if (dataArr.length == 0) {
                    return null;
                } else {
                    return _.max(dataArr)
                }
            }
        },
        minPropertyOfArrayOfObject: function (itemsArray, property) {
            if (_.isArray(itemsArray) === false) {
                return null;
            } else {
                var dataArr = [];
                for (var ii = 0; ii < itemsArray.length; ii++) {
                    var objVal = itemsArray[ii][property];
                    if (S(objVal).isEmpty() == false) {
                        dataArr.push(objVal);
                    }
                }
                if (dataArr.length == 0) {
                    return null;
                } else {
                    return _.min(dataArr)
                }
            }
        },
        checkDuplicatedUploadFiles: function (uploadingFileArray, uploadedFileDataTableId) {
            var uploadedFile = [];
            var dataTableId = '#' + uploadedFileDataTableId;
            if ($.fn.DataTable.isDataTable(dataTableId)) {
                var uploadedFileArray = $(dataTableId).DataTable().rows().data().toArray();
                for (var ii = 0; ii < uploadedFileArray.length; ii++) {
                    uploadedFile.push(uploadedFileArray[ii].fileName);
                }
            }
            var uploadingFileName = null;
            for (var ii = 0; ii < uploadingFileArray.length; ii++) {
                uploadingFileName = uploadingFileArray[ii].name;
                console.log('uploadingFileName>>>>>' + uploadingFileName);
                if (_.contains(uploadedFile, uploadingFileName) == true) {
                    return true;
                } else {
                    uploadedFile.push(uploadingFileName);
                }
                console.log(uploadedFile);
            }
            return false;
        },
        partNoFormat: function (partNo) {
            if (partNo != null && partNo.length > 0) {
                if (partNo.length > 10) {
                    return partNo.substring(0, 5).concat("-").concat(partNo.substring(5, 10)).concat("-").concat(partNo.substring(10));
                } else if (partNo.length > 5) {
                    return partNo.substring(0, 5).concat("-").concat(partNo.substring(5));
                }
            }
            return partNo;
        },
        focusFirstError: function () {
            var elem = $('.field.error:first').find('input,select,textarea');
            setTimeout(function () {
                $('html, body').animate({
                    scrollTop: $($(elem)[0]).closest('div').offset().top - 100
                }, 'fast', function () {
                    if ($($(elem)[0]).attr("type") != "checkbox") {
                        $(elem).focus();
                    }
                });
            }, 500);
        },
        scrollTop: function () {
            $('html, body').animate({
                scrollTop: 0
            }, 'fast');
        },
        testInternetConnection: function (errorMessage) {
            $.ajax({
                url: "https://www.gstatic.com/charts/45.1/loader.js",
                dataType: 'jsonp',
                "cache": false
            }).done(function (response) {
                console.log("Connection active!");
                dfr.resolve();
            }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
                console.log("error status:" + XMLHttpRequest.status);
                console.log("error message:" + errorThrown);
                if (XMLHttpRequest.status == 404) {
                    var modal = ESPIUtils.alertModal(errorMessage, null);
                    modal.modal({
                        closable: false,
                        selector: {
                            close: '#modalButtonOK'
                        }
                    });
                    modal.modal('show');
                }
            });
        },
        clearMessageRulesErrors: function (selectObj) {
            var $field = selectObj.find('input, textarea, select'),
                $group = selectObj.find('.field');
            $field
                .each(function () {
                    var
                        $field = $(this),
                        $fieldGroup = $field.closest($group),
                        $prompt = $fieldGroup.find('.prompt.label'),
                        isErrored = $fieldGroup.hasClass('error');
                    if (isErrored) {
                        $fieldGroup.removeClass('error');
                        $prompt.remove();
                    }
                });
        },
        // 0 is equal,-1 less than, 1 more than,2 not same type
        compareNumber: function (numberObj1, numberObj2) {
            if (numberObj1 == null && numberObj2 == null) {
                return 0;
            }
            if (numberObj1 !== numberObj2) {
                return 2;
            }
            if (numberObj1 > numberObj2) {
                return 1;
            } else {
                return -1;
            }
        },
    }
}(jQuery));
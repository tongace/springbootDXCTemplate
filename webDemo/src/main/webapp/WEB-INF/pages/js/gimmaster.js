//<![CDATA[
var WDXC0001 = (function ($) {
    return {
        getGimTypeCombo: function () {
            return $.ajax({
                "async": true,
                "url":"/demo/combo/gimtypecombo" ,
                "method": "GET",
                "cache": false
            });
        },
        getActiveFlagCombo: function () {
            return $.ajax({
                "async": true,
                "url": "/demo/combo/activeflagcombo",
                "method": "GET",
                "cache": false
            });
        },
        saveGimHeaderData: function (formData) {
            $.ajax({
                "async": true,
                "url": "/demo/gimmaster/gimheader",
                "type": "PUT",
                "contentType": "application/json; charset=utf-8",
                "data": JSON.stringify(formData),
                "cache": false
            }).done(function (responseData, textStatus, jqXHR) {
                if (responseData.message == null || responseData.message == '') {
                    $('#gimHeaderEditSection').fadeOut(600, function () {
                        $('#gimHeaderSearchSection').fadeIn(600);
                    });
                    // set save message
                    if (responseData.rowCount > 0) {
                        var modal = DXCUtils.alertModal('[[#{MSTD0101AINF}]]', null);
                        modal.modal({
                            selector: {
                                close: '#modalButtonOK'
                            }
                        });
                        modal.modal('show');
                    } else {
                        var modal = DXCUtils.alertModal('[[#{MBX00009AERR}]]', null);
                        modal.modal({
                            selector: {
                                close: '#modalButtonOK'
                            }
                        });
                        modal.modal('show');
                    }
                    var formData = $('#gimHeaderForm').form('get values');
                    WDXC0001.populateGIMHeaderDatatable(formData);
                    // reload gim type
                    $.ajax({
                        "async": true,
                        "url": "/demo/combo/gimtypecombo",
                        "method": "GET",
                        "cache": false
                    }).done(function (responseData, textStatus, jqXHR) {
                        var formData = $('#gimHeaderForm').form('get values');
                        DXCUtils.createSelectOption($('#gimHeaderForm [name="searchGimTypes"]'), responseData, null);
                        $('#gimHeaderForm [name="searchGimTypes"]').dropdown({
                            forceSelection: false
                        });
                        $('#gimHeaderForm [name="searchGimTypes"]').dropdown('set exactly', formData.searchGimTypes);
                    });
                } else {
                    var modal = DXCUtils.alertModal(responseData.message, null);
                    modal.modal({
                        selector: {
                            close: '#modalButtonOK'
                        }
                    });
                    modal.modal('show');
                }
            });
        },
        populateGIMHeaderDatatable: function (formData) {
            DXCUtils.showLoading();
            $.ajax({
                "async": true,
                "url": "/demo/gimmaster/gimheader",
                "type": "POST",
                "contentType": "application/json; charset=utf-8",
                "data": JSON.stringify(formData),
                "cache": false
            }).done(function (responseData, textStatus, jqXHR) {
                console.log(responseData);
                if ($.isEmptyObject(responseData.datas) == false) {
                    $("#WDXC0001Edit").show();
                } else {
                    $("#WDXC0001Edit").hide();
                }
                if (S(responseData.message).isEmpty() == false) {
                    var modal = DXCUtils.alertModal(responseData.message, null);
                    modal.modal({
                        selector: {
                            close: '#modalButtonOK'
                        }
                    });
                    modal.modal('show');
                    $('#searchResultSection').hide();
                } else {
                    $('#searchResultSection').show();
                }
                // datatable
                var gimheaderTable = $("#tableGimTypeHeaderResult").DataTable({
                    "data": responseData.datas,
                    "destroy": true,
                    "deferRender": true,
                    "responsive": true,
                    "stateSave": true,
                    "order": [
                        [1, "asc"]
                    ],
                    "columns": [{
                            "data": "gimType",
                            "searchable": false,
                            "orderable": false,
                            "className": "dt-body-center",
                            "render": function (data, type, row) {
                                return ('<input type="checkbox" name="chkGimHeader" value="' + data + '"/>');
                            },
                            "title": '<a href="#" onclick="return WDXC0001.clearHeaderCheckBox()"><i class="large square outline icon"/></a>'
                        },
                        {
                            "data": "gimType",
                            "orderable": true,
                            "searchable": true,
                            "className": "dt-body-left",
                            "render": function (data, type, row) {
                                return '<a href="#" onclick="return WDXC0001.gimTypeSelect(this);">' + data + '</a>';
                            }
                        },
                        {
                            "data": "gimDesc",
                            "orderable": true,
                            "searchable": true
                        },
                        {
                            "data": "cdLength",
                            "orderable": true,
                            "className": "dt-body-right"
                        },
                        {
                            "data": "field1Label",
                            "orderable": true,
                            "searchable": true
                        },
                        {
                            "data": "field2Label",
                            "orderable": true,
                            "searchable": true
                        },
                        {
                            "data": "field3Label",
                            "orderable": true,
                            "searchable": true
                        },
                        {
                            "data": "displayActiveFlag",
                            "orderable": true,
                            "className": "dt-body-center"
                        },
                        {
                            "data": "modifiedBy",
                            "orderable": true
                        },
                        {
                            "data": "modifiedDt",
                            "orderable": true,
                            "render": function (data, type, row) {
                                return DXCUtils.formatDate(data, "DD/MM/YYYY HH:mm:ss");
                            }
                        }
                    ]
                });
                DXCUtils.hideLoading();
            });
        },
        // for outside this document.ready scope can call such as html element onclick
        gimTypeSelect: function (obj) {
            // set select class
            $(obj).addClass("selected");
            var gimHeaderDataTable = $('#tableGimTypeHeaderResult').DataTable();
            $.each(gimHeaderDataTable.rows().nodes(), function (indexInArray, valueOfElement) {
                if ($(valueOfElement).find("a").hasClass("selected")) {
                    $('#selectedGimHeaderDiv').text(JSON.stringify(gimHeaderDataTable.row(valueOfElement).data()));
                    return;
                }
            });
            $('#gimHeaderSearchSection').fadeOut(600, function () {
                $('#gimDetailSection').fadeIn(600);
            });
            var gimDetailTable = $("#tableGimDetailResult").DataTable();
            gimDetailTable.state.clear();
            gimDetailTable.destroy();
            WDXC0001.searchGimDetail();

            return false;
        },
        setGimDetailFormLabel: function () {
            var selectedGimHeader = JSON.parse($('#selectedGimHeaderDiv').text());
            // assign Gim Code,Field1,2,3 label
            $('#detailGimCodeLabel').text('[[#{BX0.WDXC0001.Label.Code}]]' + ' (' + selectedGimHeader.cdLength + ')');
            $('#detailField1Label').text(selectedGimHeader.field1Label);
            $('#detailField2Label').text(selectedGimHeader.field2Label);
            $('#detailField3Label').text(selectedGimHeader.field3Label);
            if (selectedGimHeader.field1Label == 'Not Used') {
                $('#editGimDetailForm').find('input[name="field1"]').parent().addClass("readonly");
                $('#editGimDetailForm').find('input[name="field1"]').prop("readonly", true);
                $('#editGimDetailForm').find('input[name="field1"]').parent().removeClass("mandatory");
            } else {
                $('#editGimDetailForm').find('input[name="field1"]').parent().removeClass("readonly");
                $('#editGimDetailForm').find('input[name="field1"]').prop("readonly", false);
                $('#editGimDetailForm').find('input[name="field1"]').parent().addClass("mandatory");
            }
            if (selectedGimHeader.field2Label == 'Not Used') {
                $('#editGimDetailForm').find('input[name="field2"]').parent().addClass("readonly");
                $('#editGimDetailForm').find('input[name="field2"]').prop("readonly", true);
                $('#editGimDetailForm').find('input[name="field2"]').parent().removeClass("mandatory");
            } else {
                $('#editGimDetailForm').find('input[name="field2"]').parent().removeClass("readonly");
                $('#editGimDetailForm').find('input[name="field2"]').prop("readonly", false);
                $('#editGimDetailForm').find('input[name="field2"]').parent().addClass("mandatory");
            }
            if (selectedGimHeader.field3Label == 'Not Used') {
                $('#editGimDetailForm').find('input[name="field3"]').parent().addClass("readonly");
                $('#editGimDetailForm').find('input[name="field3"]').prop("readonly", true);
                $('#editGimDetailForm').find('input[name="field3"]').parent().removeClass("mandatory");
            } else {
                $('#editGimDetailForm').find('input[name="field3"]').parent().removeClass("readonly");
                $('#editGimDetailForm').find('input[name="field3"]').prop("readonly", false);
                $('#editGimDetailForm').find('input[name="field3"]').parent().addClass("mandatory");
            }
            $('#editGimDetailForm').find('input[name="gimType"]').parent().addClass("readonly");
            $('#editGimDetailForm').find('input[name="gimType"]').prop("readonly", true);
        },
        searchGimDetail: function () {
            WDXC0001.populateGIMDetailDatatable(false);
        },
        populateGIMDetailDatatable: function (saveMessage) {
            DXCUtils.showLoading();
            var gimHeaderObj = JSON.parse($('#selectedGimHeaderDiv').text());
            var dataForSubmit = {};
            dataForSubmit.gimType = gimHeaderObj.gimType;
            $.ajax({
                "async": true,
                "url": "/demo/gimmaster/gimdetail",
                "type": "POST",
                "contentType": "application/json; charset=utf-8",
                "data": JSON.stringify(dataForSubmit),
                "cache": false
            }).done(function (responseData, textStatus, jqXHR) {
                if ($.isEmptyObject(responseData.datas) == false) {
                    $('#WDXC0001EditDetail').show();
                    $('#WDXC0001DeleteDetail').show();
                } else {
                    $('#WDXC0001EditDetail').hide();
                    $('#WDXC0001DeleteDetail').hide();
                }
                // datatable
                var gimDetailTable = $("#tableGimDetailResult").DataTable({
                    "data": responseData.datas,
                    "destroy": true,
                    "deferRender": true,
                    "responsive": true,
                    "stateSave": true,
                    "order": [
                        [1, "asc"],
                        [2, "asc"]
                    ],
                    "columns": [{
                            "data": "gimType",
                            "searchable": false,
                            "orderable": false,
                            "className": "dt-body-center collapsing",
                            "render": function (data, type, row) {
                                return ('<input type="checkbox" name="chkGimDetail" value="' + data + '"/>');
                            },
                            "title": '<a href="#" onclick="return WDXC0001.clearDetailCheckBox()"><i class="large square outline icon"/></a>'
                        },
                        {
                            "data": "gimType",
                            "orderable": true,
                            "searchable": true
                        },
                        {
                            "data": "gimCd",
                            "orderable": true,
                            "searchable": true,
                            "render": function (data, type, full, meta) {
                                return '<div style="max-width: 200px; word-wrap: break-word;">' + ((data == null) ? '' : data) + '</div>';
                            }
                        },
                        {
                            "data": "gimValue",
                            "orderable": true,
                            "render": function (data, type, full, meta) {
                                return '<div style="max-width: 200px; word-wrap: break-word;">' + ((data == null) ? '' : data) + '</div>';
                            }
                        },
                        {
                            "data": "field1",
                            "orderable": true,
                            "searchable": true,
                            "title": gimHeaderObj.field1Label,
                            "render": function (data, type, full, meta) {
                                return '<div style="max-width: 200px; word-wrap: break-word;">' + ((data == null) ? '' : data) + '</div>';
                            }
                        },
                        {
                            "data": "field2",
                            "orderable": true,
                            "searchable": true,
                            "title": gimHeaderObj.field2Label,
                            "render": function (data, type, full, meta) {
                                return '<div style="max-width: 200px; word-wrap: break-word;">' + ((data == null) ? '' : data) + '</div>';
                            }
                        },
                        {
                            "data": "field3",
                            "orderable": true,
                            "searchable": true,
                            "title": gimHeaderObj.field3Label,
                            "render": function (data, type, full, meta) {
                                return '<div style="max-width: 200px; word-wrap: break-word;">' + ((data == null) ? '' : data) + '</div>';
                            }
                        },
                        {
                            "data": "displayActiveFlag",
                            "orderable": true,
                            "className": "dt-body-center"
                        },
                        {
                            "data": "displayModifiedBy",
                            "orderable": true
                        },
                        {
                            "data": "modifiedDt",
                            "orderable": true,
                            "render": function (data, type, row) {
                                return DXCUtils.formatDate(data, "DD/MM/YYYY HH:mm:ss");
                            }
                        }
                    ]
                });
                gimDetailTable.columns.adjust().responsive.recalc();
                DXCUtils.hideLoading();
            });
        },
        saveGimDetail: function (formData) {
            $.ajax({
                "async": true,
                "url": "/demo/gimmaster/gimdetail",
                "type": "PUT",
                "contentType": "application/json; charset=utf-8",
                "data": JSON.stringify(formData),
                "cache": false
            }).done(function (responseData, textStatus, jqXHR) {
                if (responseData.message == null || responseData.message == '') {
                    $('#gimDetailEditSection').fadeOut(600, function () {
                        $('#gimDetailSection').fadeIn(600);
                    });
                    // set save message
                    if (responseData.rowCount > 0) {
                        var modal = DXCUtils.alertModal('[[#{MSTD0101AINF}]]', null);
                        modal.modal({
                            selector: {
                                close: '#modalButtonOK'
                            }
                        });
                        modal.modal('show');
                    } else {
                        var modal = DXCUtils.alertModal('[[#{MBX00009AERR}]]', null);
                        modal.modal({
                            selector: {
                                close: '#modalButtonOK'
                            }
                        });
                        modal.modal('show');
                    }
                    WDXC0001.populateGIMDetailDatatable(true);
                } else {
                    var modal = DXCUtils.alertModal(responseData.message, null);
                    modal.modal({
                        selector: {
                            close: '#modalButtonOK'
                        }
                    });
                    modal.modal('show');
                }
            });
        },
        clearHeaderCheckBox: function () {
            var gimHeaderTable = $("#tableGimTypeHeaderResult").DataTable();
            gimHeaderTable.$('[name="chkGimHeader"]').prop('checked', false);
        },
        clearDetailCheckBox: function () {
            var gimHeaderTable = $("#tableGimDetailResult").DataTable();
            gimHeaderTable.$('[name="chkGimDetail"]').prop('checked', false);
        },
    }
}(jQuery));
$(document).ready(function () {
    // datatable moment date time sorting
    $.fn.dataTable.moment('DD/MM/YYYY HH:mm:ss');
    $("#WDXC0001Edit").hide();
    $.when(WDXC0001.getGimTypeCombo())
        .done(function (responseData) {
            DXCUtils.createSelectOption($('#gimHeaderForm [name="searchGimTypes"]'), responseData, null);
            $('#gimHeaderForm [name="searchGimTypes"]').dropdown({
                forceSelection: false
            });
        });
    $.when(WDXC0001.getActiveFlagCombo())
        .done(function (responseData) {
            DXCUtils.createSelectOption($('#gimHeaderForm [name="searchActiveFlag"]'), responseData, DXCUtils.COMBOBOX_ALL);
            $('#gimHeaderForm [name="searchActiveFlag"]').dropdown({
                forceSelection: false
            });
            DXCUtils.createSelectOption($('#editGimHeaderForm [name="activeFlag"]'), responseData, DXCUtils.COMBOBOX_SELECT);
            $('#editGimHeaderForm [name="activeFlag"]').dropdown({
                forceSelection: false
            });
            DXCUtils.createSelectOption($('#editGimDetailForm [name="detaiActiveFlag"]'), responseData, DXCUtils.COMBOBOX_SELECT);
            $('#editGimDetailForm [name="detaiActiveFlag"]').dropdown({
                forceSelection: false
            });
        });
    // end combo
    // button
    var WDXC0001SearchClick;
    $('#WDXC0001Search').on('click', _.debounce(function (event) {
        var gimheaderTable = $("#tableGimTypeHeaderResult").DataTable();
        gimheaderTable.state.clear();
        gimheaderTable.destroy();
        if ($('#gimHeaderForm').form('is valid')) {
            var formData = $('#gimHeaderForm').form('get values');
            WDXC0001.populateGIMHeaderDatatable(formData);
        }

        return false;
    }, 300, true));
    var WDXC0001SaveClick;
    $('#WDXC0001Save').on('click', _.debounce(function (event) {
        event.preventDefault();
        var modal = DXCUtils.comfirmModal('[[#{MSTD0006ACFM}]]', null);
        modal.modal({
            closable: false,
            onDeny: function () {
                return true;
            },
            onApprove: function () {
                if ($('#editGimHeaderForm').form('is valid')) {
                    var formData = $('#editGimHeaderForm').form('get values');
                    WDXC0001.saveGimHeaderData(formData);
                }
            }
        }).modal('show');

    }, 300, true));
    var WDXC0001CancelClick;
    $('#WDXC0001Cancel').on('click', _.debounce(function (event) {
        event.preventDefault();
        var modal = DXCUtils.comfirmModal('[[#{MBX0000MACFM}]]', null);
        modal.modal({
            closable: false,
            onDeny: function () {
                return true;
            },
            onApprove: function () {
                $('#gimHeaderEditSection').fadeOut(600, function () {
                    $('#gimHeaderSearchSection').fadeIn(600);
                });

            }
        }).modal('show');
    }, 300, true));
    var WDXC0001AddClick;
    $('#WDXC0001Add').on('click', _.debounce(function (event) {
        event.preventDefault();
        $('#gimHeaderSearchSection').fadeOut(600, function () {
            $('#gimHeaderEditSection').fadeIn(600);
        });
        $('#editGimHeaderForm').find('input[name="gimType"]').parent().removeClass("readonly");
        $('#editGimHeaderForm').find('input[name="gimType"]').prop("readonly", false);
        $('#editGimHeaderForm').form('reset');
        // set not used for field1,2,3 label and mode
        $('#editGimHeaderForm').form('set values', {
            field1Label: 'Not Used',
            field2Label: 'Not Used',
            field3Label: 'Not Used',
            mode: DXCUtils.MODE_ADD
        });

        return false;
    }, 300, true));
    var WDXC0001EditClick;
    $('#WDXC0001Edit').on('click', _.debounce(function (event) {
        event.preventDefault();
        // check only one GIM Header data row to be edited
        var gimHeaderTable = $('#tableGimTypeHeaderResult').DataTable();
        var countChecked = gimHeaderTable.rows().nodes().to$().find(':checked[name="chkGimHeader"]').length;

        if (countChecked != 1) {
            var modal = DXCUtils.alertModal('[[#{MSTD1017AERR}]]', null);
            modal.modal({
                selector: {
                    close: '#modalButtonOK'
                }
            });
            modal.modal('show');
        } else {
            var editHeaderDataSelection = {};
            $.each(gimHeaderTable.rows().nodes(), function (index, value) {
                if ($(value).find('[name="chkGimHeader"]').prop('checked') == true) {
                    editHeaderDataSelection = gimHeaderTable.row(value).data();
                    return;
                }
            });
            editHeaderDataSelection.mode = "edit";
            $('#editGimHeaderForm').find('input[name="gimType"]').parent().addClass("readonly");
            $('#editGimHeaderForm').find('input[name="gimType"]').prop("readonly", true);
            $('#editGimHeaderForm').form('reset');
            $('#editGimHeaderForm').form('set values', editHeaderDataSelection);
            $('#gimHeaderSearchSection').fadeOut(600, function () {
                $('#gimHeaderEditSection').fadeIn(600);
            });
        }

        return false;
    }, 300, true));
    var WDXC0001ClearClick;
    $('#WDXC0001Clear').on('click', _.debounce(function (event) {
        event.preventDefault();
        $('#gimHeaderForm').form('reset');
        var datatable = $("#tableGimTypeHeaderResult").DataTable();
        datatable.clear().draw();
        $("#WDXC0001Edit").hide();
        $("#searchResultSection").hide();

        return false;
    }, 300, true));
    // end button

    // form validation
    $('#gimHeaderForm').form({
        fields: {
            searchGimDesc: {
                identifier: 'searchGimDesc',
                rules: [{
                        type: 'maxLength[200]'
                    },
                    {
                        type: 'regExp[/^$|^[^\s]+(\s+[^\s]+)*$/]'
                    }
                ]
            }
        },
        inline: true,
        on: 'blur'
    });
    // modal validation
    $('#editGimHeaderForm').form({
        fields: {
            gimType: {
                identifier: 'gimType',
                rules: [{
                        type: 'empty'
                    },
                    {
                        type: 'regExp[/^$|^[^\s]+(\s+[^\s]+)*$/]'
                    },
                    {
                        type: 'maxLength[50]'
                    }
                ]
            },
            gimDesc: {
                identifier: 'gimDesc',
                rules: [{
                        type: 'empty',
                    },
                    {
                        type: 'regExp[/^$|^[^\s]+(\s+[^\s]+)*$/]'
                    },
                    {
                        type: 'maxLength[200]'
                    }
                ]
            },
            cdLength: {
                identifier: 'cdLength',
                rules: [{
                        type: 'empty'
                    },
                    {
                        type: 'regExp[/^$|^[^\s]+(\s+[^\s]+)*$/]'
                    },
                    {
                        type: 'integer[1..500]'
                    }
                ]
            },
            field1Label: {
                identifier: 'field1Label',
                rules: [{
                        type: 'empty'
                    },
                    {
                        type: 'regExp[/^$|^[^\s]+(\s+[^\s]+)*$/]'
                    },
                    {
                        type: 'maxLength[50]'
                    }
                ]
            },
            field2Label: {
                identifier: 'field2Label',
                rules: [{
                        type: 'empty'
                    },
                    {
                        type: 'regExp[/^$|^[^\s]+(\s+[^\s]+)*$/]'
                    },
                    {
                        type: 'maxLength[50]'
                    }
                ]
            },
            field3Label: {
                identifier: 'field3Label',
                rules: [{
                        type: 'empty'
                    },
                    {
                        type: 'regExp[/^$|^[^\s]+(\s+[^\s]+)*$/]'
                    },
                    {
                        type: 'maxLength[50]'
                    }
                ]
            },
            activeFlag: {
                identifier: 'activeFlag',
                rules: [{
                    type: 'not[Select]'
                }]
            }
        },
        inline: true,
        on: 'blur'
    });

    //////////// ##################### Detail #################################
    // ############## Button #########################
    var WDXC0001BackClick;
    $('#WDXC0001Back').on('click', _.debounce(function (event) {
        event.preventDefault();
        $('#gimDetailSection').fadeOut(600, function () {
            $('#gimHeaderSearchSection').fadeIn(600);
            var formData = $('#gimHeaderForm').form('get values');
            WDXC0001.populateGIMHeaderDatatable(formData);

        });
    }, 300, true));
    var WDXC0001AddDetailClick;
    $('#WDXC0001AddDetail').on('click', _.debounce(function (event) {
        event.preventDefault();
        var selectedGimHeader = JSON.parse($('#selectedGimHeaderDiv').text());
        WDXC0001.setGimDetailFormLabel();
        // reset
        $('#editGimDetailForm').form('reset');
        // set value
        $('#editGimDetailForm').form('set values', {
            gimType: selectedGimHeader.gimType,
            mode: DXCUtils.MODE_ADD
        });
        $('#editGimDetailForm').find('input[name="gimCd"]').parent().removeClass("readonly");
        $('#editGimDetailForm').find('input[name="gimCd"]').prop("readonly", false);
        $('#gimDetailSection').fadeOut(600, function () {
            $('#gimDetailEditSection').fadeIn(600);
        });
    }, 300, true));
    var WDXC0001EditDetailClick;
    $('#WDXC0001EditDetail').on('click', _.debounce(function (event) {
        event.preventDefault();
        var gimDetailDatatable = $('#tableGimDetailResult').DataTable();
        var countChecked = gimDetailDatatable.rows().nodes().to$().find(':checked[name="chkGimDetail"]').length;

        if (countChecked != 1) {
            var modal = DXCUtils.alertModal('[[#{MSTD1017AERR}]]', null);
            modal.modal({
                selector: {
                    close: '#modalButtonOK'
                }
            });
            modal.modal('show');
        } else {
            WDXC0001.setGimDetailFormLabel();
            var editGimDetailObj = {};
            $.each(gimDetailDatatable.rows().nodes(), function (index, node) {
                if ($(node).find('[name="chkGimDetail"]').prop('checked') == true) {
                    editGimDetailObj = gimDetailDatatable.row(node).data();
                    return;
                }
            });
            editGimDetailObj.mode = DXCUtils.MODE_EDIT;
            // clear
            $('#editGimDetailForm').form('reset');
            // set value
            $('#editGimDetailForm').form('set values', editGimDetailObj);
            $('#editGimDetailForm').find('input[name="gimCd"]').parent().addClass("readonly");
            $('#editGimDetailForm').find('input[name="gimCd"]').prop("readonly", true);
            $('#gimDetailSection').fadeOut(600, function () {
                $('#gimDetailEditSection').fadeIn(600);
            });
        }

        return false;
    }, 300, true));
    var WDXC0001DeleteDetailClick;
    $('#WDXC0001DeleteDetail').on('click', _.debounce(function (event) {
        event.preventDefault();
        var gimDetailDatatable = $('#tableGimDetailResult').DataTable();
        var countChecked = gimDetailDatatable.rows().nodes().to$().find(':checked[name="chkGimDetail"]').length;
        if (countChecked == 0) {
            var modal = DXCUtils.alertModal('[[#{MBX00006AERR}]]', null);
            modal.modal({
                selector: {
                    close: '#modalButtonOK'
                }
            });
            modal.modal('show');
        } else {
            var modal = DXCUtils.comfirmModal('[[#{MBX00001ACFM}]]', null);
            modal.modal({
                closable: false,
                onDeny: function () {
                    return true;
                },
                onApprove: function () {
                    var deleteGimDetailArr = [];
                    $.each(gimDetailDatatable.rows().nodes(), function (index, node) {
                        if ($(node).find('[name="chkGimDetail"]').prop('checked') == true) {
                            deleteGimDetailArr.push(gimDetailDatatable.row(node).data());
                            return;
                        }
                    });
                    $.ajax({
                        "async": true,
                        "url": "/demo/gimmaster/gimdetail",
                        "type": "DELETE",
                        "contentType": "application/json; charset=utf-8",
                        "data": JSON.stringify(deleteGimDetailArr),
                        "cache": false
                    }).done(function (responseData, textStatus, jqXHR) {
                        if (responseData.message == null || responseData.message == '') {
                            // set delete message
                            if (responseData.rowCount > 0) {
                                var modal = DXCUtils.alertModal('[[#{MSTD0090AINF}]]', null);
                                modal.modal({
                                    selector: {
                                        close: '#modalButtonOK'
                                    }
                                });
                                modal.modal('show');
                            } else {
                                var modal = DXCUtils.alertModal('[[#{MBX00009AERR}]]', null);
                                modal.modal({
                                    selector: {
                                        close: '#modalButtonOK'
                                    }
                                });
                                modal.modal('show');
                            }
                            WDXC0001.populateGIMDetailDatatable(true);
                        } else {
                            var modal = DXCUtils.alertModal(responseData.message, null);
                            modal.modal({
                                selector: {
                                    close: '#modalButtonOK'
                                }
                            });
                            modal.modal('show');
                        }
                    });
                }
            }).modal('show');
        }

        return false;
    }, 300, true));
    var WDXC0001DetailSaveClick;
    $('#WDXC0001DetailSave').on('click', _.debounce(function (event) {
        event.preventDefault();
        var modal = DXCUtils.comfirmModal('[[#{MSTD0006ACFM}]]', null);
        modal.modal({
            closable: false,
            onDeny: function () {
                return true;
            },
            onApprove: function () {
                if ($('#editGimDetailForm').form('is valid')) {
                    var formData = $('#editGimDetailForm').form('get values');
                    WDXC0001.saveGimDetail(formData);

                }
            }
        }).modal('show');
    }, 300, true));
    var WDXC0001DetailCancelClick;
    $('#WDXC0001DetailCancel').on('click', _.debounce(function (event) {
        event.preventDefault();
        var modal = DXCUtils.comfirmModal('[[#{MBX0000MACFM}]]', null);
        modal.modal({
            closable: false,
            onDeny: function () {
                return true;
            },
            onApprove: function () {
                $('#gimDetailEditSection').fadeOut(600, function () {
                    $('#gimDetailSection').fadeIn(600);
                });

            }
        }).modal('show');
    }, 300, true));
    // ############## End Button #########################
    // Detail validation
    $.fn.form.settings.rules.validationGimCodeLenth = function (value) {
        var gimHeaderObj = JSON.parse($('#selectedGimHeaderDiv').text());
        return value.length <= gimHeaderObj.cdLength;
    };
    $.fn.form.settings.rules.validationField1 = function (value) {
        var gimHeaderObj = JSON.parse($('#selectedGimHeaderDiv').text());
        return (gimHeaderObj.field1Label == 'Not Used' || (gimHeaderObj.field1Label != 'Not Used' && value != ''));
    };
    $.fn.form.settings.rules.validationField2 = function (value) {
        var gimHeaderObj = JSON.parse($('#selectedGimHeaderDiv').text());
        return (gimHeaderObj.field2Label == 'Not Used' || (gimHeaderObj.field2Label != 'Not Used' && value != ''));
    };
    $.fn.form.settings.rules.validationField3 = function (value) {
        var gimHeaderObj = JSON.parse($('#selectedGimHeaderDiv').text());
        return (gimHeaderObj.field3Label == 'Not Used' || (gimHeaderObj.field3Label != 'Not Used' && value != ''));
    };
    $('#editGimDetailForm').form({
        fields: {
            gimType: {
                identifier: 'gimType',
                rules: [{
                        type: 'empty'
                    },
                    {
                        type: 'regExp[/^$|^[^\s]+(\s+[^\s]+)*$/]'
                    },
                    {
                        type: 'maxLength[50]'
                    }
                ]
            },
            gimCd: {
                identifier: 'gimCd',
                rules: [{
                        type: 'empty'
                    },
                    {
                        type: 'regExp[/^$|^[^\s]+(\s+[^\s]+)*$/]'
                    },
                    {
                        type: 'validationGimCodeLenth',
                        prompt: '[[#{MBX01005AERR}]]'
                    }
                ]
            },
            gimValue: {
                identifier: 'gimValue',
                rules: [{
                        type: 'empty'
                    },
                    {
                        type: 'regExp[/^$|^[^\s]+(\s+[^\s]+)*$/]'
                    },
                    {
                        type: 'maxLength[2000]'
                    }
                ]
            },
            field1: {
                identifier: 'field1',
                rules: [{
                        type: 'validationField1'
                    },
                    {
                        type: 'regExp[/^$|^[^\s]+(\s+[^\s]+)*$/]'
                    },
                    {
                        type: 'maxLength[4000]'
                    }
                ]
            },
            field2: {
                identifier: 'field2',
                rules: [{
                        type: 'validationField2',
                        prompt: '[[#{MBX01002AERR}]]'
                    },
                    {
                        type: 'regExp[/^$|^[^\s]+(\s+[^\s]+)*$/]'
                    },
                    {
                        type: 'maxLength[4000]'
                    }
                ]
            },
            field3: {
                identifier: 'field3',
                rules: [{
                        type: 'validationField3',
                        prompt: '[[#{MBX01002AERR}]]'
                    },
                    {
                        type: 'regExp[/^$|^[^\s]+(\s+[^\s]+)*$/]'
                    },
                    {
                        type: 'maxLength[4000]'
                    }
                ]
            },
            activeFlag: {
                identifier: 'activeFlag',
                rules: [{
                    type: 'not[Select]',
                    prompt: '[[#{MBX01001AERR}]]'
                }]
            }
        },
        inline: true,
        on: 'blur'
    });
});
//]]>
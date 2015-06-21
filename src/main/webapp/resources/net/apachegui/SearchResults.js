require(["dojo/_base/declare",
         "dojox/grid/DataGrid",
         "dojo/store/Memory",
         "dojo/data/ObjectStore",
         "dojo/request"
], function(declare, DataGrid, Memory, ObjectStore, request) {
    declare("net.apachegui.SearchResults", null, {

        generateGrid: function (query) {

            var thisdialog = net.apachegui.Util.noCloseDialog('Loading', 'Generating Results, please wait...');
            thisdialog.show();

            request.get("../web/SearchResults?option=window&query=" + query, {
                handleAs: "json"
            }).then(
                function (data) {
                    var dataStore = new ObjectStore({objectStore: new Memory({data: data.items})});

                    var grid = new DataGrid({
                        store: dataStore,
                        query: {id: "*"},
                        queryOptions: {},
                        clientSort: false,
                        selectable: true,
                        autoHeight: true,
                        rowSelector: '20px',
                        structure: [
                            {name: "Result", field: "id", width: "75px"},
                            {name: "InsertDate", field: "insertDate", width: "auto"},
                            {name: "Host", field: "host", width: "auto"},
                            {name: "UserAgent", field: "userAgent", width: "auto"},
                            {name: "Request String", field: "requestString", width: "auto"},
                            {name: "Status", field: "status", width: "auto"},
                            {name: "Content Size", field: "contentSize", width: "auto"}
                        ]
                    }, "grid");
                    grid.startup();

                    thisdialog.remove();
                },
                function(error) {
                    thisdialog.remove();
                    net.apachegui.Util.alert('Error',error.response.data.message);
                });

        }
    });

    net.apachegui.Util.setupSingletonInstance(net.apachegui.SearchResults);
});


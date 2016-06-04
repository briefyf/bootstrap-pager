var app = angular.module("leave-list-app", []);

app.controller("leave-list-panel-table", function ($scope, $http) {
    var requestUrl = "/leave/list.do";
    var datas = {
        page: $scope.page, rows: $scope.rows
    }
    var Indata = {'page': 0, 'rows': 10}
    $http({
        url: requestUrl,
        method: "POST",
        params: Indata
    }).success(function (response) {
        $scope.table = {};
        $scope.leaves = response;
    });

    $scope.del = function () {
        if (confirm("确定要删除吗??")) {
            delLeave(id);
        }
    };

    function delLeave(id) {
        var requestUrl = "";
        $.ajax({
            url: requestUrl,
            data: {
                id: id,
            },
            type: "post",
            async: "true",
            success: function () {

            },
            error: function () {

            }
        });
    }
});

app.filter("stateFormater", function () {
    return function (val) {
        var text="";
        switch (val){
            case 0:
                text="已提交";
                break;
            case 1:
                text="初审通过";
                break;
            case 2:
                text="请假审批已通过";
            }
        return text;
    }
});


app.controller("leave-list-panel-title", function ($scope) {
    $scope.title = {};
    $scope.title.pannel_title = "糖果金融股份有限公司";
});

app.controller("toolbar", function ($scope) {
    $scope.add = function () {
        location.href = "/leave/input.do";
    };

    $scope.del = function () {
        alert("删除...");
    };
});
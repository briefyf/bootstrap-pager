var app = angular.module("leave-edit-app", []);

app.controller("leave-edit-panel-title", function ($scope) {
    $scope.title = {};
    $scope.title.pannel_title = "糖果金融股份有限公司";
});

app.controller("leave-edit-form", function ($scope, $http) {
    $scope.saveOrUpdate = function () {
        var url = "/leave/save.do";
        console.log("保存请假记录");
        $.ajax({
            url: url,
            method: "POST",
            dataType: "json",
            data: {
                user: $scope.user,
                content: $scope.content,
                days: $scope.days,
                leaveDate: $scope.leaveDate,
                remark: $scope.remark
            },
            success: function (data) {
                location.reload(true);
            }
        });

    };

    //这是 测试文本框内容改变事件做的测试
    $scope.testChangeVal = function () {
        $scope.showVal = $scope.inputVal;
    }
});
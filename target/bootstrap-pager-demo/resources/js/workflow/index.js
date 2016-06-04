var app = angular.module("wf-index-app", []);

app.controller("wf-list-panel-title", function ($scope) {
    $scope.title = {};
    $scope.title.pannel_title = "糖果金融股份有限公司";
});

app.controller("toolbar", function ($scope) {
    $scope.add = function () {
        alert("haha");
    };
});
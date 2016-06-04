/**
 * Created by wangsy on 2015/11/19.
 */

var app = angular.module("app-login", []);

app.controller("login-form", function ($scope) {
    $scope.login = function () {
        var name = $("#name").val();
        var pass = $("#pass").val();
        var rememberMe = $("#rememberMe").val();
        var signature = $("#signature").val();
        var loginUrl = "/login.do";
        var postData = {
            name: name,
            passwd: pass,
            rememberMe: rememberMe,
            signature: signature
        };
        $.ajax({
            url: loginUrl,
            data: postData,
            success: function (res) {
                if ("200" == res) {
                    location.href = "/leave/home.do";
                }else{
                    $.messagebox().sh.b("haha");
                }
            }
        });
    }
    $scope.changeVal = function (toggleVal1, toggleVal2) {
        $obj = $scope.rememberMe;
        if ($obj.val() == toggleVal1) {
            $obj.val(toggleVal2)
        } else {
            $obj.val(toggleVal1)
        }
    }
});

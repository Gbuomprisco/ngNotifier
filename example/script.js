(function () {

    var appController = ["$scope", "ngNotifierFactory", function ($scope, ngNotifierFactory) {

        var templateUrl = "../app/templates/notification.html";

        ngNotifierFactory.notify("Hey, this is a new notification", {
            type: "error",
            duration: 5000,
            templateUrl: templateUrl
        }, $scope);

        setInterval(function () {
            ngNotifierFactory.notify("Hey, this is a new notification", {
                type: "error",
                duration: 5000,
                templateUrl: templateUrl
            }, $scope);
        },  Math.floor(Math.random() * 10000));

        setInterval(function () {
            ngNotifierFactory.notify("Hey, this is a new notification", {
                type: "success",
                templateUrl: templateUrl,
                duration: 5000
            }, $scope);
        }, Math.floor(Math.random() * 10000));
    }];

    angular.module('app', ['ngNotifier'])
        .controller('controller', appController);

}());
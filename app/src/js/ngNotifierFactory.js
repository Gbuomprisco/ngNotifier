(function () {
    'use strict';

    /**
     * @NotificationFactory
     * @param $compile
     * @returns {{notify: string}}
     * @constructor
     */
    var ngNotifierFactory = ["$compile", function ($compile) {

        /**
         * @toDashCase
         * @param str
         * @returns {string}
         */
        var toDashCase = function (str) {
            return str.replace(/([A-Z])/g, '-$1').toLowerCase();
        },
            /**
             * @notify
             * @param text
             * @param attributes
             * @param scope
             * @returns {string}
             */
            notify = function (text, attributes, scope) {
                var template = "<notification",
                    compiled;
                for (var item in attributes) {
                    if (attributes.hasOwnProperty(item)) {
                        template += " " + toDashCase(item) + "='" + attributes[item] + "'";
                    }
                }
                template += " >" + text + "</notification>";
                compiled = $compile(template)(scope);
                $('body').append(compiled);
            };

        return {
            notify: notify
        };

    }];

    angular.module('ngNotifier').
        factory('ngNotifierFactory', ngNotifierFactory);

}());
(function () {
    'use strict';

    /**
     * defaults
     * @type {{animate: string, animationDuration: number,
          * type: string, top: string, left: string, duration: number, templateUrl: string}}
     */
    var defaults = {
        animate: "true",
        animationDuration: 500,
        type: "default",
        top: "20px",
        left: '75%',
        duration: 5000,
        templateUrl: "../../templates/notification.html"
    },

        notifications = [],

        Notification = function (element, animate, animationDuration, duration) {
            var self = this;

            self.element = element;
            self.animate = animate;
            self.animationDuration = animationDuration;
            self.duration = duration;
            self.id = Math.floor(Math.random() * 10000);
            self.element.attr('id', self.id);

            /**
             * show
             */
            var show = function () {
                if (self.animate) {
                    self.element.fadeIn(this.animationDuration);
                } else {
                    self.element.show();
                }
            },
            /**
             * @moveNext
             * @param nextElement
             * @param position
             */
            moveNext = function (nextElement, position) {
                if (nextElement.length) {
                    var next = nextElement.parent().next().find('.notification'),
                        nextPosition = nextElement.offset(),
                        id = nextElement.attr('id');
                    
                    notifications.forEach(function(value) {
                        if (value.id == id) {
                            value.top = position.top;
                            value.left = position.left;
                            return false;
                        }
                    });

                    nextElement.animate({
                        top: position.top,
                        left: position.left
                    });

                    moveNext(next, nextPosition);
                }
            },

            /**
             * @close
             */
            close = function () {
                notifications.forEach(function(value, index) {
                    if (value.id === self.id) {
                        notifications.splice(index, 1);
                        var next = self.element.parent().next('notification').find('.notification'),
                            position = self.element.offset();

                        if (self.animate) {
                            self.element.fadeOut(self.animationDuration, function() {
                                $(this).parent().remove();
                            });
                            moveNext(next, position);
                        } else {
                            self.element.parent().remove();
                            moveNext(next, position);
                        }
                    }
                });
            },

            /**
             * @setPosition
             * @param top
             * @param left
             */
            setPosition = function (top, left) {
                var margin,
                    element = self.element,
                    pos = 0;

                notifications.forEach(function(value) {
                    if (parseInt(value.top, 10) > pos) {
                        pos = parseInt(value.top, 10);
                    }
                    margin = pos + element.outerHeight() + 10;
                    top = margin + "px";
                });

                self.element.css({
                    top: top,
                    left: left
                });

                notifications.push({
                    id: self.id,
                    top: top,
                    left: left
                });
            },

            /**
             * @autoHide
             */
            autoHide = function () {
                if (self.duration !== "0") {
                    setTimeout(close, self.duration);
                }
            };

            return {
                show: show,
                close: close,
                autoHide: autoHide,
                setPosition: setPosition
            };
        },

        NotificationDirective = function () {
            return {
                restrict: "E",
                transclude: true,
                link: function (scope, element, attrs) {
                    $.extend(scope, defaults, attrs);

                    var $element = $(element).children('.notification'),
                        animate = scope.animate === "true",
                        animationDuration = scope.animationDuration,
                        notification = new Notification($element, animate, animationDuration, scope.duration);

                    scope.closeNotification = notification.close;
                    notification.setPosition(scope.top, scope.left);
                    notification.show();
                    notification.autoHide();
                },
                scope: {
                    type: "@type",
                    animate: "@animate",
                    animationDuration: "@animationDuration",
                    left: "@left",
                    top: "@top",
                    duration: "@duration",
                    templateUrl: "@templaterUrl"
                },
                templateUrl: function (elem, attrs) {
                    return attrs.templateUrl || defaults.templateUrl;
                }
            };
        };

    angular.module('ngNotifier', []).
        directive('notification', NotificationDirective);

}());
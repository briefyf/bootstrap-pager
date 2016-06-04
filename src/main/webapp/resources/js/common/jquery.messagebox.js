/**
 * jQuery messagebox 2.0
 * Author: lovebing
 * Depends: jquery.js
 * Created:2013-1-12
 * Last updated: 2013-12-13
 * Copyright 2013 lovebing.org
 * Usage:
 * init:
 * var box = $('selector').messagebox();
 * method:
 * open, close, destroy
 * event:
 * messageboxopen, messageboxclose, messageboxdestroy
 */
(function($) {
    function messagebox(id, options) {
        var private = {
            bodyClass: 'body-with-messagebox', // <body>增加的class
            boxClass: 'messagebox',
            boxHeadClass: 'messagebox-head',
            boxBodyClass: 'messagebox-body',
            boxFootClass: 'messagebox-foot',
            maskClass: 'messagebox-mask',
            boxElement: null,
            boxHeadElement: null,
            boxBodyElement: null,
            boxFootElement: null,
            boxMinorElementHeight: 0,
            element: $('#' + id),
            maskElement: null,
            options: $.extend({
                customClass: '', // 自定义的类
                modal: true,
                title: '',
                footer: '', // jQuery selector 或 string
                // messagebox在窗口的位置，可以取的值：
                // default（水平、垂直居中）、center-east（右对齐、垂直居中）、
                // center-west（左对齐、垂直居中）、center-north（上对齐、水平居中）、
                // center-south（下对齐、水平居中）、
                // center-close-north（离顶部100px、水平居中）、center-close-south（离底部100px、水平居中）
                position: 'default',
                width: 'auto'
            }, options),
            _init: function() {
                if (private.options.modal) {
                    private._createMask();
                }
                private._createMessagebox();
                private._initStyle();
                private._bindEvent();
            },
            _createMask: function() {
                var maskId = private.maskClass + messagebox.randomString();
                private.maskElement = $('<div/>');
                private.maskElement.attr('id', maskId);
                private.maskElement.addClass(private.maskClass);
                $('body').append(private.maskElement);
                private.maskElement.hide();
            },
            _createMessagebox: function() {
                private.boxHeadElement = $('<div role="heading"></div>');
                private.boxBodyElement = $('<div/>');
                private.boxFootElement = $('<div/>');
                private.boxElement = $('<div/>');
                private.boxElement.attr('id', private.boxClass + '-' + messagebox.randomString());
                private.boxElement.addClass(private.boxClass);
                if ($.trim(private.options.customClass) !== '') {
                    private.boxElement.addClass(private.options.customClass);
                }
                private.element.after(private.boxElement);

                private.boxHeadElement.addClass(private.boxHeadClass);
                private.boxHeadElement.html(private.options.title);
                private.boxBodyElement.addClass(private.boxBodyClass);
                private.boxFootElement.addClass(private.boxFootClass);
                private.boxFootElement.append(private.options.footer);

                if ($.trim(private.boxHeadElement.html()) === '') {
                    private.boxHeadElement.hide();
                }
                if ($.trim(private.boxFootElement.html()) === '') {
                    private.boxFootElement.hide();
                }
                private.boxElement.append(private.boxHeadElement);
                private.boxElement.append(private.boxBodyElement);
                private.boxElement.append(private.boxFootElement);

                private.boxElement.after(private.element);
                private.boxBodyElement.append(private.element.detach());

                private.boxMinorElementHeight = private.boxHeadElement.height()
                    + parseFloat(private.boxHeadElement.css('paddingTop'))
                    + parseFloat(private.boxHeadElement.css('paddingBottom'))
                    + private.boxFootElement.height()
                    + parseFloat(private.boxFootElement.css('paddingTop'))
                    + parseFloat(private.boxFootElement.css('paddingBottom'))
                    + parseFloat(private.boxBodyElement.css('paddingTop'))
                    + parseFloat(private.boxBodyElement.css('paddingBottom'));

            },
            _initStyle: function() {
                if (private.customClass !== '') {
                    private.element.addClass(private.customClass);
                    private.boxElement.hide();
                }
                if (private.options.width !== 'auto') {
                    private.boxElement.css({
                        width: private.options.width
                    });
                }

                private._resetBoxBodyHeight();
            },
            _resetBoxBodyHeight: function() {
                var selfH = private.boxBodyElement.height(),
                    winH = $(window).height(),
                    boxH = private.boxElement.height(),
                    maxH = winH - private.boxMinorElementHeight - 10;

                if (maxH > selfH) {
                    private.boxBodyElement.css({
                        overflowY: 'hidden'
                    });
                    private.boxBodyElement.css({
                        height: 'auto'
                    });
                }
                else if (maxH > 10) {
                    private.boxBodyElement.css({
                        height: maxH

                    });
                    private.boxBodyElement.css({
                        overflowY: 'scroll'
                    });
                }


            },
            _resetMaskSize: function() {
                if (private.maskElement !== null) {
                    private.maskElement.css({
                        width: $(document).width(),
                        height: $(document).height()
                    });
                }
            },
            _resetPosition: function() {
                var element = private.boxElement,
                    winH = $(window).height(), winW = $(window).width(),
                    boxH = element.height(), boxW = element.width();

                switch (private.options.position) {
                    case 'center-east':
                        element.css({
                            left: winW - boxW,
                            top: (winH - boxH) / 2
                        });
                        break;
                    case 'center-west':
                        element.css({
                            left: 0,
                            top: (winH - boxH) / 2
                        });
                        break;
                    case 'center-north':
                        element.css({
                            left: (winW - boxW) / 2,
                            top: 0
                        });
                        break;
                    case 'center-south':
                        element.css({
                            left: (winW - boxW) / 2,
                            top: winH - boxH
                        });
                        break;
                    case 'center-close-north':
                        element.css({
                            left: (winW - boxW) / 2,
                            top: 100
                        });
                        break;
                    case 'center-close-south':
                        element.css({
                            left: (winW - boxW) / 2,
                            top: winH - boxH - 100
                        });
                        break;
                    case 'default':
                    default:
                        element.css({
                            left: (winW - boxW) / 2,
                            top: (winH - boxH) / 2
                        });
                }

            },
            _showMask: function() {
                if (private.maskElement !== null) {
                    private.maskElement.css({
                        zIndex: messagebox.getMaxZIndex() + 1
                    });
                    private.maskElement.show();
                }
            },
            _hideMask: function() {
                if (private.maskElement !== null) {
                    private.maskElement.hide();
                }
            },
            _bindEvent: function() {
                $(window).bind('resize.' + id, function() {
                    if (private._isOpen()) {
                        private._resetBoxBodyHeight();
                        private._resetPosition();
                        setTimeout(function() {
                            private._resetMaskSize();
                        }, 200);
                    }
                });
                //关闭按钮
                private.boxFootElement.find('.close').click(function() {
                    private._hide();
                });
            },
            _isOpen: function() {
                return !private.boxElement.is(':hidden');
            },
            _show: function() {
                $('body').addClass(private.bodyClass);
                private._resetBoxBodyHeight();
                private._resetPosition();
                private._resetMaskSize();
                private._showMask();
                private.boxElement.css({
                    zIndex: messagebox.getMaxZIndex() + 1
                });
                private.boxElement.show();
            },
            _hide: function() {
                private.boxElement.hide();
                private._hideMask();
                $('body').removeClass(private.bodyClass);
            },
            //还原样式
            _restoreStyle: function() {
                private.boxElement.after(private.element.detach());
                if (private.maskElement !== null) {
                    private.maskElement.remove();
                }
                private.boxElement.remove();
            },
            // 解绑事件
            _unbindEvent: function() {
                $(window).unbind('resize.' + id);
            }
        };

        // start public 
        this.open = function() {
            if (messagebox.getObject(id) === null) {
                throw new Error('cannot call methods on messagebox prior to initialization; attempted to call method \'open\'');
            }
            private._show();
            private.element.trigger('messageboxopen');
        };
        this.close = function() {
            if (messagebox.getObject(id) === null) {
                throw new Error('cannot call methods on messagebox prior to initialization; attempted to call method \'close\'');
            }
            private._hide();
            private.element.trigger('messageboxclose');

        };

        this.destroy = function() {
            if (messagebox.getObject(id) === null) {
                throw new Error('cannot call methods on messagebox prior to initialization; attempted to call method \'destroy\'');
            }
            private._hide();
            private._restoreStyle();
            private._unbindEvent();
            private.element.trigger('messageboxdestroy');
            messagebox.removeObject(id);
        };
        // end public


        private._init();
    }
    messagebox.object = [];

    messagebox.getMaxZIndex = function() {
        var position, zIndex = 0;
        zIndex =  Math.max.apply(null, $.map($('*'), function(e, n) {
            position = $(e).css('position');
            if ((position === 'absolute' || position === 'fixed' || position === 'relative') && !$(e).is(':hidden')) {
                return parseInt($(e).css('z-index')) || 1;
            }
        }));
        return zIndex <= 0 ? 0 : zIndex;
    };
    messagebox.randomString = function() {
        return Math.random().toString().replace('.', '');
    };
    messagebox.removeObject = function(id) {
        var item, index = 0;
        $.each(messagebox.object, function(k, v) {
            if (v.id === id) {
                messagebox.object.splice(index, 1);
                return false;
            }
            index++;
        });

    };
    messagebox.addObject = function(id, options) {
        var object = new messagebox(id, options);
        messagebox.object.push({
            id: id,
            object: object
        });
        return object;
    };
    messagebox.getObject = function(id) {
        var item = null;
        $.each(messagebox.object, function(k, v) {
            if (v.id === id) {
                item = v.object;
                return false;
            }
        });

        return item;
    };

    $.fn.messagebox = function(options) {
        var self = $(this).first(), id = self.attr('id'), object = messagebox.getObject(id);
        if (object === null) {
            if (typeof (id) === 'undefined') {
                id = 'messagebox-' + messagebox.randomString();
                self.attr('id', id);
            }
            return messagebox.addObject(id, options);
        }
        return object;
    };
})(jQuery);
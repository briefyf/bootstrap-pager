//原始代码在 http://runjs.cn/code/iuqp5il9

var messageboxOject = [];
$(function () {
    $('.msgbox').each(function () {
        switch ($(this).attr('id')) {
            case 'alert':
                messageboxOject.push($(this).messagebox({
                    customClass: 'alert',
                    width: 'auto',
                    title: '提示信息',
                    footer: '<div class="text-center"><button type="button" class="close">确定</button></div>'
                }));
                break;
            case 'confirm':
                var ok = $('<button type="button" class="close">确定</button>'),
                    cancel = $('<button type="button" class="close">取消</button>'),
                    custom = $('<button type="button" class="close">取消</button>'),
                    footer = $('<div/>');
                footer.addClass('text-center');

                ok.click(function () {
                    alert(true)
                });

                custom.click(function () {
                    alert("自定义弹窗..")
                });

                cancel.click(function () {
                    alert(false)
                });

                footer.append(ok);
                footer.append(custom);
                footer.append(cancel);

                messageboxOject.push($(this).messagebox({
                    customClass: 'confirm',
                    width: 'auto',
                    title: '确认信息',
                    footer: footer
                }));
                break;
        }
    });

    $('.toolbar button').click(function () {
        try {
            var index = parseInt($(this).data('for'));
            messageboxOject[index].open();
            if (index > 5) {
                return;
            }
            setTimeout(function () {
                messageboxOject[index].close();
            }, 2000);
        }

        catch (e) {

        }
    });
});
var messageboxOject=[];$(function(){$(".msgbox").each(function(){switch($(this).attr("id")){case"alert":messageboxOject.push($(this).messagebox({customClass:"alert",width:"auto",title:"提示信息",footer:'<div class="text-center"><button type="button" class="close">确定</button></div>'}));break;case"confirm":var a=$('<button type="button" class="close">确定</button>'),b=$('<button type="button" class="close">取消</button>'),c=$('<button type="button" class="close">取消</button>'),d=$("<div/>");d.addClass("text-center");a.click(function(){alert(true)});c.click(function(){alert("自定义弹窗..")});b.click(function(){alert(false)});d.append(a);d.append(c);d.append(b);messageboxOject.push($(this).messagebox({customClass:"confirm",width:"auto",title:"确认信息",footer:d}));break}});$(".toolbar button").click(function(){try{var a=parseInt($(this).data("for"));messageboxOject[a].open();if(a>5){return}setTimeout(function(){messageboxOject[a].close()},2000)}catch(b){}})});
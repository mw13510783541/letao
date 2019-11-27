
$(function () {


    //1.判断用户是否登陆，未登录会被拦截到登录页
    $.ajax({
        type:"get",
        url:"/user/queryUserMessage",
        dataType:"json",
        success:function (info) {
            console.log(info);
            if (info.error ===400){
                //说明用户未登录
                location.href="login.html";
                return;
            }

            //用户已登录
            var htmlStr=template("userTpl",info);
            $("#userInfo").html(htmlStr);
        }
    })


    //2.退出
    $("#logout").click(function () {

        //发送ajax
        $.ajax({
            type:"get",
            url:"/user/logout",
            dataType:"json",
            success:function (info) {
                console.log(info)
                if (info.success){
                    //说明退出成功，返回登录页
                    location.href="login.html"
                }
            }
        })
    })
})
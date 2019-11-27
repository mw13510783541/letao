$(function () {

    //搜集用户名和密码
    $("#logBtn").click(function () {

        var username=$("#username").val().trim();
        var password=$("#password").val().trim();
         //非空验证
        if (username === ''){
            mui.toast("请输入用户名")
            return;
        }

        if (password === ''){
            mui.toast("请输入密码")
            return;
        }
        //发送请求验证
        $.ajax({
            type:"post",
            url:"/user/login",
            data:{
                username:username,
                password:password
            },
            dataType:"json",
            success:function (info) {
                console.log(info);
                //登陆失败
                if (info.error ===403){
                    mui.toast("用户名或密码错误")
                    return;
                }

                //登陆成功,两种状态
                if (location.search.indexOf("retUrl") >-1){
                    //(1)传了地址, 就跳转到对应页面  //?retUrl=http://localhost:3000/front/product.html?productId=1
                    var retUrl=location.search.replace("?retUrl=",'')//http://localhost:3000/front/product.html?productId=1
                    console.log(retUrl)
                    location.href=retUrl;
                }else {
                    // (2) 没传地址, 跳转到个人中心页
                    location.href = "user.html";
                }



            }
        })
    })
})
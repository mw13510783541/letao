$(function () {

    //1.获取productId
    var productId=getsearch("productId");
    console.log(productId)

    //发送请求，获取数据
    $.ajax({
        type:"get",
        url:"/product/queryProductDetail",
        data:{
            id:productId
        },
        dataType:"json",
        success:function (info) {
            console.log(info);
            var htmlStr=template("tpl",info);
            $(".lt-main .mui-scroll").html(htmlStr)


            //手动初始化轮播图
            //获得slider插件对象
            var gallery = mui('.mui-slider');
            gallery.slider({
                interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
            });

            //手动初始化数字框组件
            mui(".mui-numbox").numbox()
        }
    })


    //2.尺码高亮
    $(".lt-main").on("click",".lt_size span",function () {
         $(this).addClass("current").siblings().removeClass("current")
    })


    //3.加入购物车
    $("#addCart").click(function () {
        //获取尺码
        var size=$(".lt_size span.current").text();
        //获取数量
        var num=$(".mui-numbox-input").val();

        console.log(size);
        if (!size){
            mui.toast("请选择尺码");
            return;
        }


        //发送ajax请求
        $.ajax({
            type:"post",
            url:"/cart/addCart",
            data:{
                productId:productId,
                size:size,
                num:num
            },
            dataType: "json",
            success:function (info) {
                console.log(info);

                //加入购物前需要登陆
                //未登录状态
                if (info.error === 400){
                    //跳转到登录页
                    location.href="login.html?retUrl="+location.href
                }

                //登录成功
                if (info.success){
                    mui.confirm("添加成功","温馨提示",["去购物车","继续浏览"],function (e) {

                        if (e.index === 0){
                            //去购物车
                            location.href="cart.html"
                        }


                    })
                }
            }

        })

    })






})
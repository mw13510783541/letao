

$(function () {
    //1.一级分类名渲染
    //发送ajax请求
    $.ajax({
        typr:"get",
        url:"/category/queryTopCategory",
        dataTyPe:"json",
        success:function (info) {
            console.log(info);
            var htmlStr=template("leftTpl",info);
            $(".category_ul").html(htmlStr);

           //一进入页面渲染第一个二级分类页面
            renderSecond(info.rows[0].id)
        }
    })


    //2.给左侧一级分类名注册点击事件切换
    $(".lt_category_left").on("click","a",function () {
        $(this).addClass("current").parent().siblings().find("a").removeClass("current")

        var id=$(this).data("id");
        renderSecond(id);
    })

    //封装一个方法根据一级分类名渲染二级分类页面
    function renderSecond(id) {

        //请求数据
        $.ajax({
            type:"get",
            url:"/category/querySecondCategory",
            data:{
                id:id
            },
            dataType:"json",
            success:function (info) {
                console.log(info);
                var htmlStr=template("rightTpl",info);
                $(".lt_category_right ul").html(htmlStr);
            }
        })
    }






})
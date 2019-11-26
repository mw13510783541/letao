

$(function () {


    //1.获取地址栏里面的参数赋值给input
    $(".lt_product").html("<div class=\"loading\"></div>")

    var key=getsearch("key");
    console.log(key);
    $(".search_input").val(key);


    //2.一进入页面请求后台数据
    render();
    function render(){

        // 三个必传的参数
        var params = {};
        params.proName = $('.search_input').val();  // 搜索关键字
        params.page = 1;
        params.pageSize = 100;


        // 两个可选的参数
        // 通过判断有没有高亮的a标签, 来决定需不需要传递排序的参数
        var $current = $('.lt-sort a.current');
        if ( $current.length > 0 ) {
            // 当前有 a 标签有current类, 需要进行排序
            console.log( "需要进行排序" );
            // 按照什么进行排序
            var sortName = $current.data("type");
            // 升序还是降序, 可以通过判断箭头的方向决定, （1升序，2降序）
            var sortValue = $current.find("i").hasClass("fa-angle-down") ? 2 : 1;

            // 如果需要排序, 需要将参数添加在params中
            params[ sortName ] = sortValue;
        }

        setTimeout(function () {
            $.ajax({
                type:"get",
                url:"/product/queryProduct",
                data:params,
                dataType:"json",
                success:function (info) {
                    console.log(info);

                    //页面渲染
                    var htmlStr=template("tpl",info);
                    $(".lt_product").html(htmlStr);
                }
            })
        },500)


    }



    //3.点击搜索按钮，实现搜索功能
    $(".btn-search").click(function () {
        render();

        //需要将搜索的关键字追加到本地储存当中
        var key=$(".search_input").val() ;
        if (key.trim() === ''){
            mui.toast("请输入关键字",{
                duration:3000
            });
            return;
        }

        var history=localStorage.getItem("search_list")|| "[]";
        var arr=JSON.parse(history);

        //删除重复的项
        var index=arr.indexOf(key);
        if (index !=-1){

        arr.splice(index,1)
        }

        //长度不能超过十条
        if (arr.length >=10){
            arr.pop();
        }

        arr.unshift(key);

        localStorage.setItem("search_list",JSON.stringify(arr));
    })


    // 功能4: 点击价格或者库存, 切换current, 实现排序
    // 1. 绑定点击事件, 通过 a[data-type] 绑定
    // 2. 切换 current类
    //    (1)点击的a标签没有current类, 直接加上 current类, 并且移除其他 a 的current类
    //    (2)点击的a标签有current类, 切换箭头方向
    // 3. 调用 render 重新渲染

    $('.lt-sort a[data-type]').click(function() {

        if ($(this).hasClass("current")) {
            // 有类, 切换箭头方向
            $(this).find("i").toggleClass("fa-angle-down").toggleClass("fa-angle-up");
        } else {
            // 当前a没有类, 给自己加上, 让其他的移除
            $(this).addClass("current").siblings().removeClass("current");
        }

        // 重新渲染
        render();
    })

})
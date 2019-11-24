//一级分类页面渲染
$(function () {

    var currentPage=1;
    var pageSize=5;

    render();//一进入页面渲染一次
    function render() {

        //发送ajax请求
        $.ajax({
            type:"get",
            url:"/category/queryTopCategoryPaging",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            dataType:"json",
            success:function (info) {
                console.log(info);

                if (info.success) {
                    console.log("已登录");
                }
                //当前页面渲染
                var htmlStr=template("tpl",info);
                $("tbody").html(htmlStr);


                //分页渲染
                $("#paginator").bootstrapPaginator({
                    //指定版本
                    bootstrapMajorVersion:3,
                    //当前页
                    currentPage:currentPage,
                    //总页数
                    totalPages:Math.ceil(info.total/info.size),
                    //当前点击的按钮
                    onPageClicked:function (a,b,c,page) {
                        console.log(page);
                        //重新渲染页面
                        currentPage=page;
                        render()
                    }
                })
            }
        })

    }

})
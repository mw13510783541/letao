//二级分类页面

//1.渲染页面
var currentPage = 1;
var pageSize = 5;
render();//渲染首页

function render() {

    //获取后台数据，发送ajax请求
    $.ajax({
        type: "get",
        url: "/category/querySecondCategoryPaging",
        data: {
            page: currentPage,
            pageSize: pageSize
        },
        dataType:"json",
        success:function (info) {
            console.log(info);

            //渲染到页面
         var htmlStr=template("tpl",info);
         $("tbody").html(htmlStr);


         //分页渲染
            $("#paginator").bootstrapPaginator({
                //版本
                bootstrapMajorVersion:3,
                //总页数
                totalPages:Math.ceil(info.total/info.size),
                //当前页数
                currentPage:info.page,
                //点击
                onPageClicked:function (a,b,c,page) {
                    console.log(page)
                    currentPage=page;
                    render();

                }

            })
        }
    })
}


//2.添加分类，弹出模态框
$("#addBtn").click(function () {
    $("#addModal").modal("show");

    //发送ajax请求，获取一级分类里面的全部数据
    $.ajax({
        type:"get",
        url:"/category/queryTopCategoryPaging",
        data:{
            page:1,
            pageSize:100
        },
        dataType: "json",
        success:function (info) {
            console.log(info)

            //一级分类名渲染
            var htmlStr=template("dropTpl",info);
            $(".dropdown-menu").html(htmlStr)
        }
    })

    //将一级分类选项渲染到button
    $(".dropdown-menu").on("click","a",function () {
        var txt=$(this).text();
        $(".dropText").text(txt);
    })
})
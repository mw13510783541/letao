

$(function () {

    //1.动态渲染
    var currentPage=1;
    var pageSize=5;
    var currentId;//当前用户id
    var isDelete;//当前用户状态

    render();//一进页面首先渲染一次
    function render(){
        //发送ajax请求获取后台数据
        $.ajax({
            type:"get",
            url:"/user/queryUser",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            dataType:"json",
            success:function (info) {
                console.log(info)
                var htmlStr=template("tpl",info);
                $("tbody").html(htmlStr);



                // 分页插件
                $(".paginator").bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    totalPages:Math.ceil(info.total/info.size),
                    currentPage:info.page,
                    //分页渲染
                    onPageClicked:function (a,b,c,page) {
                        console.log(page);
                        currentPage=page;
                        render();
                    }
                })
            }

        })
    }


    //2.点击操作弹出模态框
    $("tbody").on("click",".btn",function () {
        $("#statusModal").modal("show");
        //获取当前点击的用户id
        currentId=$(this).parent().attr("data-id");
        //当前用户状态切换
        isDelete=$(this).hasClass("btn-danger") ? 0 : 1;
      })

      //点击模态框内确认按钮
    $("#statusBtn").click(function () {
        console.log("当前用户ID："+currentId);
        console.log("当前用户状态："+isDelete);


        //发送ajax
        $.ajax({
            type:'post',
            url: "/user/updateUser",
            data: {
                id:currentId,
                isDelete:isDelete
            },
            dataType: "json",
            success:function (info) {
                console.log(info);
                if (info.success){
                    //关闭模态框
                    $('#statusModal').modal("hide")
                    //重新渲染页面
                    render();
                }
            }
        })

    })
















})
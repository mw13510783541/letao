//一级分类页面渲染
$(function () {

    var currentPage=1;
    var pageSize=5;

    render();//一进入页面渲染一次
    //1.页面渲染
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


    //2.点击添加分类,弹出模态框
    $("#addBtn").click(function () {
        //显示模态框
        $("#addModal").modal("show");

    })


    //3.模态框内表单校验
    $("#form").bootstrapValidator({
        //设置小图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        fields:{
            categoryName: {
                validators:{
                    //非空
                    notEmpty:{
                        message:"请输入一级分类名"
                    }
                }
            }

        }

    })


    //4.添加分类表单提交
    $("#form").on("success.form.bv",function(e){
        //阻止默认跳转
        e.preventDefault();

        //提交表单，发送ajax请求
        $.ajax({
            type:"post",
            url:"/category/addTopCategory",
            data:$("#form").serialize(),
            dataType: "json",
            success:function (info) {
                console.log(info)
                if (info.success){
                    //添加成功
                    //关闭模态框
                    $("#addModal").modal("hide");
                    //重新渲染页面
                    currentPage=1;
                    render();

                    //重置模态框
                    $("#form").data("bootstrapValidator").resetForm(true)
                }
            }
        })

    })

})
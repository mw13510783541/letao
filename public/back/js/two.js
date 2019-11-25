//二级分类页面
$(function () {
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
            dataType: "json",
            success: function (info) {
                console.log(info);

                //渲染到页面
                var htmlStr = template("tpl", info);
                $("tbody").html(htmlStr);


                //分页渲染
                $("#paginator").bootstrapPaginator({
                    //版本
                    bootstrapMajorVersion: 3,
                    //总页数
                    totalPages: Math.ceil(info.total / info.size),
                    //当前页数
                    currentPage: info.page,
                    //点击
                    onPageClicked: function (a, b, c, page) {
                        console.log(page)
                        currentPage = page;
                        render();

                    }

                })
            }
        })
    }


    //2.添加分类，弹出模态框
    $("#addBtn").click(function () {
        $("#addModal").modal("show");

        //2.1发送ajax请求，获取一级分类里面的全部数据
        $.ajax({
            type: "get",
            url: "/category/queryTopCategoryPaging",
            data: {
                page: 1,
                pageSize: 100
            },
            dataType: "json",
            success: function (info) {
                console.log(info)

                //一级分类名渲染
                var htmlStr = template("dropTpl", info);
                $(".dropdown-menu").html(htmlStr)
            }
        })

    })


    //3将一级分类选项渲染到button
    $(".dropdown-menu").on("click", "a", function () {
        var txt = $(this).text();
        $(".dropText").text(txt);

        //获取categoryId
        var id = $(this).data("id");
        // console.log(id.id)
        $("[name='categoryId']").val(id)

        //改变表单校验的图标样式
        $("form").data("bootstrapValidator").updateStatus("categoryId","VALID")
    })


    //4文件上传
    $("#fileupload").fileupload({
        dataType: "json",
        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        done: function (e, data) {
            console.log(data)
            var URL = data.result.picAddr;
            $("#imgBox img").attr("src", URL);

            //获取brandLogo
            $("[name='brandLogo']").val(URL);

            $("form").data("bootstrapValidator").updateStatus("brandLogo","VALID")

        }
    })


    //5表单校验
    $("#form").bootstrapValidator({
        // 将默认的排除项, 重置掉 (默认会对 :hidden, :disabled等进行排除)
        excluded: [],

        //设置小图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        fields: {
            categoryId: {
                validators: {
                    //非空验证
                    notEmpty: {
                        message: "请选择一级分类名称"
                    }
                }
            },

            brandName: {
                validators: {
                    //非空验证
                    notEmpty: {
                        message: "请添加二级分类名称"
                    }
                }
            },

            brandLogo:{
                validators: {
                    //非空验证
                    notEmpty: {
                        message: "请选择图片"
                    }
                }
            }
        }
    })


    //注册表单校验成功事件
    $("#form").on("success.form.bv",function (e) {
        //阻止网页默认跳转
        e.preventDefault();

        //发送ajax请求
        $.ajax({
            type:"post",
            url:"/category/addSecondCategory",
            data:$("#form").serialize(),
            dataType:"json",
            success:function (info) {
                console.log(info)
                //关闭模态框
                $("#addModal").modal("hide");
                //重新渲染页面(首页)
                currentPage=1;
                render();

                //重置表单
                $("#form").data("bootstrapValidator").resetForm(true);//只能清除表单里面的内容

                   //手动清除下拉菜单和图片
                $(".dropText").text("请选择一级分类名称");
                $("#imgBox img").attr("src",'');
            }
        })
    })
})

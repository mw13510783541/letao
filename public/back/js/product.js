//商品管理模块

$(function () {

    //1.请求后台数据，渲染页面
    var currentPage=1;
    var pageSize=5;

    render();
    function render() {

        //发送ajax请求，获取后台数据
        $.ajax({
            type:"get",
            url:"/product/queryProductDetailList",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            dataType:"json",
            success:function (info) {
                console.log(info);

                //渲染页面
                var htmlStr=template("productTpl",info);
                $(".lt-content tbody").html(htmlStr);


                //分页渲染
                $("#paginator").bootstrapPaginator({
                    //版本
                    bootstrapMajorVersion:3,
                    //当前页
                    currentPage:info.page,
                    //总页数
                    totalPages:Math.ceil(info.total/info.size),
                    //按钮大小
                    size:"normal",
                    //设置按钮样式
                    itemTexts:  function( type, page, current){

                        switch(type){
                            case "page":
                                return page;

                            case "first":
                                return "首页";

                            case "last":
                                return "尾页";

                            case "prev":
                                return "上一页";

                            case "next":
                                return "下一页";
                        }
                    },

                    //设置按钮提示文字
                    tooltipTitles:function( type, page, current){

                        switch(type){
                            case "page":
                                return page;

                            case "first":
                                return "首页";

                            case "last":
                                return "尾页";

                            case "prev":
                                return "上一页";

                            case "next":
                                return "下一页";
                        }
                    },
                    //使用useBootstrapTooltip提示框
                    useBootstrapTooltip:true,

                    //按钮点击事件切换页面
                    onPageClicked:function (a,b,c,page) {
                        console.log(page);
                        //渲染页面
                        currentPage=page;
                        render();

                    }
                })
            }
        })
    }


    //2.点击添加商品按钮，弹出模态框
    $("#addBtn").click(function () {
        $("#addModal").modal("show");


        //获取dropdown-menu里面所有的二级分类名,发送ajax请求
        $.ajax({
            type:"get",
            url:"/category/querySecondCategoryPaging",
            data:{
                page: 1,
                pageSize:100
            },
            dataType:"json",
            success:function (info) {
                console.log(info);

                //渲染二级分类名
                var htmlStr=template("proTpl",info);
                $(".dropdown-menu").html(htmlStr);

            }
        })
    })

    //3.二级分类按钮注册事件
    $(".dropdown-menu").on("click","a",function () {
        //获取值渲染到button上
        var txt=$(this).text();
        $(".dropText").text(txt);

        //获取id赋值给隐藏域input
        var id=$(this).data("id");
        $("[name='brandId']").val(id);

        //手动重置
        $("#form").data('bootstrapValidator').updateStatus("brandId","VALID")
    })

    //4.文件上传
    var picArr=[];
    $("#fileupload").fileupload({
        dataType:"json",
        done:function (e,data) {
            console.log(data);

            //往数组前面追加图片对象
            picArr.unshift(data.result);
            //在imgBox前面添加img
            $("#imgBox").prepend('<img src="'+data.result.picAddr+'" width="100px" alt="">')

            //让imgBox里面显示的图片不大于3张
            if (picArr.length > 3){
                picArr.pop();//数组裁剪最后一个
                console.log(picArr);

                $("#imgBox img").eq(-1).remove();
            }

            //手动校验图片
            if(picArr.length === 3){
                $("#form").data('bootstrapValidator').updateStatus("imgText",'VALID')
            }
        }
    })

    // 5.表单校验
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
            //选择二级分类
            brandId: {
                validators: {
                    //非空验证
                    notEmpty: {
                        message: "请选择二级分类名称"
                    }
                }
            },
            //商品名称
            proName: {
                validators: {
                    //非空验证
                    notEmpty: {
                        message: "请添加商品名称"
                    }
                }
            },
            //商品描述
            proDesc: {
                validators: {
                    //非空验证
                    notEmpty: {
                        message: "请添加商品描述"
                    }
                }
            },
            //商品库存
            num: {
                validators: {
                    //非空验证
                    notEmpty: {
                        message: "请添加商品库存"
                    },
                    //正则校验
                    regexp: {
                        regexp: /^[1-9]\d*$/,
                        message: '商品库存必须是非零开头的数字'
                    }
                }
            },
            //商品尺寸
            size: {
                validators: {
                    //非空验证
                    notEmpty: {
                        message: "请添加商品尺寸"
                    },
                    //正则校验
                    regexp: {
                        regexp: /^\d{2}-\d{2}$/,
                        message: '商品尺寸格式必须是xx-xx的形式，例如32-45'
                    }
                }
            },
            //商品原价
            oldPrice: {
                validators: {
                    //非空验证
                    notEmpty: {
                        message: "请添加商品原价"
                    }
                }
            },
            //商品现价
            price: {
                validators: {
                    //非空验证
                    notEmpty: {
                        message: "请添加商品现价"
                    }
                }
            },

            //上传图片非空校验
            imgText: {
                validators: {
                    //非空验证
                    notEmpty: {
                        message: "请添加三张图片"
                    }
                }
            },




        }
        })




    //6.表单提交
    $("#form").on("success-form-bv",function (e) {
        //阻止网页默认行为
        e.preventDefault();


        var picStr=$("#form").serialize();

        console.log(picStr);
        picStr+="&picName1="+picArr[0].picName+"&picAddr1="+picArr[0].picAddr;
        picStr+="&picName2="+picArr[1].picName+"&picAddr2="+picArr[1].picAddr;
        picStr+="&picName3="+picArr[2].picName+"&picAddr3="+picArr[2].picAddr;

        console.log(picStr);
        //发送请求
        $.ajax({
            type:"post",
            url:"/product/addProduct",
            data:picStr,
            dataType:"json",
            success:function (info) {
                console.log(info);
                if (info.success){
                    //关闭模态框
                    $("#addModal").modal("hide");

                    //重新渲染页面
                    currentPage=1;
                    render();

                    //重置表单内容
                    $("#form").data('bootstrapValidator').resetForm(true)

                    // 手动重置, 下拉菜单
                    $('#dropText').text("请选择二级分类")

                    // 删除结构中的所有图片
                    $('#imgBox img').remove();
                    // 重置数组 picArr
                    picArr = [];
                }

            }
        })
    })
})
//表单验证
// 1. 用户名不能为空
// 2. 用户密码不能为空
// 3. 用户密码长度为6-12位

$(function () {

    //1.校验用户名及密码
    $("#form").bootstrapValidator({
        //设置小图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },


        //指定校验字段
        fields:{
            username:{
              validators:{
                  //不能为空
                  notEmpty:{
                      message:"用户名不能为空"
                  },
                  stringLength:{
                      min:2,
                      max:12,
                      message:"用户名长度为6-12位"
                  },
                  callback:{
                      message:"用户名错误"
                  }
              }
            },
            password:{
                validators:{
                    //不能为空
                    notEmpty:{
                        message:"密码不能为空"
                    },
                    stringLength:{
                        min:6,
                        max:12,
                        message:"密码长度为6-12位"
                    },
                    callback:{
                        message:"密码错误"
                    }

                }
            }

        }
    })


    //2.登录校验
    $("#form").on("success.form.bv",function (e) {
        //2.1阻止默认跳转
        e.preventDefault();
        console.log("阻止网页默认跳转");

        //2.2发送ajax请求
        $.ajax({
            type:"post",
            url:"/employee/employeeLogin",
            data:$("#form").serialize(),
            dataType:"json",
            success:function (info) {
                console.log(info)
                if (info.success === true) {
                //登陆成功，网页跳转到首页
                location.href="index.html";

                }

                if (info.error === 1000){
                    //用户名错误，拦截登录页
                    // location.href='login.html'
                    // alert("用户名错误")
                    $("#form").data("bootstrapValidator").updateStatus("username","INVALID","callback")
                }

                if (info.error === 1001){
                    //用户名错误，拦截登录页
                    // location.href='login.html'
                    // alert("密码错误")
                    $("#form").data("bootstrapValidator").updateStatus("password","INVALID","callback")

                }
            }
        })
    })



    //3.重置校验
    $("[type=\"reset\"]").click(function () {

        // console.log("reset");
        //重置样式
        $("#form").data('bootstrapValidator').resetForm();
    })




})
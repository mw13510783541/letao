//表单验证
// 1. 用户名不能为空
// 2. 用户密码不能为空
// 3. 用户密码长度为6-12位

$(function () {
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
                      min:6,
                      max:12,
                      message:"用户名长度为6-12位"
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
                    }

                }
            }

        }
    })
})
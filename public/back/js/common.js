//1.nprogrss使用

   //1.1 ajaxStart()方法是在第一个ajax请求发送时调用
  $(document).ajaxStart(function () {
      //进度条开启
      NProgress.start();
  })


//1.2 ajaxStop()方法是在所有ajax请求完成时调用
$(document).ajaxStart(function () {

    //模拟网络延迟
    setTimeout(function () {
        //进度条关闭
    NProgress.done();
    },1000)
})



 //登陆拦截,判断用户是否已经登陆
//login页面不需要校验拦截，故需排除

if (location.href.indexOf("login.html") === -1){
$.ajax({
    type:"get",
    url:"/employee/checkRootLogin",
    dataType:"json",
    success:function (info) {
        console.log(info);

        if (info.success) {
            //说明用户已经登录成功
        }

        if (info.error === 400) {
            //说明用户未登录,需要拦截
            location.href="login.html"
        }
    }
})

}



 $(function () {

     //2 左侧分类管理切换
      $(".nav .category").click(function () {
          $(".nav .child").stop().slideToggle();
          // console.log('11')
      })

     //3 点击topbar菜单栏切换
     $(".lt-main .icon_menu").click(function () {

         $(".lt-aside").toggleClass("switch")
         $(".topbar").toggleClass("hidetopbar")
         $(".lt-main").toggleClass("hidemain")
     })


     //4  点击退出按钮，弹出模态框
     $("#logoutBtn").click(function () {
         $("#logoutModal").modal("show");
     })

     $("#logout").click(function () {

         $.ajax({
             type:"get",
             url:"/employee/employeeLogout",
             dataType:"json",
             success:function (info) {
                 console.log(info)
                 location.href="login.html"
             }
         })
     })


 })
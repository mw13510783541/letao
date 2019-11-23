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

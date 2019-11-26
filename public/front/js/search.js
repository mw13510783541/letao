

$(function () {

    //1.存储搜索假数据localhost
    // var arr=['安踏','阿迪','李宁','耐克','森马'];
    // //转成json字符串
    // var jsonStr=JSON.stringify(arr);
    //
    // //存储到本地
    // localStorage.setItem("search_list",jsonStr);



    //2.获取数据动态渲染
    render();
    function getHistory() {
        //如果没有获取到数据，默认初始化成一个空数组
        var history=localStorage.getItem("search_list") || "[]";
        var arr=JSON.parse(history);
        return arr;
    }

    function render() {
        var arr=getHistory();
        var htmlStr=template("tpl",{arr:arr});
        $(".lt-history").html(htmlStr);
    }



    //3.全部清空
    $(".lt-history").on("click",".btn-empty",function () {
       localStorage.removeItem("search_list");
       //重新渲染
        render();
    })

})



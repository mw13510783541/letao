

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

        // mui确认框
        // 参数1: 提示文本
        // 参数2: 标题
        // 参数3: 提示框按钮按钮, 要求是一个数组
        // 参数4: 点击按钮后的回调函数
        mui.confirm( "你确定要清空历史记录嘛?", "温馨提示", ["取消", "确认"], function( e ) {
            console.log( e );
            if ( e.index === 1 ) {
                // 点击了确认
                // 移除本地历史
                localStorage.removeItem("search_list");
                // 重新渲染
                render();
            }
        })
    })
    
    
    //4.删除单条历史纪录
    $(".lt-history").on("click",".btn-del",function () {
        var that=this;
        mui.confirm( "你确定要清空历史记录嘛?", "温馨提示", ["取消", "确认"], function( e ) {
       if (e.index === 1){
           //获取下标
           var index=$(that).data("index");
           //获取数据
           var arr=getHistory();
           //根据下表，删除数组的对应项
           arr.splice(index,1)
           console.log(arr)
           // 转成 jsonStr 存入本地存储
           var jsonStr = JSON.stringify( arr );
           localStorage.setItem("search_list", jsonStr );
           //页面重新渲染
           render();
       }

    })
    })


    //5.添加历史记录
    $(".btn-search").click(function () {

        var key=$(".search_input").val().trim();

        if (key === ""){
            alert("请输入内容");
            return;
        }

        //获取数组
        var arr=getHistory();

        //有重复的需删除
        var index=arr.indexOf(key);
        if (index != -1){
            //说明输入重复了
            arr.splice(index,1);
        }
        
        //超过十条需删除
        if (arr.length >=10){
            arr.pop();
        }


        arr.unshift(key);

        localStorage.setItem("search_list",JSON.stringify(arr));

         render();

         //重置
        $(".search_input").val("");


        //跳转到产品列表
        location.href="searchList.html?key="+key
    })

})


// var arr=['安踏','阿迪','李宁','耐克','森马'];
// var jsonStr=JSON.stringify(arr);
//
// localStorage.setItem("search_list",jsonStr);
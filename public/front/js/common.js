//区域滚动

mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005,//flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    indicators: false, //是否显示滚动条
});


//轮播图自动轮播
//获得slider插件对象
var gallery = mui('.mui-slider');
gallery.slider({
    interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
});





//地址栏传参获取封装
function getsearch(k) {
    //1.获取地址栏参数
    var search=location.search;

    //2.解析地址栏
    search=decodeURI(search);//"?name=will&age=18&dec=帅"

    //3.去除？
    search=search.slice(1);//"name=will&age=18&dec=帅"

    //4.切割成数组
    var arr=search.split("&")//["name=will", "age=18", "dec=帅"]

    //5.存入一个对象
    var obj={};

    arr.forEach(function (v,i) {
        var key=v.split("=")[0];
        var value=v.split("=")[1];
        //存入obj
        obj[key]=value;
    })

    return obj[k];

}
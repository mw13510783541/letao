//1.引入echarts表
$(function () {
    // 基于准备好的dom，初始化echarts实例
    var echarts1 = echarts.init(document.querySelector(".echarts-1"));

    // 指定图表的配置项和数据
    var option1 = {
        title: {
            text: '2019年注册人数'
        },
        tooltip: {},
        legend: {
            data:['人数']
        },
        xAxis: {
            data: ["1月","2月","3月","4月","5月","6月"]
        },
        yAxis: {},
        series: [{
            name: '人数',
            type: 'bar',
            data: [500, 920, 1500, 2000, 1800, 2600]
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    echarts1.setOption(option1);




    //2.饼状图
    // 基于准备好的dom，初始化echarts实例
    var echarts2 = echarts.init(document.querySelector(".echarts-2"));

    // 指定图表的配置项和数据
    var option2 = {
        title : {
            text: '热门品牌销售',
            subtext: '2019年6月',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['耐克','阿迪','新百伦','李宁','安踏']
        },
        series : [
            {
                name: '品牌',
                type: 'pie',
                radius : '60%',
                center: ['50%', '60%'],
                data:[
                    {value:335, name:'耐克'},
                    {value:310, name:'阿迪'},
                    {value:234, name:'新百伦'},
                    {value:135, name:'李宁'},
                    {value:1548, name:'安踏'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    echarts2.setOption(option2);
})
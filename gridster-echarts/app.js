var $ = require('jquery');
var echarts = require('echarts');
require('gridster.js');
require('./node_modules/gridster.js/dist/jquery.gridster.css');
require('./styles/demo.css');

var gridster;

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

function createBarChart(id) {
    var myChart = echarts.init(document.getElementById(id));

    var option = {
        title: {
            text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
            data: ['销量']
        },
        xAxis: {
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }]
    };

    myChart.setOption(option);
}

$(function() {
    gridster = $(".gridster ul").gridster({
        widget_base_dimensions: [100, 100],
        widget_margins: [5, 5],
        helper: 'clone',
        resize: {
            enabled: true
        }
    }).data('gridster');

    $('#create-bar').on('click', function() {
    	var id = guid();
        gridster.add_widget.apply(gridster, ['<li><div class="grid-container" id="' + id + '"></div></li>', 4, 4]);
        createBarChart(id);
    });

    $('.js-seralize').on('click', function() {
        var s = gridster.serialize();
        $('#log').val(JSON.stringify(s));
    });
});

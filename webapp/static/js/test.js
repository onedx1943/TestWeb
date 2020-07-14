let Test = (function () {
    let _init = function () {
        console.log('START!!!')
        let db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
        let msg;

        db.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS LOGS (id unique, log)');
            tx.executeSql('INSERT INTO LOGS (id, log) VALUES (6, "菜鸟教程1")');
            tx.executeSql('INSERT INTO LOGS (id, log) VALUES (7, "www.runoob.com")');
            tx.executeSql('INSERT INTO LOGS (id, log) VALUES (8, "233")');
            msg = '<p>数据表已创建，且插入了两条数据。</p>';
            $('#msg').html(msg);
        });

        db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM LOGS', [], function (tx, results) {
             let len = results.rows.length, i;
            msg = "<p>查询记录条数: " + len + "</p>";
            $('#msg').html($('#msg').html() + msg);

            for (i = 0; i < len; i++){
                msg = "<p><b>" + results.rows.item(i).log + "</b></p>";
                $('#msg').html($('#msg').html() + msg);
            }
        }, null);
        });
    };

    return {
        init: _init,
    }
})();

//Test.init();

let TestChart = (function () {
    let time_axis = echarts.init(document.getElementById('time-axis'));
    let chart1 = echarts.init(document.getElementById('chart1'));
    let chart2 = echarts.init(document.getElementById('chart2'));

    let _init = function () {
        get_trace_data();
    };

    let get_trace_data = function () {
        $.ajax({
            url: '/webapp/get-chart-data/',
            type: 'GET',
            data: {},
            dataType: 'json',
            success: function (result) {
                console.log(result);
                load_time_axis(time_axis, result.chart1);
                load_chart(chart1, result.chart1);
                load_chart(chart2, result.chart2);
                echarts.connect([time_axis, chart1, chart2]);
            },
            error: function (err) {
                console.log(err);
            }
        });
    };

    let load_time_axis = function (chart, data) {
        let option = {
            dataZoom: {
                type: 'slider',
                filterMode: 'none', // empty none
                minValueSpan: 3
            },
            xAxis: {
                show: true,
                type: 'category', // time
                data: data.time
            },
            yAxis: {
                show: false,
                // type: 'value',
                // inverse: true
            },
            series: [{
                // data: data.value,
                type: 'line'
            }]
        };
        chart.setOption(option);
    };

    let load_chart = function (chart, data) {
        let option = {
            title: {
                text: data.name,
                left: 'center'
            },
            tooltip: {
                trigger: 'axis',
                // formatter: 'name: {b}<br />value: {c}'
                formatter: function (params) {
                    return data.name + '<br />name: ' + params[0].name + '<br />value: ' + params[0].value;
                }
            },
            dataZoom: {
                type: 'inside',
                filterMode: 'none', // empty none
                minValueSpan: 3
            },
            xAxis: {
                show: false,
                type: 'category',
                data: data.time
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: data.value,
                type: 'line'
            }]
        };
        chart.setOption(option);
    };

    return {
        init: _init,
    }
})();
TestChart.init();
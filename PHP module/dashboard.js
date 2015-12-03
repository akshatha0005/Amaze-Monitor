/**
* Request data from the server, add it to the graph and set a timeout
* to request again
*/
/*function requestData() {
    $.ajax({
        url: 'cpu_util.php?epoch=100',
        success: function (point) {
           // alert(point);
            var series1 = chart.series[0],
    series2 = chart.series[1],
        shift1 = series1.data.length > 5; // shift if the series is
            // longer than 20
            shift2 = series2.data.length > 5;
            // add the point
            chart.series[0].addPoint(point, true, shift1);
            chart.series[1].addPoint(point, true, shift2);
            chart.series[2].addPoint(point, true, shift2);


            // call it again after one second
            setInterval(requestData, 30000);
        },
        cache: false
    });
}*/
function requestData(url) {
    $.getJSON(url, function (json) {
        for (i = 0; i < json.length; i++) {
           // alert(json[i]);
            chart.series[i].addPoint(json[i], true, true);
        }
        setTimeout(function () { requestData(url) }, 10000);
    }); 
}

$(document).ready(function () {
    var options = {
        chart: {
            renderTo: 'container',
            type: 'spline',
            zoomType: 'xy',
            marginRight: 120,
            marginBottom: 25,
            borderColor: '#EBBA95',
            borderWidth: 1,
            events: {
                //load: requestData
            }
        },
        title: {
            text: 'CPU Utilization',
            x: -20 //center
        },
        subtitle: {
            text: '',
            x: -20
        },
        xAxis: {
            title: {
                text: 'Utilization'
            },
            type: 'datetime'
        },
        yAxis: {
            title: {
                text: 'Utilization'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.series.name + '</b><br/>' +
                        Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                        Highcharts.numberFormat(this.y, 2);
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -10,
            y: 100,
            borderWidth: 0
        },
        series: []
    }

    //NetWRk In
    $.getJSON("network_in.php", function (json) {
        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });
        //options.xAxis.categories = json[0]['data'];
        options.title.text = 'Network In';
        options.chart.renderTo = 'container1';
        //options.chart.events.load = requestData;
        options.yAxis.title.text = "Bytes";
        for (i = 0; i < json.length; i++) {
            options.series[i] = json[i];
        }
        //options.series[0] = json[0];
        //options.series[1] = json[1];
        chart = new Highcharts.Chart(options);
    });



    //NetWrk Out
    $.getJSON("network_out.php", function (json) {
        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });
        options.series = [];
        //options.xAxis.categories = json[0]['data'];
        options.title.text = 'Network Out';
        //options.chart.events.load = requestData;
        options.yAxis.title.text = "Bytes";

        options.chart.renderTo = 'container2';
        for (i = 0; i < json.length; i++) {
            options.series[i] = json[i];
        }
        chart = new Highcharts.Chart(options);
    });

    //CPU UTIL
    $.getJSON("cpu_util.php", function (json) {
        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });
        options.series = [];
        //options.xAxis.categories = json[0]['data'];
        options.title.text = 'CPU Utilization';
        options.chart.events.load = requestData("cpu_util.php?epoch=100");
        options.yAxis.title.text = "Percent";

        options.chart.renderTo = 'container3';
        for (i = 0; i < json.length; i++) {
            options.series[i] = json[i];
        }
        chart = new Highcharts.Chart(options);
    });

    $.getJSON("disk_read_ops.php", function (json) {
        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });
        options.series = [];
        //options.xAxis.categories = json[0]['data'];
        options.title.text = 'Disk Read Ops';
        //options.chart.events.load = requestData;
        options.yAxis.title.text = "Operations";
        options.chart.renderTo = 'container4';
        for (i = 0; i < json.length; i++) {
            options.series[i] = json[i];
        }
        chart = new Highcharts.Chart(options);
    });

    $.getJSON("disk_read_bytes.php", function (json) {
        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });
        options.series = [];
        //options.xAxis.categories = json[0]['data'];
        options.title.text = 'Disk Read Bytes';
        //options.chart.events.load = requestData;
        options.yAxis.title.text = "Bytes";

        options.chart.renderTo = 'container5';
        for (i = 0; i < json.length; i++) {
            options.series[i] = json[i];
        }
        chart = new Highcharts.Chart(options);
    });


    //write OPS
    $.getJSON("dis_write_ops.php", function (json) {
        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });
        options.series = [];
        //options.xAxis.categories = json[0]['data'];
        options.title.text = 'Disk write Ops';
        //options.chart.events.load = requestData;
        options.yAxis.title.text = "Operations";

        options.chart.renderTo = 'containerWRO';
        for (i = 0; i < json.length; i++) {
            options.series[i] = json[i];
        }
        chart = new Highcharts.Chart(options);
    });

    //Disk write bytes
    $.getJSON("dis_write_bytes.php", function (json) {
        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });
        options.series = [];
        //options.xAxis.categories = json[0]['data'];
        options.title.text = 'Disk Write Bytes';
        //options.chart.events.load = requestData;
        options.chart.renderTo = 'containerWRB';
        for (i = 0; i < json.length; i++) {
            options.series[i] = json[i];
        }
        chart = new Highcharts.Chart(options);
    });


    //Memory utilization
    $.getJSON("mem_util.php", function (json) {
        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });
        options.series = [];
        //options.xAxis.categories = json[0]['data'];
        options.title.text = 'Memory Utilization';
        options.yAxis.title.text = "Megabytes";
        //options.chart.events.load = requestData;
        options.chart.renderTo = 'container6';
        for (i = 0; i < json.length; i++) {
            options.series[i] = json[i];
        }
        chart = new Highcharts.Chart(options);
    });

    //Memory available
    $.getJSON("mem_avail.php", function (json) {
        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });
        options.series = [];
        //options.xAxis.categories = json[0]['data'];
        options.title.text = 'Memory Available';
        //options.chart.events.load = requestData;
        options.yAxis.title.text = "Megabytes";
        options.chart.renderTo = 'containerMEA';
        for (i = 0; i < json.length; i++) {
            options.series[i] = json[i];
        }
        chart = new Highcharts.Chart(options);
    });

    //Memory utilization
    $.getJSON("mem_used.php", function (json) {
        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });
        options.series = [];
        //options.xAxis.categories = json[0]['data'];
        options.title.text = 'Memory Used';
        //options.chart.events.load = requestData;
        options.yAxis.title.text = "Megabytes";
        options.chart.renderTo = 'containerMEU';
        for (i = 0; i < json.length; i++) {
            options.series[i] = json[i];
        }
        chart = new Highcharts.Chart(options);
    });

    $.getJSON("http.php", function (json) {
        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });
        options.series = [];
        //options.xAxis.categories = json[0]['data'];
        options.title.text = 'HTTP';
        //options.chart.events.load = requestData;
        options.yAxis.title.text = "Counts per minute";
        options.chart.renderTo = 'container7';
        for (i = 0; i < json.length; i++) {
            options.series[i] = json[i];
        }
        chart = new Highcharts.Chart(options);
    });

    $.getJSON("tcp.php", function (json) {
        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });
        options.series = [];
        //options.xAxis.categories = json[0]['data'];
        options.title.text = 'TCP';
        //options.chart.events.load = requestData;
        options.yAxis.title.text = "Counts per minute";
        options.chart.renderTo = 'container8';
        for (i = 0; i < json.length; i++) {
            options.series[i] = json[i];
        }
        chart = new Highcharts.Chart(options);
    });
});

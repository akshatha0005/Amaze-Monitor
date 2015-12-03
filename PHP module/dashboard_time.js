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
            //alert(json[i]);
            chart1.series[i].addPoint(json[i], true, true);
        }
        setTimeout(function () { requestData(url) }, 10000);
    });
}

/*$(document).ready(function () {
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
                load: requestData
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
    */
    function fetch()
{
  var array = [];
  var j = 0;
  var chks = document.getElementsByName('check_list[]');
  for (var i = 0; i < chks.length; i++)
  {
    if (chks[i].checked)
    {
      array[j++] = chks[i].value;
    }
  }
  var e = document.getElementById("time");
var time_val = e.options[e.selectedIndex].value;
    var options = {
        chart: {
            renderTo: 'container',
            type: 'spline',
            marginRight: 130,
            marginBottom: 25,
            borderColor: '#EBBA95',
            borderWidth: 3,
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


    //var data_to_send = JSON.stringify(array);
    var urlNetrwrkin = "network_in.php?data=&time="+time_val;


    //NetWRk In
    $.getJSON(urlNetrwrkin, function (json) {
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


    var urlNetrwrkout = "network_out.php?data=&time="+time_val;
    //NetWrk Out
    $.getJSON(urlNetrwrkout, function (json) {
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

    var urlCpu = "cpu_util.php?data=&time="+time_val;
    //CPU UTIL
    $.getJSON(urlCpu, function (json) {
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
        chart1 = new Highcharts.Chart(options);
    });

    var urlDiskReadOps = "disk_read_ops.php?data=&time="+time_val;
    $.getJSON(urlDiskReadOps, function (json) {
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

    var urlDiskReadBytes = "disk_read_bytes.php?data=&time="+time_val;
    $.getJSON(urlDiskReadBytes, function (json) {
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
    var urlDiskWriteOps = "dis_write_ops.php?data=&time="+time_val;
    $.getJSON(urlDiskWriteOps, function (json) {
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
    var urlDiskWriteBytes = "dis_write_bytes.php?data=&time="+time_val;
    $.getJSON(urlDiskWriteBytes, function (json) {
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
    var urlMemUtil = "mem_util.php?data=&time="+time_val;
    $.getJSON(urlMemUtil, function (json) {
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
    var urlMemAvail = "mem_avail.php?data=&time="+time_val;
    $.getJSON(urlMemAvail, function (json) {
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
    var urlMemUsed = "mem_used.php?data=&time="+time_val;
    $.getJSON(urlMemUsed, function (json) {
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

    //HTTP
    var urlHttp = "http.php?data=&time="+time_val;
    $.getJSON(urlHttp, function (json) {
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

    //TCP
    var urlTcp = "tcp.php?data=&time="+time_val;
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
    return false;
};

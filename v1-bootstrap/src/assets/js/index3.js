$(function() {

		// We use an inline data source in the example, usually data would
		// be fetched from a server

		var data = [],
			totalPoints = 300;

		function getRandomData() {

			if (data.length > 0)
				data = data.slice(1);

			// Do a random walk

			while (data.length < totalPoints) {

				var prev = data.length > 0 ? data[data.length - 1] : 50,
					y = prev + Math.random() * 10 - 5;

				if (y < 0) {
					y = 0;
				} else if (y > 100) {
					y = 100;
				}

				data.push(y);
			}

			var res = [];
			for (var i = 0; i < data.length; ++i) {
				res.push([i, data[i]])
			}

			return res;
		}

		var updateInterval = 30;
		$("#updateInterval").val(updateInterval).change(function () {
			var v = $(this).val();
			if (v && !isNaN(+v)) {
				updateInterval = +v;
				if (updateInterval < 1) {
					updateInterval = 1;
				} else if (updateInterval > 2000) {
					updateInterval = 2000;
				}
				$(this).val("" + updateInterval);
			}
		});

		var plot = $.plot("#placeholder4", [ getRandomData() ], {
			series: {
				shadowSize: 0	// Drawing is faster without shadows
			},
			grid: {
				borderColor: "rgba(167, 180, 201,.1)",
			},
			colors: ["#ff2b88"],
			yaxis: {
				min: 0,
				max: 100,
				tickLength: 0
			},
			xaxis: {
				tickLength: 0,
				show: false
			}
		});

		function update() {
			plot.setData([getRandomData()]);
			plot.draw();
			setTimeout(update, updateInterval);
		}

		update();

});



$(function(e){
  
  var chartdata3 = [
    {
      name: 'Good',
      type: 'bar',
      stack: 'Stack',
      data: [20, 56, 18, 75, 65, 74, 78, 67, 84]
    },
    {
      name: 'Bad',
      type: 'bar',
      stack: 'Stack',
      data: [12, 14, 15, 50, 24, 24, 10, 20 ,30]
    }
  ];

  var option5 = {
    grid: {
      top: '6',
      right: '0',
      bottom: '17',
      left: '25',
    },
	tooltip: {
		show: true,
		showContent: true,
		alwaysShowContent: true,
		triggerOn: 'mousemove',
		trigger: 'axis',
		axisPointer:
			{
				label: {
					show: false,
				}
			}

	},
    xAxis: {
      data: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
      axisLine: {
        lineStyle: {
          color: 'rgba(193, 184, 184,0.5)'
        }
      },
      axisLabel: {
        fontSize: 10,
        color: '#a7b4c9'
      }
    },
    yAxis: {
      splitLine: {
        lineStyle: {
          color: 'rgba(193, 184, 184,0.5)'
        }
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(193, 184, 184,0.5)'
        }
      },
      axisLabel: {
        fontSize: 10,
        color: '#a7b4c9'
      }
    },
    series: chartdata3,
	color:[ '#ff2b88', '#6963ff']
  };

  var chart5 = document.getElementById('echart5');
  var barChart5 = echarts.init(chart5);
  barChart5.setOption(option5);
});

var LineChart = function( heights, distances ) {

  var container = document.getElementById( "lineChart");

  var chart = new Highcharts.Chart({

    chart: {
      type: 'scatter',
      renderTo: container,
      backgroundColor: "#000066"
    },

    plotOptions: {
      series: {
        lineWidth: 1,
        shadow: "yellow"
      }
    },

    title: {
      text: "Ballistics Test",
      style: {
        display: "none"
      }
    },

    series: heights,

    xAxis: {
      categories: distances,
      visible: false
    },

    yAxis: {
      visible: false
    },

    credits: {
      enabled: false
    },

    legend: {
      enabled: false
    },



    

  })

}
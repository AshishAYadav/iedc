// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';
  var order = 'latest';
  var total = 30;

  //var canvas = document.getElementById('display_fetched_data');
  var payload = '';
  var sensor1 = [];
  var sensor2 = [];
  var timestamp = [];
$.ajax({ url: "http://localhost:8080/iedc/fetchdata.php?total="+total+"&order="+order+"",
          type:"GET",
          cache: false,
          dataType: "xml",
          success: function(xml) {
              $(xml).find('data').each(function(){

                  $(this).find("sensor1").each(function(){
                       sensor1.push($(this).text());
                  });
                  $(this).find("sensor2").each(function(){
                    sensor2.push($(this).text());
                  });
                  $(this).find("timestamp").each(function(){
                    var d = new Date($(this).text());
                    timestamp.push(d.getHours().toString()+":"+d.getMinutes().toString());
                  });
                  if(parseInt(sensor1) > 1000 && parseInt(sensor2)>1000)
                  {
                      payload+="<td>Poor</td>";

                  }
                  else if((parseInt(sensor1) > 600 && parseInt(sensor2)>600)&&(parseInt(sensor1) < 1000 && parseInt(sensor2)<1000) )
                  {
                      payload+="<td>Average</td>";
                  }else{
                      payload+="<td>Normal</td>";
                  }
                  
                  payload+="</tr>";

              });
            // Area Chart Example
var ctx = document.getElementById("myAreaChart");
var myLineChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: timestamp,
    datasets: [{
      label: "Sensor 1",
      lineTension: 0.3,
      backgroundColor: "rgba(2,117,216,0.2)",
      borderColor: "rgba(2,117,216,1)",
      pointRadius: 5,
      pointBackgroundColor: "rgba(2,117,216,1)",
      pointBorderColor: "rgba(255,255,255,0.8)",
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(2,117,216,1)",
      pointHitRadius: 50,
      pointBorderWidth: 2,
      data: sensor1,
    },
    {
      label: "Sensor 2",
      lineTension: 0.3,
      backgroundColor: "rgba(10,117,216,0.2)",
      borderColor: "rgba(28,117,216,1)",
      pointRadius: 5,
      pointBackgroundColor: "rgba(50,117,216,1)",
      pointBorderColor: "rgba(255,255,255,0.8)",
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(2,117,216,1)",
      pointHitRadius: 50,
      pointBorderWidth: 2,
      data: sensor2,
    }],
  },
  options: {
    scales: {
      xAxes: [{
        time: {
          unit: 'date'
        },
        gridLines: {
          display: false
        },
        ticks: {
          maxTicksLimit: 7
        }
      }],
      yAxes: [{
        ticks: {
          min: 396.9,
          max: 397.3,
          maxTicksLimit: 5
        },
        gridLines: {
          color: "rgba(0, 0, 0, .125)",
        }
      }],
    },
    legend: {
      display: false
    }
  }
});

          }
  
    })

  


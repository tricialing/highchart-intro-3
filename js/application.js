'use strict';

$(document).ready(function(){
  console.log('linked');

  //Class
  var Chart = function(){
    this.graphData = [];
    this.weeklySMAData = [];
    this.monthlySMAData = [];
  }; //end of Chart

  Chart.prototype.getAjaxData = function(){
    
    //2. data wraggling - weekly data
    var callBackFunction = function(response){
      // console.log('response');
      var items = response.data;
      var item;

      for (var i = 0; i < items.length; i++){
        item = items[i];
        this.graphData.push({
          x: new Date(item[0]),
          y: item[1]
        });
      }; // end of for


      // 4. get monthly avg 
      var sliceStarts;
      var sliceEnds; 

      for (var i = 0; i < this.graphData.length - 3; i++){
        sliceStarts = i; 
        sliceEnds = i+4; 
        var xValue = this.graphData[i].x;

        var monthlyData = this.graphData.slice(sliceStarts,sliceEnds); 

        var sum = 0;
        for (var j = 0; j < monthlyData.length; j++){
          var yValue = monthlyData[j].y;
          sum += yValue;
        } //end of for

        var monthlyAvg = sum/4;
        this.monthlySMAData.push({
          x: xValue,
          y: monthlyAvg 
        });
      } // end of for 

      console.log(this.monthlySMAData);

      // console.log(this.graphData);
      this.graphChart();

    } //end of callBackFunction

    //1. grabbing data
    $.ajax({
      context: this,
      type: 'GET',
      url: 'https://www.quandl.com/api/v1/datasets/BTS_MM/RETAILGAS.json?trim_start=1995-01-02&trim_end=2012-10-15&auth_token=E6kNzExHjay2DNP8pKvB',
      success: callBackFunction

    });//end of .ajax
  } //end of getAjaxData

  //3. Graph 
  Chart.prototype.graphChart = function(){

    var chartConfig = {
      title:{
        text: "Retail Gasoline Prices"
      },
      subtitle: {
        text: "Bureau of Transportation Statistics (Multimodal)"
      },
      xAxis: {
        type: 'datetime',
          dateTimeLabelFormats: {
            year: '%Y'
          },
        // categories:  
      },      
      yAxis: {
        min: 0,
        max: 5,
        title: {
          text: 'Price'
        }
      },
      legend: {
        // Configuration of Legends
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        borderWidth: 0
      },
      series: [
        {
        name: 'weekly',
        data: this.graphData.reverse()
        },
        {
        name: 'monthly',
        data: this.monthlySMAData.reverse()
        }
      ]

    }; // end of chartConfig
    // console.log(chartConfig); 
    // console.log(this.graphData); 
    $('#chart').highcharts(chartConfig);  

  }; //end of graphChart


  //instance 
  var chart = new Chart();
  chart.getAjaxData();

}); //end of doc ready
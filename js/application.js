'use strict';

$(document).ready(function(){
  console.log('linked');

  //Class
  var Chart = function(){
    this.graphData = [];
  }; 

  Chart.prototype.getAjaxData = function(){
    
    //2. data wraggling
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

        // console.log(this.graphData);
        this.graphChart();
      };// end of callBackFunction

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
        name: 'daily',
        data: this.graphData
        }
      ]

    }; // end of chartConfig
    console.log(chartConfig);
    console.log(this.graphData);
    $('#chart').highcharts(chartConfig);  

  }; //end of graphChart



  //instance 
  var chart = new Chart();
  chart.getAjaxData();

}); //end of doc ready
$(document).ready(function(){
  console.log('linked');

  //Class
  var Chart = function(){
  }; 

  Chart.prototype.makeAjaxData = function(){
    
    var callBackFunction = function(response){
        console.log('response');
      }


    $.ajax({
      type: 'GET',
      url: 'https://www.quandl.com/api/v1/datasets/BTS_MM/RETAILGAS.json?trim_start=1995-01-02&trim_end=2012-10-15&auth_token=E6kNzExHjay2DNP8pKvB',
      success: callBackFunction

    });//end of .ajax
  }; //end of makeAjaxData

  //instance 
  var chart = new Chart();
  chart.makeAjaxData();

}); //end of doc ready
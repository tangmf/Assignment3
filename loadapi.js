// API Settings
var settings = {
    "url": "https://api.covid19api.com/summary",
    "method": "GET",
    "timeout": 0,
    "headers": {
      "AccountKey": "4wI0kpClSgyt5mBKBfmEIQ==",
      "accept": "application/json"
    },
  };

  // Document Ready
  $(document).ready(function (){
      $(".global_stats_loading").hide(); // hide loading text
      $(".search_loading").hide();
      loadAPI();
      $("#search_btn").click(function () {
        $("#search_output").text("");
        $(".search_loading").show();
        search();
      });
  });

  // function that loads api and outputs data to the page
  function loadAPI(){
    $.ajax(settings).done(function (response) {
        console.log(response);
        $(".global_stats_loading").show(); // loading starts
        
        /* Global stats */
        let newConfirmed = response.Global.NewConfirmed;
        $("#newConfirmed_output").text("New Confirmed: " + newConfirmed);
        let totalConfirmed = response.Global.TotalConfirmed;
        $("#totalConfirmed_output").text("Total Confirmed: " + totalConfirmed);
        let newDeaths = response.Global.NewDeaths;
        $("#newDeaths_output").text("New Deaths: " + newDeaths);
        let totalDeaths = response.Global.TotalDeaths;
        $("#totalDeaths_output").text("Total Deaths: " + totalDeaths);
        let newRecovered = response.Global.NewRecovered;
        $("#newRecovered_output").text("New Recovered: " + newRecovered);
        let totalRecovered = response.Global.TotalRecovered;
        $("#totalRecovered_output").text("Total Recovered: " + totalRecovered);
        $(".global_stats_loading").hide(); // loading has finished  

        var countryList = [];
        for (i=0;i<response.Countries.length;i++){
          countryList.push(response.Countries[i]);
        }

        localStorage.setItem("Countries", JSON.stringify(countryList));
      });
  }
  function search(){
    $("#search_multiple").empty();
    let inputCountry = $("#search_input").val();
    if(inputCountry == ""){
      $("#search_output").html(`<p>Enter something!</p>`) // input is empty
      $(".search_loading").hide();
    }
    else{
      $.ajax(settings).done(function (response) {
        var i;
        let outputList = [];
        let outputCount = 0;
        for (i=0;i<response.Countries.length;i++){
          if((response.Countries[i].Country).toLowerCase().includes($("#search_input").val().toLowerCase())){ // non case-sensitive feature
            outputCount ++;
            // missing validation for when multiple records meet the requirements
            console.log("found");
            let countryName = response.Countries[i].Country;
            let countryTotalConfirmed = response.Countries[i].TotalConfirmed;
            let countryTotalDeaths = response.Countries[i].TotalDeaths;
            let countryTotalRecovered = response.Countries[i].TotalRecovered;
            outputList.push(countryName);
            $("#search_output").html(`<p>Country: ${countryName}</p><p>Cases: ${countryTotalConfirmed}</p><p>Total Deaths: ${countryTotalDeaths}</p><p>Total Recovered: ${countryTotalRecovered}</p>`)
          }
        }
        if (outputCount > 1){
          $("#search_multiple").append("Other results: ");
          for (i=0;i<outputList.length;i++){
            $("#search_multiple").append(outputList[i] + ",");
          }
        }
        else if(outputCount == 0){
            console.log("Country not found");
            $("#search_output").html(`<p>"${inputCountry}" not found</p>`);
        }
        
        $(".search_loading").hide();
      });
    }
  }
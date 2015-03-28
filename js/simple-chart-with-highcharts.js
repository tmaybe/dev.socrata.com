// START CONFIGURATION
var dataDomain = 'data.cms.gov'
var dataSetId = 'xpsg-6hup'
var dataQueryString = [ // following SoQL format documented at 
  '$select=drg_definition,avg(average_covered_charges),avg(average_medicare_payments),avg(average_total_payments)',
  '$group=drg_definition',
  '$order=avg_average_medicare_payments+desc',
  '$limit=5'
].join('&')
var chartTitle = 'Top 5 DRGs by Avg Medicare Payment'
// END CONFIGURATION

$(document).ready(function () {    
  $.get('https://'+dataDomain+'/resource/'+dataSetId+'.csv?'+dataQueryString, function (csv) {
    console.log("We got the following data back in CSV format", csv);
    $('#chart-container').highcharts({
      chart: {
        type: 'column'
      },
      data: {
        csv: csv,
      },
      title: {
        text: chartTitle
      },
      subtitle: {
        text: 'Source: https://'+dataDomain+'/d/'+dataSetId
      }
    });
  });
});
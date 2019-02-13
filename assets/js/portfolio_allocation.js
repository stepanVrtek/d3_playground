function renderPortfolioAllocation (data) {
  var chart_size = d3.select('#chart').node().getBoundingClientRect();
  var barHeight = chart_size.height/data.length;
  var maxBar = Math.round(data.max("value"));
  var maxChartValue = 5 - maxBar % 5 + maxBar;
  var barHeightCoef = .65;
  var barWidthCoef= 100;
  var gridLines = range(0, maxBar+5, 5);

  var bar_chart = d3.select('#chart').append("g");

  bar_chart.selectAll("line")
    .data(gridLines)
    .enter()
    .append("line")          // attach a line
    .style("stroke", "#E6E6E6")  // colour the line
    .attr("x1", function(d) {return barWidthCoef*d/maxChartValue + "%";})     // x position of the first end of the line
    .attr("y1", 0)      // y position of the first end of the line
    .attr("x2", function(d) {return barWidthCoef*d/maxChartValue + "%";})     // x position of the second end of the line
    .attr("y2", chart_size.height)    // y position of the second end of the line
    .attr('transform', "translate(0,0)");

  // bar_chart
  //   .append("line")          // attach a line
  //   .style("stroke", "black")  // colour the line
  //   .attr("x1", "6.8%")     // x position of the first end of the line
  //   .attr("y1", 0)      // y position of the first end of the line
  //   .attr("x2", "6.8%")     // x position of the second end of the line
  //   .attr("y2", chart_size.height)   // y position of the second end of the line
  //   .attr('transform', function(d, i) {
  //     return "translate(0,0)";
  //   });

  var bar = bar_chart
        .selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('width', function(d) {  return barWidthCoef*d.value/maxChartValue + "%"; })
        .attr('height', barHeight*barHeightCoef)
        .attr("class", "bar-chart-bar")
        .attr('transform', function(d, i) {
          return "translate(0," + (i + (1 - barHeightCoef)/2) * barHeight + ")";
        });

  // append label text
  var textChart = bar_chart.selectAll("text")
      .data(data)
      .enter()

  textChart.append("text")
      .text(function(d) {
          // return "+ " + d.value.toFixed(2) + " %";
          return d.value.toFixed(2) + "%";
      })
      .attr("y", function(d, i) {
          return barHeight * (i + 0.5);
      })
      .attr("dy", "2")
      .attr("x", function(d) { return barWidthCoef*d.value/maxChartValue + "%"; })
      .attr("alignment-baseline", "middle")
      .attr("class", function(d) {
        if (d.value/maxBar < 0.2) return "bar-chart-label-black";
        return "bar-chart-label-white";
      })
      .attr("text-anchor", function(d) {
        if (d.value/maxBar < 0.2) return "start";
        return "end";
      })
      .attr('transform', function(d) {
        // if bar is smaller than 20 % of the total width,
        // put label outside the bar
        if (d.value/maxBar < 0.2) return "translate(10,0)";
        return "translate(-10,0)";
      });

}


function renderPortfolioAllocationLabelY (data, id) {
  var chart_size = d3.select('#chart').node().getBoundingClientRect();
  var barHeight = chart_size.height/data.length;
  var maxBar = Math.round(data.max("value"));
  var maxChartValue = 5 - maxBar % 5 + maxBar;
  var barHeightCoef = .65;
  var barWidthCoef= 100;
  var gridLines = range(0, maxBar+5, 5);

  // append coin images
  var yAxis = d3.select("#"+id).append("g")
    .attr("class", "x-axis")
    .attr("transform", "translate(0,0)");

  var text = yAxis.selectAll("image")
      .data(data)
      .enter()
      .append("svg:image")
      .attr("y", function(d, i) {
          return barHeight * (i + 0.5) - 10.5;
      })
      .attr("x", function(d, i) {
          return 0;
      })
      .attr('width', 20)
      .attr('height', 20)
      .attr('transform', "translate(0,0)")
      .attr("xlink:href", function(d) {
        if (d.currency_id) return "https://testik.crypkit.com/static/img/64/"
        + d.currency_id +".png";
        return ""
      });

  // append tick text
  var textYAxis = yAxis.selectAll("text")
      .data(data)
      .enter()

  textYAxis.append("text")
      .text(function(d) {
          return d.label;
      })
      .attr("y", function(d, i) {
          return barHeight * (i + 0.5);
      })
      .attr("dy", "2")
      .attr("x", function(d, i) {
          if (d.currency_id) return 25;
          return 0;
      })
      .attr("alignment-baseline", "middle")
      .attr("class", "bar-chart-text")
      .attr('transform', "translate(0,0)")

}

function renderPortfolioAllocation (data) {
  var chart_size = d3.select('#chart').node().getBoundingClientRect();
  var barHeight = chart_size.height/data.length;
  var maxBar = Math.round(data.max("value"));
  var maxChartValue = 5 - maxBar % 5 + maxBar;
  var barHeightCoef = .65;
  var barWidthCoef= 100;
  var gridLines = range(0, maxBar+5, 5);

  var tooltip = d3.tooltip() // returns the tooltip function
    .extent([[0,0],[chart_size.width,chart_size.height]]) // tells the tooltip how much area it has to work with
    .tips(["value"],["Bar Name: "]) // tells the tooltip which properties to display in the tip and what to label thme
    .fontSize(12) // sets the font size for the tooltip
    .padding([8,4]) // sets the amount of padding in the tooltip rectangle
    .margin([10,10]); // set the distance H and V to keep the tooltip from the mouse pointer

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
    .attr('transform', "translate(0,0)")

  var bar = bar_chart
        .selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('width', function(d) {  return barWidthCoef*d.value/maxChartValue + "%"; })
        .attr('height', barHeight*barHeightCoef)
        .attr("class", "bar-chart-bar tooltip")
        .attr('transform', function(d, i) {
          return "translate(0," + (i + (1 - barHeightCoef)/2) * barHeight + ")";
        })
        .each(tooltip.events);

  // append label text
  var textChart = bar_chart.selectAll("text")
      .data(data)
      .enter()

  textChart.append("text")
      .text(function(d) {
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

  // has to be called at the end otherwise erases first text label
  bar_chart.call(tooltip) // draws the tooltip;

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

  var label_size = yAxis.node().getBoundingClientRect();
  document.getElementById(id).parentElement.style.width
    = (label_size.width + 20) + "px";

}

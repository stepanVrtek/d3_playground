// gridlines in y axis function
// function make_x_gridlines(y) {
//     return d3.axisLeft(y)
// }

function make_x_gridlines(x) {
    return d3.axisBottom(x)
      .ticks(5)
}

function renderPortfolioAllocation () {
  var data = [
    {
      "value":25.00,
      "label":"BTC",
      "currency_id": "bitcoin"
    },
    {
      "value":3.02,
      "label":"LTC",
      "currency_id": "litecoin"
    },
    {
      "value":20.76,
      "label":"LOOM",
      "currency_id": "loom-network"
    },
    {
      "value":30.90,
      "label":"STEM",
      "currency_id": "steem"
    },
    {
      "value":22.00,
      "label":"OTHER",
    }
  ];

  var chart_size = d3.select('#chart').node().getBoundingClientRect();
  var barHeight = chart_size.height/data.length;
  var maxBar = data.max("value");
  var barHeightCoef = .65;
  var barWidthCoef= 70;

  // append coin images
  var text = d3.select('#chart').selectAll("image")
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
      .attr("xlink:href", function(d) {
        if (d.currency_id) return "https://testik.crypkit.com/static/img/64/"+ d.currency_id +".png";
        return ""
      });

  d3.select('#chart')
    .append("line")          // attach a line
    .style("stroke", "black")  // colour the line
    .attr("x1", 100)     // x position of the first end of the line
    .attr("y1", 0)      // y position of the first end of the line
    .attr("x2", 100)     // x position of the second end of the line
    .attr("y2", chart_size.height);    // y position of the second end of the line

  d3.select('#chart')
    .append("line")          // attach a line
    .style("stroke", "black")  // colour the line
    .attr("x1", "6.8%")     // x position of the first end of the line
    .attr("y1", 0)      // y position of the first end of the line
    .attr("x2", "6.8%")     // x position of the second end of the line
    .attr("y2", chart_size.height)   // y position of the second end of the line
    .attr('transform', function(d, i) {
      return "translate(100,0)";
    });

  // append tick text
  var text = d3.select('#chart').selectAll("text")
      .data(data)
      .enter()

  text.append("text")
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

  var bar = d3.select('#chart')
        .selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('width', function(d) {  return barWidthCoef*d.value/maxBar + "%"; })
        .attr('height', barHeight*barHeightCoef)
        .attr("class", "bar-chart-bar")
        .attr('transform', function(d, i) {
          return "translate(100," + (i + (1 - barHeightCoef)/2) * barHeight + ")";
        });

  // append label text
  text.append("text")
      .text(function(d) {
          // return "+ " + d.value.toFixed(2) + " %";
          return d.value.toFixed(2) + "%";
      })
      .attr("y", function(d, i) {
          return barHeight * (i + 0.5);
      })
      .attr("dy", "2")
      .attr("x", function(d) { return barWidthCoef*d.value/maxBar + "%"; })
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
        if (d.value/maxBar < 0.2) return "translate(110,0)";
        return "translate(90,0)";
      });

  }

d3.select("#show-bar1")
    .on('click', function () {
        if (d3.select("#chart-row").attr("chart") == "portfolio_allocation") return;
        else d3.select('#chart').selectAll('svg').remove();

        var chart = d3.select("#chart");
        d3.select("#chart-row").attr("chart", "portfolio_allocation");

        d3.select("#chart-header")
          .text("Portfolio allocation");

        chart.classed("hidden", false);

        renderPortfolioAllocation();
    });




    // // GRID LINES
    // // remove all grid lines which could stay there accidentally
    // d3.select('#chart').selectAll('.grid').remove();
    //
    // // add the X gridlines
    // var x = d3.scaleLinear().range([0, chart_size.width*0.5]);
    // // var gridStart = chart_size.height - barHeight*barHeightCoef/2;
    // var gridStart = chart_size.height;
    // var gridLindes = d3.select('#chart').append("g")
    //     .attr("class", "grid")
    //     .attr("transform", "translate(100," + gridStart + ")")
    //     .call(make_x_gridlines(x)
    //         .tickSize(-chart_size.height)
    //         .tickFormat("")
    //     )
    // var y = d3.scaleLinear().range([0, chart_size.height]);
    //
    // // add the Y gridlines
    // d3.select('#chart').append("g")
    //     .attr("class", "grid")
    //     .call(make_x_gridlines(y)
    //         .tickSize(-chart_size.width)
    //         .tickFormat("")
    //     )

// Globals
var graphWidth = screen.availWidth;
var graphHeight = screen.availHeight;
var radius = 3;
var margins = {
  left: 100,
  top: 100,
  right: 100,
  bottom: 100
};
var axisPadding = 3;
var totalHeight = graphHeight + margins.top + margins.bottom;
var totalWidth = graphWidth + margins.left + margins.right;

var url = "Tuition_Assistance_Program__TAP__Recipients___Dollars_by_College__Sector_Group__and_Level_of_Study__Beginning_2000.csv";


// data sourcing
d3.csv(url, function(data) {

  var moneyAndStudents = data.map(function(d) {
    return {
      yForMoney: +d["TAP Recipient Headcount"],
      xForStudents: +d["TAP Recipient Dollars"],
      sector: d["Sector Type"]
    };
  });

  var xExtents = d3.extent(moneyAndStudents, function(d) {
    return d.yForMoney;
  });

  var yExtents = d3.extent(moneyAndStudents, function(d) {
    return d.xForStudents;
  });

  var xScale = d3.scale.linear()
    .domain(xExtents)
    .range([0, graphWidth]);

  var yScale = d3.scale.linear()
    .domain(yExtents)
    .range([0, graphHeight]);

  var svg = d3.select('body')
    .append('svg')
    .attr('width', totalWidth)
    .attr('height', totalHeight);

  var yAxisScale = d3.scale.linear()
    .domain([yExtents[1], 0])
    .range([0, graphHeight]);

  var xGridlinesAxis = d3.svg.axis().scale(xScale).orient("bottom");
  var xAxis = d3.svg.axis().scale(xScale).orient("bottom");
  var yGridlinesAxis = d3.svg.axis().scale(yAxisScale).orient("left");
  var yAxis = d3.svg.axis().scale(yAxisScale).orient("left");

  var yGridlineNodes = svg.append('g')
    .attr('transform', 'translate(' + (margins.left + graphWidth) + ',' + margins.top + ')')
    .call(yGridlinesAxis
      .tickSize(graphWidth + axisPadding, 0, 0)
      .tickFormat(""));
  styleGridlineNodes(yGridlineNodes);

  var xGridlineNodes = svg.append('g')
    .attr('transform', 'translate(' + margins.left + ',' + (graphHeight + margins.top + axisPadding) + ')')
    .call(xGridlinesAxis
      // the line below caused you literally 90+ min of trouble; for whatever
      // reason, it was interacting strangely with '- graphHeight-axisPadding'
      // as the first param. 
      .tickSize(-graphHeight, 0, 0)
      .tickFormat(""));
  styleGridlineNodes(xGridlineNodes);

  var yAxisNodes = svg.append('g')
    .attr('transform', 'translate(' + (margins.left - axisPadding) + ',' + margins.top + ')')
    .call(yAxis);
  styleAxisNodes(yAxisNodes);

  var xAxisNodes = svg.append('g')
    .attr('transform', 'translate(' + margins.left + ',' + (totalHeight - margins.bottom + axisPadding) + ')')
    .call(xAxis);
  styleAxisNodes(xAxisNodes);

  var graphGroup = svg.append('g')
    .attr('transform', 'translate(' + margins.left + ', ' + margins.top + ')');

  graphGroup.selectAll('circle')
    .data(moneyAndStudents)
    .enter()
    .append('circle')
    .attr({
      cx: function(d) {
        return xScale(d.yForMoney);
      },
      cy: function(d) {
        return (graphHeight - yScale(d.xForStudents));
      },
      r: radius,
      fill: function(d) {
        if (d.sector === "PUBLIC") {
          return "steelblue";
        } else {
          return "salmon";
        }
      }
    });


}); //end d3.csv


function styleAxisNodes(axisNodes) {
  axisNodes.selectAll('.domain')
    .attr({
      fill: 'none',
      'stroke-width': 1,
      stroke: 'black'
    });
  axisNodes.selectAll('.tick line')
    .attr({
      fill: 'none',
      'stroke-width': 1,
      stroke: 'black'
    });
}

function styleGridlineNodes(axisNodes) {
  axisNodes.selectAll('.domain')
    .attr({
      fill: 'none',
      stroke: 'none'
    });
  axisNodes.selectAll('.tick line')
    .attr({
      fill: 'none',
      'stroke-width': 1,
      stroke: 'lightgray',
    });
}

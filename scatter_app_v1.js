// Globals
var graphWidth = screen.availWidth * 0.8;
var graphHeight = screen.availHeight * 0.8;
var radius = 2;
var margins = {
  left: 100,
  top: 50,
  right: 100,
  bottom: 50
};
var axisPadding = 3;
var totalHeight = graphHeight + margins.top + margins.bottom;
var totalWidth = graphWidth + margins.left + margins.right;

var url = "Tuition_Assistance_Program__TAP__Recipients___Dollars_by_College__Sector_Group__and_Level_of_Study__Beginning_2000.csv";


// data sourcing
d3.csv(url, function(data) {

  var moneyAndStudents = data.map(function(d) {
    return {
      students: +d["TAP Recipient Headcount"],
      money: +d["TAP Recipient Dollars"],
      sector: d["Sector Type"],
      name: d["TAP College Name"],
      year: d["Academic Year"],
    };
  });

  var xExtents = d3.extent(moneyAndStudents, function(d) {
    return d.students;
  });

  var yExtents = d3.extent(moneyAndStudents, function(d) {
    return d.money;
  });

  var xScale = d3.scale.linear()
    .domain(xExtents)
    .range([0, graphWidth]);

  var yScale = d3.scale.linear()
    .domain(yExtents)
    .range([0, graphHeight]);

  var zoomBehavior = d3.behavior.zoom()
    .scaleExtent([0.1, 100])
    .on('zoom', onZoom);

  var svg = d3.select('main')
    .append('svg')
    .attr('width', totalWidth)
    .attr('height', totalHeight)
    .call(zoomBehavior)
    .append('g');

  var div = d3.select("main").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

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
    // note the call to d3.format *within* .tickformat()
    .call(yAxis.tickFormat(d3.format("$,")));
  styleAxisNodes(yAxisNodes);

  var xAxisNodes = svg.append('g')
    .attr('transform', 'translate(' + margins.left + ',' + (totalHeight - margins.bottom + axisPadding) + ')')
    .call(xAxis.tickFormat(function(d) {
      // regular expression below doesn't work - must find workaround
      return addComma(d) + "\r Students";
    }));
  styleAxisNodes(xAxisNodes);

  var graphGroup = svg.append('g')
    .attr('transform', 'translate(' + margins.left + ', ' + margins.top + ')');

  graphGroup.selectAll('circle')
    .data(moneyAndStudents)
    .enter()
    .append('circle')
    .attr({
      cx: function(d) {
        return xScale(d.students);
      },
      cy: function(d) {
        return (graphHeight - yScale(d.money));
      },
      r: radius,
      fill: function(d) {
        if (d.sector === "PUBLIC") {
          return "steelblue";
        } else {
          return "salmon";
        }
      }
    })
    .on('mouseenter', function(d) {
      div.transition()
        .duration(200)
        .style("opacity", 0.9);
      div.html("<p>" + d.name + "</p><p>Year: " +
          d.year + "</p><p>" +
          d.students.toLocaleString('en-US') + " students</p><p>" +
          d.money.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
          }) + "</p>")
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
    })
    .on("mouseout", function(d) {
      div.transition()
        .duration(500)
        .style("opacity", 0);
    });

    function onZoom() {
      console.log('sup');
      svg.attr('transform', 'translate(' + d3.event.translate + ')' +
        'scale(' + d3.event.scale + ')');
    }

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

var addComma = d3.format(",");

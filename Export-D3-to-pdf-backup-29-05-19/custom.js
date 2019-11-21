//data = [{"sepalLength":"5.1","sepalWidth":"3.5","petalLength":"1.4","petalWidth":"0.2","species":"setosa"},{"sepalLength":"4.6","sepalWidth":"3.6","petalLength":"1.0","petalWidth":"0.2","species":"setosa"},{"sepalLength":"6.0","sepalWidth":"2.7","petalLength":"5.1","petalWidth":"1.6","species":"versicolor"},{"sepalLength":"5.5","sepalWidth":"2.6","petalLength":"4.4","petalWidth":"1.2","species":"versicolor"},{"sepalLength":"6.1","sepalWidth":"3.0","petalLength":"4.6","petalWidth":"1.4","species":"versicolor"},{"sepalLength":"5.8","sepalWidth":"2.6","petalLength":"4.0","petalWidth":"1.2","species":"versicolor"},{"sepalLength":"5.0","sepalWidth":"2.3","petalLength":"3.3","petalWidth":"1.0","species":"versicolor"},{"sepalLength":"5.6","sepalWidth":"2.7","petalLength":"4.2","petalWidth":"1.3","species":"versicolor"},{"sepalLength":"5.7","sepalWidth":"3.0","petalLength":"4.2","petalWidth":"1.2","species":"versicolor"},{"sepalLength":"6.2","sepalWidth":"3.4","petalLength":"5.4","petalWidth":"2.3","species":"virginica"},{"sepalLength":"5.9","sepalWidth":"3.0","petalLength":"5.1","petalWidth":"1.8","species":"virginica"}];
/*
function svgTable(data){
        var pair = d3.keys(data[0])

        d3.select("#ab")
          .append("foreignObject")
          .attr("width", 500)
          .attr("height", 500)
          .append("xhtml:table");

        d3.select("table")
          .append("tr")
          .attr("class", "head")
          .selectAll("th")
          .data(pair)
          .enter()
          .append("th")
          .html(function (d) {return d})

        d3.select("table")
          .selectAll("tr.data")
          .data(data).enter()
          .append("tr")
          .attr("class", "data")

        d3.selectAll("tr")
          .selectAll("td")
          .data(function(d) {return d3.entries(d)})
          .enter()
          .append("td")
          .html(function (d) {return d.value})
    }

svgTable(data);
*/

/*--------------------------*/
/*var margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 40
      },
      width = 400 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

    var x = d3.scale.linear()
      .range([0, width]);

    var y = d3.scale.linear()
      .range([height, 0]);

    var color = d3.scale.category10();

    var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

    var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");
    //d3.select('body').append('#container');
    var svg = d3.select('#graph-container').append('svg')
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    
    data.forEach(function(d) {
      d.sepalLength = +d.sepalLength;
      d.sepalWidth = +d.sepalWidth;
    });

    x.domain(d3.extent(data, function(d) {
      return d.sepalWidth;
    })).nice();
    y.domain(d3.extent(data, function(d) {
      return d.sepalLength;
    })).nice();

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("Sepal Width (cm)");

    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Sepal Length (cm)")

    svg.selectAll(".dot")
      .data(data)
      .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 3.5)
      .attr("cx", function(d) {
        return x(d.sepalWidth);
      })
      .attr("cy", function(d) {
        return y(d.sepalLength);
      })
      .style("fill", function(d) {
        return color(d.species);
      });

    var legend = svg.selectAll(".legend")
      .data(color.domain())
      .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) {
        return "translate(0," + i * 20 + ")";
      });

    legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

    legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) {
        return d;
      });

    var brush = d3.svg.brush()
      .x(x)
      .y(y)
      .on("brush", brushmove)
      .on("brushend", brushend);

    svg.call(brush);

    // Highlight the selected circles.
    function brushmove(p) {
      var e = brush.extent();
      svg.selectAll("circle").classed("hidden", function(d) {
        if (e[0][0] > d.sepalWidth || d.sepalWidth > e[1][0] || e[0][1] > d.sepalLength || d.sepalLength > e[1][1]) {
          d.selected = false;
        } else {
          d.selected = true;
        }
        return d.selected;
      });

      tRows.classed("selected", function(d) {
        return d.selected;
      });
    }

    // If the brush is empty, select all circles.
    function brushend() {
      if (brush.empty()) svg.selectAll(".hidden").classed("hidden", false);
    }

    // draw table


    var t = d3.select('body').append('table');

    t.append('tr')
      .selectAll('th')
      .data(d3.keys(data[0]))
      .enter()
      .append('th')
      .text(function(d) {
        return d;
      });

    var tRows = t.selectAll('tr')
      .data(data)
      .enter()
      .append('tr');

    tRows
      .selectAll('td')
      .data(function(d) {
        return d3.values(d);
      })
      .enter()
      .append('td')
      .html(function(d) {
        return d;
      });
  
    function exportToPdf() {
      
      let canvas = document.createElement('canvas');

      var svg = document.querySelector('svg');
      var serializer = new XMLSerializer();
      var svgString = serializer.serializeToString(svg);
      canvg(canvas, svgString);


      let imgData = canvas.toDataURL();

      var doc = new jsPDF();
      doc.addImage(imgData, 'JPEG', 0, 0);
      doc.save('download.pdf');
    }  


/*  -----------------------  */

// Table module ////////////////////////////////////
var Table = function module() {
    var opts = {
        width: 200,
        height: 200,
        margins: {top: 20, right: 20, bottom: 20, left: 20}
    };

    function exports(selection) {
        selection.each(function (dataset) {

            //________________________________________________
            // Data
            //________________________________________________
            var columnLabel = dataset.columnLabel;
            //var rowLabel = dataset.rowLabel;
            var value = dataset.value;

            //________________________________________________
            // DOM preparation
            //________________________________________________
            // Size
            var chartW = Math.max(opts.width - opts.margins.left - opts.margins.right, 0.1);
            var chartH = Math.max(opts.height - opts.margins.top - opts.margins.bottom, 0.1);

            // SVG
            var parentDiv = d3.select(this).html('');
            var svg = parentDiv.append('svg').attr('width', opts.width).attr('height', opts.height);
            var visSvg = svg.append('g').attr('class', 'vis-group').attr('transform', 'translate(' + opts.margins.left + ',' + opts.margins.top + ')');
            var tableBodySvg = visSvg.append('g').attr('class', 'chart-group');
            var tableHeaderSvg = visSvg.append('g').attr('class', 'chart-group');
            var rowHeaderSvg = tableHeaderSvg.append('g').attr('class', 'row-header');
            var colHeaderSvg = tableHeaderSvg.append('g').attr('class', 'col-header');

            //________________________________________________
            // Table
            //________________________________________________
            var rowHeaderLevelNum = 1;
            var colHeaderLevelNum = 1;
            var cellH = chartH / (value.length + rowHeaderLevelNum);
            var cellW = chartW / (value[0].length + colHeaderLevelNum);

            // Col header
            var colHeaderCell = colHeaderSvg.selectAll('rect.col-header-cell')
                .data(columnLabel);
            colHeaderCell.enter().append('rect')
                .attr({
                    class:'col-header-cell',
                    width:cellW, height:cellH,
                    x: function(d, i){return i * cellW + (cellW * rowHeaderLevelNum)},
                    y: 0
                })
                .style({fill:'#eee', stroke:'silver'});

            // Col header text
            colHeaderCell.enter().append('text')
                .attr({
                    class:'col-header-content',
                    x: function(d, i){return i * cellW + (cellW * rowHeaderLevelNum)},
                    y: 0,
                    dx: cellW/2,
                    dy: cellH/2
                })
                .style({fill:'black', 'text-anchor':'middle'})
                .text(function(d, i){return d;});

            // Body
            var row = tableBodySvg.selectAll('g.row')
                .data(value);
            row.enter().append('g')
                .attr('class', 'cell row')
                .each(function(pD, pI){
                    // Cells
                    var cell = d3.select(this)
                        .selectAll('rect.cell')
                        .data(pD);
                    cell.enter().append('rect')
                        .attr({
                            class:'cell', width:cellW, height:cellH,
                            x: function(d, i){return i * cellW + (cellW * rowHeaderLevelNum)},
                            y: function(d, i){return pI * cellH + cellH}
                        })
                        .style({fill:'white', stroke:'silver'});
                    // Text
                    cell.enter().append('text')
                        .attr({
                            class:'cell-content', width:cellW, height:cellH,
                            x: function(d, i){return i * cellW + (cellW * rowHeaderLevelNum)},
                            y: function(d, i){return pI * cellH + cellH},
                            dx: cellW/2,
                            dy: cellH/2
                        })
                        .style({fill:'black', 'text-anchor':'middle'})
                        .text(function(d, i){return d;});
                });
        });
    }

    exports.opts = opts;
    createAccessors(exports, opts);
    return exports;
};
                      
var createAccessors = function(visExport) {
    for (var n in visExport.opts) {
        if (!visExport.opts.hasOwnProperty(n)) continue;
        visExport[n] = (function(n) {
            return function(v) {
                return arguments.length ? (visExport.opts[n] = v, this) : visExport.opts[n];
            }
        })(n);
    }
};   */                     
                       
/*var dataset = {
    columnLabel: ['P', 'Q', 'R', 'S'],
    value: [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16], [17, 18, 19, 20]]
};
                        
var width = 400;
var height = 300;

var table = Table().width(width).height(height);

d3.select('body')
    .datum(dataset)
    .call(table);*/

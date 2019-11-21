
data = [{"sepalLength":"5.1","sepalWidth":"3.5","petalLength":"1.4","petalWidth":"0.2","species":"setosa"},{"sepalLength":"4.6","sepalWidth":"3.6","petalLength":"1.0","petalWidth":"0.2","species":"setosa"},{"sepalLength":"6.0","sepalWidth":"2.7","petalLength":"5.1","petalWidth":"1.6","species":"versicolor"},{"sepalLength":"5.5","sepalWidth":"2.6","petalLength":"4.4","petalWidth":"1.2","species":"versicolor"},{"sepalLength":"6.1","sepalWidth":"3.0","petalLength":"4.6","petalWidth":"1.4","species":"versicolor"},{"sepalLength":"5.8","sepalWidth":"2.6","petalLength":"4.0","petalWidth":"1.2","species":"versicolor"},{"sepalLength":"5.0","sepalWidth":"2.3","petalLength":"3.3","petalWidth":"1.0","species":"versicolor"},{"sepalLength":"5.6","sepalWidth":"2.7","petalLength":"4.2","petalWidth":"1.3","species":"versicolor"},{"sepalLength":"5.7","sepalWidth":"3.0","petalLength":"4.2","petalWidth":"1.2","species":"versicolor"},{"sepalLength":"6.2","sepalWidth":"3.4","petalLength":"5.4","petalWidth":"2.3","species":"virginica"},{"sepalLength":"5.9","sepalWidth":"3.0","petalLength":"5.1","petalWidth":"1.8","species":"virginica"}];

var Table = function module() {
          var opts = {
              width: 200,
              height: 200,
              margins: {top: 20, right: 20, bottom: 20, left: 20}
          };

          var dataset = {};
          var mapArray = [];
          var mapResult = [];
          var arrayCollection = []; 
          function exports(selection) {
              selection.each(function (data) {    
              
              data.forEach(function(arrElement, index) {

                     for(var key in arrElement) {
                       
                        arrayCollection.push(arrElement[key]);
                    }  

                    mapArray[index] = arrayCollection;
                    arrayCollection = [];
              });

              mapResult["value"] = mapArray;
              dataset.value = mapArray;
              dataset.columnLabel = Object.keys(data[0]);

             

                  var columnLabel = dataset.columnLabel;
                  //var rowLabel = dataset.rowLabel;
                  var value = dataset.value;

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
        
      // Helper function ////////////////////////////////////                       
      var createAccessors = function(visExport) {
          for (var n in visExport.opts) {
              if (!visExport.opts.hasOwnProperty(n)) continue;
              visExport[n] = (function(n) {
                  return function(v) {
                      return arguments.length ? (visExport.opts[n] = v, this) : visExport.opts[n];
                  }
              })(n);
          }
      };                       
                              
      var width = 400;
      var height = 300;

      var table = Table().width(width).height(height);

      d3.select('body')
          .datum(data)
          .call(table);



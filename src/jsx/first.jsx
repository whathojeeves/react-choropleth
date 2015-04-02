var React = require('react'),
    $ = require('jquery'),
    d3 = require('d3'),
    topojson = require('topojson');

var FirstComponent = React.createClass({

  render: function () {

    return (
        <svg id='destSvg' width={this.props.options.width} height={this.props.options.height}>
        </svg>
    );
  },

  componentDidMount: function() {

    var projection = d3.geo.albersUsa()
      .scale(1280)
      .translate([this.props.options.width / 2, this.props.options.height / 2]);

    var path = d3.geo.path()
      .projection(projection);

    var topoData = this.props.options.topoData;

    var svg = d3.select('#destSvg');
    svg.append("g")
      .attr("class", "counties")
    .selectAll("path")
      .data(topojson.feature(topoData, topoData.objects.counties).features)
    .enter().append("path")
      .attr("d", path);

    svg.append("path")
      .datum(topojson.mesh(topoData, topoData.objects.states, function(a, b) { return a !== b; }))
      .attr("class", "states")
      .attr("d", path);

  }

});


module.exports = function(elemId, options) {

  if(options.topourl) {
    $.ajax({
      type: 'GET',
      dataType: 'json',
      url: options.topourl,
      success: function(data) {
        options.topoData = data;
        //Render component
        React.render(
          <FirstComponent options={options}/>,
          document.getElementById(elemId)
        );
      },
      error: function(j,t,e) {
        console.log(e);
      }
    });
  } else {
    console.log('No topojson url');
  }

}

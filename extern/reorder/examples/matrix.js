function matrix(svg, width, height) {
  var matrix = [],
      nodes = mygraph.nodes,
      n = nodes.length;

  // Compute index per node.
  nodes.forEach(function(node, i) {
    node.index = i;
    node.count = 0;
    matrix[i] = d3.range(n).map(function(j) { return {x: j, y: i, z: 0}; });
  });

  // Convert links to matrix; count character occurrences.
  mygraph.links.forEach(function(link) {
    matrix[link.source][link.target].z += link.value;
    matrix[link.target][link.source].z += link.value;
    matrix[link.source][link.source].z += link.value;
    matrix[link.target][link.target].z += link.value;
    nodes[link.source].count += link.value;
    nodes[link.target].count += link.value;
  });
  var adjacency = matrix.map(function(row) {
      return row.map(function(c) { return c.z; });
  });

  var graph = reorder.graph()
	  .nodes(mygraph.nodes)
	  .links(mygraph.links)
	  .init();

    var dist_adjacency;

    var leafOrder = reorder.optimal_leaf_order()
    	    .distance(science.stats.distance.manhattan);

    function computeLeaforder() {
	var order = leafOrder(adjacency);

	order.forEach(function(lo, i) {
	    nodes[i].leafOrder = lo;
	});
	return nodes.map(function(n) { return n.leafOrder; });
    }

    function computeLeaforderDist() {
	if (! dist_adjacency)
	    dist_adjacency = reorder.graph2valuemats(graph);

	var order = reorder.valuemats_reorder(dist_adjacency,
					      leafOrder);

	order.forEach(function(lo, i) {
	    nodes[i].leafOrderDist = lo;
	});
	return nodes.map(function(n) { return n.leafOrderDist; });
	
    }
    
    function computeBarycenter() {
	var barycenter = reorder.barycenter_order(graph),
	    improved = reorder.adjacent_exchange(graph,
						 barycenter[0],
						 barycenter[1]);

	improved[0].forEach(function(lo, i) {
	    nodes[i].barycenter = lo;
	});

	return nodes.map(function(n) { return n.barycenter; });
    }

    function computeRCM() {
	var rcm = reorder.reverse_cuthill_mckee_order(graph);
	rcm.forEach(function(lo, i) {
	    nodes[i].rcm = lo;
	});

	return nodes.map(function(n) { return n.rcm; });
    }

    function computeSpectral() {
	var spectral = reorder.spectral_order(graph);

	spectral.forEach(function(lo, i) {
	    nodes[i].spectral = lo;
	});

	return nodes.map(function(n) { return n.spectral; });
    }

  // Precompute the orders.
    var orders = {
	name: d3.range(n).sort(function(a, b) { return d3.ascending(nodes[a].name, nodes[b].name); }),
	count: d3.range(n).sort(function(a, b) { return nodes[b].count - nodes[a].count; }),
	group: d3.range(n).sort(function(a, b) {
	    var x = nodes[b].group - nodes[a].group;
	    return (x != 0) ?  x : d3.ascending(nodes[a].name, nodes[b].name);
	}),
	leafOrder: computeLeaforder,
	leafOrderDist: computeLeaforderDist,
	barycenter: computeBarycenter,
	rcm: computeRCM,
	spectral: computeSpectral
    };

  // The default sort order.
  x.domain(orders.name);

  svg.append("rect")
      .attr("class", "background")
      .attr("width", width)
      .attr("height", height);

  var row = svg.selectAll(".row")
      .data(matrix)
    .enter().append("g")
      .attr("id", function(d, i) { return "row"+i; })
      .attr("class", "row")
      .attr("transform", function(d, i) { return "translate(0," + x(i) + ")"; })
      .each(row);

  row.append("line")
      .attr("x2", width);

  row.append("text")
      .attr("x", -6)
      .attr("y", x.rangeBand() / 2)
      .attr("dy", ".32em")
      .attr("text-anchor", "end")
      .text(function(d, i) { return nodes[i].name; });

  var column = svg.selectAll(".column")
      .data(matrix)
    .enter().append("g")
      .attr("id", function(d, i) { return "col"+i; })
      .attr("class", "column")
      .attr("transform", function(d, i) { return "translate(" + x(i) + ")rotate(-90)"; });

  column.append("line")
      .attr("x1", -width);

  column.append("text")
      .attr("x", 6)
      .attr("y", x.rangeBand() / 2)
      .attr("dy", ".32em")
      .attr("text-anchor", "start")
      .text(function(d, i) { return nodes[i].name; });

  function row(row) {
    var cell = d3.select(this).selectAll(".cell")
	  .data(row.filter(function(d) { return d.z; }))
      .enter().append("rect")
        .attr("class", "cell")
        .attr("x", function(d) { return x(d.x); })
        .attr("width", x.rangeBand())
        .attr("height", x.rangeBand())
        .style("fill-opacity", function(d) { return z(d.z); })
        .style("fill", function(d) { return nodes[d.x].group == nodes[d.y].group ? c(nodes[d.x].group) : null; });
  }

  

    var currentOrder = 'name';

    function order(value) {
	var o = orders[value];
	currentOrder = value;
	
	if (typeof o === "function") {
	    orders[value] = o.call();
	}
	x.domain(orders[value]);

	var t = svg.transition().duration(1500);

	t.selectAll(".row")
            .delay(function(d, i) { return x(i) * 4; })
            .attr("transform", function(d, i) { return "translate(0," + x(i) + ")"; })
	    .selectAll(".cell")
            .delay(function(d) { return x(d.x) * 4; })
            .attr("x", function(d) { return x(d.x); });

	t.selectAll(".column")
            .delay(function(d, i) { return x(i) * 4; })
            .attr("transform", function(d, i) { return "translate(" + x(i) + ")rotate(-90)"; });
    }

    function distance(value) {
	leafOrder.distance(science.stats.distance[value]);

	if (currentOrder == 'leafOrder') {
	    orders.leafOrder = computeLeaforder;
	    order("leafOrder");
	    //d3.select("#order").property("selectedIndex", 3);
	}
	else if (currentOrder == 'leafOrderDist') {
	    orders.leafOrderDist = computeLeaforderDist;
	    order("leafOrderDist");
	    //d3.select("#order").property("selectedIndex", 4);
	}

	// leafOrder.forEach(function(lo, i) {
	// 	    nodes[lo].leafOrder = i;
	// 	});
	// 	orders.leafOrder = d3.range(n).sort(function(a, b) {
	// 	    return nodes[b].leafOrder - nodes[a].leafOrder; });
    }

    matrix.order = order;
    matrix.distance = distance;

    var timeout = setTimeout(function() {}, 1000);
    matrix.timeout = timeout;
    
    return matrix;
}


function update_matrix(callback) {
	d3.select('#nodeg').selectAll(".cell")
      .transition()
	  .style("fill-opacity", function(d) { return z(d.z); })
	  .style("fill", function(d) { return nodes[d.x].group == nodes[d.y].group ? c(nodes[d.x].group) : null; });
	callback();
}

function draw_matrix(callback) {
	var margin ={"x":"20","y":"20"};
	var myg = svg1
		.append("g")
		.attr("transform", "translate("+margin.x+","+margin.y+" )")
		.attr("class","matrixg");
	mygraph.links.forEach(function (gl) {
		gl['value'] = 1;
	});
	thematrix = matrix(myg, size.width-parseInt(margin.x), size.height-parseInt(margin.y));
	thematrix.order("name");
	thematrix.distance("manhattan");
	callback();
}
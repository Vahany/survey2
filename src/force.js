function draw_force(svg, mygid, callback) {

	var node_radius = 5;

	var mysvg = svg.append('g').attr("id",mygid);

	var force = d3.layout.force()
		.size([size.width, size.height])
		.nodes(mygraph.nodes)
		.on("tick", tick)
		.links(mygraph.links);

	force.linkDistance(5).charge(-200);
	var counter = 0;

	function tick() {
		counter++;
	}
	
	var link = mysvg.selectAll('.link')
		.data(mygraph.links)
		.enter().append('line')
		.style("stroke", c(1))//red_conn[0])
		.style("stroke-width", 1)
		.attr('class', 'link');

	// Now it's the nodes turn. Each node is drawn as a circle.
	var node = mysvg.selectAll('.node')
		.data(mygraph.nodes)
		.enter().append('circle')
		.style("fill", function(d){return c(d.group);})
		.attr('class', 'node');
		
	var label = mysvg.selectAll('text')
		.data(mygraph.nodes)
		.enter().append('text')
		.text(function(d){return d.name;})
		.style('font-size',8)
		.style('fill','white');

	 minx = Infinity, miny = Infinity;
	var maxx = 0, maxy = 0;
	 myscale = 1; 

	force.on('end', function () {
		
		function getScale(callback){
			//alert(counter);
			node.attr('r',  node_radius)
				.attr('cx', function (d) {
					if (d.x - node_radius < minx) minx = d.x - node_radius;
					else if(d.x + node_radius > maxx) maxx = d.x + node_radius;
					return d.x;
				})
				.attr('cy', function (d) {
					if (d.y - node_radius < miny) miny = d.y - node_radius;
					else if (d.y + node_radius > maxy) maxy = d.y + node_radius;
					return d.y;
				});
				
			label.attr('x', function(d) {return d.x - (node_radius/2);}).attr('y', function(d){return d.y+ (node_radius/2);});

			var widthratio = (size.width - 50) / (maxx - minx);
			var heightratio = (size.height - 50) / (maxy - miny);
			
			if (widthratio<0) minx = -1*minx;
			if (heightratio <0)miny = -1*miny;
			//if any is < 0 means drawing out of boundary

			myscale = Math.min(widthratio, heightratio);

			link.attr('x1', function (d) { return d.source.x; })
				.attr('y1', function (d) { return d.source.y; })
				.attr('x2', function (d) { return d.target.x; })
				.attr('y2', function (d) { return d.target.y; });
				
			
			callback();
		}
		getScale(function(){
			console.log(minx+","+maxx+"-"+miny+","+maxy+"="+myscale);
			d3.select("#nodeg").attr("transform", "scale(" + myscale + ") translate(" + (-1 * minx + 10) + "," + (-1 * miny + 10) + ")");

			callback();
		});
	});

	force.start();
}

function update_force(callback){
	d3.select('#nodeg').selectAll('.node')
		.transition()
		.style("fill", function(d){return c(d.group);})
		.attr('r',  function(d){ if (d.group ==1) return 5; else return 10;});
		callback();
}

function update_force_links(callback){
	d3.select('#nodeg').selectAll('.link')
		.transition()
		.style("stroke-width", function(d){ if (d.group ==1) return 1; else return 3;})
		.style("stroke", function(d){return c(d.group);});
		
		callback();
}

function color_nl_groups(callback){
	d3.select('#nodeg').selectAll('.node')
		.transition()
		.style("fill", function(d){return c(d.group);});
		
	callback();
}
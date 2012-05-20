var CONTAGION_TIMELINE_CONSTANTS = {
		INTERVAL_TIMER : 1500
}

function ContagionTimeline(container) {
	this.ui = {};
	
	this.ui.container = container;
	
	this.pictures = new Array();
	
	this.renderChart();
	this.startTimer();
	
	return this;
}

ContagionTimeline.prototype.renderChart = function() {
	// we use an inline data source in the example, usually data would
    // be fetched from a server
	
	
	var time = new Date().getTime();
	
	for (var i = 0; i < 30000; i += 1000) {
		this.pictures.push([time - i, 0]);
	}

	this.currentNumPictures = 0;

    // setup plot
    var options = {
    	grid : {borderWidth: 0},
    	lines: { show: true, fill: true },
        series: { shadowSize: 0,color: "rgb(89,33,16)" }, // drawing is faster without shadows
        zoom: {
            interactive: true
        },
        pan: {
            interactive: true
        }, 
        yaxis : {
        	min: 0,
        	tickSize: 5,
        	tickFormatter : function (val, axis) {
        		return val.toString();
        	  },
        	font: {
        		size: 11,
        	     style: "italic",
        	     weight: "bold",
        	     family: "sans-serif",
        	     variant: "small-caps"
        	},
      	  color: "rgb(230,230,230)"
        },
        xaxis : {
        	tickFormatter : function (val, axis) {
        	    var d = new Date(val);
        	    return d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
        	  },
        	  tickSize : 10000,
        	  show: false
        }
    };
    

    this.chart = $.plot(this.ui.container, [ ], options);

    this.refreshChart();
}

ContagionTimeline.prototype.setData = function(data) {
	
}

ContagionTimeline.prototype.refreshChart = function() {
	
	//console.log("LENGTH", this.pictures.length)
	
	//console.log("time difference between first and last", this.pictures[this.pictures.length - 1][0]);
	
	var index = 0;
	
	for (var i = this.pictures.length - 1; i > 0; i--) {
		if (this.pictures[i][0] - this.pictures[this.pictures.length -1][0] < -30000) {
			index = i;
			break;
		}
	}
	
	
	if (index > 0) {
		this.pictures = this.pictures.slice(index, this.pictures.length - 1);
	}
	
	
	//this.chart.options();
	this.chart.setData([ this.pictures ]);
	
		//console.log(this.pictures[this.pictures.length - 1]);
	if (this.pictures.length > 0) {
		this.chart.getOptions().xaxis.max = this.pictures[this.pictures.length - 1][0];
		this.chart.getOptions().xaxis.min = this.pictures[0][0];
	}
	
	this.chart.setupGrid();
	
    this.chart.draw();
}

ContagionTimeline.prototype.startTimer = function() {
	
	var contagionTimeline = this;
	
	this.interval = setInterval(function() {
		contagionTimeline.pollForUpdates();
	}, CONTAGION_TIMELINE_CONSTANTS.INTERVAL_TIMER);
	
	this.paddingInterval = setInterval(function() {
		contagionTimeline.padUpdates();
	}, 50);
	
	this.pollForUpdates();
	
}

ContagionTimeline.prototype.addImage = function(image, imageIndex) {
	
	var img = $('<img>').attr('src', image.url).appendTo(this.ui.container).attr('id', image.url);
	img.css('bottom', (imageIndex * 100) + 'px');

	//img.fadeIn(function() {
		
		//img.stop();
				
		$(img).animate({left: '50%'}, 15000, null, function() {
			$(img).animate({left: '0%', opacity: 0}, 15000, function() {
				$(this).remove();
			});
		});
	//});
}

ContagionTimeline.prototype.addImageFooter = function(number) {
	
	var div = $('<div>').text()
	
}

ContagionTimeline.prototype.padUpdates = function() {
	this.pictures.push([new Date().getTime(), this.currentNumPictures]);
	this.refreshChart();
}

ContagionTimeline.prototype.pollForUpdates = function(time) {
	var data = {};
	
	if (time != null) {
		data.time = time;
	}
	
	var contagionTimeline = this;
	$.post('/contagion_server-0.1/api/getPictures', data, function(response) {
		
		if (response.success == true) {
			
			if (response.pictures.length > 0) {
				console.log(response.pictures);
				contagionTimeline.currentNumPictures = response.pictures.length;
				contagionTimeline.pictures.push([response.timestamp, response.pictures.length]);
				
				for (var i in response.pictures) {
					if ($('[src="' + response.pictures[i].url + '"]').length == 0) {
						contagionTimeline.addImage(response.pictures[i], i );
					}
				}
				
			} else {
				contagionTimeline.currentNumPictures = 0;
				contagionTimeline.pictures.push([response.timestamp, 0]);
			}
			
			contagionTimeline.refreshChart();
			
		}
		
	}, 'json');
	
}

function ContagionImage(imageObject) {
	
}
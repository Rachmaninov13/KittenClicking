var game = gamePage;

var opts = {
	interval : 5000
}

var cycle = function() {
	loop: undefined
	start: function() {
		if(this.loop) return;
		this.loop = setInterval(this.iterate.bind(this),options.interval);
	}
}
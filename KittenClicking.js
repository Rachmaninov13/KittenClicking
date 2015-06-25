var game = gamePage;

var opts = {
	interval : 5000,
	religion : 0,
	village : 0,
	build : 0,
	craft : 0,
	observe : 0,
	trade : 0
};

var flagStock = {
	catnip : 0,
	wood : 0,
	minerals : 0,
	coal : 0,
	iron : 0,
	titanium : 0,
	gold : 0,
	

var cycle = function() {
	loop: undefined,
	start: function() {
		if(this.loop) return;
		this.loop = setInterval(this.iterate.bind(this),options.interval);
	},
	stop: function() {
		if(!this.loop) return;
		clearInterval(this.loop);
		this.loop = undefined;
	}
	iterate: function() {
		this.observe();
		this.religion();
		this.village();
		this.build();
		this.craft();
		//this.trade();
	};
	//gaze to the heavens
	observe: function() {
		if(this.observeBtn) {
			game.calendar.observeHandler();
		}
	}
	//praise the sun
	religion: function() {
		game.religion.praise();
	}
	//Use our power
	village: function() {
		if(game.calendar.festivalDays === 0 && game.villageTab.festivalBtn.hasResources()){
			game.villageTab.festivalBtn.onClick();
		}
		do {
			game.villageTab.huntBtn.onClick();
		}
		while(game.resPool.get("manpower").value > gamePage.resPool.get("manpower").maxValue/2)
	}
	//build us up
	build: function() {
		
};


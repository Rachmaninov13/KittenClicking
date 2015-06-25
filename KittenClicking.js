var script = gamePage;

var opts = {
	interval : 5000,
	religion : 0,
	hunt : 0,
	festival : 0,
	build : 0,
	craft : 0,
	observe : 0,
	trade : 0
};

var flagStock = {
	catnip : {stock : 0, priority : 0},
	wood : {stock : 0, priority : 0},
	minerals : {stock : 0, priority : 0},
	coal : {stock : 0, priority : 0},
	iron : {stock : 0, priority : 0},
	titanium : {stock : 0, priority : 0},
	gold : {stock : 0, priority : 0},
	oil : {stock : 0, priority : 0},
	uranium : {stock : 0, priority : 0},
	unobtainium : {stock : 0, priority : 0},
	
	manpower : {stock : 0, priority : 0},
	science : {stock : 0, priority : 0},
	culture : {stock : 0, priority : 0},
	faith : {stock : 0, priority : 0},
	starchart : {stock : 0, priority : 0},
	antimatter : {stock : 0, priority : 0},
	
	furs : {stock : 0, priority : 0},
	ivory : {stock : 0, priority : 0},
	spice : {stock : 0, priority : 0},
	unicorns : {stock : 0, priority : 0},
	alicorn : {stock : 0, priority : 0},
	necrocorn : {stock : 0, priority : 0},
	tears : {stock : 0, priority : 0},
	timeCrystal : {stock : 0, priority : 0},
	sorrow : {stock : 0, priority : 0},
	
	beam : {stock : 0, priority : 0},
	slab : {stock : 0, priority : 0},
	concrate : {stock : 0, priority : 0},
	plate : {stock : 0, priority : 0},
	steel : {stock : 0, priority : 0},
	alloy : {stock : 0, priority : 0},
	eludium : {stock : 0, priority : 0},
	gear : {stock : 0, priority : 0},
	scaffold : {stock : 0, priority : 0},
	ship : {stock : 0, priority : 0},
	tanker : {stock : 0, priority : 0},
	parchment : {stock : 0, priority : 0},
	manuscript : {stock : 0, priority : 0},
	compedium : {stock : 0, priority : 0},
	blueprint : {stock : 0, priority : 0},
	megalith : {stock : 0, priority : 0}
};
	
var cycle = function () {};

cycle.prototype = {
	loop: undefined,
	start: function () {
		if(this.loop) return;
		this.loop = setInterval(this.iterate.bind(this),opts.interval);
	},
	stop: function () {
		if(!this.loop) return;
		clearInterval(this.loop);
		this.loop = undefined;
	},
	iterate: function () {
		if(opts.observe) this.observe();
		if(opts.religion) this.religion();
		if(opts.hunt) this.hunt();
		if(opts.festival) this.festival();
		if(opts.build) this.build();
		if(opts.craft) this.craft();
		if(opts.trade) this.trade();
		script.msg("Looped.");
	},
	//gaze to the heavens
	observe: function () {
		if(this.observeBtn) {
			script.calendar.observeHandler();
		}
	},
	//praise the sun
	religion: function () {
		script.religion.praise();
	},
	//Use our power
	hunt: function () {
		do {
			script.villageTab.huntBtn.onClick();
		}
		while(script.resPool.get("manpower").value > script.resPool.get("manpower").maxValue/2);
		script.clearLog();
		
	},
	//celebrate
	festival: function () {
		if(script.calendar.festivalDays === 0 && script.villageTab.festivalBtn.hasResources()){
			script.villageTab.festivalBtn.onClick();
		}
	}
	//build us up
	build: function () {
		
	},
	//craft the excess
	craft: function () {
		script.clearLog();
	},
	//sharing is caring
	trade: function () {
		script.clearLog();
	}
};

var scriptCycle = new cycle();

var ca = (ca || {});
ca.apachegui = (ca.apachegui || {});

ca.apachegui.Interval = (function() {
	
	//Array mapping assigned id to current timeout id
	var ids = [];
	
	var setInterval = function(func,interval) {
		
		var runFunc = (function(position) {
			
			return function() {
			
				if(ids[position] == -1) {
					return;
				}
				
				func();
			
				ids[position] = setTimeout(runFunc, interval);
			};
			
		})(ids.length);
		
		ids.push(setTimeout(runFunc, interval));
				
		return (ids.length -1);
	};
	
	var clearInterval = function(id){
		if(!!id) {
			if(ids[id] == -1) {
				return;
			}
			
			try {
				clearTimeout(ids[id]);		
			} catch(e) {}
			
			ids[id] = -1;
		}
	};
	
	var clearAllIntervals = function() {
		
		for(var i=0; i<ids.length; i++) {
			clearInterval(i);
		}		
	};
	
	return {
		setInterval: setInterval,
		clearInterval: clearInterval,
		clearAllIntervals: clearAllIntervals
	};
	
})();
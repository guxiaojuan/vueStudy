function debounce(method,delay) {
	let timer = null;
	delay = delay || 1000
	return function () {
		let self = this,
			args = arguments;
		timer && clearTimeout(timer);
		timer = setTimeout(function () {
			method.apply(self,args);
		},delay);
	}
}
function throttle(method, delay) {
	let timer = null;
	delay = delay || 5000
	let previous;
	return function() {
		let args = arguments;
		let self = this;
		let now = Date.now();
		if(!previous) {
			previous = now;
		}
		timer && clearTimeout(timer);
		if(now - previous >= delay) {
			method.apply(self, args);
			previous = now;
		}else {
			setTimeout(function() {
				method.apply(self, args);
				previous = now;
			}, delay)
		}
	}
}

function fun(a) {
	console.log(a)
}

ss = debounce(fun(1));
ss(2);
ss(3);
ss(4);
ss(5);
ss(6);


tt = throttle(fun(11));
tt(22);
tt(33);
tt(44);
tt(55);
tt(66);



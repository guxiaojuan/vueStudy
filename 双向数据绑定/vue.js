function nodeToFragment(node, vm) {   //vm: {"data":{"text":"hello,vue"}}
	var flag = document.createDocumentFragment();
	var child;
	while(child = node.firstChild) {   //将子节点劫持到文档片段
		compile(child, vm);
		if(child.firstChild) {  //具有子节点
			var dom = nodeToFragment(child);
			child.appendChild(dom);
		}
		flag.appendChild(child);
	}

	return flag;
}

function compile(node, vm) {
	var reg = /\{\{(.*)\}\}/;

	if (node.nodeType === 1) {   //文档节点
		var attrs = node.attributes;
		// console.log(attrs);
		// console.log(attrs.length);
		for(var i=0; i<attrs.length; i++) {
			// console.log(attrs[i].nodeName)
			if(attrs[i].nodeName === 'v-model') {    //view -> model
				var name=  attrs[i].nodeValue;     //nodeValue返回文本节点或者属性节点的值，元素节点没有值

				node.addEventListener('input', function(e) {
					vm[name] = e.target.value;
				})

				// node.value = vm.data[name];
				node.value = vm[name];
				node.removeAttribute('v-model');
			}
		}
	}

	if (node.nodeType === 3) {   //文本节点，匹配{{}}
		if(reg.test(node.nodeValue)) {
			var name = RegExp.$1;
			name = name.trim();
			// node.nodeValue = vm.data[name];
			node.nodeValue = vm[name];

			new Watcher(vm, node, name);
		}
	}
}

function defineReactive(obj, key, val) {
	var dep = new Dep();
	console.log(dep)

	Object.defineProperty(obj, key, {     //为每个属性添加get和set方法
		get: function () {
			if (Dep.target) {  //添加订阅者watcher到主体对象Dep
				dep.addSub(Dep.target);
			}
			return val;
		},
		set: function (newVal) {
			if(val === newVal)
				return
			val = newVal;

			dep.notify();               //text发生变化，触发set方法，然后发出通知

			console.log("val改变了，新的val是" + val)
		}
	})
}

function observe(obj, vm) {
	// console.log(obj)
	Object.keys(obj).forEach(function(key){
		if(obj.hasOwnProperty(key)) {
			if(obj[key].constructor === 'Object') {
				observe(obj[key], vm)
			}

			defineReactive(vm, key, obj[key]);
		}
	})
}


function Vue(options) {
	this.data = options.data;
	var data = this.data;
	observe(data, this);     //数据监听

	//模板编译
	var id = options.el;
	var dom = nodeToFragment(document.getElementById(id), this);   //this:{"data":{"text":"hello,vue"}}
	document.getElementById(id).appendChild(dom);
}



function Dep() {
	this.subs = [];
}

Dep.prototype = {
	notify: function() {
		console.log('数据改变了，来通知大家')
		this.subs.forEach(function (sub) {
			sub.update();
		})
	},
	addSub: function (sub) {
		this.subs.push(sub);
	}
}


function Watcher (vm, node, name) {
	Dep.target = this;
	this.name = name;
	this.node = node;
	this.vm = vm;
	this.update();
	Dep.target = null;
}
Watcher.prototype = {
	update: function () {
		this.get();
		this.node.nodeValue = this.value;
	},
	get: function () {
		this.value = this.vm[this.name];
	}
}




var vm = new Vue({
	el: 'app',
	data: {
		text: 'hello, vue'
	}
})

// console.log(vm)

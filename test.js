var arr = [23,4,23,2,45,56,3,77,0,4453]

function qs(start, end) {
	if(start>=end) return;
	var mid = partition(start, end);
	qs(start, mid-1);
	qs(mid+1, end);
}

function partition(start, end) {
	var p = arr[start];
	while(start<end) {
		while(arr[start] > p && start <end) {
			end--
		}
		arr[start]=arr[end];
		while(arr[start]<=p && start<end) {
			start++
		}
		arr[end]=arr[start];
	}
	arr[start]=p;
	return start;
}
qs(0,9);
console.log(arr);


function instance_of(L, R) {//L 表示左表达式，R 表示右表达式
	var O = R.prototype;// 取 R 的显示原型
	L = L.__proto__;// 取 L 的隐式原型
	while (true) {
		if (L === null)
			return false;
		if (O === L)// 这里重点：当 O 严格等于 L 时，返回 true
			return true;
		L = L.__proto__;
	}
}

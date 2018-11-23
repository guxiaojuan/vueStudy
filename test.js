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
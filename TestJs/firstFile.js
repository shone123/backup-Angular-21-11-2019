/*var colors = {
   text:'#000000',
   background:'#aaaaaa',
   something_else:'blue'
};*/
/*
var namespace = (function() {
	
	function person(name) {
		this.name = name;
	}
	
	person.prototype.getName = function() {
		
		return this.name;
	}
	
	return person;
	
})();
*/


function test() {
	
	var obj = {
		
		name: "david",
		getThisValue: function() {
			console.log(this.name);
		}
	}
	
	return obj;
	
}

test();




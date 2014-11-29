Date.prototype.addHours = function(h) { this.setHours(this.getHours()+h); return this; }
console.log("test date: " + new Date().addHours(-2));


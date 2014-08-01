String.prototype.endsWith = function (str){
    return this.slice(-str.length) == str;
};

String.prototype.startsWith = function (str){
    return this.slice(0, str.length) == str;
};
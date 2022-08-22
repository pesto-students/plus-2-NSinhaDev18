let arr=[];
function  hasDuplicate(arr){
const set=new Set(arr);
//console.log(set.size);
/*if(set.size!==arr.length) {
    return console.log(`true- duplicate is present.`);
}else{
    return console.log(`false- duplicate not present.`);
}*/
console.log(set.size!==arr.length);
}

hasDuplicate([1,3,3,3,4,2,1]);
hasDuplicate([1,3,8,4,2]);

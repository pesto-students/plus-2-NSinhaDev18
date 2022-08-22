//.bind() implementation:-
function sum(a,b){
    return this.a + this.b ;
}
let sample1=sum(4,5);
console.log(sample1); //NaN is retured.
sample1=sum.bind({a:4,b:5});
console.log(sample1()+ " " + "//.bind() is implemented");

//.call() implementation:-

function multiply(){
    const product={
    x:this.x,
    y:this.y
    };
    return this.x * this.y;
}
const obj= {
    x:10,
    y:20
};
console.log(multiply.call(obj) + " " + "is the product"+ " " + "//.call() is implemented");

//.apply() is implemented:-
const array = ['a', 'b'];
const elements = [0, 1, 2];
array.push.apply(array, elements);
console.log(array.join(", ") + " "+ "//.apply() is implemented"); // ["a", "b", 0, 1, 2]




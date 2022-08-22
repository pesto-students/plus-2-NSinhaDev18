function createStack() 
{
    return{
        items:[],
        push(item) 
        {
            this.items.push(item);
        },
        pop() {
            return this.items.pop();
            }
};
}
//const st= createStack();

const stack=createStack();
stack.push(10);
stack.push(5);
stack.pop();// => 5
stack.items;// => [10]
console.log(stack.items); 
console.log(items); //undefined
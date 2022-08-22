class Person {
 Person = function() 
    {
    }

}
Person.prototype.initialize=function(name,age)
{
    this.name=name;
    this.age=age;
}
// TODO: create the class Teacher and a method teach
class Teacher{
    teach(subject) {
        this.subject=subject;
    }

}
let teacher=new Teacher();
Teacher.prototype.initialize=Person.prototype.initialize;


teacher.initialize("Adam",45);
teacher.teach("Inheritance");
return console.log(`${teacher.name} is now teaching ${teacher.subject}`);
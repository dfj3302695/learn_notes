function Person(name,age,job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = function(){
        console.log(this.name);
    }
}
var person1 = new Person('jack',11,"engineer");
console.log(Object.keys(Person.prototype))
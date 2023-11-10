class Person {
    constructor(firstName, lastName){
        this._firstName = firstName;
        this._lastName = lastName;
    }
    
    get firstName() {
        return this._firstName.charAt(0).toUpperCase()+this._firstName.slice(1);
    }

    set firstName(name ){
        this._firstName = name.charAt(0).toUpperCase()+name.slice(1);
    }
}

const person1 = new Person('John','Doe');
console.log(person1.firstName);
person1.firstName = 'jp';
console.log(person1.firstName);
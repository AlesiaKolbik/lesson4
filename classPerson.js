"use strict";

class Person {
    constructor(name, age, gender){
        this._bestfriend = null;
        this._friends = [];
        this.age = age;
        this._spouse = null;
        Object.defineProperty(
            this, "_name", {
                writable: false,
                value: name
            });
    }

    sayHello(){
            console.log(`Привет! Меня зовут ${this._name}`);
    }

    isAdultPerson(person){
        return person.age>=18;
    }

    makeBestFriend(person) {
        if (this._bestfriend !== person) {
            this._bestfriend = person;
            person.makeBestFriend(this);
        }
    }

    isBestFriendOf(person) {
        return this._bestfriend === person;
    }

    makeFriends(person) {
        if (this._friends.indexOf(person) === -1) {
            this._friends.push(person);
            person.makeFriends(this);
        }
    }

    isFriendOf(person) {
        return this._friends.includes(person);
    }

    getMarried(person) {
        if (!this.isAdultPerson(person) || !this.isAdultPerson(this)) {
            console.log("Жениться рано еще!");
            return false;
        }
        else if (this.isMarried(person)) {
            return true;
        }
        else if (person.constructor !== this.constructor) {
            this._spouse = person;
            if (person.getMarried(this)) {
                return true;
            }
            else {
                this._spouse = null;
            }
        }
        return false;

    }

    isMarried(){
       return this._spouse !== null;
    }

}

class Man extends Person {
    constructor(name, age){
        super(name,age);
    }

    getMarried(person){
        return person instanceof Woman && super.getMarried(person);
    }
}

class Woman extends Person{
    constructor(name,age){
        super(name,age);
    }
    getMarried(person){
        return person instanceof Man && super.getMarried(person);
    }
}



const katya = new Woman("Katya", 20);
const valery = new Man("Valery",25);
const vovochka = new Man("Vovochka",12);
const pasha = new Man("Pasha", 30);
katya.sayHello();
valery.sayHello();
pasha.sayHello();


katya.makeFriends(vovochka);
valery.makeFriends(pasha);

katya.getMarried(vovochka);
katya.getMarried(pasha);
valery.getMarried(pasha);
katya.makeFriends(valery);
katya.getMarried(valery);

console.log(vovochka.isMarried());
console.log(katya.isMarried());







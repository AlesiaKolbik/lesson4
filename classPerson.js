"use strict";

class Person {
    constructor(name,age) {
        this._bestfriend = null;
        this._friends = [];
        this.age = age;
        Object.defineProperty(
            this, "_name", {
                writable: false,
                value: name
            }
        )
    }

    sayHello() {
        console.log("Hello! I'm " + this._name);
    }
    isAdultPerson(person){
        return person.age>=18;
    }

    makeBestFriend(person) {
        if (this._bestfriend != person) {
            this._bestfriend = person;
            person.makeBestFriend(this);
        }
    }

    isBestFriendOf(person) {
        return this._bestfriend === person;
    }

    makeFriends(person) {
        if (this._friends.indexOf(person) == -1) {
            this._friends.push(person);
            person.makeFriends(this);
        }
    }

    isFriendOf(person) {
        return this._friends.includes(person);
    }

}
class Man extends Person {
    constructor(name, age) {
        super(name,age);
        this._wife = null;
    }

    sayHello() {
        let ageWord = null;
        if(this.age === 1){
            ageWord = "год";
        }
        else if(this.age >=2 && this.age <=4){
            ageWord = "года";
        }
        else if(this.age === 0 || this.age >=5 && this.age <=17){
            ageWord = "лет";
        }
        if (this.age < 18){
            console.log(`Привет!Меня зовут ${this._name} и мне ${this.age} ${ageWord}`);
        }
        else {
            console.log(`Привет! Я мужчина, меня зовут ${this._name}`);
        }
    }

    getMarried(person) {
        if (!this.isAdultPerson(person) || !this.isAdultPerson(this)) {
            console.log("Жениться рано еще!");
        }
        else if (this.isMan(person)) {
            console.log("Упс! Закон запрещает однополые браки.");
        }
        else if (!this.isFriendOf(person)) {
            console.log("Попробуйте сначала подружиться.")
        }
        else {
            this._wife = person;
            person._husband = this;
            console.log(`Готово! Теперь ${person._name} и ${this._name} женаты! Поздравляю!`);
        }
    }

    isMan(person){
        return person instanceof Man;
    }

    isMarried(){
        return this._wife !== null;
    }
}

class Woman extends Person{
    constructor(name,age){
        super(name,age);
        this._husband = null;
        }

    sayHello(){

        let ageWord = null;
        if(this.age === 1){
            ageWord = "год";
        }
        else if(this.age >=2 && this.age <=4){
            ageWord = "года";
        }
        else if(this.age === 0 || this.age >=5 && this.age <=17){
            ageWord = "лет";
        }
        if (this.age < 18){
            console.log(`Привет!Меня зовут ${this._name} и мне ${this.age} ${ageWord}`);
        }
        else {
            console.log(`Привет! Я женщина, меня зовут ${this._name}`);
        }

    }


    getMarried(person){
        if(!this.isAdultPerson(person) || !this.isAdultPerson(this)){
            console.log("Жениться рано еще!");
        }
        else if(this.isWoman(person)){
            console.log("Упс! Закон запрещает однополые браки.");
        }
        else if(!this.isFriendOf(person)) {
            console.log("Попробуйте сначала подружиться.")
        }
        else {
            this._husband = person;
            person._wife = this;
            console.log(`Готово! Теперь ${person._name} и ${this._name} женаты! Поздравляю!`);
        }
    }
    isWoman(person){
        return person instanceof Woman;
    }
    isMarried(){
        return this._husband !== null;
    }

}


const valery = new Man("Valery",25);
const vovochka = new Man("Vovochka",12);
const pasha = new Man("Pasha", 30);
const katya = new Woman("Katya", 20);
katya.sayHello();
vovochka.sayHello();

katya.makeFriends(pasha);
katya.makeFriends(vovochka);

katya.getMarried(vovochka);
katya.getMarried(pasha);
valery.makeFriends(pasha);
valery.getMarried(pasha);
console.log(vovochka.isMarried());
console.log(katya.isMarried());


"use strict";

class Person {
    constructor(name, age, gender){
        this._bestfriend = null;
        this._friends = [];
        this.age = age;
        this._gender = gender;
        Object.defineProperty(
            this, "_name", {
                writable: false,
                value: name
            });
    }

    sayHello(){
        if (this.age < 18){
            console.log(`Привет!Меня зовут ${this._name} и мне ${this.age} ${this.getAgeWord()}`);
        }
        else if(this.gender === "man"){
            console.log(`Привет! Я мужчина, меня зовут ${this._name}`);
        }
        else if(this.gender === "woman"){
            console.log(`Привет! Я женщина, меня зовут ${this._name}`);
        }
        else{
            console.log(`Привет! Меня зовут ${this._name}`);
        }
    }

    getAgeWord(){
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
        return ageWord;
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

    getMarried(person){
        if(!this.isAdultPerson(person) || !this.isAdultPerson(this)){
            console.log("Жениться рано еще!");
        }
        else if(!this.isFriendOf(person)) {
            console.log("Попробуйте сначала подружиться.")
        }
        else if(this.isWoman(this)){
            if(this.isWoman(person)){
                console.log(`Упс! Однополые браки запрещены!`);
            }
            else {
                this._husband = person;
                person._wife = this;
                console.log(`Готово! Теперь ${person._name} и ${this._name} женаты! Поздравляю!`);
            }
        }
        else{
            if(this.isMan(person)){
                console.log(`Упс! Однополые браки запрещены!`);
            }
            else{
                this._wife = person;
                person._husband = this;
                console.log(`Готово! Теперь ${person._name} и ${this._name} женаты! Поздравляю!`);
            }
        }
    }

    isMarried(){
        if(this._gender === "woman"){
            return this._husband !== null;
        }
        else if(this._gender === "man"){
            return this._wife !== null;
        }
    }

    isWoman(person) {
        return person instanceof Woman;
    }

    isMan(person) {
        return person instanceof Man;
    }
}

class Man extends Person {
    constructor(name, age){
        super(name,age);
        this._wife = null;
        this._gender = "man";
    }
}

class Woman extends Person{
    constructor(name,age){
        super(name,age);
        this._husband = null;
        this._gender = "woman";
    }
}



const katya = new Woman("Katya", 20);
const valery = new Man("Valery",25);
const vovochka = new Man("Vovochka",12);
const pasha = new Man("Pasha", 30);

katya.makeFriends(pasha);
katya.makeFriends(vovochka);
valery.makeFriends(pasha);

katya.getMarried(vovochka);
katya.getMarried(pasha);
valery.getMarried(pasha);

console.log(vovochka.isMarried());
console.log(katya.isMarried());

katya.sayHello();
vovochka.sayHello();





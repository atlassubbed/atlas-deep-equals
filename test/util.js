class Animal {
  constructor(age){
    this.age = age;
    this.health = 100;
  }
  rawr(){
    return "sound"
  }
  static planet(){
    return "earth"
  }
}

class Rat extends Animal {
  constructor(age, color){
    super(age)
    this.color = color;
  }
  rawr(){
    return "squeak!"
  }
  color(){
    return this.color;
  }
}

module.exports = { Animal, Rat }

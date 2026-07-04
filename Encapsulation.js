//Encapsulation
class Seif{
  #groshi
  constructor(syma_pochatkova){
    this.#groshi = syma_pochatkova;
    this.syma_pochatkova = syma_pochatkova;
  }
  put(syma){
    this.#groshi += syma;
    console.log("У сейф додано:" + syma);
  }
  check(){
    console.log("Вміст сейфу:" + this.#groshi);
  }
}
const seif = new Seif(1000);
seif.put(500);
seif.check();

class Bankomat{
  #balance;
  constructor(pochatkovasyma){
    this.#balance = pochatkovasyma;
    this.pochatkovasyma = pochatkovasyma;
  }
  zniaty(suma){
    if(suma < this.#balance || suma === this.#balance){
      this.#balance -= suma;
      console.log('Успішно знято:' + suma);
    }else{
      console.log("Помилка: у банкоматі недостатньо коштів!");
    }
  }
  balans(){
    console.log(this.#balance);
  }
}
const bankomat = new Bankomat(5000);
bankomat.zniaty(2000);
bankomat.balans();
bankomat.zniaty(4000);

class Profil{
  #password
  constructor(login, pochatkovyParol){
    this.login = login;
    this.#password = pochatkovyParol;
  }
  zminityParol(staryParol, novyParol){
    if(this.#password === staryParol){
      this.#password = novyParol;
      console.log("Пароль успішно змінено!");
    }else{
      console.log("Помилка: старий пароль не збігається!");
    }
  }
  uviity(vvedenyParol){
    if(vvedenyParol === this.#password){
      console.log("Ласкаво просимо," + this.login + "!");
    }else{
      console.log("Доступ заборонено: невірний пароль!");
    }
  }
}
const profil = new Profil('Cyber_Cat', 'meow123');
profil.uviity('12345');
profil.uviity('meow123');
profil.zminityParol('meow123', 'super_secret');
profil.uviity('super_secret');

console.clear();
function Container() {
  this.id = "";
  this.className = "";
  this.htmlCode = "";
}
Container.prototype.render = function() {
  return this.htmlCode;
}

//создаем метод удаления
 Container.prototype.remove = function(){
        let node = document.querySelector("#"+this.id);
        node.parentNode.removeChild(node);
    }
//вообще не понял зачем здесь базовый класс. Конструтор его не используем(он пустой) а его прототипы переопределяем, кроме remove

function Menu(myId, myClass, myItems) {
 // Container.call(this);
  this.id = myId;
  this.className = myClass;
  this.items = myItems;
}
Menu.prototype = Object.create(Container.prototype);
Menu.prototype.constructor = Menu;
Menu.prototype.render = function() {
    let menuList = "";
    for (let i of this.items) {
      if(i instanceof MenuItem){
      menuList += i.render();
      } else{
       menuList += "<ul id='"+i.id+"' class='"+i.className+"'>" + i.render() + "</ul>";
      } 
    }
  return "<ul id='"+this.id+"' class='"+this.className+"'>" + menuList + "</ul>";
}

function MenuItem(myHref, myTitle) {
  //Container.call(this);
  this.className = 'menu_class';
  this.href = myHref;
  this.title = myTitle;
}
MenuItem.prototype = Object.create(Container.prototype);
MenuItem.prototype.constructor = MenuItem;
MenuItem.prototype.render = function() {
  return "<li class='" + this.className + "'><a href='" + this.href + "'> - " + this.title + " - </a></li>";
}

function MenuSection(myId, myClass, myItems){
  Menu.apply(this,arguments);
 /* this.id=myId;
  this.className=myClass;
  this.items=myItems;*/
}
MenuSection.prototype = Object.create(Menu.prototype);
MenuSection.prototype.constructor = MenuSection;
MenuSection.prototype.render = function() {
  let result = "";
    for (let i of this.items) {
     // console.log(i instanceof MenuItem)
      if( i instanceof MenuItem){
        result += i.render();
      }else{
      result += "<ul id='"+i.id+"' class='"+i.className+"'>" + i.render() + "</ul>";
      }
    }
  return  result;
}

//зададим массивы наших меню и подменю

 let texts2 = [
                new MenuItem('#', 'Подстатья 1'),
                new MenuItem('#', 'Подстатья 2'),
                new MenuItem('#', 'Подстатья 3'),
            ]
 let texts = [
                new MenuItem('#', 'Статья 1'),
                new MenuItem('#', 'Статья 2'),
                new MenuItem('#', 'Статья 3'),
                new MenuSection('content2', 'content', texts2),
            ]

 var items = [
                new MenuItem('/', 'Главная'),
                new MenuItem('/about', 'О нас'),
                new MenuItem('/content', 'Статьи'),
                new MenuSection('content1', 'content', texts),
                new MenuItem('/service', 'Услуги'),
                new MenuItem('/contacts', 'Контакты'),
            ];

 var menu = new Menu('my', 'my', items);


document.write(menu.render());

setInterval(function(){menu.remove()},5000);     //через 5 сек удаляем меню
console.log(menu.render);
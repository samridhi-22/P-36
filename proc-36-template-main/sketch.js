var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feedTime;
var lastFeed;
//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database
 feedTime=database.ref('FeedTime')
 feedTime.on("value",function(data){
lastFeed=data.val();
 })
  //write code to display text lastFed time here
textSize(20);
if(lastFeed>=12){
text("Last Feed:"+lastFeed%12+"pm",300,30);
}else if(lastFeed===0){
text("lastFeed: 12 am",300,30);
}else{
text("LastFeed:"+lastFeed+"am",300,30);
}
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
var foodStock=foodObj.getFoodStock();
if(foodStock<=0){
foodObj.updateFoodStock(foodStock*0);
}else{
  foodObj.updateFoodStock(foodStock-1);
}
  //write code here to update food stock and last fed time
database.ref('/').update({
  Food:foodObj.getFoodStock(),
  feedTime:hour()
})
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

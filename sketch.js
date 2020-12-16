//Create variables here
var dog_img, happyDog_img, dog, happyDog, database, foodS, foodStock, x;

function preload()
{
  //load images here
  dog_img = loadImage("images/dogImg.png");
  happyDog_img = loadImage("images/dogImg1.png");
  }

function setup() {
  createCanvas(1000, 700);
  database = firebase.database();


  dog_img.size = (5);
  dog = createSprite(250,250,5,5);
  dog.addImage(dog_img);

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  
}


function draw() {  
  background(46, 139, 87)

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog_img);
    console.log(foodS);
  }

  drawSprites();
  //add styles here
  fill("black");
  textSize(20);
  text("You have " + foodS + " remaining.", 700, 200);
  text("Press up arrow key to feed the dog", 4,00, 100)
}



function readStock(data){
  foodS=data.val();
}



function writeStock(x){
  
  if(x>0){
    x = x -1;
    
    console.log(x);
  }
  else{
    x = 0;
  }
  
  database.ref('/').update({
    Food:x
  })

}
class Game{
    constructor(){

    }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })

    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    async start() {
            if (gameState === 0) {
                player = new Player();
                var playerCountRef = await database.ref('playerCount').once("value");
                if (playerCountRef.exists()) {
                    playerCount = playerCountRef.val();
                    player.getCount();
                }
                form = new Form()
                form.display();
            }
    player1 = createSprite(200,500);
    player1.addImage("player1",player_img);
    
    player2 = createSprite(800,500);
    player2.addImage("player2", player_img);
    players=[player1,player2];

        }
    
    play(){
        
                form.hide();

                Player.getPlayerInfo();
                 image(back_img, 0, 0, 1000, 800);
                 var x =100;
                 var y=200;
                 var index =0;
                 drawSprites();
                 for(var plr in allPlayers){
                    
                    
                     index = index+1;
                     x = 500-allPlayers[plr].distance;
                     y=500;
                     
                     players[index -1].x = x;
                     players[index - 1].y = y;
                       
                     if(index === player.index){
                         
                         fill("black");
                         textSize(25);
                         text(allPlayers[plr].name ,x-25,y+25);

                         
                     }
                    textSize(25);
                    fill(255);
                    text("Happiness 1 : "+ allPlayers.player1.score,50,50);
                    text("Happiness 2 : "+ allPlayers.player2.score,50,100);  
                 
                 }
                              

                if (keyIsDown(RIGHT_ARROW) && player.index !== null) {
                    player.distance -= 10
                    player.update();
                }
                if (keyIsDown(LEFT_ARROW) && player.index !== null) {
                    player.distance += 10
                    player.update();
                }
            
                 if (frameCount % 50 === 0) {
                     fruits = createSprite(random(100, 1000), 0, 100, 100);
                     fruits.velocityY = 6;
                     var rand = Math.round(random(1,5));
                     switch(rand){
                         case 1: fruits.addImage("fruit1",fruit1_img);
                         break;
                         case 2: fruits.addImage("fruit1", fruit2_img);
                         break;
                         case 3: fruits.addImage("fruit1", fruit3_img);
                         break;
                         case 4: fruits.addImage("fruit1", fruit4_img);
                         break;
                         case 5: fruits.addImage("fruit1", fruit5_img);
                         break;
                     }
                     fruitGroup.add(fruits);
                     
                 }

                 if (frameCount % 80 === 0) {
                    smiley = createSprite(random(150, 900), 0, 100, 100);
                    smiley.scale=0.15;
                    smiley.velocityY = 8;
                    var rand = Math.round(random(1,8));
                    switch(rand){
                        case 1: smiley.addImage("happy",happy);
                        break;
                        case 2: smiley.addImage("sad", sad);
                        break;
                        case 3: smiley.addImage("party", party);
                        break;
                        case 4: smiley.addImage("dance", dance);
                        break;
                        case 5: smiley.addImage("laughing", laughing);
                        break;
                        case 6: smiley.addImage("balloon", balloon);
                        break;
                        case 7: smiley.addImage("confetti", confetti);
                        break;
                        case 8: smiley.addImage("thumbs", thumbs);
                        break;
                    }
                    smileyGroup.add(smiley);
                    
                }
                 
                if (frameCount % 100 === 0) {
                    sad = createSprite(random(150, 900), 0, 100, 100);
                    sad.scale=0.1;
                    sad.velocityY = 9;
                    var rand = Math.round(random(1,2));
                    switch(rand){
                        case 1 :sad.addImage(sadimg);
                        break;
                        case 2 : sad.addImage(angry);
                        break;
                        
                    }
                    sadGroup.add(sad);
                    
                }

                  if (player.index !== null) {
                    for(var i=0; i<fruitGroup.length;i++){
                        if(fruitGroup.get(i).isTouching(players)){
                            point2sound.play();
                            fruitGroup.get(i).destroy();
                            player.score=player.score+1;
                            player.update();
                        }
                    }
                    for(var i=0;i<smileyGroup.length;i++){
                        if(smileyGroup.get(i).isTouching(players)){
                            pointsound.play();
                            smileyGroup.get(i).destroy();
                            player.score=player.score+50;
                            player.update();
                        }
                    }
                    for(var i=0;i<sadGroup.length;i++){
                        if(sadGroup.get(i).isTouching(players)){
                            foulsound.play();
                            sadGroup.get(i).destroy();
                            player.score=player.score-50;
                            player.update();
                        }
                    }
                  }   
                  for(var plr in allPlayers){                 
                  if(allPlayers[plr].score >= 100){
                      gameState = 2;
                  }
                }
    }

    end(){
       console.log("Game Ended");

       gameState = 3;
      console.log(gameState);
       
       
}
}
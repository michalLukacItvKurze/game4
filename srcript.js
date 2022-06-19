// malo by zaručiť aby bol cely dokument načitaný pred spustením 
document.addEventListener('DOMContentLoaded',()=> {

    
    // odchytim si postavy
    var posAndGun = document.getElementById('posAndGun');
    var posRight = document.getElementById('posRight');
    // odchytim si zbran
    var gunRight = document.getElementById('gunRight');
    // odcyhtim si batoh
    var rocketBag = document.getElementById('rocketBag');
    // odchytim si enemies
    var enemy1 = document.getElementById('enemy1');
    var enemy2 = document.getElementById('enemy2');
    var enemy3 = document.getElementById('enemy3');
    // odchytim si strely nepriatela
    var shot1 = document.getElementById('shot1');
    var shot2 = document.getElementById('shot2');
    var shot3 = document.getElementById('shot3');
    var shot4 = document.getElementById('shot4');
    var shot5 = document.getElementById('shot5');
    // odchytim si poziciu zbrane teda prva pozicia strely
    let rect = 150;
    
    // sounds
    var backhgroundSound = new Audio('sounds/backgroundmusic.mp3');
    var shotSound = new Audio('sounds/shot.mp3');
    var rocketSound = new Audio('sounds/rocket.mp3');
    var zombie = new Audio('sounds/zombie.mp3');
    
    // zavolanie funkcie sound
    sound(zombie);
    sound(backhgroundSound);
    
    
    
    //score

    //zivoty

    //podlaha
    let bottom = 0;
    //skakanie
    let isJumping = false;
    let shooting = true;
    let shootingRight = true;
    let gravity = 1;

    // zavolanie funckie - pohyb enemies
    moveEnemies(enemy1,900); 
    moveEnemies(enemy2,1300);
    moveEnemies(enemy3,1800);
    

    // zavolanie funckie - pohyb strely
    moveShots(shot1,1000);
    moveShots(shot2,2000);
    moveShots(shot3,3000);
    moveShots(shot4,4000);
    moveShots(shot5,5000);


    // key down pohyb postavicky a zbrane
    window.addEventListener('keydown',(e)=>{
        var left = parseInt(window.getComputedStyle(posAndGun).getPropertyValue('left'));
        
        //left
        if(e.keyCode=='37' && left > 10 ){
            //postava a zbran pohyb vlavo
            posRight.id='posRunLeft';
            posAndGun.style.left = left - 10 + 'px';
            gunRight.id='gunLeft';
            gunSide = 'left';
            rocketBag.style.left='140px';
            rect = rect - 10;
            shootingRight = false;
        }
        //right
        else if(e.keyCode=='39' && left <700){
            //postava a zbran pohyb vpravo
            posRight.id='posRunRight';
            gunRight.id='gunRight';
            posAndGun.style.left = left + 10 + 'px';
            gunSide = 'right';
            rocketBag.style.left='40px';
            rect = rect + 10;
            shootingRight = true;
        }
    })

    // keyUp zastavenie postavicky 
    window.addEventListener('keyup',(e)=>{
        left = parseInt(window.getComputedStyle(posAndGun).getPropertyValue('left'));
        //left
        if(e.keyCode=='37'){
            //zastavenie 
            posRight.id='posLeft';           
        }
        //right
        else if(e.keyCode=='39'){
            //zastavenie
            posRight.id='posRight';
        }
    })

    // key down skok postavicky 
    window.addEventListener('keydown', (e)=>{
        if(e.keyCode=='38'){
            jump(posAndGun);
            rocketSound.play();
        }
    })



    // key down spusti move boolet 
    window.addEventListener('keydown',(e)=>{
        if(e.keyCode==32){
            if(shooting){
                if(shootingRight){
                    var bullet = document.createElement('div');
                    bullet.classList.add('bullet');
                    board.appendChild(bullet);
                    // zavolam funkciu move bulet
                    moveBullets(bullet,rect);
                    shotSound.play();
                }
            }    
        }
    });

    // funkcia move bullets
    function moveBullets(bullets,position) {
        let id = null;
        clearInterval(id);
        id = setInterval(frame,1);
        function frame() {
            if( position==0){
                clearInterval(id);
            }
            else {
                position= position+3;
                bullets.style.left = position + 'px';
                // po preteceni vymaze bulets
                if(position>1000){
                    bullets.remove();
                }
            }
        }
    }


    // funkcia move enemies
    function moveEnemies(enemy,position) {
        let id = null;
        clearInterval(id);
        id = setInterval(frame,1); 
        function frame() {
            if( position==0){
                clearInterval(id);
            }
            else {

                position= position-0.1;
                enemy.style.left = position + 'px';

                // po preteceni vymaze nepriatelov
                if(position<-100){
                    enemy.remove();
                }
                
            }
            
        }
  
    }

    // funkcia move enemy shots  -  kotulajuce gule
    function moveShots(shots,position) {
        let id = null;
        clearInterval(id);
        id = setInterval(frame,1);
        function frame() {
            if( position==100){
                clearInterval(id);
            }
            else {
                position= position-0.3;
                shots.style.left = position*2 + 'px';
                // po preteceni vymaze enemy shots
                if(position<-100){
                    shots.remove();
                }
            }
        }
    }

    
    // funkcia skakanie
     function jump(char){
        if (isJumping) return;
         let upTimerId = setInterval(function () {
          //jump down
          if (bottom > 220) {
            clearInterval(upTimerId);
            let downTimerId = setInterval(function () {
              if (bottom < 0 ) {
                clearInterval(downTimerId);
                isJumping = false;
                rocketBag.style.display='none';
                shooting = true;
              }
              bottom -= 3;
              bottom = bottom * gravity;
              char.style.bottom = bottom + 'px';
            },20)
          }
          //jump up
          isJumping = true;
          bottom +=6;
          bottom = bottom * gravity;
          char.style.bottom = bottom + 'px';
          rocketBag.style.display='block'; 
          shooting = false; 
        },20)
    }
    
    // funkcia zombie rev 
    function sound(voice){
        voice.loop = true;
        voice.play();
    }

    
    

   
})

let canvas = document.querySelector('canvas');
let score =document.querySelector('#score');

canvas.style.backgroundColor='skyblue';
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let c = canvas.getContext('2d');

let posX = 200,
    posY = 200;
    vy = -10;
let xVal =canvas.width,
    xValdo1 =canvas.width+300,
    xVal2 =canvas.width+500,
    xValdo2 =canvas.width+700; 
let yVal=canvas.height;

let d1=d2=d3=d4=6;

//initial stage
let jj=3;
let frst=setInterval(function(){
    c.fillStyle='skyblue';
    c.fillRect(0,0,canvas.width,canvas.height);
    c.beginPath();
    c.fillStyle='yellow';
    c.arc(posX,posY+=jj,45,0,Math.PI * 2,false);
    c.fill();
    c.font = "20px Georgia";
    c.strokeText("0 0", posX, posY+1);
    c.strokeText("=", posX, posY+30);
    if(posY>230 || posY<180){
        jj=-jj;
    }
},30);


//when game started
document.addEventListener('keypress', (e)=>{
    //to make the ball bounce
    vy=-12;
    if(e.code=='Space'){
    //to stop initial animation
    clearInterval(frst);

    let id=setInterval(function(){
            
            //background
            c.fillStyle='skyblue';
            c.fillRect(0,0,canvas.width,canvas.height);
            posY+=vy;
            vy+=1;
            
            //rectangle1,down
            c.fillStyle='green';
            c.fillRect(xVal-=d1 , 0 ,100 ,200);
            c.fillRect(xValdo1-=d2 , yVal-200 ,100 ,200);

            //rectangle2,down
            c.fillStyle='green';
            c.fillRect(xVal2-=d3 , 0 ,100 ,150);
            c.fillRect(xValdo2-=d4 , yVal-150 ,100 ,150);
            
            //circle
            c.beginPath();
            c.fillStyle='yellow';
            c.arc(posX,posY,45,0,Math.PI * 2,false);
            c.fill();
            c.strokeStyle='black';
            c.stroke();
            c.font = "20px Georgia";
            c.strokeText("0 0", posX, posY+1);
            c.strokeText("=", posX, posY+30);
            
            
            //repeating rect
            if(xVal<-100){
                xVal = canvas.width+200; 
                d1=Math.floor(Math.random()*10)+5;
            }
            if(xVal2<-100){
                xVal2 = canvas.width+200; 
                d2=Math.floor(Math.random()*10)+5;
            }
            if(xValdo1<-100){
                xValdo1 = canvas.width+200; 
                d3=Math.floor(Math.random()*10)+5;
            }
            if(xValdo2<-100){
                xValdo2 = canvas.width+200; 
                d4=Math.floor(Math.random()*10)+5;
            }

            //adding score  
            if(xVal <=100 && xVal >96 || xVal2 <=100 && xVal2 >96 || xValdo1 <=100 && xValdo1 >96 || xValdo2 <=100 && xValdo2 >96 ){
                score.innerHTML=parseInt(score.innerHTML)+1;
            }

            //chack whether touch
            if(xVal<=245 && xVal>=100 && posY<245){
                clearInterval(id);
                alert('Game Over');
            }
            if(xVal2<=245 && xVal2>=100 && posY<195){
                clearInterval(id);
                alert('Game Over');
            }
            if(xValdo1<=245 && xValdo1>=100 && posY>yVal-244){
                clearInterval(id);
                alert('Game Over');
            }
            if(xValdo2<=245 && xValdo2>=100 && posY>yVal-194){
                clearInterval(id);
                alert('Game Over');
            }

            //check edge touch
            if(posY>yVal-45 || posY<45){
                clearInterval(id);
                alert('Game Over');
                
            }




            document.addEventListener('keypress', (e)=>{
                if(e.code=='Space'){
                    clearInterval(id);
                }
            });
        
        },30); 
    }
});
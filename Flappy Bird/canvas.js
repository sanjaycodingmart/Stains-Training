let canvas = document.querySelector('canvas');
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

let d1=3,d2=4,d3=5,d4=3;

//initial stage
let jj=3;
let frst=setInterval(function(){
    c.fillStyle='skyblue';
    c.fillRect(0,0,canvas.width,canvas.height);
    c.beginPath();
    c.fillStyle='yellow';
    c.arc(posX,posY+=jj,45,0,Math.PI * 2,false);
    c.fill();
    if(posY>230 || posY<180){
        jj=-jj;
    }
},30);


//when game started
document.addEventListener('keypress', (e)=>{
    //to make the ball bounce
    vy=-10;
    
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
            
            //repeating rect
            if(xVal<-100){
                xVal = canvas.width+200; 
                d1=Math.floor(Math.random()*5)+2;
            }
            if(xVal2<-100){
                xVal2 = canvas.width+200; 
                d2=Math.floor(Math.random()*5)+2;
            }
            if(xValdo1<-100){
                xValdo1 = canvas.width+200; 
                d3=Math.floor(Math.random()*5)+2;
            }
            if(xValdo2<-100){
                xValdo2 = canvas.width+200; 
                d4=Math.floor(Math.random()*5)+2;
            }



            //chack whether touch
            if(xVal<=245 && xVal>=100 && posY<=200){
                clearInterval(id);
                alert('Game Over');
            }
            if(xVal2<=245 && xVal2>=100 && posY<=150){
                clearInterval(id);
                alert('Game Over');
            }
            if(xValdo1<=245 && xValdo1>=100 && posY>=yVal-200){
                clearInterval(id);
                alert('Game Over');
            }
            if(xValdo2<=245 && xValdo2>=100 && posY>=yVal-150){
                clearInterval(id);
                alert('Game Over');
            }

            //check edge touch
            if(posY<45 || posY>yVal-45){
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








































































// let xVal =canvas.width; 
// document.addEventListener('keypress', (e)=>{

    // if(e.code=='KeyM'){
    // let id=setInterval(function(){
    //     c.fillStyle='black';
    //     c.fillRect(0,0,canvas.width,canvas.height);
        // c.fillStyle='green';
        // c.fillRect(xVal-=3 , 0 ,100 ,200);
        // console.log(xVal);
        // if(xVal<-100){
        //     xVal = canvas.width+200; 
        // }
//             document.addEventListener('keypress', (e)=>{
//                 if(e.code=='KeyM'){
//                     clearInterval(id);
//                 }
//             });
        
//         },30); 
//     }
// });

////////////////////////////////////////////////////////////////////////
// let y=300;
// let a=300;
// let dy=-3;
// function jump(){
//     a+=dy;
    
//     c.clearRect(0,0,window.innerWidth,window.innerHeight);
//     requestAnimationFrame(jump);
//     c.beginPath();
//     c.arc(200,a,45,0,Math.PI * 2,false);
//     c.fillStyle='yellow';
//     c.fill();
//     c.stroke();

//     if(a<=170){
//         dy = -dy;
//     }
// }
// // function updown(){
    
// //     c.clearRect(0,0,window.innerWidth,window.innerHeight);
// //     requestAnimationFrame(updown);
// //     c.beginPath();
// //     c.arc(200,y+=dy,45,0,Math.PI * 2,false);
// //     c.fillStyle='yellow';
// //     c.fill();
// //     c.stroke();

// //     if(y>320 || y<270){
// //         dy = -dy;
// //     }
    
    
// // }
// document.addEventListener('keypress', (e)=>{
//     if(e.code=='Space'){
//         dy=-3;
//         jump() ;
//     }
// });
// // updown(); 
/////////////////////////////////////////////////////////////////////////////////

// let x=200,y=200;
// let dx = 4,dy=4;

// function Animation(){
//     c.clearRect(0,0,window.innerWidth,window.innerHeight);
//     requestAnimationFrame(Animation);
//     c.beginPath();
//     c.arc(x+=dx,y+=dy,45,0,Math.PI * 2,false)
//     c.strokeStyle = 'rgba(255,0,0,0.5)';
//     c.fillStyle='yellow';
//     c.fill();

//     if(x>=window.innerWidth || x<=0){
//         dx= -dx;
//     }
//     if(y>=window.innerHeight|| y<=0){
//         dy = -dy;
//     }
//     console.log('sdsds');
// }
// Animation();

// //console.log(canvas);

let min;
let sec;
let intervalID;
let running = false;
let timeDisplay = document.querySelector('#time');

let start = document.querySelector('#start-btn');
let pause = document.querySelector('#pause-btn');
let reset = document.querySelector('#reset-btn');

let pomadoroTime = document.querySelector('#pomadoro-time');
let pDown = document.querySelector('#p-down');
let pUp = document.querySelector('#p-up');

let breakTime = document.querySelector('#break-time');
let bDown = document.querySelector('#b-down');
let bUp = document.querySelector('#b-up');

let sessionType = 'Pomadoro';
let pomadoroSes = document.querySelector('#s-pomadoro')
let breakSes = document.querySelector('#s-break')

let alarm = document.querySelector('#alarm');

changeTime();
arrowFunction();
markSession();
changeSession();
startTimer()
pauseTimer();
resetTimer()

/**
 * arrows function
 */
function arrowFunction(){
     //pomadoro up-buttom
     pUp.addEventListener('click', ()=>{
          if(Number(pomadoroTime.textContent) < 120)
          pomadoroTime.textContent = Number(pomadoroTime.textContent) + 5;
          changeTime();
     })

     // pomadoro down-button
     pDown.addEventListener('click', ()=>{
          if(Number(pomadoroTime.textContent) > 5)
          pomadoroTime.textContent = Number(pomadoroTime.textContent) - 5;
          changeTime();
     })

          //pomadoro up-buttom
     bUp.addEventListener('click', ()=>{
          if(Number(breakTime.textContent) < 25)
          breakTime.textContent = Number(breakTime.textContent) + 5;
          changeTime();
     })

     // pomadoro down-button
     bDown.addEventListener('click', ()=>{
          if(Number(breakTime.textContent) > 5)
          breakTime.textContent = Number(breakTime.textContent) - 5;
          changeTime();
     })
}

/**
 * changes the time displayed and values of sec and min
 */
function changeTime(){
     if(sessionType == 'Pomadoro'){
          min = Number(pomadoroTime.textContent);
          sec = min*60;
          timeDisplay.textContent = `${addZero(Math.floor(sec/60))}:${addZero(sec%60)}`
     }
     else if(sessionType == 'Break'){
          min = Number(breakTime.textContent);
          sec = min*60;
          timeDisplay.textContent = `${addZero(Math.floor(sec/60))}:${addZero(sec%60)}`
     }
}

/**
 * 
 * @param {Number} num 
 * @returns if num is a single digit number than a zero will be added to the front of num
 */
function addZero(num){
     return (num < 10) ? `0${num}`: num;
}

/**
 * adds bubble to session type
 * */
function markSession(){
     if(sessionType == 'Pomadoro'){
          pomadoroSes.style.backgroundColor = '#5d85db';
          breakSes.style.backgroundColor = 'transparent';

     }
     else if(sessionType == 'Break'){
          breakSes.style.backgroundColor = '#5d85db';
          pomadoroSes.style.backgroundColor = 'transparent';
     }
}

/**
 * changes the sessionType
 */
function changeSession(){ 
     pomadoroSes.addEventListener('click', ()=>{
          sessionType = "Pomadoro";
          markSession();
          changeTime()
          if(running){
               clearInterval(intervalID);
               running = false;
          }
          
     })

     breakSes.addEventListener('click', ()=>{
          sessionType = "Break";
          markSession();
          changeTime()
          if(running){
               clearInterval(intervalID);
               running = false;
          }
     })
}

/**
 * starts the timer
 */
function startTimer(){
     start.addEventListener('click', ()=>{
          if(sessionType == 'Pomadoro' && running == false ){
               running = true;
               intervalID = setInterval(()=>{
                    timeDisplay.textContent = `${addZero(Math.floor(sec/60))}:${addZero(sec%60)}`
                    sec--;
                    changeTabTimer(timeDisplay.textContent,sessionType);
                    if(sec < 0){
                         clearInterval(intervalID);
                         running = false;
                         alarm.play();
                    }    
               },1000)
          }
     })

     start.addEventListener('click', ()=>{
          if(sessionType == 'Break' && running == false ){
               running = true;
               intervalID = setInterval(()=>{
                    timeDisplay.textContent = `${addZero(Math.floor(sec/60))}:${addZero(sec%60)}`
                    sec--;
                    changeTabTimer(timeDisplay.textContent,sessionType);
                    if(sec < 0){
                         clearInterval(intervalID);
                         running = false;
                         alarm.play();
                    }    
               },1000)
          }
     })
}

/**
 * pauses the timer
 */
function pauseTimer(){
     pause.addEventListener('click', ()=>{
          if(running){
               clearInterval(intervalID);
               running = false;
          }
     })
}

/**
 * reset timer
 */
function resetTimer(){
     reset.addEventListener('click',()=>{
          if(running){
               clearInterval(intervalID);
               running = false;
          }
          changeTime();
     })
}

let title = document.querySelector('title');

/**
 * changes the tab title to match timer
 * @param {Number} time 
 * @param {String} sessionType 
 */
function changeTabTimer(time, sessionType){
     title.textContent = `${sessionType} | ${time}`;
}


'use strict';

var cnt = 0;
var fivecnt = 0;
var go = false;

function timer() {
    if(!go)
        return;
    cnt++;
    if(cnt >= 5){
        cnt=0;
        everyFive();
    }
    jQuery("#counter").text(cnt);
    setTimeout(timer, 1000);
}

function everyFive(){
    fivecnt++;
    jQuery("#fiver").text(fivecnt);
}

function stopTimer(){
    go = false;  
} 
function startTimer(){
    go = true;
    timer();
} 

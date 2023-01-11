let music=new Audio("music.mp3");
let audioturn=new Audio("ting.mp3");
let gameover=new Audio("gameover.mp3");
const text=document.querySelector(".info");
let turn="X";
let w=false;
const btn=document.querySelector(".btn");
function changeTurn(){
    console.log("Hey there!!!");
    if(turn==="X"){
        turn="O";
    }
    else{
        turn="X";
    }
}

function checkWin(){
    let boxtext=document.getElementsByClassName("boxtext");
    let wins=[[0,1,2,0,5,0],
            [3,4,5,0,15,0],
            [6,7,8,0,25,0],
            [0,3,6,-10,15,90],
            [1,4,7,0,15,90],
            [2,5,8,10,15,90],
            [0,4,8,0,15,45],
            [2,4,6,0,15,135]];
    wins.forEach(function(win){
        if((boxtext[win[0]].innerText===boxtext[win[1]].innerText)&&(boxtext[win[2]].innerText===boxtext[win[1]].innerText)&&(boxtext[win[0]].innerText!=="")){
            text.innerHTML=`<span class="info">${boxtext[win[1]].innerText} is the Winner!!!</span>`;
            w=true;
            document.querySelector(".imgbox").getElementsByTagName("img")[0].style.width="200px";
            document.querySelector(".line").style.transform=`translate(${win[3]}vw, ${win[4]}vw) rotate(${win[5]}deg)`;
            document.querySelector(".line").style.width="30vw";
        }
    });
}

//Game logic
// music.play();
const boxes=document.querySelectorAll(".box");
boxes.forEach(function(box){
    const boxText=box.querySelector(".boxtext");
    box.addEventListener("click", function(){
        if(boxText.innerText===""){
            boxText.innerText=turn;
            audioturn.play();
            checkWin();
            changeTurn();
            if(!w){
                text.innerHTML=`<span class="info">Turn for ${turn}</span>`;
            }
        }
    })
});

btn.addEventListener("click", function(){
    const boxes=document.querySelectorAll(".box");
    boxes.forEach(function(box){
        const boxText=box.querySelector(".boxtext");
        boxText.innerText="";
    });
    document.querySelector(".imgbox").getElementsByTagName("img")[0].style.width="0";
    turn="X";
    w=false;
    document.querySelector(".line").style.width="0";
    text.innerHTML=`<span class="info">Turn for ${turn}</span>`;
});
const scisors = document.querySelectorAll(".scisor");
const rocks = document.querySelectorAll(".rock");
const papers = document.querySelectorAll(".paper");

const emptys = document.querySelectorAll(".empty");
var counter = 0;

let enmscore = 0;
let plyscore = 0;

dragstartevent(scisors);
dragstartevent(rocks);
dragstartevent(papers);

function dragstartevent(listofcards)
{
    for(const S of listofcards)
    {
        S.addEventListener("dragstart", function(e) {
            e.dataTransfer.setData("text/plain", S.id);
        });
    }
}


for(const E of emptys)
{
    E.addEventListener("dragover", e =>{
        if(E.children.length === 0){
            e.preventDefault();
            E.classList.add("hover");
            console.log("boufer");
        }
    });

    E.addEventListener("drop", function dropi(e){
        if(counter < 3){
            e.preventDefault();
            if(E.children.length === 0){
                const element = e.dataTransfer.getData("text/plain");
                E.appendChild(document.getElementById(element));
                E.className = "empty";
                document.getElementById(element).setAttribute("draggable", false)
                counter++;
            }
        }
        setTimeout( function(){
            if(counter === 3)
            {
                reveal();
                compare();
            }
        }, 100);
    });

    E.addEventListener("dragleave", function leaveF(e){
        E.className = "empty";
    })
}

//___________________________________events handeling__________________________

const enemys = document.querySelectorAll(".enemy");
let rockcount = 0;
let papercount = 0;
let scisorscount = 0;

var enemychoices = [];

function reveal()
{
    const deck = document.querySelector(".deck");
    deck.classList.add("dickout");
    for(const a of enemys)
    {
        let pick = Math.floor(Math.random() * 2.99);
        if(pick === 0)
        {
            a.appendChild(scisors[scisorscount]);
            scisorscount += 1;
            enemychoices.push("scisor");
        }
        else if(pick === 1)
        {
            a.appendChild(rocks[rockcount]);
            rockcount += 1;
            enemychoices.push("rock");
        }
        else if(pick === 2)
        {
            a.appendChild(papers[papercount]);
            papercount += 1;
            enemychoices.push("paper");
        }
    }
}

//____________________logic________________________________________

let enemyleft = 3;
let playerleft = 3;
//enemychoices
//empties

let playertracker = 2;
let enemytracker = 0;

function compare(){
var inter = setInterval(function dothis(){
    if(enemyleft > 0 && playerleft > 0)
    {
        if(emptys[playertracker].firstChild.className === enemychoices[enemytracker])
        {
            death(emptys[playertracker].id);
            death(enemys[enemytracker].id);
            enemyleft--;
            playerleft--;
            playertracker--;
            enemytracker++;
        }
        else if(emptys[playertracker].firstChild.className ==="scisor")
        {
            console.log(emptys[playertracker].firstChild.className)

            if(enemychoices[enemytracker] === "rock")
            {
                death(emptys[playertracker].id);
                playerleft--;
                playertracker--;
            }
            else
            {
                death(enemys[enemytracker].id);
                enemyleft--;
                enemytracker++;
            }
        }
        else if(emptys[playertracker].firstChild.className ==="paper")
        {
            if(enemychoices[enemytracker] === "scisor")
            {
                death(emptys[playertracker].id);
                playerleft--;
                playertracker--;
            }
            else
            {
                death(enemys[enemytracker].id);
                enemyleft--;
                enemytracker++;
            }
        }
        else if(emptys[playertracker].firstChild.className ==="rock")
        {
            if(enemychoices[enemytracker] === "paper")
            {
                death(emptys[playertracker].id);
                playerleft--;
                playertracker--;
            }
            else
            {
                death(enemys[enemytracker].id);
                enemyleft--;
                enemytracker++;
            }
        }
    }
    if(playerleft + enemyleft === 0)
    {
        //tie
        clearInterval(inter);
        setTimeout(reset, 1500);
        document.getElementById("result").innerHTML = "A TIE!";
    }
    else if(playerleft === 0)
    {
        //computer wins
        enmscore++;
        document.getElementById("score2").innerHTML = enmscore;
        clearInterval(inter);
        setTimeout(reset, 1500);
        document.getElementById("result").innerHTML = "THE COMPUTER WINS!";
    }
    else if(enemyleft === 0)
    {
        //player wins
        plyscore++;
        document.getElementById("score1").innerHTML = plyscore;
        clearInterval(inter);
        setTimeout(reset, 1500);
        document.getElementById("result").innerHTML = "THE PLAYER WINS!";
    }

    } ,1200);
}

function death(idofelement){
    document.getElementById(idofelement).classList.add("oppout");
}



function reset()
{
    document.getElementById("result").innerHTML = "";
    counter = 0;
    for(const elem of emptys)
    {
        elem.className = "empty";
    }
    for(const elem of enemys)
    {
        elem.className = "enemy";
    }
    for(const sci of scisors)
    {
        document.querySelector(".deckScisor").appendChild(sci);
        sci.setAttribute("draggable", true);
    }
    for(const sci of rocks)
    {
        document.querySelector(".deckRock").appendChild(sci);
        sci.setAttribute("draggable", true);
    }
    for(const sci of papers)
    {
        document.querySelector(".deckPaper").appendChild(sci);
        sci.setAttribute("draggable", true);
    }
    document.querySelector(".deck").className = "deck";

    rockcount = 0;
    papercount = 0;
    scisorscount = 0;
    enemychoices = [];
    enemyleft = 3;
    playerleft = 3;
    playertracker = 2;
    enemytracker = 0;
}
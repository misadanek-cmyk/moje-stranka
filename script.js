const vlevo = document.querySelector("#doleva");
const vpravo = document.querySelector("#doprava");
const zobrazit = document.querySelector("#zobrazit")


let energie = 20;
let souradnice = 0;
let cas = 100;
let pohnout = "";
let akce = "";

let baterka = Math.floor(Math.random() * 11);
console.log("Baterka:", baterka);

let past = Math.floor(Math.random() * 11);

zobrazit.addEventListener("click", () => {
    akce = "zobrazit";
})

vpravo.addEventListener("click", () => {
    pohnout = "vpravo";
});

vlevo.addEventListener("click", () => {
    pohnout = "vlevo";
});



function vykresleni(past, x){
    let mapa = "";
    console.log(past + ", " + x);
    for (let i = 1;i <= 10; i++){
        if (i === x && i === past && akce === "zobrazit") {
            mapa += "A";
        } else if (i === x) {
            mapa += "1";
        } else if (i === past && akce === "zobrazit") {
            mapa += "P";
        } else {
            mapa += "_";
        }
    }
    akce = "";
    console.log(mapa);
}



setInterval(() => {
    

    if (pohnout == "vpravo"){
        souradnice += 1; 
    } else if (pohnout == "vlevo"){
        souradnice -= 1;
    }

    if (pohnout !== ""){
        energie -= 1;
        //console.log("Souradnice:", souradnice);
        //console.log("Energie:", energie);
        pohnout = "";

        vykresleni(past, souradnice)

        if (souradnice == past){
            energie -= 25;
        }
        console.log(energie)   ;
    }

    if (souradnice == baterka){
        energie += 20;
        baterka = Math.floor(Math.random() * 11);
        console.log("hledej:  " + baterka);
        past = Math.floor(Math.random() * 11);
    }

}, cas);



/*
let pocet = 0;

for (let i = 1; i <= 10; i++){
    console.log(i)
}

while (pocet <= 10) {
    console.log(pocet);
    pocet += 1;
}
*/
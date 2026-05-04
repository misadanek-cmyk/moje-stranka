const vlevo = document.querySelector("#doleva");
const vpravo = document.querySelector("#doprava");
const zobrazit = document.querySelector("#zobrazit")
const preskocit = document.querySelector("#preskocit")
const pole = document.querySelector("#pole")
const pole_vipis = document.querySelector("#info")


let energie = 20;
let souradnice = 1;

let cas = 150;
let ukazovaci_cas = 5000;

let pohnout = "";
let akce = "";
let vypis = false;
let skok = false;
let past_ = false; 
let zobrazeni = "";
let vipis_text = "";

let baterka = Math.floor((Math.random() * 10) + 1);
let past = Math.floor((Math.random() * 10) + 1);

let hraInterval;



// --- EVENTY ---
zobrazit.addEventListener("click", () => {
    akce = "zobrazit";
    setTimeout(() => {
        akce = "";
    }, ukazovaci_cas);
})


preskocit.addEventListener("click", () => {
    skok = true;
})


vpravo.addEventListener("click", () => {
    if (skok){
        if (souradnice < 9){
            souradnice += 2;
            energie -= 2;
        }
    } else {
        if (souradnice < 10) {
            souradnice += 1; 
            energie -= 1;
        }
    }
    skok = false;
});



vlevo.addEventListener("click", () => {
    if (skok){
        if (souradnice > 2){
            souradnice -= 2;
            energie -= 2;
        }
    } else {
        if (souradnice > 1) {
            souradnice -= 1; 
            energie -= 1;
        }
    }
    skok = false;
});


// --- GENEROVÁNÍ NOVÉ BATERKY A PASTI ---
function vygenerovat(x){

    baterka = Math.floor(Math.random() * 10) + 1;


    past = Math.floor(Math.random() * 10) + 1;

}


// --- VYKRESLOVÁNÍ ---
function vykresleni(past, x, akce, baterka){
    let mapa = "";
    vipis_text = "";

    for (let i = 1; i <= 10; i++){
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

    if (x === baterka && !vypis) {
        vypis = true;
        setTimeout(() => {
            vypis = false;
        }, ukazovaci_cas);
    }

    if (vypis) {
        vipis_text += ("souradnice: " + x + ", energie: " + energie + ", hledej: " + baterka);
    } else {
        vipis_text +=("souradnice: " + x + ", energie: " + energie);
    }

    console.log(vipis_text);
    console.log(mapa);

    pole_vipis.textContent = (vipis_text);
    pole.textContent = (mapa);


}


// --- START HRY ---
function start(){
    clearInterval(hraInterval);
    vygenerovat(souradnice);
    
    vypis = true;
    setTimeout(() => {
        vypis = false;
    }, ukazovaci_cas);

    hraInterval = setInterval(() => {
        
        if (souradnice === past && !past_){
            energie -= 25;
            past_ = true;
        }
        if (souradnice !== past){
            past_ = false;
        }

        vykresleni(past, souradnice, akce, baterka)

        if (souradnice === baterka){
            energie += 20;
            vygenerovat(souradnice);
        }

        if (energie <= 0){
            console.log("Konec hry");
            clearInterval(hraInterval);
            return;
        }
    }, cas);
}

// --- SPUŠTĚNÍ HRY ---
start();

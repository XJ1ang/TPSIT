var dealer_somma = 0;
var you_somma = 0;
var mazzo;
var hidden;
let vittoria = true;
let mostra_completa = false;
let cont_A_you = 0;
let cont_A_dealer = 0;

function checkAce(x) {
    if (x) {
        if (you_somma == 21 && dealer_somma == 21) {
            document.getElementById('risultato').innerHTML = "WOW parita!";
            vittoria = false;
            basta();
        } else if (you_somma == 21) {
            document.getElementById('risultato').innerHTML = "hai vinto con un BJ!";
            vittoria = false;
            basta();
        }
    } else {
        if (dealer_somma == 21) {
            vittoria = false;
            document.getElementById('risultato').innerHTML = "hai perso contro un BJ!";
        }
    }
}

function contatore_asso(y, bool) {
    if (y == 'A') {
        if (bool) {
            cont_A_you++;
        } else {
            cont_A_dealer++;
        }
    }
}

function diminuzione_asso(bool) {
    if (bool) {
        if (cont_A_you > 0) {
            you_somma -= 10;
            cont_A_you--;  // Decrementare il contatore degli assi
            return false;
        } else {
            return true;
        }
    } else {
        if (cont_A_dealer > 0) {
            dealer_somma -= 10;
            cont_A_dealer--;  // Decrementare il contatore degli assi
            return false;
        } else {
            return true;
        }
    }
}

function cont_punti(mostra_completa) {
    var somma_nascosta;
    if (mostra_completa) {
        somma_nascosta = dealer_somma;
    } else {
        somma_nascosta = dealer_somma - GetValue(hidden);
    }

    document.getElementById('tu-somma').innerHTML = you_somma;
    document.getElementById('dealer-somma').innerHTML = somma_nascosta;
}

assembla_carte();
miaschia_carte();
inizia_gioco();

function assembla_carte() {
    var carte = ["A", "2", "3", '4', '5', '6', '7', '8', '9', 'J', 'Q', 'K'];
    var SegnoCarte = ['c', 'f', 'q', 'p'];
    mazzo = [];

    for (let i = 0; i < carte.length; i++) {
        for (let j = 0; j < SegnoCarte.length; j++) {
            mazzo.push(carte[i] + "-" + SegnoCarte[j]);
        }
    }
}

function miaschia_carte() {
    for (let i = 0; i < mazzo.length; i++) {
        let j = Math.floor(Math.random() * mazzo.length);
        let temp = mazzo[i];
        mazzo[i] = mazzo[j];
        mazzo[j] = temp;
    }
}

function inizia_gioco() {
    hidden = mazzo.pop();
    dealer_somma += GetValue(hidden);
    contatore_asso(hidden[0], false);

    let cardImg = document.createElement("img");
    cardImg.style.marginRight = "5px";
    let card = mazzo.pop();

    contatore_asso(card[0], false);

    dealer_somma += GetValue(card);
    cardImg.src = "./Carte/" + card + ".jpg";
    document.getElementById("dealer-card").append(cardImg);

    for (let i = 0; i < 2; i++) {
        cardImg = document.createElement("img");
        cardImg.style.marginRight = "5px";
        card = mazzo.pop();
        contatore_asso(card[0], true);
        you_somma += GetValue(card);
        cardImg.src = "./Carte/" + card + ".jpg";
        document.getElementById("you-card").append(cardImg);
    }
    you_somma=20;
    cont_punti(false);
    checkAce(true);
}

function GetValue(carta) {
    let data = carta.split("-");
    let valore = data[0];

    if (isNaN(valore)) {
        if (valore == "A") {
            return 11;
        }
        return 10;
    }
    return parseInt(valore);
}

function carta() {
    if (vittoria == true) {
        let cardImg = document.createElement("img");
        cardImg.style.marginRight = "5px";
        let card = mazzo.pop();
        contatore_asso(card[0], true);
        you_somma += GetValue(card);
        cardImg.src = "./Carte/" + card + ".jpg";
        document.getElementById("you-card").append(cardImg);
        cont_punti(false);
        console.log(card);
    }

    if (you_somma > 21) {
        let diminuzione = diminuzione_asso(true);

        if (diminuzione) {
            
            document.getElementById('risultato').innerHTML = "HAI PERSO SUPERANDO 21\nDealer ha la meglio";
            vittoria = false;
        }

        cont_punti(false);
    }
}

let dealerInterval;

function carta_dealer() {
    if (dealer_somma < you_somma && dealer_somma < 17) {
        cont_punti(true);
        let cardImg = document.createElement("img");
        cardImg.style.marginRight = "5px";
        let card = mazzo.pop();
        contatore_asso(card[0], false);
        cardImg.src = "./Carte/" + card + ".jpg";
        document.getElementById("dealer-card").append(cardImg);
        dealer_somma += GetValue(card);
        
        
    } else {
        let diminuzione=diminuzione_asso(false);

        if(diminuzione)
        {
            clearInterval(dealerInterval);
        if (you_somma == dealer_somma) {
            document.getElementById('risultato').innerHTML = "Pareggio";
        } else {
            if (you_somma > dealer_somma || dealer_somma > 21) {
                document.getElementById('risultato').innerHTML = "HAI VINTO";
            } else {
                document.getElementById('risultato').innerHTML = "HAI PERSO";
            }
        }  
        }
        cont_punti(true);
    }
}

function basta() {
    if(vittoria)
    {
    cont_punti(true);
    checkAce(false);
    let dealerCardDiv = document.getElementById("dealer-card");
    let imgElement = dealerCardDiv.getElementsByTagName("img")[0];
    imgElement.src = "./Carte/" + hidden + ".jpg";
    if (vittoria == true) {
        dealerInterval = setInterval(carta_dealer, 1000);
    }
    }
 
}

function rigioca() {
    dealer_somma = 0;
    you_somma = 0;
    mazzo = [];
    vittoria = true;
    mostra_completa = false;
    cont_A_you = 0;
    cont_A_dealer = 0; // Reset contatori degli assi
    document.getElementById('dealer-card').innerHTML = '';
    let cardImg = document.createElement("img");
    cardImg.style.marginRight = "5px";
    cardImg.src = "./Carte/back.jpg";
    document.getElementById("dealer-card").append(cardImg);

    document.getElementById('you-card').innerHTML = '';
    document.getElementById('risultato').innerHTML = '';

    assembla_carte();
    miaschia_carte();
    inizia_gioco();
}

function generatePrimes(limit) {
    const primes = [1];//cosi

    for (let i = 2; i <= limit; i++) {
        if (isPrime(i)) {
            primes.push(i);
        }
    }
   
    return primes;
}


function isPrime(num) {
            if (num <= 1) return false; // 0 e 1 non sono primi
            for (let i = 2; i <= Math.sqrt(num); i++) {
                if (num % i === 0) return false; // Divisibile per un numero diverso da 1 e se stesso
            }
            return true; // È primo
        }

function printArrayInDivs(arr) {
    const container = document.getElementById('container');
   
    //ittera per ogni elemento nell'array
    arr.forEach(element => {
        const div = document.createElement('div');
        div.classList.add('box');//aggiunge la classe box
        div.textContent = element;
        container.appendChild(div);//crea un figlio da container
    });
}


const generatePari=(num)=>{
    const arr =[];
    for(i=2; i<=num;i++){
        if(i%2==0){
            arr.push(i);
        }
    }return arr;

}

// Esempio di utilizzo

let Num = generatePrimes(1000);
let NumPari = generatePari(1000);

const GoldBach = () => {
    const arr = [];
    let arrEscludi=[];
    NumPari.forEach(numero => {
        arrEscludi=[];
        for (let i = 0; i < numero; i++) {
            for (let j = 0; j < numero; j++) {
                if (Num[i] + Num[j] == numero && !(arrEscludi.includes(Num[i]))) {
                    arr.push(`${Num[i]} + ${Num[j]} = ${numero}`);
                    arrEscludi.push(Num[j]);                
                }
            }
        }
    });
    return arr;
}

let x = GoldBach();
console.log(x);


printArrayInDivs(x);

/* script.js */
let xin=0;
let andrei=0;
let marica=0;
let mauri=0;
let signora=0;



function nextPage(pageId) {
    const pages = document.querySelectorAll('.pagina');
    pages.forEach(page => {
        page.style.display = 'none';
    });
    document.getElementById(pageId).style.display = 'block';
}
nextPage('pagina0');


const invio = () => {
    let anno = document.getElementById('anno').value;

    if(anno<2000)
    {
        mauri+=1;
        signora+=1;
    
    }
    else{
        xin+=1;
        andrei+=1;
        
    }
    if (anno !== "") {
        nextPage('pagina1');
    }
   
}


function tele(){
    marica+=1;
 
}

function donna(){
    signora +=1;
   
}

function uomo(){
    mauri +=1;
   
}

function basket(){
    andrei+=1;
   
}

function calippo(){
    xin+=1;

}


function mostra()
{
    if(xin==2)
    {
    document.getElementById('risultato').innerHTML="Sei 100% eterosessuale, hai origini dall'asia , ti piace andare in palestra e sei anche un grande amico ma attenzione che uno dei tuoi amici potrebbe confessarsi omosessuale ma questo so che non ci sarà nessun problema";
    }else if(andrei==2){
        document.getElementById('risultato').innerHTML="Sei al 100% eterosessuale,hai origini all'est dell'europa, sei socievole ti piace essere molto competitivo e alcune volte sei una testa calda, ma un giorno un tuo amico si confessera omosessuale, all'inizio sarà confuso ma lo accetterai";
    }else if(mauri==2){
        document.getElementById('risultato').innerHTML="Sei un padre 100% eterosessuale, sei gentile, altruista con il prossimo quanto saggio e con le braccia  sempre aperte per il prossimo ma un giorno forse un tuo figlio/a potrebbe confessarsi omosessuale e all'inizio sarà dura ma lo capirai e lo amerai per quello che è";
    }else if(marica==2){
        document.getElementById('risultato').innerHTML="Sei etero al 90%, sei una brava ragazza con un'ottima visione di ciò che ti circonda, scegliendo con sagezza i tuoi amici ma atenzione che se hai un fratello/sorella stagli accanto che ne potrebbe avere bisogne in un momento di conforto per il suo orientametno di genere";
    }else if(signora==2){
        document.getElementById('risultato').innerHTML="Sei una madre 100% eterosessuale, sei un bravo genitore che mette al primo posto i suoi figli più di ogni altra cosa l'importante che stiano bene e al sicuro, la avviso potrebbe che uno dei suoi figli sia orientato al sesso opposto al suo e quando accadrà lei gli sarà accanto, legando una relazione anche più forte!";
    }else{
    
    document.getElementById('risultato').innerHTML="Sei omosessuale al 90% e trans al 10%, sei un ragazzo molto timido e ti arrabbi facilmente quando ti criticano o ti giudicano, ma questo non deve essere un problema per ciò che sei, sii te stesso e la strada andrà per il verso giusto! ";
        
    }
}



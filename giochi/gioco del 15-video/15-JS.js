
    const w = 400;
    const h = 400;
    const title_size = 100;

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = w;
    canvas.height = h;

    class tile {
        constructor(pos) {
            this.idx = pos;
        }

        get Num() {
            return this.idx !== -1 ? this.idx + 1 : " ";
        }
    }

    const shuffle = (arr) => {
        arr.forEach((_, i) => {
            let j = Math.floor(Math.random() * arr.length);
            [arr[i], arr[j]] = [arr[j], arr[i]];
        });
    }

    const swap = (arr, i, j) => {
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    const drawlText = (txt, x, y) => {
        ctx.font = "50px serif";
        ctx.textAlign = "center"; // Centra il testo orizzontalmente
        ctx.textBaseline = "middle"; // Centra il testo verticalmente
        ctx.fillText(txt, x, y);
    }

    const tiles = [];
    const tilesPos = [];
    let emptyPos = 15;

    for (let i = 0; i < 15; i++) {
        tiles.push(new tile(i));
        tilesPos.push(i);
    }

    tiles.push(new tile(-1));
    shuffle(tilesPos);
    tilesPos.push(15);

    const idxToCoords = (idx) => {
        return { r: title_size * (Math.floor(idx / 4)), c: title_size * (idx % 4) };
    }

    const show = () => {
        ctx.clearRect(0, 0, w, h);

        tilesPos.forEach((tilesPos, idx) => {
            const { r, c } = idxToCoords(idx);
            ctx.strokeRect(c, r, title_size, title_size);
            drawlText(tiles[tilesPos].Num, c + 0.5 * title_size, r + 0.5 * title_size); // Centra il testo nella casella
        });

        requestAnimationFrame(show);
    }

    show();
//event list che controlla i click
    const getTileIndex = (x, y) => {
        const col = Math.floor(x / title_size);
        const row = Math.floor(y / title_size);
        return row * 4 + col;
    }

    canvas.addEventListener('click', (e) => {
        const { offsetX, offsetY } = e;
        const clickedIndex = getTileIndex(offsetX, offsetY);

        const validMoves = {
            ArrowRight: emptyPos + 1,
            ArrowLeft: emptyPos - 1,
            ArrowUp: emptyPos - 4,
            ArrowDown: emptyPos + 4
        };

        for (let move in validMoves) {
            if (validMoves[move] === clickedIndex) {
                swap(tilesPos, emptyPos, clickedIndex);
                emptyPos = clickedIndex;
                break;
            }
        }
    });



const moves=
{
    ArrowRight :()=>{

        let array = Array.from({ length: 4 }, (v, i) => (i * 4)+3);
        if(emptyPos+1<16 && !(array.includes(emptyPos)) ){  
            swap(tilesPos, emptyPos+1, emptyPos)
            emptyPos=emptyPos+1;
        }
       
        
    },
    ArrowLeft :()=>{
        let array = Array.from({ length: 4 }, (v, i) => i * 4);

        if(emptyPos-1 > -1 && !(array.includes(emptyPos)))
        {
            swap(tilesPos, emptyPos-1, emptyPos)
            emptyPos=emptyPos-1;
        }
      
    },
    ArrowUp :()=>{
        if(emptyPos-4>-1)
        {
        swap(tilesPos, emptyPos-4, emptyPos)
        emptyPos=emptyPos-4; 
        }
        
    }, 
    ArrowDown :()=>{
        if(emptyPos+4<16){
            swap(tilesPos, emptyPos+4, emptyPos)
            emptyPos=emptyPos+4;
        }
        
    }

}
    


    document.body.onkeydown=(e)=>{
        moves[e.code]();
    }
    
    


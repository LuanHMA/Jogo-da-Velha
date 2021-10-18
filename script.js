const game = {
    board: ['','','','','','','','',''],
    simbols: {
        options: ['X','O'],
        turn_index: 0,
        change(){
            this.turn_index = (this.turn_index === 0 ? 1:0);
        }
    },
    container_game: null,
    gameOver: false,
    winning_sequences: [
        [0,1,2],[3,4,5],[6,7,8],//Vertical
        [0,3,6],[1,4,7],[2,5,8],//Horizontal
        [0,4,8],[2,4,6]//Diagonal
    ],
    player: document.querySelector('.rodada h1'),
    resultado: document.querySelector('.resultado h1'),
    init(container){
        this.container_game = container;
    },
    game_over(){
        this.gameOver = true;
        console.log('Game Over');
    },
    restart(){
        document.querySelector('button').addEventListener('click',e=>{
            game.start();
            document.querySelector('.resultado h1').style.opacity='0';
            this.simbols.turn_index = 0;
            this.player.innerHTML = 'Vez do: X';
        })
    },
    start(){
        this.board.fill('');//Adiciona um valor em todas as posições do array;
        this.gameOver = false;
        this.draw();
    },
    win(simbol){
        console.log(`O vencedor é: ${simbol}`);
        this.resultado.style.opacity= '1';
        this.resultado.innerHTML= `Vencedor:  ${simbol}`
    },
    scoreDraw(){
        console.log('empatou')
        this.resultado.style.opacity= '1';
        this.resultado.innerHTML='Empatou!'

    },
    turnPlayer(){
        if(this.simbols.options[this.simbols.turn_index] == 'X'){
            return 'Vez do: O'
        }
        if(this.simbols.options[this.simbols.turn_index] == 'O'){
            return 'Vez do: X';
        }
    },
    makePlay(position){
        if(this.gameOver) return false;
        if(this.board[position] === ''){
            this.board[position] = this.simbols.options[this.simbols.turn_index];
            
            this.player.innerHTML = this.turnPlayer();

            this.draw();
            
            let winning_index = this.checkWinningSequences(this.simbols.options[this.simbols.turn_index]);
            
            if(winning_index >= 0){
                this.game_over();
            }
            if(winning_index == -1 && this.board.indexOf('') == -1){
                this.scoreDraw();
            }
            else{
                this.simbols.change();
            }
            return true;
        }
        else{
            return false;
        }
    },

    checkWinningSequences(simbol){
        for(i in this.winning_sequences){
            if(
                this.board[ this.winning_sequences[i][0] ] === simbol &&
                this.board[ this.winning_sequences[i][1] ] === simbol &&
                this.board[ this.winning_sequences[i][2] ] === simbol){
                    console.log('Sequencia vencedora: '+i)
                    this.win(simbol);
                    return i;//Posição do array winning_sequences
                }
        };
        return -1;
    },
    draw(){
        let content = '';
        for(i in this.board){
            content += `<div onclick="game.makePlay(${i})">${this.board[i]}</div>`;
        }
        this.container_game.innerHTML = content;

    }


}
game.init(document.querySelector(".container"));
game.start();
game.restart()
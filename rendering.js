const messagesSection = document.querySelector('.messagesSection');
let arrow = 0;
const svg = document.querySelector('#svg');
const firstRow= '0123456789';
const firstColumn = 'abcdefghij';

export function renderGrid (player, playerDiv, opponent) {
    for (let i = 0; i<11; i++) {
        const row = document.createElement('div');
        row.classList = 'row';
        playerDiv.appendChild(row);
        for (let j=0; j<11; j++) {
            const cell = document.createElement('div');
            row.appendChild(cell);
            
            if (i==0 && j!=0) {
                cell.textContent = firstRow.charAt(j-1);
                cell.classList = 'firstRowNColumn';
            }
            else if (i>0&&j==0) {
                cell.textContent = firstColumn.charAt(i-1);
                cell.classList = 'firstRowNColumn';
            }
            else if (i ===0 && j ===0) {
                cell.classList = 'firstRowNColumn'
            }
            else {
                cell.classList = 'cell';
                cell.addEventListener('click', ()=>{
                    if (player.isPlayerTurn == false) {

                        return messagesSection.textContent = "It's " + opponent.name + "'s turn!"
                    }
                    else {
                        player.isPlayerTurn = false;
                        opponent.isPlayerTurn = true;
                        //change arrow direction
                        if(arrow == 0){
                            arrow = 1;
                            svg.classList = 'arrowRight';
                        }
                        else {
                            arrow = 0;
                            svg.classList = 'arrowLeft';
                        }
                        messagesSection.textContent = player.gameboard.receiveAttack(j-1,i-1);
                        if (player.gameboard.board[j-1][i-1].hasBeenTargeted == true) {
                            if (player.gameboard.board[j-1][i-1].boatInPlace != null) {
                            cell.classList = 'damagedBoat';
                            }
                            else {
                                cell.classList = 'emptySpaceDiscovered';
                            };
                        };
                    }
                    
                });
            };
        };
    };
};

export function renderGameOver(message) {
    const popUpGameOver = document.createElement('div');
    const textDiv=document.createElement('div');
    textDiv.textContent = message;
    textDiv.classList='popUpText';
    const body = document.querySelector('body');
    popUpGameOver.classList = 'popUpGameOver';
    const refreshButton = document.createElement('button');
    refreshButton.classList='refreshButton';
    refreshButton.textContent = 'Play again';
    refreshButton.addEventListener('click' ,()=> {
        window.location.reload()
    });
    popUpGameOver.appendChild(textDiv);
    popUpGameOver.appendChild(refreshButton);
    body.appendChild(popUpGameOver);
}
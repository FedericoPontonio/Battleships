import { boatsPlacementHandler } from "./boatsPlacement.js";
const messagesSection = document.querySelector('.messagesSection');
const playerOneDiv = document.querySelector('.playerOne');
const playerTwoDiv = document.querySelector('.playerTwo');
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
                cell.classList = 'cell '+ player.name;
                //questo non è rendering!! è logica. gameflow?
                cell.addEventListener('click', ()=>{
                    if (player.isPlayerTurn == false) {
                        return messagesSection.textContent = "It's " + opponent.name + "'s turn!"
                    }
                    else {





                        messagesSection.textContent = player.gameboard.receiveAttack(j-1,i-1);
                        if (player.gameboard.board[j-1][i-1].hasBeenTargeted == true) { //useless?? it's always true if it reaches this point
                            if (player.gameboard.board[j-1][i-1].boatInPlace != null) {
                                cell.classList = 'damagedBoat';
                                player.BoatDetectedBehaviourAI.isBoatDetected = true;
                                if (player.BoatDetectedBehaviourAI.coordinatesQueue.length == 0) {
                                    player.BoatDetectedBehaviourAI.coordinatesQueue.push([i-1, j-1]);
                                    
                                }
                                if (player.gameboard.boatsSunkCounter <5) {
                                    player.AiBehaviour();
                                };
                                
                            }
                            else {
                                cell.classList = 'emptySpaceDiscovered';
                                //change turn
                                (function changeTurn() {
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
                                }) ();
                                opponent.AiBehaviour();
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
};

export function renderInitialForm(playerOne, playerTwo) {
    const formDiv = document.createElement('form');
    const body = document.querySelector('body'); //not DRY.to fix
    formDiv.setAttribute("method", "post");
    formDiv.setAttribute('class', 'initialForm');
    body.appendChild(formDiv);

    //names
    const playerOneName = document.createElement('input');
    playerOneName.setAttribute('type', 'text');
    playerOneName.setAttribute('name', 'Player One name');
    playerOneName.setAttribute('placeholder', 'Player One');

    const playerTwoName = document.createElement('input');
    playerTwoName.setAttribute('type', 'text');
    playerTwoName.setAttribute('name', 'Player Two name');
    playerTwoName.setAttribute('placeholder', 'Player Two');

    //AI toggle source: https://www.w3schools.com/howto/howto_css_switch.asp
        //AI for player One
    let activateAIPlayerOne = false;
    const AISwitcherSection1 = document.createElement('div');
    AISwitcherSection1.classList ='aiSwitcher';
    const enableAI1 = document.createElement('div');
    enableAI1.textContent='Enable AI for player One';
    const label1 = document.createElement('label');
    label1.classList ='switch';
    const inputVariable1 = document.createElement('input');
    inputVariable1.setAttribute('type', 'checkbox');
    const span1 = document.createElement('span');
    span1.classList='slider round';
    span1.addEventListener('click', ()=> {
        if(activateAIPlayerOne == false) {
            activateAIPlayerOne = true
        }
        else {
            activateAIPlayerOne = false
        }
    });
    label1.appendChild(inputVariable1);
    label1.appendChild(span1);
    AISwitcherSection1.appendChild(enableAI1);
    AISwitcherSection1.appendChild(label1);

        //AI for player Two
    let activateAIPlayerTwo = false;
    const AISwitcherSection2 = document.createElement('div');
    AISwitcherSection2.classList = 'aiSwitcher';
    const enableAI2 = document.createElement('div');
    enableAI2.textContent='Enable AI for player Two';
    const label2 = document.createElement('label');
    label2.classList ='switch';
    const inputVariable2 = document.createElement('input');
    inputVariable2.setAttribute('type', 'checkbox');
    const span2 = document.createElement('span');
    span2.classList='slider round';
    span2.addEventListener('click', ()=> {
        if(activateAIPlayerTwo == false) {
            activateAIPlayerTwo = true
        }
        else {
            activateAIPlayerTwo = false
        }
    });
    label2.appendChild(inputVariable2);
    label2.appendChild(span2);
    AISwitcherSection2.appendChild(enableAI2);
    AISwitcherSection2.appendChild(label2);
    

    //submit
    const submitForm = document.createElement('button');
    submitForm.textContent = 'Start game';
    submitForm.addEventListener('click', ()=>{
        event.preventDefault();
        //names
        if (playerOneName.value != '') {
            playerOne.name = playerOneName.value;
        }
        else {
            playerOne.name = 'playerOne';
        };
        if (playerTwoName.value != '') {
            playerTwo.name = playerTwoName.value;
        }
        else {
            playerTwo.name = 'playerTwo';
        };
        //playerOne ai
        if (activateAIPlayerOne) {
            playerOne.isAI = true
        }
        //playerTwo ai
        if (activateAIPlayerTwo) {
            playerTwo.isAI = true
        }
        body.removeChild(formDiv);
        // boatsPlacementHandler(); //uncomment to access boat placement tool
        renderNames(playerOne, playerTwo);
        renderGrid(playerOne, playerOneDiv, playerTwo);
        renderGrid(playerTwo, playerTwoDiv, playerOne);
        playerOne.fullGrid = document.querySelectorAll(`.cell.${playerOne.name}`);
        playerTwo.fullGrid = document.querySelectorAll(`.cell.${playerTwo.name}`);
        if (playerOne.isAI == true) {
            playerOne.AiBehaviour()
        };
    });
    //mock divs for quick grid formatting
    const mockDiv = document.createElement('div');
    const mockDiv2 = document.createElement('div');
    const mockDiv3 = document.createElement('div');
    const mockDiv4 = document.createElement('div');

    formDiv.appendChild(playerOneName);
    formDiv.appendChild(mockDiv);
    formDiv.appendChild(playerTwoName);
    formDiv.appendChild(AISwitcherSection1);
    formDiv.appendChild(mockDiv3);
    formDiv.appendChild(AISwitcherSection2);
    formDiv.appendChild(mockDiv2);
    formDiv.appendChild(submitForm);
    formDiv.appendChild(mockDiv4);
};

function renderNames(playerOne, playerTwo) {
    const playerOneName = document.querySelector('.playerOneName');
    playerOneName.textContent = playerOne.name;
    const playerTwoName = document.querySelector('.playerTwoName');
    playerTwoName.textContent = playerTwo.name;
};


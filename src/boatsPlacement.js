import { playersData } from "./playersData.js";
const firstRow= '0123456789';
const firstColumn = 'abcdefghij';
const images = {
    carrier : new Image(30, 150), 
    battleship : new Image(25, 125),
    destroyer : new Image(25, 125),
    submarine : new Image(25, 90),
    patrolBoat : new Image(20, 60),

};
images.battleship.src = 'images/Battleship-board.png';images.battleship.setAttribute('id', '4');
images.carrier.src = 'images/Carrier-board.png';images.carrier.setAttribute('id', '5');
images.destroyer.src = 'images/Destroyer-board.png';images.destroyer.setAttribute('id', '4');
images.submarine.src = 'images/Submarine-board.png';images.submarine.setAttribute('id', '3');
images.patrolBoat.src = 'images/Patrol Boat-board.png';images.patrolBoat.setAttribute('id', '2');
const boatsArray = [images.carrier, images.battleship, images.destroyer, images.submarine, images.patrolBoat];



boatsArray.forEach(boat => {
    boat.addEventListener('dragstart', () => {
        boat.classList = 'dragging';
    })
    boat.addEventListener('dragend', () => {
        boat.classList.remove('dragging')
    })
});




const playerGridDiv = function playerGrid4BoatPlacement(player) {
    const playerGridDiv = document.createElement('div');
    playerGridDiv.setAttribute('id', player.name );
    let counter = -1;
    for (let i = 0; i<11; i++) {
        const row = document.createElement('div');
        row.classList = 'row';
        playerGridDiv.appendChild(row);
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
                counter +=1;
                cell.classList = 'cell '+ player.name + ' '+ counter;
            }
        }
    }
    return playerGridDiv
};



export function boatsPlacementHandler(player = playersData.playerOne) {
    if (player.isAI == false) {
        const body = document.querySelector('body');
        const boatsPlacementDisplay = document.createElement('div');
        boatsPlacementDisplay.classList = 'boatsPlacementDisplay';
        const boatsIconsDiv = document.createElement('div');
        boatsIconsDiv.classList = 'boatsIconsDiv';
        boatsIconsDiv.appendChild(images.carrier);
        boatsIconsDiv.appendChild(images.battleship);
        boatsIconsDiv.appendChild(images.destroyer);
        boatsIconsDiv.appendChild(images.submarine);
        boatsIconsDiv.appendChild(images.patrolBoat);
        const secondRowDiv = document.createElement('div');
        secondRowDiv.classList = 'secondRowContainer';
        secondRowDiv.appendChild(playerGridDiv(player));
        secondRowDiv.appendChild(boatsIconsDiv);
        const header = document.createElement('header');
        header.textContent = 'Place your boats, '+ player.name;
        body.appendChild(boatsPlacementDisplay);
        boatsPlacementDisplay.appendChild(header);
        boatsPlacementDisplay.appendChild(secondRowDiv);

        const fullGridBoatPlacer = document.querySelectorAll('.cell.playerOne');
        let counter=-1;
        fullGridBoatPlacer.forEach(cell => {
            counter +=1;
            cell.addEventListener('dragover', ()=>{
                const boatDragged = document.querySelector('.dragging');
                if(cell.classList[cell.classList.length-1][0] <= 10-boatDragged.id ||
                    cell.classList[cell.classList.length-1] < 11
                ) {
                    cell.appendChild(boatDragged);
                }
            })
        })

    }
    //else randomize placement

    //al submit
    // if (player == playersData.playerOne) {
    //     boatsPlacementHandler(playersData.playerTwo);
    // }
    
}
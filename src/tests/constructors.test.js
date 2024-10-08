import {Ship, Gameboard, Player} from '../constructors.js';

test('creates a ship object with size, hp, hit, evaluateIfSunk and isItSunk properties/methods', () => {
    expect(Ship(6, 'battleship')).toMatchObject({name: 'battleship', size:6, hp:6, isSunk:false});
  });
test('check if hit method removes 1 hit point from the ship', () => {
  const aldo = Ship(5, 'aldo');
  aldo.hit();aldo.hit();
  expect(aldo).toMatchObject({hp:3})
});
test('Ships sink if hp reaches 0', () => {
  const mirko = Ship(2, 'mirko');
  mirko.hit();mirko.hit();
  expect(mirko).toMatchObject({isSunk:true});
});

test('game board 2d array gets created', () => {
  expect(Gameboard().board).toHaveLength(10);
});
test('boat object gets placed in appropriate board slot', () => {
  let player1Board = Gameboard();let battlestarGalactica= Ship(7,'battlestarGalactica');
  player1Board.placeBoat(battlestarGalactica, Gameboard().possiblePlacements(battlestarGalactica.size, 0, 0).right);
  expect(player1Board.board[2][0].boatInPlace.name).toBe("battlestarGalactica");
  expect(player1Board.board[1][0].boatInPlace.size).toBe(7);
});
test('Error gets thrown if attempted to place a boat where there is one already', () => {
  let player1Board = Gameboard();let battlestarGalactica= Ship(7,'battlestarGalactica');let ship2=Ship(2, 'ship2');
  player1Board.placeBoat(battlestarGalactica, Gameboard().possiblePlacements(battlestarGalactica.size, 0, 0).right);
  expect(()=>{player1Board.placeBoat(ship2, player1Board.possiblePlacements(ship2.size, 0, 0).right)}).toThrow('A boat is already in this place');
}); 
//need to make sure that the size of the boat corrisponds to the number of occupied cells and that the cells are adiacent.
test('excludes illegal placements', () => {
  let battlestarGalactica= Ship(3,'battlestarGalactica');
  expect(Gameboard().possiblePlacements(battlestarGalactica.size, 0, 0)).toMatchObject({"down": [[0, 0], [0, 1], [0, 2]], "letf": null, "right": [[0, 0], [1, 0], [2, 0]], "up": null});
  expect(Gameboard().possiblePlacements(battlestarGalactica.size, 9, 0)).toMatchObject({"down": [[9, 0], [9, 1], [9, 2]], "letf": [[7, 0], [8, 0], [9, 0]], "right": null, "up": null});
  expect(Gameboard().possiblePlacements(battlestarGalactica.size, 0, 3)).toMatchObject({"down": [[0, 3], [0, 4], [0, 5]], "letf": null, "right": [[0, 3], [1, 3], [2, 3]], "up": [[0, 1], [0, 2], [0, 3]]});
  expect(Gameboard().possiblePlacements(5, 4, 6)).toMatchObject({"down": null, "letf": [[0, 6], [1, 6], [2, 6], [3, 6], [4, 6]], "right": [[4, 6], [5, 6], [6, 6], [7, 6], [8, 6]], "up": [[4, 2], [4, 3], [4, 4], [4, 5], [4, 6]]});
});
test('receive attack without hitting a boat', () => {
  let player1Board = Gameboard();
  expect(player1Board.board[4][5].hasBeenTargeted).toBeFalsy();//before the hit
  expect(player1Board.receiveAttack(4, 5)).toBe('No ship has been hit.')
  expect(player1Board.board[4][5].hasBeenTargeted).toBeTruthy();//after the hit
});
test('receive attack damaging a boat', () => {
  let battlestarGalactica = Ship(4,'battlestarGalactica');let player1Board = Gameboard();
  player1Board.placeBoat(battlestarGalactica, player1Board.possiblePlacements(battlestarGalactica.size, 4, 5).right);
  expect(player1Board.receiveAttack(4, 5)).toBe(player1Board.board[4][5].boatInPlace.name+' has been hit!')
});
test('checks if all boats has been sunk', () => {
  let player1Board = Gameboard();
  let battlestarGalactica = Ship(1,'battlestarGalactica');let ship2=Ship(1, 'ship2');let ship3=Ship(1, 'ship3');let ship4=Ship(1, 'ship4');let ship5=Ship(1, 'ship2');
  player1Board.placeBoat(battlestarGalactica, player1Board.possiblePlacements(battlestarGalactica.size, 4, 5).right);
  player1Board.placeBoat(ship2, player1Board.possiblePlacements(ship2.size, 3, 5).right);player1Board.receiveAttack(3,5);
  player1Board.placeBoat(ship3, player1Board.possiblePlacements(ship3.size, 2, 5).right);player1Board.receiveAttack(2,5);
  player1Board.placeBoat(ship4, player1Board.possiblePlacements(ship4.size, 1, 5).right);player1Board.receiveAttack(1,5);
  player1Board.placeBoat(ship5, player1Board.possiblePlacements(ship5.size, 0, 5).right);player1Board.receiveAttack(0,5);
  expect(player1Board.receiveAttack(4,5)).toBe('All the boats have been sunk! Game over!');
});
test('creates a player', () => {
  expect(Player('antonio')).toMatchObject({name: 'antonio'});
});
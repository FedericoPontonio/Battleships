import {Ship, Gameboard} from '../constructors.js';

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
  player1Board.placeBoat(battlestarGalactica, 0, 1);
  expect(player1Board.board[0][1].boatInPlace.name).toBe("battlestarGalactica");
  expect(player1Board.board[0][1].boatInPlace.size).toBe(7);
});
//need to make sure that the size of the boat corrisponds to the number of occupied cells and that the cells are adiacent.
test('excludes illegal placements', () => {
  let player1Board = Gameboard();let battlestarGalactica= Ship(3,'battlestarGalactica');
  expect(Gameboard().possiblePlacements(battlestarGalactica.size-1, 0, 0)).toMatchObject([[2, 0], [0, 2]]);
  expect(Gameboard().possiblePlacements(battlestarGalactica.size-1, 0, 3)).toMatchObject([[2, 3], [0,1],[0,5]]);//tutto da rivedere
});
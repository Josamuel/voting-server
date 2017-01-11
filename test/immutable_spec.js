import {expect} from 'chai'
import {List} from 'immutable'

// immutable has a helper function called update for nested data structures like this one.  

describe('immutability', () => {
  describe('a tree', () => {
    function addMovie(currentState, movie) {
      return currentState.update('movies', movies => movies.push(movie))
    }
    it('is immutable', () => {
      let state = Map({
        List.of('Trainspotting', '28 Days Later')
      })
      // addMovie's first parameter is the list you're adding to.  
      let nextState = addMovie(state, 'Sunshine');

      expect(nextState).to.equal(Map({
        movies: List.of(
        'Trainspotting',
        '28 Days Later', 
        'Sunshine'
        ) 
      }));
      // state of the initial list doesn't change by adding Sunshine.  Online the nextState has that.  
      expect(state).to.equal(Map({
        movies: List.of(
        'Trainspotting',
        '28 Days Later'
        )
      }))
    })

  })
})


  // describe('A List', () => {
  //   function addMovie(currentState, movie) {
  //     return currentState.push(movie);
  //   }
  //   it('is immutable', () => {
  //     let state = List.of('Trainspotting', '28 Days Later')
  //     let nextState = addMovie(state, 'Sunshine');

  //     expect(nextState).to.equal(List.of(
  //       'Trainspotting',
  //       '28 Days Later', 
  //       'Sunshine'
  //     ));
  //     // state of the initial list doesn't change by adding Sunshine.  Online the nextState has that.  
  //     expect(state).to.equal(List.of(
  //       'Trainspotting',
  //       '28 Days Later'
  //     ))
  //   })

  // })





// describe('immutability', () => {

//   describe('a number', () => {

//     function increment(currentState) {
//       return currentState + 1;
//     }

//     it('is immutable', () => {
//       let state = 42; 
//       let nextState = increment(state);

//       expect(nextState).to.equal(43);
//       expect(state).to.equal(42);
//     })
//   })
// });
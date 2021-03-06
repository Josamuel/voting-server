import {Map, fromJS} from 'immutable';
import {expect} from 'chai'

import reducer from '../src/reducer';

describe('reducer', () => {
  it('handles SET_ENTRIES', () {
    const initialState = Map();
    const action = {type: 'SET_ENTRIES', entries: ['Trainspotting']}
    // this test confirms the action did change the state.
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      entries: ['Trainspotting']
    }))
  })

  it('handles NEXT', () => {
    const initialState = fromJS({
      entries: ['Trainspotting', '28 Days Later']
    });
    // no second argument here because next will always just pull from entries
    const action = {type: 'NEXT'};
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later']
      },
      entries: []
    }))
  })

  it('handles VOTE', () => {
    const initialState = fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later']
      },
      entires: []
    })
    // with a vote on trainspotting, we expect trainspitting to had a tally of 1 now
    const action = {type: 'VOTE', entry: 'Trainspotting'}
    const nextState = reducer(initialState, action)

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: {Trainspotting: 1}
      },
      entries: []
    }))
  })

  it('has an initial state', () => {
    const action = {type: 'SET_ENTRIES', entries: ['Trainspotting']}
    const nextState = reducer(undefiend, action);
    expect(nextState).to.equal(fromJS({
      entries: ['Trainspotting']
    }))
  })

  it('can be used with reduce', () => {
    const actions = [
      {type: 'SET_ENTRIES', entries: ['Trainspotting', '28 Days Later']},
      {type: 'NEXT'},
      {type: 'VOTE', entry: 'Trainspotting'},
      {type: 'VOTE', entry: '28 Days Later'},
      {type: 'VOTE', entry: 'Trainspotting'},
      {type: 'NEXT'}
    ]
    const finalState = actions.reduce(reducer, Map())

    expect(finalState).to.equal(fromJS({
      winner: 'Trainspotting'
    }))
  })

  
})









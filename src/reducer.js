import {setEntries, next, vote, INITIAL_STATE} from './core';


// if the reducer doesn't recognize the current action, you should
// return the state
// if a reducer is called with an undefined state, it should know how
// to initialize it to a meaningful value.  calling with an undefined state
// should work as if an empty map was passed along.  

// state will equal initial state if it is undefined.  
export default function reducer(state = INITIAL_STATE, action) {
  switch(action.type){
    case 'SET_ENTRIES':
      return setEntries(state, action.entries);
    case 'NEXT':
      return next(state);
    case 'VOTE':
    // remember update is a part of the immutable library.
      return state.update('vote',
                  voteState => vote(voteState, action.entry));
  }
  return state;
}
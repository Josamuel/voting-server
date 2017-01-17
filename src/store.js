import {createStore} from 'redux';
import reducer from './reducer';

// the store ties things together into something we'll use as the central point of our application
// it holds the current state and over time can recieve actions that evolve the state from one
// version to the next, using the core application logic we have written in the reducer.

// with redux you only need one variable, because the state is the only thing taht changes.
// everything else is constants and immutable values.  


export default function makeStore() {
  return createStore(reducer)
}
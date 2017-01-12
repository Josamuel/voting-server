import {List} from 'immutable'

export function setEntries(state, entries) {
  return state.set('entries', List(entries));
}

export function next(state) {
  // pulls the entries and puts two into vote and then everything after
  // the first two into entries.  
  const entries = state.get('entries')
                .concat(getWinners(state.get('vote')));
// We could have just returned Map({winner: entries.first()}) here. But instead 
// we still take the old state as the starting point and explicitly remove 'vote'
//  and 'entries' keys from it. The reason for this is future-proofing: At some 
//  point we might have some unrelated data in the state, and it should pass 
//  through this function unchanged. It is generally a good idea in these state 
//  transformation functions to always morph the old state into the new one 
//  instead of building the new state completely from scratch.
  if(entries.size === 1){
    return state.remove('vote')
                .remove('entries')
                .set('winner', entries.first())
  }else{}
    return state.merge({
      vote: Map({pair: entries.take(2)}),
      entries: entries.skip(2)
    })
  }
}

//updateIn returns a new Map having applied the updater to the entry
// found at keyPath,  
// updateIn(
// keyPath: Array<any>,
// notSetValue: any,
// updater: (value: any) => any
// ): Map<K, V>
// what this function is saying is reach into the nested data 
// structure path 'vote' 'tally' 'trainspotting' and apply 
// the function that adds to tally there.  If tally doesn't exist
// initalize it to 0

function getWinners(vote){
  if(!vote) return [];
  const [a, d] = vote.get('pair');
  const aVotes = vote.getIn(['tally', a], 0)
  const bVotes = vote.getIn(['tally', b], 0)
  if(aVotes > bVotes) return [a];
  else if (aVotes < bVotes) return [b];
  else return [a, b]
}


export function vote(state, entry) {
  return state.updateIn(
    ['vote', 'tally', entry],
    0,
    tally => tally + 1
  )
}
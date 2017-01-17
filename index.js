import makeStore from './src/store';
import startServer from './src/server';

// indexjs calls startServer so a server is started when the app runs.  
export const store = makeStore();
startServer(store)
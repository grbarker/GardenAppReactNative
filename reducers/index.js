import { combineReducers } from 'redux';
import auth from './auth.js';
import posts from './posts.js';
import plants from './plants.js';

const rootReducer = combineReducers({
  auth, //<--Login
  posts, //<--Posts
  plants, //<--Plants
});

export default rootReducer;

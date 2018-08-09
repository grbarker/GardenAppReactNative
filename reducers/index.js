import { combineReducers } from 'redux';
import auth from './auth.js';
import user from './user.js'
import posts from './posts.js';
import plants from './plants.js';
import userposts from './userposts.js';
import userplants from './userplants.js';

const rootReducer = combineReducers({
  auth, //<--Login
  user, //<--User
  posts, //<--Posts
  plants, //<--Plants
  userposts, //<--UserPosts
  userplants, //<--UserPlants
});

export default rootReducer;

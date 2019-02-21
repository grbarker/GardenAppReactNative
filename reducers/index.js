import { combineReducers } from 'redux';
import auth from './auth.js';
import user from './user.js'
import posts from './posts.js';
import plants from './plants.js';
import followers from './followers.js';
import followed from './followed.js';
import userposts from './userposts.js';
import userplants from './userplants.js';
import locations from './locations.js';
import usergardens from './usergardens.js';

const rootReducer = combineReducers({
  auth, //<--Login
  user, //<--User
  posts, //<--Posts
  plants, //<--Plants
  followers, //<--Followers
  followed, //<--Followed
  userposts, //<--UserPosts
  userplants, //<--UserPlants
  locations, //<--Locations
  usergardens, //<-- UserGardens
});

export default rootReducer;

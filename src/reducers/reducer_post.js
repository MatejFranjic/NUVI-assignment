import { FETCH_POSTS } from '../actions/index';
export default function(state = null, action){	
	console.log('state', state);
	console.log('action', state);
	switch(action.type){
		case FETCH_POSTS:
			console.log('inside case',action);
			return state = {
				posts: action.payload.data
			}
	}	
	return state;
}
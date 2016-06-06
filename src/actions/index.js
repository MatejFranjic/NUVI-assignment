import axios from 'axios';
export const FETCH_POSTS = 'FETCH_POSTS';
export function fetchPosts(){
	const URL = 'https://nuvi-challenge.herokuapp.com/activities';
	const request = axios.get(URL);
	return{
		type: FETCH_POSTS,
		payload: request
	}
}
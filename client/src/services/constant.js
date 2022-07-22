export const apiUrl =
	process.env.NODE_ENV !== 'production'
		? 'http://localhost:3000'
		: ''

export const NEWEST = 'newest'
export const FIND_NEWEST_POST_NUMBER = 8
export const FIND_HOME_POST_NUMBER = 5
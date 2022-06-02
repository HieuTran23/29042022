import axios from 'axios'

const setAuthToken = (refreshToken) => {
	if (refreshToken) {
		axios.defaults.headers.common['authorization'] = `Bearer ${refreshToken}`
	} else {
		delete axios.defaults.headers.common['authorization']
	}
}

export default setAuthToken
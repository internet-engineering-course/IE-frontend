import axios from "axios";

var API = axios.create({
	baseURL: "http://localhost:8080/joboonja"
});

API.interceptors.request.use((config) => {
	if (config.url === '/auth/login' || config.url === '/auth/register')
		return config;
	
	config.headers.Authorization = localStorage.getItem('token');
	return config;
});

API.interceptors.response.use(response => response, (error) => {
	if (error.response.config.url === `${error.response.config.baseURL}/auth/login`
		|| error.response.config.url === `${error.response.config.baseURL}/auth/register`){
			return Promise.reject(error);
	}
	if(error.response.status === 401 || error.response.status === 403){
			localStorage.clear;
			window.location.href = '/login';
	}
	return Promise.reject(error);
});

export default API;
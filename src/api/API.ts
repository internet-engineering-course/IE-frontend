import axios from "axios";

var API = axios.create({
	baseURL: "http://localhost:8080"
});

API.interceptors.request.use((config) => {
	if (config.url === '/auth/login' || config.url === '/auth/register'){
		return config;
	} 
	config.headers.Authorization = localStorage.getItem('token');
	return config;
});

API.interceptors.response.use(response => response, (error) => {
	if ((error.response.config.ulr ==='/auth/login' || error.response.config.ulr ==='/auth/register') &&
		 (error.response.status === 401  || error.response.status === 403))
	{
		localStorage.clear;
	   	window.location.href = '/login';
	}
	return Promise.reject(error);
});

export default API;
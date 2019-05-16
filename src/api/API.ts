import axios from "axios";

export default axios.create({
	baseURL: "http://localhost:8080"
});

(function() {
	var token = localStorage.getItem("token");
	if (token) {
		axios.defaults.headers.common['Authorization'] = localStorage.getItem("token");
	} else {
		// axios.defaults.headers.common['Authorization'] = null;
		/*if setting null does not remove `Authorization` header then try  */   
		  delete axios.defaults.headers.common['Authorization'];
		
	}
})();
import axios from "axios";

const api = axios.create({
    baseURL:'http://10.0.2.2:8080/' // baseURL:'http://10.0.2.2:8080/' -> android emulator para localhost
});

export default api;
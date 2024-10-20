import axios from "axios"

const apiBase = axios.create({
    baseURL: "http://localhost:5000/api/public-data/"
})

export default apiBase
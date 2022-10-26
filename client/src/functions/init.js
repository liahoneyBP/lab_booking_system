import axios from 'axios'

const baseURL = process.env.REACT_APP_API

// Create an axios instance
const api = axios.create({
  baseURL
})



export default api

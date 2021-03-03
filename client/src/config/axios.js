import axios from 'axios'

const exchangeratesapi = axios.create({
  baseURL: 'https://api.exchangeratesapi.io'
})

export default exchangeratesapi
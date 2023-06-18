import axios from 'axios';

export default axios.create({
  baseURL: 'http://81.200.151.236:8000/api/v1',
});
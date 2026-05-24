import axios from 'axios';

// const BASE_URL = 'http://localhost:8080/api/pad';
//Need to chnage if we want to see in online
const BASE_URL=process.env.REACT_APP_API_URL

export const checkKey = (key) =>
  axios.get(`${BASE_URL}/check/${key}`);

export const accessPad = (key, password) =>
  axios.post(`${BASE_URL}/access`, { key, password });

export const saveContent = (key, content) =>
  axios.put(`${BASE_URL}/save/${key}`, { content });

export const setLock = (key, password) =>
  axios.put(`${BASE_URL}/lock/${key}`, { password });

export const removeLock = (key, password) =>
  axios.put(`${BASE_URL}/unlock/${key}`, { password });

export const deletePad = (key, password) =>
  axios.delete(`${BASE_URL}/delete/${key}`, { data: { password } });
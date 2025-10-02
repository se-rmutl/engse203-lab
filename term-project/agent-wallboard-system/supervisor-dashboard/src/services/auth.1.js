/*
let authToken = null;

export const setToken = (token) => {
  authToken = token;
};

export const getToken = () => authToken;

export const clearToken = () => {
  authToken = null;
};

export const isAuthenticated = () => {
  return authToken !== null;
};

*/

// เปลี่ยนจาก in-memory เป็น localStorage
const TOKEN_KEY = 'supervisor_token';
const USER_KEY = 'supervisor_data';

export const setToken = (token) => {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error('Failed to save token:', error);
  }
};

export const getToken = () => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error('Failed to get token:', error);
    return null;
  }
};

export const clearToken = () => {
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  } catch (error) {
    console.error('Failed to clear token:', error);
  }
};

export const isAuthenticated = () => {
  return getToken() !== null;
};

// เพิ่ม functions สำหรับ user data
export const setSupervisorData = (data) => {
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save supervisor data:', error);
  }
};

export const getSupervisorData = () => {
  try {
    const data = localStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to get supervisor data:', error);
    return null;
  }
};

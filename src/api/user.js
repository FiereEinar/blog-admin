import { getTokenFromLocalStorage } from "@/utils/localstorage";

const BASE_URL = import.meta.env.VITE_BLOG_API_URL;
const TOKEN = getTokenFromLocalStorage();

export const postSignIn = async (data) => {
  try {
    const response = await fetch(
      `${BASE_URL}/auth/login`,
      {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();

    return result;
  } catch (error) {
    console.error('Error user sign in:', error);
    throw new Error('Failed to sign in.');
  }
};

export const postSignUp = async (data) => {
  try {
    const response = await fetch(
      `${BASE_URL}/auth/signup`,
      {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );

    return response;
  } catch (error) {
    console.error('Error signing up:', error);
    throw new Error('Failed to sign up.');
  }
};

export const getUserById = async (userId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/user/${userId}`,
      {
        mode: 'cors',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: TOKEN
        },
      }
    );

    const result = await response.json();

    return result.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error('Failed to fetch user.');
  }
};

export const updateUserById = async (data, userId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/user/${userId}`,
      {
        mode: 'cors',
        method: 'PUT',
        headers: {
          // 'Content-Type': 'application/json',
          // 'Content-Type': 'multipart/form-data',
          Authorization: TOKEN
        },
        body: data
        // body: JSON.stringify(data)
      }
    );

    return response

  } catch (error) {
    console.error('Error updating user:', error);
    throw new Error('Failed to update user.');
  }
};

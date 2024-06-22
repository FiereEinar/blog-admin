import { getTokenFromLocalStorage } from '@/utils/localstorage';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BLOG_API_URL;

export const fetchTopics = async () => {
  const { data } = await axios.get(`${BASE_URL}/topic`);

  return data.data;
};

export const addTopic = async (formData) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/topic`, formData, {
      headers: {
        Authorization: getTokenFromLocalStorage()
      }
    });

    return data;
  } catch (err) {
    console.error('Error adding topic.', err);
    throw new Error('Failed to adding the topic.');
  }
}

export const deleteTopic = async (topicId) => {
  try {
    const { data } = await axios.delete(`${BASE_URL}/topic/${topicId}`, {
      headers: {
        Authorization: getTokenFromLocalStorage()
      }
    });

    return data;
  } catch (err) {
    console.error('Error adding topic.', err);
    throw new Error('Failed to adding the topic.');
  }
}
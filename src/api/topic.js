import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BLOG_API_URL;

export const fetchTopics = async () => {
  const { data } = await axios.get(`${BASE_URL}/topic`);

  return data.data;
};

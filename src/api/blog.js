import { getTokenFromLocalStorage } from "@/utils/localstorage";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BLOG_API_URL;

export const fetchBlogs = async () => {
  const { data } = await axios.get(`${BASE_URL}/blog`)
  return data.data;
};

// UNUSED
export const fetchBlogById = async (blogId) => {
  const { data } = await axios.get(`${BASE_URL}/blog/${blogId}`)

  return data.data;
};

// UNUSED
export const fetchBlogByTopicId = async (topicId) => {
  const { data } = await axios.get(`${BASE_URL}/topic/${topicId}`);

  return data.data;
};

export const addBlog = async (formData) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/blog`, formData, {
      headers: {
        Authorization: getTokenFromLocalStorage()
      }
    });

    return data;
  } catch (err) {
    console.error('Error updating blog.', err);
    throw new Error('Failed to update the blog.');
  }
}

export const updateBlog = async (blogId, formData) => {
  try {
    const { data } = await axios.put(`${BASE_URL}/blog/${blogId}`, formData, {
      headers: {
        Authorization: getTokenFromLocalStorage()
      }
    });

    return data;
  } catch (err) {
    console.error('Error updating blog.', err);
    throw new Error('Failed to update the blog.');
  }
};

export const deleteBlog = async (blogId) => {
  try {
    const { data } = await axios.delete(`${BASE_URL}/blog/${blogId}`, {
      headers: {
        Authorization: getTokenFromLocalStorage()
      }
    });

    return data;
  } catch (err) {
    console.error('Error deleting blog.', err);
    throw new Error('Failed to deleting the blog.');
  }
};
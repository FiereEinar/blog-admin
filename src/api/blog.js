import { getTokenFromLocalStorage } from "@/utils/localstorage";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BLOG_API_URL;
const TOKEN = getTokenFromLocalStorage();

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

export const updateBlog = async (blogId, formData) => {
  try {
    // const response = await fetch(
    //   `${BASE_URL}/blog/${blogId}`,
    //   {
    //     mode: 'cors',
    //     method: 'PUT',
    //     headers: {
    //       // 'Content-Type': 'application/json',
    //       // 'Content-Type': 'multipart/form-data',
    //       Authorization: TOKEN
    //     },
    //     body: formData
    //     // body: JSON.stringify(data)
    //   }
    // );
    // const result = await response.json();

    // return result
    const { data } = await axios.put(`${BASE_URL}/blog/${blogId}`, formData, {
      headers: {
        Authorization: TOKEN
      }
    });

    return data;
  } catch (err) {
    console.error('Error updating blog.', err);
    throw new Error('Failed to update the blog.');
  }
};

import axios from "axios";
import type { Post, User, Comment } from "../types/types";

const API_BASE = "https://jsonplaceholder.typicode.com";

export async function fetchPosts(): Promise<Post[]> {
  const res = await axios.get<Post[]>(`${API_BASE}/posts`);
  return res.data;
}

export async function fetchPostById(id: number): Promise<Post> {
  const res = await axios.get<Post>(`${API_BASE}/posts/${id}`);
  return res.data;
}

export async function fetchUserById(id: number): Promise<User> {
  const res = await axios.get<User>(`${API_BASE}/users/${id}`);
  return res.data;
}

export async function fetchCommentsForPost(postId: number): Promise<Comment[]> {
  const res = await axios.get<Comment[]>(`${API_BASE}/posts/${postId}/comments`);
  return res.data;
}

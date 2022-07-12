import axios from 'axios'
const postUrl='http://localhost:5000/posts'
const userUrl='http://localhost:5000/users'

export const fetchPost=()=>axios.get(postUrl);
export const fetchUser=()=>axios.get(userUrl);
// export const createUser=()=>


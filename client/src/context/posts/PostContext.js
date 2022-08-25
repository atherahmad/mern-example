import {createContext, useReducer} from "react";
import * as api from "../../api/index"
import postReducer, { postState } from "./postReducer";


export const PostContext = createContext(postState);

export const PostProvider = ({children}) =>{

    const [state, dispatch] = useReducer(postReducer, postState);



    const getPosts = async () => {
        console.log("get Posts called")
      try {
        const { data } = await api.fetchPosts();
    
        dispatch({ type: "FETCH_ALL_POSTS", payload: data });
      } catch (err) {
        console.log(err.message);
      }
    };
    
    const createPost = async (post) =>   {
      try {
        const { data } = await api.createPost(post);
        dispatch({ type: "CREATE_POST", payload: data });

      } catch (error) {
        console.log(error);
      }
    };
    
    const updatePost = async(id, post) => {
      try {
        const { data } = await api.updatePost(id, post);
    
        dispatch({ type: "UPDATE_POST", payload: data });
      } catch (error) {
        console.log(error.message);
      }
    };
    const deletePost = async (id) => {
      try {
        await api.deletePost(id);
    
        dispatch({ type: "DELETE_POST", payload: id });
      } catch (error) {
        console.log(error);
      }
    };
    const likePost =async (id) => {
      try {
        const { data } = await api.likePost(id);
    
        dispatch({ type: "UPDATE_POST", payload: data });
      } catch (error) {
        console.log(error);
      }
    };

    const value ={
        getPosts,
        createPost,
        updatePost,
        deletePost,
        likePost, 
        posts: state
    }

    return <PostContext.Provider value={value}>{children}</PostContext.Provider>
}

import {createContext, useReducer} from "react";
import * as api from "../../api/index"
import storyReducer, { storyState } from "./storyReducer";


export const StoryContext = createContext(storyState);

export const StoryProvider = ({children}) =>{

    const [state, dispatch] = useReducer(storyReducer, storyState);


    const getStories = async () => {
        console.log("get stories called")
      try {
        const { data } = await api.fetchStories();
    
        dispatch({ type: "FETCH_ALL_STORIES", payload: data });
      } catch (err) {
        console.log(err.message);
      }
    };
    
    const createStory = async (story) =>   {
      try {
        const { data } = await api.createStory(story);
        dispatch({ type: "CREATE_STORY", payload: data });

      } catch (error) {
        console.log(error);
      }
    };
    
    const updateStory = async(id, story) => {
      try {
        const { data } = await api.updateStory(id, story);
    
        dispatch({ type: "UPDATE_STORY", payload: data });
      } catch (error) {
        console.log(error.message);
      }
    };
    const deleteStory = async (id) => {
      try {
        await api.deleteStory(id);
    
        dispatch({ type: "DELETE_STORY", payload: id });
      } catch (error) {
        console.log(error);
      }
    };
    const likeStory =async (id) => {
      try {
        const { data } = await api.likeStory(id);
    
        dispatch({ type: "UPDATE_STORY", payload: data });
      } catch (error) {
        console.log(error);
      }
    };

    const value ={
        getStories,
        createStory,
        updateStory,
        deleteStory,
        likeStory, 
        stories: state
    }

    return <StoryContext.Provider value={value}>{children}</StoryContext.Provider>
}

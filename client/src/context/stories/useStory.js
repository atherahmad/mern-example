import { useContext } from "react"
import { StoryContext } from "./storyContext"

const useStory = () =>{
    const context = useContext(StoryContext)
    return context
}

export default useStory;
import { useContext } from "react"
import { PostContext } from "./PostContext"

const usePost = () =>{
    const context = useContext(PostContext)
    return context
}

export default usePost;
import React, { useEffect } from 'react'
import Post from './Post/Post'
import useStyles from './styles'

import { Grid, CircularProgress } from '@material-ui/core'
import usePost from '../../context/posts/usePost'
import useAuth from '../../context/auth/useAuth'


const Posts = ({ setCurrentId }) => {

   const {isAuthenticated} = useAuth()
   const {posts, getPosts} = usePost();
   
   console.log(posts, "in post")

   useEffect(()=>{
      if(isAuthenticated) getPosts()
   })
   const classes = useStyles()
   
   
   return (
      !posts.length ? <CircularProgress /> :
         <Grid className={classes.container} container alignItems="stretch" spacing={3}>
            {posts.map(post => (
               <Grid key={post._id} item xs={12} sm={6}>
                  <Post post={post} setCurrentId={setCurrentId} />
               </Grid>
            ))

            }
         </Grid>
   );
}

export default Posts;
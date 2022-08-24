import Post from '../models/Post.js';
import mongoose from 'mongoose';

export const getPosts =async (req, res) => {
    try {
       const postMessages = await Post.find();
       res.status(200).json(postMessages);
    } catch (err) {
       res.status(404).json({ message: err.message });
    }
}

//addPost, editPost, removePost

export const addPost = async (req, res) => {
  
   const { title, message, name, tags } = req.body;
   try {
      const newPost = await Post.create({
         title,
         message,
         name,
         creator: req.user.username,
         tags: tags.split(' ')
      });
      res.status(201).json(newPost);
   } catch (err) {
      res.status(409).json({message:err.message});
   }


}

export const editPost =async (req, res) => {
   const { id : _id } = req.params; // identify the post
   const update = req.body; // apply these changes
   // validate the object id
   if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id !!!');

   // find and update
   try {
      // const updatedPost = await Post.findByIdAndUpdate(_id, post, { new: true });
      const post = await Post.findById(_id);
      // is the logged in user editing his post or not ?
      if (post.creator === req.user.username) {
         const updatedPost = await Post.findByIdAndUpdate(_id, update, { new: true });
          res.status(200).json(updatedPost);
      } else {
          res.status(203).json({ message: "not authorised" });
      }
    
   } catch (err) {
      res.status(400).json({ message: err.message });
   }
}

export const removePost =async (req, res) => {
   const { id } = req.params;
   if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');
   try {
      await Post.findByIdAndDelete(id);
      res.status(200).json({ message: "post has been removed " });
   } catch (err) {
      res.status(400).json({ message: err.message });
   }
}

export const likePost = async (req, res) =>  {
   const { id } = req.params;
   if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');
   try {
      const post = await Post.findById(id); // id of the post
    
      // check if the  logged in user did not like this post before
      const index = post.likes.findIndex((userID) => userID === String(req.user.id));
      if (index === -1) {
         post.likes.push(req.user.id);
      } else {
          post.likes =  post.likes.filter((userID) => userID !== String(req.user.id))
      }
      const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });
      res.status(200).json(updatedPost);
   } catch (err) {
      res.status(400).json({ message: err.message });
   }
}


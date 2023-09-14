import React, { useState } from 'react';
import CreatePost from './CreatePost';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  const handlePostSubmit = (content) => {
    const newPost = {
      id: Date.now(),
      content: content,
      likes: 0,
    };

    setPosts([newPost, ...posts]); // Agregar el nuevo post al principio de la lista
  };

  const handleLike = (postId) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    );

    setPosts(updatedPosts);
  };

  return (
    <div>
      <CreatePost onPostSubmit={handlePostSubmit} />
      {posts.map((post) => (
        <div key={post.id} className="bg-gray-100 text-gray-800 p-4 mb-4 shadow-md rounded-lg">
          <p>{post.content}</p>
          <button
            onClick={() => handleLike(post.id)}
            className="px-2 py-1 mt-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
          >
            Like ({post.likes})
          </button>
        </div>
      ))}
    </div>
  );
};

export default PostList;

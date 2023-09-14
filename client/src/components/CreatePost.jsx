import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/authContext';

const CreatePost = ({ onPostSubmit }) => {
  const [postContent, setPostContent] = useState('');
  const textareaRef = useRef(null);

  const handlePostContentChange = (e) => {
    const content = e.target.value;
    if (content.length <= 4000) {
      setPostContent(content);
    }
  };

  useEffect(() => {
    // Ajustar automáticamente la altura del textarea al contenido
    if (textareaRef.current) {
      textareaRef.current.style.height = '1em';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [postContent]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onPostSubmit(postContent);
    setPostContent('');
  };

  const { isAuthenticated, user } = useAuth();

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-orange-400">Create a New Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          ref={textareaRef}
          value={postContent}
          onChange={handlePostContentChange}
          placeholder={`What's on your mind ${isAuthenticated ? user.username : ''}?`}
          rows="3"
          className="w-full p-1 rounded-md border focus:outline-none focus:ring resize-none overflow-hidden text-gray-800 bg-gray-100 placeholder-gray-500"
          maxLength={5000}
          style={{
            height: `calc(2em + ${postContent.split('\n').length - 1}em)`,
          }}
        />
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
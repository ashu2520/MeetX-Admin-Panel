import React from 'react';
import PostsCard from './PostsCard';

const PostsTab = ({ posts }) => {
  return (
    <>
      <div className="mt-10 bg-white w-full border overflow-y-visible tab grid grid-cols-4 gap-2 p-2">
        {posts.map((post, index) => (
          <PostsCard
            key={index}
            imgSrc={post.img}
            caption={post.caption}
            date={post.date}
            likes={post.likes}
            comments={post.comments}
            shares={post.shares}
            tags={post.tags}
          />
        ))}
      </div>
    </>
  );
};

export default PostsTab;

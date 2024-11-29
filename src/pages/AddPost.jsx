import React from 'react';
import { Container, PostForm } from '../components';

function AddPost() {
  return (
    <div className="flex flex-1">
      <Container className="flex">
        <PostForm />
      </Container>
    </div>
  );
}

export default AddPost;

import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../components";
import storageService from "../services/storage";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

function EditPost() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      storageService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);
  return post ? (
    <div className="">
      <Helmet>
        <title>Edit {post.title} - Bloggy</title>
      </Helmet>
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;

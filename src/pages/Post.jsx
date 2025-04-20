import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import storageService from "../services/storage";
import { Spinner, Button, Container, LikesContainer } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";

export default function Post() {
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const [postLiked, setPostLiked] = useState(false);
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userID === userData.$id : false;

  useEffect(() => {
    setLoading(true);
    if (slug) {
      storageService.getPost(slug, userData?.$id || null).then((post) => {
        if (post) {
          setPost(post);
        } else {
          toast.error("Post not found!");
          navigate("/", { replace: true });
        }
        setPostLiked((post?.liked && true) || false);
      });
    } else {
      toast.error("Post not found!");
      navigate("/", { replace: true });
    }
    setLoading(false);
  }, [slug, navigate]);

  const deletePost = () => {
    setLoading(true);
    storageService.deletePost(post.$id).then((status) => {
      if (status) {
        storageService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
    setLoading(false);
  };

  return (
    <div className="flex flex-1 w-full">
      <Helmet>
        <title>{post?.title || "Post"} - Bloggy</title>
      </Helmet>
      {post && !loading ? (
        <Container>
          <div className="w-full h-full flex flex-col justify-center items-center">
            <div className="flex-1 p-6 w-full max-w-[70rem] bg-bkg-primary md:bg-bkg-primary/60 md:backdrop-blur-md flex flex-col justify-center flex-wrap">
              <div className="w-full mb-6 flex justify-center items-center relative border border-bkg-secondary rounded-xl p-2">
                <img
                  src={storageService.getFilePreview(post.featuredImage)}
                  alt={post.title}
                  className="max-h-[30rem] max-w-full rounded-xl"
                />

                {isAuthor && (
                  <div className="absolute flex flex-col right-6 top-6">
                    <Link to={`/posts/edit/${post.$id}`}>
                      <Button
                        circle
                        bgColor="bg-text-secondary"
                        textColor="text-bkg-primary"
                        className="mb-4 px-4"
                      >
                        <FontAwesomeIcon icon={faPen} />
                      </Button>
                    </Link>
                    <Button
                      circle
                      bgColor="bg-red-500"
                      textColor="text-white"
                      onClick={deletePost}
                      className="mb-4 px-4"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </div>
                )}
              </div>
              <div className="w-full mb-6">
                <div className="w-full mb-4">
                  <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="h-[1px] mb-2 mt-2 bg-bkg-secondary" />
                <div className="flex">
                  <LikesContainer
                    likesCount={post.likes}
                    postID={post.$id}
                    liked={postLiked}
                    setPostLiked={setPostLiked}
                  />
                </div>
                <div className="h-[1px] mb-2 mt-2 bg-bkg-secondary" />
                <div className="browser-css break-words">
                  {parse(post.content)}
                </div>
              </div>
            </div>
          </div>
        </Container>
      ) : (
        <div className="flex flex-1 w-full min-h-[calc(100vh-5.5rem)]">
          <Spinner />
        </div>
      )}
    </div>
  );
}

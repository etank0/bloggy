import React, { useState, useEffect } from "react";
import { Spinner, Container, PostCard } from "../components";
import storageService from "../services/storage";
import { useSelector } from "react-redux";
import { Query } from "appwrite";

function MyPosts() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const userData = useSelector((state) => state.auth.userData);
  useEffect(() => {
    setLoading(true);
    storageService
      .getPosts(userData?.$id, [Query.equal("userID", userData?.$id)])
      .then((posts) => {
        if (posts) {
          setPosts(posts);
        }
        setLoading(false);
      });
  }, []);
  return (
    <div className="w-full">
      {loading ? (
        <div className="flex flex-1 w-full min-h-[calc(100vh-5.5rem)]">
          <Spinner />
        </div>
      ) : (
        <Container className="px-4">
          <div className="flex flex-wrap min-h-[calc(100vh-5.5rem)] justify-center md:justify-normal">
            {posts.map((post) => (
              <div
                key={post.$id}
                className="p-2 w-full max-w-[30rem] md:w-1/2 lg:w-1/3 xl:w-1/4"
              >
                <PostCard {...post} showStatus />
              </div>
            ))}
          </div>
        </Container>
      )}
    </div>
  );
}

export default MyPosts;

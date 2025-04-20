import React, { useEffect, useState } from "react";
import storageService from "../services/storage";
import { Container, PostCard, Spinner, ShowLikedToggle } from "../components";
import { useSelector } from "react-redux";

function Home() {
  const [loading, setLoading] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  const [posts, setPosts] = useState([]);
  const [isToggled, setIsToggled] = useState(false);

  useEffect(() => {
    setLoading(true);
    storageService.getPosts(userData?.$id || null).then((posts) => {
      if (posts) {
        if (isToggled) {
          posts = posts.filter((post) => post.liked);
        }
        setPosts(posts);
      }
      setLoading(false);
    });
  }, [isToggled]);

  const handleIsToggled = () => {
    setIsToggled((prev) => !prev);
  };

  return (
    <div className="w-full">
      {authStatus && (
        <ShowLikedToggle
          isToggled={isToggled}
          handleIsToggled={handleIsToggled}
        />
      )}
      {loading ? (
        <div className="flex flex-1 w-full min-h-[calc(100vh-5.5rem)]">
          <Spinner />
        </div>
      ) : (
        <Container className="px-4">
          <div className="flex min-h-[calc(100vh-5.5rem)] flex-wrap justify-center md:justify-normal">
            {posts.map((post) => (
              <div
                key={post.$id}
                className="p-2 w-full w-9/10 max-w-[30rem] md:w-1/2 lg:w-1/3 xl:w-1/4"
              >
                <PostCard {...post} isToggled={isToggled} />
              </div>
            ))}
          </div>
        </Container>
      )}
    </div>
  );
}

export default Home;

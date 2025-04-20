import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import storageService from "../services/storage";
import toast from "react-hot-toast";

function LikesContainer({ likesCount, postID, liked, setPostLiked }) {
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  const [isLiked, setIsLiked] = useState(liked != false);
  const [likes, setLikes] = useState(likesCount);

  const handleLike = async () => {
    if (!authStatus) {
      notify();
      return;
    }

    try {
      setIsLiked((prev) => !prev);
      setLikes(isLiked ? likes - 1 : likes + 1);
      setPostLiked(!isLiked);

      if (!isLiked) {
        await storageService.addLike({ postID, userID: userData.$id });
      } else {
        await storageService.removeLike({ postID, userID: userData.$id });
      }
    } catch (error) {
      console.error("Error liking post: ", error);
      setPostLiked(isLiked);
      setIsLiked((prev) => !prev);
      setLikes(isLiked ? likes + 1 : likes - 1);
    }
  };

  const notify = () => {
    toast.error("Login is required to like a post!");
  };

  return (
    <div className="flex">
      <button
        type="button"
        className={`text-2xl font-semibold ${
          isLiked ? "text-[#ff3c3c]" : "text-text-primary"
        } bg-none`}
        onClick={handleLike}
      >
        <FontAwesomeIcon icon={isLiked ? faHeartSolid : faHeartRegular} />
      </button>
      <h4 className="text-sm p-2">{likes}</h4>
    </div>
  );
}

export default LikesContainer;

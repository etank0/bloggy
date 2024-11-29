import React, { useEffect, useState } from 'react';
import storageService from '../../services/storage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { LikesContainer } from '../../components';

function PostCard({
  $id,
  title,
  featuredImage,
  userEmail,
  userName,
  likes,
  liked,
  status,
  showStatus,
  isToggled
}) {
  const navigate = useNavigate();
  const [postLiked, setPostLiked] = useState((liked && true) || false);
  const navigateToPost = () => {
    navigate(`/post/${$id}`);
  };

  useEffect(() => {
  }, [postLiked, isToggled]);

  if (isToggled && !postLiked) {
    return <></>
  }

  return (
    <div className="w-full bg-bkg-secondary md:bg-bkg-secondary/40 md:backdrop-blur-md rounded-xl p-4">
      <div className="w-full cursor-pointer" onClick={navigateToPost}>
        {showStatus && (
          <div className="w-full mb-2 flex justify-start items-center">
            <span
              className={`text-gray-900 px-3 py-1 rounded-2xl text-sm font-medium ${
                status === 'active' ? 'bg-green-300' : 'bg-red-300'
              }`}
            >
              {status}
            </span>
          </div>
        )}
        <div className="w-full justify-center mb-4">
          <img
            src={storageService.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-xl w-full h-64 object-cover"
          />
        </div>
        <h2 className="text-xl font-bold line-clamp-2 h-14">{title}</h2>
        <h3 className="text-md text-text-secondary font-semibold">
          {userName}
        </h3>
        <div className="flex text-sm">
          <div className="mr-2">
            <FontAwesomeIcon icon={faEnvelope} />
          </div>
          <h4 className="font-medium"> {userEmail} </h4>
        </div>
      </div>
      <div className="flex text-xl font-semibold mt-2">
        <LikesContainer likesCount={likes} postID={$id} liked={postLiked} setPostLiked={setPostLiked}/>
      </div>
    </div>
  );
}

export default PostCard;

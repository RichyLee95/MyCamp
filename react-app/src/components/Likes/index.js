import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserLikes, thunkAddLike, thunkRemoveLike } from '../../store/like'; 
import { fetchAllReviews } from '../../store/review';
import LikeButton from "./LikeButton"

const Like = ({ review }) => {
  const dispatch = useDispatch();
  const userLikes = useSelector((state) => state.likes.userLikes);
  const reviewLikes = useSelector((state) => state.likes.reviewLikes);
  const loggedInUserId = useSelector((state) => state.session.user && state.session.user.id);
    // const likeId = 
    const like = userLikes.find((like) => like.review_id === review.id);
  const likeId = like ? like.id : null;
//     let originLikeId = null
//     review.likes?.forEach(like => {
//         if (like.user_id === loggedInUserId) {
//             originLikeId = like.id
//         }
//     })
//   const [likeId, setLikeId] = useState(
//     originLikeId);

    const userLiked = () => {
        return userLikes.some((like) => like.review_id === review.id);
    };
  // Check if the user has already liked the review
//   useEffect(() => {
//     const alreadyLiked = userLikes.some((like) => like.review_id === reviewId);
//     setLiked(alreadyLiked);
//   }, [userLikes, reviewId]);

  const handleLikeClick = async () => {
      if (likeId) {
        // Unlike the review
        await dispatch(thunkRemoveLike(likeId));
        if(loggedInUserId){await dispatch(fetchUserLikes(loggedInUserId))}
        await dispatch(fetchAllReviews())
      } else {
        // Like the review
        const data = await dispatch(thunkAddLike(review.id));
            // setLikeId(data.id)
        await dispatch(fetchUserLikes(loggedInUserId))
        await dispatch(fetchAllReviews())
      }
  };

  return (
    <div>
    {loggedInUserId && (
                <div className="likes-container">
                    <LikeButton isLiked={userLiked()} onLike={handleLikeClick} />
                </div>
            )}
    </div>
  );
};
export default Like
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviewLikes, fetchUserLikes, thunkAddLike, thunkRemoveLike } from '../../store/like'; 
import { fetchAllReviews } from '../../store/review';
import LikeButton from "./LikeButton"
import { checkReviewIsLiked } from '../../store/like';
import './index.css'
const Like = ({ review }) => {
  const dispatch = useDispatch();
  const userLikes = useSelector((state) => state.likes.userLikes);
  const reviewLikes = useSelector((state) => state.likes.reviewLikes);
  const loggedInUserId = useSelector((state) => state.session.user && state.session.user.id);
    // const likeId = 
    const [isLiked, setIsLiked] = useState('');
    const like = userLikes.find((like) => like.review_id === review.id);
  const likeId = like ? like.id : null;
  const [error, setError] = useState(null);
//     let originLikeId = null
//     review.likes?.forEach(like => {
//         if (like.user_id === loggedInUserId) {
//             originLikeId = like.id
//         }
//     })
//   const [likeId, setLikeId] = useState(
//     originLikeId);

    // const userLiked = () => {
    //     return userLikes.some((like) => like.review_id === review.id);
    // };
  // Check if the user has already liked the review
//   useEffect(() => {
//     const alreadyLiked = userLikes.some((like) => like.review_id === reviewId);
//     setLiked(alreadyLiked);
//   }, [userLikes, reviewId]);

  const handleLikeClick = async (e) => {
    e.preventDefault()
      if (isLiked) {
        // Unlike the review
        await dispatch(thunkRemoveLike(likeId));
        if(loggedInUserId){await dispatch(fetchUserLikes(loggedInUserId))}
        await dispatch(fetchAllReviews())
        setIsLiked(false);
      } else {
        // Like the review
        const data = await dispatch(thunkAddLike(review.id));
            // setLikeId(data.id)
        await dispatch(fetchUserLikes(loggedInUserId))
        await dispatch(fetchAllReviews())
        setIsLiked(true);
      }
  };
useEffect(() =>{
  const checkIsReviewLiked = async () => {
    try{
      if (loggedInUserId) {
        const response = await fetch(`/api/likes/review-is-liked/${review.id}`);
        const data = await response.json();

        if (response.ok) {
          setIsLiked(data.review_is_liked); // Update isLiked based on the API response
        } else {
          throw new Error("Failed to check if review is liked");
        }
      }
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  checkIsReviewLiked();
}, [dispatch, loggedInUserId, review.id]);
  return (
    <div>
    {loggedInUserId && (
                <div className='reviewlike-icon'>
                <i className={`fa fa-heart ${isLiked ? "active" : ""}`}
                    onClick={handleLikeClick}>
                </i>
            </div>
            )}
    </div>
  );
};
export default Like
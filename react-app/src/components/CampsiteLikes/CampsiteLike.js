import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCampsiteLikes, fetchUserCampsiteLikes, thunkAddCampsiteLike, thunkRemoveLike } from '../../store/campsitelike'; 
import { fetchSingleCampsite } from '../../store/campsite';
import CampsiteLikeButton from "./CampsiteLikeButton"

const CampsiteLike = ({ campsite }) => {
  const dispatch = useDispatch();
  const userCampsiteLikes = useSelector((state) => state.campsitelikes.userCampsiteLikes);
  const reviewLikes = useSelector((state) => state.likes.reviewLikes);
  const loggedInUserId = useSelector((state) => state.session.user && state.session.user.id);
    // const likeId = 
    const campsitelike = userCampsiteLikes.find((campsitelike) => campsitelike.campsite_id === campsite.id);
  const campsitelikeId = campsitelike ? campsitelike.id : null;
  const userLiked = () => {
    return userCampsiteLikes.find((campsitelike) => campsitelike.campsite_id === campsite.id);
};
const handleLikeClick = async () => {
    if (campsitelikeId) {
      // Unlike the review
      await dispatch(thunkRemoveLike(campsitelikeId));
      if(loggedInUserId){await dispatch(fetchUserCampsiteLikes(loggedInUserId))}
      await dispatch (fetchCampsiteLikes(campsite.id))
      await dispatch(fetchSingleCampsite(campsite.id))
    } else {
      // Like the review
      const data = await dispatch(thunkAddCampsiteLike(campsite.id));
          // setLikeId(data.id)
      await dispatch(fetchUserCampsiteLikes(loggedInUserId))
      await dispatch (fetchCampsiteLikes(campsite.id))
      await dispatch(fetchSingleCampsite(campsite.id))
    }
};

return (
  <div>
  {loggedInUserId && (
              <div className="campsitelikes-container">
                  <CampsiteLikeButton isLiked={userLiked()} onLike={handleLikeClick} />
              </div>
          )}
  </div>
);
};
export default CampsiteLike
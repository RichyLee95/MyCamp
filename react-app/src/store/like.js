const GET_REVIEW_LIKES = "likes/GET_REVIEW_LIKES";
const GET_USER_LIKES = "likes/GET_USER_LIKES";
const ADD_LIKE = "likes/ADD_LIKE";
const REMOVE_LIKE = "likes/REMOVE_LIKE";
const SET_REVIEW_LIKED = "likes/SET_REVIEW_LIKED"
// Action Creators
const getReviewLikes = (likes) => ({
  type: GET_REVIEW_LIKES,
  likes,
});

const getUserLikes = (likes) => ({
  type: GET_USER_LIKES,
  likes,
});

const addLike = (like) => ({
  type: ADD_LIKE,
  like,
});

const setReviewIsLiked = (reviewId, isLiked) => ({
  type: SET_REVIEW_LIKED,
  payload: { reviewId, isLiked },
});

const removeLike = (likeId) => ({
  type: REMOVE_LIKE,
  likeId,
});

export const fetchReviewLikes = (reviewId) => async (dispatch) => {
    
    const response = await fetch(`/api/likes/${reviewId}`);
    if (response.ok) {
        const { likes } = await response.json();
        dispatch(getReviewLikes(likes));
    } else {
        throw new Error('Failed to fetch review likes.');
    }
};

export const fetchUserLikes = (userId) => async (dispatch) => {
  const response = await fetch(`/api/likes/users/${userId}`);
  if (response.ok) {
      const { likes } = await response.json();
      dispatch(getUserLikes(likes));
  } else {
      throw new Error('Failed to fetch user likes.');
  }
};

export const checkReviewIsLiked = (reviewId) => async (dispatch) => {
  try {
    // console.log('campsiteid before', campsiteId)
    const response = await fetch(`/api/likes/review-is-liked/${reviewId}`);
    // console.log('campsiteid after', campsiteId)
    const data = await response.json();
    dispatch(setReviewIsLiked(reviewId, data.is_liked));
    if (!response.ok) {
      throw new Error("Failed to check if review is liked");
    }
    return data.is_liked;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const thunkAddLike = (reviewId) => async (dispatch) => {
    const response = await fetch(`/api/likes/${reviewId}/likes`, { method: "POST" });
    if (response.ok) {
        const like = await response.json();
        dispatch(addLike(like));
        return like
    } else {
        throw new Error('Failed to add like.');
    }
};

export const thunkRemoveLike = (likeId) => async (dispatch) => {
    const response = await fetch(`/api/likes/${likeId}`, { method: "DELETE" });
    if (response.ok) {
        dispatch(removeLike(likeId));
    } else {
        throw new Error('Failed to remove like.');
    }
};
  const initialState = {
    reviewLikes: [],
    userLikes: [],
  };

  export default function likesReducer(state = initialState, action) {
    switch (action.type) {
      case GET_REVIEW_LIKES:
        return {
            ...state,
            reviewLikes: action.likes
        };
      case GET_USER_LIKES:
        return {
            ...state,
            userLikes: action.likes };
      case ADD_LIKE:
        return {
          ...state,
          reviewLikes: [...state.reviewLikes, action.like],
          userLikes: [...state.userLikes, action.like],
        };
      case REMOVE_LIKE:
        return {
          ...state,
          reviewLikes: state.reviewLikes.filter((like) => like.id !== action.likeId),
          userLikes: state.userLikes.filter((like) => like.id !== action.likeId),
        };
      default:
        return state;
    }
  }
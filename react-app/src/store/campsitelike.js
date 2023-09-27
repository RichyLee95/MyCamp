const GET_CAMPSITE_LIKES = "campsitelikes/GET_CAMPSITE_LIKES";
const GET_USER_CAMPSITELIKES = "campsitelikes/GET_USER_CAMPSITELIKES";
const ADD_CAMPSITELIKE = "campsitelikes/ADD_CAMPSITELIKE";
const REMOVE_CAMPSITELIKE = "campsitelikes/REMOVE_CAMPSITELIKE";
const SET_LIKED = "campsitelikes/SET_LIKED"
// Action Creators
const getCampsiteLikes = (campsitelikes) => ({
  type: GET_CAMPSITE_LIKES,
  campsitelikes,
});

const getUserCampsiteLikes = (campsitelikes) => ({
  type: GET_USER_CAMPSITELIKES,
  campsitelikes,
});

const addLike = (campsitelike) => ({
  type: ADD_CAMPSITELIKE,
  campsitelike,
});

const setIsLiked = (campsiteId, isLiked) => ({
  type: SET_LIKED,
  payload: { campsiteId, isLiked },
});

const removeLike = (campsitelikeId) => ({
  type: REMOVE_CAMPSITELIKE,
  campsitelikeId,
});

export const fetchCampsiteLikes = (campsiteId) => async (dispatch) => {

  const response = await fetch(`/api/campsitelikes/${campsiteId}`);
  if (response.ok) {
    const { campsitelikes } = await response.json();
    dispatch(getCampsiteLikes(campsitelikes));
  } else {
    throw new Error('Failed to fetch campsite likes.');
  }
};

export const fetchUserCampsiteLikes = (userId) => async (dispatch) => {
  const response = await fetch(`/api/campsitelikes/users/${userId}`);
  if (response.ok) {
    const { campsitelikes } = await response.json();
    dispatch(getUserCampsiteLikes(campsitelikes));
  } else {
    throw new Error('Failed to fetch user likes.');
  }
};
export const thunkAddCampsiteLike = (campsiteId) => async (dispatch) => {
  const response = await fetch(`/api/campsitelikes/${campsiteId}/campsitelikes`, { method: "POST" });
  if (response.ok) {
    const campsitelike = await response.json();
    dispatch(addLike(campsitelike));
    console.log('campsite like', campsitelike)
    return campsitelike
  } else {
    throw new Error('Failed to add like.');
  }
};

export const checkIsLiked = (campsiteId) => async (dispatch) => {
  try {
    // console.log('campsiteid before', campsiteId)
    const response = await fetch(`/api/campsitelikes/is-liked/${campsiteId}`);
    // console.log('campsiteid after', campsiteId)
    const data = await response.json();
    dispatch(setIsLiked(campsiteId, data.is_liked));
    if (!response.ok) {
      throw new Error("Failed to check if campsite is liked");
    }
    return data.is_liked;
  } catch (error) {
    console.error(error);
    return false;
  }
};
// export const removeProductFromFavorites = (productId) => async (dispatch) => {
//   const response = await fetch(`/api/favorites/${productId}`, {
//       method: "DELETE",
//       headers: {
//           "Content-Type": "application/json",
//       },
//   });
//   if (response.ok) {
//       dispatch(removeFavorite(productId));
//   } else {
//       const data = await response.json();
//       console.error("Error removing from favorites:", data.message);
//   }
// };
export const thunkRemoveLike = (campsiteId) => async (dispatch) => {
  const response = await fetch(`/api/campsitelikes/${campsiteId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    dispatch(removeLike(campsiteId));
  } else {
    throw new Error('Failed to remove like.');
  }
};
const initialState = {
  campsiteLikes: [],
  userCampsiteLikes: [],
};

export default function campsiteLikesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CAMPSITE_LIKES:
      return {
        ...state,
        campsiteLikes: action.campsitelikes
      };
    case GET_USER_CAMPSITELIKES:
      return {
        ...state,
        userCampsiteLikes: action.campsitelikes
      };
    case ADD_CAMPSITELIKE:
      return {
        ...state,
        campsiteLikes: [...state.campsiteLikes, action.campsitelike],
        userCampsiteLikes: [...state.userCampsiteLikes, action.campsitelike],
      };
    case REMOVE_CAMPSITELIKE:
      return {
        ...state,
        campsiteLikes: state.campsiteLikes.filter((campsitelike) => campsitelike.id !== action.campsitelikeId),
        userCampsiteLikes: state.userCampsiteLikes.filter((campsitelike) => campsitelike.id !== action.campsitelikeId),
      };
    default:
      return state;
  }
}
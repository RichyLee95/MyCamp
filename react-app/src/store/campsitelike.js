const GET_CAMPSITE_LIKES = "campsitelikes/GET_CAMPSITE_LIKES";
const GET_USER_CAMPSITELIKES = "campsitelikes/GET_USER_CAMPSITELIKES";
const ADD_CAMPSITELIKE = "campsitelikes/ADD_CAMPSITELIKE";
const REMOVE_CAMPSITELIKE = "campsitelikes/REMOVE_CAMPSITELIKE";

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
        return campsitelike
    } else {
        throw new Error('Failed to add like.');
    }
};

export const thunkRemoveLike = (campsitelikeId) => async (dispatch) => {
    const response = await fetch(`/api/campsitelikes/${campsitelikeId}`, { method: "DELETE" });
    if (response.ok) {
        dispatch(removeLike(campsitelikeId));
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
            userCampsiteLikes: action.campsitelikes };
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
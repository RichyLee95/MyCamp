// Constants
const GET_ALL_CAMPSITES = "campsites/GET_CAMPSITES";
const GET_CURRENT_CAMPSITES = "campsites/GET_CURRENT_CAMPSITES";
const GET_CAMPSITE = "campsites/GET_CAMPSITE";
const ADD_CAMPSITE = "campsites/ADD_CAMPSITE";
const REMOVE_CAMPSITE = "campsites/REMOVE_CAMPSITE";
const UPDATE_CAMPSITE = "campsites/UPDATE_CAMPSITE";

// Action Creators
const getAllCampsitesAction = (campsites) => ({
    type: GET_ALL_CAMPSITES,
    campsites,
});

const getCampsiteAction = (campsite) => ({
    type: GET_CAMPSITE,
    campsite,
});

const getCurrentCampsitesAction = (campsites) => ({
    type: GET_CURRENT_CAMPSITES,
    campsites,
});

const addCampsiteAction = (campsite) => ({
    type: ADD_CAMPSITE,
    campsite,
});

const updateCampsiteAction = (campsite) => ({
    type: UPDATE_CAMPSITE,
    campsite,
});

const removeCampsiteAction = (campsiteId) => ({
    type: REMOVE_CAMPSITE,
    campsiteId,
});

export const fetchAllCampsites = () => async (dispatch) => {
    const response = await fetch("/api/campsites/all");
    if (response.ok) {
        const { campsites } = await response.json();
        dispatch(getAllCampsitesAction(campsites));
    }
};

export const fetchCurrentCampsites = () => async (dispatch) => {
    const response = await fetch("/api/campsites/current");
    if (response.ok) {
        const { campsites } = await response.json();
        return dispatch(getCurrentCampsitesAction(campsites));
    }
};


export const fetchSingleCampsite = (campsiteId) => async (dispatch) => {
    const response = await fetch(`/api/campsites/${campsiteId}`);
    if (response.ok) {
        const { campsite } = await response.json();
        dispatch(getCampsiteAction(campsite));
        return campsite;
    }
};

export const thunkCreateCampsite = (formData) => async (dispatch) => {
    const response = await fetch("/api/campsites", {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        throw new Error("Failed to create the campsite.");
    }
    const data = await response.json();
    dispatch(addCampsiteAction(data.campsites));
    return data.campsites
};

export const thunkEditCampsite = (id, content) => async (dispatch) => {
    const response = await fetch(`/api/campsites/${id}`, {
        method: "PUT",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        body: content,
    });

    if (!response.ok) {
        throw new Error("Failed to update the campsite.");
    }

    const { updatedCampsite } = await response.json();
    dispatch(updateCampsiteAction(updatedCampsite));
};

export const thunkDeleteCampsite = (campsite) => async (dispatch) => {


    const response = await fetch(`/api/campsites/${campsite.id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Failed to delete the campsite.");
    }

    dispatch(removeCampsiteAction(campsite.id));
};

const initialState = {
    allCampsites: {},
    currentCampsites: {},
    singleCampsite: null,
};


  //Reducer
  export default function campsitesReducer(state = initialState, action) {
    switch (action.type) {
      case GET_ALL_CAMPSITES:
        let campsiteState = { ...state, allCampsites: {} };
        action.campsites.forEach((campsite) => {
          campsiteState.allCampsites[campsite.id] = campsite;
        });
        return campsiteState;

        case GET_CAMPSITE:
            return {
              ...state,
              singleCampsite: action.campsite ,
            };
          case GET_CURRENT_CAMPSITES:
            let currentCampsitesState = { ...state, currentCampsites: {} };
            action.campsites.forEach((campsite) => {
              currentCampsitesState[campsite.id] = campsite;
            });
            return {
              ...state,
              currentCampsites: currentCampsitesState,
            };
      default:
        return state;
    }
  }
  


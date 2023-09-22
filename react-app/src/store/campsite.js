// Constants
const GET_ALL_CAMPSITES = "campsites/GET_CAMPSITES";
const GET_CURRENT_CAMPSITES = "campsites/GET_CURRENT_CAMPSITES";
const GET_CAMPSITE = "campsites/GET_CAMPSITE";
const ADD_CAMPSITE = "campsites/ADD_CAMPSITE";
const REMOVE_CAMPSITE = "campsites/REMOVE_CAMPSITE";
const UPDATE_CAMPSITE = "campsites/UPDATE_CAMPSITE";
const GET_SEARCH_CAMPSITES = "campsites/GET_SEARCH_CAMPSITES";
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

const getSearchCampsites = (campsites) => ({
    type: GET_SEARCH_CAMPSITES,
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

export const fetchSearchCampsites = (keyword) => async (dispatch) => {
    const response = await fetch(`/api/campsites/search?keyword=${keyword}`);
    if (response.ok) {
        const { campsites } = await response.json();
        await dispatch(getSearchCampsites(campsites));
    }
};

export const thunkCreateCampsite = (formData) => async (dispatch) => {
    const response = await fetch("/api/campsites/new", {
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

export const thunkEditCampsite = (formData, campsite) => async (dispatch) => {
    const response = await fetch(`/api/campsites/${campsite.id}/edit`, {
        method: "PUT",
        body: formData,
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
    singleCampsite: {},
    searchCampsites: {},
};


//Reducer
export default function campsitesReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_CAMPSITES: {
            let campsiteState = {
                ...state,
                allCampsites: {}
            };
            action.campsites.forEach((campsite) => {
                campsiteState.allCampsites[campsite.id] = campsite;
            });
            return campsiteState;
        }
        case GET_CAMPSITE: {
            return {
                ...state,
                singleCampsite: action.campsite

            };
        }
        case GET_CURRENT_CAMPSITES: {
            let currentCampsitesState = {
                ...state,
                currentCampsites: {}
            };
            action.campsites.forEach((campsite) => {
                currentCampsitesState.currentCampsites[campsite.id] = campsite;
            });
            return currentCampsitesState
        }
        case GET_SEARCH_CAMPSITES:
            let searchCampsitesState = { ...state, searchCampsites: {} };
            action.campsites.forEach((campsite) => {
                searchCampsitesState.searchCampsites[campsite.id] = campsite;
            });
            return searchCampsitesState
        case ADD_CAMPSITE: {
            return {
                ...state,
                allCampsite: {
                    ...state.allCampsites,
                    [action.campsite.id]: action.campsite,
                },
            }
        }
        case UPDATE_CAMPSITE: {
            return {
                ...state,
                allCampsites: {
                    ...state.allCampsites,
                    [action.campsite.id]: action.campsite
                },
            }
        }
        case REMOVE_CAMPSITE: {
            const campsiteToDelete = {
                ...state,
                currentCampsites: { ...state.currentCampsites },
                allCampsites: {
                    ...state.allCampsites
                }
            }
            delete campsiteToDelete.allCampsites[action.campsiteId]
            delete campsiteToDelete.currentCampsites[action.campsiteId]
            return campsiteToDelete
        }
        default:
            return state;
    }
}



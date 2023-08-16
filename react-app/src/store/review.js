const GET_ALL_REVIEWS = "reviews/GET_REVIEWS";
const GET_CURRENT_REVIEWS = 'reviews/GET_CURRENT_REVIEWS'
const ADD_REVIEW = 'reviews/ADD_REVIEW'
const UPDATE_REVIEW = 'reviews/UPDATE_REVIEW'
const DELETE_REVIEW = 'reviews/DELETE_REVIEW'

const getAllReviewsAction = (reviews) => ({
    type: GET_ALL_REVIEWS,
    reviews,
});
const getCurrentReviewsAction = (reviews) => ({
    type: GET_CURRENT_REVIEWS,
    reviews,
});
const addReviewAction = (review) => ({
    type: ADD_REVIEW,
    review,
});
const updateReviewAction = (review) => ({
    type: UPDATE_REVIEW,
    review,
});
const deleteReviewAction = (review) => ({
    type: DELETE_REVIEW,
    review,
});

export const fetchAllReviews = () => async (dispatch) => {
    const response = await fetch("/api/reviews/all");
    if (response.ok) {
        const {reviews} = await response.json();
        dispatch(getAllReviewsAction(reviews));
    }
};
export const fetchCurrentReviews = () => async (dispatch) => {
    const response = await fetch("/api/reviews/current");
    if (response.ok) {
        const reviews = await response.json();
        dispatch(getCurrentReviewsAction(reviews));
    }
};
export const thunkCreateReview = (campsiteId,review) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${campsiteId}/new`,{
        method: "POST",
        headers: {
        "Content-Type": "application/json"
    },
        body: JSON.stringify(review)
    });
if (response.ok) {
    const reviewdata = await response.json();
    dispatch(addReviewAction(reviewdata));
} else {
    const data = await response.json();
    throw new Error(data.error);
}
}
export const thunkEditReview = (reviewId, review) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${reviewId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify( review )
    });
    if (response.ok) {
        const reviewdata = await response.json();
        dispatch(updateReviewAction(reviewdata));
    } else {
        const data = await response.json();
        throw new Error(data.error);
    }
};
export const thunkRemoveReview = (reviewId) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${reviewId}`, {
        method: "DELETE",
    });
    if (response.ok) {
        dispatch(deleteReviewAction(reviewId));
    } else {
        const data = await response.json();
        throw new Error(data.error);
    }
};


const initialState = {
    allReviews: {},
    currentReviews: {},
};
export default function reviewsReducer(state = initialState, action) {
    switch (action.type) {

        case GET_ALL_REVIEWS: {
            const reviewsState = {
                ...state,
                allReviews: {}
            }
            action.reviews.forEach((review) => {
                reviewsState.allReviews[review.id] = review
            })
            return reviewsState
        }
        case ADD_REVIEW:{
            return {
                ...state,
                allReviews:{
                    ...state.allReviews,
                    [action.review.id]:action.review
                }
            }
        }
        case UPDATE_REVIEW:{
            return {
                ...state,
                allreviews:{
                    ...state.allReviews,
                    [action.review.id]:action.review
                },
                }
                }
        case DELETE_REVIEW:{
            const reviewToDelete = {
                ...state,
                currentReviews:{...state.currentReviews},
                allReviews:{
                    ...state.allReviews
                }
            }
            delete reviewToDelete.allReviews[action.reviewId]
            delete reviewToDelete.currentReviews[action.reviewId]
            return reviewToDelete
        }
        default:
            return state;
    }
}
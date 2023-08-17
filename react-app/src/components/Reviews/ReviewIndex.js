import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';



const ReviewIndex=({campsiteId}) =>{
    const dispatch = useDispatch()
    const allReviewsObj = useSelector(state => state.reviews.allReviews)
    const allReviews = Object.values(allCampsitesObj)



}
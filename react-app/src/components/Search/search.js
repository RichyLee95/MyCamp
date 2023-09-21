import { useHistory } from 'react-router-dom';
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchAllCampsites, fetchSearchCampsites } from '../../store/campsite';
import { Link } from "react-router-dom"
import defaultimg from '../../images/default-img.png'


const Search = () => {
    const getCurrentUser = (state) => state.session.user;
    const currentUser = useSelector(getCurrentUser);
    const allCampsitesObj = useSelector((state) => state.campsites.searchCampsites)
    const allCampsites = Object.values(allCampsitesObj)
    const allReviewsObj = useSelector(state => state.review.allReviews)
    const reviews = Object.values(allReviewsObj)
    const dispatch = useDispatch()

    const avgStars = (campsiteReviews) => {
        const totalStars = campsiteReviews.reduce((sum, review) => sum + review.stars, 0)
        const avgRating = totalStars / campsiteReviews.length

        const avgRounded = Math.round(avgRating * 2) / 2;
        const starsArray = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= avgRounded) {
                starsArray.push(<i key={i} className="fa fa-star" />);
            } else if (i - 0.5 <= avgRounded) {
                starsArray.push(<i key={i} className="fa fa-star-half" />);
            } else {
                starsArray.push(<i key={i} className="fa fa-star-o" />);
            }
        }
        return starsArray
    }
    useEffect(() => {
        dispatch(fetchAllCampsites());
        // dispatch(fetchSearchCampsites(searchInput))
        
    }, [dispatch]);
    return(
    <div className='all-campsites-container'>
        {allCampsites?.length === 0 && <h3 className='no_search_result'>No result found! Please try something else...</h3>}
                    {allCampsites.map(campsite => (

                        <div className='index-campsite'>

                            <Link to={`/campsites/${campsite.id}`}>
                                <div >
                                    <img className='campsite-prev-img' alt='' src={campsite.prev_image} onError={(e) => { e.target.src = defaultimg; }} />
                                </div>
                                <div className='index-campsite-title-rating'>
                                    <p className='index-campsite-title'>{campsite.title}</p>
                                    {/* <p className='index-campsite-review'>{campsite.}</p> */}
                                    {/* <p className='campsite rating'>{}</p>  */}
                                    <div className='average-rating-stars campsite-index'>
                                        {avgStars(reviews.filter(review => review.campsite_id === campsite.id))}
                                        {campsite.reviews_count > 1 ? (<p className='review-count'>{campsite.reviews_count} reviews</p>) : ''}
                                        {campsite.reviews_count === 1 ? (<p className='review-count'>{campsite.reviews_count} review</p>) : ''}
                                    </div>
                                </div>

                            </Link>
                        </div>
                    ))}

                </div>
             )   
}
export default Search
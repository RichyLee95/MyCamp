import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { fetchAllCampsites } from '../../store/campsite';

import './CampsiteIndex.css'
import { fetchAllReviews } from '../../store/review';
const CampsiteIndex = () => {
    const dispatch = useDispatch()
    const allCampsitesObj = useSelector(state => state.campsites.allCampsites)
    const allCampsites = Object.values(allCampsitesObj)
    const allReviewsObj = useSelector(state => state.review.allReviews)
    const reviews = Object.values(allReviewsObj)


    const topRatedCampsite = []
    //itterate through each campsite
    allCampsites.forEach(campsite => {
        let starsTotal = 0
        //filter all the reviews that match the campsiteid
        const campsitereview = reviews.filter(review => review.campsite_id === campsite.id)

        campsitereview.forEach(filteredReview => {
            //add up all the star values from reviews each campsite has
            starsTotal += filteredReview.stars


        })
        const avgRating = starsTotal / campsitereview.length
        if (avgRating >= 4) topRatedCampsite.push(campsite)
        // const campsite
    })


    useEffect(() => {
        dispatch(fetchAllCampsites())
        dispatch(fetchAllReviews())
    }, [dispatch])
    return (
        <div className='index-container'>

            <div className='index-img'>

            </div>
            <div className='Adventure-text'>
                <p>Adventure awaits</p>
            </div>
            <div className='top-text'> <h2 className=''>Top Rated Campsites</h2></div>
            <div className='top-rated'>

                {topRatedCampsite.map(campsite => (
                    <div className='top-index-campsite'>

                        <Link to={`/campsites/${campsite.id}`}>
                            {/* <div > */}
                                <img className='campsite-prev-img' alt='' src={campsite.prev_image} />
                            {/* </div> */}
                            <div className='top-index-campsite-title-rating'>
                                <p className='top-index-campsite-title'>{campsite.title}</p>
                                {/* <p className='index-campsite-review'>{campsite.}</p> */}
                                {/* <p className='campsite rating'>{}</p>  */}
                            </div>

                        </Link>
                    </div>
                ))}
            </div>

            <div className='all-campsites-container'>
                {allCampsites.map(campsite => (

                    <div className='index-campsite'>

                        <Link to={`/campsites/${campsite.id}`}>
                            <div >
                                <img className='campsite-prev-img' alt='' src={campsite.prev_image} />
                            </div>
                            <div className='index-campsite-title-rating'>
                                <p className='index-campsite-title'>{campsite.title}</p>
                                {/* <p className='index-campsite-review'>{campsite.}</p> */}
                                {/* <p className='campsite rating'>{}</p>  */}
                            </div>

                        </Link>
                    </div>
                ))}

            </div>

        </div>
    )
}


export default CampsiteIndex
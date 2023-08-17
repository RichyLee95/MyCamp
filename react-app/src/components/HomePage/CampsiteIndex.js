import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { fetchAllCampsites } from '../../store/campsite';
import Splashpic from '../../images/wildcamping.jpg'
import './CampsiteIndex.css'
import { fetchAllReviews } from '../../store/review';
import About from '../Footer/Footer';
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
        dispatch(fetchAllCampsites())
        dispatch(fetchAllReviews())
    }, [dispatch])
    return (
        <div className='index-container'>
        <div className='index-img-container'>
        <img className='index-img' src={Splashpic} />
                </div>
            <div className='index-margin'>
                
                {/* <div className='top-rated-container'> */}
                <div >
                    <p className='Adventure-text'>Adventure awaits</p>
                </div>
                <div className='top-text'> <h2 className=''>Top Rated Campsites</h2></div>
                <div className='top-campsites-container'>

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
                                    <div className='average-rating-stars campsite-index'>
                                        {avgStars(reviews.filter(review => review.campsite_id === campsite.id))}
                                    </div>
                                </div>

                            </Link>
                        </div>
                    ))}
                </div>
                <hr className='top-all-break'/>
                {/* <div className='top-all-break'/> */}
                {/* </div> */}
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
                                    <div className='average-rating-stars campsite-index'>
                                        {avgStars(reviews.filter(review => review.campsite_id === campsite.id))}
                                    </div>
                                </div>

                            </Link>
                        </div>
                    ))}

                </div>
            </div>
            <About/>
        </div>
    )
}


export default CampsiteIndex
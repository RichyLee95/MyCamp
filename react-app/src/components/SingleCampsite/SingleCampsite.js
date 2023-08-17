import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import { fetchSingleCampsite } from '../../store/campsite';
import { useParams } from 'react-router-dom';
import { fetchAllReviews } from '../../store/review';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import OpenModalButton from '../OpenModalButton';
import CreateReview from '../Reviews/CreateReview';
import DeleteReview from '../Reviews/DeleteReview';
import EditReview from '../Reviews/EditReview';
import './SingleCampsite.css'
const SingleCampsite = () => {
    const dispatch = useDispatch()
    const { campsiteId } = useParams()
    const campsite = useSelector(state => state.campsites.singleCampsite)
    const allReviewsObj = useSelector(state => state.review.allReviews)
    const reviews = Object.values(allReviewsObj)
    const campsiteReviews = reviews.filter(review => review.campsite_id === parseInt(campsiteId))
    const loggedInUser = useSelector((state) =>
        state.session.user)

    const userReview = campsiteReviews.find(review => review.user_id === loggedInUser?.id)
    const avgStars=(campsiteReviews)=> {
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
        dispatch(fetchSingleCampsite(campsiteId))
        dispatch(fetchAllReviews())
    }, [dispatch])
    if (!campsite) return null
    return (
        <div className='single-campsite-container'>
            <div className='single-campsite-title'>
                <img src={campsite.image} />
                <h2 className='title'>{campsite.title}</h2>
                {campsiteReviews.length > 0 ? (
                avgStars(campsite.reviews)):(<p>No Reviews, be the first to write one!</p>)}
                {/* <h3>{avgRating.toFixed(2)}{avgRating.toFixed(2) <= 0.5?(<h2><i className="fa fa-star-half" /></h2>):'' }</h3>
            <h3>{avgRating.toFixed(2) <= 1?(<h2><i className="fa fa-star" /></h2>):'' }</h3>
            <h3>{avgRating.toFixed(2) <= 1.5?(<h2><i className="fa fa-star" /><i className="fa fa-star-half" /></h2>):'' }</h3>
            <h3>{avgRating.toFixed(2) <= 2?(<h2><i className="fa fa-star" /><i className="fa fa-star" /></h2>):'' }</h3>
            <h3>{avgRating.toFixed(2) <= 2.5?(<h2><i className="fa fa-star" /><i className="fa fa-star" /><i className="fa fa-star-half" /></h2>):'' }</h3>
            <h3>{avgRating.toFixed(2) <= 3?(<h2><i className="fa fa-star" /><i className="fa fa-star" /><i className="fa fa-star" /></h2>):'' }</h3>
            <h3>{avgRating.toFixed(2) <= 3.5?(<h2><i className="fa fa-star" /><i className="fa fa-star" /><i className="fa fa-star" /><i className="fa fa-star-half" /></h2>):'' }</h3>
            <h3>{avgRating.toFixed(2) <= 4?(<h2><i className="fa fa-star" /><i className="fa fa-star" /><i className="fa fa-star" /><i className="fa fa-star" /></h2>):'' }</h3>
            <h3>{avgRating.toFixed(2) <= 4.5?(<h2><i className="fa fa-star" /><i className="fa fa-star" /><i className="fa fa-star" /><i className="fa fa-star" /><i className="fa fa-star-half" /></h2>):'' }</h3>
            <h3>{avgRating.toFixed(2) === 5?(<h2><i className="fa fa-star" /><i className="fa fa-star" /><i className="fa fa-star" /><i className="fa fa-star" /><i className="fa fa-star" /></h2>):'' } */}



                <h3>
                    ({campsite.reviews_count} reviews)</h3>



            </div>
            {loggedInUser && !userReview ?
                (<div className='review-btn-container'>

                    <OpenModalButton buttonText={"Write a Review"} modalComponent={<CreateReview campsiteId={campsiteId} />}
                    />

                </div>
                ) : null
            }
            <div className='address-phone-container'>
                <div className='phonenumber'>{campsite.phone_number}</div>
                <div className='address'>{campsite.address}</div>
            </div>
            <div className='hours-container'>
                <h3 className='hours-text'>Hours</h3>
                <div className='hours-open'>
                    Hours Open {campsite.hours_open}
                    Hours Closed {campsite.hours_close}
                    {console.log(campsite.hours_close)}
                </div>
            </div>
            {campsiteReviews.length > 0 ? (
                <div className='Reviews-container'>
                    {campsiteReviews.map(review => (
                        <div className='review' key={review.id}>
                            <div className='review-name'>{review.username}</div>
                            <div className='review-rating'>{review.stars === 1 ? (<h2><i className="fa fa-star" /></h2>) : ''}
                                {review.stars === 2 ? (<h2><i className="fa fa-star" /><i className="fa fa-star" /></h2>) : ''}
                                {review.stars === 3 ? (<h2><i className="fa fa-star" /><i className="fa fa-star" /><i className="fa fa-star" /></h2>) : ''}
                                {review.stars === 4 ? (<h2><i className="fa fa-star" /><i className="fa fa-star" /><i className="fa fa-star" /><i className="fa fa-star" /></h2>) : ''}
                                {review.stars === 5 ? (<h2><i className="fa fa-star" /><i className="fa fa-star" /><i className="fa fa-star" /><i className="fa fa-star" /><i className="fa fa-star" /></h2>) : ''}
                            </div>
                            <div className='review-date'>{review.created_at}</div>
                            <div className='review-text'>{review.review_text}</div>
                            <div className='edit-delete-container'>
                                {loggedInUser?.id === review.user_id ?
                                    <div className='review-delete'><OpenModalButton buttonText='Delete Review' modalComponent={<DeleteReview campsiteId={campsiteId} review={review} />} /></div>
                                    : null}
                                {loggedInUser?.id === review.user_id ?
                                    <div className='review-edit'><OpenModalButton buttonText='Edit Review' modalComponent={<EditReview campsiteId={campsiteId} review={review} />} /></div>
                                    : null}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (null)}
        </div>
    )

}
export default SingleCampsite
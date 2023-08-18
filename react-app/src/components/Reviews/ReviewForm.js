import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchAllReviews, fetchCurrentReviews, thunkCreateReview, thunkEditReview } from '../../store/review';
import { useModal } from '../../context/Modal';
import './ReviewForm.css'
import { fetchSingleCampsite } from '../../store/campsite';
const ReviewForm = ({ review,campsiteId,reviewId, formType,disabled }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const {closeModal} =useModal()
    const [review_text, setReview_text] = useState(review?.review_text)
    const [stars, setStars] = useState(review?.stars)
    const [activeRating, setActiveRating] = useState(stars);
    const [validationErrors, setValidationErrors] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        let errors = {}
        if (!review_text) errors.review_text = 'Review input required'
        if (review_text.trim().length === 0) errors.review_text = 'Review input cannot be whitespace'
        if(!stars) errors.stars = "Star rating must be chosen"

        setValidationErrors(errors)
        review = {
            ...review,
            review_text,
            stars
        }
        if (Object.keys(errors).length === 0) {
        if (formType === "Create Review"){
            await dispatch(thunkCreateReview(campsiteId,review))
            dispatch(fetchAllReviews())
            dispatch(fetchCurrentReviews())
            dispatch(fetchSingleCampsite(campsiteId))
            .then(closeModal)
        }
        if(formType === "Edit Review"){
            await dispatch(thunkEditReview(reviewId,review))
            dispatch(fetchAllReviews())
            dispatch(fetchCurrentReviews())
            dispatch(fetchSingleCampsite(campsiteId))
            .then(closeModal)
        }
    }
    }
    const onChange = (number) => {
        setStars(parseInt(number));
    };


    useEffect(() => {
        setActiveRating(stars);
    }, [stars]);
    return (
        <div className='reviewform'>
            <form onSubmit={handleSubmit}>
                <div>
                    {validationErrors.review_text ? <p className="errors">{validationErrors.review_text}</p> : ''}
                </div>
                <div className='greeting'>
                    <h2>How was your stay?</h2>
                </div>
                <textarea className='reviewinput'
                    placeholder='Leave your review here...'
                    type='text'
                    value={review_text}
                    onChange={(e) => setReview_text(e.target.value)}
                />

                <div className='starreview'>


                    <div className="rating-input">
                        <div
                            className={activeRating >= 1 ? "filled" : "empty"}
                            onMouseEnter={() => { if (!disabled) setActiveRating(1) }}
                            onMouseLeave={() => { if (!disabled) setActiveRating(stars) }}
                            onClick={() => { if (!disabled) onChange(1) }}
                        >
                            <i className="fa fa-star"></i>
                        </div>
                        <div
                            className={activeRating >= 2 ? "filled" : "empty"}
                            onMouseEnter={() => { if (!disabled) setActiveRating(2) }}
                            onMouseLeave={() => { if (!disabled) setActiveRating(stars) }}
                            onClick={() => { if (!disabled) onChange(2) }}
                        >
                            <i className="fa fa-star"></i>
                        </div>
                        <div
                            className={activeRating >= 3 ? "filled" : "empty"}
                            onMouseEnter={() => { if (!disabled) setActiveRating(3) }}
                            onMouseLeave={() => { if (!disabled) setActiveRating(stars) }}
                            onClick={() => { if (!disabled) onChange(3) }}
                        >
                            <i className="fa fa-star"></i>
                        </div>
                        <div
                            className={activeRating >= 4 ? "filled" : "empty"}
                            onMouseEnter={() => { if (!disabled) setActiveRating(4) }}
                            onMouseLeave={() => { if (!disabled) setActiveRating(stars) }}
                            onClick={() => { if (!disabled) onChange(4) }}
                        >
                            <i className="fa fa-star"></i>
                        </div>
                        <div
                            className={activeRating >= 5 ? "filled" : "empty"}
                            onMouseEnter={() => { if (!disabled) setActiveRating(5) }}
                            onMouseLeave={() => { if (!disabled) setActiveRating(stars) }}
                            onClick={() => { if (!disabled) onChange(5) }}
                        >
                            <i className="fa fa-star"></i>
                        </div>
                    </div>
                </div>
                <button className='submit-btn' type='submit'>Submit Review</button>
            </form>
        </div>
    )
}
export default ReviewForm
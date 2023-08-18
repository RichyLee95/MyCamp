import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { fetchAllCampsites } from '../../store/campsite';
import Splashpic1 from '../../images/splashpic1.jpg'
import Splashpic2 from '../../images/splashpic2.jpg'
import Splashpic3 from '../../images/splashpic3.jpg'
import defaultimg from '../../images/default-img.png'
import './CampsiteIndex.css'
import { fetchAllReviews } from '../../store/review';
import About from '../Footer/Footer';
const CampsiteIndex = () => {
    const dispatch = useDispatch()
    const allCampsitesObj = useSelector(state => state.campsites.allCampsites)
    const allCampsites = Object.values(allCampsitesObj)
    const allReviewsObj = useSelector(state => state.review.allReviews)
    const reviews = Object.values(allReviewsObj)

    const carouselImages = [
        Splashpic1,
        Splashpic2,
        Splashpic3
      ];

      const [currentImageIndex, setCurrentImageIndex] = useState(0);

      const nextImage = () => {
        const newIndex = (currentImageIndex + 1) % carouselImages.length;
        setCurrentImageIndex(newIndex);
      };
      const prevImage = () => {
        const newIndex = (currentImageIndex - 1 + carouselImages.length) % carouselImages.length;
        setCurrentImageIndex(newIndex);
      };

      useEffect(() => {
        const interval = setInterval(nextImage, 5000);
        return () => {
          clearInterval(interval);
        };
      }, [currentImageIndex]);
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
        <div className='campsite-index'>
            <div className='index-img-container'>
            <img className='index-img' src={carouselImages[currentImageIndex]} alt={`Image ${currentImageIndex + 1}`} />
            </div>
        <div className='index-container'>
            
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
                                <div className='split'>

                                    <img className='campsite-prev-img' alt='' src={campsite.prev_image} onError={(e) => { e.target.src = defaultimg; }} />

                                    <div className='top-index-campsite-title-rating'>
                                        <p className='top-index-campsite-title'>{campsite.title}</p>
                                        {/* <p className='index-campsite-review'>{campsite.}</p> */}
                                        {/* <p className='campsite rating'>{}</p>  */}
                                        <div className='average-rating-stars campsite-index'>
                                            {avgStars(reviews.filter(review => review.campsite_id === campsite.id))}
                                            {campsite.reviews_count > 1 ? (<p className='review-count'>{campsite.reviews_count} reviews</p>) : ''}
                                            {campsite.reviews_count === 1 ? (<p className='review-count'>{campsite.reviews_count} review</p>) : ''}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
                <hr className='top-all-break' />
                {/* <div className='top-all-break'/> */}
                {/* </div> */}
                <div><h2>Discover your next adventure</h2></div>
                <div className='all-campsites-container'>
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
            </div>
            <About />
        </div>
        </div>
    )
}


export default CampsiteIndex
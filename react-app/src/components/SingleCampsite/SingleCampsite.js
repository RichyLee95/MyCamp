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
import lantern from '../../icons/lantern.png'
import pad from '../../icons/pad.png'
import sleep from '../../icons/sleep.png'
import stove from '../../icons/stove.png'
import tent from '../../icons/tent.png'
import map from '../../icons/map-icon.png'
import phone from '../../icons/phone-icon.jpg'
import About from '../Footer/Footer';
import defaultimg from '../../images/default-img.png'
import Like from '../Likes/index'
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
    const avgStars = (campsiteReviews) => {
        const totalStars = campsiteReviews?.reduce((sum, review) => sum + review.stars, 0)
        const avgRating = totalStars / campsiteReviews?.length

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
                <img className='campsite-image' src={campsite.image} onError={(e) => { e.target.src = defaultimg; }} />
                <div className='text-image'>
                    <h2 className='title'>{campsite.title}</h2>

                    {campsiteReviews.length > 0 ? (
                        avgStars(campsite.reviews)) : (<p>No Reviews, be the first to write one!</p>)}

                    {campsite.reviews_count === 1 ?
                        (<h3 className='review-title'>({campsite.reviews_count} review)</h3>)
                        : ''}
                    {campsite.reviews_count > 1 ?
                        (<h3 className='review-title'>({campsite.reviews_count} reviews)</h3>)
                        : ''}




                </div>
            </div>
            {/* {loggedInUser && !userReview ?
                (<div className='review-btn-container'>

                    <OpenModalButton buttonText={"Write a Review"} modalComponent={<CreateReview campsiteId={campsiteId} />}
                    />

                </div>
                ) : null
            } */}
            <div className='single-campsite'>
                <div className='address-phone-container'>
                    <h3 className='phone-text'>Phone Number</h3>
                    <div className='phonenumber'><img className='phone-icon' src={phone} />{campsite.phone_number}</div>
                    <h3 className='address-text'>Address</h3>
                    <div className='address'><img className='map-icon' src={map} />{campsite.address}</div>
                </div>
                <div className='hours-container'>
                    <h3 className='hours-text'>Hours</h3>
                    <div className='hours-open'>
                        Hours Open {campsite.hours_open}
                        {/* {console.log(campsite.hours_close)} */}
                    </div>
                    <div className='hours-close'>
                        Hours Closed {campsite.hours_close}
                        {/* {console.log(campsite.hours_close)} */}
                    </div>
                </div>
                <div className='campsite-tips'>
                    <div><h2>Essential Camping Gear</h2></div>
                    <div className='tent'><img src={tent} /><p>The tent: If your budget can go a little bigger, then go bigger with
                        your tent: A 3-person tent gives a cozy couple a little extra breathing room, and a family
                        of four can more easily achieve harmony in a 6-person tent. You can also check the tent’s
                        peak height if you want a tent that you can stand up in (that can make getting dressed and
                        moving around easier to do). Vestibules outside the doors are nice for stowing muddy shoes
                        and having two doors can help you avoid climbing over sleeping tentmates for late-night
                        bathroom breaks.</p>
                    </div>
                    <div className='sleep'><img src={sleep} /><p>The sleeping bag: When selecting your bag, temperature rating is a good
                        place to start. If you're planning on only going fair-weather camping, a summer bag is probably
                        all you'll need, but a 3-season bag will give you more leeway for unpredictable shoulder-season
                        weather. If you're always cold (or always hot), adjust accordingly. And no need to go with a
                        super-snug mummy bag like backpackers use, when a rectangular camping bag will give your body
                        more room to roam.</p>
                    </div>
                    <div className='sleep-pad'><img src={pad} /><p>The sleeping pad: A good sleeping pad is like the mattress on a bed,
                        but it also has high-tech insulation to prevent you from losing body heat on the cold ground.
                        Big air mattresses, like what your guests sleep on at home, might look temptingly plush, but
                        their lack of insulation will likely leave you feeling cold. Take a look at specs when comparing
                        sleeping pads—if one is thicker, longer or wider and has a higher insulation value
                        (known as the R-value) — it will be more comfortable and warmer.</p>
                    </div>
                    <div className='light'><img src={lantern} /><p>Lighting: Campsites don't have illumination, so you have to bring your own.
                        A flashlight is OK, but a headlamp frees up your hands for camp tasks. A lantern is nice for ambient
                        light. (You can also build a campfire, but watch for fire restrictions.)</p>
                    </div>
                    <div className='stove'><img src={stove} /><p>Stove: A classic two-burner propane camp stove should do the trick.
                        You won't spend a fortune and you can cook breakfast and prepare your morning brew at the same time.
                        Bring at least a couple of fuel canisters and a lighter, and fire it up once at home to be sure you know
                        how it works.</p>
                    </div>
                </div>
            </div>
            <hr />
            <div className='review-title'><h3>See what the community think about this campsite</h3></div>
            <div className='overall-rating'>
                <p>Overall rating</p>
                {campsiteReviews.length > 0 ? (
                    avgStars(campsite.reviews)) : (<p>No Reviews, be the first to write one!</p>)}

                {campsite.reviews_count === 1 ?
                    (<h3>({campsite.reviews_count} review)</h3>)
                    : ''}
                {campsite.reviews_count > 1 ?
                    (<h3>({campsite.reviews_count} reviews)</h3>)
                    : ''}
            </div>
            {loggedInUser && !userReview ?
                (<div className='review-btn-container'>

                    <OpenModalButton buttonText={"Write a Review"} modalComponent={<CreateReview campsiteId={campsiteId} />}
                    />

                </div>
                ) : null
            }
            {campsiteReviews.length > 0 ? (
                <div className='Reviews-container'>
                    {campsiteReviews.map(review => (
                        <div className='review' key={review.id}>
                            <div className='review-name'>{review.username}</div>
                            <div className='review-rating'>{review.stars === 1 ? (<p><i className="fa fa-star" /></p>) : ''}
                                {review.stars === 2 ? (<p><i className="fa fa-star" /><i className="fa fa-star" /></p>) : ''}
                                {review.stars === 3 ? (<p><i className="fa fa-star" /><i className="fa fa-star" /><i className="fa fa-star" /></p>) : ''}
                                {review.stars === 4 ? (<p><i className="fa fa-star" /><i className="fa fa-star" /><i className="fa fa-star" /><i className="fa fa-star" /></p>) : ''}
                                {review.stars === 5 ? (<p><i className="fa fa-star" /><i className="fa fa-star" /><i className="fa fa-star" /><i className="fa fa-star" /><i className="fa fa-star" /></p>) : ''}
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
                            <div className='like-container'>
                                    <div className='like-button-container'>
                                        <Like review={review} />
                                    </div>
                                <div>{review.likes_count} People liked this
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (null)}
            <About />
        </div>
    )

}
export default SingleCampsite
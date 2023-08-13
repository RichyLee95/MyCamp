import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import { fetchSingleCampsite } from '../../store/campsite';
import { useParams } from 'react-router-dom';
const SingleCampsite = () => {
    const dispatch = useDispatch()
    const {campsiteId} = useParams()
    const campsite = useSelector(state => state.campsites.singleCampsite)
    


    useEffect(() =>{
        dispatch(fetchSingleCampsite(campsiteId))
    }, [dispatch,campsiteId])
if (!campsite) return null

return (
    <div className='single-campsite-container'>
        <div className='single-campsite-title'>
            <h2 className='title'>{campsite.title}</h2>

        </div>
        <div className='review-btn-container'>
            <button className='review-btn'>Write a Review</button>
        </div>
        <div className='address-phone-container'>
            <div className='phonenumber'>{campsite.phone_number}</div>
            <div className='address'>{campsite.address}</div>
        </div>
        <div className='hours-container'>
            <h3 className='hours-text'>Hours</h3>
            <div className='hours-open'>
                Hours Open {campsite.hours_open}
                Hours Closed {campsite.hours_close}
            </div>
        </div>
    </div>
)

}
export default SingleCampsite
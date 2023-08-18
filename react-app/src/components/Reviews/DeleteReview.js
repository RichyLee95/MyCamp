import { fetchAllReviews, thunkRemoveReview } from "../../store/review"
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import { fetchSingleCampsite } from "../../store/campsite";
import './DeleteReview.css'

const DeleteReview = ({ review,campsiteId }) => {
    const {closeModal} = useModal()
    const history = useHistory()
    const dispatch = useDispatch()
    const handleDelete =async (e) => {
        e.preventDefault()
       await dispatch(thunkRemoveReview(review.id))
        dispatch(fetchSingleCampsite(campsiteId))
        dispatch(fetchAllReviews(campsiteId))
        .then(closeModal)
    }

    return (
        <div className='delete-review'>
            <h1 className='confirm-delete'>Confirm Delete</h1>
            <h3 className='delete-check'>Are you sure you want to delete this review?</h3>
            <div className='delete-button'>
            <button className='btn-yes' onClick={handleDelete}>Yes (Delete Review)</button>
            <button className='btn-no' onClick={closeModal}>No (Keep Review)</button>
        </div>
        </div>
    )
}
export default DeleteReview
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { thunkDeleteCampsite } from '../../store/campsite';

const DeleteCampsite = ({campsite}) => {
    const { closeModal } = useModal()
    const dispatch = useDispatch()
    const handleDelete = (e) => {
        e.preventDefault()
        dispatch(thunkDeleteCampsite(campsite))
        .then(closeModal)
    }
    return (
        <div>
            <div className="li-contents-flex">
        <div className='delete-campsite'>
          <h1 className='confirm-delete-campsite'>Confirm Delete</h1>
          <h3 className='delete-check-campsite'>Are you sure you want to delete this Campsite?</h3>
          <div className='delete-button-campsite'>
          <button className='btn-yes' onClick={handleDelete}>Yes (Delete Campsite) </button>
          <button className='btn-no' onClick={closeModal}>No (Keep Campsite)</button>
        </div>
        </div>
      </div>
        </div>
    )
}
export default DeleteCampsite
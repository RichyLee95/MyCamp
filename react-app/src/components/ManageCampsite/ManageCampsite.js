import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentCampsites } from '../../store/campsite';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import DeleteCampsite from '../CreateCampsite/DeleteCampsite';
import OpenModalButton from '../OpenModalButton';
import './ManageCampsite.css'

const ManageCampsites = () => {
    const dispatch = useDispatch()
    const currentUser= useSelector(state => state.session.user)
    const currentUserObj= useSelector(state => state.campsites.currentCampsites)
    const currentUserCampsite = Object.values(currentUserObj)

    useEffect(() => {
        dispatch(fetchCurrentCampsites())
    },[dispatch])


return (
    <div className='manage-campsite-container'>
        <div className='manage-title'><h2 >{currentUser.username}'s Campsites</h2></div>
        <div className='manage-campsite'>
            {currentUserCampsite.map(campsite => (
                <div className='single-managed-campsite'>
                    <Link className='campsite-link' to={`/campsites/${campsite.id}`}>
                    <div >
                    <img className='campsite-prev-img' alt='' src={campsite.prev_image} />
                    </div>
                        <h2 className='campsite-title'>{campsite.title}</h2>
                    </Link>
                    <div className='update-delete'>
                            <div className='edit-btn'>
                                <Link className='edit-btn-link' to={`/campsites/${campsite.id}/edit`}
                                ><button className='editbutton'>
                                    Update
                                </button></Link>
                            </div>
                            <div className='delete-campsite-btn'>
                                <OpenModalButton buttonText={'Delete Campsite'}
                                    modalComponent={
                                        <DeleteCampsite
                                            campsite={campsite}
                                            key={campsite.id} />
                                    }
                                />
                                </div>
                            </div>
                </div>
            ))}
        </div>
    </div>
)
}

export default ManageCampsites
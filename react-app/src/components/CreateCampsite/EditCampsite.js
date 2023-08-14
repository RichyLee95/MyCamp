import { useParams } from 'react-router-dom/cjs/react-router-dom';
import CampsiteForm from './CampsiteForm';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchSingleCampsite } from '../../store/campsite';

const EditCampsite = () =>{
const {campsiteId} = useParams()
const campsite = useSelector((state)=>
state.campsites.allCampsites[campsiteId])
const dispatch = useDispatch()
useEffect(() => {
    dispatch(fetchSingleCampsite(campsiteId))
}, [dispatch, campsiteId])
// if(!campsite) return null
    return(
        <CampsiteForm
        campsite={campsite}
        formType="Edit Campsite"/>
    )

}


export default EditCampsite

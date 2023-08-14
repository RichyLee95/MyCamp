import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { fetchAllCampsites } from '../../store/campsite';
import './CampsiteIndex.css'
const CampsiteIndex = () => {
    const dispatch = useDispatch()
    const allCampsitesObj = useSelector(state => state.campsites.allCampsites)
    const allCampsites = Object.values(allCampsitesObj)



    useEffect(() =>{
        dispatch(fetchAllCampsites())
    }, [dispatch])
    return (
        <div className='index-container'>
            <div className='index-img'>

            </div>
            <div className='Adventure-text'>
                <p>Adventure awaits</p>
            </div>
            <div className='all-campsites-container'>


                {allCampsites.map(campsite => (
                    
                    <div className='index-campsite'>
                        
                        <Link to={`/campsites/${campsite.id}`}>
                            <div >
                                <img className='campsite-prev-img' alt='' src={campsite.prev_image} />
                            </div>    
                                <div className='index-campsite-title-rating'>
                                    <p className='index-campsite-title'>{campsite.title}</p>
                                     {/* <p className='campsite rating'>{}</p>  */}
                                </div>
                            
                        </Link>
                    </div>
                ))}

            </div>

        </div>
    )
}


export default CampsiteIndex
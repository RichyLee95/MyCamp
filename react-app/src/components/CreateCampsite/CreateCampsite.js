import CampsiteForm from './CampsiteForm';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';


const CreateCampsite = () => {


    const campsite = {
        title: "",
        address: "",
        hours_open: "",
        hours_close: "",
        phone_number: "",
        image: "",
        prev_image: ""

    }

    return (
        <CampsiteForm
        campsite={campsite}
        formType="Create Campsite"/>

)
}
export default CreateCampsite
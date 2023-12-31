import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { fetchCurrentCampsites, thunkCreateCampsite, thunkEditCampsite } from '../../store/campsite';
import './CampsiteForm.css'

const CampsiteForm = ({ campsite, formType }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [title, setTitle] = useState(campsite?.title)
    const [address, setAddress] = useState(campsite?.address)
    const [hours_open, setHours_open] = useState(campsite?.hours_open)
    const [hours_close, setHours_close] = useState(campsite?.hours_close)
    const [phone_number, setPhone_number] = useState(campsite?.phone_number)
    const [image, setImage] = useState(campsite?.image)
    const [prev_image, setPrev_image] = useState(campsite?.prev_image)
    const [validationErrors, setValidationErrors] = useState("")
    const [imagePreview, setImagePreview] = useState(campsite?.image ? campsite.image : null);
    const [prevImagePreview, setPrevImagePreview] = useState(campsite?.prev_image ? campsite.prev_image : null);
    const parseTime = (string) =>{
        let hours = parseInt(string.slice(0,2))
        let minutes = parseInt(string.slice(string.length - 2, string.length - 1))
        return hours * 60 + minutes
    }
    const handleImageChange = (e, setImageFunction, imageType) => {
        const selectedImage = e.target.files[0];

        if (selectedImage) {
            if (['image/jpeg', 'image/png'].includes(selectedImage.type)) {
                setImageFunction(selectedImage);

                if (imageType === 'image') {
                    setImagePreview(URL.createObjectURL(selectedImage));
                } else if (imageType === 'prev_image') {
                    setPrevImagePreview(URL.createObjectURL(selectedImage));
                }
            } else {
                setImageFunction(null);
            }
        } else {
            setImageFunction(null);

            if (imageType === 'image') {
                setImagePreview(null);
            } else if (imageType === 'prev_image') {
                setPrevImagePreview(null);
            }
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault()
        let errors = {}
        const formData = new FormData()

        formData.append("title", title)
        formData.append("address", address)
        formData.append("hours_open", hours_open)
        formData.append("hours_close", hours_close)
        formData.append("phone_number", phone_number)
        formData.append("image", image)
        formData.append("prev_image", prev_image)

        if (!title) errors.title = "Title is required"
        if (title.length > 255 || title.length < 5) errors.title = "Title must be longer than 5 characters and shorter than 255"
        if (title.trim().length === 0) errors.title = 'Title input cannot be whitespace'
        if (!address) errors.address = "Address is required"
        if (address.length > 255) errors.address = "Address must be less than 255 characters"
        if (address.trim().length === 0) errors.address = 'Address input cannot be whitespace'
        if (!hours_open) errors.hours_open = "Hours Open is required"
        if (!hours_close) errors.hours_close = "Hours Closed is required"
        if(parseTime(hours_close) - parseTime(hours_open) <= 0) errors.hours_open = "Hours open cannot be before closing time"
        if (!phone_number) errors.phone_number = "Phone Number is required"
        if (!/^\d{3}-\d{3}-\d{4}$/.test(phone_number)) errors.phone_number = "Phone Number must be in the format 123-456-7899";
        if (!image) errors.image = "Campsite image is required"
        else if (formType === "Create Campsite" && !['image/jpeg', 'image/png'].includes(image.type)) {
            errors.image = 'Image must be in JPG or PNG format';
        }
        // if (!image.type.includes("image")) errors.image = 'Image needs to end in png, jpg, jpeg'
        if (!prev_image) errors.prev_image = "Campsite preview image is required"
        else if (formType === "Create Campsite" && !['image/jpeg', 'image/png'].includes(prev_image.type)) {
            errors.prev_image = 'Preview Image must be in JPG or PNG format';
        }
        // if (!prev_image.type.includes("image")) errors.prev_image = 'Preview image needs to end in png, jpg, jpeg'

        setValidationErrors(errors)
        if (Object.keys(errors).length === 0) {
            if (formType === "Create Campsite") {
                const createdCampsite =   await dispatch(thunkCreateCampsite(formData))
                const createdCampsiteId = createdCampsite.id
                history.push(`/campsites/${createdCampsiteId}`)
            }
            else if (formType === "Edit Campsite") {
                await dispatch(thunkEditCampsite(formData, campsite))
                await dispatch(fetchCurrentCampsites(formData))
                history.push("/campsites/current")
            }
        }

    }

    return (
        <div className='form-container'>
            <form onSubmit={handleSubmit} encType='multipart/form-data'>
                <div>
                    {formType === "Create Campsite" ? (<h1>Create a Campsite!</h1>) : (<h1>Edit your Campsite!</h1>)}
                </div>

                <div>
                    {validationErrors.title ? (<p className="errors">{validationErrors.title}</p>) : ''}
                    <p>What is the name of the campsite?</p>
                    <input
                        placeholder='What is the name of the campsite?'
                        type='text'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    {validationErrors.address ? (<p className="errors">{validationErrors.address}</p>) : ''}
                    <p>What is the address of the campsite?</p>
                    <input
                        placeholder='What is the address of the campsite?'
                        type='text'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)} />
                </div>
                <div>
                    {validationErrors.hours_open ? (<p className="errors">{validationErrors.hours_open}</p>) : ''}
                    <p>What hours are the campsite open?</p>
                    <input
                        placeholder='What hours are the campsite open?'
                        type='time'
                        value={hours_open}
                        onChange={(e) => setHours_open(e.target.value)} />
                </div>
                <div>
                    {validationErrors.hours_close ? (<p className="errors">{validationErrors.hours_close}</p>) : ''}
                    <p>What hours are the campsite closed?</p>
                    <input
                        placeholder='What hours are the campsite closed?'
                        type='time'
                        value={hours_close}
                        onChange={(e) => setHours_close(e.target.value)} />
                </div>
                <div>
                    {validationErrors.phone_number ? (<p className="errors">{validationErrors.phone_number}</p>) : ''}
                    <p>What is the phone number of the campsite? Phone number must be in the format 123-456-7899</p>
                    <input
                        placeholder='Phone number'
                        type='tel'
                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                        value={phone_number}
                        minLength="12"
                        maxLength="12"
                        onChange={(e) => setPhone_number(e.target.value)} />
                </div>

                
                <div className='create-image-upload'>
                    <div>
                        {validationErrors.image ? (<p className="errors">{validationErrors.image}</p>) : ''}
                        <p>Input an image of your campsite</p>
                        <input
                        id="image"
                            placeholder='Campsite image'
                            type='file'
                            accept='.png, .jpg, .jpeg,'
                            onChange={(e) => handleImageChange(e, setImage, 'image')} />
                    {imagePreview && <img src={imagePreview} alt="Campsite" className="image-preview" />}
                    </div>
                    <div>
                        {validationErrors.prev_image ? (<p className="errors">{validationErrors.prev_image}</p>) : ''}
                        <p>Input a preview image of your campsite</p>
                        <input
                            placeholder='Preview image'
                            type='file'
                            accept='.png, .jpg, .jpeg,'
                            onChange={(e) => handleImageChange(e, setPrev_image, 'prev_image')} />
                    {prevImagePreview && <img src={prevImagePreview} alt="Preview" className="image-preview" />}
                    </div>
                </div>
                <div style={{color: 'red'}}>All Fields Required </div>
                <div className='submit-btn'>
                    <button className='button' type='submit'>Submit</button>
                </div>
            </form>
        </div>

    )
}
export default CampsiteForm
import ReviewForm from "./ReviewForm";

const CreateReview = ({campsiteId}) => {

    const review = {
        review_text:"",
        stars: ""
    }
    return (
        <ReviewForm
        review={review}
        campsiteId={campsiteId}
        formType="Create Review"/>
    )
}
export default CreateReview
import ReviewForm from "./ReviewForm";

const EditReview = ({review, campsiteId}) =>{
    return (
        <ReviewForm review={review} reviewId={review.id} campsiteId={campsiteId} formType="Edit Review"/>
    )
}
export default EditReview
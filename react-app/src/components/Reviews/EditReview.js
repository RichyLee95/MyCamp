import ReviewForm from "./ReviewForm";

const EditReview = ({review}) =>{
    return (
        <ReviewForm review={review} reviewId={review.id} formType="Edit Review"/>
    )
}
export default EditReview
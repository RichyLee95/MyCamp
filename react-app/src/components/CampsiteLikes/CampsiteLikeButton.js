import React, { useState, useEffect } from "react";


const CampsiteLikeButton = ({ isLiked, onLike }) => {
    const [liked, setLiked] = useState(isLiked);
    const [iconColor, setIconColor] = useState(isLiked ? "red" : "black");
    // const iconColor = isLiked ? "red" : "black";
    // Update the "liked" state and icon color whenever the "isLiked" prop changes
    useEffect(() => {
        setLiked(isLiked);
        setIconColor(isLiked ? "red" : "black");
    }, [isLiked]);

    const handleClick = () => {
        setLiked((prevLiked) => !prevLiked);
        setIconColor((prevColor) => (prevColor === "red" ? "black" : "red"));

        onLike();
    };

    return (
        <div className="like-button" onClick={handleClick}>
            <i className="fa fa-heart" style={{ color: iconColor }} />
        </div>
    );
};

export default CampsiteLikeButton;
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchSpot } from "../../store/spot"
import "./spotshow.css"

const SpotShowPage = ()=>{
    const spot = useSelector(state=> state.spots)
    const {spotId} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSpot(spotId))
    }, [dispatch, spotId])

    if(!spot){
        return null
    }

    return(
        <div className="spot-show-page-container">
            <div className="spot-show-grid-container">
                <div className="upvoted-photos">
                    <img src="" alt="most upvoted image" className="most-upvoted-image"></img>
                    <div className="top-upvoted-photos">
                        {[1,2,3,4].map((num, i)=> <img src="" alt="top upvoted photos" key={i} className="top-upvoted-smaller-images"></img>)}
                    </div>
                </div>
                <div className="comments-and-info-container">
                    <div className="comments-box">
                        {spot.comments?.map((comment, i)=> <p className="comment-item" key={i}>{comment}</p>)}
                    </div>
                    <div className="spot-info-container">
                        <p className="spot-info-item">{spot.name}</p>
                        <p className="spot-info-item">Date and Time</p>
                        <p className="spot-info-item">Best Time of Day: </p>
                        <p className="spot-info-item">Conditions</p>
                        <p className="spot-info-item">Transportation</p>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default SpotShowPage;
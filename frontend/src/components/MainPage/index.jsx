import React from "react";
import { clearLocations, fetchLocations, getLocations } from "../../store/location";
import Footer from "../Footer";
import MapBox from "../MapBox";
import "./MainPage.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import photosReducer, { getPhotos, fetchPhotosSplash } from "../../store/photos";

const MainPage = () => {
  const locations = useSelector(getLocations);
  const photos = useSelector(state=> Object.values(state.photos))
  const [currentImgIdx, setCurrentImgIdx] = useState(1)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLocations());
    return () => dispatch(clearLocations());
  }, [dispatch]);

  useEffect(()=>{
    dispatch(fetchPhotosSplash())
  }, [dispatch])

  useEffect(() => {
    const backgroundInterval = setInterval(() => {
      if (photos && currentImgIdx < photos.length-1) {
        setCurrentImgIdx(currentImgIdx + 1)
      } else {
        setCurrentImgIdx(0)
      }
    }, 3500)
    return () => clearInterval(backgroundInterval)
  }, [currentImgIdx])

  return (
    <>
      <div className="map-and-carousel-container">
        <div className="carousel">
            <div className="carousel-top">
              <img src={photos[currentImgIdx]?.url} className="image-one"></img>
              </div>
           <div className="carousel-bottom">
              <img src={photos[(currentImgIdx +1)%photos.length]?.url} className="image-two"></img>
              <img src={photos[(currentImgIdx + 2) % photos.length]?.url} className="image-three"></img>
            </div>
        </div>
        <div className="mainpage-mapbox">
          <MapBox locations={locations} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MainPage;

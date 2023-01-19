import React from "react";
import { clearLocations, fetchLocations, getLocations } from "../../store/location";
import Footer from "../Footer";
import MapBox from "../MapBox";
import "./MainPage.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getPhotos, fetchPhotosSplash } from "../../store/photos";

const MainPage = () => {
  const locations = useSelector(getLocations);
  const photos = useSelector(getPhotos)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLocations());
    return () => dispatch(clearLocations());
  }, [dispatch]);

  useEffect(()=>{
    dispatch(fetchPhotosSplash())
  }, [dispatch])

  return (
    <>
      <div className="map-and-carousel-container">
        <div className="carousel">
          <div className="info-sidebar"></div>
          <div className="carousel-top"></div>
          <div className="carousel-bottom-left"></div>
          <div className="carousel-bottom-right"></div>
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

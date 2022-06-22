import React, { useState, useEffect } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import axios from 'axios';
import { img_300, noPicture } from '../../config/config';

const handleDragStart = (e) => e.preventDefault();

const Carousel = ({ media_type, id }) => {
  const [cast, setCast] = useState([]);

  const items = cast.map((c) => (
    <div className='carouselItem'>
      <img
        src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture}
        alt={c.name}
        onDragStart={handleDragStart}
        className='carouselItem__img'
      />
      <b className='carouselItem__txt'>{c.name}</b>
    </div>
  ));

  // lookup the show/movie by id, then get the cast members
  const fetchCast = async () => {
    console.log('fetchcast');
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${process.env.REACT_APP_APIKEY}&language=en-US`
    );
    console.log(data.cast);
    setCast(data.cast);
  };

  useEffect(() => {
    console.log('UE test!');
    fetchCast();
  }, []);

  return <AliceCarousel mouseTracking items={items} />;
};

export default Carousel;

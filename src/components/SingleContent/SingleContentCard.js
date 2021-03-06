import React from 'react';
import './SingleContentCard.css';
// import all image placeholders and url from config file.
import { img_300, unavailable } from '../../config/config';
import { Badge } from '@mui/material';
import ContentModal from '../ContentModal/ContentModal';

// this component is for the card for a single movie or show.
// receive props for different info about the movie/show
const SingleContentCard = ({
  id,
  poster,
  title,
  date,
  media_type,
  vote_average,
}) => {
  return (
    <ContentModal media_type={media_type} id={id} className='media'>
      <Badge
        badgeContent={vote_average}
        color={vote_average > 6 ? 'primary' : 'secondary'}
      />
      {/* if poster exists, use poster as src, if not, show unavailable placeholder photo  */}
      <img
        className='poster'
        src={poster ? `${img_300}/${poster}` : unavailable}
        alt={title}
      />
      <b className='title'>{title}</b>
      <span className='subTitle'>
        {media_type === 'tv' ? 'TV Show' : 'Movie'}
        <span className='subTitle'>{date}</span>
      </span>
    </ContentModal>
  );
};

export default SingleContentCard;


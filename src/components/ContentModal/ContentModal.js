import React, { useState, useEffect } from 'react';
import './ContentModal.css';
import axios from 'axios';
import Carousel from '../Carousel/Carousel';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import YouTubeIcon from '@mui/icons-material/YouTube';
import {
  unavailable,
  img_500,
  unavailableLandscape,
} from '../../config/config';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  //   width: '80%',
  bgcolor: 'background.paper',
  border: '4px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: '10px',
};

// modal for additional info when card is clicked

const ContentModal = ({ children, media_type, id }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [content, setContent] = useState();
  const [video, setVideo] = useState();

  // fetch the data for specific movie for modal, searching by id that was passed in as props
  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_APIKEY}&language=en-US`
    );

    setContent(data);
  };

  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_APIKEY}&language=en-US`
    );
    // extract video key from data, this will be appended to a youtube URL
    data.results[0] && setVideo(data.results[0].key);
  };

  useEffect(() => {
    fetchData();
    fetchVideo();
  }, []);

  return (
    <>
      <div onClick={handleOpen} className='media'>
        {children}
      </div>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          {content && (
            <Box sx={style}>
              <div className='contentModal'>
                <img
                  className='Content-portrait'
                  src={
                    content.poster_path
                      ? `${img_500}/${content.poster_path}`
                      : unavailable
                  }
                  alt={content.name || content.title}
                />
                {/* landscape image for larger/wider screens */}
                <img
                  className='Content-landscape'
                  src={
                    content.backdrop_path
                      ? `${img_500}/${content.backdrop_path}`
                      : unavailableLandscape
                  }
                  alt={content.name || content.title}
                />
                <div className='modal-about'>
                  <span className='modal-title'>
                    {/* render content name or title depending on if tv or movie */}
                    {content.name || content.title} (
                    {/* render the release year, getting the date and then using substring to get the first 4 characters from date aka the year */}
                    {(
                      content.first_air_date ||
                      content.release_date ||
                      '----'
                    ).substring(0, 4)}
                    )
                  </span>
                  {/* check if the tagline exists, if it does then render it */}
                  {content.tagline && (
                    <i className='tagline'>{content.tagline}</i>
                  )}
                  {/* render content description  */}
                  <span className='modal-description'>{content.overview}</span>
                  <div>
                    {/* render carousel passing in media type and Id*/}
                    <Carousel media_type={media_type} id={id} />
                  </div>
                  <Button
                    className='modal-button'
                    variant='contained'
                    startIcon={<YouTubeIcon />}
                    color='secondary'
                    target='_blank'
                    href={`https://www.youtube.com/watch?v=${video}`}
                  >
                    WATCH THE TRAILER
                  </Button>
                </div>
              </div>
            </Box>
          )}
        </Fade>
      </Modal>
    </>
  );
};

export default ContentModal;

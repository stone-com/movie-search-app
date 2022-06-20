import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { unavailable, img_500 } from '../../config/config';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
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
    // console.log(data.results[0].key);
    const URLkey = data.results[0].key;
    setVideo(URLkey);
  };

  useEffect(() => {
    fetchData();
    fetchVideo();
  }, []);

  return (
    <div>
      <Button onClick={handleOpen} className='media'>
        {children}
      </Button>
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
                  src={
                    content.poster_path
                      ? `${img_500}/${content.poster_path}`
                      : unavailable
                  }
                />
              </div>
            </Box>
          )}
        </Fade>
      </Modal>
    </div>
  );
};

export default ContentModal;
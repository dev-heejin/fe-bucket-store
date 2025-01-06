'use client';

import { useState, useEffect } from 'react';
import { Fab } from '@mui/material';
import { ArrowUpward } from '@mui/icons-material';

export default function FloatingTopButton() {
  const [showButton, setShowButton] = useState(false);

  const scrollHandler = () => {
    window.scroll({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
    <>
      {showButton && (
        <Fab
          onClick={scrollHandler}
          color='inherit'
          size='small'
          sx={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            zIndex: 1000,
            background: 'white',
            color: 'lightgray',
          }}
          className={'lg:hidden'}
        >
          <ArrowUpward />
        </Fab>
      )}
    </>
  );
}

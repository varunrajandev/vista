/************NPM *************** */
import { memo } from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';

const StepperButtons = ({
  backUrl,
  nextUrl,
  finishUrl,
  handleNext,
  loading,
  handleFinish,
  isSave = true,
}) => {
  const navigate = useNavigate();
  return (
    <Box
      marginTop={4}
      sx={{
        display: 'flex',
        alignItems: 'end',
        height: '40px',
        justifyContent: 'right',
        gap: '20px',
      }}
    >
      {backUrl ? (
        <LoadingButton
          loading={loading}
          variant='contained'
          onClick={() => navigate(backUrl)}
        >
          back
        </LoadingButton>
      ) : null}
      {isSave ? (
        <LoadingButton loading={loading} variant='contained' type='submit'>
          save
        </LoadingButton>
      ) : null}
      {nextUrl ? (
        <LoadingButton
          loading={loading}
          variant='contained'
          onClick={handleNext}
        >
          next
        </LoadingButton>
      ) : null}
      {finishUrl ? (
        <LoadingButton
          loading={loading}
          variant='contained'
          onClick={handleFinish}
        >
          Finish
        </LoadingButton>
      ) : null}
    </Box>
  );
};

// Default Export
export default memo(StepperButtons);

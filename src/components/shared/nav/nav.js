/*************NPM DEPENDENCIES *****************/
import { memo } from 'react';
import { Box } from '@mui/system';
import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';
import { Button, CircularProgress, Switch, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
/************LOCAL DEPENDENCIES ***************/
import {
  GET_STATUS_BG_COLOR_CODE,
  GET_STATUS_COLOR_CODE,
} from './../../../config/common.config';

// Styled Components
const StyledLi = styled.li`
  list-style: none;
  font-size: 20px;
  font-weight: 600;
  color:  ${(props) => (props.active ? 'blue' : 'gray')}
`;
const StyledBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '25px',
});

/**
 * @description
 * @param {*} { navDetails }
 */
const Nav = ({ navDetails, handleActive }) => (
  <>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '20px',
        mt: 2,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <NavLink to={navDetails?.close?.to ?? '/'}><ArrowBackIcon /></NavLink>
        <p style={{ fontWeight: '800', fontSize: '25px' }}>
          {navDetails?.id ?? ''}
        </p>
        <Typography
          sx={{
            width: '100px',
            padding: '9px',
            borderRadius: '8px',
            fontSize: '12px',
            textAlign: 'center',
            fontWeight: '900',
          }}
          style={{
            backgroundColor: GET_STATUS_BG_COLOR_CODE[navDetails?.status],
            color: GET_STATUS_COLOR_CODE[navDetails?.status],
          }}
        >
          {navDetails?.isLoading ? (<CircularProgress size={10} />) :  navDetails?.status}
        </Typography>
        <Switch checked={navDetails?.active} onChange={handleActive} />
      </div>

      <Button
        sx={{ color: '#f52f50', border: '1px solid #f52f50' }}
        variant='outlined'
      >
        <NavLink
          to={navDetails?.close?.to}
          style={{
            color: '#f52f50',
            textDecoration: 'none',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {navDetails?.close?.text}
        </NavLink>
      </Button>
    </Box>

    {/*NavBar */}

    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: '#edf4ff',
        padding: '20px',
        mt: '60px',
        borderBottomLeftRadius: '15px',
        borderBottomRightRadius: '15px',
      }}
    >
      <StyledBox>
        {navDetails?.links ? navDetails?.links.map((li) => (
          <StyledLi active={li.active}>
            {li.name}
          </StyledLi>
        )) : null}
      </StyledBox>

      <Button
        sx={{
          color: '#FFB701',
          border: '1px solid #FFB701',
          marginRight: '20px',
          letterSpacing: '3px',
          paddingLeft: '30px',
          paddingRight: '30px',
        }}
      >
        <NavLink
          to={navDetails?.edit?.to}
          style={{
            color: '#FFB701',
            fontWeight: 900,
            textDecoration: 'none',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {navDetails?.edit?.text}
        </NavLink>
      </Button>
    </Box>
  </>
);

// Default Export
export default memo(Nav);

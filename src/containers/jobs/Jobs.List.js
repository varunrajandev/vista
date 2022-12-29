/***************NPM DEPENDENCIES *****************/
import React, { memo, useEffect, useState, useMemo, useCallback } from 'react';
import { debounce, size } from 'lodash';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {
  Pagination,
  Paper,
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  tableRowClasses,
  styled,
  TextField,
  Autocomplete,
  CircularProgress,
} from '@mui/material';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { NavLink, useNavigate } from 'react-router-dom';
/***************LOCAL DEPENDENCIES ****************/
import { requestQuery } from '../../utils/request.util';
import { get } from '../../store/action';
import { getDetails } from '../../store/selectors/jobs.selector';
import {
  URLS,
  QUERY_FILTERS,
  MODULE_NAME,
  COLUMNS,
  GET_URL,
  // USERS_URL,
} from './Jobs.Config';
import ROUTE_CONFIG from '../../config/route.config';
import {
  GET_STATUS_BG_COLOR_CODE,
  GET_STATUS_COLOR_CODE,
} from '../../config/common.config';
import { Axios } from '../../http';

//Table Style
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    // backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  [`&.${tableRowClasses.body}`]: {
    fontSize: 1,
    borderRadius: 20,
  },
}));

const List = () => {
  // local states
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({ ...QUERY_FILTERS });
  const [selectedArrowColor, setSelectedArrowColor] = React.useState('');

  // navigation
  const navigate = useNavigate();

  // dispatch
  const dispatch = useDispatch();

  // selector
  const [details] = useSelector((state) => [getDetails(state)], shallowEqual);

  // call the dropdown api
  useEffect(() => {
    dispatch(get(MODULE_NAME, URLS));
  }, [dispatch]);

  // call the api when search changed
  useEffect(() => {
    setLoading(true);
    Axios.get(`${GET_URL.url}?${requestQuery(filters)}`)
      .then((res) => res.data)
      .then((res) => {
        if (res?.status ?? false) {
          setList(res?.data ?? {});
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [dispatch, filters]);

  /**
   * @description
   * @param {string} value
   */
  const handleSearch = (value) =>
    setFilters((prevState) => ({
      ...prevState,
      name: value || '',
      pageNo: 1,
    }));

  /** @type {*} */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleChange = useCallback(debounce(handleSearch, 500), []);

  /** @type {*} */
  const dataTable = useMemo(() => list.data ?? [], [list?.data]);

  return (
    <Box bgcolor='#e1e2e3' padding='20px' flex={7} sx={{ paddingLeft: '30px' }}>
      {/* //Add Ycw Section section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant='h5' sx={{ fontWeight: '900', paddingTop: '20px' }}>
          JOBS MASTER
        </Typography>
        <NavLink style={{ textDecoration: 'none' }} to={ROUTE_CONFIG.JOBS.ADD}>
          <Button
            variant='contained'
            color='success'
            sx={{ backgroundColor: '#0A9475', marginTop: '10px' }}
          >
            ADD NEW JOB REQUEST
          </Button>
        </NavLink>
      </Box>

      {/* Filter and Search Section Like Search and All DropDown Code Start */}
      <Box
        sx={{
          display: 'flex',
          gap: '20px',
          alignItems: 'center',
          marginTop: '30px',
        }}
      >
        <Box sx={{ display: 'flex' }}>
          <TextField
            size='small'
            sx={{ bgcolor: 'white', borderRadius: '5px' }}
            placeholder='Search'
            onChange={({ target: { value } }) => handleChange(value)}
          />
        </Box>
        <Autocomplete
          disablePortal
          size='small'
          id='combo-box-demo'
          options={details?.city ?? []}
          sx={{ width: '20%' }}
          onChange={(_event, value) => {
            setFilters((prevState) => ({
              ...prevState,
              city: value?.uuid ?? '',
              pageNo: 1,
            }));
            dispatch(
              get(MODULE_NAME, [
                {
                  key: 'locality',
                  url: value?.uuid
                    ? `${URLS[2].url}?cityUuid=${value.uuid}`
                    : URLS[2].url,
                },
              ])
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{ bgcolor: 'white', borderRadius: '5px' }}
              label='Select City'
            />
          )}
          getOptionLabel={(item) => `${item.cityName}`}
        />

        <Autocomplete
          disablePortal
          size='small'
          id='combo-box-demo'
          options={details?.locality ?? []}
          onChange={(_event, value) =>
            setFilters((prevState) => ({
              ...prevState,
              micromsrket: value?.id ?? '',
              pageNo: 1,
            }))
          }
          sx={{ width: '20%' }}
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{ bgcolor: 'white', borderRadius: '5px' }}
              label='Select Locality'
            />
          )}
          getOptionLabel={(item) => `${item.name}`}
        />

        <Autocomplete
          disablePortal
          size='small'
          id='combo-box-demo'
          options={details?.status ?? []}
          sx={{ width: '20%' }}
          onChange={(_event, value) =>
            setFilters((prevState) => ({
              ...prevState,
              jobActiveStage: value?.key ?? '',
              pageNo: 1,
            }))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{ bgcolor: 'white', borderRadius: '5px' }}
              label='Select Highest Active Stage'
            />
          )}
          getOptionLabel={(item) => `${item.value}`}
        />
      </Box>

      {/* Filter Section Like Search and All DropDown Code End */}

      {/* DataTableList code Start From Here*/}
      <Box marginTop={5}>
        <h4> ALL JOBS ({list?.totalRecords ?? 0})</h4>
        <TableContainer>
          <Table
            sx={{ minWidth: '100%', marginTop: '10px' }}
            aria-label='simple table'
          >
            <TableHead bgColor={'#e1e2e3'}>
              <TableRow>
                {COLUMNS.map((column) => (
                  <TableCell
                    sx={{
                      fontSize: '10px',
                      fontWeight: column.cellWeight,
                      ...(column.style
                        ? {
                            width: column.cellWidth,
                          }
                        : {}),
                    }}
                    align='left'
                    key={column.name}
                  >
                    <Box sx={{ display: 'flex' }}>
                      <Box
                        {...(column.style
                          ? { sx: { letterSpacing: '1px' } }
                          : { ml: 4 })}
                      >
                        {column.name}
                      </Box>
                      <Box
                        style={{
                          alignItem: '',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '-5px',
                          cursor: 'pointer',
                        }}
                      >
                        <ArrowDropUpIcon
                          onClick={() => {
                            setFilters((prevState) => ({
                              ...prevState,
                              filter: column.key,
                              sortby: 'asc',
                              pageNo: 1,
                            }));
                            setSelectedArrowColor(`${column.key}Asc`);
                          }}
                          sx={{
                            marginTop: column.arrowUpMargin,
                            color:
                              column.asc === selectedArrowColor
                                ? 'blue'
                                : 'black',
                          }}
                        />
                        <ArrowDropDownIcon
                          onClick={() => {
                            setFilters((prevState) => ({
                              ...prevState,
                              filter: column.key,
                              sortby: 'desc',
                              pageNo: 1,
                            }));
                            setSelectedArrowColor(`${column.key}Desc`);
                          }}
                          sx={{
                            marginTop: column.arrowDownMargin,
                            color:
                              column.desc === selectedArrowColor
                                ? 'blue'
                                : 'black',
                          }}
                        />
                      </Box>
                    </Box>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            {/*...........................Table Body.............................. */}
            <TableBody component={Paper}>
              {dataTable.map((item) => (
                <StyledTableRow
                  onClick={() =>
                    navigate(
                      item?.jobStatus?.key === 'ACTIVE'
                        ? ROUTE_CONFIG.JOBS.PROFILE(item?.jobId, item?.jobStatus?.key)
                        : ROUTE_CONFIG.JOBS.EDIT(item?.jobId ?? '', 1)
                    )
                  }
                  key={item?.jobId ?? ''}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    zIndex: '999',
                    border: '1px solid #E0E0E0',
                    fontSize: '13px',
                    cursor: 'pointer',
                  }}
                >
                  <TableCell
                    sx={{ fontSize: '13px' }}
                    component='th'
                    scope='item'
                    style={{
                      borderLeft: `5px solid ${
                        GET_STATUS_COLOR_CODE[item?.jobStatus?.key ?? 'CREATED']
                      }`,
                    }}
                  >
                    {item?.jobId ?? '--'}
                  </TableCell>
                  <TableCell sx={{ fontSize: '13px' }} align='left'>
                    {item?.jobTypeUuid ?? '--'}
                  </TableCell>

                  <TableCell sx={{ fontSize: '13px' }} align='left'>
                    {item?.userId ?? '--'}
                  </TableCell>

                  <TableCell sx={{ fontSize: '13px' }} align='left'>
                    {item?.microMarketName ?? '--'}
                  </TableCell>

                  <TableCell sx={{ fontSize: '13px' }} align='left'>
                    {item?.workingHours ?? '--'}
                  </TableCell>

                  <TableCell sx={{ fontSize: '13px' }} align='left'>
                    {item?.budgetRange ?? '--'}
                  </TableCell>

                  <TableCell sx={{ fontSize: '13px' }} align='left'>
                    {item?.startDate ?? '--'}
                  </TableCell>

                  <TableCell sx={{ fontSize: '13px' }} align='left'>
                    {item?.jobCurrentStatus ?? '--'}
                  </TableCell>

                  <TableCell sx={{ fontSize: '13px' }} align='left'>
                    <Typography
                      sx={{
                        width: '150px',
                        padding: '8px',
                        borderRadius: '5px',
                        fontSize: '11px',
                        textAlign: 'center',
                        fontWeight: '950',
                        boxSizing: 'border-box',
                      }}
                      style={{
                        backgroundColor:
                          GET_STATUS_BG_COLOR_CODE[
                            item?.jobStatus?.key ?? 'CREATED'
                          ],
                        color:
                          GET_STATUS_COLOR_CODE[
                            item?.jobStatus?.key ?? 'CREATED'
                          ],
                      }}
                    >
                      {item?.jobStatus?.key ?? '--'}
                    </Typography>
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* End dataTableList */}
        {size(dataTable) === 0 && !loading ? (
          <Box display='flex' justifyContent='center' marginTop={1}>
            No Records Found
          </Box>
        ) : null}
        {loading ? (
          <Box display='flex' justifyContent='center' marginTop={1}>
            <CircularProgress />
          </Box>
        ) : null}
      </Box>
      {/* ============ Pagination Code  Start   ==============*/}
      {list?.totalRecords ?? 0 ? (
        <Box display='flex' justifyContent='center' marginTop={1}>
          <Pagination
            showFirstButton
            showLastButton
            count={list?.totalPages ?? 0}
            page={filters?.pageNo ?? 1}
            onChange={(_event, pageNo) => {
              setFilters((prevState) => ({
                ...prevState,
                pageNo,
              }));
              window.scrollTo(0, 0);
            }}
          />
        </Box>
      ) : null}
      {/* ============  Pagination Code  End  ==============*/}
    </Box>
  );
};

// Default export
export default memo(List);

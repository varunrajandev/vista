/***************NPM DEPENDENCIES *****************/
import React, {
  memo,
  useEffect,
  useState,
  useMemo,
  useCallback,
  useRef,
} from 'react';
import { debounce, size, isEmpty } from 'lodash';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {
  Pagination,
  LinearProgress,
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
  TableSortLabel,
  CircularProgress,
} from '@mui/material';
// import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { NavLink, useNavigate } from 'react-router-dom';
/***************LOCAL DEPENDENCIES ****************/
import { requestQuery } from '../../utils/request.util';
import { get } from '../../store/action';
import { getDetails } from '../../store/selectors/ycw.selector';
// import { getLoading } from '../../store/selectors/common.selector';
import {
  URLS,
  QUERY_FILTERS,
  MODULE_NAME,
  COLUMNS,
  GET_URL,
  // USERS_URL,
} from './Ycw.Config';
import ROUTE_CONFIG from '../../config/route.config';
import {
  GET_STATUS_BG_COLOR_CODE,
  GET_STATUS_COLOR_CODE,
} from '../../config/common.config';
import { ENDPOINTS } from '../../config/api.config';
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
  const [filters, setFilters] = useState({ ...QUERY_FILTERS });
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSortedKey, setSelectedSortedKey] = useState({
    key: '',
    order: 'asc',
  });

  // ref
  const autoCompleteRef = useRef(null);

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
  // dispatch(
  //   get(MODULE_NAME, [
  //     {
  //       ...USERS_URL,
  //       url: `${USERS_URL.url}${value}&userType=WORKER`,
  //     },
  //   ])
  // );

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
          Yellow Collar Workers (YCW)
        </Typography>
        <NavLink style={{ textDecoration: 'none' }} to={ROUTE_CONFIG.YCW.ADD}>
          <Button
            variant='contained'
            color='success'
            sx={{ backgroundColor: '#0A9475', marginTop: '10px' }}
          >
            ADD NEW YCW
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
            placeholder='Search by Name'
            onChange={({ target: { value } }) => handleChange(value)}
          />
        </Box>

        <Autocomplete
          disablePortal
          size='small'
          id='combo-box-demo'
          options={details?.skills ?? []}
          sx={{ width: '15%' }}
          onChange={(_event, value) =>
            setFilters((prevState) => ({
              ...prevState,
              skills: value?.uuid ?? '',
              pageNo: 1,
            }))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{ bgcolor: 'white', borderRadius: '5px' }}
              label='Search YCW Work Type'
            />
          )}
          getOptionLabel={(item) => `${item.name}`}
        />

        <Autocomplete
          disablePortal
          size='small'
          id='combo-box-demo'
          options={details?.city ?? []}
          sx={{ width: '15%' }}
          onChange={(_event, value) => {
            const microMarket = autoCompleteRef.current.getElementsByClassName(
              'MuiAutocomplete-clearIndicator'
            )?.[0];
            if (!isEmpty(microMarket)) {
              microMarket.click();
            }
            setFilters((prevState) => ({
              ...prevState,
              city: value?.uuid ?? '',
              micromsrket: '',
              pageNo: 1,
            }));
            dispatch(
              get(MODULE_NAME, [
                {
                  key: 'microMarket',
                  url: value?.uuid
                    ? `${ENDPOINTS.LOCALITY_1}?cityUuid=${value.uuid}`
                    : ENDPOINTS.LOCALITY_1,
                },
              ])
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{ bgcolor: 'white', borderRadius: '5px' }}
              label='Select YCW City'
            />
          )}
          getOptionLabel={(item) => `${item.cityName}`}
        />

        <Autocomplete
          ref={autoCompleteRef}
          disablePortal
          size='small'
          id='combo-box-demo'
          options={details?.microMarket ?? []}
          sx={{ width: '15%' }}
          onChange={(_event, value) =>
            setFilters((prevState) => ({
              ...prevState,
              microMarket: value?.id ?? '',
              pageNo: 1,
            }))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{ bgcolor: 'white', borderRadius: '5px' }}
              label='Select Supply Hub'
            />
          )}
          getOptionLabel={(item) => `${item?.name ?? ''}`}
        />

        <Autocomplete
          disablePortal
          size='small'
          id='combo-box-demo'
          options={details?.gender ?? []}
          onChange={(_event, value) =>
            setFilters((prevState) => ({
              ...prevState,
              gender: value?.key ?? '',
              pageNo: 1,
            }))
          }
          sx={{ width: '15%' }}
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{ bgcolor: 'white', borderRadius: '5px' }}
              label='Select Gender'
            />
          )}
          getOptionLabel={(item) => `${item.value}`}
        />

        <Autocomplete
          disablePortal
          size='small'
          id='combo-box-demo'
          options={details?.workingHours ?? []}
          sx={{ width: '15%' }}
          onChange={(_event, value) =>
            setFilters((prevState) => ({
              ...prevState,
              workingHours: value?.key ?? '',
              pageNo: 1,
            }))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{ bgcolor: 'white', borderRadius: '5px' }}
              label='Select Working Hours'
            />
          )}
          getOptionLabel={(item) => `${item.value}`}
        />

        <Autocomplete
          disablePortal
          size='small'
          id='combo-box-demo'
          options={details?.status ?? []}
          onChange={(_event, value) =>
            setFilters((prevState) => ({
              ...prevState,
              status: value?.key ?? '',
              pageNo: 1,
            }))
          }
          sx={{ width: '15%' }}
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{ bgcolor: 'white', borderRadius: '5px' }}
              label='Select YCW Status'
            />
          )}
          getOptionLabel={(item) => `${item.value}`}
        />
      </Box>

      {/* Filter Section Like Search and All DropDown Code End */}

      {/* DataTableList code Start From Here*/}
      <Box marginTop={5}>
        <h4> ALL YCWS ({list?.totalRecords ?? 0})</h4>
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
                    <TableSortLabel
                      active={true}
                      direction={
                        column.key === selectedSortedKey ? 'desc' : 'asc'
                      }
                      onClick={() => {
                        setFilters((prevState) => ({
                          ...prevState,
                          filter: column.key,
                          sortby:
                            column.key === selectedSortedKey ? 'asc' : 'desc',
                          pageNo: 1,
                        }));
                        setSelectedSortedKey(
                          selectedSortedKey !== column.key ? column.key : ''
                        );
                      }}
                    >
                      {column.name}
                    </TableSortLabel>
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
                      item?.profileStatus?.key === 'ACTIVE' ||
                        item?.profileStatus?.key === 'ACTIVE_AND_AVAILABLE'
                        ? ROUTE_CONFIG.YCW.PROFILE(item?.userId ?? '')
                        : ROUTE_CONFIG.YCW.EDIT(item?.userId ?? '', 1)
                    )
                  }
                  key={item.userId}
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
                        GET_STATUS_COLOR_CODE[
                          item?.profileStatus?.key ?? 'ACTIVE'
                        ]
                      }`,
                    }}
                  >
                    {item.userId ? item.userId : '--'}
                  </TableCell>
                  <TableCell sx={{ fontSize: '13px' }} align='left'>
                    {item.name ? item.name : '--'}
                  </TableCell>

                  <TableCell sx={{ fontSize: '13px' }} align='left'>
                    {item.mobileNo ? item.mobileNo : '--'}
                  </TableCell>

                  <TableCell sx={{ fontSize: '13px' }} align='left'>
                    {item?.gender?.value ?? '--'}
                  </TableCell>

                  <TableCell sx={{ fontSize: '13px' }} align='left'>
                    {item.cityName ? item.cityName : '--'}
                  </TableCell>

                  <TableCell sx={{ fontSize: '13px' }} align='left'>
                    {item.microMarketName ? item.microMarketName : '--'}
                  </TableCell>

                  <TableCell sx={{ fontSize: '13px' }} align='left'>
                    {item.primarySkill ? item.primarySkill : '--'}
                  </TableCell>

                  <TableCell sx={{ fontSize: '13px' }} align='left'>
                    {item.totalExperience || '--'}
                  </TableCell>

                  <TableCell sx={{ fontSize: '13px' }} align='left'>
                    {item?.workingHours}
                  </TableCell>

                  <TableCell sx={{ fontSize: '13px' }} align='left'>
                    <LinearProgress
                      variant='determinate'
                      value={item.percentage}
                      color='secondary'
                    />{' '}
                    {item.percentage}%{/* {"--"} */}
                  </TableCell>
                  <TableCell align='left' sx={{ border: 'none' }}>
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
                            item?.profileStatus?.key ?? 'ACTIVE'
                          ],
                        color:
                          GET_STATUS_COLOR_CODE[
                            item?.profileStatus?.key ?? 'ACTIVE'
                          ],
                      }}
                    >
                      {item.profileStatus ? item.profileStatus.value : '--'}
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

export default memo(List);

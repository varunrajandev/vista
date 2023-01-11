/***************NPM DEPENDENCIES *****************/
import React, {
  memo,
  useEffect,
  useState,
  useMemo,
  useCallback,
  useRef,
} from 'react';
import { debounce, isEmpty, size } from 'lodash';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {
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
  Pagination,
  CircularProgress,
  TableSortLabel,
} from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
/***************LOCAL DEPENDENCIES ****************/
import { get } from './../../store/action';
import ROUTE_CONFIG from '../../config/route.config';
import { getDetails } from './../../store/selectors/cx.selector';
import {
  URLS,
  QUERY_FILTERS,
  MODULE_NAME,
  COLUMNS,
  GET_URL,
} from './Cx.Config';
import {
  GET_STATUS_BG_COLOR_CODE,
  GET_STATUS_COLOR_CODE,
} from '../../config/common.config';
import { Axios } from '../../http';
import { requestQuery } from '../../utils/request.util';

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
    dispatch(get(MODULE_NAME, URLS, 'dropDownLoading'));
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
      {/* Start header section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Start heading section */}
        <Typography variant='h5' sx={{ fontWeight: '900', paddingTop: '20px' }}>
          Customer Master (CX)
        </Typography>
        {/* End heading section */}

        {/* Start button section */}
        <NavLink style={{ textDecoration: 'none' }} to={ROUTE_CONFIG.CX.ADD}>
          <Button
            variant='contained'
            color='success'
            sx={{ backgroundColor: '#0A9475', marginTop: '10px' }}
          >
            ADD NEW CUSTOMER
          </Button>
        </NavLink>
        {/* End button section */}
      </Box>
      {/* End header section */}

      {/* Start filter and search Section */}
      <Box
        sx={{
          display: 'flex',
          gap: '20px',
          alignItems: 'center',
          marginTop: '30px',
        }}
      >
        <Box sx={{ display: 'flex', width: '20%' }}>
          <TextField
            size='small'
            sx={{ bgcolor: 'white', borderRadius: '5px', width: '100%' }}
            placeholder='Search'
            onChange={({ target: { value } }) => handleChange(value)}
          />
        </Box>

        <Autocomplete
          size='small'
          disablePortal
          options={details?.city ?? []}
          sx={{ width: '20%' }}
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
              sx={{ bgcolor: 'white', borderRadius: '5px' }}
              {...params}
              label='Select City'
            />
          )}
          getOptionLabel={(item) => `${item.cityName}`}
        />

        <Autocomplete
          ref={autoCompleteRef}
          size='small'
          disablePortal
          id='combo-box-demo'
          options={details?.locality ?? []}
          onChange={(_event, newValue) => {
            setFilters((prevState) => ({
              ...prevState,
              micromsrket: newValue?.id ?? '',
              pageNo: 1,
            }));
          }}
          sx={{ width: '20%' }}
          renderInput={(params) => (
            <TextField
              sx={{ bgcolor: 'white', borderRadius: '5px' }}
              {...params}
              label='Select Supply Hub'
            />
          )}
          getOptionLabel={(item) => `${item?.name}`}
        />
        <Autocomplete
          size='small'
          disablePortal
          id='combo-box-demo'
          options={details?.profile ?? []}
          onChange={(_event, newValue) =>
            setFilters((prevState) => ({
              ...prevState,
              status: newValue?.key ?? '',
            }))
          }
          sx={{ width: '20%' }}
          renderInput={(params) => (
            <TextField
              sx={{ bgcolor: 'white', borderRadius: '5px' }}
              {...params}
              label='Select Request Status'
            />
          )}
          getOptionLabel={(item) => `${item.value}`}
        />
      </Box>
      {/* End filter and search Section */}

      {/* Start count */}
      <Box marginTop={2}>
        {/* Start heading section */}
        <Typography variant='h6' sx={{ fontWeight: '900' }}>
          ALL CX ({list?.totalRecords ?? 0})
        </Typography>
        {/* End heading section */}
      </Box>
      {/* End count */}

      {/* Start dataTableList */}
      <Box marginTop={1}>
        <TableContainer>
          <Table sx={{ minWidth: '100%' }} aria-label='simple table'>
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
                    key={column.key}
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
            <TableBody component={Paper}>
              {dataTable.map((row) => (
                <StyledTableRow
                  onClick={() =>
                    navigate(
                      row?.profileStatus?.key === 'ACTIVE'
                        ? ROUTE_CONFIG.CX.PROFILE(
                            row?.userId ?? '',
                            row?.profileStatus?.key
                          )
                        : ROUTE_CONFIG.CX.EDIT(row?.userId ?? '', 1)
                    )
                  }
                  key={row.userId}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    zIndex: '999',
                    border: '1px solid #E0E0E0',
                    fontSize: '13px',
                    cursor: 'pointer',
                  }}
                >
                  <TableCell
                    key={`${row.userId}_userId`}
                    sx={{ fontSize: '13px', cursor: 'pointer' }}
                    component='th'
                    scope='row'
                    style={{
                      borderLeft: `5px solid ${
                        GET_STATUS_COLOR_CODE[
                          row?.profileStatus?.key ?? 'ACTIVE'
                        ]
                      }`,
                    }}
                  >
                    {row?.userId ?? '--'}
                  </TableCell>
                  <TableCell
                    key={`${row.id}_name`}
                    sx={{ fontSize: '13px' }}
                    align='left'
                  >
                    {row?.name ?? '--'}
                  </TableCell>
                  <TableCell
                    key={`${row.id}_mobileNo`}
                    sx={{ fontSize: '13px' }}
                    align='left'
                  >
                    {row?.mobileNo ?? '--'}
                  </TableCell>
                  <TableCell
                    key={`${row.id}_email`}
                    sx={{ fontSize: '13px' }}
                    align='left'
                  >
                    {row?.email ?? '--'}
                  </TableCell>
                  <TableCell
                    key={`${row.id}_cityName`}
                    sx={{ fontSize: '13px' }}
                    align='left'
                  >
                    {row?.cityName ?? '--'}
                  </TableCell>
                  <TableCell
                    key={`${row.id}_microMarketName`}
                    sx={{ fontSize: '13px' }}
                    align='left'
                  >
                    {row?.microMarketName ?? '--'}
                  </TableCell>
                  <TableCell
                    key={`${row.id}_jobs`}
                    sx={{ fontSize: '13px' }}
                    align='left'
                  >
                    {row?.openJob ?? '--'}
                  </TableCell>
                  <TableCell
                    key={`${row.id}_active`}
                    sx={{ fontSize: '13px' }}
                    align='left'
                  >
                    {row?.activeJob ?? '--'}
                  </TableCell>
                  <TableCell
                    key={`${row.id}_status`}
                    sx={{ fontSize: '8px' }}
                    align='left'
                  >
                    <Typography
                      sx={{
                        padding: '5px',
                        borderRadius: '10px',
                        fontSize: '13px',
                        textAlign: 'center',
                        fontWeight: '900',
                      }}
                      style={{
                        backgroundColor:
                          GET_STATUS_BG_COLOR_CODE[
                            row?.profileStatus?.key ?? 'ACTIVE'
                          ],
                        color:
                          GET_STATUS_COLOR_CODE[
                            row?.profileStatus?.key ?? 'ACTIVE'
                          ],
                      }}
                    >
                      {row?.profileStatus?.value ?? '--'}
                    </Typography>
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
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

// Default Export
export default memo(List);

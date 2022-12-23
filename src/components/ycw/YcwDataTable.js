/********************NPM DEPENDENCIES*********************/
import * as React from 'react';
import { useEffect, useState, useCallback, memo } from 'react';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {
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
  Paper,
  styled,
  TextField,
  Autocomplete,
  LinearProgress,
  TablePagination,
} from '@mui/material';
import { useNavigate, NavLink } from 'react-router-dom';
import { debounce } from 'lodash';
/******************LOCAL DEPENDENCIES********************/
import { masterApi } from '../../AllData';
//Table style
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
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
// Table columns
const columns = [
  {
    name: 'YCW ID',
    cellWidth: '10%',
    cellWeight: 950,
    arrowUpMargin: '-5px',
    arrowDownMargin: '-17px',
    style: true,
    asc: 'userIdAsc',
    desc: 'userIdDesc',
    key: 'userId',
  },
  {
    name: 'NAME',
    cellWidth: '13%',
    cellWeight: 900,
    arrowUpMargin: '-5px',
    arrowDownMargin: '-16px',
    style: true,
    asc: 'firstNameAsc',
    desc: 'firstNameDesc',
    key: 'firstName',
  },
  {
    name: 'PHONE#',
    cellWidth: '8%',
    cellWeight: 900,
    arrowUpMargin: '-5px',
    arrowDownMargin: '-17px',
    style: true,
    asc: 'mobileNoAsc',
    desc: 'mobileNoDesc',
    key: 'mobileNo',
  },
  {
    name: 'GENDER',
    cellWidth: '5%',
    cellWeight: 900,
    arrowUpMargin: '-5px',
    arrowDownMargin: '-17px',
    style: true,
    asc: 'genderAsc',
    desc: 'genderDesc',
    key: 'gender',
  },
  {
    name: 'CITY',
    cellWidth: '5%',
    cellWeight: 900,
    arrowUpMargin: '-5px',
    arrowDownMargin: '-17px',
    style: true,
    asc: 'cityNameAsc',
    desc: 'cityNameDesc',
    key: 'cityName',
  },
  {
    name: 'SKILLS',
    cellWidth: '13%',
    cellWeight: 900,
    arrowUpMargin: '-5px',
    arrowDownMargin: '-17px',
    style: true,
    asc: 'primarySkillAsc',
    desc: 'primarySkillDesc',
    key: 'primarySkill',
  },
  {
    name: 'EXP.(YRS.)',
    cellWidth: '12%',
    cellWeight: 900,
    arrowUpMargin: '-5px',
    arrowDownMargin: '-17px',
    style: true,
    asc: 'totalExperienceAsc',
    desc: 'totalExperienceDesc',
    key: 'totalExperience',
  },
  {
    name: 'WORK HOURS',
    cellWidth: '15%',
    cellWeight: 900,
    arrowUpMargin: '-5px',
    arrowDownMargin: '-17px',
    style: true,
    asc: 'workingHoursAsc',
    desc: 'workingHoursDesc',
    key: 'workingHours',
  },
  {
    name: 'Update Status',
    cellWidth: '15%',
    cellWeight: 900,
    arrowUpMargin: '-5px',
    arrowDownMargin: '-17px',
    style: true,
    asc: 'percentageAsc',
    desc: 'percentageDesc',
    key: 'percentage',
  },
  {
    name: 'STATUS',
    cellWidth: '10%',
    cellWeight: 900,
    arrowUpMargin: '-5px',
    arrowDownMargin: '-17px',
    style: false,
    asc: 'profileStatusAsc',
    desc: 'profileStatusDesc',
    key: 'profileStatus',
  },
];
// Route Mapper
const routeMapper = {
  ACTIVE: 'profile',
  IN_ACTIVE: 'add',
};

const Ycw = () => {
  // local states
  const [filters, setFilters] = useState({
    skills: '',
    status: '',
    city: '',
    rowsPerPage: 20,
    page: 1,
    filterName: 'createdAt',
    order: 'desc',
    count: 200,
  });
  const [dropDownList, setDropDownList] = useState({
    city: [],
    skills: [],
    status: [],
  });
  const [userInfo, setUserInfo] = React.useState([]);
  const [tableData, setTableData] = React.useState([]);
  const [selectedArrowColor, setSelectedArrowColor] = React.useState('');

  // navigate
  let navigate = useNavigate();
  // call the dropdown APIs
  useEffect(() => {
    const dropdownListRequest = [
      fetch(`${masterApi}/skill/get/skills`),
      fetch(`${masterApi}/drop-down/get/profileStatus?flag=all`),
      fetch('http://13.126.160.155:8081/locationmaster/city/get/all'),
    ];
    Promise.allSettled(dropdownListRequest)
      .then(async ([skills, sStatus, city]) => {
        const skillsResponse = skills.value;
        const sStatusResponse = sStatus.value;
        const cityResponse = city.value;
        return [
          await skillsResponse.json(),
          await sStatusResponse.json(),
          await cityResponse.json(),
        ];
      })
      .then(([skills, sStatus, city]) =>
        setDropDownList({
          skills: skills?.data ?? [],
          status: sStatus?.data ?? [],
          city: city?.data ?? [],
        })
      );
  }, []);

  // call the api when search changed
  useEffect(() => {
    console.log(1)
    fetch(
      `${masterApi}/worker/get/all/worker?city=${filters?.city}&filter=${filters?.filterName}&pageNo=${filters?.page}&pageSize=${filters?.rowsPerPage}&skills=${filters?.skills}&sortby=${filters?.order}&status=${filters?.status}`
    )
      .then((res) => res.json())
      .then((res) => res.data)
      .then((res) => {
        setTableData(res?.data ?? []);
        setFilters((prevState) => ({
          ...prevState,
          // rowsPerPage: res?.records ?? 20,
          page: res?.page ?? 1,
          count: res?.totalRecords ?? 200,
        }));
      });
  }, [JSON.stringify(filters)]);

  /**
   * @description call the api when user search the name
   * @param {string} value
   */
  const handleChange = (value) =>
    fetch(`${masterApi}/worker/search/user?searchTerm=${value}`)
      .then((res) => res.json())
      .then((searchResult) =>
        setUserInfo(searchResult.data || [{ name: 'No Data' }])
      );

  /** @type {*} */
  const handleSearch = useCallback(debounce(handleChange, 500), []);

  return (
    <Box bgcolor='#e1e2e3' padding='20px' flex={7} sx={{ paddingLeft: '30px' }}>
      {/* //Add Ycw Section section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant='h5' sx={{ fontWeight: '900', paddingTop: '20px' }}>
          Yellow Collar Workers (YCW)
        </Typography>
        <NavLink style={{ textDecoration: 'none' }} to='/ycw/add'>
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
        <Autocomplete
          sx={{ width: '25%', backgroundColor: 'white' }}
          freeSolo
          id='free-solo-2-demo'
          onChange={(_event, newValue) =>
            navigate(
              newValue.profileStatus === 'ACTIVE'
                ? `/ycw/profile/${newValue.userId}`
                : newValue.profileStatus === 'IN_ACTIVE'
                ? `/ycw/add/${newValue.userId}`
                : '/ycw'
            )
          }
          disableClearable
          size='small'
          options={userInfo}
          renderInput={(params) => (
            <Box sx={{ display: 'flex' }}>
              <TextField
                placeholder='Search by Name & Mobile Number'
                onChange={(e) =>
                  e.target.value.length >= 3
                    ? handleSearch(e.target.value)
                    : null
                }
                {...params}
                InputProps={{
                  ...params.InputProps,
                  type: 'search',
                  autoComplete: 'userInfo',
                }}
              />
            </Box>
          )}
          getOptionLabel={(item) =>
            item.name && item.mobile
              ? `${item.name} ${item.mobile} ${item.userId}`
              : ''
          }
        />
        <Autocomplete
          disablePortal
          size='small'
          id='combo-box-demo'
          options={dropDownList?.skills ?? []}
          sx={{ width: '20%' }}
          onChange={(_event, value) =>
            setFilters((prevState) => ({
              ...prevState,
              skills: value?.uuid ?? '',
              page: 1,
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
          options={dropDownList?.status ?? []}
          onChange={(_event, value) =>
            setFilters((prevState) => ({
              ...prevState,
              status: value?.key ?? '',
              page: 1,
            }))
          }
          sx={{ width: '20%' }}
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{ bgcolor: 'white', borderRadius: '5px' }}
              label='Select YCW Status'
            />
          )}
          getOptionLabel={(item) => `${item.value}`}
        />

        <Autocomplete
          disablePortal
          size='small'
          id='combo-box-demo'
          options={dropDownList?.city ?? []}
          sx={{ width: '20%' }}
          onChange={(_event, value) =>
            setFilters((prevState) => ({
              ...prevState,
              city: value?.uuid ?? '',
              page: 1,
            }))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{ bgcolor: 'white', borderRadius: '5px' }}
              label='Select YCW City'
            />
          )}
          getOptionLabel={(item) => `${item.cityName}`}
        />
      </Box>

      {/* Filter Section Like Search and All DropDown Code End */}

      {/* DataTableList code Start From Here*/}
      <Box marginTop={5}>
        <h4> All YCWS ({filters?.count ?? 0})</h4>
        <TableContainer>
          <Table
            sx={{ minWidth: '100%', marginTop: '10px' }}
            aria-label='simple table'
          >
            <TableHead bgColor={'#e1e2e3'}>
              <TableRow>
                {columns.map((column) => (
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
                              filterName: column.key,
                              order: 'asc',
                              page: 1,
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
                              filterName: column.key,
                              order: 'desc',
                              page: 1,
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
              {tableData
                ? tableData.map((item) => (
                    <StyledTableRow
                      onClick={() =>
                        navigate(
                          `/ycw/${
                            routeMapper[item?.profileStatus?.key ?? '']
                          }/${item?.userId ?? ''}`
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
                          borderLeft: item.profileStatus
                            ? (item.profileStatus.value === 'ACTIVE' &&
                                '5px solid #0A9475') ||
                              (item.profileStatus.value === 'INACTIVE' &&
                                '5px solid #F55F71')
                            : '',
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
                        {item?.gender?.value}
                      </TableCell>

                      <TableCell sx={{ fontSize: '13px' }} align='left'>
                        {item.cityName ? item.cityName : '--'}
                      </TableCell>

                      <TableCell sx={{ fontSize: '13px' }} align='left'>
                        {item.primarySkill ? item.primarySkill : '--'}
                      </TableCell>

                      <TableCell sx={{ fontSize: '13px' }} align='left'>
                        {item.totalExperience || '--'}
                      </TableCell>

                      <TableCell sx={{ fontSize: '13px' }} align='left'>
                        {item?.workingHours?.value}
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
                            backgroundColor: item.profileStatus
                              ? (item.profileStatus.value === 'ACTIVE' &&
                                  '#E6F4F1') ||
                                (item.profileStatus.value === 'INACTIVE' &&
                                  '#FEEFF0')
                              : '',
                            color: item.profileStatus
                              ? (item.profileStatus.value === 'ACTIVE' &&
                                  '#0A9475') ||
                                (item.profileStatus.value === 'INACTIVE' &&
                                  '#F55F71')
                              : '',
                          }}
                        >
                          {item.profileStatus ? item.profileStatus.value : '--'}
                        </Typography>
                      </TableCell>
                    </StyledTableRow>
                  ))
                : ''}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      {/* ============ Pagination Code  Start   ==============*/}
      <Box>
        <TablePagination
          rowsPerPageOptions={[20, 40, 60, 100]}
          component='div'
          count={filters.count}
          page={filters.page}
          onPageChange={(_event, page) =>
            setFilters((prevState) => ({ ...prevState, page: page || 1 }))
          }
          rowsPerPage={filters.rowsPerPage}
          onRowsPerPageChange={(event) =>
            setFilters((prevState) => ({
              ...prevState,
              rowsPerPage: parseInt(event.target.value, 10),
              page: 1,
            }))
          }
        />
      </Box>
      {/* ============  Pagination Code  End  ==============*/}
    </Box>
  );
};

export default memo(Ycw);

/*************NPM DEPENDENCIES *****************/
import React, { memo, useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import {
  Box,
  TextField,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Dialog,
} from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import CallIcon from '@mui/icons-material/Call';
import DataUsageOutlinedIcon from '@mui/icons-material/DataUsageOutlined';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import { isEmpty, size, find } from 'lodash';
/*************LOCAL DEPENDENCIES *****************/
import { Axios } from '../../http';
import { get, clear } from './../../store/action';
import { ENDPOINTS } from '../../config/api.config';
import carecrewimg from '../../images/CareCrewImg.png';
import Nav from './../../components/shared/nav/nav';
import Notify from '../../components/Notification/Notify';
import { getDetails } from './../../store/selectors/ycw.selector';
import {
  MODULE_NAME,
  GET_URL_BY_ID,
  BUTTON_LINKS,
  LINKS,
  WHATS_UP,
} from './Ycw.Config';

// Destructuring
const { UPDATE_PROFILE } = ENDPOINTS;

// Styled
const StyledBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#EBECEC',
  padding: '5px',
  boxSizing: 'border-box',
  borderRadius: '5px',
  width: '22%',
  paddingBottom: '30px',
});
const StyledBoxHouseHold = styled(Box)({
  display: 'flex',
  backgroundColor: '#EBECEC',
  padding: '10px',
  boxSizing: 'border-box',
  borderRadius: '5px',
  width: '100%',
  paddingBottom: '30px',
});

const Profile = () => {
  // local state
  const [open, setOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notify, setNotify] = useState({ message: '' });
  // get the id from url
  const { id } = useParams();

  // dispatch
  const dispatch = useDispatch();

  // selector
  const [details] = useSelector((state) => [getDetails(state)], shallowEqual);

  // call the dropdown api
  useEffect(() => {
    dispatch(
      get(MODULE_NAME, [{ ...GET_URL_BY_ID, url: `${GET_URL_BY_ID.url}${id}` }])
    );
    return () => dispatch(clear(MODULE_NAME, 'details', 'detailsById'));
  }, [id, dispatch]);

  /** @type {*} */
  const {
    userData,
    jobRequirement,
    expandLastJob,
    currentAddress,
    permanentAddress,
    skills,
    skillOtherLanguage,
    primarySkillsDto,
    primarySkillsQuestions,
    secondarySkillsDto,
    tertiarySkillsDto,
    bankDetails,
    documents,
    householdMembers,
  } = useMemo(() => {
    const isActive =
      details?.detailsById?.userProfile?.profileStatus === 'ACTIVE' ||
      details?.detailsById?.userProfile?.profileStatus === 'ACTIVE & AVAILABLE';
    setIsActive(isActive);
    return {
      userData: details?.detailsById?.userProfile ?? {},
      jobRequirement: details?.detailsById?.jobRequirementResponseDto ?? {},
      expandLastJob:
        details?.detailsById?.jobRequirementResponseDto
          ?.userExperienceRequestDto ?? {},
      currentAddress: details?.detailsById?.addressDtos?.[0] || {},
      permanentAddress: details?.detailsById?.addressDtos?.[1] || {},
      skills: details?.detailsById?.skillResponseDto ?? {},
      skillOtherLanguage:
        details?.detailsById?.skillResponseDto?.otherLanguage ?? [],
      primarySkillsDto:
        details?.detailsById?.skillResponseDto?.skillsMappingDto?.[0]
          ?.skillDto?.[0] ?? [],
      primarySkillsQuestions:
        details?.detailsById?.skillResponseDto?.skillsMappingDto?.[0]
          ?.skillDto?.[0]?.question ?? [],
      secondarySkillsDto:
        details?.detailsById?.skillResponseDto?.skillsMappingDto?.[1]
          ?.skillDto ?? [],
      tertiarySkillsDto:
        details?.detailsById?.skillResponseDto?.skillsMappingDto?.[2]
          ?.skillDto ?? [],
      bankDetails:
        details?.detailsById?.bankDetailsDtos?.bankDetailsResponse ?? [],
      documents: details?.detailsById?.documentResponseDtos ?? [],
      householdMembers:
        details?.detailsById?.familyMemberDto?.familyMemberDto ?? [],
    };
  }, [details]);

  /**
   * @description
   * @param {*} checked
   */
  const handleActive = (checked) => {
    setIsLoading(true);
    Axios.post(
      `${UPDATE_PROFILE}?profileStatus=${
        checked ? 'ACTIVE' : 'IN_ACTIVE'
      }&userId=${id}`
    )
      .then((res) => res.data)
      .then((res) => {
        if (res?.status) {
          if (res?.data ?? false) {
            setIsActive(checked);
            setIsLoading(false);
            setNotify({ message: 'User Profile Updated Profile' });
            setTimeout(() => setNotify({ message: '' }), 4000);
            dispatch(
              get(MODULE_NAME, [
                { ...GET_URL_BY_ID, url: `${GET_URL_BY_ID.url}${id}` },
              ])
            );
          }
        }
      })
      .catch(() => {
        setIsLoading(false);
        setNotify({ message: 'Server Error', type: 'error' });
        setTimeout(() => setNotify({ message: '' }), 4000);
      });
  };

  return (
    <Box bgcolor='#fafbfb' flex={7}>
      <Notify notify={notify} />
      <Nav
        handleActive={({ target: { checked } }) => handleActive(checked)}
        navDetails={{
          id,
          isLoading,
          status:
            userData?.profileStatus === 'ACTIVE' ||
            userData?.profileStatus === 'ACTIVE & AVAILABLE'
              ? 'ACTIVE'
              : 'INACTIVE',
          active: isActive,
          edit: BUTTON_LINKS.EDIT(id),
          close: BUTTON_LINKS.CLOSE,
          links: LINKS,
        }}
      />
      <Box
        sx={{
          padding: 5,
          bgcolor: 'white',
          borderRadius: 3,
        }}
        app
      >
        <Box>
          <h3 style={{ marginBottom: '6px' }}>Personal Information</h3>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: 4,
            }}
          >
            <TextField
              sx={{ width: '18%' }}
              size='small'
              value={userData ? userData.sourcingChannel : ''}
              label='Sourcing Channel'
              color='secondary'
              InputLabelProps={{ shrink: true }}
              id='outlined-basic'
              variant='filled'
              focused
            />
            <TextField
              sx={{ width: '18%' }}
              size='small'
              value={userData ? userData.otherSourcingChannel : ''}
              label='Other Sourcing Channel'
              color='secondary'
              InputLabelProps={{ shrink: true }}
              id='outlined-basic'
              variant='filled'
              focused
            />
            <TextField
              sx={{ width: '18%' }}
              size='small'
              value={userData ? userData.firstName : ''}
              label='First Name*'
              color='secondary'
              InputLabelProps={{ shrink: true }}
              id='outlined-basic'
              variant='filled'
              focused
            />
            <TextField
              sx={{ width: '18%' }}
              size='small'
              label='Last Name*'
              color='secondary'
              value={userData ? userData.lastName : ''}
              id='outlined-basic'
              variant='filled'
              InputLabelProps={{ shrink: true }}
              focused
            />
            <TextField
              sx={{ width: '18%' }}
              size='small'
              label='gender'
              value={userData?.gender ?? ''}
              color='secondary'
              id='outlined-basic'
              InputLabelProps={{ shrink: true }}
              variant='filled'
              focused
            />
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: 4,
            }}
          >
            <TextField
              sx={{ width: '18%' }}
              size='small'
              color='secondary'
              label='Phone Number*'
              value={userData ? userData.mobileNo : ''}
              id='outlined-basic'
              InputLabelProps={{ shrink: true }}
              variant='filled'
              focused
            />

            <TextField
              sx={{ width: '18%' }}
              size='small'
              color='secondary'
              value={userData ? userData.secondaryMobileNumber : ''}
              id='outlined-basic'
              variant='filled'
              label='Alternate Phone Number*'
              InputLabelProps={{ shrink: true }}
              focused
            />
            <TextField
              sx={{ width: '18%' }}
              size='small'
              value={
                find(WHATS_UP, ['value', userData?.whatsappAvailable ?? ''])
                  ?.label ?? ''
              }
              id='outlined-basic'
              variant='filled'
              color='secondary'
              label='Whatsapp Available '
              InputLabelProps={{ shrink: true }}
              focused
            />
            <TextField
              sx={{ width: '18%' }}
              size='small'
              value={userData ? userData.whatsappNumber : ''}
              id='outlined-basic'
              variant='filled'
              color='secondary'
              label='Whatsapp Number*'
              InputLabelProps={{ shrink: true }}
              focused
            />
            <TextField
              sx={{ width: '18%' }}
              size='small'
              value={userData.birthday ? moment(userData.birthday).utc().format('DD/MM/YYYY') || '' : ''}
              id='outlined-basic'
              variant='filled'
              color='secondary'
              label='DOB*'
              InputLabelProps={{ shrink: true }}
              focused
            />
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: 4,
            }}
          >
            <TextField
              sx={{ width: '18%' }}
              size='small'
              value={userData ? userData.age : ''}
              id='outlined-basic'
              variant='filled'
              color='secondary'
              label='Age'
              InputLabelProps={{ shrink: true }}
              focused
            />
            <TextField
              sx={{ width: '18%' }}
              size='small'
              value={userData?.maritalStatus ?? ''}
              id='outlined-basic'
              variant='filled'
              color='secondary'
              label='Marital Status*'
              InputLabelProps={{ shrink: true }}
              focused
            />

            <TextField
              sx={{ width: '18%' }}
              size='small'
              value={userData?.religion ?? ''}
              id='outlined-basic'
              variant='filled'
              label='Religion'
              color='secondary'
              InputLabelProps={{ shrink: true }}
              focused
            />
            <TextField
              sx={{ width: '18%' }}
              size='small'
              value={userData ? userData.otherReligion : ''}
              id='outlined-basic'
              variant='filled'
              label='Other Religion'
              color='secondary'
              InputLabelProps={{ shrink: true }}
              focused
            />

            <TextField
              sx={{ width: '18%' }}
              size='small'
              value={userData?.nationality ?? ''}
              id='outlined-basic'
              variant='filled'
              color='secondary'
              label='Nationality'
              InputLabelProps={{ shrink: true }}
              focused
            />
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: 4,
            }}
          >
            <TextField
              sx={{ width: '18%' }}
              size='small'
              value={userData ? userData.educationalRemarks : ''}
              id='outlined-basic'
              variant='filled'
              color='secondary'
              label='Educational Remarks'
              InputLabelProps={{ shrink: true }}
              focused
            />
            <TextField
              sx={{ width: '18%' }}
              size='small'
              value={userData?.covidStatus ?? ''}
              id='outlined-basic'
              variant='filled'
              color='secondary'
              label='COVID Vaccination Status*'
              InputLabelProps={{ shrink: true }}
              focused
            />
            <TextField
              sx={{ width: '59%' }}
              size='small'
              value={userData ? userData.medicalCondition : ''}
              id='outlined-basic'
              variant='filled'
              color='secondary'
              label='Medical Condition(if any)'
              InputLabelProps={{ shrink: true }}
              focused
            />
          </Box>

          {/* ========================== Personal Data Section Code End================= */}
          {/* ========================== Skills Section Code Start================= */}
          <Box mt={6}>
            <h3 style={{ marginBottom: '6px' }}>Skill and Language Details</h3>
            <Box
              sx={{
                display: 'flex',
                gap: '2%',
                alignItems: 'center',
                flexWrap: 'wrap',
                mt: 4,
              }}
            >
              <TextField
                sx={{ width: '18%' }}
                size='small'
                value={skills?.primaryLanguage ?? ''}
                id='outlined-basic'
                variant='filled'
                color='secondary'
                label='Primary Language'
                InputLabelProps={{ shrink: true }}
                focused
              />

              <TextField
                sx={{ width: '79.8%' }}
                size='small'
                value={
                  skillOtherLanguage
                    ? skillOtherLanguage.map((item) => item.value)
                    : ''
                }
                id='outlined-basic'
                variant='filled'
                color='secondary'
                label='Other Language'
                InputLabelProps={{ shrink: true }}
                focused
              />
            </Box>
            <Box mt={4}>
              <h4>Primary Skills</h4>
              <Box
                sx={{
                  display: 'flex',
                  gap: '2%',
                  mt: 1,
                  flexWrap: 'wrap',
                }}
              >
                <h3> {primarySkillsDto ? primarySkillsDto.name : ''}</h3>
              </Box>
              <Box
                sx={{
                  gap: '2%',
                  display: 'flex',
                  flexWrap: 'wrap',
                  mt: 2,
                }}
              >
                {primarySkillsQuestions ? (
                  primarySkillsQuestions.map((item) => (
                    <Box width='30%'>
                      <TextField
                        sx={{ width: '100%' }}
                        size='small'
                        value={item.question ? item.question : ''}
                        id='outlined-basic'
                        variant='filled'
                        color='secondary'
                        label='Questions'
                        InputLabelProps={{ shrink: true }}
                        focused
                      />
                      {item.answer.map((value) => (
                        <Box mt={2} sx={{ width: '100%' }}>
                          <TextField
                            sx={{ width: '100%' }}
                            size='small'
                            value={value || ''}
                            id='outlined-basic'
                            variant='filled'
                            color='secondary'
                            label='Answer'
                            InputLabelProps={{ shrink: true }}
                            focused
                          />
                        </Box>
                      ))}
                    </Box>
                  ))
                ) : (
                  <Box mt={1}>
                    <h5>No Questions</h5>
                  </Box>
                )}
              </Box>
            </Box>
            <Box mt={4}>
              <h4>Secondary Skills</h4>
              <Box
                sx={{
                  display: 'flex',
                  mt: 1,
                  flexWrap: 'wrap',
                }}
              >
                {secondarySkillsDto
                  ? secondarySkillsDto.map((item) => (
                      <Box>
                        <h3>{item.name}</h3>
                        <Box sx={{ display: 'flex', gap: '2%', width: '100%' }}>
                          {item.question ? (
                            item.question.map((value) => (
                              <Box mt={2}>
                                <TextField
                                  // sx={{ width: '350px' }}
                                  size='small'
                                  value={value.question ? value.question : ''}
                                  id='outlined-basic'
                                  variant='filled'
                                  color='secondary'
                                  label='Question'
                                  InputLabelProps={{ shrink: true }}
                                  focused
                                />
                                {value.answer.map((result) => (
                                  <Box sx={{ display: 'flex' }} mt={1}>
                                    <TextField
                                      // sx={{ width: '350px' }}
                                      size='small'
                                      value={result || ''}
                                      id='outlined-basic'
                                      variant='filled'
                                      color='secondary'
                                      label='Answer'
                                      InputLabelProps={{ shrink: true }}
                                      focused
                                    />
                                  </Box>
                                ))}
                              </Box>
                            ))
                          ) : (
                            <Box mt={1}>
                              <h5>No Questions</h5>
                            </Box>
                          )}
                        </Box>
                      </Box>
                    ))
                  : ''}
              </Box>
            </Box>
            <Box mt={4}>
              <h4>Tertiary Skills</h4>
              <Box
                sx={{
                  // display: "flex",
                  gap: '2%',
                  mt: 1,
                  flexWrap: 'wrap',
                }}
              >
                {tertiarySkillsDto
                  ? tertiarySkillsDto.map((item) => (
                      <Box
                        mt={2}
                        sx={{ display: 'flex', flexDirection: 'column' }}
                      >
                        <h3> {item.name}</h3>
                        <Box sx={{ display: 'flex', gap: '2%' }}>
                          {item.question ? (
                            item.question.map((value) => (
                              <Box mt={2}>
                                <TextField
                                  // sx={{ width: '350px' }}
                                  size='small'
                                  value={value.question ? value.question : null}
                                  label='Questions'
                                  color='secondary'
                                  InputLabelProps={{ shrink: true }}
                                  id='outlined-basic'
                                  variant='filled'
                                  focused
                                />
                                {value.answer.map((result) => (
                                  <Box sx={{ display: 'flex' }} mt={1}>
                                    <TextField
                                      // sx={{ width: '350px' }}
                                      size='small'
                                      value={result || ''}
                                      id='outlined-basic'
                                      variant='filled'
                                      color='secondary'
                                      label='Answer'
                                      InputLabelProps={{ shrink: true }}
                                      focused
                                    />
                                  </Box>
                                ))}
                              </Box>
                            ))
                          ) : (
                            <Box mt={1}>
                              <h5>No Questions</h5>
                            </Box>
                          )}
                        </Box>
                      </Box>
                    ))
                  : ''}
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                gap: '2%',
                mt: 2,
                flexWrap: 'wrap',
              }}
            >
              <TextField
                // sx={{ width: '100%' }}
                size='small'
                value={skills ? skills.skillRemarks : ''}
                id='outlined-basic'
                variant='filled'
                color='secondary'
                label='Skills Remarks'
                InputLabelProps={{ shrink: true }}
                focused
              />
            </Box>
          </Box>
          {/* ========================== Skills Section Code End================= */}
          {/* ========================== Job Requirement Section Code Start================= */}

          <Box mt={6}>
            <h3 style={{ marginBottom: '6px' }}>Job Requirement</h3>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                mt: 4,
                gap: '32px',
              }}
            >
              <TextField
                sx={{ width: '18%' }}
                size='small'
                value={jobRequirement ? jobRequirement.skillName : ''}
                id='outlined-basic'
                variant='filled'
                color='secondary'
                label='Job Type'
                InputLabelProps={{ shrink: true }}
                focused
              />

              <TextField
                sx={{ width: '18%' }}
                size='small'
                value={jobRequirement ? jobRequirement.otherSkillUuid : ''}
                id='outlined-basic'
                variant='filled'
                color='secondary'
                label='Other Job Type'
                InputLabelProps={{ shrink: true }}
                focused
              />

              <TextField
                sx={{ width: '18%' }}
                size='small'
                value={jobRequirement?.workingHoursName ?? ''}
                id='outlined-basic'
                variant='filled'
                color='secondary'
                label='Working Hours'
                InputLabelProps={{ shrink: true }}
                focused
              />

              <TextField
                sx={{ width: '18%' }}
                size='small'
                value={jobRequirement.startTime ? moment(jobRequirement.startTime).format('LT') || '' : ''}
                id='outlined-basic'
                variant='filled'
                color='secondary'
                label='Start Time'
                InputLabelProps={{ shrink: true }}
                focused
              />

              <TextField
                sx={{ width: '18%' }}
                size='small'
                value={jobRequirement.endTime ? moment(jobRequirement.endTime).format('LT') || '' : ''}
                id='outlined-basic'
                variant='filled'
                color='secondary'
                label='End Time'
                InputLabelProps={{ shrink: true }}
                focused
              />

              {/* <TextField
                sx={{ width: '18%' }}
                size='small'
                value={
                  jobRequirement ? jobRequirement.totalSimultaneousJob : ''
                }
                id='outlined-basic'
                variant='filled'
                color='secondary'
                label='Total Simultaneous Job'
                InputLabelProps={{ shrink: true }}
                focused
              /> */}

              <TextField
                sx={{ width: '18%' }}
                size='small'
                value={
                  jobRequirement ? jobRequirement.minSalaryExpectedStr : ''
                }
                id='outlined-basic'
                variant='filled'
                color='secondary'
                label='Min Salary Expected'
                InputLabelProps={{ shrink: true }}
                focused
              />
              <TextField
                sx={{ width: '18%' }}
                size='small'
                value={
                  jobRequirement ? jobRequirement.maxSalaryExpectedStr : ''
                }
                id='outlined-basic'
                variant='filled'
                color='secondary'
                label='Max Salary Expected'
                InputLabelProps={{ shrink: true }}
                focused
              />

              <TextField
                sx={{ width: '18%' }}
                size='small'
                value={jobRequirement ? jobRequirement.openToTraining : ''}
                id='outlined-basic'
                variant='filled'
                color='secondary'
                label='Open To Training'
                InputLabelProps={{ shrink: true }}
                focused
              />
              <TextField
                sx={{ width: '18%' }}
                size='small'
                value={jobRequirement ? jobRequirement.traningMode : ''}
                id='outlined-basic'
                variant='filled'
                color='secondary'
                label='Traning Mode'
                InputLabelProps={{ shrink: true }}
                focused
              />
              <TextField
                sx={{ width: '18%' }}
                size='small'
                value={jobRequirement ? jobRequirement.jobRemarks : ''}
                id='outlined-basic'
                variant='filled'
                color='secondary'
                label='Job Remarks'
                InputLabelProps={{ shrink: true }}
                focused
              />
              <TextField
                sx={{ width: '18%' }}
                size='small'
                value={jobRequirement ? jobRequirement.vehicle : ''}
                id='outlined-basic'
                variant='filled'
                color='secondary'
                label='Vehicle'
                InputLabelProps={{ shrink: true }}
                focused
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mt: 4,
              }}
            ></Box>
          </Box>
          <Box mt={6}>
            <h3 style={{ marginBottom: '6px' }}>Job Experience Details</h3>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '32px',
                alignItems: 'center',
                mt: 4,
              }}
            >
              <TextField
                sx={{ width: '18%' }}
                size='small'
                value={expandLastJob ? expandLastJob.experienceRemarks : ''}
                id='outlined-basic'
                variant='filled'
                color='secondary'
                label='Experience Remarks'
                InputLabelProps={{ shrink: true }}
                focused
              />
              <TextField
                sx={{ width: '18%' }}
                size='small'
                value={expandLastJob ? expandLastJob.totalExperienceYears : ''}
                id='outlined-basic'
                variant='filled'
                color='secondary'
                label='Total Experience in Years'
                InputLabelProps={{ shrink: true }}
                focused
              />

              <TextField
                sx={{ width: '18%' }}
                size='small'
                value={expandLastJob ? expandLastJob.totalExperienceMonths : ''}
                id='outlined-basic'
                variant='filled'
                color='secondary'
                label='Total Experience in Months'
                InputLabelProps={{ shrink: true }}
                focused
              />

              <TextField
                sx={{ width: '18%' }}
                size='small'
                value={expandLastJob ? expandLastJob.jobTypeName : ''}
                id='outlined-basic'
                variant='filled'
                color='secondary'
                label='Last Job Type'
                InputLabelProps={{ shrink: true }}
                focused
              />

              <TextField
                sx={{ width: '18%' }}
                size='small'
                value={expandLastJob ? expandLastJob.otherJobTypeUuid : ''}
                id='outlined-basic'
                variant='filled'
                color='secondary'
                label='Other Last Job Type'
                InputLabelProps={{ shrink: true }}
                focused
              />

              <TextField
                sx={{ width: '18%' }}
                size='small'
                value={
                  expandLastJob ? expandLastJob.reasonForLeavingJobName : ''
                }
                id='outlined-basic'
                variant='filled'
                color='secondary'
                label='Reason For Leaving Job'
                InputLabelProps={{ shrink: true }}
                focused
              />

              <TextField
                sx={{ width: '18%' }}
                size='small'
                value={
                  expandLastJob ? expandLastJob.otherReasonForLeavingJob : ''
                }
                id='outlined-basic'
                variant='filled'
                color='secondary'
                label='Other Reason For Leaving Job'
                InputLabelProps={{ shrink: true }}
                focused
              />

              <TextField
                sx={{ width: '18%' }}
                size='small'
                value={expandLastJob ? expandLastJob.jobDurationMonths : ''}
                id='outlined-basic'
                variant='filled'
                color='secondary'
                label='Last Job Duration in Months'
                InputLabelProps={{ shrink: true }}
                focused
              />

              <TextField
                sx={{ width: '18%' }}
                size='small'
                value={expandLastJob ? expandLastJob.jobDurationYears : ''}
                id='outlined-basic'
                variant='filled'
                color='secondary'
                label='Last Job Duration in Years'
                InputLabelProps={{ shrink: true }}
                focused
              />
              <Box sx={{ width: '18%' }}></Box>
              <Box sx={{ width: '18%' }}></Box>
              <Box sx={{ width: '18%' }}></Box>
            </Box>
          </Box>
          {/* ========================== Job Requirement Section Code End================= */}
          {/* ========================== Current Address Data Section Code Start================= */}

          <Box mt={6}>
            <h3 style={{ marginBottom: '6px' }}>Current Address</h3>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                mt: 4,
              }}
            >
              <TextField
                sx={{ width: '18%' }}
                size='small'
                value={currentAddress ? currentAddress.addressLine1 : ''}
                id='outlined-basic'
                variant='filled'
                color='secondary'
                label='Flat/Building'
                InputLabelProps={{ shrink: true }}
                focused
              />
              <TextField
                sx={{ width: '18%' }}
                size='small'
                value={currentAddress ? currentAddress.addressLine2 : ''}
                id='outlined-basic'
                variant='filled'
                color='secondary'
                label='Society/Colony/Area'
                InputLabelProps={{ shrink: true }}
                focused
              />

              <TextField
                sx={{ width: '18%' }}
                size='small'
                value={currentAddress ? currentAddress.landmark : ''}
                id='outlined-basic'
                variant='filled'
                color='secondary'
                label='Landmark'
                InputLabelProps={{ shrink: true }}
                focused
              />

              <TextField
                sx={{ width: '18%' }}
                size='small'
                value={currentAddress ? currentAddress.postalCode : ''}
                id='outlined-basic'
                variant='filled'
                color='secondary'
                label='Pin Code'
                InputLabelProps={{ shrink: true }}
                focused
              />

              <TextField
                sx={{ width: '18%' }}
                size='small'
                value={currentAddress ? currentAddress.countryName : ''}
                id='outlined-basic'
                variant='filled'
                color='secondary'
                label='Country'
                InputLabelProps={{ shrink: true }}
                focused
              />
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mt: 4,
              }}
            >
              <TextField
                sx={{ width: '18%' }}
                size='small'
                value={currentAddress ? currentAddress.stateName : ''}
                id='outlined-basic'
                variant='filled'
                color='secondary'
                label='State'
                InputLabelProps={{ shrink: true }}
                focused
              />
              <TextField
                sx={{ width: '18%' }}
                size='small'
                value={currentAddress ? currentAddress.cityName : ''}
                id='outlined-basic'
                variant='filled'
                color='secondary'
                label='City'
                InputLabelProps={{ shrink: true }}
                focused
              />

              <TextField
                sx={{ width: '18%' }}
                size='small'
                value={currentAddress ? currentAddress.micromarketName : ''}
                id='outlined-basic'
                variant='filled'
                color='secondary'
                label='Supply Hub'
                InputLabelProps={{ shrink: true }}
                focused
              />
              <TextField
                sx={{ width: '18%' }}
                size='small'
                value={currentAddress?.addressProofType ?? ''}
                id='outlined-basic'
                variant='filled'
                color='secondary'
                label='Current Address Proof Type'
                InputLabelProps={{ shrink: true }}
                focused
              />
              <TextField
                sx={{ width: '18%' }}
                size='small'
                value={
                  currentAddress ? currentAddress.otherAddressProofType : ''
                }
                id='outlined-basic'
                variant='filled'
                color='secondary'
                label='Other Current Address Proof Type'
                InputLabelProps={{ shrink: true }}
                focused
              />
            </Box>
          </Box>
          {/* ========================== Current Address Data Section Code End================= */}
          {/* ========================== Permanent Address Data Section Code Start================= */}
          <Box mt={6}>
            <h3 style={{ marginBottom: '6px' }}>Permanent Address</h3>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mt: 4,
              }}
            >
              <TextField
                sx={{ width: '18%' }}
                size='small'
                value={permanentAddress ? permanentAddress.addressLine1 : ''}
                id='outlined-basic'
                variant='filled'
                color='secondary'
                label='Flat/Building'
                InputLabelProps={{ shrink: true }}
                focused
              />
              <TextField
                sx={{ width: '18%' }}
                size='small'
                value={permanentAddress ? permanentAddress.addressLine2 : ''}
                id='outlined-basic'
                variant='filled'
                color='secondary'
                label='Society/Colony/Area'
                InputLabelProps={{ shrink: true }}
                focused
              />

              <TextField
                sx={{ width: '18%' }}
                size='small'
                value={permanentAddress ? permanentAddress.landmark : ''}
                id='outlined-basic'
                variant='filled'
                color='secondary'
                label='Landmark'
                InputLabelProps={{ shrink: true }}
                focused
              />

              <TextField
                sx={{ width: '18%' }}
                size='small'
                value={permanentAddress ? permanentAddress.postalCode : ''}
                id='outlined-basic'
                variant='filled'
                color='secondary'
                label='Pin Code'
                InputLabelProps={{ shrink: true }}
                focused
              />

              <TextField
                sx={{ width: '18%' }}
                size='small'
                value={permanentAddress ? permanentAddress.countryName : ''}
                id='outlined-basic'
                variant='filled'
                color='secondary'
                label='Country'
                InputLabelProps={{ shrink: true }}
                focused
              />
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mt: 4,
              }}
            >
              <TextField
                sx={{ width: '18%' }}
                size='small'
                value={permanentAddress ? permanentAddress.stateName : ''}
                id='outlined-basic'
                variant='filled'
                color='secondary'
                label='State'
                InputLabelProps={{ shrink: true }}
                focused
              />
              <TextField
                sx={{ width: '18%' }}
                size='small'
                value={permanentAddress ? permanentAddress.cityName : ''}
                id='outlined-basic'
                variant='filled'
                color='secondary'
                label='City'
                InputLabelProps={{ shrink: true }}
                focused
              />

              <TextField
                sx={{ width: '18%' }}
                size='small'
                value={permanentAddress ? permanentAddress.micromarketName : ''}
                id='outlined-basic'
                variant='filled'
                color='secondary'
                label='Supply Hub'
                InputLabelProps={{ shrink: true }}
                focused
              />
              <TextField
                sx={{ width: '18%' }}
                size='small'
                value={permanentAddress?.addressProofType ?? ''}
                id='outlined-basic'
                variant='filled'
                color='secondary'
                label='Permanent Address Proof Type'
                InputLabelProps={{ shrink: true }}
                focused
              />

              <TextField
                sx={{ width: '18%' }}
                size='small'
                value={
                  permanentAddress ? permanentAddress.otherAddressProofType : ''
                }
                id='outlined-basic'
                variant='filled'
                color='secondary'
                label='Other Permanent Address Proof Type'
                InputLabelProps={{ shrink: true }}
                focused
              />
            </Box>
          </Box>
          {/* ========================== Permanent Address Data Section Code End================= */}
          {/* ========================== Bank Details Section Code Start================= */}
          {!isEmpty(bankDetails) && size(bankDetails) !== 0 ? (
            <Box mt={6}>
              <h3 style={{ marginBottom: '6px' }}>Bank Details</h3>
              {bankDetails
                ? bankDetails.map((item) => (
                    <Box sx={{ dispkay: 'flex' }}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          mt: 4,
                          flexWrap: 'wrap',
                        }}
                      >
                        <TextField
                          sx={{ width: '18%' }}
                          size='small'
                          value={item.accountHolderName}
                          id='outlined-basic'
                          variant='filled'
                          color='secondary'
                          label='Account Holder Name'
                          InputLabelProps={{ shrink: true }}
                          focused
                        />
                        <TextField
                          sx={{ width: '18%' }}
                          size='small'
                          value={item.accountNumber}
                          id='outlined-basic'
                          variant='filled'
                          color='secondary'
                          label='Account Number'
                          InputLabelProps={{ shrink: true }}
                          focused
                        />
                        <TextField
                          sx={{ width: '18%' }}
                          size='small'
                          value={item.accountType}
                          id='outlined-basic'
                          variant='filled'
                          color='secondary'
                          label='Account Type'
                          InputLabelProps={{ shrink: true }}
                          focused
                        />
                        <TextField
                          sx={{ width: '18%' }}
                          size='small'
                          value={item.bankName}
                          id='outlined-basic'
                          variant='filled'
                          color='secondary'
                          label='Bank Name'
                          InputLabelProps={{ shrink: true }}
                          focused
                        />

                        <TextField
                          sx={{ width: '18%' }}
                          size='small'
                          value={item.ifscCode}
                          id='outlined-basic'
                          variant='filled'
                          color='secondary'
                          label='IFSC Code'
                          InputLabelProps={{ shrink: true }}
                          focused
                        />
                      </Box>

                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          mt: 4,
                        }}
                      >
                        <TextField
                          sx={{ width: '18%' }}
                          size='small'
                          value={item.branchName}
                          id='outlined-basic'
                          variant='filled'
                          color='secondary'
                          label='Branch Name'
                          InputLabelProps={{ shrink: true }}
                          focused
                        />

                        <TextField
                          sx={{ width: '79.8%' }}
                          size='small'
                          value={item.branchAddress}
                          id='outlined-basic'
                          variant='filled'
                          color='secondary'
                          label='Branch Address'
                          InputLabelProps={{ shrink: true }}
                          focused
                        />
                      </Box>
                    </Box>
                  ))
                : ''}
            </Box>
          ) : null}
          {/* ========================== Bank Details Section Code End================= */}
          {/* ========================== Documents Section Code Start================= */}
          {!isEmpty(documents) && size(documents) !== 0 ? (
            <Box mt={6}>
              <h3 style={{ marginBottom: '6px' }}>Documents</h3>
              <Box
                mt={3}
                sx={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}
              >
                {documents
                  ? documents.map((item) => (
                      // <Box>
                      <StyledBox>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            flexDirection: 'column',
                            gap: '10px',
                            alignItems: 'center',
                            mt: 4,
                          }}
                        >
                          <Box>
                            <BookmarkBorderIcon />
                            <TextField
                              size='small'
                              value={item.documentContext}
                              id='outlined-basic'
                              variant='filled'
                              color='secondary'
                              label='Document Context Type'
                              InputLabelProps={{ shrink: true }}
                              focused
                            />
                          </Box>
                          <Box>
                            <BookmarkBorderIcon />
                            <TextField
                              size='small'
                              value={item.documentUploadType}
                              id='outlined-basic'
                              variant='filled'
                              color='secondary'
                              label='Document Upload Type'
                              InputLabelProps={{ shrink: true }}
                              focused
                            />
                          </Box>
                          <Box>
                            <AttachFileIcon />
                            <TextField
                              size='small'
                              value={item.fileName}
                              id='outlined-basic'
                              variant='filled'
                              color='secondary'
                              label='File Name'
                              InputLabelProps={{ shrink: true }}
                              focused
                            />
                          </Box>
                        </Box>
                        <Box ml={6} mt={2}>
                          <a href={item.fileUrl} target='blank' download>
                            <img
                              width='90%'
                              src={item.fileUrl}
                              alt={item.fileUrl}
                            />
                          </a>
                        </Box>
                      </StyledBox>
                      // </Box>
                    ))
                  : ''}
              </Box>
            </Box>
          ) : null}
          {/* ========================== Documents Section Code End================= */}
          {/* ==========================Household Members Information Code Start================= */}
          {!isEmpty(householdMembers) && size(householdMembers) !== 0 ? (
            <Box mt={6}>
              <h3 style={{ marginBottom: '6px' }}>
                Household Members Information
              </h3>
              <Box mt={3} sx={{ display: 'flex', gap: '3%', flexWrap: 'wrap' }}>
                {householdMembers
                  ? householdMembers.map((item) => (
                      <StyledBoxHouseHold>
                        <Box
                          sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '25px',
                            justifyContent: 'space-between',
                            mt: 4,
                          }}
                        >
                          <Box sx={{ width: '18%' }}>
                            <PersonOutlineIcon
                              sx={{
                                color: 'action.active',
                                mr: 1,
                                my: 0.5,
                                marginTop: '15px',
                              }}
                            />

                            <TextField
                              size='small'
                              value={item.name}
                              id='outlined-basic'
                              variant='standard'
                              color='secondary'
                              label='Name'
                              InputLabelProps={{ shrink: true }}
                              focused
                            />
                          </Box>

                          <Box sx={{ width: '18%' }}>
                            <WorkIcon
                              sx={{
                                color: 'action.active',
                                mr: 1,
                                my: 0.5,
                                marginTop: '15px',
                              }}
                            />
                            <TextField
                              size='small'
                              value={item.jobTypeName}
                              id='outlined-basic'
                              variant='standard'
                              color='secondary'
                              label='Occupation'
                              InputLabelProps={{ shrink: true }}
                              focused
                            />
                          </Box>

                          <Box sx={{ width: '18%' }}>
                            <WorkIcon
                              sx={{
                                color: 'action.active',
                                mr: 1,
                                my: 0.5,
                                marginTop: '15px',
                              }}
                            />
                            <TextField
                              size='small'
                              value={item.otherJobType}
                              id='outlined-basic'
                              variant='standard'
                              color='secondary'
                              label='Other Occupation'
                              InputLabelProps={{ shrink: true }}
                              focused
                            />
                          </Box>

                          <Box sx={{ width: '18%' }}>
                            <PersonAddAltIcon
                              sx={{
                                color: 'action.active',
                                mr: 1,
                                my: 0.5,
                                marginTop: '15px',
                              }}
                            />
                            <TextField
                              size='small'
                              value={item?.relationshipName ?? ''}
                              id='outlined-basic'
                              variant='standard'
                              color='secondary'
                              label='Relationship'
                              InputLabelProps={{ shrink: true }}
                              focused
                            />
                          </Box>
                          <Box sx={{ width: '18%' }}>
                            <PersonAddAltIcon
                              sx={{
                                color: 'action.active',
                                mr: 1,
                                my: 0.5,
                                marginTop: '15px',
                              }}
                            />
                            <TextField
                              size='small'
                              value={item.otherrRlationship}
                              id='outlined-basic'
                              variant='standard'
                              color='secondary'
                              label='Other Relationship'
                              InputLabelProps={{ shrink: true }}
                              focused
                            />
                          </Box>

                          <Box sx={{ width: '18%' }}>
                            <CallIcon
                              sx={{
                                color: 'action.active',
                                mr: 1,
                                my: 0.5,
                                marginTop: '15px',
                              }}
                            />
                            <TextField
                              size='small'
                              value={item.mobileNo}
                              id='outlined-basic'
                              variant='standard'
                              color='secondary'
                              label='Mobile Number'
                              InputLabelProps={{ shrink: true }}
                              focused
                            />
                          </Box>
                          <Box sx={{ width: '18%' }}>
                            <DataUsageOutlinedIcon
                              sx={{
                                color: 'action.active',
                                mr: 1,
                                my: 0.5,
                                marginTop: '15px',
                              }}
                            />
                            <TextField
                              size='small'
                              value={item.age}
                              id='outlined-basic'
                              variant='standard'
                              color='secondary'
                              label='Age'
                              InputLabelProps={{ shrink: true }}
                              focused
                            />
                          </Box>

                          <Box sx={{ width: '59%' }}>
                            <LocationOnIcon
                              sx={{
                                color: 'action.active',
                                mr: 1,
                                my: 0.5,
                                marginTop: '15px',
                              }}
                            />
                            <TextField
                              size='small'
                              sx={{ width: '95.5%' }}
                              value={item.address}
                              id='outlined-basic'
                              variant='standard'
                              color='secondary'
                              label='Address'
                              InputLabelProps={{ shrink: true }}
                              focused
                            />
                          </Box>
                        </Box>
                      </StyledBoxHouseHold>
                    ))
                  : ''}
              </Box>
            </Box>
          ) : null}
          {/* ==========================Household Members Information Code End================= */}
        </Box>
        {/* ==========================Id card Information Code Start================= */}
        <Box mt={4}>
          <h3 style={{ marginBottom: '6px' }}>ID Card</h3>

          <Card
            sx={{ maxWidth: 367, marginTop: '30px' }}
            onClick={() => setOpen(!open)}
          >
            <CardActionArea>
              <Box sx={{ backgroundColor: 'yellow', padding: '10px' }}>
                <img
                  sx={{ padding: '5px' }}
                  height='50px'
                  width='320px'
                  src={carecrewimg}
                  alt='Care Crew'
                />
              </Box>
              <CardContent>
                <Typography variant='body2'>
                  <Box sx={{ display: 'flex', gap: '29px' }}>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        gap: '3px',
                        fontWeight: 900,
                        fontSize: '16px',
                      }}
                    >
                      <h4>Registration ID: </h4>
                      <h4>Name: </h4>
                      <h4>Location: </h4>
                      <h4>Working Time: </h4>
                      <h4>Experience: </h4>
                      <h4> Monthly Salary: </h4>
                      <h4> Proof of Id: </h4>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        gap: '5px',
                        fontWeight: 400,
                        color: 'black',
                        fontSize: '15px',
                      }}
                    >
                      <p>{id || ''}</p>
                      <p>
                        {userData?.firstName ?? '--'} {userData?.lastName ?? ''}
                      </p>
                      <p>
                        {currentAddress?.micromarketName ?? ''},{' '}
                        {currentAddress?.cityName ?? ''}
                      </p>
                      <p>{jobRequirement?.workingHoursName ?? '--'}</p>
                      <p>{expandLastJob?.totalExperienceYears ?? '--'} Years</p>
                      <p>
                        &#8377; {jobRequirement?.maxSalaryExpectedStr ?? '--'}
                      </p>
                      <p>{currentAddress?.addressProofType ?? '--'}</p>
                    </Box>
                  </Box>
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Box>

        {/* ==========================Id Card Information Code End================= */}
        {/* =============  Id card Open     ============       */}

        <Dialog
          open={open}
          onClose={() => setOpen(!open)}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <Card sx={{ maxWidth: 450 }} onClick={() => setOpen(!open)}>
            <CardActionArea>
              <Box sx={{ backgroundColor: 'yellow', padding: '14px' }}>
                <img
                  sx={{ padding: '5px' }}
                  height='50px'
                  width='320px'
                  src={carecrewimg}
                  alt='Care Crew'
                />
              </Box>
              <CardContent>
                <Typography variant='body2'>
                  <Box sx={{ display: 'flex', gap: '30px' }}>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        gap: '3px',
                        fontWeight: 900,
                        fontSize: '16px',
                      }}
                    >
                      <h4>Registration ID: </h4>
                      <h4>Name: </h4>
                      <h4>Location: </h4>
                      <h4>Working Time: </h4>
                      <h4>Experience: </h4>
                      <h4>Monthly Salary: </h4>
                      <h4>Proof of Id: </h4>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        gap: '5px',
                        fontWeight: 400,
                        color: 'black',
                        fontSize: '15px',
                      }}
                    >
                      <p>{id || ''}</p>
                      <p>
                        {userData?.firstName ?? '--'} {userData?.lastName ?? ''}
                      </p>
                      <p>
                        {currentAddress?.micromarketName ?? ''},{' '}
                        {currentAddress?.cityName ?? ''}
                      </p>
                      <p>{jobRequirement?.workingHoursName ?? '--'}</p>
                      <p>{expandLastJob?.totalExperienceYears ?? '--'} Years</p>
                      <p>
                        &#8377; {jobRequirement?.maxSalaryExpectedStr ?? '--'}
                      </p>
                      <p>{currentAddress?.addressProofType ?? '--'}</p>
                    </Box>
                  </Box>
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Dialog>

        {/* ========== Id card Open  =========== */}
      </Box>
    </Box>
  );
};

// Default Export
export default memo(Profile);

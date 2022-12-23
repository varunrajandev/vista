/*****************NPM DEPENDENCIES ****************/
import React, { useContext, useEffect, useState } from 'react';
import { Button, Box, Typography, LinearProgress } from '@mui/material';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';
import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { isEmpty, get } from 'lodash';
/******************LOCAL DEPENDENCIES ************/
import { masterApi } from '../../../AllData';
import { multiStepContext } from '../../../ContextApi/StepContext';
import FormControlSingleSelect from '../../MuiComponents/FormControlSingleSelect';
import Notify from '../../Notification/Notify';

// Styled Component
const Div2 = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

/**
 * @description
 * @param {*} [documentContext=[]]
 * @param {*} [documentType=[]]
 * @param {*} [document=[]]
 */
const getDocState = (
  documentContext = [],
  documentType = [],
  document = []
) => ({ document, documentContext, documentType });

// Service State
const serviceState = getDocState();

// Documents State
const documentsState = {
  profile: getDocState('PROFILE_PICTURE', 'OTHERS', ''),
  card: getDocState('KYC', 'AADHAAR_CARD', ''),
  address: getDocState('KYC', 'OTHERS', ''),
  vaccination: getDocState('KYC', 'VACCINATION_CERTIFICATE', ''),
  random: getDocState('', '', ''),
};

const DocumentDetails = () => {
  // local state
  const [services, setServices] = useState(serviceState);
  const [documents, setDocuments] = useState(documentsState);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  });

  // get id from url
  const { id } = useParams();
  // get id from local storage
  const ID = localStorage.getItem('ID');
  // update steps
  const { setCurrentSteps } = useContext(multiStepContext);

  // call th api
  useEffect(() => {
    const urls = [
      fetch(
        `http://13.126.160.155:8080/user/drop-down/get/documentUploadType?flag`
      ),
      fetch('http://13.126.160.155:8080/user/drop-down/get/documentContext'),
      fetch(`http://13.126.160.155:8080/user/document/all/${id || ID}`),
    ];
    Promise.allSettled(urls)
      .then(async ([documentType, documentContext, document]) => {
        const documentTypeResponse = documentType.value;
        const documentContextResponse = documentContext.value;
        const documentResponse = document.value;
        return [
          await documentTypeResponse.json(),
          await documentContextResponse.json(),
          await documentResponse.json(),
        ];
      })
      .then(([documentType, documentContext, document]) =>
        setServices({
          documentType: documentType?.data ?? [],
          documentContext: documentContext?.data ?? [],
          document: document?.data ?? [],
        })
      );
  }, [id, ID]);

  /**
   * @description
   * @param {*} stateName
   */
  const checkDisabled = stateName => isEmpty(get(documents, `${stateName}.documentType`)) ? true : isEmpty(get(documents, `${stateName}.documentContext`)) ? true : false
  
  /**
   * @description
   * @param {*} file
   * @param {*} stateName
   */
  const handleFileUpload = (file, stateName) => {
    // update the state with updated file name
    setDocuments((prevState) => ({
      ...prevState,
      [stateName]: { ...prevState[stateName], document: file?.name ?? '' },
    }));
    if (id || ID) {
      const document = new FormData();
      document.append('document', file);
      try {
        axios
          .post(
            `${masterApi}/document/upload?UserId=${id || ID}&documentContext=${
              documents[stateName].documentContext
            }&documentSide=FRONT&documentType=${
              documents[stateName].documentType
            }&isActive=true&isReuploaded=false`,
            document
          )
          .then((res) => {
            if (res.data) {
              setNotify({
                isOpen: res.data.status,
                message: res.data.message,
                type: 'success',
              });
              fetch(`http://13.126.160.155:8080/user/document/all/${id || ID}`)
                .then((res) => res.json())
                .then((res) =>
                  setServices((prevState) => ({
                    ...prevState,
                    document: res?.data ?? [],
                  }))
                );
            }
          });
      } catch (error) {
        setNotify({
          isOpen: true,
          message: error?.message ?? '',
          type: 'error',
        });
      }
    }
  };

  return (
    <Box bgcolor='#e1e2e3' padding='20px' flex={7} minWidth={'90%'}>
      <Notify notify={notify} />
      <Box marginTop={5} sx={{ padding: 3, bgcolor: 'white', borderRadius: 3 }}>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            rowGap: '30px',
            justifyContent: 'space-between',
          }}
        >
          {/* First Document */}
          <Box
            sx={{
              width: '20%',
              display: 'grid',
              backgroundColor: '#e7c6f0',
              padding: '30px',
              boxSizing: 'borderBox',
            }}
          >
            <Div2>
              <TextSnippetOutlinedIcon />
              <p style={{ fontSize: '13px', fontWeight: 'bolder' }}>
                {' '}
                PROFILE PICTURE{' '}
              </p>
            </Div2>
            <Box display={'flex'} gap={'10px'} alignItems={'center'}>
              <Typography>
                <Button
                  upload
                  component='label'
                  startIcon={<AttachFileOutlinedIcon />}
                  color='secondary'
                >
                  Upload Document
                  <input
                    hidden
                    type='file'
                    name='file'
                    onChange={({ target: { files } }) =>
                      handleFileUpload(files[0], 'profile')
                    }
                  />
                </Button>
              </Typography>
            </Box>
            <LinearProgress />
            <h5>{documents?.profile?.document ?? ''}</h5>
          </Box>

          {/* Second Document */}
          <Box
            sx={{
              width: '20%',
              display: 'grid',
              gap: '20px',
              backgroundColor: '#e7c6f0',
              padding: '30px',
              boxSizing: 'borderBox',
            }}
          >
            <Div2>
              <TextSnippetOutlinedIcon />
              <p style={{ fontSize: '13px', fontWeight: 'bolder' }}>
                {' '}
                AADHAAR CARD{' '}
              </p>
            </Div2>
            <Box display={'flex'} gap={'10px'} alignItems={'center'}>
              <Typography>
                <Button
                  upload
                  component='label'
                  startIcon={<AttachFileOutlinedIcon />}
                  color='secondary'
                >
                  Upload Document
                  <input
                    hidden
                    type='file'
                    name='file'
                    onChange={({ target: { files } }) =>
                      handleFileUpload(files[0], 'card')
                    }
                  />
                </Button>
              </Typography>
            </Box>
            <h5>{documents?.card?.document ?? ''}</h5>
          </Box>

          {/* Third Document */}
          <Box
            sx={{
              width: '20%',
              display: 'grid',
              gap: '20px',
              backgroundColor: '#e7c6f0',
              padding: '30px',
              boxSizing: 'borderBox',
            }}
          >
            <Div2>
              <TextSnippetOutlinedIcon />
              <p style={{ fontSize: '13px', fontWeight: 'bolder' }}>
                {' '}
                ADDRESS PROOF{' '}
              </p>
            </Div2>
            <Box display={'flex'} gap={'10px'} alignItems={'center'}>
              <Typography>
                <Button
                  upload
                  component='label'
                  startIcon={<AttachFileOutlinedIcon />}
                  color='secondary'
                >
                  Upload Document
                  <input
                    hidden
                    type='file'
                    name='file'
                    onChange={({ target: { files } }) =>
                      handleFileUpload(files[0], 'address')
                    }
                  />
                </Button>
              </Typography>
            </Box>
            <h5>{documents?.address?.document ?? ''}</h5>
          </Box>

          {/* Forth Document */}
          <Box
            sx={{
              width: '20%',
              display: 'grid',
              gap: '20px',
              backgroundColor: '#e7c6f0',
              padding: '30px',
              boxSizing: 'borderBox',
            }}
          >
            <Div2>
              <TextSnippetOutlinedIcon />
              <p style={{ fontSize: '13px', fontWeight: 'bolder' }}>
                {' '}
                VACCINATION CERTIFICATE{' '}
              </p>
            </Div2>
            <Box display={'flex'} gap={'10px'} alignItems={'center'}>
              <Typography>
                <Button
                  upload
                  component='label'
                  startIcon={<AttachFileOutlinedIcon />}
                  color='secondary'
                >
                  Upload Document
                  <input
                    hidden
                    type='file'
                    name='file'
                    onChange={({ target: { files } }) =>
                      handleFileUpload(files[0], 'vaccination')
                    }
                  />
                </Button>
              </Typography>
            </Box>
            <h5>{documents?.vaccination?.document ?? ''}</h5>
          </Box>

          {/* Five Document */}
          <Box
            sx={{
              width: '20%',
              display: 'grid',
              gap: '20px',
              backgroundColor: '#e7c6f0',
              padding: '30px',
              boxSizing: 'boderBox',
            }}
          >
            <Div2>
              <TextSnippetOutlinedIcon />
              <p style={{ fontSize: '13px', fontWeight: 'bolder' }}>
                {' '}
                DOCUMENT UPLOAD{' '}
              </p>
            </Div2>
            <Typography
              sx={{ display: 'flex', alignItems: 'center', gap: '1px' }}
            >
              <BookmarkBorderRoundedIcon />
              <FormControlSingleSelect
                labelData='KYC Type'
                dataDD={services.documentContext}
                setData={(val) =>
                  setDocuments((state) => ({
                    ...state,
                    random: { ...state.random, documentContext: val },
                  }))
                }
                variantData='standard'
                size='80%'
                mtop={-2}
              />
            </Typography>

            <Typography
              sx={{ display: 'flex', alignItems: 'center', gap: '1px' }}
            >
              <BookmarkBorderRoundedIcon />
              <FormControlSingleSelect
                labelData='Document Type'
                dataDD={services.documentType}
                setData={(val) =>
                  setDocuments((state) => ({
                    ...state,
                    random: { ...state.random, documentType: val },
                  }))
                }
                variantData='standard'
                size='80%'
                mtop={-2}
              />
            </Typography>

            <Box display={'flex'} gap={'10px'} alignItems={'center'}>
              <Typography>
                <Button
                  disabled={checkDisabled('random')}
                  upload
                  component='label'
                  startIcon={<AttachFileOutlinedIcon />}
                  color='secondary'
                >
                  Upload Document
                  <input
                    hidden
                    type='file'
                    name='file'
                    onChange={({ target: { files } }) =>
                      handleFileUpload(files[0], 'random')
                    }
                  />
                </Button>
              </Typography>
            </Box>
            <h5>{documents?.random?.document ?? ''}</h5>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'end',
            height: '100px',
            justifyContent: 'right',
            gap: '20px',
          }}
        >
          <Button
            variant='contained'
            onClick={() => {
              setCurrentSteps(4);
            }}
          >
            {' '}
            back{' '}
          </Button>
          <Button
            variant='contained'
            onClick={() => {
              setCurrentSteps(6);
            }}
          >
            {' '}
            save{' '}
          </Button>
          <Button
            variant='contained'
            onClick={() => {
              setCurrentSteps(6);
            }}
          >
            {' '}
            next{' '}
          </Button>
        </Box>
      </Box>

      <Box marginTop={5} sx={{ padding: 3, bgcolor: 'white', borderRadius: 3 }}>
        <Box mt={2} sx={{ display: 'flex', gap: '10px' }}>
          {services.document.map((item) => (
            <a href={item.fileUrl} target='blank' download>
              {item.fileName}
            </a>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

// Default Export
export default DocumentDetails;

/*****************NPM DEPENDENCIES ****************/
import axios from 'axios';
import styled from '@emotion/styled';
import { isEmpty, get } from 'lodash';
import React, { memo, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Box, Typography, LinearProgress } from '@mui/material';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
/******************LOCAL DEPENDENCIES ************/
import { Axios } from '../../../http';
import { ENDPOINTS } from '../../../config/api.config';
import { requestQuery } from '../../../utils/request.util';
import FormControlSingleSelect from '../../../components/MuiComponents/FormControlSingleSelect';
import Notify from '../../../components/Notification/Notify';
import ROUTE_CONFIG from '../../../config/route.config';
import StepperButtons from '../../../components/shared/stepper/button';
import { prePareDoc } from '../../../utils/helper.util';

// Destructuring
const { DOCUMENT_TYPE, DOCUMENT_CONTEXT, DOCUMENT, DOCUMENT_UPLOAD } =
  ENDPOINTS;
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
  document = [],
  label = '',
  documentSideType = 'FRONT'
) => ({ document, documentContext, documentType, label, documentSideType });

// Service State
const serviceState = getDocState();

// Documents State
const documentsState = {
  profile: getDocState('PROFILE_PICTURE', 'SELFIE', '', 'Profile Picture'),
  card_front: getDocState('KYC', 'AADHAAR_CARD', '', 'Front Aadhaar Card'),
  card_back: getDocState('KYC', 'AADHAAR_CARD', '', 'Back Aadhaar Card', 'BACK'),
  address: getDocState('KYC', 'ADDRESS_PROOF', '', 'Address Proof'),
  vaccination: getDocState(
    'KYC',
    'VACCINATION_CERTIFICATE',
    '',
    'Vaccination Certificate'
  ),
  random: getDocState('', '', '', 'Document Upload'),
};

const DocumentInfo = () => {
  // local state
  const [services, setServices] = useState(serviceState);
  const [documents, setDocuments] = useState(documentsState);
  const [isLoading, setIsLoading] = useState(false);
  const [keyName, setKeyName] = useState('');
  const [notify, setNotify] = useState({ message: '' });

  // get id from url
  const { id, step } = useParams();

  // navigate
  const navigate = useNavigate();

  // call th api
  useEffect(() => {
    if (id) {
      axios
        .all(
          [DOCUMENT_CONTEXT, DOCUMENT_TYPE, `${DOCUMENT}${id}`].map((url) =>
            Axios.get(url)
          )
        )
        .then(
          axios.spread(
            (
              { data: documentContext },
              { data: documentType },
              { data: document }
            ) => {
              setServices({
                documentType: documentType?.data || [],
                documentContext: documentContext?.data || [],
              });
              setDocuments({ ...prePareDoc(document?.data ?? [], documents) });
            }
          )
        );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  /**
   * @description
   * @param {*} doc
   */
  const getDoc = (doc) =>
    !isEmpty(doc) ? (
      <img
        style={{ width: '120px', height: '120px', padding: '10px 0' }}
        src={doc.fileUrl}
        alt={doc.fileName}
        title={doc.fileName}
      />
    ) : null;

  /**
   * @description
   * @param {*} stateName
   */
  const checkDisabled = (stateName) =>
    isEmpty(get(documents, `${stateName}.documentType`))
      ? true
      : isEmpty(get(documents, `${stateName}.documentContext`))
      ? true
      : false;

  /**
   * @description
   * @param {*} file
   * @param {*} stateName
   */
  const handleFileUpload = (file, stateName, isReuploaded, documentSide = 'FRONT') => {
    setKeyName(stateName);
    setIsLoading(true);
    if (id) {
      const document = new FormData();
      document.append('document', file);
      Axios.post(
        `${DOCUMENT_UPLOAD}?${requestQuery({
          UserId: id,
          documentContext: documents[stateName].documentContext,
          documentSide,
          documentType: documents[stateName].documentType,
          isActive: true,
          isReuploaded,
        })}`,
        document
      )
        .then((res) => res.data)
        .then((res) => {
          if (res?.status ?? false) {
            setNotify({ message: res?.message ?? '' });
            setTimeout(() => setNotify({ message: '' }), 4000);
            Axios.get(`${DOCUMENT}${id}`)
              .then((res) => res.data)
              .then((res) =>
                setDocuments({ ...prePareDoc(res?.data ?? [], documents) })
              );
          }
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <>
      <h5 style={{ marginBottom: '20px' }}>Documents</h5>
      <Notify notify={notify} />
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          rowGap: '30px',
          justifyContent: 'flex-start',
        }}
      >

        {Object.keys(documents).map((document) => (
          <Box
            sx={{
              width: '247px',
              // display: 'grid',
              backgroundColor: '#e7c6f0',
              padding: '30px',
              margin: '10px'
            }}
          >
            <Div2>
              <TextSnippetOutlinedIcon />
              <p style={{ fontSize: '13px', fontWeight: 'bolder' }}>
                {' '}
                {documents[document]?.label}{' '}
              </p>
            </Div2>
            {document === 'random' ? (
              <>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1px',
                    height: '50px',
                  }}
                >
                  <BookmarkBorderRoundedIcon />
                  <FormControlSingleSelect
                    labelData='KYC Type'
                    data={documents?.random?.documentContext ?? ''}
                    dataDD={services.documentContext}
                    setData={(val) => {
                      const updatedDoc = { ...documents };
                      updatedDoc.random.documentContext = val;
                      setDocuments(updatedDoc);
                    }}
                    variantData='standard'
                    size='80%'
                    mtop={-2}
                  />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1px',
                    height: '50px',
                  }}
                >
                  <BookmarkBorderRoundedIcon />
                  <FormControlSingleSelect
                    data={documents?.random?.documentType ?? ''}
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
                </Box>
              </>
            ) : null}
            <Box display={'flex'} gap={'10px'} alignItems={'center'}>
              <Typography>
                <Button
                  {...(document === 'random'
                    ? { disabled: checkDisabled('random') }
                    : {})}
                  upload='true'
                  component='label'
                  startIcon={<AttachFileOutlinedIcon />}
                  color='secondary'
                >
                  {isEmpty(documents[document].document)
                    ? 'Upload Document'
                    : 'Replace Document'}
                  <input
                    hidden
                    type='file'
                    name='file'
                    onChange={({ target: { files } }) =>
                      handleFileUpload(
                        files[0],
                        document,
                        document === 'random' ? false : isEmpty(documents[document].document) ? false : true,
                        documents[document].documentSideType
                      )
                    }
                  />
                </Button>
              </Typography>
            </Box>
            {keyName === document && isLoading ? (
              <LinearProgress color='inherit' />
            ) : null}
            {getDoc(documents[document].document)}
          </Box>
        ))}
      </Box>
      <StepperButtons
        loading={isLoading}
        nextUrl={true}
        isSave={false}
        backUrl={ROUTE_CONFIG.YCW.EDIT(id, parseInt(step || 5) - 1)}
        handleNext={() =>
          navigate(ROUTE_CONFIG.YCW.EDIT(id, parseInt(step || 5) + 1))
        }
      />
    </>
  );
};

// Default Export
export default memo(DocumentInfo);

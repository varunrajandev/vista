/*******************NPM DEPENDENCIES **************** */
import { join, size } from 'lodash';
import React, { memo, useEffect, Fragment, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {
  Box,
  TextField,
  Autocomplete,
  Checkbox,
  FormControl,
  Radio,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  MenuItem,
  InputLabel,
} from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
/*******************LOCAL DEPENDENCIES **************** */
// import Answers from './Answers';
import { Axios } from '../../../http';
import { ENDPOINTS } from '../../../config/api.config';
import Notify from '../../../components/Notification/Notify';
import ROUTE_CONFIG from '../../../config/route.config';
import {
  prePareQuestionsAndAnswers,
  prePareRequestQuestionsAndAnswers,
} from '../../../utils/helper.util';
import StepperButtons from './../../../components/shared/stepper/button';
import { skillsQuestionFormSchema } from '../../../utils/validation-schema.util';
import DropDown from '../../../components/shared/DropDown';

/**
 * @description
 * @param {*} { questionOption, answers, question, handleChange }
 */
const MultiQuestion = ({ questionOption, answers, question, handleChange }) => (
  <Autocomplete
    key={question}
    multiple
    size='small'
    options={questionOption || []}
    disableCloseOnDropDown
    getOptionLabel={(option) => option}
    value={answers || []}
    onChange={(_event, values) => handleChange(values)}
    renderOption={(props, option, { selected }) => (
      <li {...props}>
        <Checkbox
          size='small'
          icon={icon}
          checkedIcon={checkedIcon}
          style={{ marginRight: 8 }}
          checked={selected}
        />
        {option}
      </li>
    )}
    style={{ width: '100%' }}
    renderInput={(params) => (
      <TextField {...params} label={question} size='small' />
    )}
  />
);

/**
 * @description
 * @param {*} {
 *   questionOption,
 *   answers,
 *   question,
 *   handleChange,
 * }
 */
const SingleQuestion = ({
  questionOption,
  answers,
  question,
  handleChange,
}) => (
  <FormControl fullWidth size='small'>
    <InputLabel>{question}</InputLabel>
    <DropDown
      key={question}
      sx={{ width: '100%' }}
      value={answers || ''}
      label={question}
      onChange={({ target: { value } }) => handleChange(value)}
    >
      {questionOption.map((item) => (
        <MenuItem value={item}>{item}</MenuItem>
      ))}
    </DropDown>
  </FormControl>
);

/**
 * @description
 * @param {*} { questionOption, answers, question, handleChange }
 */
const RadioQuestion = ({ questionOption, answers, question, handleChange }) => (
  <FormControl key={question}>
    <FormLabel>{question}</FormLabel>
    <RadioGroup
      row
      name={question}
      onChange={({ target: { value } }) => handleChange(value)}
      value={answers}
    >
      {questionOption.map((option) => (
        <FormControlLabel
          key={`${question}_${option}`}
          value={option}
          control={<Radio />}
          label={option}
        />
      ))}
    </RadioGroup>
  </FormControl>
);

/**
 * @description
 * @param {*} { answers, question, handleChange }
 */
const TextQuestion = ({ answers, question, handleChange }) => (
  <TextField
    variant='outlined'
    key={question}
    style={{ width: '100%' }}
    label={question}
    size='small'
    value={answers || ''}
    onChange={({ target: { value } }) => handleChange(value)}
  />
);

// Components
const checkedIcon = <CheckBoxIcon fontSize='small' />;
const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;

//Destructuring
const { SAVE_SKILL_USER_RESPONSE, SKILL_QUESTION } = ENDPOINTS;

const SkillQuestion = ({ id, answers, step, handleCall }) => {
  // local state
  const [notify, setNotify] = useState({ message: '' });
  const [isLoading, setIsLoading] = useState(false);
  // form instance
  const { control, handleSubmit, reset, watch, setValue } = useForm({
    skillDto: [],
    resolver: yupResolver(skillsQuestionFormSchema),
  });

  // navigate
  const navigate = useNavigate();

  // updated form values
  const updatedFormValues = watch();

  // form field array
  const { fields } = useFieldArray({
    control,
    name: 'skillDto',
  });

  // call api & get the details by id
  useEffect(() => {
    if (id) {
      Axios.get(`${SKILL_QUESTION}${id}`)
        .then((res) => res.data)
        .then((res) =>
          reset({
            skillDto: prePareQuestionsAndAnswers(res?.data ?? [], answers),
          })
        );
    }
  }, [answers, id, reset]);

  /**
   * @description
   * @param {*} data
   */
  const handleSave = (isNotify = false, isNext = false) => {
    setIsLoading(true);
    const requestBody = {
      skillDto: prePareRequestQuestionsAndAnswers(updatedFormValues),
      userId: id || '',
    };
    Axios.post(SAVE_SKILL_USER_RESPONSE, requestBody)
      .then((res) => res.data)
      .then((res) => {
        if (res?.status ?? false) {
          if (isNotify) {
            setNotify({ message: res?.message ?? '' });
            setTimeout(() => setNotify({ message: '' }), 4000);
            handleCall();
          }
          if (isNext) {
            navigate(ROUTE_CONFIG.YCW.EDIT(id, parseInt(step || 2) + 1));
          }
        }
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  };

  return (
    <form onSubmit={handleSubmit(() => handleSave(true))}>
      <Notify notify={notify} />
      <Box
        marginTop={5}
        sx={{
          padding: 3,
          bgcolor: 'white',
          borderRadius: 3,
        }}
      >
        <Box
          width={'100%'}
          sx={{
            display: 'flex',
            rowGap: '40px',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
        >
          {fields.map((field, ind) => (
            <Fragment key={field.key}>
              <Box display='flex' width='100%'>
                <h4>{field.key}</h4>
              </Box>
              {size(field.questions) !== 0 &&
                field.questions.map((question, i) => (
                  <Box
                    sx={{ display: 'grid', gap: '8px', width: '48%' }}
                    key={question.question}
                  >
                    <h5>{question.skillName}</h5>
                    <Box width={'100%'}>
                      {question.questionType === 'DROPDOWN' &&
                      question.selectionType === 'MULTI' ? (
                        <MultiQuestion
                          questionOption={question.questionOption}
                          answers={question.answers}
                          question={question.question}
                          handleChange={(val) =>
                            setValue(
                              `skillDto.${ind}.questions.${i}.answers`,
                              val
                            )
                          }
                        />
                      ) : question.questionType === 'DROPDOWN' &&
                        question.selectionType === 'SINGLE' ? (
                        <SingleQuestion
                          questionOption={question.questionOption}
                          answers={join(question.answers)}
                          question={question.question}
                          handleChange={(val) =>
                            setValue(`skillDto.${ind}.questions.${i}.answers`, [
                              val,
                            ])
                          }
                        />
                      ) : question.questionType === 'RADIO' ? (
                        <RadioQuestion
                          questionOption={question.questionOption}
                          answers={join(question.answers)}
                          question={question.question}
                          handleChange={(val) =>
                            setValue(`skillDto.${ind}.questions.${i}.answers`, [
                              val,
                            ])
                          }
                        />
                      ) : question.questionType === 'TEXT' ? (
                        <TextQuestion
                          questionOption={question.questionOption}
                          answers={join(question.answers)}
                          question={question.question}
                          handleChange={(val) =>
                            setValue(`skillDto.${ind}.questions.${i}.answers`, [
                              val,
                            ])
                          }
                        />
                      ) : null}
                    </Box>
                  </Box>
                ))}
            </Fragment>
          ))}
        </Box>
      </Box>
      {/* <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '15px', mt: '20px' }}>
        <Answers answers={fields || []} />
      </Box> */}
      <StepperButtons
        loading={isLoading}
        nextUrl={true}
        backUrl={ROUTE_CONFIG.YCW.EDIT(id, parseInt(step || 2) - 1)}
        handleNext={handleSubmit(() => handleSave(false, true))}
      />
    </form>
  );
};

// Default Export
export default memo(SkillQuestion);

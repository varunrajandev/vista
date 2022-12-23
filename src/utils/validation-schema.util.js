import * as yup from 'yup';

// add unique method on yup
yup.addMethod(yup.object, 'uniqueProperty', function (propertyName, message) {
  return this.test('unique', message, function (value) {
    if (!value || !value[propertyName]) {
      return true;
    }

    const { path } = this;
    const options = [...this.parent];
    const currentIndex = options.indexOf(value);

    const subOptions = options.slice(0, currentIndex);

    if (
      subOptions.some((option) => option[propertyName] === value[propertyName])
    ) {
      throw this.createError({
        path: `${path}.${propertyName}`,
        message,
      });
    }

    return true;
  });
});

// Form Validation Schema
export /** @type {*} */
const personalFormSchema = yup.object().shape({
  sourcingChannel: yup.string().nullable(),
  // .required('Sourcing Channel is required'),
  otherSourcingChannel: yup.string().when('sourcingChannel', {
    is: (val) => val === 'Others',
    then: (schema) =>
      schema.nullable().notRequired('Other Sourcing is required'),
    otherwise: (schema) => schema.nullable().notRequired(),
  }),
  firstName: yup
    .string()
    .nullable()
    .notRequired('First Name is required')
    .matches(/^[A-Za-z ]*$/, 'Please Enter Only Alphabet'),
  lastName: yup
    .string()
    .nullable()
    .matches(/^[A-Za-z ]*$/, 'Please Enter Only Alphabet'),
  gender: yup.string().nullable().notRequired('Gender is required'),
  mobileNo: yup
    .string()
    .nullable()
    .required('Phone Number is Required')
    .matches(/^[0-9]{10}$/, 'Please Enter Valid Phone Number'),
  secondaryMobileNumber: yup.string().nullable().notRequired(),
  whatsappAvailable: yup
    .string()
    .nullable()
    .notRequired('Whatsapp Available is required'),
  whatsappNumber: yup.string().when('whatsappAvailable', {
    is: (val) =>
      val === 'otherNumber' ||
      val === 'mobileNumber' ||
      val === 'secondaryNumber',
    then: (schema) => schema.nullable().notRequired('Other Number is required'),
    otherwise: (schema) => schema.nullable().notRequired(),
  }),
  birthday: yup
    .date()
    .nullable()
    .min(new Date(1900, 0, 1), 'DOB must be later')
    .max(new Date(), 'Date not greater then today')
    .typeError('Please Enter valid DOB format dd/mm/yyyy')
    .notRequired('Date is required'),
  maritalStatus: yup
    .string()
    .nullable()
    .notRequired('Marital Status is required'),
  religion: yup.string().nullable().notRequired('Religion is required'),
  otherReligion: yup.string().when('religion', {
    is: (val) => val === 'OTHERS',
    then: (schema) =>
      schema.nullable().notRequired('Other Religion is required'),
    otherwise: (schema) => schema.nullable().notRequired(),
  }),
  covidStatus: yup.string().nullable().notRequired('Covid Status is required'),
});

export /** @type {*} */
const skillsFormSchema = yup.object().shape({
  primarySkill: yup
    .string()
    .nullable()
    .notRequired('Primary skill is required'),
  secondarySkill: yup
    .string()
    .nullable()
    .notRequired('Secondary skill is required'),
  primaryLanguage: yup
    .string()
    .nullable()
    .notRequired('Primary Language is required'),
});

export /** @type {*} */
const skillsQuestionFormSchema = yup.object().shape({
  /* question: yup.array().of(
    yup.object().shape({
      answer: yup.string().nullable().required('Please Select The Required Field'),
      question: yup.string().nullable(),
      uuid: yup.string().nullable() 
    })
  ) */
});

export /** @type {*} */
const jobFormSchema = yup.object().shape({
  skillUuid: yup
    .string()
    .nullable()
    .notRequired('Preferred Job Types is required'),
  startTime: yup
    .date()
    .notRequired()
    .max(yup.ref('endTime'), 'Please Enter Start Time Greater Then End Time')
    .typeError('Please Enter Valid Time'),
  endTime: yup
    .date()
    .notRequired()
    .min(yup.ref('startTime'), 'Please Enter End Time less Then Start Time'),
  traningMode: yup.string().nullable().notRequired('Training mode is required'),
  workingHours: yup
    .string()
    .nullable()
    .notRequired('Working Hours is required'),
});

export /** @type {*} */
const addressFormSchema = yup.object().shape({});

export /** @type {*} */
const houseHoldFormSchema = yup.object().shape({
  houseHold: yup.array().of(
    yup.object().shape({
      mobileNo: yup
        .string()
        .nullable()
        .notRequired('Mobile Number is required')
        .matches(/^[0-9]{10}$/, 'Please Enter Valid Phone Number'),
      relationship: yup
        .string()
        .nullable()
        .notRequired('Relationship is required'),
    })
  ),
});

export /** @type {*} */
const bankFormSchema = yup.object().shape({
  /* bank: yup.array().of(
    yup.object().shape({
      ifscCode: yup
        .string()
        .nullable()
        .notRequired('Please Enter IFSC Code')
        .matches(/^[A-Za-z]{4}\d{7}$/, 'Please Enter Valid IFSC Code'),
      accountType: yup
        .string()
        .nullable()
        .notRequired('Please Select Account Type'),
      accountNumber: yup
        .string()
        .nullable()
        .notRequired('Please Enter Account Number')
        .matches(/^[0-9]{9,18}$/, 'Please Enter Valid Account Number'),
      proofType: yup.string().nullable().notRequired('Please Select Proof Type'),
      file: yup.string().nullable().notRequired('Please Upload Proof'),
    })
  ), */
});

export /** @type {*} */
const basicInfoFormSchema = yup.object().shape({
  skillUuid: yup.string().nullable().notRequired('Please select Job Type'),
  familyMember: yup
    .string()
    .nullable()
    .notRequired('Members in Family is required')
    .matches(/^[0-9]$/, 'Please Enter Valid Family Members'),
});

export /** @type {*} */
const perFormSchema = yup.object().shape({
  sourcingChannel: yup
    .string()
    .nullable()
    .required('Sourcing Channel is required'),
  firstName: yup
    .string()
    .nullable()
    .required('First Name is required')
    .matches(/^[A-Za-z ]*$/, 'Please Enter Only Alphabet'),
  middleName: yup
    .string()
    .nullable()
    .matches(/^[A-Za-z ]*$/, 'Please Enter Only Alphabet'),
  lastName: yup
    .string()
    .nullable()
    .matches(/^[A-Za-z ]*$/, 'Please Enter Only Alphabet'),
  mobileNo: yup
    .string()
    .nullable()
    .required('Phone Number is Required')
    .matches(/^[0-9]{10}$/, 'Please Enter Valid Phone Number'),
  secondaryMobileNumber: yup.string().nullable(),
  whatsappAvailable: yup
    .string()
    .nullable()
    .required('Whatsapp Available is required'),
  whatsappNumber: yup.string().when('whatsappAvailable', {
    is: (val) =>
      val === 'otherNumber' ||
      val === 'mobileNumber' ||
      val === 'secondaryNumber',
    then: (schema) => schema.nullable().required('Other Number is required'),
    otherwise: (schema) => schema.nullable().notRequired(),
  }),
});

export /** @type {*} */
const registrationSchema = yup.object().shape({
  firstName: yup
    .string()
    .nullable()
    .matches(/^[A-Za-z ]*$/, 'Please Enter Only Alphabet'),
  lastName: yup
    .string()
    .nullable()
    .matches(/^[A-Za-z ]*$/, 'Please Enter Only Alphabet'),
  mobileNo: yup
    .string()
    .nullable()
    .required('Phone Number is Required')
    .matches(/^[0-9]{10}$/, 'Please Enter Valid Phone Number'),
});

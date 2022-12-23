import {
  forEach,
  map,
  size,
  flatMap,
  chain,
  zipObject,
  filter,
  flatten,
  find,
  mapValues,
  omit,
} from 'lodash';

/**
 * @description
 * @param {*} key
 * @param {*} name
 * @param {*} cellWeight
 * @param {*} fontSize
 * @param {*} rest
 */
export const getColumnProps = (
  key,
  name,
  cellWidth,
  cellWeight,
  fontSize,
  ...rest
) => ({
  key,
  name,
  cellWeight: cellWeight || 900,
  fontSize: fontSize || '10px',
  arrowUpMargin: '-5px',
  arrowDownMargin: '-17px',
  asc: `${key}Asc`,
  desc: `${key}Desc`,
  ...(cellWidth ? { cellWidth } : {}),
  ...rest,
});

export const prePareQuestionsAndAnswers = (questions, answers) => {
  let updatedQuestions = [];
  const flatAnswer = flatMap(answers, (answer) =>
    map(answer.skillDto, (ans) => ans)
  );
  if (size(questions) !== 0 && size(flatAnswer) !== 0) {
    updatedQuestions = map(questions, (question) => {
      let updatedAnswers = [];
      forEach(flatAnswer, (ans) => {
        if (question.skillUuid === ans.uuid && size(ans?.question) !== 0) {
          forEach(ans?.question, (ansQ) => {
            if (ansQ?.question === question?.question) {
              updatedAnswers = ansQ?.answer;
            }
          });
        }
      });
      return { ...question, answers: updatedAnswers };
    });
  }
  if (size(updatedQuestions) !== 0) {
    updatedQuestions = chain(updatedQuestions)
      .groupBy('skillLevel')
      .toPairs()
      .map((skill) => zipObject(['key', 'questions'], skill))
      .value();
  }
  return updatedQuestions;
};

/**
 * @description
 * @param {*} answers
 */
export const prePareAnswer = (answers) =>
  size(answers) !== 0
    ? filter(
        flatten(
          flatMap(answers, (answer) =>
            map(
              answer.skillDto,
              (ans) =>
                size(ans.question) !== 0 &&
                map(ans.question, (ques) => ({
                  uuid: ans.uuid,
                  question: ques.question,
                  answer: ques.answer,
                }))
            )
          )
        )
      )
    : [];

export const prePareRequestQuestionsAndAnswers = (questions) => {
  const questionsAnswers = [];
  if (size(questions.skillDto)) {
    forEach(questions.skillDto, (skill) => {
      if (size(skill?.questions ?? [])) {
        forEach(skill?.questions, (question) => {
          questionsAnswers.push({
            question: [
              { answer: question.answers, question: question.question },
            ],
            uuid: question.skillUuid,
          });
        });
      }
    });
  }
  return questionsAnswers;
};

export /**
 * @description
 * @param {*} docsById
 * @param {*} docsState
 */
const prePareDoc = (docsById, docsState) =>
  mapValues(docsState, (docs, docsKey) => {
    const documentDetails =
      docsKey === 'random'
        ? find(docsById, (docById) =>
            [
              'DRIVING_LICENSE',
              'ELECTRICITY_BILL',
              'GAS_BILL',
              'OTHERS',
              'PAN',
              'PASSPORT',
              'RATION_CARD',
              'VOTER_ID',
            ].includes(docById.documentUploadType)
          )
        : find(
            docsById,
            (docById) =>  docById.documentUploadType === docs.documentType && docById.documentSideType === docs.documentSideType
          );

    return {
      ...docs,
      document: documentDetails,
      documentType: docsKey === 'random' ? documentDetails?.documentUploadType : docs.documentType,
      documentContext: docsKey === 'random' ? documentDetails?.documentContext : docs.documentContext,
    };
  });

export /**
 * @description
 * @param {*} bankDetails
 */
const prePareBankResponse = (bankDetails) =>
  map(bankDetails, (bankDetail) => {
    const file = bankDetail?.documentResponseDto?.fileUrl ?? '';
    const fileName = bankDetail?.documentResponseDto?.fileName ?? '';
    const proofType = bankDetail?.documentResponseDto?.documentUploadType ?? '';
    const accountType = bankDetail?.accountType ?? null;
    const updatedBankDetails = omit(bankDetail, [
      'documentResponseDto',
      'filePath',
      'accountType',
      'uuid',
    ]);
    return {
      ...updatedBankDetails,
      file,
      proofType,
      accountType,
      loading: false,
      fileName,
    };
  });

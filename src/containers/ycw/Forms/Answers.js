/*******************NPM DEPENDENCIES **************** */
import { size } from 'lodash';
import { memo } from 'react';
import { Box } from '@mui/material';

/**
 * @description
 * @param {*} {answers}
 */
const Answers = ({ answers }) => (
  <>
    {size(answers) !== 0 ?
      answers.map((answer) => (
        <>
          {size(answer.questions) ?
            answer.questions.map((ans) => (
              <Box
                sx={{
                  boxShadow: 3
                }}
                style={{
                  display: 'grid',
                  gap: '4px',
                  width: '220px',
                  backgroundColor: 'white',
                  padding: '10px',
                  borderRadius: '10px',
                }}
              >
                <h6>{ans.question}</h6>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {size(ans.answers) ?
                    ans.answers.map((item) => (
                      <p style={{ fontSize: '10px' }}>{item},</p>
                    )) : null}
                </div>
                <h6>{answer.key}</h6>
              </Box>
            )) : null}
        </>
      )) : null}
  </>
);

// Export Default
export default memo(Answers);

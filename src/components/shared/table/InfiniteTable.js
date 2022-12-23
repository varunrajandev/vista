/***************NPM DEPENDENCIES *****************/
import { memo } from 'react';
import { Skeleton, Box } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';

/**
 * @description
 * @param {*} { length, handleNext, totalPages, page, children }
 */
const InfiniteTable = ({ length, handleNext, totalPages, page, children }) => (
  <InfiniteScroll
    dataLength={length}
    next={() => handleNext(parseInt(page) + 1)}
    hasMore={totalPages !== page}
    loader={<Skeleton />}
    endMessage={<Box plain>It is all, nothing more</Box>}
    scrollableTarget='scrollableDiv'
  >
    {children}
  </InfiniteScroll>
);

// Default Export
export default memo(InfiniteTable);

// import { memo, useEffect } from 'react';
// import { debounce } from 'lodash';
// import { CircularProgress } from '@mui/material';

// const InfiniteTable = ({
//   loading,
//   handleFetch,
//   totalRecords,
//   recordsPerPage,
//   totalPages,
//   page,
//   children,
// }) => {
//   useEffect(() => {
//     const onScroll = debounce(() => {
//       console.log('loading-loading', loading, totalPages,page, window.innerHeight,document.documentElement.scrollTop,document.documentElement.offsetHeight);
//       if (loading || totalPages === page) return;
//       if (
//         window.innerHeight + document.documentElement.scrollTop - 16 ===
//         document.documentElement.offsetHeight
//         ) {

//           console.log('scroll')
//         handleFetch(parseInt(page) + 1);
//       }
//     });
//     window.addEventListener('scroll', onScroll);
//     return () => window.removeEventListener('scroll', onScroll);
//   }, [handleFetch, loading, page, totalPages]);

//   return (
//     <div>
//       {children}
//       {loading ? <CircularProgress /> : null}
//       {totalPages === page ? 'No More Records' : null}
//     </div>
//   );
// };
// // Default Export
// export default memo(InfiniteTable);

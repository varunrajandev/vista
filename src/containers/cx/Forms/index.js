// Components
import Personal from './Personal';
import Address from './Address';
import HouseHold from './HouseHold';
import Jobs from './../../jobs/Forms/BasicInfo';

export /** @type {*} */
const Steps = {
  1: <Personal />,
  2: <Address />,
  3: <HouseHold />,
  4: <Jobs redirect />,
};

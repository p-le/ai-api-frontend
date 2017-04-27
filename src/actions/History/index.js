import axios from 'axios';
import * as Types from './types';
/*eslint-disable */
import Config from 'Config';
/*eslint-enable */

const fetchDone = files => ({
  type: Types.FETCH_DONE,
  files
});

export const fetchHistory = () => {
  const url = `${Config.backend}/history`;
  return (dispatch) => {
    axios.get(url)
    .then((res) => {
      console.log(res.data);
      dispatch(fetchDone(res.data));
    })
    .catch(err => console.log(err));
  };
};
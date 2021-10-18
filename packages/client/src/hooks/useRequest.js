// create instance for api (back-end) and for pokemon-api (front-end)
// create config with endpoints for both instances
// create a hook :
//const res = axios.get('pokemon')
// const res = useRequest({endoint: 'pokemon', ...})

// conect front with back end\
import { useState } from 'react';

const useRequest = ({ instance, url, config = {} }) => {
  const [result, updateData] = useState(null);
  const {
    body,
    method = 'get',
    mapper = (a) => a,
    onReject = () => {},
  } = config;

  console.log(instance)
  console.log(url)

  useState(() => {
    instance[method](url, body)
      .then((resp) => {
        updateData(mapper(resp.data));
      })
      .catch(onReject);
  });

  return result;
};

export default useRequest;

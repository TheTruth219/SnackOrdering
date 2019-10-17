import axios from 'axios';


const apiCall = axios.create({
    baseURL:  'http://localhost:4000',
    headers: {'Authorization':'Bearer 33b55673-57c7-413f-83ed-5b4ae8d18827'},
  });

  const get = (key) => {
    return JSON.parse(localStorage.getItem(key));
}
  const set = (key,value) => {
    return JSON.stringify(localStorage.setItem(key,value))
}

  let calls = {

    api: {
        get: apiCall.get(`/snacks`),
        post: (id) => {
            return apiCall.post(`/snacks/vote/${id}`)
        }
    },
    local: {
        get:get,
        set:set
    }
  }

 export default calls;
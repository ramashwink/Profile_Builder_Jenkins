import axios from 'axios';

export default() =>{
    return axios.create({
        baseURL:'https://profile-builder-deploy.herokuapp.com'
    });
}
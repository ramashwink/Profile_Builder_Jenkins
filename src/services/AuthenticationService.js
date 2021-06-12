import Api from '@/services/Api';

export default{
    register(credentials){
        return Api().post('register',credentials);
    },
    login(credentials){
        return Api().post('login',credentials);
    },
    changePassword(credentials){
        return Api().post('changePassword',credentials);
    },
    // checkAdmin(credentials){
    //     console.log("Inside check Admin");
    //     return Api().post('checkAdmin',credentials);
    // },
    checkUser(credentials){
        console.log(credentials);
        return Api().get('checkUser',  { headers:
            { Authorization: credentials }
        });
    }
}


import Api from '@/services/Api';

export default{
    fetchFacultyProfile(credentials){
        console.log(credentials);
        return Api().post('fetchTheFacultyProfile',credentials);
    },
    addFacultyBasicDetails(credentials){
        return Api().post('addFacultyBasicDetails',credentials);
    },
    addFacultyLinks(credentials){
        return Api().post('addFacultyLinks',credentials);
    },
    addFacultyPreferences(credentials){
        return Api().post('addFacultyPreferences',credentials);
    },
    addFacultyProfilePhoto(credentials){
        return Api().post('uploadProfilePhoto',credentials);
    },
    addFacultyProject(credentials){
        return Api().post('addFacultyProject',credentials);
    },
    addFacultyPublications(credentials){
        return Api().post('addFacultyPublication',credentials);
    },
    editFacultyLinks(credentials){
        return Api().post('editFacultyLinks',credentials);
    },
    editpublication(credentials){
        return Api().post('editPublication',credentials);
    },
    editFacultyProject(credentials){
        return Api().post('editFacultyProject',credentials);
    },
    editPassword(credentials){
        return Api().post('editPassword',credentials);
    },
    editDetails(credentials){
        return Api().post('editDetails',credentials);
    },
    sentRequest(credentials){
        return Api().post('sentRequest',credentials);
    },
    addPublicationCount(credentials){
        return Api().post('addPublicationCount',credentials);
    },
    sendEmail(data)
    {
        // https://api.emailjs.com/api/v1.0/email/send
        return Api().post('sample',data);
    },
    updateRequest(credentials){
        return Api().post('updateRequest',credentials);
    },
    rejectEmail(credentials){
        return Api().post('rejectEmail',credentials);
    },
    deleterequest(credentials){
        return Api().post('deleterequest',credentials);
    },
    updateSettings(credentials){
        return Api().post('updateSettings',credentials);
    },
    endorseFaculty(credentials){
        return Api().post('endorseFaculty',credentials);
    },
    deletelink(credentials){
        return Api().post('deletelink',credentials);
    },
    deletepublication(credentials){
        return Api().post('deletepublication',credentials);
    },
    deleteProject(credentials){
        return Api().post('deleteProject',credentials);
    }
    
}

import {createRouter,createWebHistory} from 'vue-router';
import AdminRegister from '../components/Admin/AdminRegister.vue';
import Login from '../components/UserAuthentication/Login.vue';
import Admin from '../components/Admin/Admin.vue';
import NotFound from '../components/pages/NotFound.vue';
// import FacultyContact from '../components/Faculty/FacultyContact.vue';
import FacultyProfile from '../components/Faculty/FacultyProfile.vue';
import FacultyStats from '../components/Faculty/FacultyStats.vue';
import FacultyRequests from '../components/Faculty/FacultyRequests.vue';
import FacultiesPage from '../components/Faculty/FacultiesPage.vue';
// import FacultyRequest from '../components/Faculty/FacultyRequest.vue';
import StudentRegister from '../components/Admin/StudentRegister.vue';

import ForgotPassword from '../components/UserAuthentication/ForgotPassword.vue';


import store from '../store/index.js'
const router=createRouter({
    history:createWebHistory(),
    mode:"history",
    routes:[
        {path:'/',redirect:'/home'},
        {path:'/admin/register',component:AdminRegister,meta:{ requiresAdminAuth:true, title: 'Admin' }},
        
        {path:'/admin/registerStudent',component:StudentRegister,meta:{ requiresAdminAuth:true}},

        {path:'/ForgotPassword',component:ForgotPassword},

        {path:'/login',component:Login,meta:{ requiresUnauth:true}},
        {path:'/home',component:FacultiesPage,},
        {path:'/faculties/:id/stats',component:FacultyStats,meta:{ requiresAuthorization:true}},
        {path:'/faculties/:id/requests',component:FacultyRequests,meta:{ requiresAuthorization:true}},
        {path:'/faculties/:id',component:FacultyProfile},
        // {path:'/requests',component:TeacherRequest},
        {path:'/admin',name: 'admin',component:Admin,meta:{ requiresAdminAuth:true,title: 'Admin'}},
        {path:'/:notFound(.*)',component:NotFound}, //any other route
       //any other route
    ]
});

router.beforeEach(async function(to,_,next){
    await store.dispatch('tryLogin');
    if(to.meta.title)
    {
        document.title = to.meta.title || 'Profile Builder';

    }
    else
    {
        document.title = 'Profile Builder';
    }
    if(to.meta.requiresAuth && !store.getters.isAuthenticated)
    {
        next('/login');
    }
    else if(to.meta.requiresAdminAuth && store.getters.isAuthenticated  && !store.getters.isAdminLoggedIn)
    {
        next('/NotFound');
    }
    else if(to.meta.requiresAdminAuth && !store.getters.isAuthenticated  && !store.getters.isAdminLoggedIn){

        next('/NotFound');
    }
    else if(to.meta.requiresUnauth && store.getters.isAuthenticated  && store.getters.isAdminLoggedIn)
    {
        next('/admin');
    }
    else if(to.meta.requiresAuthorization && !store.getters.isAuthenticated){
        next('/NotFound');
    }
    else if(to.meta.requiresAuthorization && store.getters.isAuthenticated){
        await store.dispatch("loadthefacultyprofile",{id:to.params.id});
       
        next();
    }

    else
    {
        next()
    }
 });

export default router;
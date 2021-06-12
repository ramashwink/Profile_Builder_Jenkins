import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router.js';
import store from './store/index.js';
import BaseCard from './components/layout/BaseCard.vue';
import BaseDialog from './components/layout/BaseDialog.vue';
import firebase from 'firebase';
import SearchItem from './components/layout/SearchItem.vue';
import AdminSidebar from './components/Admin/AdminSidebar.vue';
import TheHeader from './components/layout/TheHeader.vue';
import UserHeader from './components/layout/UserHeader.vue';

import ProjectCard from './components/Faculty/ProjectCard.vue';
import VueApexCharts from "vue3-apexcharts";

const app=createApp(App);
app.component('base-card',BaseCard);
app.component('base-dialog',BaseDialog);
app.component('search-item',SearchItem);
app.component('admin-sidebar',AdminSidebar);
app.component('the-header',TheHeader);
app.component('user-header',UserHeader);
app.component('project-card',ProjectCard);
app.use(VueApexCharts);
app.use(router);
app.use(store);

app.mount('#app');

var firebaseConfig = {
    apiKey: "AIzaSyAzO89y0b34JUnrz-Xrcx3mOng9zKpmcHk",
    authDomain: "profile-builder-243b0.firebaseapp.com",
    projectId: "profile-builder-243b0",
    storageBucket: "profile-builder-243b0.appspot.com",
    messagingSenderId: "1038858780079",
    appId: "1:1038858780079:web:ab1bff9d6a12b4ff59435a",
    measurementId: "G-TY5J617J3V"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
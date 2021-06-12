<template>
    <header class="flex-gap">
        <nav>
            <h1>
                <router-link to="/">Faculty Profile Builder </router-link>
            </h1>
            <ul>
                <li><router-link to="/login" v-if="!isLoggedIn">Login</router-link></li>
                <!-- <li v-if="isLoggedIn"><router-link to="/requests">Requests</router-link></li> -->
                <!-- <li v-else><router-link to="/auth">Login</router-link></li> -->
                <li v-if="isLoggedIn"><router-link to="/login" @click="logout()" name="logout">Logout</router-link></li>
            </ul>
        </nav>
    </header>
</template>


<script>
export default {
  computed:{
    isLoggedIn(){
      return this.$store.getters.isUserLoggedIn;
    }
  },
  methods:{
    logout(){
      this.$store.dispatch('logout');
      this.$router.replace('/login');
    }
  }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap');
header {
  width: 100%;
  height: 4rem;
  background-color: #383e56;
  display: flex;

  font-family: 'Montserrat', sans-serif;
  justify-content: center;
  align-items: center;
}

header a {
  text-decoration: none;
  color: #fb743e;
  display: inline-block;
  padding: 0.75rem 0.5rem;
  border: 1px solid transparent;
}

a:active,
a:hover,
a.router-link-active {
  border: 1px solid #fb743e;
}

h1 {
  margin: 0;
}

h1 a {
  color: #fb743e;
  margin: 0;
}

h1 a:hover,
h1 a:active,
h1 a.router-link-active {
  border-color: transparent;
}

header nav {
  width: 95%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 0.5rem;
}
</style>
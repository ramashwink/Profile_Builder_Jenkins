<template >
<div class="background">

<router-view ></router-view>
</div>
</template>

<script>
export default {
  
  //  created(){
  //     this.$store.dispatch('tryLogin')
  //   },
    mounted() {
    let themejs = document.createElement('script')
    themejs.setAttribute('src', 'https://kit.fontawesome.com/5a55e4b82b.js')
    document.head.appendChild(themejs)
},  
}
</script>

<style >

@import url('https://kit.fontawesome.com/5a55e4b82b.js');
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@300&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Work+Sans&display=swap');
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
}
html {
  font-family: "Roboto", sans-serif;
  background-color: #e7e6e1;
 
}

</style>

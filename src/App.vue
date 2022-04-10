<template>
  <div class="container-scroller">
          <TopNav :class="{'hidden' : componentName == 'login'}"/>
          <div class="container-fluid page-body-wrapper">
              <Menu v-if="componentName != 'login'"/>
              <router-view></router-view>
        </div>
  </div>
  <to-do></to-do>
</template>

<script>
	import TopNav from "./components/Top.vue";
	import Menu from "./components/Menu.vue";
import ToDo from "./components/ToDoList.vue";
export default{
    components:{
      TopNav,
      Menu,
      ToDo,
    },
    data() {
      return {
        componentName: '',
      }
    },
    created(){
      if(localStorage.getItem('token')) this.$store.dispatch('getInfo', { token: localStorage.getItem('token') });
    },
  	watch:{
        $route (to){
          this.componentName = to.name;
        },
    },
    mounted(){
      console.log('abcabc');
    }
  
}

</script>

<style>
@import './assets/css/myStyle.css';
@import './assets/css/resetcss.css';
#app{
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
</style>

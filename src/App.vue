<template>
<!-- :class="{ 'look-scrollbar' : showModal}" -->
  <div class="container-scroller">
          <TopNav :class="{'hidden' : componentName == 'login'}"/>
          <div class="container-fluid page-body-wrapper" :class="{ 'look-scrollbar' : showModal}">
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
        showModal:false,
      }
    },
    computed:{
      showModal(){
        return this.$store.state.isShowModal;
      }
    },
    created(){
      if(localStorage.getItem('token')) this.$store.dispatch('getInfo', { token: localStorage.getItem('token') });
      this.$store.dispatch('getBaseData');
    },
  	watch:{
        $route (to){
          this.componentName = to.name;
          console.log(this.$store.state.loading);
        },
    },
  
}

</script>

<style>
@import './assets/css/myStyle.css';
@import './assets/css/resetcss.css';
#app{
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
.look-scrollbar{
  overflow: hidden;
  position: fixed;
}
</style>

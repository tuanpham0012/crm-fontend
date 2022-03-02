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

/* @import './assets/vendors/mdi/css/materialdesignicons.min.css';
@import './assets/vendors/css/vendor.bundle.base.css';*/
@import './assets/css/myStyle.css'; 
.container-fluid{
  width: auto;
}

.hidden{
  visibility: hidden;
}

.content-wrapper{
  padding: 1.2rem 1.2rem;
}

.page-header{
  margin: 0 0 0.8rem 0;
}

.page-title{
  font-size: 1.345rem;
  padding: 0 1rem;
  margin: 0 0.5rem;
}

::-webkit-scrollbar {
  width: 0.4rem;
  height: 0.4rem;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f5f5f5;
  border-radius: 1rem;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(204, 203, 223);
  border-radius: 1rem;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgb(156, 155, 170);
}

.main-panel{
  animation: 0.2s ease-out 0s 1 slideInFromLeft;
  }

@keyframes slideInFromLeft {
  0% {
    transform: translateX(-70%);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes slideInFromRight {
  0% {
    transform: translateX(200%);
  }
  100% {
    transform: translateX(0);
  }
}
.btn-add {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
}
.btn{
  font-family: Arial, Helvetica, sans-serif;
}
</style>

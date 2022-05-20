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
  <Footer />
</template>

<script>
	import TopNav from "./components/Top.vue";
	import Menu from "./components/Menu.vue";
  import ToDo from "./components/ToDoList.vue";
  import Footer from "./components/Footer.vue";
export default{
    components:{
      TopNav,
      Menu,
      ToDo,
      Footer
    },
    data() {
      return {
        componentName: '',
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
      this.$store.dispatch('getListNotification')
      this.getNotifications();
    },
  	watch:{
        $route (to){
          this.componentName = to.name;
        },
    },
    methods: {
      getNotifications(){
        setInterval( () => {
          if(this.$store.getters.getInfo)
            this.$store.dispatch('getListNotification')
        }, 30000);
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

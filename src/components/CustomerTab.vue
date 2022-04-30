<template lang="">
       <ul class="tab-controller">
         <li v-for="(menu, index) in listMenu" :key="index" :class="{ 'active' : menu.id == tabIndex}" @click="tabIndex = menu.id">{{ menu.name }}</li>
       </ul>
       <div>
         <div class="tab-content">
           <div v-if="customer">
              <NoteComponent :notes="customer.customer_notes" :customer_id="customer.id" v-if="tabIndex == 1" />
           </div>
           <ContactHistoryComponent v-if="tabIndex == 4" />
         </div>
       </div>
</template>
<script>
import NoteComponent from "./NoteCustomerComponent.vue";
import ContactHistoryComponent from "./ContactHistoryComponent.vue";
export default {
    components:{
      NoteComponent,
      ContactHistoryComponent,
    },
    props:{
      customer:{
        type: Object,
        default:function(){
          return null;
        }
      }
    },
    data() {
        return {
            id: null,
            tabIndex: 1,
            listMenu: [
              { id: 1, name: 'Trao đổi'},
              { id: 2, name: 'Lịch chăm sóc'},
              { id: 3, name: 'Lịch hẹn'},
              { id: 4, name: 'Lịch sử liên hệ'},
              { id: 5, name: 'Lịch sử giao dịch'},

            ],
        }
    },
    created(){
      this.id = this.$route.params.id;
      console.log('tab' + this.id);
    },
    watch: {
    },
}
</script>
<style scoped>
.cont{
  height: 100vh;
  background-color: rgb(235, 239, 243);
}
.tab-controller{
  margin: 0.5rem;
  padding: 0.5rem;
  background-color: rgb(255, 255, 255);
}
.tab-controller li{
  display: inline;
  background-color: rgb(255, 255, 255);
  margin: 0.2rem 0.1rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  color: rgb(0, 0, 255);
}
.tab-controller li:hover{
  color: rgb(255, 94, 0);
  border-bottom: 3px solid rgb(255, 94, 0);
}
.active{
  color: black;
  border-bottom: 3px solid rgb(255, 94, 0);
}
.tab-content{
  margin: 0.5rem;
  background-color: rgba(255, 255, 255, 0);
}
</style>
<template lang="">
       <ul class="tab-controller">
         <li v-for="(menu, index) in listMenu" :key="index" :class="{ 'active' : menu.id == tabIndex}" @click="tabIndex = menu.id">{{ menu.name }}</li>
       </ul>
       <div>
         <div class="tab-content">
           <div v-if="customer">
              <NoteComponent :notesProps="customer.customer_notes" :customer_id="customer.id" v-if="tabIndex == 1" />
           </div>
           <div v-if="customer">
              <TaskForCustomer :tasks="customer.tasks" v-if="tabIndex == 2" />
           </div>
           <SendMailHistoryComponent :sendMailHistory="customer.send_mail_histories" :customer_name="customer.name" v-if="tabIndex == 3" />
           <div v-if="customer">
              <ContactHistoryComponent :callHistory="customer.call_histories"  v-if="tabIndex == 4" />
           </div>
         </div>
       </div>
</template>
<script>
import NoteComponent from "./NoteCustomerComponent.vue";
import SendMailHistoryComponent from "./SendMailHistoryComponent.vue";
import TaskForCustomer from "./TaskForCustomer.vue";
import ContactHistoryComponent from "./ContactHistoryComponent.vue";
export default {
    components:{
      NoteComponent,
      TaskForCustomer,
      SendMailHistoryComponent,
      ContactHistoryComponent
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
              { id: 1, name: 'Nhật kí chăm sóc'},
              { id: 2, name: 'Công việc liên quan'},
              { id: 3, name: 'Lịch sử gửi email'},
              { id: 4, name: 'Lịch sử cuộc gọi'},

            ],
        }
    },
    created(){
      this.id = this.$route.params.id;
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

.active{
  color: black;
  border-bottom: 3px solid rgb(255, 94, 0);
}
</style>
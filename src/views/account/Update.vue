<template lang="">
    <div class="cont">
       <ul class="tab-controller">
         <li v-for="(menu, index) in listMenu" :key="index" :class="{ 'active' : menu.id == tabIndex}" @click="tabIndex = menu.id">{{menu.name}}</li>
       </ul>
       <div>
         <div class="tab-content">
           <CustomerNoteVue v-if="tabIndex == 1"></CustomerNoteVue>
           <p v-if="tabIndex == 2">{{ listMenu[tabIndex].name}}</p>
           <p v-if="tabIndex == 3">{{ listMenu[tabIndex].name}}</p>
           <p v-if="tabIndex == 4">{{ listMenu[tabIndex].name}}</p>
           <p v-if="tabIndex == 5">{{ listMenu[tabIndex].name}}</p>
         </div>
       </div>
    </div>
</template>
<script>
import CustomerNoteVue from "../../components/NoteComponent.vue";
export default {
    components:{
      CustomerNoteVue,
    },
    data() {
        return {
            tabIndex: 1,
            listMenu: [
              { id: 1, name: 'Ghi chú'},
              { id: 2, name: 'Giao dịch'},
              { id: 3, name: 'Lịch hẹn'},
              { id: 4, name: 'Lịch sử liên hệ'},
              { id: 5, name: 'Phản hồi khách hàng'},

            ],
        }
    },
    methods: {
    
    },
    watch: {
      content(){
        console.log(this.content);
      }
    },
    mounted() {
      console.log('this is current quill instance object', this.editor)
    }
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
  height: 100vh;
  margin: 0.5rem;
  background-color: rgb(255, 255, 255);
}
</style>
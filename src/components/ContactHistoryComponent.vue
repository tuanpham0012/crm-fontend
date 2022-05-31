<template>
  <div class="card-content">

    <CreateContactModal
      v-if="modalContact"
      @close-modal="toggleModal()"/>

    <div class="contact-container">
      <div class="title">
        <p>Danh sách cuộc gọi</p>
        <button class="btn btn-sm btn-gradient-info " @click="toggleModal()">Tạo liên hệ</button>
      </div>
      <div class="table-responsive">
        <table class="table table-hover table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Người liên hệ</th>
              <th>SDT liên hệ</th>
              <th>Trạng thái</th>
              <th>Thời gian</th>
              <th>Nội dung</th>
              <th>Ghi âm</th>
              <th>Ghi chú</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="callHistory && callHistory.length > 0" v-for="(item, index) in callHistory" :key="index">
              <td scope="row">{{ index + 1}}</td>
              <td>{{ item.user.name}}</td>
              <td>{{ item.phone_contacts }}</td>
              <td>
                <label class="badge badge-info">{{ item.status }}</label>
              </td>
              <td>{{ item.time }}</td>
              <td>{{ item.content}}</td>
              <td>{{ item.link_record ?? 'Không có file'}}</td>
              <td>
                {{ item.note}}
              </td>
            </tr>
            <tr v-else>
              <td>Không có dữ liệu hiển thị</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import CreateContactModal from "./CreateContactModal.vue";
export default {
  components:{
    CreateContactModal,
  },
  props:{
    callHistory:{
      type: Array,
      default: function(){
        return null;
      }
    }
  },
  data() {
    return {
      modalContact: false,
    }
  },
  methods:{
    toggleModal(){
      this.modalContact = !this.modalContact;
    }
  }
};
</script>
<style scoped>
td {
  padding: 0.4rem 0.7rem;
}
.contact-container {
  background-color: rgb(255, 255, 255);
  width: 100%;
  padding: 1rem 0.8rem;
  border-radius: 5px;
}
.title {
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  margin: 0.5rem 1rem 1.5rem 1rem;
}
.title p{
  font-weight: 500;
  font-size: 1.1rem;
}
</style>

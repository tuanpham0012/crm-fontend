<template>
  <div class="card-content">

    <CreateCustomerCareModal
      v-if="modalContact"
      @close-modal="toggleModal()"/>

    <div class="contact-container">
      <div class="title">
        <p>Danh sách cuộc gọi</p>
        <button class="btn btn-sm btn-gradient-info " @click="toggleModal()">Tạo mới</button>
      </div>
      <div class="table-responsive">
        <table class="table table-hover table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Vấn đề</th>
              <th>Trạng thái</th>
              <th>Ngày tạo</th>
              <th>Người tiếp nhận</th>
              <th>Cập nhật cuối</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="cares && cares.length > 0" v-for="(item, index) in cares" :key="index">
              <td scope="row">{{ index + 1}}</td>
              <td>{{ item.content }}</td>
              <td><select
                            class="form-control"
                            v-model="item.status"
                            @change="update(item)"
                          >
                            <option value="Chờ tiếp nhận">Chờ tiếp nhận</option>
                            <option value="Đang xử lý">Đang xử lý</option>
                            <option value="Đã giải quyết">Đã giải quyết</option>
                          </select></td>
              <td>{{ dateTime(item.created_at) }}</td>
              <td>
                {{ item.user.name}}
              </td>
              <td>{{ dateTime(item.updated_at) }}</td>
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
import CreateCustomerCareModal from "./CreateCustomerCareModal.vue";
import axios from "redaxios";
import * as url from "../config";
import moment from "moment/min/moment-with-locales";
moment.locale("vi");
export default {
  components:{
    CreateCustomerCareModal,
  },
  props:{
    cares:{
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
    },
    dateTime(value){
      return moment(value).format("hh:mm DD/MM/YYYY");
    },
    async update(item) {
      await axios({
        url: url.customer.CARE + item.id,
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          Accept: "application/json",
        },
        data: item,
      })
        .then((res) => {
          console.log(res.data);
          cuteToast({
            type: "success",
            message: res.data.message,
            timer: "5000",
          });
          this.$store.dispatch("getCustomerInfo", { id: this.$route.params.id , upload: false});
        })
        .catch((err) => {
          console.log(err);
        });
    },
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

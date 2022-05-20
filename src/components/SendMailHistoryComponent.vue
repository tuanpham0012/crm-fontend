<template>
  <div class="card-content">

    <!-- Xem email đã gửi -->
    <base-modal
        v-if="modalMailDetail"
        title="Email đã gửi"
        :size="false"
        @closeModal="toggleViewMail()"
      >
        <template v-slot:body>
          <div class="col-12">
            <div class="card">
              <div class="card-body">
                <div class="row">
                    <div class="col-md-12">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label"
                          >Người gửi: </label
                        >
                        <label class="col-sm-9 col-form-label"
                          >{{ email.user.name }}</label
                        >
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label"
                          >Người nhận: </label
                        >
                        <label class="col-sm-9 col-form-label"
                          >{{ customer_name + ' <' + email.to_email + '>'}}</label
                        >
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label"
                          >Thời gian gửi: </label
                        >
                        <label class="col-sm-9 col-form-label"
                          >{{ dataTimeFormat(email.created_at) }}</label
                        >
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label"
                          >Tiêu đề: </label
                        >
                        <label class="col-sm-9 col-form-label"
                          >{{ email.title }}</label
                        >
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="form-group row">
                        <label class="col-sm-12 col-form-label"
                          >Nội dung: </label
                        >
                        <div class="col-sm-12 mail-content">
                          <div class="content" v-html="email.content"></div>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </template>
        <template v-slot:footer>
          <button
            type="button"
            class="btn btn-sm btn-gradient-secondary"
            @click="toggleViewMail()"
          >
            Đóng
          </button>
        </template>
      </base-modal>
    <div class="contact-container">
      <p class="title">Danh sách email đã gửi</p>
      <div class="table-responsive">
        <table class="table table-hover table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Người gửi</th>
              <th>Địa chỉ nhận</th>
              <th>Tiêu đề</th>
              <th>Thời gian gửi</th>
              <th>Ghi chú</th>
            </tr>
          </thead>
          <tbody v-if="list && list.length > 0">
            <tr v-for="(mail, i) in list" :key="i" @click="toggleViewMail(mail)">
              <td scope="row">{{  i + 1}}</td>
              <td>{{ mail.user.name }}</td>
              <td>{{ mail.to_email }}</td>
              <td>{{ mail.title }}</td>
              <td>{{ dateTime(mail.created_at) }}</td>
              <td></td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="7">
                <h2>Chưa có dữ liệu</h2>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>

import axios from 'redaxios';
import * as url from "../config";
import moment from "moment/min/moment-with-locales";
moment.locale("vi");

import BaseModal from "./Modal.vue";

export default {
  props:{
    sendMailHistory:{
      type: Array,
      default:function(){
        return null;
      }
    },
    customer_name: String,
  },
  components:{
    BaseModal
  },
  data() {
    return {
      list: this.sendMailHistory,
      modalMailDetail: false,
      email: null,
    }
  },
  methods: {
    dateTime(value){
      return moment(value).utc().format("HH:mm:ss DD/MM/YYYY");
    },
    dataTimeFormat(value){
      return moment(value).format('LLLL');
    },
    toggleViewMail(mail){
      if(mail){
        this.modalMailDetail = true;
        this.email = mail;
      }else{
        this.modalMailDetail = false;
      }
    }
  },
};
</script>
<style scoped>
td {
  padding: 0.4rem 0.7rem;
}
table tr{
  cursor: pointer;
}
.form-group {
    margin-bottom: 0;
}
.contact-container {
  background-color: rgb(255, 255, 255);
  width: 100%;
  padding: 1rem 0.8rem;
  border-radius: 5px;
}
.title {
  font-weight: 600;
  margin-bottom: 0.5rem;
}
.mail-content{
  padding: 0 1rem;
  margin-bottom: 2rem;
}
.mail-content .content{
  background-color: #e8eff4;
  padding: 0.5rem 1rem;
  border-radius: 5px;
}
</style>

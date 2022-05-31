<template>
  <div class="main-panel">
    <Loading />
    <base-modal
        v-if="modalLead"
        title="Gán người phụ trách"
        :size="false"
        @closeModal="toggleModalLead()"
      >
        <template v-slot:body>
          <div class="col-12">
            <div class="card">
              <div class="card-body">
                <form class="form-sample bd" id="formImage">
                    <div class="col-md-12">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label">Nhân viên</label>
                        <div class="col-sm-6 fill-select">
                          <select-list :listProps="listStaffs" @returnData="selectReturn"></select-list>
                        </div>
                      </div>
                    </div>
                </form>
                <br/>
                <br/><br/>
                <br/><br/>
                <br/>
              </div>
            </div>
          </div>
          <br/>
          <br/>
        </template>
        <template v-slot:footer>
          <button type="button" class="btn btn-sm btn-info" @click="assignSale()">
            Xác nhận
          </button>
          <button
            type="button"
            class="btn btn-sm btn-secondary"
            @click="toggleModalLead()"
          >
            Hủy
          </button>
        </template>
      </base-modal>

    <SendMailModal
        v-if="modalSendMail"
        :listCustomer="cus"
        @update="mailUpdate"
        @close-modal="toggleModalSendMail()"/>

    <div class="content-wrapper">
      <div class="page-header">
        <h3 class="page-title">Chi tiết khách hàng</h3>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb" v-if="customer">
            <li class="breadcrumb-item">
              <router-link :to="{ name: 'customers' }">Khách hàng</router-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              {{ customer.name }}
            </li>
          </ol>
        </nav>
      </div>
      <div class="row">
        <div class="col-md-3 stretch-card">
          <div class="card">
            <div class="card-body">
              <div>
                <div class="card-title">
                  <p class="title">Thông tin chính</p>
                  <div class="action">
                    <button
                      class="btn btn-sm btn-outline-info dropdown-toggle"
                      type="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Hành động
                    </button>
                    <div class="dropdown-menu">
                      <router-link
                        class="dropdown-item"
                        :to="{
                          name: 'customer-update',
                          params: { id: $route.params.id },
                        }"
                      >
                        <i class="mdi mdi-border-color"></i> Sửa thông
                        tin</router-link
                      >
                      <router-link
                        class="dropdown-item"
                        :to="{
                          name: 'account-update',
                          params: { id: $route.params.id },
                        }"
                        ><i class="mdi mdi-delete-forever"></i>Xóa</router-link
                      >
                    </div>
                  </div>
                </div>
                <div class="card-body" v-if="customer">
                  <div class="row-info">
                    <span class="row-title">Mã khách hàng:</span>
                    <span class="row-content">
                      {{
                        customer.customer_code
                          ? customer.customer_code
                          : "Đang cập nhật"
                      }}
                    </span>
                  </div>
                  <div>
                    <div class="row-info">
                      <span class="row-title">Tên khách hàng:</span>
                      <span class="row-content">{{
                        customer.name ? customer.name : "Đang cập nhật"
                      }}</span>
                    </div>
                    <div class="row-info">
                      <span class="row-title">Địa chỉ:</span>
                      <span class="row-content">
                        {{
                          customer.address ? customer.address : "Đang cập nhật"
                        }}
                      </span>
                    </div>
                    <div class="row-info">
                      <span class="row-title">Giới tính:</span>
                      <span class="row-content">
                        {{
                          customer.gender ? customer.gender : "Đang cập nhật"
                        }}
                      </span>
                    </div>
                    <div class="row-info">
                      <span class="row-title">Sinh nhật:</span>
                      <span class="row-content">
                        {{
                          customer.date_of_birth
                            ? customer.date_of_birth
                            : "Đang cập nhật"
                        }}
                      </span>
                    </div>
                    <div class="row-info">
                      <span class="row-title">Mối quan hệ:</span>
                      <span class="row-content">
                        {{
                          customer.type_customer && customer.type_customer.type
                            ? customer.type_customer.type
                            : "Đang cập nhật"
                        }}
                      </span>
                    </div>
                    <div class="row-info">
                      <span class="row-title">Sản phẩm quan tâm:</span>
                      <div class="col-sm-7">
                        <ul style="margin-top: 1rem" v-if="typeOfProduct">
                          <li
                            v-for="(type, index) in typeOfProduct"
                            :key="index"
                          >
                            {{ type.type }}
                          </li>
                        </ul>
                        <span class="updating" v-else>Đang cập nhật</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="clearfix">
                <div class="card-title">
                  <h4 class="title">Thông tin liên hệ</h4>
                  <div class="action">
                    <button
                      class="btn btn-sm btn-outline-info dropdown-toggle"
                      type="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Tương tác
                    </button>
                    <div class="dropdown-menu">
                      <a class="dropdown-item" @click="toggleModalSendMail()" href="#">Gửi Mail</a>
                      <a class="dropdown-item" href="#">Gọi điện</a>
                      <a
                        class="dropdown-item"
                        href="#"
                        @click="toggleModalLead()"
                        v-if="$store.getters.getPositionID == 1 || $store.getters.getPositionID == 2"
                        >Gán người phụ trách</a
                      >
                    </div>
                  </div>
                </div>
                <div class="card-body" v-if="customer">
                  <div class="row-info">
                    <span class="row-title">Email:</span>
                    <span class="row-content">{{
                      customer.email ? customer.email : "Đang cập nhật"
                    }}</span>
                  </div>
                  <div class="row-info" style="align-items: baseline">
                    <span class="row-title">Điện thoại:</span>
                    <ol
                      class="row-content"
                      v-if="customer.customer_phone.length > 0"
                    >
                      <li
                        v-for="(phone, index) in customer.customer_phone"
                        :key="index"
                      >
                        {{ phone.phone }}
                      </li>
                    </ol>
                    <span v-else>Đang cập nhật</span>
                  </div>
                  <div class="row-info">
                    <span class="row-title">Zalo :</span>
                    <span class="row-content">
                      {{ customer ? customer.zalo : "Chưa cập nhật" }}
                    </span>
                  </div>
                </div>
              </div>
              <div class="clearfix">
                <div class="card-title">
                  <h4 class="title">Thông tin khác</h4>
                </div>
                <div v-if="customer">
                  <div class="row-info">
                    <span class="row-title">Người phụ trách:</span>
                    <span class="row-content">{{
                      customer.contacts
                        ? customer.contacts.name
                        : "Đang cập nhật"
                    }}</span>
                  </div>
                  <div class="row-info">
                    <span class="row-title">Số lần liên hệ:</span>
                    <span class="row-content">{{
                      customer.call_histories ? customer.call_histories.length : "Đang cập nhật"
                    }}</span>
                  </div>
                  <div class="row-info">
                    <span class="row-title">Liên hệ cuối:</span>
                    <span class="row-content">{{
                      customer.call_histories && customer.call_histories.length > 0 ? dateTime(customer.call_histories[0].created_at) : "Đang cập nhật"
                    }}</span>
                  </div>
                  
                  
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-9 stretch-card">
          <div class="card">
            <div class="card-body">
             
              <div class="card-content">
                <div>
                  <div class="tab-content">
                    <customer-tab-vue :customer="customer"></customer-tab-vue>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "redaxios";
import * as url from "../../config";

import BaseModal from "../../components/Modal.vue";
import Loading from "../../components/Loading.vue";
import CustomerTabVue from "../../components/CustomerTab.vue";
import SendMailModal from "../../components/SendMailModal.vue";
import SelectList from "../../components/SelectList.vue";

import moment from "moment/min/moment-with-locales";
moment.locale("vi");

export default {
  components: {
    BaseModal,
    Loading,
    CustomerTabVue,
    SendMailModal,
    SelectList,
  },
  data() {
    return {
      modalLead: false,
      hoverNote: false,
      department_id: -1,
      staff_id: -1,
      staffs: [],
      modalSendMail: false,
      cus: [],
    };
  },
  computed: {
    typeCustomer() {
      return this.$store.state.baseData
        ? this.$store.state.baseData.type_of_customer
        : null;
    },
    typeOfProduct() {
      return this.$store.state.baseData
        ? this.$store.state.baseData.type_of_product
        : null;
    },
    customer() {
      return this.$store.state.customer;
    },
    listStaffs(){
      return this.$store.state.customers
        ? this.$store.state.customers.staffs
        : null;
    }
  },
  watch: {
    department_id() {
      var department = this.departments.filter(
        (x) => x.id === this.department_id
      );
      this.staffs = department[0].staff_of_department;
      this.staff_id = -1;
    },
    customer(){
      if(this.customer){
        this.cus.push(this.customer.id);
      }
    }
  },
  created() {
    this.$store.dispatch("getCustomerInfo", { id: this.$route.params.id , upload: true});
  },
  methods: {
    toggleModalLead() {
      this.modalLead = !this.modalLead;
    },
    toggleModalSendMail(){
      this.modalSendMail = !this.modalSendMail;
      console.log(this.modalSendMail);
    },
    dateTime(value) {
      return moment(value).utc().format("HH:mm:ss DD-MM-YYYY");
    },
    selectReturn(value){
      this.staff_id = value.id;
    },
    mailUpdate(){
      this.$store.dispatch("getCustomerInfo", { id: this.$route.params.id , upload: false})
      this.modalSendMail = false;
    },
    
    async assignSale() {
      if(this.staff_id == -1 || this.staff_id == null){
        cuteToast({
            type: "error",
            message: 'Chưa chọn người phụ trách',
            timer: 5000,
          });
          return;
      }
      await axios({
        method: "POST",
        url: url.customer.ASSIGN_SALE,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          Accept: "application/json",
        },
        data: {
          listCustomer: [this.customer.id],
          user_id: this.staff_id,
          update: true,
        },
      })
        .then((res) => {
          this.$store.dispatch("getCustomerInfo", { id: this.$route.params.id , upload: true});
          console.log(res.data);
          cuteToast({
            type: "success",
            message: res.data.message,
            timer: 5000,
          });
          this.toggleModalLead();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style scoped>
ol {
  margin-bottom: 0;
  margin-left: 1rem;
  font-size: 1rem;
}
i {
  margin: 0.1rem 0.5rem 0.1rem;
}
.dropdown-item {
  display: flex;
  align-items: center;
  align-content: center;
}
.selected {
  color: rgb(0, 4, 255);
  background-color: rgb(230, 235, 240);
}
.stretch-card {
  padding: 0.5rem;
}
.clearfix{
  border-top: 1px solid rgb(192, 201, 243);
  margin-top: 1rem;
  padding-top: 1rem;
}
.title {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1rem;
  font-weight: 550;
}
.card .card-body {
  padding: 0.4rem;
}
.card-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.3rem 0.5rem 0.3rem;
}
.row-info {
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: space-between;
  padding: 0.3rem 0.5rem;
  font-size: 0.875rem;
  min-height: 2.5rem;
}
.row-title {
  padding-bottom: 0.1rem;
  font-weight: 600;
  margin-right: 0.4rem;
  font-size: 0.875rem;
}
.form-group {
  margin-bottom: 0.5rem;
}
.col-form-label {
  font-size: 1rem;
  font-weight: 500;
  padding: 1rem;
}
.form-group-checkbox {
  padding: 0.5rem 1rem;
  display: flex;
  align-content: center;
  align-items: center;
  margin-bottom: 1rem;
}
.form-group-checkbox label {
  margin: 0;
}
.input-check {
  margin: 0.5rem 1rem;
}
.bd {
  border-bottom: 1px gainsboro solid;
  margin-bottom: 2rem;
}
</style>

<template>
  <base-modal
        title="Thêm mới khách hàng"
        :size="true"
        @closeModal="toggleModalCreate()"
      >
        <template v-slot:body>
          <div class="col-md-12 grid-margin stretch-card">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title">Thông tin cơ bản</h4>
                <br/>
                <form class="form-sample">
                  <div class="row bd">
                    <div class="col-md-6">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label"
                          >Tên khách hàng</label
                        >
                        <div class="col-sm-9">
                          <input
                            type="text"
                            class="form-control"
                            v-model="customer_create.name"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label">Địa chỉ</label>
                        <div class="col-sm-9">
                          <input
                            type="text"
                            class="form-control"
                            v-model="customer_create.address"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label">Ngày sinh</label>
                        <div class="col-sm-9">
                          <input
                            type="date"
                            class="form-control"
                            v-model="customer_create.date_of_birth"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label">Giới tính</label>
                        <div class="col-sm-9">
                          <select
                            class="form-control"
                            v-model="customer_create.gender"
                          >
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label"
                          >Mối quan hệ</label
                        >
                        <div class="col-sm-9">
                          <select
                            class="form-control"
                            v-if="typeCustomer"
                            v-model="customer_create.type_of_customer_id"
                          >
                            <option
                              v-for="(type, index) in typeCustomer"
                              :key="index"
                              :value="type.id"
                            >
                              {{ type.type }}
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label">Người phụ trách</label>
                        <div class="col-sm-9">
                          <select-list :listProps="listStaffs" @returnData="selectReturn"></select-list>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group row">
                        <label
                          for="exampleInputEmail2"
                          class="col-sm-3 col-form-label"
                          >Mặt hàng quan tâm</label
                        >
                        <div class="col-sm-6">
                          <select
                            class="form-control"
                            style="margin-top: 1rem"
                            v-model="interest"
                            v-if="typeOfProduct"
                          >
                            <option value="-1" disabled>
                              -- Chọn mặt hàng quan tâm --
                            </option>
                            <option
                              v-for="(type, index) in typeOfProduct"
                              :key="index"
                              :value="type.id"
                              :disabled="
                                customer_create.interest.findIndex(
                                  (x) => x.type_of_product_id == type.id
                                ) >= 0
                              "
                            >
                              {{ type.type }}
                            </option>
                          </select>
                        </div>
                        <div
                          class="col-sm-3"
                          style="
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                          "
                        >
                          <button
                            type="button"
                            class="btn btn-sm btn-gradient-info"
                            :disabled="interest == -1"
                            @click="addInterestProduct()"
                          >
                            Thêm
                          </button>
                        </div>

                        <div class="col-sm-12">
                          <ul
                            class="list-interest"
                            v-if="
                              customer_create.interest &&
                              customer_create.interest.length > 0
                            "
                          >
                            <li
                              v-for="(type, index) in customer_create.interest"
                              :key="index"
                            >
                              <button
                                type="button"
                                @click="removeInterest(index)"
                                class="close"
                              >
                                &times;</button
                              >{{ type.type_of_product.type }}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="col-md-12 grid-margin stretch-card">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title">Thông tin liên hệ</h4>
                <br/>
                <form class="form-sample">
                  <div class="row bd">
                    <div class="col-md-4">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label">Email</label>
                        <div class="col-sm-9">
                          <input
                            type="email"
                            class="form-control"
                            v-model="customer_create.email"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label"
                          >Điện thoại</label
                        >
                        <div class="col-sm-9">
                          <input
                            type="text"
                            class="form-control"
                            @keypress="isNumber($event)"
                            v-model="customer_create.phone"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label">Zalo</label>
                        <div class="col-sm-9">
                          <input
                            type="text"
                            class="form-control"
                            v-model="customer_create.zalo"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </template>
        <template v-slot:footer>
          <button type="button" class="btn btn-sm btn-info" @click="create()">
            Xác nhận
          </button>
          <button
            type="button"
            class="btn btn-sm btn-secondary"
            @click="toggleModalCreate()"
          >
            Đóng
          </button>
        </template>
      </base-modal>
</template>
<script>
import BaseModal from "./Modal.vue";
import SelectList from "./SelectList.vue";

import axios from "redaxios";
import * as url from "../config";
  
export default {
  components:{
    SelectList,
    BaseModal
  },
  data() {
    return {
      customer_create: {
        name: "",
        email: "",
        phone: "",
        gender: "Nam",
        interest: [],
        address: "",
        zalo: "",
        type_of_customer_id: "1",
        contact_id: -1,
      },
      interest: -1,
    }
  },
  computed:{
    typeOfProduct() {
      return this.$store.state.baseData
        ? this.$store.state.baseData.type_of_product
        : null;
    },
    listStaffs(){
      return this.$store.state.customers
        ? this.$store.state.customers.staffs
        : null;
    },
    typeCustomer() {
      return this.$store.state.baseData
        ? this.$store.state.baseData.type_of_customer
        : null;
    },
  },
  methods: {
    toggleModalCreate(){
      this.$emit('close-modal');
    },
    selectReturn(value){
      if(value){
        this.customer_create.contact_id = value.id;
        console.log(this.customer_create.contact_id + ' - ' + value.name);
      }
    },
    isNumber: function (evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 43
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    addInterestProduct() {
      this.customer_create.interest.push({
        type_of_product_id: this.interest,
        type_of_product: {
          type: this.typeOfProduct.find((x) => x.id == this.interest).type,
        },
      });
      this.interest = -1;
      console.log(this.customer_create.interest);
    },
    removeInterest(index) {
      this.customer_create.interest.splice(index, 1);
    },
    async create() {
      await axios({
        method: "POST",
        url: url.customer.CREATE,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          Accept: "application/json",
        },
        data: this.customer_create,
      })
        .then((res) => {
          console.log(res.data);
          this.toggleModalCreate();
          cuteToast({
            type: "success",
            message: res.data.message,
            timer: 5000,
          });
          this.$emit('update');
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
}
</script>
<style scoped>
.list-interest {
  margin: 0.5rem 0 0 1.5rem;
  background-color: rgb(221, 221, 235);
  padding: 0.5rem 0.2rem;
  border-radius: 6px;
  width: 70%;
}
.list-interest li {
  background-color: rgb(255, 255, 255);
  width: 85%;
  padding-left: 0.7rem;
  padding-right: 0.3rem;
  border-radius: 4px;
  margin: 0.25rem 1rem;
}
.list-interest button {
  font-size: 1.4rem;
  margin-left: 1rem;
}
.list-interest button:hover {
  transform: scale(1.1);
}
</style>
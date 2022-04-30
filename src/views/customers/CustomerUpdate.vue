<template>
  <div class="main-panel">
    <div class="content-wrapper">
      <div class="page-header">
        <h3 class="page-title"></h3>
        <nav aria-label="breadcrumb">
          <div>
            <button
              type="button"
              @click="goBack()"
              class="btn btn-sm btn-gradient-light btn-icon-text"
            >
              <i class="mdi mdi-chevron-double-left"></i> Quay lại
            </button>
            <button
              type="button"
              @click="update()"
              class="btn btn-sm btn-gradient-success btn-icon-text"
            >
              <i class="mdi mdi-check-all"></i> Cập nhật
            </button>
          </div>
        </nav>
      </div>
      <div class="row">
        <div class="col-md-6 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <div class="clearfix">
                <div class="card-title">
                  <h4 class="title">Thông tin cơ bản</h4>
                </div>
                <div class="card-body" v-if="customer">
                  <div class="form-group row">
                    <label for="name" class="col-sm-3 col-form-label"
                      >Tên khách hàng:</label
                    >
                    <div class="col-sm-9">
                      <input
                        type="text"
                        class="form-control"
                        id="name"
                        v-model="customer.name"
                        placeholder="Tên khách hàng"
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="address" class="col-sm-3 col-form-label"
                      >Địa chỉ</label
                    >
                    <div class="col-sm-9">
                      <input
                        type="text"
                        class="form-control"
                        id="address"
                        v-model="customer.address"
                        placeholder="Địa chỉ"
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="gender" class="col-sm-3 col-form-label"
                      >Giới tính</label
                    >
                    <div class="col-sm-9">
                      <select
                        class="form-control"
                        id="gender"
                        v-model="customer.gender"
                      >
                        <option>Nam</option>
                        <option>Nữ</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="birth" class="col-sm-3 col-form-label"
                      >Sinh nhật</label
                    >
                    <div class="col-sm-9">
                      <input
                        type="date"
                        class="form-control"
                        id="birth"
                        v-model="customer.date_of_birth"
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label class="col-sm-3 col-form-label"
                      >Loại khách hàng</label
                    >
                    <div class="col-sm-9">
                      <select
                        class="form-control"
                        v-if="typeCustomer"
                        v-model="customer.type_of_customer_id"
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

                  <div class="form-group row">
                    <label
                      for="exampleInputEmail2"
                      class="col-sm-3 col-form-label"
                      >Sản phẩm quan tâm</label
                    >
                    <div class="col-sm-6">
                      <select class="form-control" style="margin-top:1rem;" v-model="interest" v-if="typeOfProduct">
                            <option value="-1" disabled> -- Chọn mặt hàng quan tâm -- </option>
                            <option v-for="(type, index) in typeOfProduct" :key="index" :value="type.id" :disabled="customer.interest.findIndex( x => x.type_of_product_id == type.id) >= 0">
                                {{ type.type}}
                            </option>
                      </select>
                      
                    </div>
                    <div class="col-sm-3" style="display: flex;justify-content: space-between;align-items: center;">
                      <button type="button" class="btn btn-sm btn-gradient-info" :disabled="interest == -1" @click="addInterestProduct()">Thêm</button>
                    </div>
                    
                    <div class="col-sm-12">
                      <ul class="list-interest" v-if="customer.interest && customer.interest.length > 0">
                        <li v-for="(type, index) in customer.interest" :key="index"><button type="button" @click="removeInterest(index)" class="close">&times;</button>{{type.type_of_product.type}}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <div class="clearfix">
                <div class="card-title">
                  <h4 class="title">Thông tin liên hệ</h4>
                </div>
                <div class="card-body" v-if="customer">
                  <div class="form-group row">
                    <label for="email" class="col-sm-3 col-form-label"
                      >Email:</label
                    >
                    <div class="col-sm-9">
                      <input
                        type="email"
                        class="form-control"
                        id="email"
                        v-model="customer.email"
                        placeholder="Email"
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="phone" class="col-sm-3 col-form-label"
                      >Điện thoại:</label
                    >
                    <div class="col-sm-6">
                      <input
                        type="text"
                        class="form-control"
                        id="phone"
                        v-model="phone"
                        @keypress="isNumber($event)"
                        placeholder="Thêm số điện thoại"
                      />
                    </div>
                    <div class="col-sm-3" style="display: flex;justify-content: space-between;align-items: center;">
                      <button
                        class="btn btn-sm btn-gradient-info"
                        @click="addPhone()"
                      >
                        Thêm
                      </button>
                    </div>
                    <div class="list-phones">
                      <div
                        class="phone"
                        v-for="(phone, index) in customer.customer_phone"
                        :key="index"
                      >
                        <span> {{ phone.phone }} </span>
                        <button
                          type="button"
                          class="btn-close"
                          @click="del(index)"
                        >
                          <i class="mdi mdi-close"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="text" class="col-sm-3 col-form-label"
                      >Zalo:</label
                    >
                    <div class="col-sm-9">
                      <input
                        type="text"
                        class="form-control"
                        id="text"
                        v-model="customer.email"
                        placeholder="Email"
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="text" class="col-sm-3 col-form-label"
                      >Facebook:</label
                    >
                    <div class="col-sm-9">
                      <input
                        type="text"
                        class="form-control"
                        v-model="customer.email"
                        placeholder="Email"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <div class="clearfix">
                <div class="card-title">
                  <h4 class="title">Thông tin liên hệ</h4>
                </div>
                <div>
                  <div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <div class="card-title">
                <h4 class="title">Các hành động</h4>
                <div class="action">
                  <button
                    type="button"
                    class="btn btn-gradient-light btn-sm btn-icon-text"
                  >
                    <i class="mdi mdi-settings"></i> Sửa
                  </button>
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
import { customer } from "../../config";
export default {
  data() {
    return {
      phone: "",
      interest: -1,
    };
  },
  computed: {
    typeCustomer() {
      return this.$store.state.baseData ? this.$store.state.baseData.type_of_customer : null;
    },
    typeOfProduct(){
      return this.$store.state.baseData ? this.$store.state.baseData.type_of_product : null;
    },
    customer() {
      return this.$store.state.customer;
    },
  },
  created() {
    this.$store.dispatch("getCustomerInfo", { id: this.$route.params.id });
  },
  methods: {
    del(index) {
      console.log(index);
      this.customer.customer_phone.splice(index, 1);
    },
    isNumber: function (evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (charCode == 13) {
        this.addPhone();
      } else if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 43
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    addPhone() {
      if (this.phone != "") {
        if (
          this.customer.customer_phone.findIndex(
            (x) => x.phone == this.phone
          ) >= 0
        ) {
          cuteAlert({
            type: "warning",
            title: "Thêm số điện thoại",
            message: "Số điện thoại đã tồn tại",
            buttonText: "Xác nhận",
          });
        } else {
          this.customer.customer_phone.push({
            phone: this.phone,
            customer_id: this.customer.id,
          });
          this.phone = "";
        }
      }
    },
    addInterestProduct() {
      this.customer.interest.push({
            customer_id: this.customer.id,
            type_of_product_id: this.interest,
            type_of_product:{
              type: this.typeOfProduct.find( (x) => x.id == this.interest).type,
            } 
          });
          this.interest = -1;
          console.log(this.customer.interest);
    },
    removeInterest(index){
      this.customer.interest.splice(index, 1);
    },
    goBack() {
      this.$router.go(-1);
    },
    updated() {
      console.log(this.customer);
    },
    async update() {
      await axios({
        method: "PATCH",
        url: customer.UPDATE + this.customer.id,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          Accept: "application/json",
        },
        data: this.customer,
      })
        .then((res) => {
          console.log(res);
          cuteAlert({
            type: "success",
            title: "Cập nhật thông tin",
            message: "Cập nhật thông tin khách hàng thành công",
            buttonText: "Xác nhận",
          });
          this.$store.dispatch("getCustomerInfo", {
            id: this.$route.params.id,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style scoped>
.title {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.15rem;
}
.card .card-body {
  padding: 0.4rem;
}

.card-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px gainsboro solid;
  padding: 0 0.3rem 0.5rem 0.3rem;
}
.row-info {
  display: flex;
  align-items: center;
  align-content: center;
  padding: 0.3rem 0.5rem;
  margin: 0.5rem 0;
  font-size: 1rem;
  min-height: 3.4rem;
}
.row-title {
  padding-bottom: 0.1rem;
  font-weight: 600;
  margin-right: 0.4rem;
}
.form-group {
  margin-bottom: 0.5rem;
}
.col-form-label {
  font-size: 1rem;
  font-weight: 500;
  padding: 1rem;
}
.btn {
  margin: 0 0.2rem;
}
.list-phones {
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  background: rgba(206, 206, 206, 0);
  padding: 0.5rem 1rem;
  margin: 0.5rem;
}
.phone {
  background-color: rgb(231, 228, 228);
  padding: 0.2rem 0 0.2rem 0.6rem;
  display: flex;
  align-items: center;
  border-radius: 15px;
  margin: 0.2rem 0.5rem;
}
.phone:hover {
  background-color: rgb(152, 153, 153);
  color: rgb(252, 252, 252);
  cursor: pointer;
}
.btn-close {
  border: 0;
  border-radius: 50%;
  background-color: rgb(231, 228, 228);
  padding: 0.2rem 0.3rem;
  margin: 0 0.3rem;
}
.btn-close:hover {
  background-color: rgb(255, 255, 255);
}
.list-interest{
  margin: 0.5rem 0 0 1.5rem;
  background-color: rgb(221, 221, 235);
  padding: 0.5rem 0.2rem;
  border-radius: 8px;
}
.list-interest li{
  background-color: rgb(255, 255, 255);
  width: max-content;
  padding-left: 0.7rem;
  padding-right: 0.3rem;
  border-radius: 10px 0 10px 0;
  margin: 0.5rem 1rem;
}
.list-interest button{
  font-size: 1.4rem;
  margin-left: 1rem;
}
.list-interest button:hover{
  transform: scale(1.1);
}
</style>

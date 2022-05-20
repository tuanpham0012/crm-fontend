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
                <div class="card-body" v-if="staff">
                  <div class="form-group row">
                    <label for="name" class="col-sm-3 col-form-label"
                      >Tên nhân viên:</label
                    >
                    <div class="col-sm-9">
                      <input
                        type="text"
                        class="form-control"
                        id="name"
                        v-model="staff.name"
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
                        v-model="staff.address"
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
                        v-model="staff.gender"
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
                        v-model="staff.date_of_birth"
                      />
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
                <div class="card-body" v-if="staff">
                  <div class="form-group row">
                    <label for="email" class="col-sm-3 col-form-label"
                      >Email:</label
                    >
                    <div class="col-sm-9">
                      <input
                        type="email"
                        class="form-control"
                        id="email"
                        v-model="staff.email"
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
                        v-model="staff.phone"
                        @keypress="isNumber($event)"
                        placeholder="Thêm số điện thoại"
                      />
                    </div>
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
export default {
  data() {
    return {
      phone: "",
      interest: -1,
    };
  },
  computed: {
    departments() {
      return this.$store.state.departments;
    },
    staff() {
      return this.$store.state.staff;
    },
  },
  created() {
    this.$store.dispatch("getStaffInfo", { id: this.$route.params.id, upload: true });
  },
  methods: {
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
    goBack() {
      this.$router.go(-1);
    },
    async update() {
      await axios({
        method: "PATCH",
        //url: customer.UPDATE + this.customer.id,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          Accept: "application/json",
        },
        //data: this.customer,
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

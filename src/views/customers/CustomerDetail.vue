<template>
  <div class="main-panel">
    <div class="content-wrapper">
      <div class="page-header">
              <h3 class="page-title"> Chi tiết khách hàng </h3>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb" v-if="customer">
                  <li class="breadcrumb-item"><router-link :to="{ name: 'customers'}">Khách hàng</router-link></li>
                  <li class="breadcrumb-item active" aria-current="page">{{ customer.name }}</li>
                </ol>
              </nav>
            </div>
      <div class="row">
        <div class="col-md-6 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <div class="clearfix">
                <div class="card-title">
                  <h4 class="title">Thông tin cơ bản</h4>
                  <div class="action" v-if="!editDefault">
                    <router-link
                      :to="{
                        name: 'customer_update',
                        params: { id: $route.params.id },
                      }"
                    >
                      <button type="button" class="btn btn-gradient-light btn-sm btn-icon-text">
                        <i class="mdi mdi-settings"></i> Sửa
                      </button>
                    </router-link>
                  </div>
                  <div class="confirm" v-else>
                    <button
                      type="button"
                      class="btn btn-gradient-light btn-sm"
                      @click="toggleEditDefault()"
                    >Hủy</button>
                    <button
                      type="button"
                      class="btn btn-gradient-success btn-sm"
                      @click="update()"
                    >Xác nhận</button>
                  </div>
                </div>
                <div class="card-body" v-if="customer">
                  <div class="row-info">
                    <span class="row-title">Mã khách hàng :</span>
                    <span class="row-content">
                      {{
                        customer.customer_code
                          ? customer.customer_code
                          : "Đang cập nhật"
                      }}
                    </span>
                  </div>
                  <div v-if="!editDefault">
                    <div class="row-info">
                      <span class="row-title">Tên khách hàng :</span>
                      <span class="row-content">
                        {{
                          customer.name ? customer.name : "Đang cập nhật"
                        }}
                      </span>
                    </div>
                    <div class="row-info">
                      <span class="row-title">Địa chỉ :</span>
                      <span class="row-content">
                        {{
                          customer.address ? customer.address : "Đang cập nhật"
                        }}
                      </span>
                    </div>
                    <div class="row-info">
                      <span class="row-title">Giới tính :</span>
                      <span class="row-content">
                        {{
                          customer.gender ? customer.gender : "Đang cập nhật"
                        }}
                      </span>
                    </div>
                    <div class="row-info">
                      <span class="row-title">Sinh nhật :</span>
                      <span class="row-content">
                        {{
                          customer.date_of_birth
                            ? customer.date_of_birth
                            : "Đang cập nhật"
                        }}
                      </span>
                    </div>
                    <div class="row-info">
                      <span class="row-title">Loại khách hàng :</span>
                      <span class="row-content">
                        {{
                          customer.type_customer && customer.type_customer.type
                            ? customer.type_customer.type
                            : "Đang cập nhật"
                        }}
                      </span>
                    </div>
                    <div class="row-info">
                      <span class="row-title">Sản phẩm quan tâm :</span>
                      <span class="row-content">Tuấn</span>
                    </div>
                  </div>
                  <div v-else>
                    <div class="form-group row" v-if="customer">
                      <label for="name" class="col-sm-3 col-form-label">Tên khách hàng:</label>
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
                      <label for="address" class="col-sm-3 col-form-label">Địa chỉ</label>
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
                      <label for="gender" class="col-sm-3 col-form-label">Giới tính</label>
                      <div class="col-sm-9">
                        <select class="form-control" id="gender" v-model="customer.gender">
                          <option>Nam</option>
                          <option>Nữ</option>
                        </select>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label for="birth" class="col-sm-3 col-form-label">Sinh nhật</label>
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
                      <label class="col-sm-3 col-form-label">Loại khách hàng</label>
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
                          >{{ type.type }}</option>
                        </select>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label
                        for="exampleInputEmail2"
                        class="col-sm-3 col-form-label"
                      >Sản phẩm quan tâm</label>
                      <div class="col-sm-9">
                        <input
                          type="email"
                          class="form-control"
                          id="exampleInputEmail2"
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
        <div class="col-md-6 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <div class="card-title">
                <h4 class="title">Các hành động</h4>
                <div class="action">
                  <button type="button" class="btn btn-gradient-light btn-sm btn-icon-text">
                    <i class="mdi mdi-settings"></i> Sửa
                  </button>
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
                  <div class="action">
                    <button type="button" class="btn btn-gradient-light btn-sm btn-icon-text">
                      <i class="mdi mdi-settings"></i> Sửa
                    </button>
                  </div>
                </div>
                <div class="card-body" v-if="customer">
                  <div class="row-info">
                    <span class="row-title">Email :</span>
                    <span class="row-content">
                      {{
                        customer.email ? customer.email : "Đang cập nhật"
                      }}
                    </span>
                  </div>
                  <div class="row-info" style="align-items: baseline">
                    <span class="row-title">Điện thoại :</span>
                    <ol class="row-content" v-if="customer.customer_phone.length > 0">
                      <li
                        v-for="(phone, index) in customer.customer_phone"
                        :key="index"
                      >{{ phone.phone }}</li>
                    </ol>
                    <span v-else>Đang cập nhật</span>
                  </div>
                  <div class="row-info">
                    <span class="row-title">Zalo :</span>
                    <span class="row-content">
                      {{
                        customer.address ? customer.address : "Đang cập nhật"
                      }}
                    </span>
                  </div>
                  <div class="row-info">
                    <span class="row-title">Facebook :</span>
                    <span class="row-content">
                      {{
                        customer.gender ? customer.gender : "Đang cập nhật"
                      }}
                    </span>
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
                  <button type="button" class="btn btn-gradient-light btn-sm btn-icon-text">
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
      editDefault: false,
      customer: null,
    };
  },
  computed: {
    typeCustomer() {
      return this.$store.state.typeOfCustomer;
    },
    customer() {
      return this.$store.state.customer;
    },
  },
  created() {
    this.$store.dispatch("getTypeCustomer");
    this.$store.dispatch("getCustomerInfo", { id: this.$route.params.id });
  },
  methods: {
    toggleEditDefault() {
      this.editDefault = !this.editDefault;
    },

    async update() {
      await axios({
        method: "PUT",
        url: customer.BASE + this.customer.id,
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
          this.toggleEditDefault();
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
  font-size: 1rem;
}
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
  min-height: 2.5rem;
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
</style>

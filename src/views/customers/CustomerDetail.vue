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
              <form class="form-sample">
                <div class="row bd">
                  <div class="col-md-12">
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label"
                        >Chọn phòng ban</label
                      >
                      <div class="col-sm-6 fill-select">
                        <select
                          class="form-control form-control-sm"
                          v-if="typeCustomer"
                          v-model="department_id"
                        >
                          <option value="-1" selected>
                            --Chọn phòng ban--
                          </option>
                          <option
                            v-for="(department, index) in departments"
                            :key="index"
                            :value="department.id"
                          >
                            {{ department.name }}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label">Nhân viên</label>
                      <div class="col-sm-6 fill-select">
                        <select
                          class="form-control form-control-sm"
                          v-if="typeCustomer"
                          v-model="staff_id"
                          :disabled="staffs && staffs.length == 0"
                        >
                          <option value="-1" selected>
                            --Chọn nhân viên--
                          </option>
                          <option
                            v-if="staffs"
                            v-for="(staff, index) in staffs"
                            :key="index"
                            :value="staff.user_id"
                            :disabled="
                              customer.contacts.user_id == staff.user_id
                            "
                            :class="{
                              selected:
                                customer.contacts.user_id == staff.user_id,
                            }"
                          >
                            {{ staff.user.name + " - " + staff.user_id }}
                          </option>
                        </select>
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
        <button
          type="button"
          class="btn btn-secondary"
          @click="toggleModalLead()"
        >
          Close
        </button>
        <button type="button" class="btn btn-primary" @click="assignSale()">
          Xác nhận
        </button>
      </template>
    </base-modal>

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
        <div class="col-md-6 stretch-card">
          <div class="card">
            <div class="card-body">
              <div class="clearfix">
                <div class="card-title">
                  <h4 class="title">Thông tin chính</h4>
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
                    <span class="row-title">Mã khách hàng :</span>
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
                      <span class="row-title">Tên khách hàng :</span>
                      <span class="row-content">{{
                        customer.name ? customer.name : "Đang cập nhật"
                      }}</span>
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
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 stretch-card">
          <div class="card">
            <div class="card-body">
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
                      <a class="dropdown-item" href="#">Gửi Mail</a>
                      <a class="dropdown-item" href="#">Gọi điện</a>
                      <a
                        class="dropdown-item"
                        href="#"
                        @click="toggleModalLead()"
                        >Gán người phụ trách</a
                      >
                      <a class="dropdown-item" href="#">Trao đổi zalo</a>
                      <a class="dropdown-item" href="#">Báo giá sản phẩm</a>
                    </div>
                  </div>
                </div>
                <div class="card-body" v-if="customer">
                  <div class="row-info">
                    <span class="row-title">Email :</span>
                    <span class="row-content">{{
                      customer.email ? customer.email : "Đang cập nhật"
                    }}</span>
                  </div>
                  <div class="row-info" style="align-items: baseline">
                    <span class="row-title">Điện thoại :</span>
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
                      {{
                        customer.address ? customer.address : "Đang cập nhật"
                      }}
                    </span>
                  </div>
                  <div class="row-info">
                    <span class="row-title">Facebook :</span>
                    <span class="row-content">
                      {{
                        customer.address ? customer.address : "Đang cập nhật"
                      }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-3 stretch-card">
          <div class="card">
            <div class="card-body">
              <div class="card-title">
                <h4 class="title">Thông tin khác</h4>
                <div class="action">
                  <button
                    type="button"
                    class="btn btn-gradient-light btn-sm btn-icon-text"
                  >
                    <i class="mdi mdi-settings"></i> Sửa
                  </button>
                </div>
              </div>
              <div v-if="customer">
                <div class="row-info">
                  <span class="row-title">Người phụ trách :</span>
                  <span class="row-content">{{
                    customer.contacts
                      ? customer.contacts.user.name
                      : "Đang cập nhật"
                  }}</span>
                </div>
                <div class="row-info">
                  <span class="row-title">Số lần liên hệ :</span>
                  <span class="row-content">{{
                    customer.address ? customer.address : "Đang cập nhật"
                  }}</span>
                </div>
                <div class="row-info">
                  <span class="row-title">Liên hệ cuối :</span>
                  <span class="row-content">{{
                    customer.gender ? customer.gender : "Đang cập nhật"
                  }}</span>
                </div>
                <div class="row-info">
                  <span class="row-title">Giá trị đơn hàng :</span>
                  <span class="row-content">
                    {{
                      customer.date_of_birth
                        ? customer.date_of_birth
                        : "Đang cập nhật"
                    }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-9 stretch-card">
          <div class="card">
            <div class="card-body">
              <div class="card-title">
                <h4 class="title">Ghi chú chăn sóc</h4>
                <div class="action">
                  <button
                    type="button"
                    class="btn btn-gradient-light btn-sm btn-icon-text"
                  >
                    <i class="mdi mdi-settings"></i> Sửa
                  </button>
                </div>
              </div>
              <div class="card-content">
                <div>
                  <div class="tab-content">
                    <customer-tab-vue></customer-tab-vue>
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
export default {
  components: {
    BaseModal,
    Loading,
    CustomerTabVue,
  },
  data() {
    return {
      modalLead: false,
      hoverNote: false,
      department_id: -1,
      staff_id: -1,
      staffs: [],
    };
  },
  computed: {
    typeCustomer() {
      return this.$store.state.typeOfCustomer;
    },
    customer() {
      return this.$store.state.customer;
    },
    departments() {
      return this.$store.state.departments;
    },
  },
  watch: {
    department_id() {
      var department = this.departments.filter(
        (x) => x.id === this.department_id
      );
      this.staffs = department[0].staff_of_department;
      this.staff_id = -1;
    },
  },
  created() {
    this.$store.dispatch("getCustomerInfo", { id: this.$route.params.id });
  },
  methods: {
    toggleModalLead() {
      this.modalLead = !this.modalLead;
    },
    async assignSale() {
      await axios({
        method: "POST",
        url: url.customer.ASSIGN_SALE,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          Accept: "application/json",
        },
        data: {
          selected: [this.customer.id],
          id: this.staff_id,
          update: true,
        },
      })
        .then((res) => {
          this.reLoadPage();
          cuteToast({
            type: "success",
            message: res.data,
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

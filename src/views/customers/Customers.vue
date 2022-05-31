<template lang="">
  <Loading />
  <div class="main-panel">
    <div class="content-wrapper">
      
      <!-- thêm mới khách hàng -->

      <CreateCustomerModal 
        v-if="modalCreate"
        @closeModal="toggleModalCreate()"
        @update="getList()"
      />

      <!-- tải file khách hàng -->
      <base-modal
        v-if="modalCustomerList"
        title="Thêm khách hàng"
        :size="false"
        @closeModal="toggleCreateCustomerList()"
      >
        <template v-slot:body>
          <div class="col-12">
            <div class="card">
              <div class="card-body">
                <form class="form-sample" id="formSendFile">
                  <div class="row bd">
                    <div class="col-md-12">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label"
                          >Danh sách khách hàng</label
                        >
                        <div class="input-group mb-3">
                          <input type="file" class="form-control" name="list-customer" id="inputGroupFile" ref="file">
                          <label class="input-group-text" for="inputGroupFile">Upload</label>
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
          <a href="http://127.0.0.1:8000/download" arget="_blank" rel="noopener noreferrer">
            <button type="button" class="btn btn-sm btn-info">
              Tải file mẫu
            </button>
          </a>
          <button type="button" class="btn btn-sm btn-info" @click="sendFile()">
            Xác nhận
          </button>
          <button
            type="button"
            class="btn btn-sm btn-secondary"
            @click="toggleCreateCustomerList()"
          >
            Close
          </button>
        </template>
      </base-modal>

      <!-- Gán người phụ trách -->

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
                        <label class="col-sm-3 col-form-label">Nhân viên</label>
                        <div class="col-sm-6 fill-select">
                          <select-list :listProps="listStaffs" @returnData="selectReturn"></select-list>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="form-group-checkbox">
                        <input
                          type="checkbox"
                          class="input-check"
                          v-model="assignNew"
                        />
                        <label>Ghi đè người phụ trách</label>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
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

      <!-- Thông tin khách hàng -->

      <base-modal
        v-if="modalCustomerInfo"
        title="Thông tin khách hàng"
        :size="true"
        :height="true"
        @closeModal="toggleModalCustomerInfo()"
      >
        <template v-slot:body>
          <customer-info-modal v-if="customer" :customer="customer" />
        </template>
        <template v-slot:footer> </template>
      </base-modal>

      <!-- Hết Thông tin khách hàng -->

      <!-- Gửi email khách hàng -->

      <SendMailModal
        v-if="modalSendMail"
        :listCustomer="selectCustomer"
        @close-modal="toggleModalSendMail()"/>
         

      <!-- Gửi email khách hàng -->

      <!--Cập nhật quan hệ khách hàng -->

      <UpdateTypeCustomerModal
        v-if="modalUpdateTypeCustomer"
        :listCustomer="selectCustomer"
        @close-modal="toggleModalUpdateTypeCustomer()"
        @update="getList()" />
         

      <!--Cập nhật quan hệ khách hàng -->



      <div class="page-header">
        <h3 class="page-title">Danh sách khách hàng</h3>
        <nav aria-label="breadcrumb">
          <div class="btn-action" v-if="$store.getters.getDepartmentID == 2">
            <button
              type="button"
              @click="toggleCreateCustomerList()"
              class="btn btn-sm btn-gradient-info btn-icon-text"
            >
              <i class="mdi mdi-cloud-upload"></i> Tải lên khách hàng
            </button>
            <button
              type="button"
              @click="toggleModalCreate()"
              class="btn btn-sm btn-gradient-info btn-icon-text"
            >
              <i class="mdi mdi-account-plus btn-icon-prepend"></i> Thêm mới
            </button>
            <button
              id="btnGroupDrop1"
              type="button"
              class="btn btn-sm btn-outline-info dropdown-toggle"
              data-toggle="dropdown"
              aria-expanded="false"
              :class="{ disabled: selectCustomer.length == 0 }"
              v-if="$store.getters.getPositionID == 1 || $store.getters.getPositionID == 2"
            >
              Hành động
            </button>
            <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
              <a
                class="dropdown-item"
                
                href="#"
                @click="toggleModalLead()"
                >Cập nhật người phụ trách</a
              >
              <a class="dropdown-item" @click="toggleModalSendMail()" href="#">Gửi Mail</a>
              <a class="dropdown-item" href="#">Gửi SMS</a>
              <a class="dropdown-item" href="#" @click="toggleModalUpdateTypeCustomer()">Cập nhật quan hệ</a>
              <a class="dropdown-item" href="#" @click="toggleDeleteCustomer()">Xóa khách hàng</a>
            </div>
          </div>
        </nav>
      </div>
      <div class="row">
        <div class="col-lg-12 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <div class="fill">
                <div class="form-group-fill">
                  <div class="input-group form-search">
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      v-model="search"
                      placeholder="Tên ,email khách hàng"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                    />
                    <div class="input-group-append">
                      <button
                        class="btn btn-sm btn-gradient-info form-control-sm"
                        @click="toggleSearch()"
                        type="button"
                      >
                        Tìm kiếm
                      </button>
                    </div>
                  </div>
                </div>
                <div class="form-group-fill">
                  <label class="fill-label">Quan hệ</label>
                  <div class="fill-select">
                    <select
                      class="form-control form-control-sm"
                      v-model="type_of_customer"
                    >
                      <option value="-1" seleted>-- Tất cả --</option>
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
                <div class="form-group-fill">
                  <label class="fill-lable">Trạng thái</label>
                  <div class="fill-select">
                    <select class="form-control form-control-sm" v-model="isDeleted">
                      <option value="-1">-- Tất cả --</option>
                      <option value="0">Đang sử dụng</option>
                      <option value="1">Đã xóa</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="table-responsive">
                <table class="table table-hover table-bordered">
                  <thead>
                    <tr>
                      <th>
                        <input
                          type="checkbox"
                          @click="checkAll()"
                          v-model="isCheckAll"
                          :indeterminate="select"
                        />
                      </th>
                      <th>Xem</th>
                      <th>Khách hàng</th>
                      <th>Số điện thoại</th>
                      <th>Email</th>
                      <th>Sinh nhật</th>
                      <th>Mối quan hệ</th>
                      <th>Người phụ trách</th>
                      <th>Người tạo</th>
                    </tr>
                  </thead>
                  <tbody v-if="customers && customers.data.length > 0">
                    <tr
                      v-for="(customer, index) in customers.data"
                      :key="index"
                    >
                      <td>
                        <input
                          type="checkbox"
                          v-model="selectCustomer"
                          :value="customer.id"
                          @change="updateCheckall()"
                        />
                        {{ index + 1 }}
                      </td>
                      <td
                        class="view"
                        @click="toggleModalCustomerInfo(customer.id)"
                      >
                        <i class="mdi mdi-eye"></i>
                      </td>
                      <td>
                        <div>
                          <router-link
                            :to="{
                              name: 'customer-detail',
                              params: { id: customer.id },
                            }"
                            >{{ customer.name }}</router-link
                          >
                          <p class="address">
                            <i class="mdi mdi-map-marker"></i
                            >{{ customer.address }}
                          </p>
                        </div>
                      </td>
                      <td
                        :class="{
                          updating: !customer.customer_phone.length > 0,
                        }"
                      >
                        {{
                          customer.customer_phone.length > 0
                            ? customer.customer_phone[0].phone
                            : "(Đang cập nhật)"
                        }}
                        <span
                          class="badge badge-pill badge-info"
                          v-if="customer.customer_phone.length > 1"
                          >+{{ customer.customer_phone.length - 1 }}</span
                        >
                      </td>
                      <td>{{ customer.email }}</td>
                      <td>{{ dateTime(customer.date_of_birth) }}</td>
                      <td>{{ customer.type_customer.type }}</td>
                      <td :class="{ updating: !customer.contacts }">
                        {{
                          customer.contacts
                            ? customer.contacts.name
                            : "( Chưa cập nhật )"
                        }}
                      </td>
                      <td :class="{ updating: !customer.user_id }">
                        {{
                          customer.user
                            ? customer.user.name
                            : "( Đang cập nhật )"
                        }}
                      </td>
                    </tr>
                  </tbody>
                  <tbody v-else>
                    <td></td>
                    <td>Không có dữ liệu hiển thị</td>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="panigate" v-if="customers">
              <nav aria-label="Page navigation example">
                <ul class="pagination justify-content-end">
                  <li class="page-item" v-if="currentPage != 1">
                    <a
                      class="page-link"
                      @click.prevent="currentPage--"
                      href="#"
                      aria-label="Previous"
                    >
                      <span aria-hidden="true">&laquo;</span>
                    </a>
                  </li>
                  <li
                    class="page-item"
                    v-for="page in customers.last_page"
                    :key="page"
                    :class="{ active: currentPage == page }"
                  >
                    <a
                      class="page-link"
                      @click.prevent="currentPage = page"
                      href="#"
                      >{{ page }}</a
                    >
                  </li>
                  <li
                    class="page-item"
                    v-if="currentPage != customers.last_page"
                  >
                    <a
                      class="page-link"
                      @click.prevent="currentPage++"
                      href="#"
                      aria-label="Next"
                    >
                      <span aria-hidden="true">&raquo;</span>
                    </a>
                  </li>
                </ul>
              </nav>
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
import CustomerInfoModal from "../../components/CustomerInfoModal.vue";
import SendMailModal from "../../components/SendMailModal.vue";
import UpdateTypeCustomerModal from "../../components/UpdateTypeCustomerModal.vue";
import SelectList from "../../components/SelectList.vue";
import CreateCustomerModal from "../../components/CreateCustomerModal.vue";

import moment from "moment/min/moment-with-locales";
moment.locale("vi");

export default {
  components: {
    BaseModal,
    Loading,
    CustomerInfoModal,
    SendMailModal,
    UpdateTypeCustomerModal,
    SelectList,
    CreateCustomerModal,

  },
  data() {
    return {
      modalCreate: false,
      modalLead: false,
      modalCustomerInfo: false,
      modalSendMail: false,
      modalUpdateTypeCustomer: false,
      modalCustomerList: false,
      assignNew: true,
      department_id: -1,
      staff_id: -1,
      currentPage: 1,
      search: "",
      type_of_customer: -1,
      isDeleted: 0,
      interest: -1,
      staffs: [],
      select: false,
      selectCustomer: [],
      isCheckAll: false,
      customerFile: null,
      previewImage:null
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
    customers() {
      return this.$store.state.customers
        ? this.$store.state.customers.customers
        : null;
    },
    customer() {
      return this.$store.state.customer;
    },
    departments() {
      return this.$store.state.baseData.staff ?? null;
    },
    listStaffs(){
      return this.$store.state.customers
        ? this.$store.state.customers.staffs
        : null;
    }
  },
  watch: {
    currentPage() {
      this.getList();
    },
    type_of_customer() {
      this.getList();
    },
    department_id() {
      var department = this.departments.filter(
        (x) => x.id === this.department_id
      );
      this.staffs = department[0].staff_of_department;
      this.staff_id = -1;
    },
    interests() {
      console.log(this.interests);
    },
    isDeleted(){
      this.getList();
    },
  },
  created() {
    if(!this.customers){
      this.getList();
    }else{
      this.currentPage = this.customers.current_page;
    }
    //this.$store.dispatch("getListDepartment");
  },
  methods: {
    checkAll: function () {
      if (this.select) {
        this.selectCustomer = [];
        this.select = false;
        this.isCheckAll = 0;
      } else {
        this.isCheckAll = !this.isCheckAll;
        this.selectCustomer = [];
        if (this.isCheckAll) {
          // Check all
          for (var key in this.customers.data) {
            this.selectCustomer.push(this.customers.data[key].id);
          }
        }
      }
      console.log(this.isCheckAll);
    },
    updateCheckall: function () {
      if (this.selectCustomer.length == this.customers.data.length) {
        this.isCheckAll = true;
        this.select = false;
        console.log(this.isCheckAll);
      } else {
        this.isCheckAll = false;
      }
      if (this.selectCustomer.length > 0) this.select = true;
      else this.select = false;
    },

    uploadFile(){
      this.customerFile = this.$refs.file.files[0];
    },

    sendFile(){
      var $formSendFile = $('#formSendFile');
      const formData = new FormData(formSendFile);
      console.log(formData);
      axios({
        method: "POST",
        url: url.customer.CREATE_MUTILPLE_CUSTOMER,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          Accept: "application/json",
        },
        data: formData,
      })
        .then((res) => {
          console.log(res.data);
          cuteToast({
            type: "success",
            message: res.data.message,
            timer: 5000,
          });
          this.toggleCreateCustomerList();
          this.getList();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    dateTime(value) {
      return moment(value).utc().format("DD/MM/YYYY");
    },
    toggleModalCreate() {
      this.modalCreate = !this.modalCreate;
    },
    toggleCreateCustomerList(){
      this.modalCustomerList = !this.modalCustomerList;
    },
    toggleModalLead() {
      this.modalLead = !this.modalLead;
    },
    toggleModalCustomerInfo(id) {
      this.modalCustomerInfo = !this.modalCustomerInfo;
      if (id != null) {
        this.$store.dispatch("getCustomerInfo", { id: id, upload: true });
      }
    },
    toggleModalSendMail(){
      this.modalSendMail = !this.modalSendMail;
    },
    toggleModalUpdateTypeCustomer(){
      this.modalUpdateTypeCustomer = !this.modalUpdateTypeCustomer;
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
    toggleSearch() {
      this.getList();
    },
    getList() {
      this.$store.dispatch("getListCustomer", {
        page: this.currentPage,
        search: this.search,
        type: this.type_of_customer,
        deleted: this.isDeleted,
      });
    },
    selectReturn(value){
      this.staff_id = value.id;
    },
    async assignSale() {
      console.log(this.selectCustomer + " - staff: " + this.staff_id);
      await axios({
        method: "POST",
        url: url.customer.ASSIGN_SALE,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          Accept: "application/json",
        },
        data: {
          listCustomer: this.selectCustomer,
          user_id: this.staff_id,
          update: this.assignNew,
        },
      })
        .then((res) => {
          console.log(res.data);
          this.toggleModalLead();
          cuteToast({
              type: "success",
              message: res.data.message,
              timer: 3000,
            });
          this.getList();
        })
        .catch((err) => {
          console.log(err);
          cuteToast({
              type: "error",
              message: err.data.message,
              timer: 3000,
            });
        });
    },
    toggleDeleteCustomer(){
      cuteAlert({
        type: "question",
        title: "Xoá khách hàng",
        message: "Bạn có chắc muốn xóa các khách hàng này?",
        confirmText: "Xác nhận",
        cancelText: "Hủy",
      }).then((e) => {
        if (e) {
          axios({
            url: url.customer.DELETE_MULTIPLE_CUSTOMER,
            method: "POST",
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
              Accept: "application/json",
            },
            data: {
              listCustomer: this.selectCustomer,
            },
          })
            .then((res) => {
              this.getList();
              cuteToast({
                type: "success",
                message: res.data.message,
                timer: 5000,
              });
              this.resetValue();
            })
            .catch((err) => {
              cuteToast({
                type: "error",
                message: err.data.msg,
                timer: 3000,
              });
            });
        }
      });
    }
  },
};
</script>
<style scoped>
td {
  padding: 0.25rem 0.5rem;
}
td a {
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  color: rgb(4, 0, 255);
}
td a:hover {
  color: rgb(255, 136, 0);
}
.updating {
  color: rgb(252, 31, 31);
  font-style: italic;
}
.input-check {
  margin: 0.5rem 1rem;
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
.disabled {
  background-color: rgb(240, 234, 229);
  cursor: default;
}
.view {
  text-align: center;
  color: rgb(4, 0, 255);
}
.view:hover {
  transform: scale(1.2);
  cursor: pointer;
  color: rgb(255, 81, 0);
}
.name {
  font-size: 1rem;
}
.address {
  font-size: 0.756rem;
  color: rgb(76, 76, 94);
}
.bd {
  border-bottom: 1px gainsboro solid;
  margin-bottom: 2rem;
}
.panigate {
  margin: 0 3rem 1rem 3rem;
  padding: 0.5rem 1rem;
}
.btn-action {
  display: flex;
  justify-content: space-between;
}

.btn-action button {
  margin: 0.1rem 0.5rem;
}
.dropdown-menu {
  margin: 0.5rem;
}
.list-interest {
  margin: 0.5rem 0 0 1.5rem;
  background-color: rgb(221, 221, 235);
  padding: 0.5rem 0.2rem;
  border-radius: 8px;
}
.list-interest li {
  background-color: rgb(255, 255, 255);
  width: max-content;
  padding-left: 0.7rem;
  padding-right: 0.3rem;
  border-radius: 10px 0 10px 0;
  margin: 0.5rem 1rem;
}
.list-interest button {
  font-size: 1.4rem;
  margin-left: 1rem;
}
.list-interest button:hover {
  transform: scale(1.1);
}
</style>

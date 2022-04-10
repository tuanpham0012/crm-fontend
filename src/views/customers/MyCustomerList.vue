<template lang="">
    <Loading/>
    <div class="main-panel">
          <div class="content-wrapper">
          <base-modal v-if="showModal" title="Thêm mới khách hàng" :size="true" @closeModal="toggleModal">
            <template v-slot:body>
              <div class="col-12">
                <div class="card">
                  <div class="card-body">
                    <form class="form-sample">
                      <div class="row bd">
                        <div class="col-md-6">
                          <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Tên khách hàng</label>
                            <div class="col-sm-9">
                              <input type="text" class="form-control" v-model="customer.name" />
                            </div>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Email</label>
                            <div class="col-sm-9">
                              <input type="email" class="form-control" v-model="customer.email" />
                            </div>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Điện thoại</label>
                            <div class="col-sm-9">
                              <input type="text" class="form-control" @keypress="isNumber($event)" v-model="customer.phone"/>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Địa chỉ</label>
                            <div class="col-sm-9">
                              <input type="text" class="form-control" v-model="customer.address"/>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Ngày sinh</label>
                            <div class="col-sm-9">
                              <input type="date" class="form-control" v-model="customer.date_of_birth" />
                            </div>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Giới tính</label>
                            <div class="col-sm-9">
                              <select class="form-control" v-model="customer.gender">
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Loại khách hàng</label>
                            <div class="col-sm-9">
                              <select class="form-control" v-if="typeCustomer">
                                <option v-for="(type, index) in typeCustomer" :key="index" :value ="type.id">{{ type.type}}</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Địa chỉ</label>
                            <div class="col-sm-9">
                              <input type="text" class="form-control" v-model="customer.address"/>
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
              <button type="button" class="btn btn-secondary" @click="toggleModal()">Close</button>
              <button type="button" class="btn btn-primary" @click="create()">Xác nhận</button>
            </template>
          </base-modal>
          <base-modal v-if="modalLead" title="Gán người phụ trách" :size="false" @closeModal="toggleModalLead()">
            <template v-slot:body>
              <div class="col-12">
                <div class="card">
                  <div class="card-body">
                    <form class="form-sample">
                      <div class="row bd">
                        <div class="col-md-12">
                          <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Chọn phòng ban</label>
                            <div class="col-sm-6 fill-select">
                              <select class="form-control form-control-sm" v-if="typeCustomer" v-model="department_id">
                                <option value="-1" selected>--Chọn phòng ban--</option>
                                <option v-for="(department, index) in departments" :key="index" :value ="department.id">{{ department.name}}</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Nhân viên</label>
                            <div class="col-sm-6 fill-select">
                              <select class="form-control form-control-sm" v-if="typeCustomer" v-model="staff_id" :disabled="staffs && staffs.length == 0 ">
                                <option value="-1" selected>--Chọn nhân viên--</option>
                                <option v-if="staffs" v-for="(staff, index) in staffs" :key="index" :value ="staff.user_id">{{ staff.user.name}}</option>
                              </select>
                            </div> 
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group-checkbox"> 
                            <input type="checkbox" class="input-check" v-model="assignNew"/>
                            <label>Cập nhật người phụ trách mới</label>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </template>
            <template v-slot:footer>
              <button type="button" class="btn btn-secondary" @click="toggleModalLead()">Close</button>
              <button type="button" class="btn btn-primary" @click="assignSale()">Xác nhận</button>
            </template>
          </base-modal>
            <div class="page-header">
              <h3 class="page-title"> Danh sách khách hàng </h3>
              <nav aria-label="breadcrumb">
                <div class="btn-action">
                        <button type="button" @click="toggleModal()" class="btn btn-sm btn-gradient-info btn-icon-text"><i class="mdi mdi-account-plus btn-icon-prepend"></i> Thêm mới
                        </button>
                        <button id="btnGroupDrop1" type="button" class="btn btn-sm btn-outline-info dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                          Hành động
                        </button>
                        <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                          <a class="dropdown-item" :class="{'disabled' : selected.length == 0}" href="#" @click="toggleModalLead()">Gán sale</a>
                          <a class="dropdown-item" href="#">Dropdown link</a>
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
                              <input type="text" class="form-control form-control-sm" v-model="search" placeholder="Tên ,email khách hàng" aria-label="Recipient's username" aria-describedby="basic-addon2">
                              <div class="input-group-append">
                                <button class="btn btn-sm btn-gradient-info form-control-sm" @click="toggleSearch()" type="button">Tìm kiếm</button>
                              </div>
                            </div>
                          </div>
                          <div class="form-group-fill">
                            <label class="fill-label">Loại khách hàng</label>
                            <div class="fill-select">
                              <select class="form-control form-control-sm" v-model="type_of_customer">
                                <option value="-1" seleted> -- Tất cả -- </option>
                                <option v-for="(type, index) in typeCustomer" :key="index" :value ="type.id">{{ type.type}}</option>
                              </select>
                            </div>
                          </div>
                          <div class="form-group-fill">
                            <label class="fill-lable">Trạng thái</label>
                            <div class="fill-select">
                              <select class="form-control form-control-sm">
                                <option>-- Tất cả --</option>
                                <option>Đang hoạt động</option>
                                <option>Tạm nghỉ</option>
                                <option>Đã xóa</option>
                              </select>
                            </div>
                          </div>
                      
                    </div>
                    <div class="table-responsive">
                      <table class="table table-striped table-bordered">
                        <thead>
                          <tr>
                            <th> <input type="checkbox" @click="checkAll()" v-model="isCheckAll" :indeterminate="select"></th>
                            <th> Xem </th>
                            <th> Khách hàng </th>
                            <th> Số điện thoại </th>
                            <th> Email </th>
                            <th> Loại khách hàng </th>
                            <th> Trạng thái </th>
                            <th> Ngày tạo </th>
                            <th> Ngày cập nhật </th>
                          </tr>
                        </thead>
                        <tbody v-if="myCustomers && myCustomers.total > 0">
                          <tr v-for="(item, index) in myCustomers.data" :key="index">
                            <td><input type="checkbox" v-model="selected" :value="item.customer.id" @change="updateCheckall()"> {{ index+1 }}</td>
                            <td class="view">
                              <router-link :to="{ name:'customer_detail', params:{ 'id': item.customer.id} }">
                                <i class="mdi mdi-eye"></i>
                              </router-link>
                                
                            </td>
                            <td>
                              <div>
                                <p class="name">{{ item.customer.name }}</p>
                                <p class="address"><i class="mdi mdi-map-marker"></i>{{ item.customer.address }}</p>
                              </div>
                            </td>
                            <td :class="{'updating' : !item.customer.customer_phone.length > 0}"> {{ item.customer.customer_phone.length > 0 ? item.customer.customer_phone[0].phone : '(Đang cập nhật)' }}   <span class="badge badge-pill badge-info" v-if="item.customer.customer_phone.length > 1">+{{(item.customer.customer_phone.length - 1)}}</span> </td>
                            <td> {{ item.customer.email }} </td>
                            <td> {{ item.customer.type_customer.type }} </td>
                            <td> {{ item.customer.status}} </td>
                            <td> {{ dateTime(item.customer.created_at) }} </td>
                            <td> {{ dateTime(item.customer.updated_at) }} </td>
                          </tr>
                        </tbody>
                        <tbody v-else>
                          <td></td>
                          <td> Không có dữ liệu hiển thị</td>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <!-- <div class="panigate" v-if="customers">
                    <nav aria-label="Page navigation example">
                      <ul class="pagination justify-content-end">
                        <li class="page-item" v-if="currentPage != 1">
                          <a class="page-link" @click.prevent="currentPage--" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                          </a>
                        </li>
                        <li class="page-item" v-for="page in customers.last_page" :key="page" :class="{ 'active' : currentPage == page}">
                          <a class="page-link" @click.prevent="currentPage = page" href="#">{{ page }}</a>
                        </li>
                        <li class="page-item" v-if="currentPage != customers.last_page">
                          <a class="page-link" @click.prevent="currentPage++" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
</template>
<script>
import axios from 'redaxios';
import * as url from '../../config';
import BaseModal from '../../components/Modal.vue';
import Loading from '../../components/Loading.vue';
import moment from 'moment';


export default {
  components: {
    BaseModal,
    Loading,
  },
  data() {
    return {
      showModal: false,
      modalLead: false,
      assignNew: true,
      department_id: -1,
      staff_id: -1,
      currentPage: 1,
      search: '',
      type_of_customer: -1,
      staffs: [],
      select: false,
      selected: [],
      isCheckAll: false,
    }
  },
  computed: {
    typeCustomer() {
      return this.$store.state.typeOfCustomer;
    },
    myCustomers() {
      return this.$store.state.myCustomerList;
    },
    departments(){
      return this.$store.state.departments;
    }
  },
  watch: {
    currentPage() {
      this.getList(this.currentPage, this.search, this.type_of_customer);
    },
    type_of_customer() {
      this.getList(this.currentPage, this.search, this.type_of_customer);
    },
  },
  created() {
      this.getList(this.currentPage, this.search, this.type_of_customer);
      this.$store.dispatch('getTypeCustomer');
      this.$store.dispatch('getListDepartment');
  },
  methods: {
    checkAll: function () {
      if (this.select) {
        this.selected = [];
        this.select = false;
        this.isCheckAll = 0;
      } else {
        this.isCheckAll = !this.isCheckAll;
        this.selected = [];
        if (this.isCheckAll) { // Check all
          for (var key in this.customers.data) {
            this.selected.push(this.customers.data[key].id);
          }
        }
      }
      console.log(this.isCheckAll);
    },
    updateCheckall: function () {
      if (this.selected.length == this.customers.data.length) {
        this.isCheckAll = true;
        this.select = false;
        console.log(this.isCheckAll);
      } else {
        this.isCheckAll = false;
      }
      if (this.selected.length > 0) this.select = true;
      else this.select = false;
    },
    dateTime(value) {
      return moment(value).utc().format('HH:mm:ss DD-MM-YYYY');
    },
    toggleModal() {
      this.showModal = !this.showModal;
    },
    toggleModalLead() {
      this.modalLead = !this.modalLead;
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
      this.getList(this.currentPage, this.search, this.type_of_customer);
    },
    getList(page, search, type) {
      this.$store.dispatch('getMyCustomerList', { page: page, search: search, type: type });
    },
    async create() {
      await axios({
        method: 'POST',
        url: url.customer.CREATE,
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          'Accept': 'application/json'
        },
        data: this.customer,
      }).then(res => {
        console.log(res);
        this.toggleModal();
        cuteAlert({
          type: "success",
          title: "Thêm mới khách hàng",
          message: "Thêm mới khách hàng thành công!",
          buttonText: "Xác nhận",
        })
        this.getList(this.currentPage, this.search, this.type_of_customer);
      }).catch(err => {
        console.log(err);
        let msg = '';
        Object.keys(err.data.errors).forEach(function (key) {
          msg += key + ": " + err.data.errors[key][0] + '\r\n';
        });
        cuteToast({
          type: "error",
          message: err.data.message + '\r\n' + msg,
          timer: 5000
        })
        console.log(msg);
      })
    },
    async assignSale(){
      console.log(this.selected + ' - staff: ' + this.staff_id);
      await axios({
        method: 'POST',
        url: url.customer.ASSIGN_SALE,
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          'Accept': 'application/json'
        },
        data: {
          selected: this.selected,
          id: this.staff_id,
          update: this.assignNew
        }
      }).then(res => {
        console.log(res);
        this.getList(this.currentPage, this.search, this.type_of_customer);
      }).catch( err => {
        console.log(err);
      })
    }
  },
}
</script>
<style scoped>
p {
  padding: 0;
  margin: 0;
}
td {
  padding: 0.4rem 0.7rem;
}
.updating{
  color: rgb(252, 31, 31);
  font-style: italic;
}
.input-check{
  margin: 0.5rem 1rem;
}
.form-group-checkbox{
  padding: 0.5rem 1rem;
  display: flex;
  align-content: center;
  align-items: center;
  margin-bottom: 1rem;
}
.form-group-checkbox label{
  margin: 0;
}
.disabled{
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
}
.name {
  font-size: 1rem;
}
.address {
  font-size: 0.7rem;
  color: blue;
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
</style>
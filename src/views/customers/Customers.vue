<template lang="">
    <div class="main-panel">
          <div class="content-wrapper">
          <base-modal v-if="showModal" title="Thêm mới khách hàng" @closeModal="toggleModal">
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
                          <a class="dropdown-item" href="#">Gán sale</a>
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
                            <th> <input type="checkbox" id="checkall"></th>
                            <th> Xem </th>
                            <th> Khách hàng </th>
                            <th> Số điện thoại </th>
                            <th> Email </th>
                            <th> Loại khách hàng </th>
                            <th> Trạng thái </th>
                            <th> Người phụ trách </th>
                            <th> Ngày tạo </th>
                            <th> Ngày cập nhật </th>
                          </tr>
                        </thead>
                        <tbody v-if="customers && customers.data.length > 0">
                          <tr v-for="(customer,index) in customers.data" :key="index">
                            <td><input type="checkbox" id="checkall"> {{ index+1 }}</td>
                            <td class="view">
                              <router-link :to="{ name:'customer_detail', params:{ 'id': customer.id} }">
                                <i class="mdi mdi-eye"></i>
                              </router-link>
                                
                            </td>
                            <td> 
                              <div>
                                <p class="name">{{ customer.name }}</p>
                                <p class="address"><i class="mdi mdi-map-marker"></i>{{ customer.address }}</p>
                              </div>
                            </td>
                            <td> {{ customer.customer_phone.length > 0 ? customer.customer_phone[0].phone : 'Đang cập nhật' }}   <span class="badge badge-pill badge-info" v-if="customer.customer_phone.length > 1">+{{(customer.customer_phone.length - 1)}}</span> </td>
                            <td> {{ customer.email }} </td>
                            <td> {{ customer.type_customer.type }} </td>
                            <td> {{ customer.status}} </td>
                            <td> {{ customer.status}} </td>
                            <td> {{ dateTime(customer.created_at) }} </td>
                            <td> {{ dateTime(customer.updated_at) }} </td>
                          </tr>
                        </tbody>
                        <tbody v-else>
                          <td></td>
                          <td> Không có dữ liệu hiển thị</td>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div class="panigate" v-if="customers">
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
                  </div>
                </div>
              </div>
            </div>
          </div>
              
          <!-- content-wrapper ends -->
          <!-- partial:../../partials/_footer.html -->
          <footer class="footer">
            <div class="container-fluid clearfix">
              <span class="text-muted d-block text-center text-sm-left d-sm-inline-block">Copyright © bootstrapdash.com 2020</span>
              <span class="float-none float-sm-right d-block mt-1 mt-sm-0 text-center"> Free <a href="https://www.bootstrapdash.com/bootstrap-admin-template/" target="_blank">Bootstrap admin templates </a> from Bootstrapdash.com</span>
            </div>
          </footer>
          <!-- partial -->
        </div>
</template>
<script>
import axios from 'redaxios';
import { customer } from '../../config';
import BaseModal from '../../components/Modal.vue';
import moment from 'moment';

export default {
  components: {
    BaseModal,
    },
    data() {
      return {
        showModal: false,
        currentPage: 1,
        search: '',
        type_of_customer: -1,
        customer:{
          name: '',
          email: '',
          phone: '',
          gender: 'Nam',
          address: '',
          type_of_customer_id: '1',
        },
      }
    },
    computed:{
      typeCustomer(){
        return this.$store.state.typeOfCustomer;
      },
      customers(){
        return this.$store.state.customers;
      },
    },
    watch:{
      currentPage(){
        this.getList(this.currentPage, this.search, this.type_of_customer);
      },
      type_of_customer(){
        this.getList(this.currentPage, this.search, this.type_of_customer);
      }
    },
    created(){
      this.getList(this.currentPage, this.search, this.type_of_customer);
      this.$store.dispatch('getTypeCustomer');
    },
    methods: {
      dateTime(value) {
        return moment(value).format('HH:mm:ss DD-MM-YYYY');
      },
      toggleModal(){
        this.showModal = !this.showModal;
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
      toggleSearch(){
        this.getList(this.currentPage, this.search, this.type_of_customer);
      },
      getList(page,search,type){
        this.$store.dispatch('getListCustomer',{ page: page, search: search, type: type });
      },
      async create(){
        await axios({
          method: 'POST',
          url: customer.CREATE,
          headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          'Accept': 'application/json'
          },
          data: this.customer,
        }).then( res => {
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
          Object.keys(err.data.errors).forEach(function(key) {
            msg += key + ": " + err.data.errors[key][0] + '\r\n';
          });
          cuteToast({
              type: "error",
              message:  err.data.message + '\r\n' + msg,
              timer: 5000
            })

            console.log(msg);
        })
      },
    },
}
</script>
<style scoped>
p{
  padding: 0;
  margin: 0;
}
td{
  padding: 0.4rem 0.7rem;
}
.view{
  text-align: center;
  color: rgb(4, 0, 255);
}
.view:hover{
  transform: scale(1.2);
  cursor: pointer;
}
.name{
  font-size: 1rem;

}
.address{
  font-size: 0.7rem;
  color: blue;
}
.bd{
  border-bottom: 1px gainsboro solid;
  margin-bottom: 2rem;
}
.panigate{
  margin: 0 3rem 1rem 3rem;
  padding: 0.5rem 1rem;
}
.btn-action{
  display: flex;
  justify-content: space-between;
}

.btn-action button{
  margin: 0.1rem 0.5rem;
}
.dropdown-menu{
  margin: 0.5rem;
}

</style>
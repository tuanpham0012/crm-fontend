<template lang="">
    <div class="main-panel">
          <div class="content-wrapper">
          <base-modal v-if="showModal" title="Thêm mới nhân viên" @closeModal="toggleModal">
            <template v-slot:body>
              <div class="col-12">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">Thông tin nhân viên</h4>
                    <form class="form-sample">
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Tên </label>
                            <div class="col-sm-9">
                              <input type="text" class="form-control" v-model="user.name" />
                            </div>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Email</label>
                            <div class="col-sm-9">
                              <input type="email" class="form-control" v-model="user.email" />
                            </div>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Điện thoại</label>
                            <div class="col-sm-9">
                              <input type="text" class="form-control" v-model="user.phone"/>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Giới tính</label>
                            <div class="col-sm-9">
                              <select class="form-control" v-model="user.gender">
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Ngày sinh</label>
                            <div class="col-sm-9">
                              <input type="date" class="form-control" placeholder="dd/mm/yyyy" v-model="user.date_of_birth" />
                            </div>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Phòng ban</label>
                            <div class="col-sm-9">
                              <select class="form-control">
                                <option>Category1</option>
                                <option>Category2</option>
                                <option>Category3</option>
                                <option>Category4</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Địa chỉ</label>
                            <div class="col-sm-9">
                              <input type="text" class="form-control" v-model="user.address"/>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Nhóm quyền</label>
                            <div class="col-sm-9">
                              <select class="form-control">
                                <option>Category1</option>
                                <option>Category2</option>
                                <option>Category3</option>
                                <option>Category4</option>
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
              <button type="button" class="btn btn-secondary" @click="toggleModal()">Close</button>
              <button type="button" class="btn btn-primary" @click="create()">Xác nhận</button>
            </template>
          </base-modal>
            <div class="page-header">
              <h3 class="page-title"> Nhân viên </h3>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item"><a href="#">Quản lí</a></li>
                  <li class="breadcrumb-item active" aria-current="page">Nhân viên</li>
                </ol>
              </nav>
            </div>
            <div class="row">
              <div class="col-lg-12 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">Danh sách nhân viên</h4>
                    <div class="btn-add">
                        <button type="button" @click="showModal = !showModal" class="btn btn-sm btn-gradient-info btn-icon-text"><i class="mdi mdi-account-plus btn-icon-prepend"></i> Thêm mới
                        </button>
                      </div>
                    <div class="fill">
                     <div class="form-group-fill">
                            <div class="input-group form-search">
                              <input type="text" class="form-control form-control-sm" placeholder="Tên nhân viên, email, số điện thoại" aria-label="Recipient's username" aria-describedby="basic-addon2">
                              <div class="input-group-append">
                                <button class="btn btn-sm btn-gradient-info form-control-sm" type="button">Tìm kiếm</button>
                              </div>
                            </div>
                          </div>
                          <div class="form-group-fill">
                            <label class="fill-lable">Phòng ban</label>
                            <div class="fill-select">
                              <select class="form-control form-control-sm">
                                <option>Americasss</option>
                                <option>Italyfffffffffffdddd</option>
                                <option>Russia</option>
                                <option>Britain</option>
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
                      <table class="table table-hover">
                        <thead>
                          <tr>
                            <th> # </th>
                            <th> User </th>
                            <th> Họ tên </th>
                            <th> Email </th>
                            <th> Điện thoại </th>
                            <th> Phòng ban </th>
                            <th> Nhóm quyền </th>
                            <th> Nhóm quyền </th>
                            <th> Nhóm quyền </th>
                            <th> Đăng nhập cuối </th>
                          </tr>
                        </thead>
                        <tbody v-if="staffs.length > 0">
                          <tr v-for="(staff,index) in staffs" :key="index">
                            <td>{{ index + 1}}</td>
                            <td>
                              <img src="../../assets/images/faces/user.jpg" alt="" />
                            </td>
                            <td> {{ staff.name }} </td>
                            <td> {{ staff.email }} </td>
                            <td> {{ staff.phone }} </td>
                            <td> {{ staff.department }} </td>
                            <td> {{ staff.role}} </td>
                            <td> {{ staff.last_login }} </td>
                          </tr>
                        </tbody>
                        <tbody v-else>
                          <td></td>
                          <td> Không có dữ liệu hiển thị</td>
                        </tbody>
                      </table>
                    </div>
                    
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
import { staff } from '../../config';
import BaseModal from '../../components/Modal.vue';
export default {
  components: {
    BaseModal,
  },
  data() {
    return {
      showModal: false,
      staffs: [],
      user: {
        name: '',
        email: '',
        phone: '',
        gender: '',
        date_of_birth: '',
        address: '',
        department: 1,
        role_id: 3,
        password: '123456'
      }
    }
  },
  created() {
    this.getStaff();
  },
  methods: {
    toggleModal() {
      this.showModal = !this.showModal;
    },
    async create() {
      await axios({
        method: 'post',
        url: staff.CREATE_USER,
        data: this.user,
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          'Accept': 'application/json'
        }
      }).then(res => {
        this.showModal = false;
        cuteAlert({
          type: "success",
          title: "Thêm nhân viên",
          message: "Thêm mới nhân viên thành công",
          buttonText: "Xác nhận"
        })
      }).catch(err => {
        cuteToast({
          type: "error", // or 'info', 'error', 'warning'
          message: err.data.message,
          timer: 5000
        })
        console.log(err);
      })
    },

    getStaff() {
      axios({
        method: 'GET',
        url: staff.GET_LIST_STAFF,
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          'Accept': 'application/json'
        }
      }).then(res => {
        this.staffs = res.data.data;
        console.log(res.data);
      }).catch(err => {
        console.log(err);
      })
    }
  },
}
</script>
<style scoped>
td{
  padding: 0.5rem;
}
.fill {
  display: flex;
  justify-content: flex-start;
  align-content: center;
  flex-wrap: wrap;
  margin: 2rem 0.5rem;
}
.form-group-fill {
  width: auto;
  display: flex;
  justify-content: space-around;
  padding: 0 0.7rem;
  margin: 0.45rem 0.7rem;
  align-items: center;
}
.fill-label {
  margin: 0 2rem;
}
.fill-select {
  margin: 0 2rem;
}
.fill-select select {
  padding: 0.4rem 1.2rem;
  color: rgb(20, 20, 22);
}
td img:hover {
  cursor: pointer;
  transform: scale(1.2);
}
</style>
<template lang="">
  <Loading />
  <div class="main-panel">
    <div class="content-wrapper">
      <base-modal
        v-if="modalCreate"
        title="Thêm mới nhân viên"
        :size="true"
        @closeModal="toggleModalCreate()"
      >
        <template v-slot:body>
          <div class="col-12">
            <div class="card">
              <div class="card-body">
                <form class="form-sample">
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label">Họ tên </label>
                        <div class="col-sm-9">
                          <input
                            type="text"
                            class="form-control"
                            v-model="user.name"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label"
                          >Địa chỉ email</label
                        >
                        <div class="col-sm-9">
                          <input
                            type="email"
                            class="form-control"
                            v-model="user.email"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label"
                          >Số điện thoại</label
                        >
                        <div class="col-sm-9">
                          <input
                            type="text"
                            class="form-control"
                            v-model="user.phone"
                          />
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
                          <input
                            type="date"
                            class="form-control"
                            placeholder="dd/mm/yyyy"
                            v-model="user.date_of_birth"
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
                            v-model="user.address"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label">Phòng ban</label>
                        <div class="col-sm-9">
                          <select
                            class="form-control"
                            v-model="user.department_id"
                          >
                            <option value="-1">-- Chọn phòng ban --</option>
                            <option
                              v-for="(department, i) in departments"
                              :key="i"
                              :value="department.id"
                            >
                              {{ department.name }}
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label">Nơi sinh</label>
                        <div class="col-sm-9">
                          <input
                            type="text"
                            class="form-control"
                            v-model="user.home_town"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label">Chức vụ</label>
                        <div class="col-sm-9">
                          <select
                            class="form-control"
                            v-model="user.position_id"
                          >
                            <option value="1">Trưởng phòng</option>
                            <option value="2">Phó phòng</option>
                            <option value="3">Nhân viên</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label">Quốc tịch</label>
                        <div class="col-sm-9">
                          <input
                            type="text"
                            class="form-control"
                            v-model="user.nationality"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label">Số CMTND</label>
                        <div class="col-sm-9">
                          <input
                            type="text"
                            class="form-control"
                            v-model="user.cmnd"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label">Dân tộc</label>
                        <div class="col-sm-9">
                          <input
                            type="text"
                            class="form-control"
                            v-model="user.ethnic"
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
            Hủy
          </button>
        </template>
      </base-modal>


<!--  Cập nhật phòng ban  -->
      <base-modal
        v-if="modalUpdateDepartment"
        title="Thêm mới nhân viên"
        :size="false"
        @closeModal="toggleModalUpdateDepartment()"
      >
        <template v-slot:body>
          <div class="col-12">
            <div class="card">
              <div class="card-body">
                <form class="form-sample">
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label">Phòng ban</label>
                        <div class="col-sm-9">
                          <select
                            class="form-control"
                            v-model="department_update_id"
                          >
                            <option value="-1">-- Chọn phòng ban --</option>
                            <option
                              v-for="(department, i) in departments"
                              :key="i"
                              :value="department.id"
                            >
                              {{ department.name }}
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
          <button type="button" class="btn btn-sm btn-info" @click="updateDepartment()">
            Xác nhận
          </button>
          <button
            type="button"
            class="btn btn-sm btn-secondary"
            @click="toggleModalUpdateDepartment()"
          >
            Hủy
          </button>
        </template>
      </base-modal>

      <div class="page-header">
        <h3 class="page-title">Nhân viên</h3>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="#">Quản lí</a></li>
            <li class="breadcrumb-item active" aria-current="page">
              Nhân viên
            </li>
          </ol>
        </nav>
      </div>
      <div class="row">
        <div class="col-lg-12 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title">Danh sách nhân viên</h4>
              <div class="btn-add">
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
              class="btn btn-sm btn-mg btn-outline-info dropdown-toggle"
              data-toggle="dropdown"
              aria-expanded="false"
              :class="{ disabled: selectStaff.length == 0 }"
            >
              Hành động
            </button>
            <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
              <a
                class="dropdown-item"
                
                href="#"
                @click="toggleModalUpdateDepartment()"
                >Cập nhật phòng ban</a
              >
              <a class="dropdown-item" href="#" @click="toggleDeleteCustomer()">Xóa</a>
            </div>
              </div>
              <div class="fill">
                <div class="form-group-fill">
                  <div class="form-group-fill">
                    <div class="input-group form-search">
                      <input
                        type="text"
                        class="form-control form-control-sm"
                        v-model="search"
                        placeholder="Tên ,email, số điện thoại nhân viện"
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
                </div>
                <div class="form-group-fill">
                  <label class="fill-lable">Phòng ban</label>
                  <div class="fill-select">
                    <select
                      class="form-control form-control-sm"
                      v-model="department_id"
                    >
                      <option value="-1">-- Tất cả --</option>
                      <option
                        v-for="(department, i) in departments"
                        :key="i"
                        :value="department.id"
                      >
                        {{ department.name }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="form-group-fill">
                  <label class="fill-lable">Trạng thái</label>
                  <div class="fill-select">
                    <select class="form-control form-control-sm">
                      <option value="-1">-- Tất cả --</option>
                      <option value="0" selected>Đang hoạt động</option>
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
                      <th>#</th>
                      <th></th>
                      <th>Họ tên</th>
                      <th>Email</th>
                      <th>Điện thoại</th>
                      <th>Phòng ban</th>
                      <th>Đăng nhập cuối</th>
                    </tr>
                  </thead>
                  <tbody v-if="staffs && staffs.data.length > 0">
                    <tr v-for="(staff, index) in staffs.data" :key="index">
                      <td>
                        <input
                          type="checkbox"
                          v-model="selectStaff"
                          :value="staff.id"
                          @change="updateCheckall()"
                        />
                        
                      </td>
                      <td > {{ index + 1 }}</td>
                      <td @click="viewDetail(staff.id)">
                        <img
                          :src="
                            staff.avatar
                              ? staff.avatar
                              : 'https://png.pngtree.com/png-clipart/20190904/original/pngtree-hand-drawn-flat-wind-user-avatar-icon-png-image_4492039.jpg'
                          "
                          alt=""
                        />
                      </td>
                      <td>{{ staff.name }}</td>
                      <td>{{ staff.email }}</td>
                      <td><a href="tel:{{staff.phone}}">{{ staff.phone }}</a></td>
                      <td>
                        {{
                          staff.staff_of_department &&
                          staff.staff_of_department.departments
                            ? staff.staff_of_department.departments.name
                            : "Đang cập nhật"
                        }}
                      </td>
                      <td>{{ dateTime(staff.last_login) }}</td>
                    </tr>
                  </tbody>
                  <tbody v-else>
                    <td></td>
                    <td>Không có dữ liệu hiển thị</td>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="panigate" v-if="staffs">
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
                    v-for="page in staffs.last_page"
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
                  <li class="page-item" v-if="currentPage != staffs.last_page">
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

    <!-- content-wrapper ends -->
  </div>
</template>
<script>
import axios from "redaxios";
import * as url from "../../config";
import moment from "moment/min/moment-with-locales";
moment.locale("vi");

import BaseModal from "../../components/Modal.vue";
import Loading from "../../components/Loading.vue";
export default {
  components: {
    BaseModal,
    Loading,
  },
  data() {
    return {
      modalCreate: false,
      currentPage: 1,
      search: "",
      department_id: -1,
      isDeleted: 0,
      user: {
        name: "",
        email: "",
        phone: "",
        gender: "Nam",
        home_town: "",
        ethnic: "",
        nationality: "",
        cmnd: "",
        date_of_birth: moment().format("YYYY-MM-DD"),
        address: "",
        department_id: -1,
        position_id: 3,
        role_id: 3,
      },
      select: false,
      selectStaff: [],
      isCheckAll: false,
      modalUpdateDepartment: false,
      department_update_id: -1,
    };
  },
  computed: {
    staffs() {
      return this.$store.state.staffs ? this.$store.state.staffs.staffs : null;
    },
    departments() {
      return this.$store.state.departments;
    },
  },
  watch: {
    currentPage() {
      this.getList(
        this.currentPage,
        this.search,
        this.department_id,
        this.isDeleted
      );
    },
    department_id() {
      this.getList(
        this.currentPage,
        this.search,
        this.department_id,
        this.isDeleted
      );
    },
  },
  created() {
    if(this.staffs == null || this.departments == null){
      this.getList(
        this.currentPage,
        this.search,
        this.department_id,
        this.isDeleted
      );
      this.$store.dispatch("getListDepartment");
    }
    
  },
  methods: {
    checkAll: function () {
      if (this.select) {
        this.selectStaff = [];
        this.select = false;
        this.isCheckAll = 0;
      } else {
        this.isCheckAll = !this.isCheckAll;
        this.selectStaff = [];
        if (this.isCheckAll) {
          // Check all
          for (var key in this.staffs.data) {
            this.selectStaff.push(this.staffs.data[key].id);
          }
        }
      }
      console.log(this.isCheckAll);
    },
    updateCheckall: function () {
      if (this.selectStaff.length == this.staffs.data.length) {
        this.isCheckAll = true;
        this.select = false;
        console.log(this.isCheckAll);
      } else {
        this.isCheckAll = false;
      }
      if (this.selectStaff.length > 0) this.select = true;
      else this.select = false;
    },
    toggleModalCreate() {
      this.modalCreate = !this.modalCreate;
    },
    toggleModalUpdateDepartment(){
      this.modalUpdateDepartment = !this.modalUpdateDepartment;
    },
    dateTime(value) {
      return value
        ? moment(value).utc().format("hh:mm DD/MM/YYYY")
        : "Chưa đăng nhập!";
    },
    getList(page, search, department_id, deleted) {
      this.$store.dispatch("getListStaff", {
        page: page,
        search: search,
        department_id: department_id,
        deleted: deleted,
      });
    },
    toggleSearch() {
      this.getList(
        this.currentPage,
        this.search,
        this.department_id,
        this.isDeleted
      );
    },
    viewDetail(id) {
      this.$router.push({ name: "staff-detail", params: { id: id } });
    },
    async create() {
      await axios({
        method: "post",
        url: url.staff.CREATE,
        data: this.user,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          Accept: "application/json",
        },
      })
        .then((res) => {
          console.log(res.data);
          this.getList(
            this.currentPage,
            this.search,
            this.department_id,
            this.isDeleted
          );
          this.modalCreate = false;
          cuteToast({
            type: "success",
            message: res.data.message,
            timer: 5000,
          });
        })
        .catch((err) => {
          cuteToast({
            type: "error", // or 'info', 'error', 'warning'
            message: err.data.message,
            timer: 5000,
          });
          console.log(err);
        });
    },
    removeMultipleStaff(){
      cuteAlert({
        type: "question",
        title: "Xoá nhân viên",
        message: "Bạn có chắc muốn xóa nhân viên?",
        confirmText: "Xác nhận",
        cancelText: "Hủy",
      }).then((e)=>{
        if(e){
          axios({
            url: url.staff.REMOVE_MULTIPLE_STAFF,
            method: "POST",
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
              Accept: "application/json",
            },
            data: {
              users: this.selectStaff,
            },
          }).then( res => {
            cuteToast({
              type: "success",
              message: res.data.message,
              timer: 5000,
            });
            this.getList(
              this.currentPage,
              this.search,
              this.department_id,
              this.isDeleted
            );
          }).catch( err =>{
            console.log(err);
          })
        }
      })
    },
    updateDepartment(){
      cuteAlert({
        type: "question",
        title: "Cập nhật phòng ban",
        message: "Bạn có chắc muốn thay đổi phòng ban của các nhân viên?",
        confirmText: "Xác nhận",
        cancelText: "Hủy",
      }).then((e)=>{
        if(e){
          axios({
            url: url.staff.UPDATE_DEPARTMENT,
            method: "POST",
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
              Accept: "application/json",
            },
            data: {
              users: this.selectStaff,
              department_id: this.department_update_id,
            },
          }).then( res => {
            cuteToast({
              type: "success",
              message: res.data.message,
              timer: 5000,
            });
            this.modalUpdateDepartment = false;
            this.getList(
              this.currentPage,
              this.search,
              this.department_id,
              this.isDeleted
            );
          }).catch( err =>{
            console.log(err);
          })
        }
      })
    }
  },
};
</script>
<style scoped>
td {
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
.panigate {
  margin: 1rem;
}
</style>

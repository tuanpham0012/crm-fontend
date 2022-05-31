<template>
  <div class="main-panel">
    <Loading />

    <ViewDetailInfomation
      v-if="modalDetail"
      :info="info"
      @close-modal="toggleViewDetail()"
      @update="load()"
    />

    <UpdateDepartmentModal
      v-if="modalUpdate"
      :departmentProps="department"
      @update="load()"
      @close-modal="toggleModalUpdate()"
    />

    <CreateTaskModal
      v-if="modalCreateTask"
      :userProps="user"
      :staffs = "lUser"
      :project_id = "project ? project.id : null"
      @close-modal="toggleModalCreateTask()"
    />

    <base-modal
      v-if="modalCreate"
      title="Thêm nhân viên vào phòng ban"
      :size="false"
      @closeModal="toggleModalCreate()"
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
                      <div class="col-sm-9">
                        <!-- <select class="form-control" v-model="newStaff.user_id">
                          <option
                            v-for="(user, i) in all_user"
                            :value="user.id"
                          >
                            {{ user.name }} (
                              {{ user.staff_of_department && user.staff_of_department.departments
                              ? user.staff_of_department.departments.name : "Đang cập nhật"
                            }} )
                          </option>
                        </select> -->
                        <select-list :listProps="all_user" @returnData="selectReturn"></select-list>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label">Chức vụ</label>
                      <div class="col-sm-9">
                        <select
                          class="form-control"
                          v-model="newStaff.position_id"
                        >
                          <option v-for="(position, i) in positions" :key="i" :value="position.id">{{ position.position }}</option>
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

    <div class="content-wrapper">
      <div class="page-header">
        <h3 class="page-title">Phòng ban</h3>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item active">
              Phòng ban
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              {{ department ? department.name : null }}
            </li>
          </ol>
        </nav>
      </div>
      <div class="row">
        <div class="col-lg-12 grid-margin stretch-card">
          <div class="card">
            <div class="card-body" v-if="department">
              <div class="department-info">
                <div class="department-avatar">
                  <img src="https://www.kindpng.com/picc/m/236-2360465_group-people-icon-png-clipart-png-download-social.png" alt="" />
                </div>
                <div class="department-name">
                  <p class="name">{{ department.name || 'undefined'}}</p>
                  <div class="department-detail">
                    <div class="manager">
                      <p>Trưởng phòng: <span class="d-item"> {{ getManager(staffs, 1)}}</span></p>
                      <p>Phó phòng: <span class="d-item"> {{ getManager(staffs, 2)}}</span></p>
                    </div>
                    <div class="manager">
                      <p>Số nhân viên: <span class="d-item"> {{ $store.state.staffDepartment.staffs.length || 0}}</span></p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="btn-add">
                <button
                  type="button"
                  @click="toggleModalUpdate()"
                  class="btn btn-sm btn-mg btn-gradient-info btn-icon-text"
                >
                  <i class="mdi mdi-settings btn-icon-prepend"></i> Cập nhật
                </button>
              </div>
            </div>
          </div>
        </div>
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
                  <i class="mdi mdi-account-plus btn-icon-prepend"></i> Thêm
                  nhân viên
                </button>
              </div>
              <br />
              <div class="table-responsive">
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th></th>
                      <th>Họ tên</th>
                      <th>Email</th>
                      <th>Điện thoại</th>
                      <th>Chức vụ</th>
                      <th>Đăng nhập cuối</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody v-if="staffs && staffs.length > 0">
                    <tr
                      v-for="(staff, index) in staffs"
                      :key="index"
                      
                    >
                      <td>{{ index + 1 }}</td>
                      <td>
                        <img
                          :src=" avatar_link(staff.user.avatar) || 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'
                          "
                          alt=""
                        />
                      </td>
                      <td>{{ staff.user.name }}</td>
                      <td>{{ staff.user.email }}</td>
                      <td>{{ staff.user.phone }}</td>
                      <td>
                        {{
                          staff.position
                            ? staff.position.position
                            : "Đang cập nhật"
                        }}
                      </td>
                      <td>{{ dateTime(staff.user.last_login) }}</td>
                      <td class="btn-container">
                        <button type="button" class="btn btn-mg btn-icon-info" @click="toggleViewDetail(staff)"><i class="mdi mdi-information-variant"></i></button>
                        <div v-if="$store.getters.getPositionID == 1 || $store.getters.getPositionID == 2">
                          <button type="button" class="btn btn-mg btn-icon-info" @click="toggleModalCreateTask(staff.user)"><i class="mdi mdi-calendar-plus"></i></button>
                          <button type="button" v-if="staff.position_id > 2" class="btn btn-mg btn-icon-danger" @click="Remove(staff.id)"><i class="mdi mdi-delete"></i></button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                  <tbody v-else>
                    <td></td>
                    <td>Không có dữ liệu hiển thị</td>
                  </tbody>
                </table>
                <div class="view-more" v-if="staffs && staffs.length >= total">
                  <button
                    type="button"
                    v-if="!loadMore"
                    class="btn btn-sm btn-gradient-info"
                    @click="toggleLoadMore(moreSize)"
                  >
                    xem thêm
                  </button>
                  <button
                    class="btn btn-sm btn-gradient-info"
                    type="button"
                    disabled
                    v-else
                  >
                    <span
                      class="spinner-grow spinner-grow-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Loading...
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
import BaseModal from "../../components/Modal.vue";
import ViewDetailInfomation from "../../components/ViewDetailInfomation.vue";
import UpdateDepartmentModal from "../../components/UpdateDepartmentModal.vue";
import Loading from "../../components/Loading.vue";
import SelectList from "../../components/SelectList.vue";
import CreateTaskModal from "../../components/CreateTaskModal.vue";

import * as url from "../../config";
import axios from "redaxios";
import moment from "moment/min/moment-with-locales";
moment.locale("vi");

export default {
  components: {
    BaseModal,
    Loading,
    ViewDetailInfomation,
    UpdateDepartmentModal,
    SelectList,
    CreateTaskModal
  },
  data() {
    return {
      modalCreate: false,
      modalDetail: false,
      modalUpdate: false,
      modalCreateTask: false,
      total: 20,
      moreSize: 10,
      loadMore: false,
      info: null,
      newStaff: {
        user_id: 0,
        position_id: 3,
        department_id: this.$route.params.id,
      },
      lUser: [],
      user: [],
    };
  },
  computed: {
    staffs() {
      return this.$store.state.staffDepartment
        ? this.$store.state.staffDepartment.staffs.slice(0, this.total)
        : null;
    },
    department() {
      return this.$store.state.staffDepartment
        ? this.$store.state.staffDepartment.department
        : null;
    },
    all_user() {
      return this.$store.state.staffDepartment ? this.$store.state.staffDepartment.all_user : null;
    },
    positions(){
      return this.$store.state.baseData
        ? this.$store.state.baseData.positions
        : null;
    }
  },
  created() {
    this.load();
  },
  methods: {
    getManager(arrayStaff, position) {
      var arr = arrayStaff.filter((x) => x.position_id == position).shift();
      return arr ? arr.user.name : "Chưa cập nhật";
    },
    load() {
      if(this.$store.getters.getDepartmentID){
        this.$store.dispatch("getListStaffDepartment", {
          id: this.$store.getters.getDepartmentID,
          upload: true,
        });
      }else{
        this.$route.push({ name: 'error_404'});
      }
    },
    toggleModalCreateTask(value) {
      let u = this.$store.state.staffDepartment.staffs;
      let l = {
        id: this.department.id,
        name: this.department.name,
        staff_of_department: u,
      }
      this.lUser.push(l);
      console.log(this.lUser);
      if(value){
        this.user = [];
        this.user.push(value);
      }
      this.modalCreateTask = !this.modalCreateTask;
    },
    avatar_link(value){
      if(value){
        return url.server_url + value;
      }else{
        return null;
      }
    },
    toggleModalCreate() {
      this.modalCreate = !this.modalCreate;
    },
    toggleModalUpdate() {
      this.modalUpdate = !this.modalUpdate;
    },
    dateTime(value) {
      return value
        ? moment(value).utc().format("hh:mm DD/MM/YYYY")
        : "Chưa đăng nhập!";
    },
    toggleLoadMore(value) {
      this.loadMore = true;
      setTimeout(() => {
        this.total = this.total + value;
        this.loadMore = false;
      }, 600);
    },
    toggleViewDetail(staff) {
      if (staff) {
        this.info = staff;
      }
      console.log("a");
      this.modalDetail = !this.modalDetail;
    },
    selectReturn(value){
      this.newStaff.user_id = value.id;
    },
    async create() {
      console.log(this.newStaff);
      await axios({
        method: "POST",
        url: url.departments.ADD_STAFF,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          Accept: "application/json",
        },
        data: this.newStaff,
      })
        .then((res) => {
          console.log(res.data);
          this.toggleModalCreate();
          cuteToast({
            type: "success",
            message: res.data.message,
            timer: 5000,
          });
          this.load();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    Remove(id) {
      cuteAlert({
        type: "question",
        title: "Xoá nhân viên",
        message: "Bạn có chắc muốn xóa nhân viên ra khỏi phòng ban?",
        confirmText: "Xác nhận",
        cancelText: "Hủy",
      }).then((e) => {
        if (e) {
          axios({
            method: "POST",
            url: url.departments.REMOVE + id,
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
              Accept: "application/json",
            },
          })
            .then((res) => {
              this.load();
              cuteToast({
                type: "success",
                message: res.data.message,
                timer: 5000,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    },
  },
};
</script>
<style scoped>
p {
  margin: 0;
}
td img:hover {
  transform: scale(1.2);
}
/* .table tr {
  cursor: pointer;
} */
.btn-add {
  position: absolute;
  top: 1.5rem;
  right: 1rem;
}
.departments {
  margin: 2rem 0.5rem;
  padding: 1rem 0.5rem;
}
.department {
  display: flex;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  width: 90%;
  margin-top: 1rem;
  padding: 0.65rem 2rem;
  border-radius: 0.5rem;
  box-shadow: 2px 2px 3px 3px rgb(194, 193, 193);
  cursor: pointer;
}
.department .name {
  font-size: 1.375rem;
}
.department .view-detail {
  display: flex;
  align-content: center;
  align-items: center;
}
.department i {
  font-size: 1.5rem;
}
.department:hover {
  background-color: rgb(244, 244, 252);
  color: rgb(0, 16, 85);
}
.view-more {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  margin-bottom: 1rem;
}
.department-info{
  display: flex;
  flex-wrap: wrap;
  padding: 1rem;
}
.department-info .department-avatar img{
  width: 8rem;
  height: 8rem;
  margin: 0 1rem;
}
.department-info .department-name .name{
  font-size: 1.375rem;
  font-weight: 500;
}

.department-info .department-name{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding:0 0 0.5rem 0;
}
.department-info .department-name .department-detail .manager{
  display: flex;
  flex-wrap: wrap;
}
.department-info .department-name .department-detail .d-item{
  padding: 0.25rem 1.25rem 0 0;
  font-size: 1.1rem;
  font-weight: 500;
  color: rgb(56, 56, 245);
  cursor: pointer;
  /* border-left: 0.5px solid rgb(235, 222, 222);
  border-right: 0.5px solid rgb(235, 222, 222); */
  background-color: rgba(255, 255, 255, 0.411);
}
.department-info .department-name .department-detail .d-item:hover{
  color:rgb(247, 126, 12);
}
</style>

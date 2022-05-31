<template lang="">
  <Loading />
  <div class="main-panel">
    <CreateTaskModal
      v-if="modalCreateTask"
      :userProps="lUser"
      :staffs = "project_participant"
      :project_id = "project ? project.id : null"
      @close-modal="toggleModalCreate()"
      @open-task="toggleModalDetail"
      @update="viewDetail"
    />

    <UpdateProjectModal v-if="modalUpdateProject" :projectProps="project" @close-modal="toggleModalUpdate()" @update="load()"/>

    <base-modal
        title="Thêm người tham gia"
        :size="false"
        v-if="modalAddParticipant"
        @closeModal="toggleCloseModalAdd()"
      >
        <template v-slot:body>
          <div class="col-12">
            <div class="card bg-gray">
              <div class="card-body">
                <form class="form-sample">
                  <div class="row bd">
                    <div class="col-md-12">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label"
                          >Người tham gia</label
                        >
                        <div class="col-sm-7">
                          <select class="form-control" v-model="staff_id">
                            <option value="-1" selected>--Chọn--</option>
                            <optgroup
                              v-for="(department, index) in staffs"
                              :key="index"
                              :label="department.name"
                            >
                              <option
                                v-for="(
                                  staff, index
                                ) in department.staff_of_department"
                                :key="index"
                                :value="staff.id"
                                :disabled="users.find((x) => x.id == staff.id)"
                              >
                                {{ staff.user.name }}
                              </option>
                            </optgroup>
                          </select>
                        </div>
                        <div class="col-sm-2 form-btn">
                          <button
                            type="button"
                            class="btn btn-sm btn-gradient-info"
                            @click="toggleAddStaff()"
                          >
                            Thêm
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-12 add-user" v-if="users && users.length > 0">
                      <div class="form-group row">
                        <div class="row-info" style="align-items: baseline">
                          <ul class="row-content">
                            <li v-for="(user, index) in users" :key="index">
                              <div class="user-info">
                                <img :src="user.avatar ? user.avatar : 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'" />
                                <div class="info">
                                  <a href="#">{{ user.name }}</a>
                                  <p>
                                    <span
                                      ><i class="mdi mdi-map-marker"></i></span
                                    >{{ user.department }}
                                  </p>
                                </div>
                                <span
                                  class="close"
                                  @click="toggleRemoveUser(index)"
                                  >&times;</span
                                >
                              </div>
                            </li>
                          </ul>
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
            class="btn btn-sm btn-info"
            @click="toggleAddparticipant()"
          >
            Thêm
          </button>
          <button
            type="button"
            class="btn btn-sm btn-secondary"
            @click="toggleCloseModalAdd()"
          >
            Đóng
          </button>
        </template>
      </base-modal>

    <div class="content-wrapper">
      <div class="page-header">
        <h3 class="page-title">Thông tin dự án</h3>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item active" aria-current="page">
              <router-link :to="{ name: 'projects' }">Dự án</router-link>
            </li>
            <li class="breadcrumb-item active">
              {{ project ? project.name : "đang cập nhật" }}
            </li>
          </ol>
        </nav>
      </div>
      <div class="row">
        <div class="col-lg-12 grid-margin stretch-card">
          <div class="card" v-if="project">
            <div class="card-body">
              <div class="general-information">
                <div class="header-title">
                  <p class="title">Thông tin chung</p>
                  <div v-if="$store.getters.getID == project.user_id">
                    <button class="btn btn-sm btn-mg btn-gradient-info" v-if="project.project_status_id != 4" @click="toggleModalUpdate()">Chỉnh sửa</button>
                    <button class="btn btn-sm btn-gradient-danger" v-if="project.project_status_id != 4" @click="toggleCancelProject(4)">Hủy dự án</button>
                    <button class="btn btn-sm btn-gradient-danger" v-else @click="toggleCancelProject(1)">Khôi phục</button>
                  </div>
                </div>
                
                <div class="info">
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="col-md-12">
                        <div class="info-row">
                          <label class="col-sm-4 col-form-label">Mã dự án</label>
                          <div class="col-sm-9">
                            <p class="">{{ project.project_code }}</p>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="info-row">
                          <label class="col-sm-4 col-form-label">Tên dự án</label>
                          <div class="col-sm-9">
                            <p class="">{{ project.name }}</p>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="info-row">
                          <label class="col-sm-4 col-form-label">Thời gian</label>
                          <div class="col-sm-9">
                            <p class="">{{ dateTime(project.start_at) }} - {{ dateTime(project.end_at) }}</p>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="info-row">
                          <label class="col-sm-4 col-form-label">Trạng thái</label>
                          <div class="col-sm-9">
                            <p class="">{{ project.project_status.status }}</p>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="info-row">
                          <label class="col-sm-4 col-form-label">Người tạo</label>
                          <div class="col-sm-9">
                            <p class="">{{ project.user.name || 'Đang cập nhật' }}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-6 describe">
                      <label class="col-sm-12 col-form-label"
                          ><i class="mdi mdi-information"></i>Thông tin</label
                        >
                        <div class="col-sm-12 content" v-html="project.content">
                        </div>
                    </div>
                  </div>
                </div>
                <ul class="tab-controller">
                  <li :class="{ 'activated' : tab == 1}" @click="tab = 1">Trao đổi</li>
                  <li :class="{ 'activated' : tab == 2}" @click="tab = 2">Công việc</li>
                  <li :class="{ 'activated' : tab == 3}" @click="tab = 3">Người tham gia</li>
                </ul>

                <div class="col-md-12 stretch-card note" v-if="tab == 1">
                  <div class="card">
                    <div class="card-body">
                      <div class="card-content">
                        <div>
                          <div class="tab-content">
                            <note-component
                              :notesProps="project.note_of_project"
                              :project_id="project.id"
                            ></note-component>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-lg-12" :class="{'disabled' : project.project_status_id == 4}" v-if="tab == 2">

                  <TaskDetailModal
                    :taskInfo="taskInfo"
                    :staffs="project_participant"
                    @close-modal="toggleModalDetail()"
                    @reload="load()"
                    v-if="modalTaskDetail"

                  />

                  <div class="task-action">
                    <div class="input-group form-search">
                      <input
                        type="text"
                        class="form-control form-control-sm"
                        v-model="search"
                        placeholder="Tìm tên công việc"
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
                    <div class="form-group-fill">
                      <label class="fill-lable">Trạng thái</label>
                      <div class="fill-select">
                        <select class="form-control form-control-sm" v-model="task_status_id">
                          <option value="-1">-- Tất cả --</option>
                          <option v-for="(status, index) in task_status" :key="index" :value="status.id">{{ status.status }}</option>
                        </select>
                      </div>
                    </div>
                    <button
                      type="button"
                      @click="toggleModalCreate()"
                      class="btn btn-sm btn-mg btn-gradient-info btn-icon-text"
                    >
                      <i class="mdi mdi-calendar-plus btn-icon-prepend"></i> Công việc mới
                    </button>
                  </div>
                  <TableTaskComponent :tasksProps="tasks" @toggleTask="toggleModalDetail" />
                </div>

                <div class="col-lg-12 participant" :class="{'disabled' : project.project_status_id == 4}" v-if="tab == 3">


                  <ul class="select-tab-participant">
                    <li :class="{ 'active' : tabPaticipant == 1 }" @click="tabPaticipant = 1">
                      Đang tham gia
                    </li>
                    <li :class="{ 'active' : tabPaticipant == 0 }" @click="tabPaticipant = 0">
                      Chờ xác nhận
                    </li>
                  </ul>

                  <div class="task-action">
                    <div class="input-group form-search">
                      <input
                        type="text"
                        class="form-control form-control-sm"
                        v-model="searchUser"
                        placeholder="Tìm tên người tham gia"
                      />
                      <div class="input-group-append">
                        <button
                          class="btn btn-sm btn-gradient-info form-control-sm"
                          @click="toggleSearchUser()"
                          type="button"
                        >
                          Tìm kiếm
                        </button>
                      </div>
                    </div>
                    <button
                      type="button"
                      @click="toggleCloseModalAdd()"
                      class="btn btn-sm btn-mg btn-gradient-info btn-icon-text"
                      v-if="$store.getters.getID == project.user_id"
                    >
                      <i class="mdi mdi-calendar-plus btn-icon-prepend"></i> Thêm người tham gia
                    </button>
                  </div>
                  <div class="table-responsive">
                <table class="table table-hover table-bordered">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Nhân viên</th>
                      <th>Email</th>
                      <th>Điện thoại</th>
                      <th v-if="$store.getters.getID == project.user_id" >Thao tác</th>
                    </tr>
                  </thead>
                  <tbody v-if="participants.length > 0">
                    <tr v-for="(staff, index) in participants" :key="index">
                      <td > {{ index + 1 }}</td>
                      <td class="view">
                        <img
                          :src="
                            avatar_link(staff.user.avatar) || 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'
                          "
                          alt=""
                        />
                        <span>{{ staff.user.name }}</span>
                      </td>
                      <td>{{ staff.user.email }}</td>
                      <td>{{ staff.user.phone }}</td>
                      <td v-if="staff.accept == 1 && $store.getters.getID == project.user_id">
                        <button type="button" class="btn btn-mg btn-inverse-info btn-icon" @click="toggleAssignTask(staff.user)"><i class="mdi mdi-calendar-plus"></i></button>
                        <button type="button" class="btn btn-mg btn-inverse-danger btn-icon" @click="toggleDeleteParticipant(staff.id)"><i class="mdi mdi-delete"></i></button>
                      </td>
                      <td v-if="staff.accept == 0 && $store.getters.getID == project.user_id">
                        <button type="button" class="btn btn-mg btn-inverse-info btn-icon" @click="toggleConfirmParticipant(staff.id)"><i class="mdi mdi-check"></i></button>
                        <button type="button" class="btn btn-mg btn-inverse-danger btn-icon" @click="toggleDeleteParticipant(staff.id)"><i class="mdi mdi-delete"></i></button>
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

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Loading from "../../components/Loading.vue";
import BaseModal from "../../components/Modal.vue";
import CreateTaskModal from "../../components/CreateTaskModal.vue";
import TableTaskComponent from "../../components/TableTaskComponent.vue";
import TaskDetailModal from "../../components/TaskDetailModal.vue";
import UpdateProjectModal from "../../components/UpdateProjectModal.vue";
import NoteComponent from "../../components/NoteOfProjectComponent.vue";

import moment from "moment/min/moment-with-locales";
moment.locale("vi");
import axios from "redaxios";
import * as url from "../../config";

export default {
  components: {
    Loading,
    CreateTaskModal,
    TableTaskComponent,
    TaskDetailModal,
    BaseModal,
    UpdateProjectModal,
    NoteComponent,
  },
  data() {
    return {
      modalUpdate: false,
      modalCreateTask: false,
      modalTaskDetail: false,
      modalUpdateProject: false,
      tab: 1,
      tabPaticipant: 1,
      lUser: [],
      task_status_id: 2,
      tasks: null,
      search: '',
      participants: null,
      staff: null,
      department_id: -1,
      searchUser: '',
      modalAddParticipant: false,
      staff_id: -1,
      users: [],
    };
  },
  computed: {
    project() {
      return this.$store.state.project ? this.$store.state.project.project : null;
    },
    task_status(){
      return this.$store.state.baseData
        ? this.$store.state.baseData.task_status
        : null;
    },
    taskInfo() {
      return this.$store.state.taskInfo;
    },
    project_participant(){
      return this.$store.state.project ? this.$store.state.project.user : null;
    },
    staffs(){
      return this.$store.state.baseData
        ? this.$store.state.baseData.staff
        : null;
    }
  },
  watch: {
    project(){
      this.tasks = this.project ? this.project.tasks.filter( 
        x => x.task_status_id == this.task_status_id && 
        x.name.toLowerCase().includes(this.search.toLowerCase())) : null;

      this.participants = this.project ? this.project.project_participants.filter(
        x => x.accept == this.tabPaticipant &&
        x.user.name.toLowerCase().includes(this.searchUser.toLowerCase())) : null;

    },
    task_status_id(){
      if(this.task_status_id != -1){
        this.tasks = this.project ? this.project.tasks.filter( 
          x => x.task_status_id == this.task_status_id && 
          x.name.toLowerCase().includes(this.search.toLowerCase())) : null;
      }else{
        this.tasks = this.project ? this.project.tasks.filter( 
          x => x.name.toLowerCase().includes(this.search.toLowerCase())) : null;
      }
      
    },
    tabPaticipant(){
      this.participants = this.project ? this.project.project_participants.filter(
        x => x.accept == this.tabPaticipant &&
        x.user.name.toLowerCase().includes(this.searchUser.toLowerCase())) : null;
    },
  },
  created() {
    this.load();
  },
  methods: {
    load(){
      this.$store.dispatch("getProjectDetail", {
        id: this.$route.params.id,
        upload: true,
      });
    },
    viewDetail(id){
      this.load();
    },
    avatar_link(value){
      if(value){
        return url.server_url + value;
      }else{
        return null;
      }
    },
    toggleModalUpdate(){
      this.modalUpdateProject = !this.modalUpdateProject;
    },
    toggleSearch() {
      this.tasks = this.project ? this.project.tasks.filter( 
        x => x.task_status_id == this.task_status_id && 
        x.name.toLowerCase().includes(this.search.toLowerCase())) : null;
    },
    dateTime(value) {
      return value
        ? moment(value).utc().format("DD/MM/YYYY")
        : "Đang cập nhật!";
    },
    toggleCloseModalAdd(){
      this.modalAddParticipant = !this.modalAddParticipant;
    },
    toggleSearchUser(){
      this.participants = this.project ? this.project.project_participants.filter(
        x => x.accept == this.tabPaticipant &&
        x.user.name.toLowerCase().includes(this.searchUser.toLowerCase())) : null;
    },
    toggleUpdate(id) {
      this.$router.push({ name: "staff-update", params: { id: id } });
    },
    toggleModalCreate() {
      this.modalCreateTask = !this.modalCreateTask;
    },
    toggleAssignTask(value) {
      this.lUser = [];
      this.lUser.push(value);

      this.toggleModalCreate();
    },
    toggleModalDetail(value) {
      if (value) {
        this.$store.dispatch("getTaskInfo", { id: value, upload: true });
      }
      this.modalTaskDetail = !this.modalTaskDetail;
    },
    toggleAddStaff() {
      this.staffs.forEach((item) => {
        var staff = item.staff_of_department.find(
          (x) => x.user_id === this.staff_id
        );
        if (staff) {
          staff = staff.user;
          staff.department = item.name;
          this.users.push(staff);
        }
      });
      this.staff_id = -1;
      console.log(this.users);
    },
    toggleRemoveUser(index) {
      this.users.splice(index, 1);
    },
    async toggleAddparticipant(){
      await axios({
        url: url.projects.ADD_PARTICIPANT,
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          Accept: "application/json",
        },
        data: {
          project_id: this.project.id,
          users: this.users,
        },
      }).then( res => {
        cuteToast({
          type: "success",
          message: res.data.message,
          timer: "5000",
        });
        this.$store.dispatch("getProjectDetail", {
          id: this.$route.params.id,
          upload: false,
        });
        this.users = [];
        this.modalAddParticipant = false;
      })
    },
    async toggleDeleteParticipant(id){
      await axios({
        url: url.projects.DELETE_PARTICIPANT,
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          Accept: "application/json",
        },
        data: {
          id: id,
        },
      }).then( res => {
        cuteToast({
          type: "success",
          message: res.data.message,
          timer: "5000",
        });
        this.$store.dispatch("getProjectDetail", {
          id: this.$route.params.id,
          upload: false,
        });
      }).catch(err => {
        console.log(err);
        cuteToast({
          type: "error",
          message: err.data.message,
          timer: "5000",
        });
      })
    },
    async toggleConfirmParticipant(id){
      await axios({
        url: url.projects.CONFIRM_PARTICIPANT,
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          Accept: "application/json",
        },
        data: {
          id: id,
        },
      }).then( res => {
        cuteToast({
          type: "success",
          message: res.data.message,
          timer: "5000",
        });
        this.$store.dispatch("getProjectDetail", {
          id: this.$route.params.id,
          upload: false,
        });
      }).catch(err => {
        console.log(err);
        cuteToast({
          type: "error",
          message: err.data.message,
          timer: "5000",
        });
      })
    },
    toggleCancelProject(status) {
      let msg = '';
      switch (status) {
        case 4:
          msg = 'hủy'
          break;
        default:
          msg = 'khôi phục'
          break;
      }

      cuteAlert({
        type: "question",
        title: msg + " dự án",
        message: "Bạn có chắc muốn " + msg + " dự án?",
        confirmText: "Xác nhận",
        cancelText: "Hủy",
      }).then((e) => {
        if(e) { 

          let p = this.project;
          p.project_status_id = status;
          axios({
            url: url.projects.UPDATE + this.project.id,
            method: "PATCH",
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
              Accept: "application/json",
            },
            data: this.project,
          })
            .then((res) => {
              console.log(res.data);
              cuteToast({
                type: "success",
                message: res.data.message,
                timer: "5000",
              });
              this.load();
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
    },
  },
};
</script>
<style scoped>
td{
  padding: 0 0.5rem;
}

.disabled{
  opacity: 0.7;
  pointer-events: none;
}

.activated {
  color: rgb(255, 94, 0);
  border-bottom: 3px solid rgb(255, 94, 0);
}
.tab-controller {
  border-bottom: 1px solid rgb(255, 94, 0);
  margin-top: 3rem;
}
.content{
  background-color: rgba(77,190,238,.32);
  padding: 0.785rem 0.5rem;
  border-radius: 5px;
}
.task-action{
  margin: 1rem 0.5rem;
  display: flex;
  justify-content: space-between;
}
.describe label{
  font-size: 1.15rem;
  color: blue;
  font-weight: 500; 
}
.describe i{
  margin-right: 0.5rem;
}
.general-information {
  margin: 1rem;
}
.general-information .title {
  font-weight: 400;
  font-size: 1.2rem;
  padding: 1rem 2rem 0.2rem 2rem;
  
}
.general-information .header-title{
  border-bottom: 1px solid rgb(0, 0, 0);
  margin-bottom: 0.5rem;
}
.header-title{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.general-information .info {
  padding: 0.5rem 1rem;
}
.info-row {
  display: flex;
  align-items: center;
}
.info-row label {
  font-weight: 600;
}
.view{
  display: flex;
  align-content: center;
  align-items: center;
  border: 0;
  border-bottom: 1px solid #ebedf2;
  padding: 0.5255rem;
}
.view img{
  margin-right: 0.5rem;
}

</style>

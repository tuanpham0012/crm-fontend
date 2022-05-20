<template lang="">
  <Loading />
  <div class="main-panel">
    <div class="content-wrapper">
      <!-- Modal detail task -->

      <TaskDetailModal
        :taskInfo="taskInfo"
        :staffs="staffs"
        :id="id"
        @close-modal="toggleModalDetail()"
        @reload="load()"
        v-if="modalTaskDetail"

      />

      <!-- Modal create task -->
      <CreateTaskModal v-if="modalCreateTask" 
          :userProps = "users"
          :staffs = "staffs"
          @close-modal="toggleModalCreate()"
          @open-task="toggleModalDetail"
          @update="load()"/>

      <div class="page-header">
        <h3 class="page-title">Công việc</h3>
        <nav aria-label="breadcrumb">
          <div class="btn-action">
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
                  @click="load()"
                  type="button"
                >
                  Tìm kiếm
                </button>
              </div>
            </div>

            <button
              type="button"
              @click="toggleModalCreate()"
              class="btn btn-sm btn-gradient-info btn-icon-text"
            >
              <i class="mdi mdi-calendar-plus btn-icon-prepend"></i> Công việc mới
            </button>
          </div>
        </nav>
      </div>
      <div class="row">
        <div class="col-lg-12 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <div class="select-task">
                <ul>
                  <li :class="{ active: tabIndex == 1 }" @click="tabIndex = 1">
                    Đang thực hiện
                  </li>
                  <li :class="{ active: tabIndex == 2 }" @click="tabIndex = 2">
                    Quá hạn
                  </li>
                  <li :class="{ active: tabIndex == 3 }" @click="tabIndex = 3">
                    Mới giao
                    <span
                      v-if="taskNew && tabIndex != 3"
                      class="badges-new-task"
                    >
                      {{ taskNew.length }}
                    </span>
                  </li>
                  <li :class="{ active: tabIndex == 4 }" @click="tabIndex = 4">
                    Công việc tôi giao
                  </li>
                  <li :class="{ active: tabIndex == 5 }" @click="tabIndex = 5">
                    Đã hoàn thành
                  </li>
                  <li :class="{ active: tabIndex == 6 }" @click="tabIndex = 6">
                    Đã hủy
                  </li>
                </ul>
              </div>
              <table-task-component
                :tasksProps="taskProgress"
                :types="typeOfTask"
                @toggleTask="toggleModalDetail"
                v-if="tabIndex == 1"
              ></table-task-component>
              <table-task-component
                :tasksProps="taskLate"
                :types="typeOfTask"
                @toggleTask="toggleModalDetail"
                v-if="tabIndex == 2"
              ></table-task-component>
              <table-task-component
                :tasksProps="taskNew"
                :types="typeOfTask"
                @toggleTask="toggleModalDetail"
                v-if="tabIndex == 3"
              ></table-task-component>
              <table-task-component
                :tasksProps="taskCreater"
                :types="typeOfTask"
                @toggleTask="toggleModalDetail"
                v-if="tabIndex == 4"
              ></table-task-component>
              <table-task-component
                :tasksProps="taskFinish"
                :types="typeOfTask"
                @toggleTask="toggleModalDetail"
                v-if="tabIndex == 5"
              ></table-task-component>
              <table-task-component
                :tasksProps="taskCancelled"
                :types="typeOfTask"
                @toggleTask="toggleModalDetail"
                v-if="tabIndex == 6"
              ></table-task-component>
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
import moment from "moment/min/moment-with-locales";
moment.locale("vi");

import BaseModal from "../../components/Modal.vue";
import Loading from "../../components/Loading.vue";
import CreateTaskModal from "../../components/CreateTaskModal.vue";
import NoteComponent from "../../components/NoteOfTaskComponent.vue";
import TableTaskComponent from "../../components/TableTaskComponent.vue";
import TaskDetailModal from "../../components/TaskDetailModal.vue";
export default {
  components: {
    BaseModal,
    Loading,
    NoteComponent,
    TableTaskComponent,
    TaskDetailModal,
    CreateTaskModal,
  },
  data() {
    return {
      tabIndex: 1,
      total: 20,
      loadMore: false,
      search: "",
      modalTaskDetail: false,
      modalCreateTask: false,
      staff_id: -1,
      task: {
        content: "",
        customer_id: null,
        end: moment().format("YYYY-MM-DDTHH:mm:ss"),
        name: null,
        start: moment().format("YYYY-MM-DDTHH:mm:ss"),
        task_status_id: 1,
        type_of_task_id: -1,
      },
      users: [],
      customer: null,
      customers: null,
      openListSelect: false,
      customer_name: "",
    };
  },
  computed: {
    taskProgress() {
      return this.$store.state.tasks ? this.$store.state.tasks.progress : null;
    },
    taskLate() {
      return this.$store.state.tasks ? this.$store.state.tasks.late : null;
    },
    taskNew() {
      return this.$store.state.tasks ? this.$store.state.tasks.new_task : null;
    },
    taskCreater() {
      return this.$store.state.tasks ? this.$store.state.tasks.creater : null;
    },
    taskFinish() {
      return this.$store.state.tasks ? this.$store.state.tasks.finish : null;
    },
    taskInfo() {
      return this.$store.state.taskInfo;
    },
    taskCancelled() {
      return this.$store.state.tasks ? this.$store.state.tasks.cancelled : null;
    },
    loading() {
      return this.$store.state.loading;
    },
    typeOfTask() {
      return this.$store.state.baseData
        ? this.$store.state.baseData.type_of_task
        : null;
    },
    staffs() {
      return this.$store.state.baseData ? this.$store.state.baseData.staff : null;
    },
    roterTaskId() {
      return this.$route.params.id;
    },
    customersList() {
      return this.$store.state.baseData ? this.$store.state.baseData.customers : null;
    },
  },
  watch: {
    customersList() {
      this.customers = this.customersList;
    },
    "$route.params.id":{
      handler: function() {
           this.op_task();
        },
        deep: true,
        immediate: true
    },
  },
  created() {
    this.load();
    this.op_task();
  },
  methods: {
    op_task() {
      if (this.roterTaskId != null) {
        this.modalTaskDetail = false;
        this.toggleModalDetail(this.roterTaskId);
      }
    },
    resetValue() {
      this.users = [];
      this.task_name = "";
      this.editTaskName = false;
      this.customer = null;
      this.addCustomer = false;
      this.editTaskContent = false;
      this.editTaskTime = false;
      this.openListSelect = false;
    },
    toggleOpenListSelect(value) {
      this.openListSelect = !this.openListSelect;
      if (value) {
        this.customer = value;
        this.customer_name = value.name;
      }
    },
    searchName(key) {
      this.customers = this.customersList
        ? this.customersList.filter((x) =>
            x.name.toLowerCase().includes(key.toLowerCase())
          )
        : null;
      console.log(key);
    },
    load() {
      this.$store.dispatch("getTasks", { search: this.search });
    },
    dateTime(value) {
      return moment(value).utc().format("HH:mm:ss DD-MM-YYYY");
    },
    formatDate(value) {
      return moment(value).format("llll");
    },
    toggleLoadMore(value) {
      console.log(value);
      this.loadMore = true;
      setTimeout(() => {
        this.total = this.total + value;
        this.loadMore = false;
      }, 500);
    },
    toggleModalDetail(value) {
      this.resetValue();
      if (value) {
        this.$store.dispatch("getTaskInfo", { id: value, upload: true });
      }
      this.modalTaskDetail = !this.modalTaskDetail;
    },
    toggleModalCreate() {
      this.resetValue();
      this.modalCreateTask = !this.modalCreateTask;
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
    toggleRemoveCustomer() {
      this.customer = null;
    },
  },
};
</script>
<style scoped>
.bg-gray {
  background-color: #f0f0f7;
}
.btn-action {
  display: flex;
}
.select-task {
  height: max-content;
  border-bottom: 1px rgb(255, 145, 0) solid;
  margin-bottom: 0.6rem;
  color: blue;
}
.select-task ul {
  margin: 0 0 0.5rem 0;
}
.select-task ul li {
  display: inline;
  padding: 0.65rem 0.8rem;
  margin: 0.3rem;
}
.select-task ul li:hover {
  cursor: pointer;
  background-color: rgb(247, 244, 241);
  border-bottom: 2px sandybrown solid;
}
.active {
  color: black;
  pointer-events: none;
  background-color: #eaeef3;
  border-bottom: 2px sandybrown solid;
}
.card .card-body {
  padding: 0.5rem;
  border-radius: 5px;
}
.note {
  padding: 0rem;
}
.row-info {
  margin: 0.345rem 0;
}
.row-title {
  font-weight: 500;
}
.row-content li {
  display: inline-flex;
  margin-right: 0.8rem;
}
.task-content {
  background-color: rgb(230, 230, 240);
  padding: 0.5rem 0.5rem 1rem 0.5rem;
  border-radius: 5px;
  margin-bottom: 0.5rem;
}
.task-content p {
  background-color: rgb(255, 255, 255);
  padding-left: 1.5rem;
  padding-top: 0.5rem;
  padding-bottom: 1.5rem;
  margin-top: 0.5rem;
  border-radius: 5px;
}
.task-name {
  display: flex;
  align-items: center;
  align-content: center;
  font-size: 1.2rem;
  font-weight: 600;
  color: rgb(26, 26, 221);
}
.task-name i {
  font-size: 1.2rem;
  color: rgb(26, 26, 221);
  margin-left: 0.5rem;
  cursor: pointer;
}
.task-name i:hover {
  color: rgb(219, 63, 36);
}
.customer-info {
  display: flex;
  align-items: center;
  padding: 0.456rem 1rem;
  border-radius: 5px;
  background-color: rgb(230, 230, 240);
}
.customer-info img {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
}
.add-user {
  background-color: #ffffff;
  padding: 0 1.5rem;
  margin: 0 0.5rem 1.5rem 0.5rem;
  border-radius: 8px;
}
.info {
  margin-left: 0.5rem;
}
.user-info {
  display: flex;
  width: max-content;
  align-items: center;
  margin: 0.5rem 0;
  background-color: #edf0f5;
  padding: 0.3rem 0.8rem;
  border-radius: 10px;
  position: relative;
}
.user-info img {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
}
.user-info .close {
  position: absolute;
  top: 0;
  right: 0;
  background-color: rgb(202, 214, 226);
  border-radius: 50%;
  font-size: 1.2rem;
  width: 1.2rem;
  height: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.1rem;
  cursor: pointer;
}
.load {
  bottom: 0;
  left: 0;
  overflow: hidden;
  position: absolute;
  right: 0;
  top: 0;
  background: radial-gradient(rgba(255, 255, 255, 0.938), rgb(230, 230, 230));
  padding-top: 10%;
  z-index: 999;
}
.accept {
  opacity: 0.5;
  pointer-events: none;
}
.editor {
  background-color: #ffffff;
  padding-top: 1rem;
  padding-bottom: 4rem;
}
.form-btn {
  display: flex;
  align-items: center;
}
.btn-add-user {
  padding: 0.5rem 0.8rem;
  width: max-content;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 500;
  margin-bottom: 1rem;
}
.btn-add-user:hover {
  color: blue;
  background-color: #f8f1f1;
}

.accepted {
  color: rgb(18, 39, 223);
  font-size: 0.8rem;
}
.not-accept {
  color: rgb(143, 137, 137);
  font-size: 0.8rem;
  font-style: italic;
}
.badges-new-task {
  position: absolute;
  top: 0.2rem;
  background-color: rgb(209, 33, 33);
  color: white;
  font-size: 0.6rem;
  font-weight: 500;
  padding: 0 0.2rem;
  border-radius: 5px;
}
.input-text-ed {
  width: 20rem;
  border: 0;
  border-bottom: 1px solid #aaa8a8a1;
  padding: 0.3rem 0.5rem 0.1rem 0.5rem;
}
.input-text-ed:focus {
  border-color: rgb(0, 26, 255);
}
.btn-action-container {
  display: flex;
  margin-left: 0.5rem;
}
.btn-action-container button {
  border-radius: 50%;
  line-height: 1;
  border: 0;
  margin: 0.3rem;
  padding: 0.2rem;
}
.btn-action-container button:hover {
  background-color: #ffffff;
  transform: scale(1.2);
  color: rgb(0, 4, 255);
}
.task-content .row-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.btn-edit {
  color: #0011ffa1;
}
.btn-edit:hover {
  color: #ff7300a1;
}
.edit-task-content {
  background-color: #ffffff;
  padding: 0.5rem;
}

</style>

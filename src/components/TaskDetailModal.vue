<template lang="">
  <div>
    <base-modal
      title="Thông tin công việc"
      :size="true"
      :height="true"
      @closeModal="toggleModalDetail()"
    >
      <template v-slot:body>
        <div class="load" v-if="loading">
          <div class="text-center">
            <div class="spinner-grow text-primary" role="status"></div>
            <div class="spinner-grow text-secondary" role="status"></div>
            <div class="spinner-grow text-success" role="status"></div>
            <div class="spinner-grow text-danger" role="status"></div>
            <div class="spinner-grow text-warning" role="status"></div>
            <div class="spinner-grow text-info" role="status"></div>
          </div>
        </div>
        <div>
          <div
            v-if="taskInfo"
            class="row"
            :class="{
              accept:
                taskInfo.task_status_id >= 1 &&
                taskInfo.task_status_id <= 3 &&
                taskInfo.task_user.find((x) => x.user_id === id) &&
                taskInfo.task_user.find((x) => x.user_id === id).accept == 0,
            }"
          >
            <div class="col-md-6 stretch-card">
              <div class="card">
                <div class="card-body">
                  <div class="card-content">
                    <div class="base">
                      <div class="row-info task-name">
                        <div class="text-name" v-if="!editTaskName">
                          <span class="row-content">{{ taskInfo.name }}</span>
                          <i
                            class="mdi mdi-border-color"
                            v-if="taskInfo.user_id == id"
                            @click="toggleEdiTaskName(taskInfo.name)"
                          ></i>
                        </div>
                        <div class="edit-task-name" v-else>
                          <input
                            type="text"
                            class="input-text-ed"
                            placeholder="Tên công việc"
                            v-model="task_name"
                          />
                          <button
                            type="button"
                            class="btn btn-sm btn-gradient-info"
                            @click="toggleUpdateTaskName(taskInfo.id)"
                          >
                            Cập nhật
                          </button>
                          <button
                            type="button"
                            class="btn btn-sm btn-gradient-secondary"
                            @click="toggleEdiTaskName()"
                          >
                            Hủy
                          </button>
                        </div>
                      </div>
                      <div class="row-info">
                        <span class="row-title"> Dự án: </span>
                        <span>{{ taskInfo.project ? taskInfo.project.name : 'Không' }}</span
                        >
                      </div>
                      <div class="row-info">
                        <span class="row-title"> Loại công việc: </span>
                        <span
                          class="row-content"
                          v-if="taskInfo.type_of_task"
                          >{{ taskInfo.type_of_task.type }}</span
                        >
                      </div>
                      <div class="row-info">
                        <span class="row-title"> Trạng thái: </span>
                        <span
                          class="row-content"
                          v-if="taskInfo.type_of_task"
                          >{{ taskInfo.task_status.status }}</span
                        >
                      </div>
                      <div class="row-info">
                        <span class="row-title"> Thời gian: </span>
                        <button
                          type="button"
                          @click="
                            toggleEditTaskTime(taskInfo.start, taskInfo.end)
                          "
                          v-if="taskInfo.user_id == id && !editTaskTime"
                          class="btn btn-sm btn-edit"
                        >
                          <i class="mdi mdi-border-color"></i>Chỉnh sửa
                        </button>
                        <div class="row-content" v-if="!editTaskTime">
                          {{ formatDate(taskInfo.start) }} -
                          {{ formatDate(taskInfo.end) }}
                        </div>
                        <div class="col-md-12" v-else>
                          <div class="form-group row">
                            <label class="col-sm-4 col-form-label"
                              >Ngày bắt đầu:</label
                            >
                            <div class="col-sm-8">
                              <input
                                type="datetime-local"
                                class="form-control"
                                v-model="task_start"
                              />
                            </div>
                            <label class="col-sm-4 col-form-label"
                              >Ngày Kết thúc:</label
                            >
                            <div class="col-sm-8">
                              <input
                                type="datetime-local"
                                class="form-control"
                                v-model="task_end"
                              />
                            </div>
                          </div>
                          <button
                            type="button"
                            class="btn btn-sm btn-outline-info"
                            @click="toggleUpdateTaskTime(taskInfo.id)"
                          >
                            Cập nhật
                          </button>
                          <button
                            type="button"
                            class="btn btn-sm btn-outline-secondary"
                            @click="toggleEditTaskTime()"
                          >
                            Hủy
                          </button>
                        </div>
                      </div>
                      <div class="row-info">
                        <span class="row-title">Người giao việc: </span>
                        <div class="user-info">
                          <img :src=" avatar_link(taskInfo.user.avatar) || 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'" />
                          <div class="info">
                            <a href="#">{{ taskInfo.user.name }}</a>
                            <p>
                              <span
                                ><i class="mdi mdi-email-outline"></i
                                >&nbsp;</span
                              >{{ taskInfo.user.email }}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div class="row-info" style="align-items: baseline">
                        <span class="row-title">Người thực hiện: </span>
                        <ul
                          class="row-content"
                          v-if="taskInfo.task_user.length > 0"
                        >
                          <li
                            v-for="(user, index) in taskInfo.task_user"
                            :key="index"
                          >
                            <div class="user-info">
                              <img :src=" avatar_link(user.user.avatar) || 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'" />
                              <div class="info">
                                <a href="#">{{ user.user.name }}</a>
                                <p>
                                  <span
                                    ><i class="mdi mdi-email-outline"></i
                                    >&nbsp;</span
                                  >{{ user.user.email }}
                                </p>
                                <p class="accepted" v-if="user.accept">
                                  (Đang thực hiện)
                                </p>
                                <p class="not-accept" v-else>(Chưa xác nhận)</p>
                              </div>
                              <span
                                class="close"
                                @click="
                                  toggleRemoveStaff(
                                    taskInfo.id,
                                    user.user.id,
                                    user.user.name
                                  )
                                "
                                v-if="taskInfo.user_id == id"

                                data-bs-toggle="tooltip"
                                data-bs-placement="right"
                                title="Xoá nhân viên"
                                >&times;</span
                              >
                            </div>
                          </li>
                          <li>
                            <div
                              class="btn-add-user"
                              @click="addStaff = !addStaff"
                              v-if="!addStaff && taskInfo.user_id == id"
                            >
                              + Thêm người thực hiện
                            </div>
                          </li>
                        </ul>
                        <div v-else>
                          <span>Chưa có người thực hiện </span>
                          <div
                            class="btn-add-user"
                            @click="addStaff = !addStaff"
                            v-if="!addStaff"
                          >
                            + Thêm người thực hiện
                          </div>
                        </div>
                        <div v-if="addStaff">
                          <div class="col-md-12">
                            <div class="form-group row">
                              <label class="col-sm-2 col-form-label"
                                >Người tham gia</label
                              >
                              <div class="col-sm-6">
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
                                      :disabled="
                                        users.find((x) => x.id == staff.id) ||
                                        taskInfo.task_user.find(
                                          (x) => x.user_id == staff.id
                                        )
                                      "
                                    >
                                      {{ staff.user.name }}
                                    </option>
                                  </optgroup>
                                </select>
                              </div>
                              <div class="col-sm-4 form-btn">
                                <button
                                  type="button"
                                  class="btn btn-sm btn-gradient-info"
                                  @click="toggleAddStaff()"
                                >
                                  Thêm
                                </button>
                                <button
                                  type="button"
                                  class="btn btn-sm btn-gradient-secondary"
                                  @click="addStaff = !addStaff"
                                >
                                  Hủy
                                </button>
                              </div>
                            </div>
                          </div>
                          <ul class="row-content">
                            <li v-for="(user, index) in users" :key="index">
                              <div class="user-info">
                                <img :src=" avatar_link(info.user.avatar) || 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'" />
                                <div class="info">
                                  <a href="#">{{ user.name }}</a>
                                  <p>
                                    <span
                                      ><i class="mdi mdi-map-marker"></i
                                      >&nbsp;</span
                                    >{{ user.phone }}
                                  </p>
                                </div>
                                <span
                                  class="close"
                                  @click="toggleRemoveUser(index)"
                                  >&times;</span
                                >
                              </div>
                            </li>
                            <li v-if="users.length > 0">
                              <button
                                type="button"
                                class="btn btn-sm btn-gradient-info"
                                @click="toggleAddStaffToTask(taskInfo.id)"
                              >
                                Cập nhật
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div class="row-info task-content">
                        <div class="row-title" v-if="!editTaskContent">
                          Nội dung công việc:
                          <button
                            type="button"
                            @click="toggleEditTaskContent(taskInfo.content)"
                            v-if="taskInfo.user_id == id"
                            class="btn btn-sm btn-edit"
                          >
                            <i class="mdi mdi-border-color"></i>Chỉnh sửa
                          </button>
                        </div>
                        <p
                          class="row-content"
                          v-if="!editTaskContent"
                          v-html="taskInfo.content"
                        ></p>
                        <div class="edit-task-content" v-else>
                          <QuillEditor
                            toolbar="minimal"
                            theme="snow"
                            v-model:content="taskContent"
                            contentType="html"
                          />
                          <button
                            type="button"
                            class="btn btn-sm btn-outline-info"
                            @click="toggleUpdateTaskContent(taskInfo.id)"
                          >
                            Cập nhật
                          </button>
                          <button
                            type="button"
                            class="btn btn-sm btn-outline-secondary"
                            @click="toggleEditTaskContent()"
                          >
                            Hủy
                          </button>
                        </div>
                      </div>
                      <div class="row-info">
                        <span class="row-title">Khách hàng liên quan: </span>
                        <div
                          class="row-content customer-info"
                          v-if="taskInfo.customer && !addCustomer"
                        >
                          <img src="../assets/images/faces/user.jpg" />
                          <div class="info">
                            <a href="#">{{ taskInfo.customer.name }}</a>
                            <p>
                              <span><i class="mdi mdi-map-marker"></i></span
                              >{{ taskInfo.customer.address }}
                            </p>
                            <p>
                              <span class="row-title"
                                ><i class="mdi mdi-email-outline"></i
                                >&nbsp;</span
                              >{{ taskInfo.customer.zalo }} -
                              {{ taskInfo.customer.email }}
                            </p>
                          </div>

                          <div class="btn-action-container">
                            <button type="button" @click="toggleAddCustomer()">
                              <i class="mdi mdi-pen"></i>
                            </button>
                            <button
                              type="button"
                              @click="updateCustomer(taskInfo.id, -1)"
                            >
                              <i class="mdi mdi-window-close"></i>
                            </button>
                          </div>
                        </div>
                        <div v-else>
                          <br />
                          <div
                            class="btn-add-user"
                            @click="toggleAddCustomer()"
                            v-if="!addCustomer"
                          >
                            <span>Chưa có khách hàng </span>
                            + Thêm khách hàng
                          </div>
                          <div v-else>
                            <div class="col-md-12">
                              <div class="form-group row">
                                <div class="col-sm-9">
                                  <input
                                    type="text"
                                    class="form-control"
                                    v-model="customer_name"
                                    @keyup="searchName(customer_name)"
                                    @focus="openListSelect = true"
                                  />
                                  <span
                                    class="ic-dropdown"
                                    :class="{ open: openListSelect }"
                                    @click="toggleOpenListSelect()"
                                    ><i class="mdi mdi-chevron-right"></i
                                  ></span>
                                  <div
                                    class="list-select"
                                    v-if="openListSelect"
                                  >
                                    <ul>
                                      <li
                                        v-for="(cus, i) in customers"
                                        :key="i"
                                        :class="{
                                          selected:
                                            customer && cus.id == customer.id,
                                        }"
                                        @click="toggleOpenListSelect(cus)"
                                      >
                                        {{ cus.name }}
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                                <div class="col-sm-3 form-btn">
                                  <button
                                    type="button"
                                    class="btn btn-sm btn-gradient-secondary"
                                    @click="toggleAddCustomer()"
                                  >
                                    Hủy
                                  </button>
                                </div>
                              </div>
                              <div class="col-md-12">
                                <div class="form-group row">
                                  <div class="user-info" v-if="customer">
                                    <img
                                      src="../assets/images/faces/user.jpg"
                                    />
                                    <div class="info">
                                      <a href="#">{{ customer.name }}</a>
                                      <p>
                                        <span
                                          ><i
                                            class="mdi mdi-map-marker"
                                          ></i></span
                                        >{{ customer.address }}
                                      </p>
                                    </div>
                                    <div class="btn-action-container">
                                      <button
                                        type="button"
                                        @click="
                                          updateCustomer(
                                            taskInfo.id,
                                            customer.id
                                          )
                                        "
                                      >
                                        <i class="mdi mdi-check"></i>
                                      </button>
                                      <button type="button">
                                        <i class="mdi mdi-window-close"></i>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6 stretch-card note">
              <div class="card">
                <div class="card-body">
                  <div class="card-content">
                    <div>
                      <div class="tab-content">
                        <note-component
                          :notesProps="taskInfo.note_of_task"
                          :task_id="taskInfo.id"
                        ></note-component>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-slot:footer v-if="taskInfo">
        <button
          type="button"
          class="btn btn-info"
          @click="toggleAcceptTask(taskInfo.id)"
          v-if="
            taskInfo.task_status_id >= 1 &&
            taskInfo.task_status_id <= 3 &&
            taskInfo.task_user.find((x) => x.user_id === id) &&
            taskInfo.task_user.find((x) => x.user_id === id).accept == 0
          "
        >
          Nhận việc
        </button>
        <div
          v-if="
            taskInfo.task_status_id != 4 &&
            taskInfo.task_status_id != 5 &&
            taskInfo.task_status_id != 6 &&
            taskInfo.task_user.find((x) => x.user_id === id) &&
            taskInfo.task_user.find((x) => x.user_id === id).accept != 0
          "
        >
          <button
            type="button"
            class="btn btn-success"
            @click="toggleUpdateTask(taskInfo.id, 4)"
            :disabled="taskInfo.task_status_id == 1"
          >
            Hoàn thành
          </button>
          <button
            type="button"
            class="btn btn-danger"
            @click="toggleUpdateTask(taskInfo.id, 6)"
            v-if="taskInfo.user_id == id"
          >
            Hủy
          </button>
        </div>
        <button
          type="button"
          class="btn btn-info"
          @click="toggleUpdateTask(taskInfo.id, 7)"
          v-if="
            taskInfo.task_status_id >= 4 &&
            taskInfo.task_status_id <= 6 &&
            taskInfo.user_id == id
          "
        >
          Phục hồi
        </button>
        <button
          type="button"
          class="btn btn-secondary"
          @click="toggleModalDetail()"
        >
          Đóng
        </button>
      </template>
    </base-modal>
  </div>
</template>
<script>
import axios from "redaxios";
import * as url from "../config";
import moment from "moment/min/moment-with-locales";
moment.locale("vi");

import BaseModal from "./Modal.vue";
import NoteComponent from "./NoteOfTaskComponent.vue";

export default {
  props: {
    taskInfo: {
      type: Object,
      default: function () {
        return null;
      },
    },
    staffs: {
      type: Array,
      default: function () {
        return null;
      },
    },
  },
  components: {
    BaseModal,
    NoteComponent,
  },
  data() {
    return {
      customer: null,
      users: [],
      staff_id: -1,
      customer_code: "",
      editTaskName: false,
      editTaskTime: false,
      editTaskContent: false,
      addStaff: false,
      addCustomer: false,
      task_name: "",
      task_start: "",
      task_end: "",
      taskContent: "",
      customers: null,
      openListSelect: false,
      customer_name: "",
    };
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    },
    customersList() {
      return this.$store.state.baseData ? this.$store.state.baseData.customers : null;
    },
    id() {
      return this.$store.state.userInfo.id;
    },
  },
  watch: {
    customersList() {
      this.customers = this.customersList;
      console.log(this.customersList);
    },
  },
  created() {
    this.resetValue();
    this.customers = this.customersList;
    console.log(this.customersList);
  },
  methods: {
    resetValue() {
      this.users = [];
      this.task_name = "";
      this.customer_code = "";
      this.editTaskName = false;
      this.customer = null;
      this.addCustomer = false;
      this.editTaskContent = false;
      this.editTaskTime = false;
    },
    toggleOpenListSelect(value) {
      this.openListSelect = !this.openListSelect;
      if (value) {
        this.customer = value;
        this.customer_name = value.name;
      }
    },
    avatar_link(value){
      if(value){
        return url.server_url + value;
      }else{
        return null;
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
    formatDate(value) {
      return moment(value).format("llll");
    },
    toggleModalDetail() {
      this.$emit("close-modal");
    },
    toggleEdiTaskName(content) {
      this.editTaskName = !this.editTaskName;
      if (content !== "") {
        this.task_name = content;
      }
    },
    toggleEditTaskTime(start, end) {
      this.editTaskTime = !this.editTaskTime;
      if (start && end) {
        this.task_start = moment(start).format("YYYY-MM-DDTHH:mm");
        this.task_end = moment(end).format("YYYY-MM-DDTHH:mm");
        console.log(end);
      }
    },
    async toggleUpdateTaskTime(task_id) {
      this.taskInfo.start = this.task_start;
      this.taskInfo.end = this.task_end;
      await axios({
        url: url.tasks.UPDATE + task_id,
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          Accept: "application/json",
        },
        data: this.taskInfo,
      })
        .then((res) => {
          this.resetValue();
          this.$emit("reload");
          this.$store.dispatch("getTaskInfo", {
            id: task_id,
            upload: false,
          });
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    toggleEditTaskContent(content) {
      this.editTaskContent = !this.editTaskContent;
      if (content !== "") {
        this.taskContent = content;
        console.log(content);
      }
    },
    toggleAddCustomer() {
      this.addCustomer = !this.addCustomer;
      if (!this.addCustomer) {
        this.resetValue();
      }
    },
    async toggleAcceptTask(id) {
      await axios({
        url: url.tasks.ACCEPT_TASK + id,
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          Accept: "application/json",
        },
      })
        .then((res) => {
          this.$emit('reload');
          cuteToast({
            type: "success",
            message: res.data.message,
            timer: 3000,
          });
          this.$store.dispatch("getTaskInfo", {
            id: res.data.id,
            upload: false,
          });
        })
        .catch((err) => {
          console.log(err);
        });
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
    async toggleAddStaffToTask(task_id) {
      await axios({
        url: url.tasks.ADD_STAFF,
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          Accept: "application/json",
        },
        data: {
          users: this.users,
          id: task_id,
        },
      })
        .then((res) => {
          this.addStaff = false;
          this.$store.dispatch("getTaskInfo", {
            id: task_id,
            upload: false,
          });
          cuteToast({
            type: "success",
            message: res.data.message,
            timer: 5000,
          });
          this.resetValue();
          console.log(res.data);
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
    toggleRemoveStaff(task_id, staff_id, staff_name) {
      cuteAlert({
        type: "question",
        title: "Xoá nhân viên",
        message: "Xóa nhân viên ra khỏi công việc?",
        confirmText: "Xác nhận",
        cancelText: "Hủy",
      }).then((e) => {
        if (e) {
          axios({
            url: url.tasks.REMOVE_STAFF,
            method: "POST",
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
              Accept: "application/json",
            },
            data: {
              task_id: task_id,
              staff_id: staff_id,
              staff_name: staff_name,
            },
          })
            .then((res) => {
              this.modalTaskDetail = false;
              this.toggleModalDetail(res.data.id);
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
    },
    toggleUpdateTask(task_id, status_id) {
      let message = "";
      switch (status_id) {
        case 4:
          message = "Xác nhận hoàn thành công việc!";
          break;
        case 6:
          message = "Xác nhận hủy công việc!";
          break;
        case 7:
          message = "Xác nhận phục hồi công việc!";
          break;
        default:
          message = "Xác nhận cập nhật công việc!";
          break;
      }
      cuteAlert({
        type: "question",
        title: "Cập nhật công việc",
        message: message,
        confirmText: "Xác nhận",
        cancelText: "Hủy",
      }).then((e) => {
        if (e) {
          axios({
            url: url.tasks.UPDATE_TASK_STATUS,
            method: "POST",
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
              Accept: "application/json",
            },
            data: {
              task_id: task_id,
              status_id: status_id,
            },
          })
            .then((res) => {
              console.log(res.data);
              this.$emit("reload");
              this.$store.dispatch("getTaskInfo", {
                id: task_id,
                upload: true,
              });
              cuteToast({
                type: "success",
                message: res.data.message,
                timer: 5000,
              });
              this.resetValue();
            })
            .catch((err) => {
              console.log(err);
              // cuteToast({
              //   type: "error",
              //   message: err.data.message,
              //   timer: 3000,
              // });
            });
        }
      });
    },
    toggleUpdateTaskName(task_id) {
      cuteAlert({
        type: "question",
        title: "Cập nhật công việc",
        message: "Cập nhật tên công việc!",
        confirmText: "Xác nhận",
        cancelText: "Hủy",
      }).then((e) => {
        if (e) {
          axios({
            url: url.tasks.UPDATE_TASK_NAME,
            method: "POST",
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
              Accept: "application/json",
            },
            data: {
              task_id: task_id,
              name: this.task_name,
            },
          })
            .then((res) => {
              console.log(res.data);
              this.taskInfo.name = this.task_name;
              this.resetValue();
              this.$emit("reload");
              this.$store.dispatch("getTaskInfo", {
                id: task_id,
                upload: false,
              });
              cuteToast({
                type: "success",
                message: res.data.message,
                timer: 5000,
              });
            })
            .catch((err) => {
              cuteToast({
                type: "error",
                message: err.data.message,
                timer: 3000,
              });
              console.log(err);
            });
        }
      });
    },
    async toggleUpdateTaskContent(task_id) {
      await axios({
        url: url.tasks.UPDATE_TASK_CONTENT,
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          Accept: "application/json",
        },
        data: {
          task_id: task_id,
          task_content: this.taskContent,
        },
      })
        .then((res) => {
          this.taskInfo.content = this.taskContent;
          this.resetValue();
          this.$store.dispatch("getTaskInfo", {
            id: res.data.task_id,
            upload: false,
          });
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
    updateCustomer(task_id, customer_id) {
      if (customer_id == -1) {
        cuteAlert({
          type: "question",
          title: "Cập nhật công việc",
          message: "Xóa khách hàng khỏi công việc?",
          confirmText: "Xác nhận",
          cancelText: "Hủy",
        }).then((e) => {
          if (e) {
            axios({
              url: url.tasks.UPDATE_CUSTOMER,
              method: "POST",
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
                Accept: "application/json",
              },
              data: {
                task_id: task_id,
                customer_id: customer_id,
              },
            })
              .then((res) => {
                this.$emit("reload");
                this.$store.dispatch("getTaskInfo", {
                  id: res.data.task_id,
                  upload: false,
                });
                this.resetValue();
              })
              .catch((err) => {
                cuteToast({
                  type: "error",
                  message: err.data.message,
                  timer: 3000,
                });
              });
          }
        });
      } else {
        axios({
          url: url.tasks.UPDATE_CUSTOMER,
          method: "POST",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            Accept: "application/json",
          },
          data: {
            task_id: task_id,
            customer_id: customer_id,
          },
        })
          .then((res) => {
            this.$emit("reload");
            this.$store.dispatch("getTaskInfo", {
              id: res.data.task_id,
              upload: false,
            });
            this.resetValue();
          })
          .catch((err) => {
            cuteToast({
              type: "error",
              message: err.data.message,
              timer: 3000,
            });
          });
      }
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
  margin: 1rem;
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

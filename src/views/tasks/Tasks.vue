<template lang="">
  <Loading />
  <div class="main-panel">
    <div class="content-wrapper">
      <base-modal
        v-if="modalTaskDetail"
        title="Thông tin công việc"
        :size="true"
        @closeModal="toggleModalDetail()"
      >
        <template v-slot:body>
          <!-- <div class="load" v-if="loading">
            <div class="text-center">
              <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          </div> -->
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
                              @click="toggleEdiTaskName()"
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
                          <span class="row-content"
                            >{{ formatDate(taskInfo.start) }} -
                            {{ formatDate(taskInfo.end) }}</span
                          >
                        </div>
                        <div class="row-info">
                          <span class="row-title">Người giao việc: </span>
                          <div class="user-info">
                            <img src="../../assets/images/faces/user.jpg" />
                            <div class="info">
                              <a href="#">{{ taskInfo.user.name }}</a>
                              <p>
                                <span
                                  ><i class="mdi mdi-email-outline"></i>&nbsp;</span
                                >{{ taskInfo.user.email }}
                              </p>
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
                              data-bs-toggle="tooltip"
                              data-bs-placement="right"
                              title="Xoá nhân viên"
                              >&times;</span
                            >
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
                                <img src="../../assets/images/faces/user.jpg" />
                                <div class="info">
                                  <a href="#">{{ user.user.name }}</a>
                                  <p>
                                    <span
                                      ><i
                                        class="mdi mdi-email-outline"
                                      ></i>&nbsp;</span
                                    >{{ user.user.email }}
                                  </p>
                                  <p class="accepted" v-if="user.accept">
                                    (Đang thực hiện)
                                  </p>
                                  <p class="not-accept" v-else>
                                    (Chưa xác nhận)
                                  </p>
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
                                v-if="!addStaff"
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
                                  <select
                                    class="form-control"
                                    v-model="staff_id"
                                  >
                                    <option value="-1" selected>
                                      --Chọn--
                                    </option>
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
                                  <img
                                    src="../../assets/images/faces/user.jpg"
                                  />
                                  <div class="info">
                                    <a href="#">{{ user.name }}</a>
                                    <p>
                                      <span
                                        ><i
                                          class="mdi mdi-map-marker"
                                        ></i>&nbsp;</span
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
                          <span class="row-title">Nội dung công việc: </span>
                          <p class="row-content">
                            {{
                              taskInfo.content
                                ? taskInfo.content
                                : "Đang cập nhật"
                            }}
                          </p>
                        </div>
                        <div class="row-info">
                          <span class="row-title">Khách hàng liên quan: </span>
                          <div
                            class="row-content customer-info"
                            v-if="taskInfo.customer && !addCustomer"
                          >
                            <img src="../../assets/images/faces/user.jpg" />
                            <div class="info">
                              <a href="#">{{ taskInfo.customer.name }}</a>
                              <p>
                                <span><i class="mdi mdi-map-marker"></i></span
                                >{{ taskInfo.customer.address }}
                              </p>
                              <p>
                                <span class="row-title"
                                  ><i class="mdi mdi-email-outline"></i>&nbsp;</span
                                >{{ taskInfo.customer.zalo }} -
                                {{ taskInfo.customer.email }}
                              </p>
                            </div>

                            <div class="btn-action-container">
                                        <button type="button" @click="toggleAddCustomer()"><i class="mdi mdi-pen"></i></button>
                                        <button type="button" @click="updateCustomer(taskInfo.id, -1)"><i class="mdi mdi-window-close"></i></button>
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
                                  <div class="col-sm-7">
                                    <input
                                      type="text"
                                      class="form-control"
                                      v-model="customer_code"
                                    />
                                  </div>
                                  <div class="col-sm-5 form-btn">
                                    <button
                                      type="button"
                                      class="btn btn-sm btn-gradient-info"
                                      @click="toggleSearchCustomer()"
                                    >
                                      Tìm kiếm
                                    </button>
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
                                        src="../../assets/images/faces/user.jpg"
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
                                        <button type="button" @click="updateCustomer(taskInfo.id, customer.id)"><i class="mdi mdi-check"></i></button>
                                        <button type="button"><i class="mdi mdi-window-close"></i></button>
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
                            :notes="taskInfo.note_of_task"
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
              taskInfo.task_status_id != 6
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
              (taskInfo.task_user.findIndex((x) => x.user_id == id) >= 0 || taskInfo.user_id == id)
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

      <!-- Modal create task -->
      <base-modal
        v-if="modalCreateTask"
        title="Tạo mới công việc"
        :size="true"
        @closeModal="toggleModalCreate()"
      >
        <template v-slot:body>
          <div class="col-12">
            <div class="card bg-gray">
              <div class="card-body">
                <form class="form-sample">
                  <div class="row bd">
                    <div class="col-md-12">
                      <div class="form-group row">
                        <label class="col-sm-2 col-form-label"
                          >Tên công việc</label
                        >
                        <div class="col-sm-10">
                          <input
                            type="text"
                            class="form-control"
                            v-model="task.name"
                            placeholder="Tên công việc"
                            ref="taskName"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="form-group row">
                        <label class="col-sm-2 col-form-label"
                          >Thời gian thực hiện</label
                        >
                        <div class="col-sm-5">
                          <input
                            type="datetime-local"
                            class="form-control"
                            v-model="task.start"
                          />
                        </div>
                        <div class="col-sm-5">
                          <input
                            type="datetime-local"
                            class="form-control"
                            v-model="task.end"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group row">
                        <label class="col-sm-4 col-form-label"
                          >Loại công việc</label
                        >
                        <div class="col-sm-8">
                          <select
                            class="form-control"
                            v-model="task.type_of_task_id"
                            v-if="typeOfTask"
                          >
                            <option value="-1">-- Loại công việc --</option>
                            <option
                              v-for="(type, index) in typeOfTask"
                              :key="index"
                              :value="type.id"
                            >
                              {{ type.type }}
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label"
                          >Mã công việc</label
                        >
                        <div class="col-sm-9">
                          <input type="text" class="form-control" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label"
                          >Nội dung công việc</label
                        >
                        <div class="col-sm-12 editor">
                          <QuillEditor
                            toolbar="essential"
                            theme="snow"
                            v-model:content="task.content"
                            contentType="text"
                          />
                        </div>
                      </div>
                    </div>
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
                    <div class="col-md-12">
                      <div class="form-group row">
                        <div class="row-info" style="align-items: baseline">
                          <ul class="row-content" v-if="users.length > 0">
                            <li v-for="(user, index) in users" :key="index">
                              <div class="user-info">
                                <img src="../../assets/images/faces/user.jpg" />
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
                    <div class="col-md-12">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label"
                          >Khách hàng liên quan</label
                        >
                        <div class="col-sm-6">
                          <input
                            type="text"
                            class="form-control"
                            v-model="customer_code"
                          />
                        </div>
                        <div class="col-sm-3 form-btn">
                          <button
                            type="button"
                            class="btn btn-sm btn-gradient-info"
                            @click="toggleSearchCustomer()"
                          >
                            Tìm kiếm
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="form-group row">
                        <div class="user-info" v-if="customer">
                          <img src="../../assets/images/faces/user.jpg" />
                          <div class="info">
                            <a href="#">{{ customer.name }}</a>
                            <p>
                              <span><i class="mdi mdi-map-marker"></i></span
                              >{{ customer.address }}
                            </p>
                          </div>
                          <span class="close" @click="toggleRemoveCustomer()"
                            >&times;</span
                          >
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
            @click="toggleCreate()"
          >
            Tạo việc
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
              <i class="mdi mdi-calendar-plus btn-icon-prepend"></i> Thêm mới
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
import CustomerInfoModal from "../../components/CustomerInfoModal.vue";
import NoteComponent from "../../components/NoteOfTaskComponent.vue";
import TableTaskComponent from "../../components/TableTaskComponent.vue";
export default {
  components: {
    BaseModal,
    Loading,
    CustomerInfoModal,
    NoteComponent,
    TableTaskComponent,
  },
  data() {
    return {
      tabIndex: 1,
      total: 20,
      loadMore: false,
      search: "",
      editTaskName: false,
      modalTaskDetail: false,
      modalCreateTask: false,
      addStaff: false,
      addCustomer: false,
      staff_id: -1,
      customer_code: "",
      task_name: "",
      task: {
        content: "",
        customer_id: null,
        end: null,
        name: null,
        start: null,
        task_status_id: 1,
        type_of_task_id: -1,
      },
      users: [],
      customer: null,
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
    id() {
      return this.$store.state.userInfo.id;
    },
    typeOfTask() {
      return this.$store.state.baseData
        ? this.$store.state.baseData.type_of_task
        : null;
    },
    staffs() {
      return this.$store.state.tasks ? this.$store.state.tasks.staff : null;
    },

  },
  
  created() {
    this.load();
  },
  methods: {
    resetValue() {
      this.users = [];
      this.task_name = "";
      this.customer_code = "";
      this.editTaskName = false;
      this.customer = null;
      this.addCustomer= false;
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
    toggleEdiTaskName() {
      this.editTaskName = !this.editTaskName;
    },
    toggleAddCustomer(){
      this.addCustomer = !this.addCustomer;
      if(!this.addCustomer){
        this.resetValue();
      }
      
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
    async toggleCreate() {
      if (this.task.name == null || this.task.name == "") {
        cuteToast({
          type: "error",
          message: "Không để trống tên công việc!",
          timer: "3000",
        });
        this.$refs.taskName.focus();
        return;
      }
      if (moment(this.task.start).valueOf() > moment(this.task.end).valueOf()) {
        cuteToast({
          type: "error",
          message: "Ngày bắt đầu không thể lớn hơn kết thúc!",
          timer: "3000",
        });
        return;
      }
      if (this.task.type_of_task_id == -1) {
        cuteToast({
          type: "error",
          message: "Vui lòng chọn loại công việc!",
          timer: "3000",
        });
        return;
      }
      await axios({
        url: url.tasks.CREATE,
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          Accept: "application/json",
        },
        data: {
          task: this.task,
          users: this.users,
        },
      })
        .then((res) => {
          console.log(res.data.task.id);
          this.load();
          this.toggleModalCreate();
          this.toggleModalDetail(res.data.task.id);
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
    async toggleSearchCustomer() {
      await axios({
        url: url.customer.SEARCH_CUSTOMER,
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          Accept: "application/json",
        },
        data: {
          customer_code: this.customer_code,
        },
      })
        .then((res) => {
          if (res.data) {
            this.customer = res.data;
            this.task.customer_id = res.data.id;
            this.customer_code = "";
          }
        })
        .catch((err) => {
          cuteToast({
            type: "error",
            message: err.data.msg,
            timer: "3000",
          });
        });
    },
    toggleRemoveCustomer() {
      this.customer = null;
    },
    async toggleAddStaffToTask(id) {
      await axios({
        url: url.tasks.ADD_STAFF,
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          Accept: "application/json",
        },
        data: {
          users: this.users,
          id: id,
        },
      })
        .then((res) => {
          this.addStaff = false;
          this.$store.dispatch("getTaskInfo", {
            id: this.task_id,
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
            message: err.data.msg,
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
              this.load();
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
              cuteToast({
                type: "error",
                message: err.data.msg,
                timer: 3000,
              });
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
              this.resetValue();
              this.load();
              this.$store.dispatch("getTaskInfo", {
                id: this.task_id,
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
            });
        }
      });
    },
    updateCustomer(task_id, customer_id){
      if ( customer_id == -1){
        cuteAlert({
          type: "question",
          title: "Cập nhật công việc",
          message: "Xóa khách hàng khỏi công việc?",
          confirmText: "Xác nhận",
          cancelText: "Hủy",
        }).then(e =>{
          if(e){
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
              this.load();
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
        })
      }else{
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
              this.load();
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
    }
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
.info {
  margin-left: 0.5rem;
}
.user-info {
  display: flex;
  width: max-content;
  align-items: center;
  margin: 1rem 0;
  background-color: #eef0f5;
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
.btn-action-container{
  display: flex;
  margin-left: 0.5rem;
}
.btn-action-container button{
  border-radius: 50%;
  line-height: 1;
  border: 0;
  margin: 0.3rem;
  padding: 0.2rem;
}
.btn-action-container button:hover{
  background-color: #ffffff;
  transform: scale(1.2);
  color: rgb(0, 4, 255);
}
</style>

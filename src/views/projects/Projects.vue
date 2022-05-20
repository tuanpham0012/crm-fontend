<template lang="">
  <Loading />

  <!-- modal tạo mới dự án -->
  <CreateProjectModal v-if="modalCreate" @close-modal="toggleModalCreate()" @update="getList()" @open-project="viewDetailProject"/>

  <!-- tham gia dự án -->

  <base-modal
        title="Tham gia dự án"
        :size="true"
        v-if="modalJoinProject"
        @closeModal="toggleModalJoin()"
      >
        <template v-slot:body>
          <div class="col-12">
            <div class="card bg-gray">
              <div class="card-body">
                <form class="form-sample">
                  <div class="row bd">
                    <div class="table-responsive">
                <table class="table table-hover table-bordered">
                  <thead>
                    <tr>
                      <th>
                        #
                      </th>
                      <th>Mã dự án</th>
                      <th>Tên dự án</th>
                      <th>Ngày bắt đầu</th>
                      <th>Ngày kết thúc</th>
                      <th>Người phụ trách</th>
                      <th>Trạng thái</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody v-if="list_join && list_join.length > 0">
                    <tr
                      v-for="(project, index) in list_join"
                      :key="index"
                    >
                      <td>
                        {{ index + 1 }}
                      </td>
                      <td>
                        {{ project.project_code}}
                      </td>
                      <td>
                        <div>
                          <p class="view">{{ project.name }}</p>
                          <p class="address">
                            Ngày tạo: {{ dateTime(project.created_at) }}
                          </p>
                        </div>
                      </td>
                      <td>
                         {{ dateTime(project.start_at) }}
                      </td>
                      <td>{{ dateTime(project.end) }}</td>
                      <td>{{ project.user.name ?? 'Đang cập nhật' }}</td>
                      <td>{{ project.project_status.status ?? 'Đang cập nhật' }}</td>
                      <td>
                        <button type="button" class="btn btn-mg btn-inverse-success btn-icon" v-if="project.project_participants.findIndex( x => x.user_id == id) < 0" @click="toggleJoinProject(project.id)"><i class="fa fa-sign-in" aria-hidden="true"></i></button>
                        <button type="button" class="btn btn-mg btn-link" v-else disabled>Chờ xác nhận</button>
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
                </form>
              </div>
            </div>
          </div>
        </template>
        <template v-slot:footer>
          <button
            type="button"
            class="btn btn-sm btn-secondary"
            @click="toggleModalJoin()"
          >
            Đóng
          </button>
        </template>
      </base-modal>

  <div class="main-panel">
    <div class="content-wrapper">
      
      <div class="page-header">
        <h3 class="page-title">Danh sách dự án</h3>
        <nav aria-label="breadcrumb">
          <div class="btn-action">
            <button
              type="button"
              @click="toggleModalJoin()"
              class="btn btn-sm btn-gradient-info btn-icon-text"
            >
              <i class="mdi mdi-account-plus btn-icon-prepend"></i> Tham gia dự án mới
            </button>
            <button
              type="button"
              @click="toggleModalCreate()"
              class="btn btn-sm btn-gradient-info btn-icon-text"
            >
              <i class="mdi mdi-account-plus btn-icon-prepend"></i> Dự án mới
            </button>
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
                      placeholder="Tên dự án"
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
                  <label class="fill-label">Trạng thái</label>
                  <div class="fill-select">
                    <select
                      class="form-control form-control-sm"
                      v-model="project_status_id"
                    >
                      <option value="-1" seleted>-- Tất cả --</option>
                      <option
                        v-for="(status, index) in project_status"
                        :key="index"
                        :value="status.id"
                      >
                        {{ status.status }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="table-responsive">
                <table class="table table-hover table-bordered">
                  <thead>
                    <tr>
                      <th>
                        #
                      </th>
                      <th>Mã dự án</th>
                      <th>Tên dự án</th>
                      <th>Ngày bắt đầu</th>
                      <th>Ngày kết thúc</th>
                      <th>Người phụ trách</th>
                      <th>Trạng thái</th>
                      <th>Số công việc</th>
                      <th>Số nguời tham gia</th>
                    </tr>
                  </thead>
                  <tbody v-if="projects && projects.data.length > 0">
                    <tr
                      v-for="(project, index) in projects.data"
                      :key="index"
                    >
                      <td>
                        {{ index + 1 }}
                      </td>
                      <td>
                        {{ project.project_code}}
                      </td>
                      <td>
                        <div>
                          <p class="view" @click="viewDetailProject(project.id)">{{ project.name }}</p>
                          <p class="address">
                            Ngày tạo: {{ dateTime(project.created_at) }}
                          </p>
                        </div>
                      </td>
                      <td>
                         {{ dateTime(project.start_at) }}
                      </td>
                      <td>{{ dateTime(project.end) }}</td>
                      <td>{{ project.user.name ?? 'Đang cập nhật' }}</td>
                      <td>{{ project.project_status.status ?? 'Đang cập nhật' }}</td>
                      <td :class="{ 'updating' : project.tasks.length == 0 }">
                        {{
                          project.tasks.length ?? '0'
                        }}
                      </td>
                      <td :class="{ 'updating' : project.project_participants.length == 0 }">
                        {{
                          project.project_participants.length ?? '0'
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
            <div class="panigate" v-if="projects">
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
                    v-for="page in projects.last_page"
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
                    v-if="currentPage != projects.last_page"
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

import CreateProjectModal from "../../components/CreateProjectModal.vue";
import Loading from "../../components/Loading.vue";
import BaseModal from "../../components/Modal.vue";

import moment from "moment/min/moment-with-locales";
moment.locale("vi");

export default {
  components: {
    Loading,
    CreateProjectModal,
    BaseModal
  },
  data() {
    return {
      modalCreate: false,
      modalJoinProject: false,
      currentPage: 1,
      search: "",
      time: moment().format('yyyy-MM-DD'),
      project_status_id: 2,
      isDeleted: 0,
      customer_create: {
        name: "",
        email: "",
        phone: "",
        gender: "Nam",
        interest: [],
        address: "",
        type_of_customer_id: "1",
      },
      select: false,
      selectCustomer: [],
      isCheckAll: false,
      customerFile: null,
      joinProjects: null,
    };
  },
  computed: {
    project_status() {
      return this.$store.state.baseData.project_status ?? null;
    },
    projects() {
      return this.$store.state.projects ? this.$store.state.projects.projects : null;
    },
    list_join(){
      return this.$store.state.projects ? this.$store.state.projects.list_join : null;
    },
    id(){
      return this.$store.getters.getID;
    }
  },
  watch: {
    currentPage() {
      this.getList();
    },
    project_status_id() {
      this.getList();
    },
    time(){
      this.getList();
    },
    projects(){
      this.joinProjects = this.projects.filter
    }
  },
  created() {
    this.getList();
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

    dateTime(value) {
      return moment(value).utc().format("DD/MM/YYYY");
    },
    toggleModalCreate() {
      this.modalCreate = !this.modalCreate;
    },
    toggleModalJoin(){
      this.modalJoinProject = !this.modalJoinProject;
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
      this.$store.dispatch("getProjectList", {
        page: this.currentPage,
        search: this.search,
        status: this.project_status_id,
        time: this.time,
      });
    },
    viewDetailProject(id){
      console.log(id);
      if(id){
        this.$router.push({ name: 'project-detail', params:{ id: id}})
      }
    },
    async toggleJoinProject(id){
      await axios({
        url: url.projects.JOIN_PROJECT,
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          Accept: "application/json",
        },
        data: {
          project_id: id,
        },
      }).then( res => {
        cuteToast({
          type: "success",
          message: res.data.message,
          timer: "5000",
        });
        this.getList();
      }).catch( err => {
        console.log(err);
        cuteToast({
          type: "error",
          message: err.data.message,
          timer: "5000",
        });
      })
    }
  },
};
</script>
<style scoped>
td {
  padding: 0.25rem 0.5rem;
}
.view {
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  color: rgb(4, 0, 255);
  cursor: pointer;
  word-wrap: break-word;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 15rem;
}
.view:hover {
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

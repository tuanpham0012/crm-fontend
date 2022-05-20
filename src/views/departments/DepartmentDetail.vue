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

    <base-modal
      v-if="modalCreate"
      title="Tạo mới phòng ban"
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
                        <select class="form-control" v-model="newStaff.user_id">
                          <option
                            v-for="(user, i) in all_user"
                            :value="user.id"
                          >
                            {{ user.name }} (
                              {{ user.staff_of_department && user.staff_of_department.departments
                              ? user.staff_of_department.departments.name : "Đang cập nhật"
                            }} )
                          </option>
                        </select>
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
                          <option value=1>Trưởng phòng</option>
                          <option value=2>Phó phòng</option>
                          <option value=3>Nhân viên</option>
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
        <h3 class="page-title">{{ department ? department.name : null }}</h3>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item active">Quản lí</li>
            <li class="breadcrumb-item active">
              <a href="#" @click.stop="$router.go(-1)"> Phòng ban </a>
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
                <button
                  type="button"
                  @click="toggleModalUpdate()"
                  class="btn btn-sm btn-mg btn-gradient-info btn-icon-text"
                >
                  <i class="mdi mdi-account-plus btn-icon-prepend"></i> Cập nhật
                </button>
              </div>
              <br />
              <div class="table-responsive">
                <table class="table table-hover table-bordered">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th></th>
                      <th>Họ tên</th>
                      <th>Email</th>
                      <th>Điện thoại</th>
                      <th>Chức vụ</th>
                      <th>Đăng nhập cuối</th>
                    </tr>
                  </thead>
                  <tbody v-if="staffs && staffs.length > 0">
                    <tr
                      v-for="(staff, index) in staffs"
                      :key="index"
                      @click="toggleViewDetail(staff)"
                    >
                      <td>{{ index + 1 }}</td>
                      <td>
                        <img
                          :src="
                            staff.user.avatar
                              ? staff.user.avatar
                              : 'https://png.pngtree.com/png-clipart/20190904/original/pngtree-hand-drawn-flat-wind-user-avatar-icon-png-image_4492039.jpg'
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
  },
  data() {
    return {
      modalCreate: false,
      modalDetail: false,
      modalUpdate: false,
      total: 20,
      moreSize: 10,
      loadMore: false,
      info: null,
      newStaff: {
        user_id: 0,
        position_id: 3,
        department_id: this.$route.params.id,
      },
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
  },
  created() {
    this.$store.dispatch("getListStaffDepartment", {
      id: this.$route.params.id,
      upload: true,
    });
  },
  methods: {
    getManager(arrayStaff, position) {
      var arr = arrayStaff.filter((x) => x.position_id == position).shift();
      return arr ? arr.user.name : "Chưa cập nhật";
    },
    load() {
      this.$store.dispatch("getListStaffDepartment", {
        id: this.$route.params.id,
        upload: true,
      });
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
.table tr {
  cursor: pointer;
}
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
</style>

<template lang="">
  <Loading />
  <div class="main-panel">
    <UpdateInfomationModal
      v-if="modalUpdate"
      :info="info"
      @close-modal="toggleModalUpdate()"
    />

    <CreateTaskModal v-if="modalCreateTask" 
          :userProps = "lUser"
          @close-modal="toggleModalCreate()"
          @update="viewDetail"/>


    <div class="content-wrapper">
      <div class="page-header">
        <h3 class="page-title">Quản lý thông tin cá nhân</h3>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item active">Quản lí</li>
            <li class="breadcrumb-item active" aria-current="page">
              <router-link :to="{ name: 'staffs' }">Nhân viên</router-link>
            </li>
            <li class="breadcrumb-item active">Thông tin nhân viên</li>
          </ol>
        </nav>
      </div>
      <div class="row">
        <div class="col-lg-12 grid-margin stretch-card">
          <div class="card" v-if="info">
            <div class="card-body">
              <div class="avatar-header">
                <div class="avatar">
                  <div class="avatar-img">
                    <img
                      :src="
                        info.avatar
                          ? info.avatar
                          : 'https://bloganh.net/wp-content/uploads/2021/03/chup-anh-dep-anh-sang-min.jpg'
                      "
                      alt=""
                    />
                    <i class="mdi mdi-grease-pencil ic-avatar"></i>
                  </div>

                  <div class="avatar-name">
                    <p class="name">{{ info.name }}</p>
                    <p>
                      <span>UUID: </span><span>{{ info.employee_code }}</span>
                    </p>
                    <p
                      v-if="
                        info.staff_of_department &&
                        info.staff_of_department.departments
                      "
                    >
                      {{ info.staff_of_department.departments.name }} -
                      {{ info.staff_of_department.position.position }}
                    </p>
                    <p>
                      <span>Hiện tại: </span
                      ><span>{{
                        info.deleted == 0 ? "Đang hoạt động" : "Đã nghỉ"
                      }}</span>
                    </p>
                  </div>
                </div>
                <div class="action">
                  <button
                    id="btnGroupDrop1"
                    type="button"
                    class="btn btn-sm btn-outline-info dropdown-toggle"
                    data-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Hành động
                  </button>
                  <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                    <a
                      class="dropdown-item"
                      href="#"
                      @click="toggleModalUpdate()"
                      >Cập nhật thông tin</a
                    >
                    <a
                      class="dropdown-item"
                      href="#"
                      @click="toggleModalCreate()"
                      >Giao việc</a
                    >
                    <a
                      class="dropdown-item"
                      @click="toggleModalSendMail()"
                      href="#"
                      >Đổi mật khẩu</a
                    >
                    <a class="dropdown-item" href="#">Xóa</a>
                  </div>
                </div>
              </div>
              <div class="general-information">
                <p class="title">Thông tin chung</p>
                <div class="info">
                  <div class="row">
                    <div class="col-md-6">
                      <div class="info-row">
                        <label class="col-sm-3 col-form-label">Họ tên</label>
                        <div class="col-sm-9">
                          <p class="">{{ info.name }}</p>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="info-row">
                        <label class="col-sm-3 col-form-label"
                          >Điện thoại</label
                        >
                        <div class="col-sm-9">
                          <p class="">
                            {{ info.phone ? info.phone : "(Đang cập nhật)" }}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="info-row">
                        <label class="col-sm-3 col-form-label">Nơi sinh</label>
                        <div class="col-sm-9">
                          <p class="">
                            {{
                              info.home_town ? info.home_town : "Đang cập nhật"
                            }}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="info-row">
                        <label class="col-sm-3 col-form-label">Email</label>
                        <div class="col-sm-9">
                          <p class="">{{ info.email }}</p>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="info-row">
                        <label class="col-sm-3 col-form-label">Địa chỉ</label>
                        <div class="col-sm-9">
                          <p class="">
                            {{ info.address ? info.address : "Đang cập nhật" }}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="info-row">
                        <label class="col-sm-3 col-form-label">Giới tính</label>
                        <div class="col-sm-9">
                          <p class="">
                            {{ info.gender ? info.gender : "(Đang cập nhật)" }}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="info-row">
                        <label class="col-sm-3 col-form-label">Dân tộc</label>
                        <div class="col-sm-9">
                          <p class="">
                            {{ info.ethnic ? info.ethnic : "(Đang cập nhật)" }}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="info-row">
                        <label class="col-sm-3 col-form-label">Ngày sinh</label>
                        <div class="col-sm-9">
                          <p class="">{{ dateTime(info.date_of_birth) }}</p>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="info-row">
                        <label class="col-sm-3 col-form-label">Tôn giáo</label>
                        <div class="col-sm-9">
                          <p class="">{{ dateTime(info.date_of_birth) }}</p>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="info-row">
                        <label class="col-sm-3 col-form-label">Số CMTND</label>
                        <div class="col-sm-9">
                          <p class="">
                            {{ info.cmnd ? info.cmnd : "(Đang cập nhật)" }}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="info-row">
                        <label class="col-sm-3 col-form-label">Quốc tịch</label>
                        <div class="col-sm-9">
                          <p class="">{{ dateTime(info.date_of_birth) }}</p>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="info-row">
                        <label class="col-sm-3 col-form-label">Nới cấp</label>
                        <div class="col-sm-9">
                          <p class="">
                            {{ info.address ? info.address : "(Đang cập nhật)" }}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="info-row">
                        <label class="col-sm-3 col-form-label">Chữ kí</label>
                        <div class="col-sm-9" v-html="info.note"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="general-information">
                <p class="title">Học vấn</p>
                <div class="info">
                  <div class="row">
                    <div class="col-md-12">
                      <div class="info-row">
                        <label class="col-sm-3 col-form-label">Trường: </label>
                        <div class="col-sm-9">
                          <p class="">Trường đại học Thủ đô Hà Nội</p>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="info-row">
                        <label class="col-sm-3 col-form-label"
                          >Trình độ:
                        </label>
                        <div class="col-sm-9">
                          <p class="">Đại học</p>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="info-row">
                        <label class="col-sm-3 col-form-label">Khoa:</label>
                        <div class="col-sm-9">
                          <p class="">Tự nhiên và công nghệ</p>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="info-row">
                        <label class="col-sm-3 col-form-label"
                          >Chuyên ngành:</label
                        >
                        <div class="col-sm-9">
                          <p class="">Công nghệ thông tin</p>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="info-row">
                        <label class="col-sm-3 col-form-label"
                          >Năm tốt nghiệp</label
                        >
                        <div class="col-sm-9">
                          <p class="">2022</p>
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
</template>
<script>
import Loading from "../../components/Loading.vue";
import CreateTaskModal from "../../components/CreateTaskModal.vue";
import moment from "moment/min/moment-with-locales";
moment.locale("vi");

import UpdateInfomationModal from "../../components/UpdateInfomationModal.vue";
export default {
  components: {
    Loading,
    UpdateInfomationModal,
    CreateTaskModal,
  },
  data() {
    return {
      modalUpdate: false,
      modalCreateTask: false,
      lUser:[],
    };
  },
  computed: {
    info() {
      return this.$store.state.staff;
    },
  },
  watch:{
    info(){
      if(this.info){
        this.info.department = this.info.staff_of_department.departments.name ?? 'Chưa cập nhật';
        this.lUser.push(this.info);
      }
      console.log(this.lUser);
    }
  },
  created() {
    this.$store.dispatch("getStaffInfo", {
      id: this.$route.params.id,
      upload: true,
    });
  },
  methods: {
    toggleModalUpdate() {
      this.modalUpdate = !this.modalUpdate;
    },
    dateTime(value) {
      return value
        ? moment(value).utc().format("DD/MM/YYYY")
        : "Đang cập nhật!";
    },
    toggleUpdate(id) {
      this.$router.push({ name: "staff-update", params: { id: id } });
    },
    toggleModalCreate() {
      this.modalCreateTask = !this.modalCreateTask;
    },
    viewDetail(id){
      this.$router.push({
        name: 'tasks',
        params:{
          id: id,
        }
      })
    }
  },
};
</script>
<style scoped>
.avatar-header {
  display: flex;
  width: 80%;
  margin: 0 auto;
  flex-wrap: wrap;
  justify-content: space-between;
}
.avatar {
  display: flex;
  flex-wrap: wrap;
  margin: 1rem;
  align-items: center;
}
.avatar-name {
  font-size: 1.1rem;
}
.avatar-name .name {
  font-weight: 600;
  font-size: 1.875rem;
  margin-bottom: 0.5rem;
}
.avatar img {
  width: 10rem;
  height: 10rem;
  margin: 0 1rem;
  border-radius: 50%;
  margin: 0.5rem 1rem;
}
.avatar img:hover {
  opacity: 0.99;
  cursor: pointer;
}
.avatar img:hover + .mdi-grease-pencil {
  display: block;
}
.avatar img:active {
  transform: scale(0.98);
}
.avatar-img {
  position: relative;
}
.ic-avatar {
  font-size: 1.2rem;
  background-color: rgb(240, 235, 235);
  padding: 0.3rem 0.45rem;
  border-radius: 50%;
  position: absolute;
  bottom: 1rem;
  left: 72%;
  display: none;
}
.general-information {
  margin: 1rem;
}
.general-information .title {
  font-weight: 400;
  font-size: 1.2rem;
  padding: 1rem 2rem 0.2rem 2rem;
  border-bottom: 1px solid rgb(0, 0, 0);
  margin-bottom: 0.5rem;
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
</style>

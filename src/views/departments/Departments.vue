<template>
  <div class="main-panel">
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
                      <label class="col-sm-3 col-form-label"
                        >Mã phòng ban</label
                      >
                      <div class="col-sm-9">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Nhập mã phòng ban"
                          v-model="department.code_department"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label"
                        >Tên phòng ban</label
                      >
                      <div class="col-sm-9">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Nhập tên phòng ban"
                          v-model="department.name"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label"
                        >Điện thoại liên hệ</label
                      >
                      <div class="col-sm-9">
                        <input
                          type="email"
                          class="form-control"
                          placeholder="Nhập số điện thoại liên hệ"
                          v-model="department.phone"
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
          Đóng
        </button>
      </template>
    </base-modal>

    <div class="content-wrapper">
      <div class="page-header">
        <h3 class="page-title">Phòng ban</h3>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item active">Quản lí</li>
            <li class="breadcrumb-item active" aria-current="page">
              Phòng ban
            </li>
          </ol>
        </nav>
      </div>
      <div class="row">
        <div class="col-12 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title">Danh sách phòng ban</h4>
              <div class="btn-add">
                <button
                  type="button"
                  @click="toggleModalCreate()"
                  class="btn btn-sm btn-gradient-info btn-icon-text"
                >
                  <i class="mdi mdi-plus-circle btn-icon-prepend"></i> Thêm mới
                  phòng ban
                </button>
              </div>
              <div class="departments">
                <div class="department" v-for="(department, i) in departments" :key="i" @click="toggleDetail(department.id)">
                  <div class="title">
                    <h4 class="name">{{ department.name }}</h4>
                    <div class="detail">
                      <p>
                        <span>Trưởng phòng: </span
                        ><span>{{
                          getManager(department.staff_of_department, 1)
                        }}</span>
                      </p>
                      <span>Phó phòng: </span
                      ><span>{{
                        getManager(department.staff_of_department, 2)
                      }}</span>
                    </div>
                  </div>

                  <p class="view-detail">
                    {{ department.staff_of_department.length }} nhân viên
                    <i class="mdi mdi-chevron-double-right"></i>
                  </p>
                </div>
              </div>
              <div class="row mt-3"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BaseModal from "../../components/Modal.vue";
import * as url from '../../config';
import axios from 'redaxios';

export default {
  components: {
    BaseModal,
  },
  data() {
    return {
      modalCreate: false,
      department: {
        name: "",
        code_department: "",
        phone: "",
      },
    };
  },
  computed: {
    departments() {
      return this.$store.state.departments;
    },
  },
  created() {
    this.$store.dispatch("getListDepartment");
  },
  methods: {
    getManager(arrayStaff, position) {
      var arr = arrayStaff.filter((x) => x.position_id == position).shift();
      return arr ? arr.user.name : "Chưa cập nhật";
    },
    toggleModalCreate() {
      this.modalCreate = !this.modalCreate;
    },
    toggleDetail(id){
      this.$router.push({name: 'department-detail', params:{ id: id}});
    },
    async create() {
      console.log(this.department);
      await axios({
        method: "POST",
        url: url.departments.CREATE,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          Accept: "application/json",
        },
        data: this.department,
      })
        .then((res) => {
          console.log(res.data);
          this.toggleModalCreate();
          cuteToast({
            type: "success",
            message: res.data.message,
            timer: 5000,
          });
          this.$store.dispatch("getListDepartment");
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
</style>

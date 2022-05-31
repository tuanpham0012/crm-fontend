<template>
<div>
  <base-modal
        title="Tạo mới dự án"
        :size="false"
        @closeModal="toggleCloseModal()"
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
                          >Tên dự án</label
                        >
                        <div class="col-sm-10">
                          <input
                            type="text"
                            class="form-control"
                            v-model="project.name"
                            placeholder="Tên dự án"
                            ref="taskName"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="form-group row">
                        <label class="col-sm-2 col-form-label"
                          >Thời gian</label
                        >
                        <div class="col-sm-5">
                          <input
                            type="date"
                            class="form-control"
                            v-model="project.start_at"
                          />
                        </div>
                        <div class="col-sm-5">
                          <input
                            type="date"
                            class="form-control"
                            v-model="project.end_at"
                          />
                        </div>
                      </div>
                    </div>
                    
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label"
                          >Nội dung</label
                        >
                        <div class="col-sm-12 editor">
                          <QuillEditor
                            toolbar="essential"
                            theme="snow"
                            v-model:content="project.content"
                            contentType="html"
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
                    <div class="col-md-12 add-user" v-if="users && users.length > 0">
                      <div class="form-group row">
                        <div class="row-info" style="align-items: baseline">
                          <ul class="row-content">
                            <li v-for="(user, index) in users" :key="index">
                              <div class="user-info">
                                <img :src="avatar_link(user.avatar) || 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'" />
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
            @click="toggleCreate()"
          >
            Tạo dự án
          </button>
          <button
            type="button"
            class="btn btn-sm btn-secondary"
            @click="toggleCloseModal()"
          >
            Đóng
          </button>
        </template>
      </base-modal>
</div>
</template>
<script>
import BaseModal from './Modal.vue';
import axios from "redaxios";
import * as url from "../config";
import moment from "moment/min/moment-with-locales";
moment.locale("vi");
export default {
  components:{
    BaseModal,
  },
  props:{
    userProps:{
      type: Array,
      default:function(){
        return null;
      },
    },
  },
  data() {
    return {
      staff_id: -1,
      project: {
        name: '',
        end_at: moment().format("YYYY-MM-DD"),
        content: '',
        start_at: moment().format("YYYY-MM-DD"),
        task_status_id: 1,
        type_of_task_id: -1,
      },
      users: [],
    }
  },
  computed:{
    staffs() {
      return this.$store.state.baseData ? this.$store.state.baseData.staff : null;
    },
  },
  created(){
  },
  methods:{
     resetValue() {
      this.users = [];
      
    },
    avatar_link(value){
      if(value){
        return url.server_url + value;
      }else{
        return null;
      }
    },
    toggleCloseModal(){
      this.$emit('close-modal');
    },
    dateTime(value) {
      return moment(value).utc().format("HH:mm:ss DD-MM-YYYY");
    },
    formatDate(value) {
      return moment(value).format("llll");
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
    async toggleCreate() {
      if(this.project.name == null || this.project.name == "") {
        cuteToast({
          type: "error",
          message: "Không để trống tên dự án!",
          timer: "3000",
        });
        this.$refs.taskName.focus();
        return;
      }
      if (moment(this.project.start_at).valueOf() > moment(this.project.end_at).valueOf()) {
        cuteToast({
          type: "error",
          message: "Ngày bắt đầu không thể lớn hơn kết thúc!",
          timer: "3000",
        });
        return;
      }
      await axios({
        url: url.projects.CREATE,
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          Accept: "application/json",
        },
        data: {
          project: this.project,
          users: this.users,
        },
      })
        .then((res) => {
          console.log(res.data);
          cuteToast({
          type: "success",
          message: res.data.message,
          timer: "5000",
        });
          this.$emit('open-project', res.data.project.id);
          this.$emit('update');
          this.toggleCloseModal();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    toggleRemoveUser(index) {
      this.users.splice(index, 1);
    },
    
  }
  
}
</script>
<style scoped>
.row{
  padding: 0.5rem;
}
.card .card-body {
  padding: 0.5rem;
  border-radius: 5px;
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
.add-user {
  background-color: #ffffff;
  max-width:95%;
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
.editor {
  background-color: #ffffff;
  padding-top: 1rem;
  padding-bottom: 4rem;
}
.form-btn {
  display: flex;
  align-items: center;
}
</style>
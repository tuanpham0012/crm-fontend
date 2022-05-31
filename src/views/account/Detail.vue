<template lang="">
  <Loading />
  <div class="main-panel">

    <UpdateInfomationModal
      v-if="modalUpdate"
      :info="info"
      @close-modal="toggleModalUpdate()"
    />
    <ChangePasswordModal
      v-if="modalChangePass"
      :email="info.email"
      @sign-out="signOut"
      @close-modal="toggleModalChangePass()"
    />
    <div class="content-wrapper">
      <div class="page-header">
        <h3 class="page-title">Quản lý thông tin cá nhân</h3>
        <nav aria-label="breadcrumb">
          <div></div>
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
                      :src="avatar_link(info.avatar) || 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'"
                      alt="" />
                  </div>
                  
                  <div class="avatar-name">
                    <h3>{{ info.name}}</h3>
                    <p><span>UUID: </span><span>{{ info.employee_code}}</span></p>
                    <p>{{ info.role.role}}</p>
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
                    class="btn-more"
                    data-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i class="mdi mdi-dots-horizontal"></i>
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
                      @click="toggleModalChangePass()"
                      href="#"
                      >Đổi mật khẩu</a
                    >
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
import Loading from '../../components/Loading.vue';
import BaseModal from '../../components/Modal.vue';
import UpdateInfomationModal from "../../components/UpdateInfomationModal.vue";
import ChangePasswordModal from "../../components/ChangePasswordModal.vue";

import moment from "moment/min/moment-with-locales";
moment.locale("vi");
import * as url from "../../config";

export default {
  components:{
    Loading,
    BaseModal,
    UpdateInfomationModal,
    ChangePasswordModal,
  },
  data() {
    return {
      showModal: false,
      modalChangePass: false,
      modalUpdate: false,
      preAvatar: '',
    }
  },
  computed:{
    info(){
      return this.$store.state.userInfo;
    }
  },
  methods: {
    toggleModalUpdate() {
      if(localStorage.getItem('token')) this.$store.dispatch('getInfo', { token: localStorage.getItem('token') });
      this.modalUpdate = !this.modalUpdate;
    },
    toggleModalChangePass() {
      this.modalChangePass = !this.modalChangePass;
    },
    signOut() {
			localStorage.removeItem("token");
			this.$router.push({ name: "login" });
		},
    dateTime(value) {
      return value ? moment(value).utc().format("DD/MM/YYYY") : 'Đang cập nhật!';
    },
    avatar_link(value){
      if(value){
        return url.server_url + value;
      }else{
        return null;
      }
      
    },
    uploadImage(e){
                const image = e.target.files[0];
                const reader = new FileReader();
                reader.readAsDataURL(image);
                reader.onload = e =>{
                    this.preAvatar = e.target.result;
                };
            },
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
.avatar img {
  width: 9rem;
  height: 9rem;
  margin: 0 1rem;
  border-radius: 50%;
  margin: 0.5rem 1rem;
}
.avatar img:hover{
  opacity: 0.875;
  cursor: pointer;;
}
/* .avatar img:hover + .mdi-grease-pencil{
  display: block;
} */
.avatar img:active{
  transform: scale(0.98);
}
.avatar-img{
  position: relative;
}
.ic-avatar{
  font-size: 1rem;
  background-color: #dce6f8f1;;
  padding: 0.15rem 0.3rem;
  border-radius: 50%;
  position: absolute;
  bottom: 1rem;
  left:70%;

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
.general-information .info{
  padding: 0.5rem 1rem;
}
.info-row{
  display: flex;
  align-items: center;
}
.info-row label{
  font-weight: 600;
}
</style>

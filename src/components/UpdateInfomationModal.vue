<template>
  <base-modal
    title="Cập nhật thông tin"
    :size="true"
    @closeModal="toggleModalUpdate()"
  >
    <template v-slot:body>
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-lg-12 grid-margin stretch-card">
                <div class="card" v-if="info">
                  <div class="card-body">
                    <div class="avatar-header">
                <div class="avatar">
                  <div class="avatar-img">
                    <form id="formUpdateAvatar">
                      <label for="up-avatar">
                        <img
                        :src="preAvatar || avatar_link(info.avatar) || 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'"
                        alt=""
                        />
                        <i class="mdi mdi-image-filter-center-focus-weak ic-avatar"></i>
                        <input type="file" accept="image/jpeg" hidden name="avatar" id="up-avatar" @change="uploadImage"/>
                      </label>
                    </form>
                  </div>

                  <div class="avatar-name">
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
              </div>
                    <div class="general-information">
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group row">
                            <label class="col-sm-12 col-form-label"
                              >Mã nhân viên</label
                            >
                            <div class="col-sm-12">
                              <input
                                type="text"
                                disabled
                                class="form-control"
                                v-model="info.employee_code"
                              />
                            </div>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group row">
                            <label class="col-sm-12 col-form-label"
                              >Số điện thoại</label
                            >
                            <div class="col-sm-12">
                              <input
                                type="text"
                                class="form-control"
                                v-model="info.phone"
                              />
                            </div>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group row">
                            <label class="col-sm-12 col-form-label"
                              >Tên nhân viên</label
                            >
                            <div class="col-sm-12">
                              <input
                                type="text"
                                class="form-control"
                                v-model="info.name"
                              />
                            </div>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group row">
                            <label class="col-sm-12 col-form-label"
                              >Địa chỉ</label
                            >
                            <div class="col-sm-12">
                              <input
                                type="text"
                                class="form-control"
                                v-model="info.address"
                              />
                            </div>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group row">
                            <label class="col-sm-12 col-form-label"
                              >Email</label
                            >
                            <div class="col-sm-12">
                              <input
                                type="text"
                                class="form-control"
                                v-model="info.email"
                              />
                            </div>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group row">
                            <label class="col-sm-12 col-form-label"
                              >Quê quán</label
                            >
                            <div class="col-sm-12">
                              <input
                                type="text"
                                class="form-control"
                                v-model="info.home_town"
                              />
                            </div>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group row">
                            <label class="col-sm-12 col-form-label"
                              >Ngày sinh</label
                            >
                            <div class="col-sm-12">
                              <input
                                type="date"
                                class="form-control"
                                v-model="info.date_of_birth"
                              />
                            </div>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group row">
                            <label class="col-sm-12 col-form-label"
                              >Giới tính</label
                            >
                            <div class="col-sm-12">
                              <select class="form-control" v-model="info.gender">
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group row">
                            <label class="col-sm-12 col-form-label"
                              >Dân tộc</label
                            >
                            <div class="col-sm-12">
                              <input
                                type="text"
                                class="form-control"
                                v-model="info.ethnic"
                              />
                            </div>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group row">
                            <label class="col-sm-12 col-form-label"
                              >Số CMTDN</label
                            >
                            <div class="col-sm-12">
                              <input
                                type="text"
                                class="form-control"
                                v-model="info.cmnd"
                              />
                            </div>
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group row">
                            <label class="col-sm-12 col-form-label"
                              >Ghi chú</label
                            >
                            <div class="col-sm-12" style="min-height:15rem;padding-bottom:2rem;">
                              <QuillEditor
                                toolbar="essential"
                                theme="snow"
                                v-model:content="info.note"
                                contentType="html"
                              />
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
    <template v-slot:footer>
      <button
        type="button"
        v-if="!sending"
        class="btn btn-sm btn-gradient-info"
        @click="Update(info.id)"
      >
        Cập nhật
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
        Đang cập nhật...
      </button>
      <button
        type="button"
        class="btn btn-sm btn-gradient-secondary"
        @click="toggleModalUpdate()"
        :disabled="sending"
      >
        Đóng
      </button>
    </template>
  </base-modal>
</template>
<script>
import axios from "redaxios";
import * as url from "../config";
import BaseModal from "./Modal.vue";
import moment from "moment/min/moment-with-locales";
moment.locale("vi");

export default {
  components: {
    BaseModal,
  },
  props: {
    info: {
      type: Object,
      default: function () {
        return null;
      },
    },
  },
  data() {
    return {
      sending: false,
      preAvatar: null,
    };
  },
  created() {

  },
  methods: {
    toggleModalUpdate() {
      this.$store.dispatch("getStaffInfo", {
        id: this.info.id,
        upload: false,
      });
      this.$emit("close-modal");
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
    async Update(id) {
      this.sending = true;
      var formUpdateAvatar = document.getElementById('formUpdateAvatar'); //$('#formUpdateAvatar')
      const formData = new FormData(formUpdateAvatar);
      console.log(formData);
      await axios({
        method: "PATCH",
        url: url.staff.UPDATE + id,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          Accept: "application/json",
        },
        data: this.info,
      })
        .then((res) => {
          console.log(res.data);
          this.sending = false;
          cuteToast({
            type: "success",
            message: res.data.message,
            timer: 5000,
          });
          this.$emit('close-modal');
          this.$store.dispatch("getStaffInfo",{id: this.$route.params.id, upload: false});
        })
        .catch((err) => {
          console.log(err);
          this.sending = false;
        });
      if(this.preAvatar){
        
        await axios({
          method: "POST",
          url: url.staff.UPDATE_AVATAR + id,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            Accept: "application/json",
          },
          data: formData,
        })
          .then((res) => {
            console.log(res.data);
            this.$store.dispatch("getStaffInfo",{id: this.$route.params.id, upload: false});
          })
          .catch((err) => {
            console.log(err);
          });
      }
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
</style>

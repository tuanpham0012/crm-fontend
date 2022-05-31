<template>
<div>
  <base-modal
        title="Đổi mật khẩu"
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
                      <div class="form-group row" v-if="!role">
                        <label class="col-sm-4 col-form-label"
                          >Mật khẩu cũ</label
                        >
                        <div class="col-sm-6">
                          <input
                            type="password"
                            class="form-control"
                            v-model="info.password"
                            placeholder="Mật khẩu cũ"
                            ref="old"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="form-group row">
                        <label class="col-sm-4 col-form-label"
                          >Mật khẩu mới</label
                        >
                        <div class="col-sm-6">
                          <input
                            type="password"
                            class="form-control"
                            v-model="info.newPassword"
                            placeholder="Mật khẩu mới"
                            ref="new"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="form-group row">
                        <label class="col-sm-4 col-form-label"
                          >Xác nhận mật khẩu</label
                        >
                        <div class="col-sm-6">
                          <input
                            type="password"
                            class="form-control"
                            v-model="info.passwordConfirm"
                            placeholder="Xác nhận mật khẩu"
                            ref="confirm"
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
          <button
            type="button"
            class="btn btn-sm btn-info"
            @click="toggleChangePassword()"
          >
            Xác nhận
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
    email:{
      type: String,
    },
    role:{
      type: Boolean,
      default: function(){
        return null;
      }
    }
  },
  data() {
    return {
      info: {
        email: this.email,
        password: '',
        newPassword: '',
        passwordConfirm: '',
        role: this.role,
      },
    }
  },
  methods:{
    toggleCloseModal(){
      this.$emit('close-modal');
    },
    async toggleChangePassword() {
      await axios({
        url: url.user.CHANGE_PASSWORD,
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          Accept: "application/json",
        },
        data: this.info,
      })
        .then((res) => {
          console.log(res.data);
          cuteToast({
            type: "success",
            message: res.data.message,
            timer: "5000",
          });
          this.$emit('sign-out');
        })
        .catch((err) => {
          console.log(err);
          cuteToast({
            type: "error",
            message: err.data.message,
            timer: "5000",
          });
        });
    },
  }
  
}
</script>
<style scoped>
.editor {
  background-color: #ffffff;
  padding-top: 1rem;
  padding-bottom: 4rem;
}
</style>
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
    };
  },
  methods: {
    toggleModalUpdate() {
      this.$emit("close-modal");
    },
    async Update(id) {
      this.sending = true;
      console.log(this.info);
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
          console.log(res);
          this.sending = false;
          cuteToast({
            type: "success",
            message: res.data.message,
            timer: 5000,
          });
          this.$emit('close-modal');
          this.$store.dispatch("getStaffInfo",{id: this.$route.params.id, upload: true});
        })
        .catch((err) => {
          console.log(err);
          this.sending = false;
        });
    },
  },
};
</script>
<style scoped></style>

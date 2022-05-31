<template lang="">
  <base-modal
    title="Thông tin nhân viên"
    :size="true"
    @closeModal="toggleCloseModal()"
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
                          <img
                            :src="
                              avatar_link(info.user.avatar) || 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'
                            "
                            alt=""
                          />
                        </div>
                        <div class="avatar-name">
                          <p class="name">{{ info.user.name }}</p>
                          <p>
                            <span>UUID: </span
                            ><span>{{ info.user.employee_code }}</span>
                          </p>
                          <p>
                            <span>Hiện tại: </span
                            ><span>{{
                              !info.deleted ? "Đang hoạt động" : "Đã nghỉ"
                            }}</span>
                          </p>
                          <div class="select-position">
                            <div class="col-md-12">
                              <div class="form-group row">
                                <label class="col-sm-4 col-form-label"
                                  >Chức vụ</label
                                >
                                <div class="col-sm-8">
                                  <select
                                    class="form-control"
                                    v-model="info.position_id"
                                    @change="UpdatePosition(info.id)"
                                  >
                                    <option value="1">Trưởng phòng</option>
                                    <option value="2">Phó phòng</option>
                                    <option value="3">Nhân viên</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="general-information">
                      <p class="title">Thông tin chung</p>
                      <div class="info">
                        <div class="row">
                          <div class="col-md-6">
                            <div class="info-row">
                              <label class="col-sm-4 col-form-label"
                                >Họ tên</label
                              >
                              <div class="col-sm-9">
                                <p class="">{{ info.user.name }}</p>
                              </div>
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="info-row">
                              <label class="col-sm-4 col-form-label"
                                >Nơi sinh</label
                              >
                              <div class="col-sm-9">
                                <p class="">
                                  {{
                                    info.user.home_town
                                      ? info.user.home_town
                                      : "Đang cập nhật"
                                  }}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="info-row">
                              <label class="col-sm-4 col-form-label"
                                >Điện thoại</label
                              >
                              <div class="col-sm-9">
                                <p class="">
                                  {{
                                    info.user.phone
                                      ? info.user.phone
                                      : "(Đang cập nhật)"
                                  }}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="info-row">
                              <label class="col-sm-4 col-form-label"
                                >Email</label
                              >
                              <div class="col-sm-9">
                                <p class="">{{ info.user.email }}</p>
                              </div>
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="info-row">
                              <label class="col-sm-4 col-form-label"
                                >Địa chỉ</label
                              >
                              <div class="col-sm-9">
                                <p class="">
                                  {{
                                    info.user.address
                                      ? info.user.address
                                      : "Đang cập nhật"
                                  }}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="info-row">
                              <label class="col-sm-4 col-form-label"
                                >Giới tính</label
                              >
                              <div class="col-sm-9">
                                <p class="">
                                  {{
                                    info.user.gender
                                      ? info.user.gender
                                      : "(Đang cập nhật)"
                                  }}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="info-row">
                              <label class="col-sm-4 col-form-label"
                                >Dân tộc</label
                              >
                              <div class="col-sm-9">
                                <p class="">
                                  {{
                                    info.user.ethnic
                                      ? info.user.ethnic
                                      : "(Đang cập nhật)"
                                  }}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="info-row">
                              <label class="col-sm-4 col-form-label"
                                >Ngày sinh</label
                              >
                              <div class="col-sm-9">
                                <p class="">
                                  {{ dateTime(info.user.date_of_birth) }}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="info-row">
                              <label class="col-sm-4 col-form-label"
                                >Tôn giáo</label
                              >
                              <div class="col-sm-9">
                                <p class="">Không</p>
                              </div>
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="info-row">
                              <label class="col-sm-4 col-form-label"
                                >Số CMTND</label
                              >
                              <div class="col-sm-9">
                                <p class="">
                                  {{
                                    info.user.cmnd
                                      ? info.user.cmnd
                                      : "(Đang cập nhật)"
                                  }}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="info-row">
                              <label class="col-sm-4 col-form-label"
                                >Quốc tịch</label
                              >
                              <div class="col-sm-9">
                                <p class="">
                                  {{ dateTime(info.user.date_of_birth) }}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="info-row">
                              <label class="col-sm-4 col-form-label"
                                >Nới cấp</label
                              >
                              <div class="col-sm-9">
                                <p class="">
                                  {{
                                    info.user.cmnd
                                      ? info.user.cmnd
                                      : "(Đang cập nhật)"
                                  }}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div class="col-md-12">
                            <div class="info-row">
                              <label class="col-sm-4 col-form-label"
                                >Chữ kí</label
                              >
                              <div
                                class="col-sm-9"
                                v-html="info.user.note"
                              ></div>
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
                              <label class="col-sm-3 col-form-label"
                                >Trường:
                              </label>
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
                              <label class="col-sm-3 col-form-label"
                                >Khoa:</label
                              >
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
      </div>
    </template>
    <template v-slot:footer>
      <button
        type="button"
        class="btn btn-sm btn-gradient-danger"
        @click="Remove(info.id)"
      >
        Xóa
      </button>
      <button
        type="button"
        class="btn btn-sm btn-gradient-secondary"
        @click="toggleCloseModal()"
      >
        Đóng
      </button>
    </template>
  </base-modal>
</template>
<script>
import BaseModal from "./Modal.vue";
import Loading from "./Loading.vue";
import * as url from "../config";
import axios from "redaxios";
import moment from "moment/min/moment-with-locales";
moment.locale("vi");

export default {
  components: {
    BaseModal,
    Loading,
  },
  props: {
    info: {
      type: Object,
      default: function () {
        return null;
      },
    },
  },
  methods: {
    dateTime(value) {
      return value
        ? moment(value).utc().format("DD/MM/YYYY")
        : "Đang cập nhật!";
    },
    toggleCloseModal() {
      this.$emit("close-modal");
    },
    avatar_link(value){
      if(value){
        return url.server_url + value;
      }else{
        return null;
      }
    },
    async UpdatePosition(id) {
      await axios({
        method: "POST",
        url: url.departments.UPDATE_POSITION + id,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          Accept: "application/json",
        },
        data: {
          position_id: this.info.position_id,
        },
      })
        .then((res) => {
          this.$emit("update");
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    Remove(id) {
      cuteAlert({
        type: "question",
        title: "Xoá nhân viên",
        message: "Bạn có chắc muốn xóa nhân viên ra khỏi phòng ban?",
        confirmText: "Xác nhận",
        cancelText: "Hủy",
      }).then((e) => {
        if (e) {
          axios({
            method: "POST",
            url: url.departments.REMOVE + id,
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
              Accept: "application/json",
            },
          })
            .then((res) => {
              this.$emit("update");
              this.toggleCloseModal();
              cuteToast({
                type: "success",
                message: res.data.message,
                timer: 5000,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
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
.avatar img:active {
  transform: scale(0.98);
}
.avatar-img {
  position: relative;
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
.select-position {
  margin: 1rem 0;
  width: 20rem;
}
</style>

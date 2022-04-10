<template lang="">
  <div class="main-panel">
    <base-modal v-if="showModal" title="Thêm mới khách hàng" @closeModal="toggleModal()">
            <template v-slot:body>
              <div class="col-12">
                <div class="card">
                  <div class="card-body">
                    <form class="form-sample">
                      <div class="row bd">
                        <div class="col-md-6">
                          <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Tên khách hàng</label>
                            <div class="col-sm-9">
                              <input type="text" class="form-control" v-model="info.name" />
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
              <button type="button" class="btn btn-secondary" @click="toggleModal()">Close</button>
              <button type="button" class="btn btn-primary" @click="create()">Xác nhận</button>
            </template>
    </base-modal>
    <div class="content-wrapper">
      <div class="page-header">
        <h3 class="page-title">Quản lý thông tin cá nhân</h3>
        <nav aria-label="breadcrumb">
          <div></div>
        </nav>
      </div>
      <div class="row">
        <div class="col-lg-12 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <div class="avatar-header">
                <div class="avatar">
                  <div class="avatar-img">
                    <img
                      src="https://bloganh.net/wp-content/uploads/2021/03/chup-anh-dep-anh-sang-min.jpg"
                      alt=""
                    />
                    <i class="mdi mdi-grease-pencil ic-avatar"></i>
                  </div>
                  
                  <div class="avatar-name">
                    <h3>{{ info.name}}</h3>
                    <p><span>UUID: </span><span>{{ info.employee_code}}</span></p>
                    <p>{{ info.role.role}}</p>
                    <p><span>Hiện tại: </span><span>{{ info.status}}</span></p>
                  </div>
                </div>
                <div class="action">
                  <button class="btn btn-sm btn-gradient-success" @click="toggleModal()">
                    Sửa thông tin
                  </button>
                </div>
              </div>
              <div class="general-information">
                <p class="title">Thông tin chung</p>
                <div class="info">
                  <div class="row">
                    <div class="col-md-6">
                      <div class="info-row">
                        <label class="col-sm-3 col-form-label"
                          >Họ tên</label
                        >
                        <div class="col-sm-9">
                          <p class="">{{ info.name}}</p>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="info-row">
                        <label class="col-sm-3 col-form-label"
                          >Nơi sinh</label
                        >
                        <div class="col-sm-9">
                          <p class="">{{ info.date_of_birth}}</p>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="info-row">
                        <label class="col-sm-3 col-form-label"
                          >Điện thoại</label
                        >
                        <div class="col-sm-9">
                          <p class="">{{ info.phone ? info.phone : '(Đang cập nhật)'}}</p>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="info-row">
                        <label class="col-sm-3 col-form-label"
                          >Ngày sinh</label
                        >
                        <div class="col-sm-9">
                          <p class="">{{ info.date_of_birth}}</p>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="info-row">
                        <label class="col-sm-3 col-form-label"
                          >Email</label
                        >
                        <div class="col-sm-9">
                          <p class="">{{ info.email}}</p>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="info-row">
                        <label class="col-sm-3 col-form-label"
                          >Địa chỉ</label
                        >
                        <div class="col-sm-9">
                          <p class="">{{ info.date_of_birth}}</p>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="info-row">
                        <label class="col-sm-3 col-form-label"
                          >Giới tính</label
                        >
                        <div class="col-sm-9">
                          <p class="">{{ info.gender ? info.gender : '(Đang cập nhật)'}}</p>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="info-row">
                        <label class="col-sm-3 col-form-label"
                          >Dân tộc</label
                        >
                        <div class="col-sm-9">
                          <p class="">{{ info.ethnic ? info.enthnic : '(Đang cập nhật)'}}</p>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="info-row">
                        <label class="col-sm-3 col-form-label"
                          >Ngày sinh</label
                        >
                        <div class="col-sm-9">
                          <p class="">{{ info.date_of_birth ? info.date_of_birth : '(Đang cập nhật)'}}</p>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="info-row">
                        <label class="col-sm-3 col-form-label"
                          >CMND/CCCD</label
                        >
                        <div class="col-sm-9">
                          <p class="">{{ info.cmnd ? info.cmnd : '(Đang cập nhật)'}}</p>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="info-row">
                        <label class="col-sm-3 col-form-label"
                          >Chữ kí</label
                        >
                        <div class="col-sm-9">
                          <p class="">{{ info.note ? info.note : '(Đang cập nhật)'}}</p>
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
import BaseModal from '../../components/Modal.vue';
export default {
  components:{
    BaseModal,
  },
  data() {
    return {
      showModal: false,
    }
  },
  computed:{
    info(){
      return this.$store.state.userInfo;
    }
  },
  methods: {
    toggleModal(){
      this.showModal = !this.showModal;
    }
  },
};
</script>
<style>
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
  opacity: 0.99;
  cursor: pointer;
}
.avatar img:hover + .mdi-grease-pencil{
  display: block;
}
.avatar img:active{
  transform: scale(0.98);
}
.avatar-img{
  position: relative;
}
.ic-avatar{
  font-size: 1.2rem;
  background-color: rgb(240, 235, 235);
  padding: 0.3rem 0.45rem;
  border-radius: 50%;
  position: absolute;
  bottom: 1rem;
  left:72%;
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

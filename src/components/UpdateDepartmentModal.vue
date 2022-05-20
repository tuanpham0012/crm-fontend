<template>
<div>
  <base-modal
        title="Chỉnh sửa dự án"
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
                        <label class="col-sm-3 col-form-label"
                          >Tên phòng ban</label
                        >
                        <div class="col-sm-9">
                          <input
                            type="text"
                            class="form-control"
                            v-model="department.name"
                            placeholder="Tên công việc"
                            ref="taskName"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label"
                          >Trưởng phòng</label
                        >
                        <div class="col-sm-9">
                          <select class="form-control" v-model="manager_id">
                          <option
                            v-for="(user, i) in staffs"
                            :value="user.user.id"
                          >
                            {{ user.user.name }} 
                          </option>
                        </select>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label"
                          >Phó phòng</label
                        >
                        <div class="col-sm-9">
                          <select class="form-control" v-model="deputy_id">
                            <option
                              v-for="(user, i) in staffs"
                              :value="user.user.id"
                            >
                              {{ user.user.name }} 
                            </option>
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
          <button
            type="button"
            class="btn btn-sm btn-info"
            @click="toggleUpdate()"
          >
            Cập nhật
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
export default {
  components:{
    BaseModal,
  },
  props:{
    departmentProps:{
      type: Object,
      default:function(){
        return null;
      },
    },
    
  },
  data() {
    return {
      department: null,
      manager_id: null,
      deputy_id: null,
    }
  },
  computed:{
    staffs() {
      return this.$store.state.staffDepartment
        ? this.$store.state.staffDepartment.staffs
        : null;
    },
  },
  created(){
    if(this.departmentProps){
      this.department = this.departmentProps;
      console.log(this.department);
      console.log(this.staffs);
    }
    if(this.staffs){
      this.manager_id = this.staffs.find(x => x.position_id == 1) ? this.staffs.find(x => x.position_id == 1).user_id : null;
      this.deputy_id = this.staffs.find(x => x.position_id == 2) ? this.staffs.find(x => x.position_id == 2).user_id : null;
    }
  },
  methods:{
    toggleCloseModal(){
      this.$emit('close-modal');
    },
    async toggleUpdate() {
      await axios({
        url: url.departments.UPDATE + this.department.id,
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          Accept: "application/json",
        },
        data: {
          department: this.department,
          manager_id: this.manager_id,
          deputy_id: this.deputy_id,
        },
      })
        .then((res) => {
          console.log(res.data);
          cuteToast({
            type: "success",
            message: res.data.message,
            timer: "5000",
          });
          this.$emit('update');
          this.toggleCloseModal();
        })
        .catch((err) => {
          console.log(err);
        });
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

.editor {
  background-color: #ffffff;
  padding-top: 1rem;
  padding-bottom: 4rem;
}

</style>
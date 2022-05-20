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
                          >Tên dự án</label
                        >
                        <div class="col-sm-9">
                          <input
                            type="text"
                            class="form-control"
                            v-model="project.name"
                            placeholder="Tên công việc"
                            ref="taskName"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label"
                          >Thời gian bắt đầu</label
                        >
                        <div class="col-sm-9">
                          <input
                            type="date"
                            class="form-control"
                            v-model="project.start_at"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label"
                          >Thời gian kết thúc</label
                        >
                        <div class="col-sm-9">
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
                          >Mô tả</label
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
import moment from "moment/min/moment-with-locales";
moment.locale("vi");
export default {
  components:{
    BaseModal,
  },
  props:{
    projectProps:{
      type: Object,
      default:function(){
        return null;
      },
    },
    
  },
  data() {
    return {
      project: null,
    }
  },
  created(){
    if(this.projectProps){
      this.project = this.projectProps;
    }
  },
  methods:{
     
    toggleCloseModal(){
      this.$emit('close-modal');
    },
    dateTime(value) {
      return moment(value).utc().format("HH:mm:ss DD-MM-YYYY");
    },
    formatDate(value) {
      return moment(value).format("llll");
    },
    
    async toggleUpdate() {
      if (this.project.name == null || this.project.name == "") {
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
        url: url.projects.UPDATE + this.project.id,
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          Accept: "application/json",
        },
        data: this.project,
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
<template>
  <base-modal
        title="Gửi email khách hàng"
        :size="false"
        @closeModal="toggleModalSendMail()"
      >
        <template v-slot:body>
          <div class="col-12">
            <div class="card">
              <div class="card-body">
                <div class="row">
                    <div class="col-md-12">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label">Tiêu đề</label>
                        <div class="col-sm-12">
                          <input
                            type="email"
                            class="form-control"
                            v-model="mail.title"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label"
                          >Nội dung</label
                        >
                        <div class="col-sm-12" style="min-height:15rem;padding-bottom:2rem;">
                          <QuillEditor
                            toolbar="essential"
                            theme="snow"
                            v-model:content="mail.content"
                            contentType="html"
                          />
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
          @click="sendMail()"
          >
            Gửi
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
            Đang gửi...
          </button>
          <button
            type="button"
            class="btn btn-sm btn-gradient-secondary"
            @click="toggleModalSendMail()"
          >
            Hủy
          </button>
        </template>
      </base-modal>
</template>
<script>

import axios from "redaxios";
import * as url from "../config";
import BaseModal from "./Modal.vue";

export default {
  components:{
    BaseModal,
  },
  props:{
    listCustomer:{
      type: Array,
      default:function(){
        return null;
      }
    }
  },
  data() {
    return {
      mail:{
        title: "",
        content: "",
      },
      sending: false,
    }
  },
  created() {
    console.log(this.listCustomer);
  },
  methods: {
    toggleModalSendMail(){
      this.$emit('close-modal');
    },
    async sendMail(){
      this.sending = true;
      console.log(this.mail);
      await axios({
        method: "POST",
        url: url.send_mail.SEND_MULTIPLE,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          Accept: "application/json",
        },
        data: {
          listCustomer: this.listCustomer,
          content: this.mail,
        },
      }).then((res) => {
          console.log(res);
          this.sending = false;
          cuteToast({
              type: "success",
              message: res.data.message,
              timer: 5000,
            });
          this.$emit('update');
        })
        .catch((err) => {
          console.log(err);
          cuteToast({
              type: "error",
              message: err.data.message,
              timer: 5000,
            });
          this.sending = false;
        });
    }
  },
}
</script>
<style scoped>
  
</style>
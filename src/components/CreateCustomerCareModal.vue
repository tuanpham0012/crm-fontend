<template>
  <div>
    <base-modal title="Tạo mới" :size="false" @closeModal="toggleCloseModal()">
      <template v-slot:body>
        <div class="col-12">
          <div class="card bg-gray">
            <div class="card-body">
              <form class="form-sample">
                <div class="row bd">
                  <div class="col-md-12">
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label">Khách hàng</label>
                      <div class="col-sm-6">
                        <input
                          type="text"
                          class="form-control"
                          v-model="customerProps.name"
                          placeholder="Tên công việc"
                          disabled
                        />
                      </div>
                    </div>
                  </div>

                  <div class="col-md-12">
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label">Trạng thái</label>
                      <div class="col-sm-6">
                        <select class="form-control" v-model="contact.status">
                          <option value="Chờ tiếp nhận">Chờ tiếp nhận</option>
                          <option value="Đang xử lý">Đang xử lý</option>
                          <option value="Đã giải quyết">Đã giải quyết</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label">Nội dung</label>
                      <div class="col-sm-12">
                        <QuillEditor
                          toolbar="essential"
                          theme="snow"
                          v-model:content="contact.content"
                          contentType="text"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <br />
                <br />
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label">Ghi chú</label>
                      <div class="col-sm-12">
                        <QuillEditor
                          toolbar="essential"
                          theme="snow"
                          v-model:content="contact.note"
                          contentType="text"
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
          @click="toggleCreate()"
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
import BaseModal from "./Modal.vue";
import axios from "redaxios";
import * as url from "../config";
import moment from "moment/min/moment-with-locales";
moment.locale("vi");
export default {
  components: {
    BaseModal,
  },
  data() {
    return {
      contact: {
        customer_id: null,
        content: "",
        status: "",
        note: "",
      },
    };
  },
  computed: {
    customerProps() {
      return this.$store.state.customer;
    },
  },
  created() {
    this.contact.customer_id = this.customerProps.id;
  },
  methods: {
    toggleCloseModal() {
      this.$emit("close-modal");
    },
    async toggleCreate() {
      await axios({
        url: url.customer.CARE,
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          Accept: "application/json",
        },
        data: this.contact,
      })
        .then((res) => {
          console.log(res.data);
          cuteToast({
            type: "success",
            message: res.data.message,
            timer: "5000",
          });
          this.$store.dispatch("getCustomerInfo", {
            id: this.$route.params.id,
            upload: false,
          });
          this.toggleCloseModal();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style scoped>
.editor {
  background-color: #ffffff;
  padding-top: 1rem;
  padding-bottom: 4rem;
}
</style>

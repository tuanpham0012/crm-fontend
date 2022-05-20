<template>
  <base-modal
        title="Cập nhật quan hệ khách hàng"
        :size="false"
        @closeModal="toggleModalUpdateType()"
      >
        <template v-slot:body>
          <div class="col-12">
            <div class="card">
              <div class="card-body">
                <div class="row">
                    <div class="col-md-12">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label"
                          >Mối quan hệ</label
                        >
                        <div class="col-sm-9">
                          <select
                            class="form-control"
                            v-if="typeCustomer"
                            v-model="type_of_customer_id"
                          >
                            <option
                              v-for="(type, index) in typeCustomer"
                              :key="index"
                              :value="type.id"
                            >
                              {{ type.type }}
                            </option>
                          </select>
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
          v-if="!updating"
          class="btn btn-sm btn-gradient-info"
          @click="UpdateType()"
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
            @click="toggleModalUpdateType()"
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
  computed:{
    typeCustomer() {
      return this.$store.state.baseData
        ? this.$store.state.baseData.type_of_customer
        : null;
    },
  },
  data() {
    return {
      type_of_customer_id: 1,
      updating: false,
    }
  },
  methods: {
    toggleModalUpdateType(){
      this.$emit('close-modal');
    },
    async UpdateType(){
      this.updating = true;
      console.log(this.type_of_customer_id);
      await axios({
        method: "POST",
        url: url.customer.UPDATE_TYPE,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          Accept: "application/json",
        },
        data: {
          listCustomer: this.listCustomer,
          type: this.type_of_customer_id,
        },
      }).then((res) => {
          console.log(res);
          this.sending = false;
          this.$emit('update');
          this.toggleModalUpdateType();
          cuteToast({
              type: "success",
              message: res.data.message,
              timer: 5000,
            });
        })
        .catch((err) => {
          console.log(err);
          this.updating = false;
        });
    }
  },
}
</script>
<style scoped>
  
</style>
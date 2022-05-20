<template lang="">
  <div class="customer-title" v-if="customer">
    <div class="customer-name">
      <i class="mdi mdi-account-card-details"></i>
      <div class="title-name">
        <p>
          <span class="c-name">{{ customer.name }}</span> -
          <span class="c-uuid">{{ customer.customer_code }}</span>
        </p>
        <p class="c-lead">
          @ {{
            customer.contacts ? customer.contacts.user.name : "Đang cập nhật"
          }}
        </p>
      </div>
    </div>
    <div class="btn-action">
      <router-link
        :to="{
          name: 'customer-detail',
          params: { id: customer.id },
        }"
      >
        <button type="button" class="btn btn-sm btn-mg btn-info">Xem chi tiết</button>
      </router-link>
      <router-link
        :to="{
          name: 'customer-update',
          params: { id: customer.id },
        }"
      >
        <button type="button" class="btn btn-sm btn-mg btn-info">Chỉnh sửa</button>
      </router-link>
    </div>
  </div>
  <div class="customer-content">
    <div class="row">
      <div class="col-md-5 stretch-card">
        <div class="card">
          <div class="card-body">
            <div class="card-content">
              <div v-if="customer">
                <div class="base">
                  <div class="row-info">
                    <span class="row-title"
                      ><i class="mdi mdi-account"></i
                    ></span>
                    <span class="row-content name">{{ customer.name }}</span>
                  </div>
                  <div class="row-info">
                    <span class="row-title"
                      ><i class="mdi mdi-email-outline"></i
                    ></span>
                    <span class="row-content">{{ customer.email }}</span>
                  </div>
                  <div class="row-info" style="align-items: baseline">
                    <span class="row-title"
                      ><i class="mdi mdi-phone-classic"></i
                    ></span>
                    <ol
                      class="row-content"
                      v-if="customer.customer_phone.length > 0"
                    >
                      <li
                        v-for="(phone, index) in customer.customer_phone"
                        :key="index"
                      >
                        {{ phone.phone }}
                      </li>
                    </ol>
                    <span v-else>Đang cập nhật</span>
                  </div>
                  <div class="row-info">
                    <span class="row-title"
                      ><i class="mdi mdi-cake-layered"></i
                    ></span>
                    <span class="row-content">
                      {{
                        customer.date_of_birth
                          ? dateTimeFormat(customer.date_of_birth)
                          : "Đang cập nhật"
                      }}
                    </span>
                  </div>
                  <div class="row-info">
                    <span class="row-title"
                      ><i class="mdi mdi-map-marker"></i
                    ></span>
                    <span class="row-content">
                      {{
                        customer.address ? customer.address : "Đang cập nhật"
                      }}
                    </span>
                  </div>
                  <div class="row-info">
                    <span class="row-title"
                      ><i class="mdi mdi-gender-male-female"></i
                    ></span>
                    <span class="row-content">
                      {{ customer.gender ? customer.gender : "Đang cập nhật" }}
                    </span>
                  </div>
                </div>
                <div>
                  <div class="col-md-12">
                    <div class="form-group row">
                      <label class="col-sm-5 col-form-label">Mối quan hệ</label>
                      <div class="col-sm-7">
                        <select
                          class="form-control"
                          v-if="typeCustomer"
                          v-model="customer.type_of_customer_id"
                          @change="UpdateTypeOfCustomer(customer.id)"
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
                  <div class="col-md-12" >
                    <div class="form-group">
                      <label class="col-sm-9 col-form-label">Mặt hàng quan tâm: </label>
                      <div class="col-sm-12 interest">
                        <ul v-if="customer.interest && customer.interest.length > 0">
                            <li v-for="(type, index) in customer.interest" :key="index">
                                {{ type.type_of_product.type}}
                            </li>
                          </ul>
                          <span class="updating" v-else>Đang cập nhật</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-7 stretch-card note">
        <div class="card">
          <div class="card-body">
            <div class="card-content">
              <div>
                <div class="tab-content">
                  <note-component
                    :notesProps="customer.customer_notes"
                    :customer_id="customer.id"
                  ></note-component>
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
import NoteComponent from "./NoteCustomerComponent.vue";
import moment from "moment/min/moment-with-locales";
moment.locale("vi");

import axios from "redaxios";
import * as url from "../config";

export default {
  props: {
    customer: {
      type: Object,
      default() {
        return null;
      },
    },
  },
  components: {
    NoteComponent,
  },
  computed: {
    typeCustomer() {
      return this.$store.state.baseData ? this.$store.state.baseData.type_of_customer : null;
    },
  },
  created() {
  },
  methods: {
    dateTimeFormat(time) {
      return moment(time).format("LL");
    },
    async UpdateTypeOfCustomer(id) {
      await axios({
        method: "PATCH",
        url: url.customer.UPDATE + id,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          Accept: "application/json",
        },
        data: this.customer,
      })
        .then((res) => {
          console.log(res);
          cuteToast({
            type: "success",
            message: res.data.message,
            timer: 3000,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style scoped>
ol {
  margin-left: 1rem;
}
.customer-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgb(231, 231, 231);
  margin-bottom: 1rem;
}
.customer-title .customer-name {
  display: flex;
  margin: 0.5rem;
  align-items: center;
}
.customer-name i {
  font-size: 1.5rem;
  color: rgb(255, 255, 255);
  background-color: blue;
  width: 2.5rem;
  height: 2.5rem;
  align-items: center;
  justify-content: center;
  display: flex;
  border-radius: 3px;
  margin: 0 0.5rem;
}
.title-name {
  margin: 0.2rem 0.7rem;
}
.title-name .c-name {
  font-size: 1.3rem;
  font-weight: 650;
  color: rgb(226, 91, 13);
}
.title-name .c-name:hover {
  color: blue;
  cursor: pointer;
}
.title-name .c-uuid {
  font-size: 1rem;
  font-style: italic;
  color: rgb(226, 91, 13);
}
.title-name .c-lead {
  color: rgb(13, 13, 233);
}
.title-name .c-lead:hover {
  color: rgb(226, 91, 13);
  cursor: pointer;
}
.note {
  background-color: #f2edf3;
  padding: 0.5rem;
  display: flex;
  justify-items: flex-end;
}
.card-body {
  padding: 0;
}
.row-info {
  color: rgb(56, 56, 255);
  display: flex;
  align-items: center;
}
.row-info i {
  color: rgb(20, 20, 255);
  font-size: 1.4rem;
  margin: 0 0.34rem;
}
.name {
  color: rgb(226, 91, 13);
  font-size: 1.1rem;
  font-weight: 450;
}
.base {
  border-bottom: 1px solid #f2edf3;
  margin: 0.2rem;
  padding-bottom: 1rem;
}
.interest li{
  list-style-type: circle;
  padding: 0 0.5rem;
  border-bottom: 1px solid #6a718038;
  font-size: 0.875rem;
}
.interest li:hover{
  cursor: pointer;
  background-color: rgba(230, 233, 240, 0.664);
}
</style>

<template lang="">
  <Loading />
  <div class="main-panel">
    <div class="content-wrapper">
      <base-modal
        v-if="modalCreate"
        title="Thêm mới khách hàng"
        :size="true"
        @closeModal="toggleModalCreate()"
      >
        <template v-slot:body>
          <div class="col-12">
            <div class="card">
              <div class="card-body">
                <form class="form-sample">
                  <div class="row bd">
                    <div class="col-md-6">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label"
                          >Tên khách hàng</label
                        >
                        <div class="col-sm-9">
                          <input
                            type="text"
                            class="form-control"
                            v-model="customer_create.name"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label">Email</label>
                        <div class="col-sm-9">
                          <input
                            type="email"
                            class="form-control"
                            v-model="customer_create.email"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label"
                          >Điện thoại</label
                        >
                        <div class="col-sm-9">
                          <input
                            type="text"
                            class="form-control"
                            @keypress="isNumber($event)"
                            v-model="customer_create.phone"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label">Địa chỉ</label>
                        <div class="col-sm-9">
                          <input
                            type="text"
                            class="form-control"
                            v-model="customer_create.address"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label">Ngày sinh</label>
                        <div class="col-sm-9">
                          <input
                            type="date"
                            class="form-control"
                            v-model="customer_create.date_of_birth"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label">Giới tính</label>
                        <div class="col-sm-9">
                          <select
                            class="form-control"
                            v-model="customer_create.gender"
                          >
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label"
                          >Mối quan hệ</label
                        >
                        <div class="col-sm-9">
                          <select
                            class="form-control"
                            v-if="typeCustomer"
                            v-model="customer_create.type_of_customer_id"
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
                    <div class="col-md-6">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label">Địa chỉ</label>
                        <div class="col-sm-9">
                          <input
                            type="text"
                            class="form-control"
                            v-model="customer_create.address"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group row">
                        <label
                          for="exampleInputEmail2"
                          class="col-sm-3 col-form-label"
                          >Sản phẩm quan tâm</label
                        >
                        <div class="col-sm-6">
                          <select
                            class="form-control"
                            style="margin-top: 1rem"
                            v-model="interest"
                            v-if="typeOfProduct"
                          >
                            <option value="-1" disabled>
                              -- Chọn mặt hàng quan tâm --
                            </option>
                            <option
                              v-for="(type, index) in typeOfProduct"
                              :key="index"
                              :value="type.id"
                              :disabled="
                                customer_create.interest.findIndex(
                                  (x) => x.type_of_product_id == type.id
                                ) >= 0
                              "
                            >
                              {{ type.type }}
                            </option>
                          </select>
                        </div>
                        <div
                          class="col-sm-3"
                          style="
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                          "
                        >
                          <button
                            type="button"
                            class="btn btn-sm btn-gradient-info"
                            :disabled="interest == -1"
                            @click="addInterestProduct()"
                          >
                            Thêm
                          </button>
                        </div>

                        <div class="col-sm-12">
                          <ul
                            class="list-interest"
                            v-if="
                              customer_create.interest && customer_create.interest.length > 0
                            "
                          >
                            <li
                              v-for="(type, index) in customer_create.interest"
                              :key="index"
                            >
                              <button
                                type="button"
                                @click="removeInterest(index)"
                                class="close"
                              >
                                &times;</button
                              >{{ type.type_of_product.type }}
                            </li>
                          </ul>
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
          <button type="button" class="btn btn-info" @click="create()">
            Xác nhận
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            @click="toggleModalCreate()"
          >
            Đóng
          </button>
        </template>
      </base-modal>

      <!-- Gán người phụ trách -->


      <base-modal
        v-if="modalLead"
        title="Gán người phụ trách"
        :size="false"
        @closeModal="toggleModalLead()"
      >
        <template v-slot:body>
          <div class="col-12">
            <div class="card">
              <div class="card-body">
                <form class="form-sample">
                  <div class="row bd">
                    <div class="col-md-12">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label"
                          >Chọn phòng ban</label
                        >
                        <div class="col-sm-6 fill-select">
                          <select
                            class="form-control form-control-sm"
                            v-if="typeCustomer"
                            v-model="department_id"
                          >
                            <option value="-1" selected>
                              --Chọn phòng ban--
                            </option>
                            <option
                              v-for="(department, index) in departments"
                              :key="index"
                              :value="department.id"
                            >
                              {{ department.name }}
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label">Nhân viên</label>
                        <div class="col-sm-6 fill-select">
                          <select
                            class="form-control form-control-sm"
                            v-if="typeCustomer"
                            v-model="staff_id"
                            :disabled="staffs && staffs.length == 0"
                          >
                            <option value="-1" selected>
                              --Chọn nhân viên--
                            </option>
                            <option
                              v-if="staffs"
                              v-for="(staff, index) in staffs"
                              :key="index"
                              :value="staff.user_id"
                            >
                              {{ staff.user.name }}
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="form-group-checkbox">
                        <input
                          type="checkbox"
                          class="input-check"
                          v-model="assignNew"
                        />
                        <label>Cập nhật người phụ trách mới</label>
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
            class="btn btn-secondary"
            @click="toggleModalLead()"
          >
            Close
          </button>
          <button type="button" class="btn btn-primary" @click="assignSale()">
            Xác nhận
          </button>
        </template>
      </base-modal>



<!-- Thông tin khách hàng -->

      <base-modal
        v-if="modalCustomerInfo"
        title="Thông tin khách hàng"
        :size="true"
        @closeModal="toggleModalCustomerInfo()"
      >
        <template v-slot:body>
          <customer-info-modal v-if="customer" :customer="customer" />
        </template>
        <template v-slot:footer> </template>
      </base-modal>


<!-- Hết Thông tin khách hàng -->

      <div class="page-header">
        <h3 class="page-title">Danh sách khách hàng</h3>
        <nav aria-label="breadcrumb">
          <div class="btn-action">
            <button
              type="button"
              @click="toggleModalCreate()"
              class="btn btn-sm btn-gradient-info btn-icon-text"
            >
              <i class="mdi mdi-account-plus btn-icon-prepend"></i> Thêm mới
            </button>
            <button
              id="btnGroupDrop1"
              type="button"
              class="btn btn-sm btn-outline-info dropdown-toggle"
              data-toggle="dropdown"
              aria-expanded="false"
            >
              Hành động
            </button>
            <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
              <a
                class="dropdown-item"
                :class="{ disabled: selected.length == 0 }"
                href="#"
                @click="toggleModalLead()"
                >Gán sale</a
              >
              <a class="dropdown-item" href="#">Dropdown link</a>
            </div>
          </div>
        </nav>
      </div>
      <div class="row">
        <div class="col-lg-12 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <div class="fill">
                <div class="form-group-fill">
                  <div class="input-group form-search">
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      v-model="search"
                      placeholder="Tên ,email khách hàng"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                    />
                    <div class="input-group-append">
                      <button
                        class="btn btn-sm btn-gradient-info form-control-sm"
                        @click="toggleSearch()"
                        type="button"
                      >
                        Tìm kiếm
                      </button>
                    </div>
                  </div>
                </div>
                <div class="form-group-fill">
                  <label class="fill-label">Quan hệ</label>
                  <div class="fill-select">
                    <select
                      class="form-control form-control-sm"
                      v-model="type_of_customer"
                    >
                      <option value="-1" seleted>-- Tất cả --</option>
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
                <div class="form-group-fill">
                  <label class="fill-lable">Trạng thái</label>
                  <div class="fill-select">
                    <select class="form-control form-control-sm">
                      <option>-- Tất cả --</option>
                      <option>Đang sử dụng</option>
                      <option>Đã xóa</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="table-responsive">
                <table class="table table-hover table-bordered">
                  <thead>
                    <tr>
                      <th>
                        <input
                          type="checkbox"
                          @click="checkAll()"
                          v-model="isCheckAll"
                          :indeterminate="select"
                        />
                      </th>
                      <th>Xem</th>
                      <th>Khách hàng</th>
                      <th>Số điện thoại</th>
                      <th>Email</th>
                      <th>Loại khách hàng</th>
                      <th>Trạng thái</th>
                      <th>Người phụ trách</th>
                      <th>Ngày tạo</th>
                      <th>Ngày cập nhật</th>
                    </tr>
                  </thead>
                  <tbody v-if="customers && customers.data.length > 0">
                    <tr
                      v-for="(customer, index) in customers.data"
                      :key="index"
                    >
                      <td>
                        <input
                          type="checkbox"
                          v-model="selected"
                          :value="customer.id"
                          @change="updateCheckall()"
                        />
                        {{ index + 1 }}
                      </td>
                      <td
                        class="view"
                        @click="toggleModalCustomerInfo(customer.id)"
                      >
                        <i class="mdi mdi-eye"></i>
                      </td>
                      <td>
                        <div>
                          <p class="name">{{ customer.name }}</p>
                          <p class="address">
                            <i class="mdi mdi-map-marker"></i
                            >{{ customer.address }}
                          </p>
                        </div>
                      </td>
                      <td
                        :class="{
                          updating: !customer.customer_phone.length > 0,
                        }"
                      >
                        {{
                          customer.customer_phone.length > 0
                            ? customer.customer_phone[0].phone
                            : "(Đang cập nhật)"
                        }}
                        <span
                          class="badge badge-pill badge-info"
                          v-if="customer.customer_phone.length > 1"
                          >+{{ customer.customer_phone.length - 1 }}</span
                        >
                      </td>
                      <td>{{ customer.email }}</td>
                      <td>{{ customer.type_customer.type }}</td>
                      <td>{{ customer.status }}</td>
                      <td :class="{ updating: !customer.contacts }">
                        {{
                          customer.contacts
                            ? customer.contacts.user.name
                            : "( Đang cập nhật )"
                        }}
                      </td>
                      <td>{{ dateTime(customer.created_at) }}</td>
                      <td>{{ dateTime(customer.updated_at) }}</td>
                    </tr>
                  </tbody>
                  <tbody v-else>
                    <td></td>
                    <td>Không có dữ liệu hiển thị</td>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="panigate" v-if="customers">
              <nav aria-label="Page navigation example">
                <ul class="pagination justify-content-end">
                  <li class="page-item" v-if="currentPage != 1">
                    <a
                      class="page-link"
                      @click.prevent="currentPage--"
                      href="#"
                      aria-label="Previous"
                    >
                      <span aria-hidden="true">&laquo;</span>
                    </a>
                  </li>
                  <li
                    class="page-item"
                    v-for="page in customers.last_page"
                    :key="page"
                    :class="{ active: currentPage == page }"
                  >
                    <a
                      class="page-link"
                      @click.prevent="currentPage = page"
                      href="#"
                      >{{ page }}</a
                    >
                  </li>
                  <li
                    class="page-item"
                    v-if="currentPage != customers.last_page"
                  >
                    <a
                      class="page-link"
                      @click.prevent="currentPage++"
                      href="#"
                      aria-label="Next"
                    >
                      <span aria-hidden="true">&raquo;</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "redaxios";
import * as url from "../../config";
import BaseModal from "../../components/Modal.vue";
import Loading from "../../components/Loading.vue";
import CustomerInfoModal from "../../components/CustomerInfoModal.vue";
import moment from "moment";

export default {
  components: {
    BaseModal,
    Loading,
    CustomerInfoModal,
  },
  data() {
    return {
      modalCreate: false,
      modalLead: false,
      modalCustomerInfo: false,
      assignNew: true,
      department_id: -1,
      staff_id: -1,
      currentPage: 1,
      search: "",
      type_of_customer: -1,
      customer_create: {
        name: "",
        email: "",
        phone: "",
        gender: "Nam",
        interest: [],
        address: "",
        type_of_customer_id: "1",
      },
      interest: -1,
      staffs: [],
      select: false,
      selected: [],
      isCheckAll: false,
    };
  },
  computed: {
    typeCustomer() {
      return this.$store.state.baseData
        ? this.$store.state.baseData.type_of_customer
        : null;
    },
    typeOfProduct() {
      return this.$store.state.baseData
        ? this.$store.state.baseData.type_of_product
        : null;
    },
    customers() {
      return this.$store.state.customers
        ? this.$store.state.customers.customers
        : null;
    },
    customer() {
      return this.$store.state.customer;
    },
    departments() {
      return this.$store.state.departments;
    },
  },
  watch: {
    currentPage() {
      this.getList(this.currentPage, this.search, this.type_of_customer);
    },
    type_of_customer() {
      this.getList(this.currentPage, this.search, this.type_of_customer);
    },
    department_id() {
      var department = this.departments.filter(
        (x) => x.id === this.department_id
      );
      this.staffs = department[0].staff_of_department;
      this.staff_id = -1;
    },
    interests() {
      console.log(this.interests);
    },
  },
  created() {
    this.getList(this.currentPage, this.search, this.type_of_customer);
    this.$store.dispatch("getListDepartment");
  },
  methods: {
    checkAll: function () {
      if (this.select) {
        this.selected = [];
        this.select = false;
        this.isCheckAll = 0;
      } else {
        this.isCheckAll = !this.isCheckAll;
        this.selected = [];
        if (this.isCheckAll) {
          // Check all
          for (var key in this.customers.data) {
            this.selected.push(this.customers.data[key].id);
          }
        }
      }
      console.log(this.isCheckAll);
    },
    updateCheckall: function () {
      if (this.selected.length == this.customers.data.length) {
        this.isCheckAll = true;
        this.select = false;
        console.log(this.isCheckAll);
      } else {
        this.isCheckAll = false;
      }
      if (this.selected.length > 0) this.select = true;
      else this.select = false;
    },
    dateTime(value) {
      return moment(value).utc().format("HH:mm:ss DD-MM-YYYY");
    },
    toggleModalCreate() {
      this.modalCreate = !this.modalCreate;
    },
    toggleModalLead() {
      this.modalLead = !this.modalLead;
    },
    toggleModalCustomerInfo(id) {
      this.modalCustomerInfo = !this.modalCustomerInfo;
      if (id != null) {
        this.$store.dispatch("getCustomerInfo", { id: id , upload: true});
      }
    },
    isNumber: function (evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 43
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    toggleSearch() {
      this.getList(this.currentPage, this.search, this.type_of_customer);
    },
    getList(page, search, type) {
      this.$store.dispatch("getListCustomer", {
        page: page,
        search: search,
        type: type,
      });
    },
    addInterestProduct() {
      this.customer_create.interest.push({
            type_of_product_id: this.interest,
            type_of_product:{
              type: this.typeOfProduct.find( (x) => x.id == this.interest).type,
            } 
          });
          this.interest = -1;
          console.log(this.customer_create.interest);
    },
    removeInterest(index){
      this.customer.interest.splice(index, 1);
    },
    async create() {
      await axios({
        method: "POST",
        url: url.customer.CREATE,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          Accept: "application/json",
        },
        data: this.customer_create,
      })
        .then((res) => {
          console.log(res.data);
          this.toggleModalCreate();
          cuteToast({
            type: "success",
            message: res.data.message,
            timer: 5000,
          });
          this.getList(this.currentPage, this.search, this.type_of_customer);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async assignSale() {
      console.log(this.selected + " - staff: " + this.staff_id);
      await axios({
        method: "POST",
        url: url.customer.ASSIGN_SALE,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          Accept: "application/json",
        },
        data: {
          selected: this.selected,
          id: this.staff_id,
          update: this.assignNew,
        },
      })
        .then((res) => {
          console.log(res);
          this.getList(this.currentPage, this.search, this.type_of_customer);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style scoped>
td {
  padding: 0.1rem 0.5rem;
}
.updating {
  color: rgb(252, 31, 31);
  font-style: italic;
}
.input-check {
  margin: 0.5rem 1rem;
}
.form-group-checkbox {
  padding: 0.5rem 1rem;
  display: flex;
  align-content: center;
  align-items: center;
  margin-bottom: 1rem;
}
.form-group-checkbox label {
  margin: 0;
}
.disabled {
  background-color: rgb(240, 234, 229);
  cursor: default;
}
.view {
  text-align: center;
  color: rgb(4, 0, 255);
}
.view:hover {
  transform: scale(1.2);
  cursor: pointer;
}
.name {
  font-size: 1rem;
}
.address {
  font-size: 0.7rem;
  color: blue;
}
.bd {
  border-bottom: 1px gainsboro solid;
  margin-bottom: 2rem;
}
.panigate {
  margin: 0 3rem 1rem 3rem;
  padding: 0.5rem 1rem;
}
.btn-action {
  display: flex;
  justify-content: space-between;
}

.btn-action button {
  margin: 0.1rem 0.5rem;
}
.dropdown-menu {
  margin: 0.5rem;
}
.list-interest{
  margin: 0.5rem 0 0 1.5rem;
  background-color: rgb(221, 221, 235);
  padding: 0.5rem 0.2rem;
  border-radius: 8px;
}
.list-interest li{
  background-color: rgb(255, 255, 255);
  width: max-content;
  padding-left: 0.7rem;
  padding-right: 0.3rem;
  border-radius: 10px 0 10px 0;
  margin: 0.5rem 1rem;
}
.list-interest button{
  font-size: 1.4rem;
  margin-left: 1rem;
}
.list-interest button:hover{
  transform: scale(1.1);
}
</style>

<template>
  <div class="main-panel">
    <div class="content-wrapper">
      <div class="page-header">
        <h3 class="page-title">
          <span class="page-title-icon bg-gradient-primary text-white mr-2">
            <i class="mdi mdi-home"></i>
          </span>
          Trang chủ
        </h3>
      </div>
      <div class="row">
        <div class="col-12 grid-margin">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title">Truy cập nhanh</h4>
              <div class="short-panel">
                <div class="short">
                  <router-link :to="{ name: 'tasks' }">
                    <i class="mdi mdi-table-large"></i>
                    <span>Công việc</span>
                  </router-link>
                </div>
                <div class="short">
                  <router-link :to="{ name: 'projects' }">
                    <i class="mdi mdi-server"></i>
                    <span>Dự án</span>
                  </router-link>
                </div>
                <div class="short">
                  <router-link :to="{ name: 'my-customer' }">
                    <i class="mdi mdi-account-multiple-outline"></i>
                    <span>Khách hàng</span>
                  </router-link>
                </div>
                <div class="short">
                  <router-link :to="{ name: 'my-department' }">
                    <i class="mdi mdi-home-modern"></i>
                    <span>Phòng ban</span>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title">Quản lý khách hàng</h4>
              <div>
                <div class="row">
                  <div class="col-md-4 stretch-card grid-margin">
                    <div
                      class="card bg-gradient-success card-img-holder text-white"
                    >
                      <div class="card-body">
                        <h4 class="font-weight-normal mb-3">
                          KH mới
                          <i
                            class="mdi mdi-chart-line mdi-24px float-right"
                          ></i>
                        </h4>
                        <h2 class="mb-5">1 502</h2>
                        <h6 class="card-text">Tăng trưởng 15%</h6>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4 stretch-card grid-margin">
                    <div
                      class="card bg-gradient-info card-img-holder text-white"
                    >
                      <div class="card-body">
                        <h4 class="font-weight-normal mb-3">
                          Tư vấn thành công
                          <i
                            class="mdi mdi-bookmark-outline mdi-24px float-right"
                          ></i>
                        </h4>
                        <h2 class="mb-5">806</h2>
                        <h6 class="card-text">Thành công 76%</h6>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4 stretch-card grid-margin">
                    <div
                      class="card bg-gradient-warning card-img-holder text-white"
                    >
                      <div class="card-body">
                        <h4 class="font-weight-normal mb-3">
                          Khách hàng tiềm năng
                          <i class="mdi mdi-diamond mdi-24px float-right"></i>
                        </h4>
                        <h2 class="mb-5">456</h2>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4 stretch-card grid-margin">
                    <div
                      class="card bg-gradient-danger card-img-holder text-white"
                    >
                      <div class="card-body">
                        <h4 class="font-weight-normal mb-3">
                          Tư vấn thất bại
                          <i class="mdi mdi-diamond mdi-24px float-right"></i>
                        </h4>
                        <h2 class="mb-5">103</h2>
                        <h6 class="card-text">Thất bại 19%</h6>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4 stretch-card grid-margin">
                    <div
                      class="card bg-gradient-primary card-img-holder text-white"
                    >
                      <div class="card-body">
                        <h4 class="font-weight-normal mb-3">
                          Phản hồi từ khách hàng
                          <i class="mdi mdi-diamond mdi-24px float-right"></i>
                        </h4>
                        <h2 class="mb-5">2 741</h2>
                        <h6 class="card-text">Đã giải quyết 86%</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <div class="clearfix">
                <h4 class="card-title float-left">Khách hàng mới phụ trách</h4>
                <div
                  id="visit-sale-chart-legend"
                  class="rounded-legend legend-horizontal legend-top-right float-right"
                ></div>
              </div>
              <div class="table-responsive">
                <table class="table table-hover table-bordered">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Xem</th>
                      <th>Khách hàng</th>
                      <th>Email</th>
                      <th>Sinh nhật</th>
                      <th>Người tạo</th>
                    </tr>
                  </thead>
                  <tbody v-if="customers && customers.length > 0">
                    <tr v-for="(customer, index) in customers" :key="index">
                      <td>
                        {{ index + 1 }}
                      </td>
                      <td>
                        <div>
                          <router-link
                            :to="{
                              name: 'customer-detail',
                              params: { id: customer.id },
                            }"
                            >{{ customer.name }}</router-link
                          >
                          <p class="address">
                            <i class="mdi mdi-map-marker"></i
                            >{{ customer.address }}
                          </p>
                        </div>
                      </td>
                      <td>{{ customer.email }}</td>
                      <td>{{ dateTime(customer.date_of_birth) }}</td>
                      <td>{{ customer.type_customer.type }}</td>
                      <td :class="{ updating: !customer.user_id }">
                        {{
                          customer.user
                            ? customer.user.name
                            : "( Đang cập nhật )"
                        }}
                      </td>
                    </tr>
                  </tbody>
                  <tbody v-else>
                    <td></td>
                    <td>Không có dữ liệu hiển thị</td>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title">Công việc mới được giao</h4>
              <div class="table-responsive">
                <table class="table table-hover table-bordered">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Tên công việc</th>
                      <th>Ngày bắt đầu</th>
                      <th>Ngày kết thúc</th>
                      <th>Trạng thái</th>
                      <th>Người tạo</th>
                      <th>Loại công việc</th>
                      <th>Ngày tạo</th>
                    </tr>
                  </thead>
                  <tbody v-if="tasks && tasks.length > 0">
                    <tr v-for="(task, index) in tasks" :key="index">
                      <td>
                        {{ index + 1 }}
                      </td>
                      <td>
                        {{ task.name }}
                      </td>
                      <td>
                        {{ dateTime(task.start) }}
                      </td>
                      <td>
                        {{ dateTime(task.end) }}
                      </td>
                      <td>
                        {{
                          task.task_status
                            ? task.task_status.status
                            : "Đang cập nhật"
                        }}
                      </td>
                      <td class="td-user">
                        <img
                          :src="
                            avatar_link(task.user.avatar) ||
                            'https://cms.vietnamreport.net//source/CEO/512.png'
                          "
                          alt=""
                        />
                        {{ task.user.name }}
                      </td>
                      <td>
                        {{ task.type_of_task.type }}
                      </td>
                      <td>
                        {{ dateTime(task.created_at) }}
                      </td>
                    </tr>
                  </tbody>
                  <tbody v-else>
                    <td colspan="7">Không có dữ liệu</td>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Menu from "../components/Menu.vue";
import NavBar from "../components/Top.vue";

import axios from "redaxios";
import * as url from "../config";
import moment from "moment/min/moment-with-locales";
moment.locale("vi");

export default {
  components: {
    Menu,
    NavBar,
  },
  data() {
    return {
      customers: null,
      tasks: null,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      axios({
        url: url.home.HOME_DATA,
        method: "get",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          Accept: "application/json",
        },
      })
        .then((res) => {
          console.log(res.data);
          this.customers = res.data.customers;
          this.tasks = res.data.tasks;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    dateTime(value) {
      return moment(value).utc().format("DD/MM/YYYY");
    },
  },
};
</script>
<style scoped>
.short-panel {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: center;
}

.short {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  margin: 1rem 1.5rem;
  padding: 0.5rem 1.5rem;
  border-radius: 1rem;
  cursor: pointer;
}
.short i {
  font-size: 2rem;
  margin-right: 1rem;
}

.short:hover {
  color: rgb(12, 0, 185);
  background-color: rgb(235, 239, 243);
}
</style>

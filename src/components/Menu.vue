<template>
        <nav class="sidebar sidebar-offcanvas" id="sidebar">
          <ul class="nav">
            <li class="nav-item nav-profile">
              <a href="#" class="nav-link">
                <div class="nav-profile-image">
                  <img :src=" user ? avatar_link(user.avatar) : 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'" alt="profile">
                  <span class="login-status online"></span>
                  <!--change to offline or busy as needed-->
                </div>
                <div class="nav-profile-text d-flex flex-column">
                  <span class="font-weight-bold mb-2">{{ user ? user.name : ''}}</span>
                  <span class="text-secondary text-small">{{ user ? user.role.role : ''}}</span>
                </div>
                <i class="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
              </a>
            </li>
            <li class="nav-item" :class="{ 'active' : $route.name == 'home'}">
              <router-link class="nav-link" :to="{name: 'home'}">
                <span class="menu-title">Trang chủ</span>
                <i class="mdi mdi-home menu-icon"></i>
              </router-link>
            </li>
            <li class="nav-item" :class="{ 'active' : fill('project', $route.path)}">
              <router-link class="nav-link" :to="{name: 'projects'}">
                <span class="menu-title">Dự án</span>
                <i class="mdi mdi-server menu-icon"></i>
              </router-link>
            </li>
            <li class="nav-item" :class="{ 'active' : fill('task', $route.path) }">
              <router-link class="nav-link" :to="{name: 'tasks'}">
                <span class="menu-title">Công việc</span>
                <i class="mdi mdi-calendar-check menu-icon"></i>
              </router-link>
            </li>
            <li class="nav-item" :class="{ 'active' : $route.name == 'my-department'}">
              <router-link class="nav-link" :to="{name: 'my-department'}">
                <span class="menu-title">Phòng ban</span>
                <i class="mdi mdi-home-modern menu-icon"></i>
              </router-link>
            </li>
            <li class="nav-item" v-if="$store.getters.getDepartmentID == 2" :class="{ 'active' : fill('customer', $route.path)}">
              <a class="nav-link" data-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
                <span class="menu-title">Khách Hàng</span>
                <i class="menu-arrow"></i>
                <i class="mdi mdi-account-multiple-outline menu-icon"></i>
              </a>
              <div class="collapse" id="ui-basic">
                <ul class="nav flex-column sub-menu">
                  <li class="nav-item"> <router-link class="nav-link" :class="{ 'active' : $route.name == 'my-customer'}" :to="{ name : 'my-customer'}" >Khách hàng phụ trách</router-link></li>
                  <li class="nav-item"> <router-link class="nav-link" :class="{ 'active' : $route.name == 'customers'}" :to="{ name : 'customers'}">Tất cả khách hàng</router-link></li>
                  <!-- <li class="nav-item"> <a class="nav-link" href="pages/ui-features/typography.html">Nhóm</a></li> -->
                </ul>
              </div>
            </li>
            <div v-if="$store.getters.getDepartmentID == 1">
              <li class="nav-item" :class="{ 'active' : fill('staff', $route.path)}">
                <router-link class="nav-link" :to="{name: 'staffs'}">
                  <span class="menu-title">Quản lý nhân viên</span>
                  <i class="mdi mdi-account-search menu-icon"></i>
                </router-link>
              </li>
              <li class="nav-item" :class="{ 'active' : fill('departments', $route.path)}">
                <router-link class="nav-link" :to="{name: 'departments'}">
                  <span class="menu-title">Quản lý phòng ban</span>
                  <i class="mdi mdi-houzz-box menu-icon"></i>
                </router-link>
              </li>
            </div>
            <!-- <li class="nav-item">
              <a class="nav-link" href="pages/forms/basic_elements.html">
                <span class="menu-title">Bán hàng</span>
                <i class="mdi mdi mdi-sale menu-icon"></i>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="pages/charts/chartjs.html">
                <span class="menu-title">Tiếp thị</span>
                <i class="mdi mdi mdi-reproduction menu-icon"></i>
              </a>
            </li> -->
            <!-- <li class="nav-item">
              <a class="nav-link" href="pages/tables/basic-table.html">
                <span class="menu-title">Chăm sóc khách hàng</span>
                <i class="mdi mdi mdi-emoticon-happy menu-icon"></i>
              </a>
            </li> -->
            <!-- <li class="nav-item" v-if="user && user.role_id == 1">
              <a class="nav-link" data-toggle="collapse" href="#general-pages" aria-expanded="false" aria-controls="general-pages">
                <span class="menu-title">Quản lý</span>
                <i class="menu-arrow"></i>
                <i class="mdi mdi mdi-settings menu-icon"></i>
              </a>
              <div class="collapse" id="general-pages">
                <ul class="nav flex-column sub-menu">
                  <li class="nav-item"> <router-link class="nav-link" :class="{ 'active' : $route.name == 'staffs'}" :to="{name: 'staffs'}"> Nhân viên </router-link></li>
                  <li class="nav-item"> <router-link class="nav-link" :class="{ 'active' : $route.name == 'departments'}" :to="{name: 'departments'}"> Phòng ban </router-link></li>
                  <li class="nav-item"> <router-link class="nav-link" :class="{ 'active' : $route.name == 'projects'}" :to="{name: 'projects'}"> Dự án </router-link></li>
                  <li class="nav-item"> <a class="nav-link" href="pages/samples/register.html"> {{ $route.name }} </a></li>
                  <li class="nav-item"> <a class="nav-link" href="pages/samples/error-404.html"> 404 </a></li>
                  <li class="nav-item"> <a class="nav-link" href="pages/samples/error-500.html"> 500 </a></li>
                </ul>
              </div>
            </li> -->
          </ul>
        </nav>
</template>
<script>
import * as url from "../config";
export default {
  data() {
		return {
		}
	},
	computed:{
		user(){
			return this.$store.getters.getInfo;
		}
	},
  watch:{
    // $route(){
    //   console.log(this.$route);
    // }
  },
  created() {
    this.fill('project', this.$route.path);
  },
	methods:{
    avatar_link(value){
      if(value){
        return url.server_url + value;
      }else{
        return null;
      }
    },
    fill(value, patch){
      return patch.includes(value);
    }
	}
};
</script>
<style scoped>
.sidebar{
  height: 101vh;
  overflow: auto; 
}

@media (min-width: 992px){
  .sidebar-icon-only .sidebar {
      width: 70px;
      overflow: unset;
  }
}

</style>

<template>
        <nav class="sidebar sidebar-offcanvas" id="sidebar">
          <ul class="nav">
            <li class="nav-item nav-profile">
              <a href="#" class="nav-link">
                <div class="nav-profile-image">
                  <img :src="(user && user.avatar) ? user.avatar : 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'" alt="profile">
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
            <li class="nav-item">
              <a class="nav-link" data-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
                <span class="menu-title">Cá nhân</span>
                <i class="menu-arrow"></i>
                <i class="mdi mdi mdi-account menu-icon"></i>
              </a>
              <div class="collapse" id="ui-basic">
                <ul class="nav flex-column sub-menu">
                  <li class="nav-item"> <router-link class="nav-link" :to="{ name : 'my-customer'}" >Khách hàng phụ trách</router-link></li>
                  <li class="nav-item"> <router-link class="nav-link" :to="{ name : 'tasks'}">Công việc của tôi</router-link></li>
                  <li class="nav-item"> <a class="nav-link" href="pages/ui-features/typography.html">Nhóm</a></li>
                </ul>
              </div>
            </li>
            <li class="nav-item" :class="{ 'active' : $route.name == 'customers'}">
              <router-link class="nav-link" :to="{name: 'customers'}">
                <span class="menu-title">Khách hàng</span>
                <i class="mdi mdi mdi-human-male-female menu-icon"></i>
              </router-link>
            </li>
            <li class="nav-item">
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
            </li>
            <li class="nav-item">
              <a class="nav-link" href="pages/tables/basic-table.html">
                <span class="menu-title">Chăm sóc khách hàng</span>
                <i class="mdi mdi mdi-emoticon-happy menu-icon"></i>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-toggle="collapse" href="#general-pages" aria-expanded="false" aria-controls="general-pages">
                <span class="menu-title">Quản lý</span>
                <i class="menu-arrow"></i>
                <i class="mdi mdi mdi-settings menu-icon"></i>
              </a>
              <div class="collapse" id="general-pages">
                <ul class="nav flex-column sub-menu">
                  <li class="nav-item"> <router-link class="nav-link" :class="{ 'active' : $route.name == 'staffs'}" :to="{name: 'staffs'}"> Nhân viên </router-link></li>
                  <li class="nav-item"> <router-link class="nav-link" :class="{ 'active' : $route.name == 'departments'}" :to="{name: 'departments'}"> Phòng ban </router-link></li>
                  <li class="nav-item"> <a class="nav-link" href="pages/samples/register.html"> {{ $route.name }} </a></li>
                  <li class="nav-item"> <a class="nav-link" href="pages/samples/error-404.html"> 404 </a></li>
                  <li class="nav-item"> <a class="nav-link" href="pages/samples/error-500.html"> 500 </a></li>
                </ul>
              </div>
            </li>
            <li class="nav-item sidebar-actions">
              <span class="nav-link">
                <div class="border-bottom">
                  <h6 class="font-weight-normal mb-3">Projects</h6>
                </div>
                <button class="btn btn-block btn-lg btn-gradient-primary mt-4">+ Add a project</button>
                <div class="mt-4">
                  <div class="border-bottom">
                    <p class="text-secondary">Categories</p>
                  </div>
                  <ul class="gradient-bullet-list mt-4">
                    <li>Free</li>
                    <li>Pro</li>
                  </ul>
                </div>
              </span>
            </li>
          </ul>
        </nav>
</template>
<script>
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
	methods:{
	}
};
</script>
<style scoped>
.sidebar{
  height: 150vh;
  overflow: auto; 
}

@media (min-width: 992px){
  .sidebar-icon-only .sidebar {
      width: 70px;
      overflow: unset;
  }
}

</style>

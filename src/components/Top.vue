<template>
	<nav class="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
		<div class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
			<router-link class="navbar-brand brand-logo" :to="{ name: 'home'}">
				<img src="../assets/images/blue.png" alt="logo" style="height: auto;" />
			</router-link>
			<!-- <a class="navbar-brand brand-logo-mini" href="index.html">
				<img src="../assets/images/logo-mini.svg" alt="logo" />
			</a> -->
			<router-link :to="{ name: 'home'}" class="navbar-brand brand-logo-mini">
				<img src="../assets/images/logo-mini.svg" alt="logo" />
			</router-link>
		</div>
		<div class="navbar-menu-wrapper d-flex align-items-stretch">
			<button class="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
				<span class="mdi mdi-menu"></span>
			</button>
			<div class="search-field d-none d-md-block">
				<form class="d-flex align-items-center h-100" action="#">
					<div class="input-group">
						<div class="input-group-prepend bg-transparent">
							<i class="input-group-text border-0 mdi mdi-magnify"></i>
						</div>
						<input type="text" class="form-control bg-transparent border-0" placeholder="Search projects" />
					</div>
				</form>
			</div>
			<ul class="navbar-nav navbar-nav-right"  v-if="user">
				<li class="nav-item nav-profile dropdown">
					<a
						class="nav-link dropdown-toggle"
						id="profileDropdown"
						href="#"
						data-toggle="dropdown"
						aria-expanded="false"
					>
						<div class="nav-profile-img">
							<img
								:src=" avatar_link(user.avatar) || 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'"
								alt="image"
							/>
							<span class="availability-status online"></span>
						</div>
						<div class="nav-profile-text">
							<p class="mb-1 text-black">{{ user ? user.name : ''}}</p>
						</div>
					</a>
					<div class="dropdown-menu navbar-dropdown" aria-labelledby="profileDropdown">
						<router-link class="dropdown-item" :to="{name: 'account-detail'}">
							<i class="mdi mdi-account-circle mr-2 text-success"></i> Thông tin cá nhân
						</router-link>
						<div class="dropdown-divider"></div>
						<a class="dropdown-item" href="#" @click="signOut()">
							<i class="mdi mdi-logout mr-2 text-primary"></i> Đăng xuất
						</a>
					</div>
				</li>
				<li class="nav-item d-none d-lg-block full-screen-link">
					<a class="nav-link">
						<i class="mdi mdi-fullscreen" id="fullscreen-button"></i>
					</a>
				</li>
				<li class="nav-item dropdown">
					<a
						class="nav-link count-indicator dropdown-toggle"
						@click="toggleShowNotification()"
					>
						<i class="mdi mdi-bell-outline"></i>
						<span class="count-symbol bg-danger"></span>
					</a>
					<div
						class="dropdown-menu dropdown-menu-right navbar-dropdown preview-list show notif"
						v-if="showNotification"
					>
						<span class="close" @click="toggleShowNotification()">&times;</span>
						<div class="notification-header">
							<h4 class="p-3 mb-0">Thông báo</h4>
							<div>
								<button type="botton" class="btn btn-sm btn-notifi" :class="{'btn-active' : showAll}" @click="toggleShow()">Tất cả</button>
								<button type="botton" class="btn btn-sm btn-notifi" :class="{'btn-active' : !showAll}" @click="toggleShow()">Chưa đọc</button>
							</div>
						</div>
						
						<div class="notification-container" v-if="notifications">
							<div v-if="showAll ">
								<div class="notification" v-if="notifications && notifications.length > 0"  v-for="(notif, index) in notifications" :key="index" @click="readNotification(notif)">
									<div class="dropdown-divider"></div>
									<a class="dropdown-item preview-item">
										<div class="preview-thumbnail">
											<div class="preview-icon bg-success">
												<i class="mdi mdi-calendar"></i>
											</div>
										</div>
										<div
											class="preview-item-content d-flex align-items-start flex-column justify-content-center"
										>
											<h6 class="font-weight-normal mb-1">{{ notif.title}}</h6>
											<p class="text-gray ellipsis mb-0" v-html="notif.content"></p>
											<span class="notification-time">{{ dateTime(notif.created_at)}}</span>
										</div>
									</a>
									<div v-if="!notif.read" class="unread"></div>
								</div>
								<div class="notification-blank" v-else>
									<i class="mdi mdi-bell-ring-outline"></i>
									<p>Bạn không có thông báo nào!</p>
								</div>
								<div class="p-0 mb-0 text-center" v-if=" total <= notifications.length"><button class="btn btn-sm btn-link" @click="toggleLoadMore(loadMoreSize)">Xem thêm</button></div>
							</div>
							<div v-else>
								<div class="notification" v-if="notificationsUnread && notificationsUnread.length > 0"  v-for="(notif, index) in notificationsUnread" :key="index" @click="readNotification(notif)">
									<div class="dropdown-divider"></div>
									<a class="dropdown-item preview-item">
										<div class="preview-thumbnail">
											<div class="preview-icon bg-success">
												<i class="mdi mdi-calendar"></i>
											</div>
										</div>
										<div
											class="preview-item-content d-flex align-items-start flex-column justify-content-center"
										>
											<h6 class="font-weight-normal mb-1">{{ notif.title}}</h6>
											<p class="text-gray ellipsis mb-0" v-html="notif.content"></p>
											<span class="notification-time">{{ dateTime(notif.created_at)}}</span>
										</div>
									</a>
									<div v-if="!notif.read" class="unread"></div>
								</div>
								<div class="notification-blank" v-else>
									<i class="mdi mdi-bell-ring-outline"></i>
									<p>Bạn không có thông báo nào!</p>
								</div>
								<div class="p-0 mb-0 text-center" v-if="total <= notificationsUnread.length"><button class="btn btn-sm btn-link" @click="toggleLoadMore(loadMoreSize)">Xem thêm</button></div>
							</div>
							
						</div>
						<div class="dropdown-divider"></div>
						<div class="notification-btn">
							<button class="btn btn-sm btn-link">Xem tất cả thông báo</button>
							<button class="btn btn-sm btn-link" @click="toggleReadAll()">Đánh dấu đã đọc</button>
						</div>
						
					</div>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="#" @click.prevent="toggleToDoList()">
						<i class="mdi mdi mdi-format-list-numbered"></i>
					</a>
				</li>
				<li class="nav-item nav-settings d-none d-lg-block">
					<a class="nav-link" href="#">
						<i class="mdi mdi mdi-chevron-double-up"></i>
					</a>
				</li>
			</ul>
			<button
				class="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
				type="button"
				data-toggle="offcanvas"
			>
				<span class="mdi mdi-menu"></span>
			</button>
		</div>
	</nav>
</template>
<script>
import { mapMutations} from 'vuex';
import axios from "redaxios";
import * as url from "../config";
import moment from "moment/min/moment-with-locales";
moment.locale("vi");

export default {
	data() {
		return {
			total: 20,
			loadMoreSize: 10,
			showAll: true,
		};
	},
	computed:{
		user(){
			return this.$store.getters.getInfo;
		},
		notifications(){
			return this.$store.state.notifications ? this.$store.state.notifications.notifications.slice(0, this.total) : null;
		},
		notificationsUnread(){
			return this.$store.state.notifications ? this.$store.state.notifications.notificationsUnread.slice(0, this.total) : null;
		},
		showNotification(){
			return this.$store.state.showNotification;
		}
	},
	mounted() {
	},
	methods: {
		avatar_link(value){
      if(value){
        return url.server_url + value;
      }else{
        return null;
      }
    },
		dateTime(value) {
      return moment(value).startOf().fromNow();
    },
		signOut() {
			localStorage.removeItem("token");
			this.$router.push({ name: "login" });
		},
		...mapMutations(['toggleToDoList']),
		toggleShowNotification(){
			this.$store.commit('toggleNotification', !this.showNotification );
		},
		toggleLoadMore(value){
			this.total = 	this.total + value;
		},
		toggleShow(){
			this.showAll = !this.showAll;
		},
		async readNotification(notification){
			this.toggleShowNotification();
			let component_name = "";
			switch (notification.relation) {
				case "task":
					component_name = "tasks";
					break;
				case "customer":
					component_name = "customer-detail";
					break;
				case "department":
					component_name = "my-department";
					break;
				case "project":
					component_name = "project-detail";
					break;
				default:
					component_name = "home";
					break;
			}
			console.log(this.$route.params.id);
			this.$router.push({ name: component_name, params: { id: notification.relation_id } });
			await axios({
        url: url.notification.READ_NOTIFICATION + notification.id,
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          Accept: "application/json",
        },
      }).then( res => {
				//console.log(res.data)
				this.$store.dispatch('getListNotification');
			}).catch(err => {
				console.log(err);
			})
		},
		async toggleReadAll(){
			this.notifications.forEach(value => {
				value.read = 1;
			});
			await axios({
        url: url.notification.READ_ALL,
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          Accept: "application/json",
        },
      }).then( res => {
				console.log(res.data)
				this.$store.dispatch('getListNotification');
			}).catch(err => {
				console.log(err);
			})
		}
	},
};
</script>
<style scoped>
.close{
	margin: 0 0.5rem
}
.notif{
	min-width: 10rem;
	width: max-content;
}
.nav-item{
	cursor: pointer;
}
.btn-notifi{
	background-color: rgb(245, 241, 237);
	border-radius: 1rem;
	font-weight: 550;
	margin: 0.345rem;
}
.btn-active{
	background-color: rgb(221, 235, 243);
	color:rgb(0, 47, 255);
	pointer-events: none;
}
.notification-container{
	min-height: 19rem;
	max-height: 30rem;
	overflow: auto;
}
.notification-header{
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.notification{
	position: relative;
}
.notification .dropdown-item{
	margin-right: 1rem;
}
.notification .dropdown-item:hover{
	color: rgb(0, 4, 255);
}
.notification .dropdown-item .align-items-start{
	margin-right: 1rem;
}
.notification-time{
	margin-top: 0.2rem;
	font-size: 0.875rem;
	color: rgb(134, 117, 93)
}
.unread{
	position: absolute;
	top: 45%;
	right: 1rem;
	width: 0.675rem;
	height: 0.675rem;
	border-radius: 50%;
	background-color: blue;
}
.notification-blank{
	text-align: center;
	width: 100%;
}
.notification-blank i{
	font-size: 8rem;
	color: rgb(53, 59, 145);
}
.notification-blank p{
	font-family: 'Times New Roman', Times, serif;
	font-size: 1.235rem;
	color:rgb(29, 73, 112);
	font-weight: 550;
}
.notification-btn{
	display: flex;
	justify-content: space-between;
	padding: 0 1rem;
}
</style>

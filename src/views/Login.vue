<template>
	<!-- Main content -->
	<div class="main-content">
		<!-- Page content -->
		<div class="container mt--8 pb-5">
			<div class="row justify-content-center">
				<div class="col-lg-5 col-md-7 mlogin">
					<div class="card border-0 mb-0">
						<div class="card-header bg-transparent pb-5">
							<div class="row">
								<div class="loading" v-show="loading">
									<div class="spinner-grow text-primary" role="status">
										<span class="visually-hidden"></span>
									</div>
									<div class="spinner-grow text-secondary" role="status">
										<span class="visually-hidden"></span>
									</div>
									<div class="spinner-grow text-success" role="status">
										<span class="visually-hidden"></span>
									</div>
									<div class="spinner-grow text-danger" role="status">
										<span class="visually-hidden"></span>
									</div>
									<div class="spinner-grow text-warning" role="status">
										<span class="visually-hidden"></span>
									</div>
									<div class="spinner-grow text-info" role="status">
										<span class="visually-hidden"></span>
									</div>
									<div class="spinner-grow text-dark" role="status">
										<span class="visually-hidden"></span>
									</div>
								</div>

								<div class="logo">
										<img src="../assets/images/blue.png" />
								</div>
							</div>
						</div>
						<div class="card-body px-lg-5 py-lg-5">
							<form>
								<div class="form-group mb-3">
									<div class="input-group input-group-merge input-group-alternative">
										<div class="input-group-prepend">
											<span class="input-group-text">
												<i class="mdi mdi-account-circle"></i>
											</span>
										</div>
										<input
											class="form-control"
											placeholder="Email"
											type="email"
											v-model="email"
											style="padding: 0 1.5rem 0 1rem;"
											:class="{ 'is-invalid': code == 404 }"
										/>
									</div>
									<div id class="invalid-feedback" style="display: block;" v-if="code == 404">{{ msg }}</div>
								</div>
								<div class="form-group">
									<div class="input-group input-group-merge input-group-alternative">
										<div class="input-group-prepend">
											<span class="input-group-text">
												<i class="mdi mdi-lock-open"></i>
											</span>
										</div>
										<input
											class="form-control"
											placeholder="Password"
											:type="showPassword ? 'text' : 'password'"
											v-model="password"
											style="padding: 0 1.5rem 0 1rem;"
											:class="{ 'is-invalid': code == 401 }"
										/>
										<span toggle="#password-field" @click="showPassword = !showPassword" :class="{'fa-eye fa-eye-slash' : showPassword }" class="fa fa-fw fa-eye field-icon toggle-password"></span>
									</div>
									<div id class="invalid-feedback" style="display: block;" v-if="code == 401">{{ msg }}</div>
								</div>
								<div class="remember">
									<div class="custom-control custom-control-alternative custom-checkbox">
										<input class="custom-control-input" id="customCheckLogin" type="checkbox" v-model="remember"/>
										<label class="custom-control-label" for="customCheckLogin">
											<span class="text-muted">Nhớ mật khẩu</span>
										</label>
									</div>
									<div>
										<a href="#" class="text-gray">
											<small>Quên mật khẩu?</small>
										</a>
									</div>
								</div>
								<div class="text-center">
									<button type="button" @click="loaded()" class="btn btn-rounded btn-gradient-info" :disabled="loading">Đăng nhập</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import axios from "redaxios";
import {user} from '../config';
export default {
	data() {
		return {
			showPassword: false,
			loading: false,
			email: '',
			password: '',
			code: 0,
			msg: '',
			remember: null,
		};
	},
	mounted(){
		this.checkLogin();
		this.remember = localStorage.getItem('remember') ? localStorage.getItem('remember') : false;
		this.email = localStorage.getItem('user') ? localStorage.getItem('user') : '';
		this.password = localStorage.getItem('password') ? localStorage.getItem('password') : '';
	},
	methods: {
		checkLogin(){
			if(localStorage.getItem('token')){
				this.$router.push({name: 'home'});
			}
		},
		loaded() {
			this.loading = !this.loading;
			console.log(this.email + " " + this.password);
			axios({
				method: "post",
				url: user.SIGNIN,
				data: {
					email: this.email,
					password: this.password,
				},
			})
				.then((res) => {
					localStorage.setItem('remember', this.remember);
					if(this.remember){
						localStorage.setItem('user', this.email);
						localStorage.setItem('password', this.password);
					}else{
						localStorage.removeItem('user');
						localStorage.removeItem('password');
					}
					console.log(res);
					localStorage.setItem('token', res.data.token);
					this.$store.dispatch('getInfo', { token: res.data.token});
					this.$router.push({ name: 'home' });
				})
				.catch((err) => {
					this.code = err.status;
					this.msg = err.data.message
					console.log(this.code + ' - ' + this.msg);
					this.loading = !this.loading;
				});
		},
	},
};
</script>
<style scoped>
.main-content {
	height: 111vh;
	width: 100%;
background: rgb(7,0,126);
background: linear-gradient(0deg, rgba(7,0,126,1) 0%, rgba(161,166,238,1) 70%, rgba(255,255,255,1) 100%);
}

.card{
	background: rgb(238,243,244);
background: linear-gradient(0deg, rgba(238,243,244,1) 66%, rgba(181,186,224,1) 100%);
}

.card-header{
	border-bottom: 0;
}

.loading {
	display: flex;
	justify-content: center;
	padding-top: 1rem;
}

.mlogin {
	margin-top: 2rem;
}
.field-icon {
	float: right;
	top: 1rem;
	right: 1rem;
	cursor: pointer;
	position: absolute;
	z-index: 10;
}

.mdi{
	font-size: 1.5em;
	color: rgb(8, 1, 107);
}

.input-group-text{
	padding: 0.5rem 0.65rem;
	color: rgb(182, 182, 182);
}

.field{
	padding-left: 2rem;
}

.remember {
	display: flex;
	justify-content: space-around;
	align-content: center;
	padding-left: 0.5rem;
	color: black;
}

.row {
	display: flex;
	justify-content: center;
}

.btn{
	margin-top: 2rem;
}
.logo{
	padding-left:3rem;
}
.logo img {
	width: 13rem;
	margin-left: -2rem;
	margin-top: 1rem;
}
</style>

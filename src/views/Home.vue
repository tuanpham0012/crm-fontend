<template>
	<div class="main-panel">
		<div class="content-wrapper">
			<div class="page-header">
				<h3 class="page-title">
					<span class="page-title-icon bg-gradient-primary text-white mr-2">
						<i class="mdi mdi-home"></i>
					</span> Trang chủ
				</h3>
			</div>
			<div class="row">
				<div class="col-12 grid-margin">
					<div class="card">
						<div class="card-body">
							<h4 class="card-title">Truy cập nhanh</h4>
							<div class="short-panel">
								<div class="short">
									<i class="mdi mdi-account-multiple-outline"></i>
									<span>Khách hàng</span>
								</div>
								<div class="short">
									<router-link :to="{name : 'tasks'}">
										<i class="mdi mdi-table-large"></i>
										<span>Công việc</span>
									</router-link>
									
								</div>
								<div class="short">
									<i class="mdi mdi-ungroup"></i>
									<span>Danh sách nhóm</span>
								</div>
								<div class="short">
									<i class="mdi mdi-view-list"></i>
									<span>Lịch hẹn</span>
								</div>
								<div class="short">
									<i class="mdi mdi-numeric-9-plus-box-multiple-outline"></i>
									<span>Tạo nhóm</span>
								</div>
								<div class="short">
									<i class="mdi mdi-settings"></i>
									<span>Cài đặt</span>
								</div>
								<div class="short">
									<i class="mdi mdi-chart-bar"></i>
									<span>Thống kê</span>
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
							<div >
								<div class="row">
									<div class="col-md-4 stretch-card grid-margin">
										<div class="card bg-gradient-success card-img-holder text-white">
											<div class="card-body">
												<h4 class="font-weight-normal mb-3">
													KH mới
													<i class="mdi mdi-chart-line mdi-24px float-right"></i>
												</h4>
												<h2 class="mb-5">$ 15,0000</h2>
												<h6 class="card-text">Increased by 60%</h6>
											</div>
										</div>
									</div>
									<div class="col-md-4 stretch-card grid-margin">
										<div class="card bg-gradient-info card-img-holder text-white">
											<div class="card-body">
												<h4 class="font-weight-normal mb-3">
													Hẹn lịch
													<i class="mdi mdi-bookmark-outline mdi-24px float-right"></i>
												</h4>
												<h2 class="mb-5">45,6334</h2>
												<h6 class="card-text">Decreased by 10%</h6>
											</div>
										</div>
									</div>
									<div class="col-md-4 stretch-card grid-margin">
										<div class="card bg-gradient-warning card-img-holder text-white">
											<div class="card-body">
												<h4 class="font-weight-normal mb-3">
													Đang tư vấn
													<i class="mdi mdi-diamond mdi-24px float-right"></i>
												</h4>
												<h2 class="mb-5">95,5741</h2>
												<h6 class="card-text">Increased by 5%</h6>
											</div>
										</div>
									</div>
                  <div class="col-md-4 stretch-card grid-margin">
										<div class="card bg-gradient-danger card-img-holder text-white">
											<div class="card-body">
												<h4 class="font-weight-normal mb-3">
													KH từ chối
													<i class="mdi mdi-diamond mdi-24px float-right"></i>
												</h4>
												<h2 class="mb-5">95,5741</h2>
												<h6 class="card-text">Increased by 5%</h6>
											</div>
										</div>
									</div>
                  <div class="col-md-4 stretch-card grid-margin">
										<div class="card bg-gradient-primary card-img-holder text-white">
											<div class="card-body">
												<h4 class="font-weight-normal mb-3">
													CS sau bán
													<i class="mdi mdi-diamond mdi-24px float-right"></i>
												</h4>
												<h2 class="mb-5">95,5741</h2>
												<h6 class="card-text">Increased by 5%</h6>
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
				<div class="col-lg-6 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">Lịch hẹn</h4>
                    <p class="card-description">
                    </p>
                    <table class="table">
                      <thead>
                        <tr>
                          <th>Profile</th>
                          <th>VatNo.</th>
                          <th>Created</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Jacob</td>
                          <td>53275531</td>
                          <td>12 May 2017</td>
                          <td><label class="badge badge-danger">Pending</label></td>
                        </tr>
                        <tr>
                          <td>Messsy</td>
                          <td>53275532</td>
                          <td>15 May 2017</td>
                          <td><label class="badge badge-warning">In progress</label></td>
                        </tr>
                        <tr>
                          <td>John</td>
                          <td>53275533</td>
                          <td>14 May 2017</td>
                          <td><label class="badge badge-info">Fixed</label></td>
                        </tr>
                        <tr>
                          <td>Peter</td>
                          <td>53275534</td>
                          <td>16 May 2017</td>
                          <td><label class="badge badge-success">Completed</label></td>
                        </tr>
                        <tr>
                          <td>Dave</td>
                          <td>53275535</td>
                          <td>20 May 2017</td>
                          <td><label class="badge badge-warning">In progress</label></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div class="col-lg-6 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">Khách hàng phụ trách mới</h4>
                    <p class="card-description"> Add class <code>.table-hover</code>
                    </p>
                    <table class="table table-hover">
                      <thead>
                        <tr>
                          <th>User</th>
                          <th>Product</th>
                          <th>Sale</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Jacob</td>
                          <td>Photoshop</td>
                          <td class="text-danger"> 28.76% <i class="mdi mdi-arrow-down"></i></td>
                          <td><label class="badge badge-danger">Pending</label></td>
                        </tr>
                        <tr>
                          <td>Messsy</td>
                          <td>Flash</td>
                          <td class="text-danger"> 21.06% <i class="mdi mdi-arrow-down"></i></td>
                          <td><label class="badge badge-warning">In progress</label></td>
                        </tr>
                        <tr>
                          <td>John</td>
                          <td>Premier</td>
                          <td class="text-danger"> 35.00% <i class="mdi mdi-arrow-down"></i></td>
                          <td><label class="badge badge-info">Fixed</label></td>
                        </tr>
                        <tr>
                          <td>Peter</td>
                          <td>After effects</td>
                          <td class="text-success"> 82.00% <i class="mdi mdi-arrow-up"></i></td>
                          <td><label class="badge badge-success">Completed</label></td>
                        </tr>
                        <tr>
                          <td>Dave</td>
                          <td>53275535</td>
                          <td class="text-success"> 98.05% <i class="mdi mdi-arrow-up"></i></td>
                          <td><label class="badge badge-warning">In progress</label></td>
                        </tr>
                      </tbody>
                    </table>
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

	export default {
		components: {
			Menu,
			NavBar,
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
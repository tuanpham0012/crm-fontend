<template>
  <div class="card-content">
    <div class="contact-container">
      <p class="title">Danh sách cuộc gọi</p>
      <div class="table-responsive">
        <table class="table table-hover table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Người liên hệ</th>
              <th>SDT liên hệ</th>
              <th>Trạng thái</th>
              <th>Thời gian</th>
              <th>Nội dung</th>
              <th>Ghi âm</th>
              <th>Ghi chú</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td scope="row">Jacob</td>
              <td>53275531</td>
              <td>12 May 2017</td>
              <td>
                <label class="badge badge-danger">Pendingwdwdwdwdwdwd</label>
              </td>
              <td>Jacob</td>
              <td>53275531</td>
              <td>12 May 2017</td>
              <td>
                <label class="badge badge-danger">Pendingwdwddwdwdwdwdwd</label>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
td {
  padding: 0.4rem 0.7rem;
}
.contact-container {
  background-color: rgb(255, 255, 255);
  width: 100%;
  padding: 1rem 0.8rem;
  border-radius: 5px;
}
.title {
  font-weight: 600;
  margin-bottom: 0.5rem;
}
</style>

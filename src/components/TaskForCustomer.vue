<template>
  <TaskDetailModal
    :taskInfo="taskInfo"
    :staffs="staffs"
    :id="id"
    @close-modal="toggleModalDetail()"
    @reload="load()"
    v-if="modalTaskDetail"
  />
  <div class="card-content">
    <div class="customer-task">
      <div class="input-group form-search">
              <input
                type="text"
                class="form-control form-control-sm"
                v-model="search_task"
                placeholder="Tìm tên công việc"
              />
							<i class="mdi mdi-close" v-if="search_task.length > 0" @click="toggleRefeshSearch()"></i>
              <div class="input-group-append">
                <button
                  class="btn btn-sm btn-gradient-info form-control-sm"
                  @click="toggleSearchTaskName(search_task)"
                  type="button"
                >
                  Tìm kiếm
                </button>
              </div>
      </div>
      <div class="select-task">
        <ul>
          <li :class="{ active: tabIndex == 1 }" @click="changeTask(1)">
            Đang thực hiện
          </li>
          <li :class="{ active: tabIndex == 2 }" @click="changeTask(2)">
            Chậm
          </li>
          <li :class="{ active: tabIndex == 3 }" @click="changeTask(3)">Mới</li>
          <li :class="{ active: tabIndex == 4 }" @click="changeTask(4)">
            Công việc của tôi
          </li>
          <li :class="{ active: tabIndex == 5 }" @click="changeTask(5)">
            Đã hoàn thành
          </li>
        </ul>
      </div>
      <div class="table-responsive">
        <table class="table table-hover table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Tên công việc</th>
              <th>Trạng thái</th>
              <th>Người tạo</th>
              <th>Loại công việc</th>
              <th>Ngày tạo</th>
            </tr>
          </thead>
          <tbody v-if="tasksDefault && tasksDefault.length > 0">
            <tr
              v-for="(task, index) in tasksDefault"
              :key="index"
              @click="toggleModalDetail(task.id)"
            >
              <td>
                {{ index + 1 }}
              </td>
              <td class="task-name">
                {{ task.name }}
              </td>
              <td>
                {{ task.task_status.status }}
              </td>
              <td>
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
            <td colspan="7" class="blank-task">
              <img src="../assets/images/blank-task.png" />
            </td>
          </tbody>
        </table>
        <div class="view-more" v-if="tasks && tasks.length >= total">
          <button
            type="button"
            v-if="!loadMore"
            class="btn btn-sm btn-gradient-info"
            @click="toggleLoadMore(moreSize)"
          >
            xem thêm
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
            Loading...
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TaskDetailModal from "../components/TaskDetailModal.vue";
import moment from "moment/min/moment-with-locales";
moment.locale("vi");

export default {
  props: {
    tasks: {
      type: Array,
      default: function () {
        return null;
      },
    },
  },
  components: {
    TaskDetailModal,
  },
  data() {
    return {
      tasksProps: this.tasks,
      tabIndex: 1,
      total: 20,
      moreSize: 10,
      loadMore: false,
      type_id: -1,
      tasksDefault: null,
      modalTaskDetail: false,
      search_task: "",
    };
  },
  computed: {
    tasksNow() {
      return this.tasksProps
        ? this.tasksProps.filter(
            (x) => x.task_status_id == 3 || x.task_status_id == 2
          )
        : null;
    },
    taskSlow() {
      return this.tasksProps
        ? this.tasksProps.filter((x) => x.task_status_id == 3)
        : null;
    },
    tasksNew() {
      return this.tasksProps
        ? this.tasksProps.filter((x) => x.task_status_id == 1)
        : null;
    },
    tasksFinish() {
      return this.tasksProps
        ? this.tasksProps.filter(
            (x) => x.task_status_id == 4 || x.task_status_id == 5
          )
        : null;
    },
    myTask() {
      return this.tasksProps
        ? this.tasksProps.filter(function (x) {
            return x.task_user.filter((e) => e.user_id == this.id).length > 0;
          })
        : null;
    },
    id() {
      return this.$store.state.userInfo.id;
    },
    taskInfo() {
      return this.$store.state.taskInfo;
    },
    staffs() {
      return this.$store.state.baseData ? this.$store.state.baseData.staff : null;
    },
  },
  watch: {
    tasksProps() {
      this.changeTask(this.tabIndex);
    },
  },
  created() {
    this.changeTask(1);
  },
  methods: {
    toggleSearchTaskName(search){
      this.tasksProps = this.tasks.filter( (x) => x.name.toLowerCase().includes(search.toLowerCase()));
    },
    toggleRefeshSearch(){
      this.toggleSearchTaskName('');
      this.search_task = "";
      console.log(this.search_task);
    },
    toggleLoadMore(value) {
      this.loadMore = true;
      setTimeout(() => {
        this.total = this.total + value;
        this.loadMore = false;
      }, 500);
      console.log(this.total);
    },
    dateTime(value) {
      return moment(value).utc().format("HH:mm:ss DD-MM-YYYY");
    },
    toggleModalDetail(value) {
      if (value) {
        this.$store.dispatch("getTaskInfo", { id: value, upload: true });
      }
      this.modalTaskDetail = !this.modalTaskDetail;
    },
    emitModalTaskInfo(id) {
      this.$emit("toggleTask", id);
    },
    load() {
      this.$store.dispatch("getCustomerInfo", {
        id: this.$route.params.id,
        upload: false,
      });
    },
    changeTask(index) {
      switch (index) {
        case 1:
          this.tasksDefault = this.tasksNow;
          this.tabIndex = index;
          break;
        case 2:
          this.tasksDefault = this.taskSlow;
          this.tabIndex = index;
          break;
        case 3:
          this.tasksDefault = this.tasksNew;
          this.tabIndex = index;
          break;
        case 4:
          this.tasksDefault = this.myTask;
          this.tabIndex = index;
          break;
        case 5:
          this.tasksDefault = this.tasksFinish;
          this.tabIndex = index;
          break;
        default:
          this.tasksDefault = this.tasksNow;
          this.tabIndex = 1;
          break;
      }
    },
  },
};
</script>
<style scoped>
.table th img,
.table td img {
  border-radius: 0;
}
.task-name {
  min-width: 15rem;
}
.table tr {
  cursor: pointer;
}
.view-more {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  margin-bottom: 1rem;
}
.blank-task {
  text-align: center;
}
.blank-task img {
  width: 20rem;
  height: 20rem;
}
.customer-task{
  background-color: #ffffff;
  padding: 0.5rem;
  border-radius: 5px;
  position: relative;
}
.select-task {
  height: max-content;
  border-bottom: 1px rgb(255, 145, 0) solid;
  margin-bottom: 0.6rem;
  color: blue;
  
}
.select-task ul {
  margin: 0 0 0.5rem 0;
}
.select-task ul li {
  display: inline;
  padding: 0.65rem 0.8rem;
  margin: 0.3rem;
}
.select-task ul li:hover {
  cursor: pointer;
  background-color: rgb(247, 244, 241);
  border-bottom: 2px sandybrown solid;
}
.card-content {
  background-color: #f2edf3;
  padding: 0.5rem;
}
.active {
  color: rgb(255, 94, 0);
  border-bottom: 3px solid rgb(255, 94, 0);
  pointer-events: none;
}
.form-search{
  margin: 0.5rem 0 1rem 1rem;
  position: relative;
}
.form-search i{
  position: absolute;
  top: 26%;
  right: 26%;
  cursor: pointer;
}
.form-search i:hover{
  color: rgb(121, 95, 95);
  transform: scale(1.1);
}
</style>

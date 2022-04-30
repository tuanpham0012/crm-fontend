<template>
  <div>
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
          <tr
            v-for="(task, index) in tasks"
            :key="index"
            @click="emitModalTaskInfo(task.id)"
          >
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
</template>
<script>
import moment from "moment/min/moment-with-locales";
moment.locale("vi");

export default {
  props: {
    tasksProps: {
      type: Array,
      default: function () {
        return null;
      },
    },
    types: {
      type: Array,
      default: function () {
        return null;
      },
    },
  },
  data() {
    return {
      total: 20,
      moreSize: 10,
      loadMore: false,
      type_id: -1,
    };
  },
  computed: {
    tasks() {
      return this.tasksProps ? this.tasksProps.slice(0, this.total) : null;
    },
  },
  watch: {
  },
  methods: {
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
    emitModalTaskInfo(id) {
      this.$emit("toggleTask", id);
    }
  },
};
</script>
<style scoped>
.table th img,
.table td img {
  border-radius: 0;
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
</style>

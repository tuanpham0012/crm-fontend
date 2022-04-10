<template lang="">
  <div class="card-content">
    <div class="note-container">
      <div class="note-editor">
        <QuillEditor
          toolbar="essential"
          theme="snow"
          v-model:content="note"
          contentType="html"
        />
      </div>
      <div class="btn-send">
        <button
          type="button"
          @click="create_note()"
          class="btn btn-sm btn-gradient-info"
        >
          Gửi
        </button>
      </div>
      
    </div>
    <div class="notes" v-if="customer && customer.customer_notes.length > 0">
      <Note
        v-for="(note, index) in customer.customer_notes"
        :key="index"
        :note="note"
        :id="id_note"
        @mouseover="id_note = note.id"
        @mouseleave="id_note = -1"
        @update_note="loadPage()"
      />
    </div>
  </div>
</template>
<script>
import axios from "redaxios";
import * as url from "../config";

import Note from "./CustomerNote.vue";

export default {
  props:{
    // customer_notes:{
    //   type: Object,
    //   default() {
    //     return null;
    //   }
    // }
    id:{
      type: [String, Number],
    }
  },
  components: {
    Note,
  },
  data() {
    return {
      note: "",
      id_note: -1,
    };
  },
  computed: {
    customer() {
      return this.$store.state.customer;
    },
  },
  watch:{
  },
  mounted() {
    this.loadPage(this.id);
  },
  methods: {
    loadPage(id) {
      this.$store.dispatch("getCustomerInfo", { id:  id});
    },
    async create_note() {
      if (this.note.length == 0) {
        cuteToast({
          type: "error",
          message: "Thông tin ghi chú trống!",
          timer: 5000,
        });
      } else {
        await axios({
          method: "POST",
          url: url.customer.CUSTOMER_NOTES,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            Accept: "application/json",
          },
          data: {
            user_id: this.$store.state.userInfo.id,
            customer_id: this.customer.id,
            content: this.note,
          },
        })
          .then((res) => {
            this.loadPage(this.id);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
};
</script>
<style scoped>
.notes {
  margin: 1.5rem 0 0.5rem;
  border-radius: 5px;
}
.note-container{
  background-color: #ffffff;
  padding: 0.5rem 0.5rem 0 0.5rem;
  border-radius: 5px;
  margin-bottom: 1rem;
}
.note-editor {
  height: 12rem;
  background-color: #ffffff;
  padding: 0.5rem 0.5rem 5rem 0.5rem;
}
.note-container .btn {
  margin: 0.3rem;
  right: 2rem;
}
.btn-send{
  width: 100%;
  padding: 0.2rem 0.5rem;
  display: flex;
  justify-content: flex-end;
}
.hide {
  display: block;
}
.card-content{
  background-color: #f2edf3;
  padding: 0.5rem;
}
</style>

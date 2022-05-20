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
    <div class="notes" v-if="notes && notes.length > 0">
      <Note
        v-for="(note, index) in notes"
        :key="index"
        :note="note"
        :id="id_note"
        @mouseover="id_note = note.id"
        @mouseleave="id_note = -1"
        @update_note="loadPage()"
        @updateNote="updateNote"
        @deleteNote="deleteNote"
      />
      <div class="view-more" v-if="notes && notes.length >= total">
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
import axios from "redaxios";
import * as url from "../config";

import Note from "./NoteComponent.vue";

export default {
  props:{
    notesProps:{
      type: Array,
      default() {
        return null;
      }
    },
    customer_id:{
      type:[String, Number],
    }
  },
  components: {
    Note,
  },
  data() {
    return {
      note: "",
      id_note: -1,
      loading: false,
      total: 15,
      moreSize: 10,
      loadMore: false,
    };
  },
  computed:{
    notes(){
      return this.notesProps ? this.notesProps.slice(0, this.total) : null;
    }
  },
  watch:{
  },
  methods: {
    toggleLoadMore(value) {
      this.loadMore = true;
      setTimeout(() => {
        this.total = this.total + value;
        this.loadMore = false;
      }, 500);
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
            customer_id: this.customer_id,
            content: this.note,
          },
        })
          .then((res) => {
            console.log(res.data);
            cuteToast({
              type: 'success',
              message: res.data.message,
              timer: 3000,
            });
            this.$store.dispatch("getCustomerInfo", { id: res.data.customer_id, upload: false });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    async updateNote(id, content){
      await axios({
        method: 'PATCH',
        url: url.customer.CUSTOMER_NOTES + id,
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          'Accept': 'application/json'
        },
        data: {
          content: content,
        }
      }).then(res =>{
        console.log(res.data);
        this.$store.dispatch("getCustomerInfo", { id: this.customer_id, upload: false});
      }).catch(err =>{
        console.log(err);
      })
    },
    async deleteNote(id){
      this.notes.splice( this.notes.findIndex(x => x.id == id), 1 );
      await axios({
        method: 'DELETE',
        url: url.customer.CUSTOMER_NOTES + id,
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          'Accept': 'application/json'
        },
      }).then(res =>{
        console.log(res.data);
        this.$store.dispatch("getCustomerInfo", { id: this.customer_id, upload: false});
      }).catch(err =>{
        console.log(err);
      })
    }
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

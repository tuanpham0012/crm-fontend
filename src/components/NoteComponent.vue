<template>
  <div
    class="note"
    v-if="note"
  >
    <img
      src="https://static2.yan.vn/YanNews/202005/202005220338210409-bee6f138-0608-4d56-bce3-27148a855654.png"
    />
    <div class="note-card">
      <div class="note-title">
        <p class="note-name">{{ note.user.name }}</p>
        <span class="note-time">{{ dateTime(note.created_at) }}</span>
      </div>
      <div class="note-content">
        <span v-html="note.content" v-if="!edit"> </span>
        <QuillEditor
                    toolbar="essential"
                    theme="snow"
                    v-model:content="content"
                    contentType="html"
                    v-else
                  />
      </div>
    </div>
    <div class="action" v-if="id == note.id">
      <div class="note-action" v-if="!edit">
        <button type="button" class="btn btn-icon btn-react" @click="toggleEdit()"><i class="mdi mdi-heart"></i></button>
        <div class="btn-edit" v-if="note.user_id == user_id">
          <button type="button" class="btn btn-icon btn-action" @click="toggleEdit()"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
          <button type="button" class="btn btn-icon btn-action" @click="toggleDelete(note.id)"><i class="mdi mdi-delete-forever"></i></button>
        </div>
        
      </div>
      <div v-else>
        <button type="button" class="btn btn-sm btn-outline-info" @click="updateNote(note.id)">Cập nhật</button>
        <button type="button" class="btn btn-sm btn-outline-link" @click="toggleEdit()">Hủy</button>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment/min/moment-with-locales';
moment.locale('vi');
import axios from 'redaxios';
import * as url from '../config'
export default {
  props: {
    id: {
      type: [String, Number],
    },
    note:{
      type: Object,
      default: function(){
        return null;
      }
    }
  },
  computed:{
    user_id(){
      return this.$store.state.userInfo.id;
    }
  },
  data() {
    return {
      edit: false,
      content: '',
      res: ''
    }
  },
  methods: {
    dateTime(value) {
      return moment(value).startOf().fromNow();
    },
    toggleEdit(){
      this.edit = !this.edit;
      if(this.edit){
        this.content = this.note.content;
      }else{
        this.content = '';
      }
    },
    updateNote(id){
      this.$emit('updateNote', id, this.content);
      this.note.content = this.content;
      this.edit = false;
    },
    toggleDelete(id){
      cuteAlert({
        type: "question",
        title: "Xóa ghi chứ",
        message: "Bạn có chắc chắn muốn xóa?",
        confirmText: "Xác nhận",
        cancelText: "Hủy",
      }).then( (e) =>{
        if(e){
          this.$emit('deleteNote', id);
        }
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
.note {
  padding: 0.5rem;
  display: flex;
  background-color: #ffffff;
  margin: 0.8rem 0;
  border-radius: 5px;
}
.note img {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  margin: 0 0.5rem;
}
.note-card {
  background-color: rgb(242, 245, 248);
  padding: 0 0.5rem 0.8rem 0.8rem;
  border-radius: 12px;
  max-width: 55%;
}
.note-title {
  display: flex;
  align-items: center;
  padding: 0.5rem 0.2rem;
}
.note-title span {
  font-size: 0.9rem;
  font-style: italic;
  color: rgb(112, 114, 114);
  margin: 0 0.5rem;
}
.note-title .note-name {
  margin: 0;
  font-size: 1rem;
  font-weight: 550;
}
.action{
  display: flex;
  align-items: flex-end;
}
.note-action {
  display: flex;
  position: absolute;
  right: 1em;
  align-items: flex-end;
  margin: 0rem 1rem;
}
.note-action button {
  background-color: #ffffff;
  margin: 0.2rem ;
  border-radius: 50%;
  align-content: center;
  font-size: 1rem;
}
.note-action .btn-action:hover {
  transform: scale(1.2);
  color: rgb(16, 16, 241);
  background-color: aliceblue;

}
.note-action .btn-react:hover{
  transform: scale(1.2);
  color: rgb(255, 0, 0);
}
.dropdown-item:hover{
  background-color: rgb(239, 245, 245);
  color: black;
}
.btn{
  margin: 0 0.5rem;
}
</style>

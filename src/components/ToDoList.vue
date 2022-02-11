<template>
	<div class="to-do-list" v-if="$store.state.showToDoList">
    <div class="header">
      <h3 class="title">Công việc</h3>
      <div class="close" @click="toggleToDoList()"><i class="mdi mdi-close"></i></div>
      <div class="add" @click="toggleAdd()"><i class="mdi mdi-playlist-plus"></i></div>
    </div>
    <div class="add-to-do" v-if="add">
      <input type="text" class="ip-add"/>
      <div class="action">
          <button type="button" class="btn btn-icon"><i class="mdi mdi-check"></i></button>
          <button type="button" @click="toggleAdd()" class="btn btn-icon"><i class="mdi mdi-close"></i></button>
      </div>
    </div>
    <div class="list">
      <div class="item" v-for="toDo in toDos" :key="toDo.id">
        <div class="content">
          <input type="checkbox" :id="toDo.id" v-model="toDo.done"/>
          <label class="work" :class="{'done' : toDo.done}" :for="toDo.id">{{ toDo.name }}</label>
        </div>
        <div class="action">
          <button type="button" class="btn btn-icon"><i class="mdi mdi-auto-fix"></i></button>
          <button type="button" class="btn btn-icon"><i class="mdi mdi-delete"></i></button>
        </div>
      </div>
      
    </div>
  </div>
</template>
<script>
import { mapMutations} from 'vuex'
	export default {
    data() {
      return {
        add: false,
        toDos:[
          {id: 1,name: 'Đi chơi', done: false},
          {id: 2,name: 'Đi ăn', done: false},
          {id: 3,name: 'Nấu cơm', done: true},
          {id: 4,name: 'Đi chơi', done: false},
          {id: 5,name: 'Đi chơi', done: true},
          {id: 6,name: 'Đi chơi', done: false},
          {id: 7,name: 'Đi chơi', done: false},
          {id: 8,name: 'Đi chơi', done: false},
          {id: 8,name: 'Đi chơi', done: false},
          {id: 8,name: 'Đi chơi', done: false},
          {id: 8,name: 'Đi chơi', done: false},
          {id: 8,name: 'Đi chơi', done: false},
          
        ]
      }
    },
    methods: {
      toggleAdd(){
        this.add = !this.add;
      },
      ...mapMutations(['toggleToDoList']),
    },
  };
</script>
<style scoped>
.add-to-do{
  display: flex;
  justify-content: space-between;
  justify-items: center;
  padding: 0.5rem 0;
}
.ip-add{
  width: 73%;
  border: none;
  border-bottom: 1px gainsboro solid;
  margin: 0 0.4rem;
}
	.to-do-list {
		position: fixed;
		float: left;
		top: 13%;
		right: 0;
		width: 25rem;
		height: 33rem;
		background-color: rgb(255, 255, 255);
		z-index: 1020;
		animation: 0.3s ease-out 0s 1 slideInFromRight;
    border: none;
    border-radius: 6px 0 0 6px;
    box-shadow: 0px 3px 21px 10px rgb(0 0 0 / 20%);
	}

  .title{
    font-size: 1rem;
    margin: 0 0.3rem;
    padding: 0.8rem 0 0.8rem 1rem;
    border-bottom: 1px rgb(218, 218, 224) solid;
  }
  .close{
    position: absolute;
    top: 0.567rem;
    right: 0.5rem;
    cursor: pointer;
  }
  .add{
    position: absolute;
    top: 0.567rem;
    right: 2.5rem;
    cursor: pointer;
    font-size: 1.5rem;
    color: rgb(139, 134, 134);
  }
  .add:hover{
    color: black;
  }
  .list{
    margin:0.1rem;
    width: 100%;
    background-color: rgb(255, 255, 255);
    overflow: auto;
    height: 85%;
  }
  .item{
    display: flex;
    justify-content: space-between;
    padding: 0.78rem 0.5rem;
    padding-left: 1rem;
    border-bottom: 1px rgb(236, 226, 226) solid;
    width: 100%;
  }
  .item:hover{
    background-color: rgb(240, 241, 247);
  }
  .content{
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: flex-start;
  }
  .work{
    font-size: 1rem;
    margin-left: 0.5rem;
    margin-bottom: 0rem;
    cursor: pointer;
    inline-size: 18rem;
    overflow-wrap: break-word;
  }
  .done{
    text-decoration: line-through;
  }
  .btn-icon{
    width: 1.5rem;
    height: 1.5rem;
    padding: 0.2rem;
    margin: 0 0.15rem;
  }
  .btn-icon:hover{
    transform: scale(1.2);
    color: rgba(4, 0, 252, 0.808);
  }

</style>
<template>
  <div>
    <input
      type="text"
      class="form-control"
      v-model="name"
      @keyup="searchName(name)"
      @focus="openListSelect = true"
    />
    <span
      class="ic-dropdown"
      :class="{ 'open' : openListSelect }"
      @click="toggleOpenListSelect()"
      ><i class="mdi mdi-chevron-right"></i
    ></span>
    <div class="list-select" :class="{ 'show' : openListSelect }">
      <ul>
        <li
          v-for="(data, i) in datas"
          :key="i"
          :class="{
            selected: data && data.id == id,
          }"
          @click="toggleOpenListSelect(data)"
        >
        <div class="item">
          <img :src=" avatar_link(data.avatar) || 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'" alt="" />
          <span>{{ data.name }}</span>
        </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import * as url from "../config";
export default {

  props: {
    listProps: {
      type: Array,
      default: function () {
        return null;
      },
    },
  },
  data() {
    return {
      id: null,
      name: '',
      openListSelect: false,
      datas: null,
    };
  },
  created() {
    if(this.listProps){
      this.datas = this.listProps
    }
  },
  methods: {
    toggleOpenListSelect(value) {
      this.openListSelect = !this.openListSelect;
      if (value) {
        this.id = value.id;
        this.name = value.name;
        this.$emit('returnData', value);
      }
    },
    searchName(key){
      this.datas = this.listProps
        ? this.listProps.filter((x) =>
            x.name.toLowerCase().includes(key.toLowerCase())
          )
        : null;
    },
    avatar_link(value){
      if(value){
        return url.server_url + value;
      }else{
        return null;
      }
    },
  },
};
</script>
<style scoped>
.item{
  display: flex;
  align-items: center;
}
.item img{
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  margin: 0.4rem;
}
.list-select {
  background-color: #fdfdfd;
  padding: 0.2rem 0rem;
  max-height: 15rem;
  overflow: auto;
  position: absolute;
  top: 3rem;
  width: 93%;
  right: 1rem;
  z-index: 999999;
  visibility: hidden;
  opacity: 0;
   -moz-transition: opacity 250ms linear, visibility 0s linear 250ms;
  -o-transition: opacity 250ms linear, visibility 0s linear 250ms;
  -webkit-transition: opacity 250ms linear, visibility 0s linear;
  -webkit-transition-delay: 0s, 250ms;
  transition: opacity 250ms linear, visibility 0s linear 250ms;
}
.show{
  visibility: visible;
  opacity: 1;
   -moz-transition: opacity 250ms linear, visibility 0s linear;
  -o-transition: opacity 250ms linear, visibility 0s linear;
  -webkit-transition: opacity 250ms linear, visibility 0s linear;
  transition: opacity 250ms linear, visibility 0s linear;
}
.list-select li {
  padding: 0 0.85rem;
  cursor: pointer;
}
.list-select li:hover {
  background-color: #90bdf8;
  color: #ffffff;
}
.ic-dropdown {
  position: absolute;
  top: 0.45rem;
  right: 1.875rem;
  font-size: 1.65rem;
  cursor: pointer;

  transition: transform 0.2s ease-in-out;
}
.open {
  transform: rotate(90deg);
}
.selected {
  background-color: #5d9ce9;
  color: #ffffff;
  pointer-events: none;
}
</style>

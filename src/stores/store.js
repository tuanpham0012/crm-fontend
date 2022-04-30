import { createStore } from 'vuex';
import axios from 'redaxios';
import * as url from '../config';

const store = createStore({
    state () {
      return {
        loading: false,
        showToDoList: false,
        isShowModal: false,

        userInfo: null,
        baseData: null,
        customers: null,
        customer: null,
        myCustomerList: null,
        departments: null,
        tasks: null,
        taskInfo: null,
      }
    },
    getters:{
        getInfo(state){
          return state.userInfo;
        },
        getToken(state){
            if(state.userInfo)
                return state.userInfo.token;
            else
                return null;
        }
    },
    mutations: {
      setInfo (state, info) {
        state.userInfo = info;
      },
      toggleToDoList(state){
        state.showToDoList = !state.showToDoList;
      },
      setListDepartment(state, listDepartment){
        state.departments = listDepartment;
      },
      setBaseData(state, data){
        state.baseData = data;
      },
      setListCustomer(state, listCustomer){
        state.customers = listCustomer;
      },
      setCustomerInfo(state, customerPayload){
        state.customer = customerPayload;
      },
      setMyCustomerList(state, customerPayload){
        state.myCustomerList = customerPayload;
      },
      setTaskList(state, tasks){
        state.tasks = tasks;
      },
      setTaskInfo(state, task){
        state.taskInfo = task;
      },
      isLoading(state, value){
        state.loading = value;
      },
      showModal(state, value){
        state.isShowModal = value;
      }
    },
    actions:{
      async getInfo({ commit}, {token}){
        await axios({
          url: url.user.USER_INFO,
          method: 'get',
          headers: {'Authorization': 'Bearer ' + token,
                    'Accept': 'application/json'}
        }).then( res => {
          console.log(res.data);
          commit('setInfo', res.data);
        }).catch( err => {
          console.log(err);
        })
      },
      async getListDepartment({ commit}){
        await axios({
          url: url.departments.BASE,
          method: 'get',
          headers: {'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'Accept': 'application/json'}
        }).then( res => {
          console.log(res.data);
          commit('setListDepartment', res.data);
        }).catch( err => {
          console.log(err);
        })
      },
      async getBaseData({ commit}){
        await axios({
          url: url.home.GET_BASE_DATA,
          method: 'get',
        }).then( res => {
          console.log(res.data);
          commit('setBaseData', res.data);
        }).catch( err => {
          console.log(err);
        })
      },
      async getCustomerInfo({ commit}, { id, upload}){
        if(upload){
          commit('isLoading', true);
          commit('setCustomerInfo', null);
        }
        await axios({
          method: 'GET',
          url: url.customer.SHOW + id,
          headers: {'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'Accept': 'application/json'}
        }).then(res => {
          console.log(res.data);
          commit('setCustomerInfo', res.data)
          commit('isLoading', false);
        }).catch(err => {
          console.log(err);
          commit('isLoading', false);
        })
      },
      async getListCustomer({commit},{ page, search, type}){
        commit('isLoading', true)
        await axios({
          method: 'POST',
          url : url.customer.BASE + page,
          headers:{
              'Authorization': 'Bearer ' + localStorage.getItem('token'),
              'Accept': 'application/json'
            },
            data:{
              search: search,
              type: type,
            }
        }).then(res => {
          console.log(res.data);
          commit('setListCustomer', res.data);
        }).catch(err => {
          console.log(err);
        })
        commit('isLoading', false)
      },
      async getMyCustomerList({commit},{ page, search, type}){
        commit('isLoading', true)
        await axios({
          method: 'POST',
          url : url.customer.MY_CUSTOMER,
          headers:{
              'Authorization': 'Bearer ' + localStorage.getItem('token'),
              'Accept': 'application/json'
            },
          data:{
            search: search,
            type: type,
          }
        }).then(res => {
          console.log(res.data);
          commit('setMyCustomerList', res.data);
        }).catch(err => {
          console.log(err);
        })
        commit('isLoading', false)
      },
      async getTasks({commit}, {search} ){
        commit('isLoading', true)
        await axios({
          method: 'POST',
          url : url.tasks.BASE,
          headers:{
              'Authorization': 'Bearer ' + localStorage.getItem('token'),
              'Accept': 'application/json'
            },
          data:{
            search: search,
          }
        }).then( res =>{
          console.log(res.data);
          commit('setTaskList', res.data);
        }).catch( err =>{
          console.log(err);
        })
        commit('isLoading', false)
      },
      async getTaskInfo({commit}, {id, upload} ){
        if(upload){
          commit('isLoading', true)
          commit('setTaskInfo', null);
        }
        await axios({
          method: 'GET',
          url : url.tasks.SHOW + id,
          headers:{
              'Authorization': 'Bearer ' + localStorage.getItem('token'),
              'Accept': 'application/json'
            },
        }).then( res =>{
          console.log(res.data);
          commit('setTaskInfo', res.data);
        }).catch( err =>{
          console.log(err);
        })
        commit('isLoading', false)
      }
    }
  })

export default store
import { createStore } from 'vuex';
import axios from 'redaxios';
import * as url from '../config';

const store = createStore({
    state () {
      return {
        loading: false,
        showToDoList: false,
        userInfo: null,
        typeOfCustomer: null,
        customers: null,
        customer: null,
        myCustomerList: null,
        departments: null,
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
      setTypeCustomer(state, type){
        state.typeOfCustomer = type;
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
      isLoading(state, value){
        state.loading = value;
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
      async getTypeCustomer({ commit}){
        await axios({
          url: url.customer.GET_TYPE,
          method: 'get',
          headers: {'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'Accept': 'application/json'}
        }).then( res => {
          commit('setTypeCustomer', res.data);
        }).catch( err => {
          console.log(err);
        })
      },
      async getCustomerInfo({ commit}, { id }){
        commit('isLoading', true);
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
          commit('isLoading', false)
        }).catch(err => {
          console.log(err);
        })
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
          commit('isLoading', false)
        }).catch(err => {
          console.log(err);
        })
      },
    }
  })

export default store
import { createStore } from 'vuex';
import axios from 'redaxios';
import {user, customer} from '../config';

const store = createStore({
    state () {
      return {
        showToDoList: false,
        userInfo: null,
        typeOfCustomer: null,
        customers: null,
        customer: null,
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
      setTypeCustomer(state, type){
        state.typeOfCustomer = type;
      },
      setListCustomer(state, listCustomer){
        state.customers = listCustomer;
      },
      setCustomerInfo(state, customerPayload){
        state.customer = customerPayload;
      } 
    },
    actions:{
      async getInfo({ commit}, {token}){
        await axios({
          url: user.USER_INFO,
          method: 'get',
          headers: {'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'Accept': 'application/json'}
        }).then( res => {
          commit('setInfo', res.data);
        }).catch( err => {
          console.log(err);
        })
      },
      async getTypeCustomer({ commit}){
        await axios({
          url: customer.GET_TYPE,
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
        await axios({
          method: 'GET',
          url: customer.BASE + id,
          headers: {'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'Accept': 'application/json'}
        }).then(res => {
          commit('setCustomerInfo', res.data)
        }).catch(err => {
          console.log(err);
        })
      },
      async getListCustomer({commit}){
        await axios({
          method: 'GET',
          url : customer.BASE,
          headers:{
              'Authorization': 'Bearer ' + localStorage.getItem('token'),
              'Accept': 'application/json'
            },
            data:{
              name: '',
              email: '',
              phone: '',
            }
        }).then(res => {
          commit('setListCustomer', res.data);
        }).catch(err => {
          console.log(err);
        })
      }
    }
  })

export default store
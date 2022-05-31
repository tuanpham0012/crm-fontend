import { createStore } from 'vuex';
import axios from 'redaxios';
import * as url from '../config';

const store = createStore({
    state () {
      return {
        loading: false,
        showToDoList: false,
        showNotification: false,
        isShowModal: false,

        notifications: null,
        userInfo: null,
        baseData: null,
        staffs: null,
        staff: null,
        customers: null,
        customer: null,
        myCustomerList: null,
        departments: null,
        staffDepartment: null,
        tasks: null,
        taskInfo: null,
        projects: null,
        projectDetail: null,
      }
    },
    getters:{
        getInfo(state){
          return state.userInfo;
        },
        getID(state){
          return state.userInfo ? state.userInfo.id : null;
        },
        getToken(state){
            if(state.userInfo)
                return state.userInfo.token;
            else
                return null;
        },
        getDepartmentID(state){
          return state.userInfo ? state.userInfo.staff_of_department.department_id : null;
        },
        getPositionID(state){
          return state.userInfo ? state.userInfo.staff_of_department.position_id : null;
        },
    },
    mutations: {
      setInfo (state, info) {
        state.userInfo = info;
      },
      setListStaff(state, payload){
        state.staffs = payload;
      },
      setStaffInfo(state, payload){
        state.staff = payload;
      },
      toggleToDoList(state){
        state.showToDoList = !state.showToDoList;
      },
      toggleNotification(state, value){
        state.showNotification = value;
      },
      setListDepartment(state, listDepartment){
        state.departments = listDepartment;
      },
      setListStaffDepartment(state, payload){
        state.staffDepartment = payload;
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

      setProjectList(state, projects){
        state.projects = projects;
      },
      setProjectDetail(state, project){
        state.project = project;
      },

      isLoading(state, value){
        state.loading = value;
      },
      showModal(state, value){
        state.isShowModal = value;
      },
      setListNotification(state, notificationPayload){
        state.notifications = notificationPayload;
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
          //console.log(res.data);
          commit('setInfo', res.data);
        }).catch( err => {
          console.log(err);
        })
      },
      async getListDepartment({ commit }){
        commit('isLoading', true)
        await axios({
          url: url.departments.BASE,
          method: 'get',
          headers: {'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'Accept': 'application/json'}
        }).then( res => {
          //console.log(res.data);
          commit('setListDepartment', res.data);
          commit('isLoading', false)
        }).catch( err => {
          console.log(err);
          commit('isLoading', false)
        })
      },
      async getListStaffDepartment({ commit }, { id, upload}){
        if(upload){
          commit('isLoading', true);
          commit('setListStaffDepartment', null);
        }
        await axios({
          url: url.departments.GET_STAFF + id,
          method: 'get',
          headers: {'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'Accept': 'application/json'}
        }).then( res => {
          console.log(res.data);
          commit('setListStaffDepartment', res.data);
          commit('isLoading', false)
        }).catch( err => {
          console.log(err);
          commit('isLoading', false)
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

      async getStaffInfo({ commit}, { id, upload}){
        if(upload){
          commit('isLoading', true);
          commit('setStaffInfo', null);
        }
        await axios({
          method: 'GET',
          url: url.staff.SHOW + id,
          headers: {'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'Accept': 'application/json'}
        }).then(res => {
          console.log(res.data);
          commit('setStaffInfo', res.data)
          commit('isLoading', false);
        }).catch(err => {
          console.log(err);
          commit('isLoading', false);
        })
      },
      async getListStaff({commit},{ page, search, department_id, deleted}){
        commit('isLoading', true)
        await axios({
          method: 'POST',
          url : url.staff.BASE + page,
          headers:{
              'Authorization': 'Bearer ' + localStorage.getItem('token'),
              'Accept': 'application/json'
            },
            data:{
              search: search,
              department_id: department_id,
              delete: deleted,
            }
        }).then(res => {
          console.log(res.data);
          commit('isLoading', false)
          commit('setListStaff', res.data);
        }).catch(err => {
          console.log(err);
          commit('isLoading', false)
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
      async getListCustomer({commit},{ page, search, type, deleted}){
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
              delete: deleted,
            }
        }).then(res => {
          console.log(res.data);
          commit('setListCustomer', res.data);
        }).catch(err => {
          console.log(err);
        })
        commit('isLoading', false)
      },
      async getMyCustomerList({commit},{ page, search, type, deleted}){
        commit('isLoading', true)
        await axios({
          method: 'POST',
          url : url.customer.MY_CUSTOMER + page,
          headers:{
              'Authorization': 'Bearer ' + localStorage.getItem('token'),
              'Accept': 'application/json'
            },
          data:{
            search: search,
            type: type,
            delete: deleted,
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
      },

      async getProjectList({commit}, {search, status} ){
        commit('isLoading', true)
        await axios({
          method: 'GET',
          url : url.projects.BASE,
          headers:{
              'Authorization': 'Bearer ' + localStorage.getItem('token'),
              'Accept': 'application/json'
            },
          // data:{
          //   search: search,
          //   status: status
          // },
          params: {
            search: search,
            status: status
         }
        }).then( res =>{
          console.log(res.data);
          commit('setProjectList', res.data);
          commit('isLoading', false)
        }).catch( err =>{
          console.log(err);
          commit('isLoading', false)
        })
        
      },
      async getProjectDetail({commit}, {id, upload} ){
        if(upload){
          commit('isLoading', true)
          commit('setTaskInfo', null);
        }
        await axios({
          method: 'GET',
          url : url.projects.SHOW + id,
          headers:{
              'Authorization': 'Bearer ' + localStorage.getItem('token'),
              'Accept': 'application/json'
            },
        }).then( res =>{
          console.log(res.data);
          commit('setProjectDetail', res.data);
          commit('isLoading', false)
        }).catch( err =>{
          console.log(err);
          commit('isLoading', false)
        })
      },

      async getListNotification({commit}){
        await axios({
          method: 'POST',
          url: url.notification.GET_LIST,
          headers:{
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Accept': 'application/json'
          },
        }).then(res => {
          //console.log(res.data);
          commit('setListNotification', res.data);
        }).catch(err =>{
          console.log(err);
        })
      }
    }
  })

export default store
/* eslint-disable prefer-destructuring */
/* eslint-disable prefer-template */
/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */

import Vue from 'vue';

const state = {
  email: '',
  userId: null,
  isLoggedIn: false,
  loginError: '',
};

const getters = {
  isLoggedIn: state => state.isLoggedIn,
  userId: state => state.userId,
  loginError: state => state.loginError,
};

const actions = {
  async logInUser({ commit }, payload) {
    await Vue.axios.get('/user/email/' + payload.email)
      .then((resp) => {
        const data = resp.data;
        console.log(data.id);
        if (data && payload.password === data.password) {
          // eslint-disable-next-line no-underscore-dangle
          payload.userId = data.id;
          console.log('Evo me ove!');
          commit('logInUser', payload);
        } else {
          commit('loginError');
        }
      })
      .catch(() => {
        commit('loginError');
      });
  },
};

const mutations = {
  logInUser(state, payload) {
    state.email = payload.email;
    state.userId = payload.userId;
    state.isLoggedIn = true;
  },
  loginError(state) {
    state.isLoggedIn = false;
    state.loginError = 'Email and/or Password are invalid. Login failed.';
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

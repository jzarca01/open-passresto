import Vue from 'vue';
import Vuex from 'vuex';
import idx from 'idx';

import sodexoApi from 'sodexo-api';

Vue.use(Vuex);

const rootStore = {
    state: {
        isAuthentified: false,
        isInProgress: false,
        isError: false,
        authInfos: {},
        userInfos: {},
        paramInfos: {},
        card: "",
        transactions: []
    },
    getters: {
        getLogin(state) {
            return idx(state, _ => _.userInfos.userName) ? idx(state, _ => _.userInfos.userName) : idx(state, _ => _.userInfos.email);
        },
        getToken(state) {
            return idx(state, _ => _.authInfos.access_token);
        },
        getUserName(state) {
            return idx(state, _ => _.userInfos.first_name);
        },
        getCardId(state) {
            return idx(state, _ => _.card.id);
        }
    },
    mutations: {
        setIsAuthentified(state, { isAuthentified }) {
            state.isAuthentified = isAuthentified;
            return state;
        },
        setIsInProgress(state, { isInProgress }) {
            state.isInProgress = isInProgress;
            return state;
        },
        setAuthInfos(state, { authInfos }) {
            state.authInfos = authInfos;
            return state;
        },
        setUserInfos(state, { userInfos }) {
            state.userInfos = userInfos;
            return state;
        },
        setIsError(state, { isError }) {
            state.isError = isError;
            return state;
        },
        setCard(state, { params }) {
            state.card = idx(params, _ => _.result.items[0].cards.items[0]);
            return state;
        },
        setParams(state, { params }) {
            state.paramInfos = idx(params, _ => _.result.items[0]);
            return state;
        },
        setTransactions(state, { transactions }) {
            state.transactions = transactions;
            return state;
        }
    },
    actions: {
        async signIn({ commit }, {username, password}) {
            try {
              await commit("setIsInProgress", { isInProgress: true });
              const response = await sodexoApi.signIn(username, password);
              if(response.access_token) {
                await commit("setIsError", { isError: false });
                await commit("setAuthInfos", { authInfos: response });
                await commit("setUserInfos", { userInfos: {userName: username } });
                await commit("setIsInProgress", { isInProgress: false });
                await commit("setIsAuthentified", { isAuthentified: true });
              }
              else {
                await commit("setIsInProgress", { isInProgress: false });
                await commit("setIsError", { isError: true });
              }
            } catch (err) {
                await commit("setIsInProgress", { isInProgress: false });
                await commit("setIsError", { isError: true });
            }
        },
        async fetchConsumerInfo({commit, getters}) {
            try {
                await commit("setIsInProgress", { isInProgress: true });
                const response = await sodexoApi.getConsumerInfo(getters.getLogin,getters.getToken);
                if(response.result) {
                    await commit("setIsError", { isError: false });
                    await commit("setUserInfos", { userInfos: response.result });
                }
                else {
                    await commit("setIsError", { isError: true });
                }
                await commit("setIsInProgress", { isInProgress: false });
            }
            catch (err) {
                console.log(err);
                await commit("setIsError", { isError: true });
                await commit("setIsInProgress", { isInProgress: false });
            }
        },
        async fetchCard({ commit, getters }) {
            try {
                await commit("setIsInProgress", { isInProgress: true });
                const response = await sodexoApi.getParams(getters.getLogin, getters.getToken);
                if(response) {
                    await commit("setIsError", { isError: false });
                    await commit("setCard", { params: response });
                    await commit("setParams", { params: response});
                }
                else {
                    await commit("setIsError", { isError: true });
                }
                await commit("setIsInProgress", { isInProgress: false });
            }
            catch (err) {
                console.log(err);
                await commit("setIsError", { isError: true });
                await commit("setIsInProgress", { isInProgress: false });
            }
        },
        async fetchTransactions({ commit, getters }) {
            try {
                await commit("setIsInProgress", { isInProgress: true });
                const response = await sodexoApi.getTransactions(getters.getLogin, getters.getCardId, "FOURPART", getters.getToken);
                if(response.result) {
                    await commit("setIsError", { isError: false });
                    await commit("setTransactions", { transactions: response.result.items });
                }
                else {
                    await commit("setIsError", { isError: true });
                }
                await commit("setIsInProgress", { isInProgress: false });
            }
            catch (err) {
                console.log(err);
                await commit("setIsError", { isError: true });
                await commit("setIsInProgress", { isInProgress: false });
            }
        }
    }
};

const store = new Vuex.Store(rootStore);

export default store;

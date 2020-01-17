import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

const reset =() => {
    const logininfo = sessionStorage.getItem('logininfo') || '{}';
    return {
        logininfo: Object.assign({
            account:'',
            token:''
        }, JSON.parse(logininfo))
    }
}
const store = new Vuex.Store({
    state: reset(),
    getters: {
        logininfo: state => state.logininfo
    },
    mutations: {
        givenLoginInfo(state, params) {
            state.logininfo = params;
            sessionStorage.setItem('logininfo',JSON.stringify(params));
        },
        doExit(state) {
            sessionStorage.clear();
            state = reset();
        }
    },
    actions: {

    }
})

export default store;
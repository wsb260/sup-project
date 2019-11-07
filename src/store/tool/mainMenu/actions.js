import axios from "axios";
export default {
    getData({ dispatch, commit, state, rootState }, option) {
        var _this = this;
        return new Promise((resolve, reject) => {
            axios(this.getters["mainMenu/getData"](option))
                .then(res => {
                    if (res && res.data.code == 1000 && res.data.data != null) {
                        commit("changeMainMenu", res.data.data);
                        _this.commit("login/logined", true);
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                })
                .catch(function(error) {
                    resolve(false);
                });
        });
    }
};
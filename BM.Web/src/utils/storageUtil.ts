
import store from 'store'

const USER = 'USER';

export default{

    /*user data*/
    saveUser(model:any){
        store.set(USER,model);
    },

    getUser(){
        return store.get(USER)
    },

    removeUser(){
        store.remove(USER);
    },
}
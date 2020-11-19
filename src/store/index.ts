// REDUX GLOBAL STATE.
import { createStore } from 'redux';

const store = createStore(() => {
    return {
        id: 3,
        name: 'Gui',
        email: 'gui@icloud.com'
    }
});

export default store;

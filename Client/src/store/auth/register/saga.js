import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

//Account Redux states
import { REGISTER_USER } from './actionTypes';
import { registerUserSuccessful, registerUserFailed } from './actions';

//AUTH related methods
import { register } from '../../../helpers/auth';
import { getFirebaseBackend } from '../../../helpers/firebase_helper';

// initialize firebase Auth
const fireBaseBackend = getFirebaseBackend();

// Is user register successfull then direct plot user in redux.
function* registerUser({ payload: { user } }) {
    try {


     const response = yield call(register, '/user/register', user);
            if(response.message){
              yield put(registerUserSuccessful(response));
            }else{
              yield put(registerUserFailed(response.error));
            }

    } catch (error) {
        yield put(registerUserFailed(error));
    }
}

export function* watchUserRegister() {
    yield takeEvery(REGISTER_USER, registerUser)
}

function* accountSaga() {
    yield all([fork(watchUserRegister)]);
}

export default accountSaga;

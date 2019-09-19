import { all, call, put, takeEvery } from 'redux-saga/effects';
import {SEND_REQUEST} from './actionTypes'
import axios from 'axios'

export function* sendRequest (){
    try{
    yield call(axios.get, '/recipe') 
    }catch(e){
        console.log(e);
    }
}

function* watchSendRequest() {
    yield takeEvery (SEND_REQUEST, sendRequest);
}

export default function* recipePage(){
    yield all([watchSendRequest()]);
}
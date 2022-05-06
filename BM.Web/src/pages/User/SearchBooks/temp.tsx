import { Effect, Reducer } from 'umi';
import { loadCurrent, load as loadUsers } from '@/services/user';
import { UserType } from '@/interfaces/data';
import { setStoredUser } from '@/utils/utils';
import request from '@/utils/request';

export interface CurrentUser extends UserType { };

export interface UserModelState {
  currentUser?: CurrentUser;
}

export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    fetch: Effect;
    fetchCurrent: Effect;
    updateCurrentVendor: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<UserModelState>;
    saveCurrentUserWithNewVendorId: Reducer<UserModelState>;
    updateCurrentUser: Reducer<UserModelState>;
  };
}

const UserModel: UserModelType = {
  namespace: 'user',

  state: {
    currentUser: {} as CurrentUser,
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(loadUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(loadCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
    *updateCurrentVendor({ payload }, { call, put }) {
      yield put({
        type: 'saveCurrentUserWithNewVendorId',
        payload
      });
    }
  },

  reducers: {
    saveCurrentUser(state, action) {
      if (action.payload && action.payload.token) {
        request.extendOptions({ headers: { 'Authorization': `Bearer ${action.payload.token}` } });
      }

      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    saveCurrentUserWithNewVendorId(state = { currentUser: {} as CurrentUser }, action) {
      const currentUser = state.currentUser;
      const userWithNewVendorId: UserType = {
        ...currentUser,
        vendorId: action.payload.vendor.vendorId,
        vendorName: action.payload.vendor.vendorName,
        vendorEmail: action.payload.vendor.email,
        vendorAddress: action.payload.vendor.address,
        vendorLogogram: action.payload.vendor.logogram,
        vendorUrl: action.payload.vendor.vendorUrl,
        vendorOrderOnlyUrl: action.payload.vendor.vendorOrderOnlyUrl,
        onlinePaymentType: action.payload.vendor.onlinePaymentType,
        kioskMode: action.payload.vendor.kioskMode,
        isNewOrderSignalrNotificationActive: action.payload.vendor.isNewOrderSignalrNotificationActive,
        isNewOrderEmailNotificationActive: action.payload.vendor.isNewOrderEmailNotificationActive,
        vendorCurrency: action.payload.vendor.vendorCurrency
      }
      setStoredUser(userWithNewVendorId);
      return {
        currentUser: userWithNewVendorId,
      };
    },
    updateCurrentUser(state = { currentUser: {} as CurrentUser }, action) {
      const currentUser = state.currentUser;
      const vendor = action.payload;
      const user: UserType = {
        ...currentUser,
        vendorId: vendor.id,
        vendorName: vendor.name,
        vendorEmail: vendor.email,
        vendorAddress: vendor.address,
        vendorLogogram: vendor.logogram,
        onlinePaymentType: vendor.onlinePaymentType,
        kioskMode: vendor.kioskMode,
        isNewOrderSignalrNotificationActive: vendor.isNewOrderSignalrNotificationActive,
        isNewOrderEmailNotificationActive: vendor.isNewOrderEmailNotificationActive,
        vendorCurrency: vendor.vendorCurrency
      }
      setStoredUser(user);
      return {
        currentUser: user,
      };
    }
  },
};

export default UserModel;
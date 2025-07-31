import { createReducer, on } from '@ngrx/store';
import { RentMaterial } from '../../interface/rent-material';
import * as rentAction from '../../store/rent/rent.action';

export interface rentState {
  allRentOrder: RentMaterial[];
  rentOrderUser: RentMaterial[];
  loading: boolean;
  error: any;
}

const initialState: rentState = {
  allRentOrder: [],
  rentOrderUser: [],
  loading: false,
  error: null,
};

export const rentReducer = createReducer(
  initialState,
  on(rentAction.rentOrderPlace, (state, action) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(rentAction.rentOrderPlaceSuccess, (state, action) => ({
    ...state,
    rentOrderUser: [...state.rentOrderUser, action.rentOrder],
    loading: false,
  })),

  on(rentAction.rentOrderPlaceFailed, (state, action) => ({
    ...state,
    error: action.error,
    loading:false
  })),

  on(rentAction.getRentOrder, (state, action) => ({
    ...state,
    loading: true,
  })),

  on(rentAction.getRentOrderSuccess, (state, action) => ({
    ...state,
    rentOrderUser: action.rentOrderUser,
    loading: false,
  })),

  on(rentAction.getRentOrderFiled, (state, action) => ({
    ...state,
    error: action.error,
    loading:false
  })),

  on(rentAction.fetchAllRenOrder, (state) => ({
    ...state,
    loading: true,
  })),

  on(rentAction.fetchAllRenOrderSuccess, (state, action) => ({
    ...state,
    loading: false,
    allRentOrder: action.rentOrderAll,
  })),

  on(rentAction.fetchAllRentFailed, (state, action) => ({
    ...state,
    error: action.error,
    loading:false,
  })),

  on(rentAction.updateRentOrder, (state, action) => ({
    ...state,
    loading: true,
  })),

  on(rentAction.updateRentOrderSuccess, (state, action) => ({
    ...state,
    allRentOrder: state.allRentOrder.map((rentOrder) =>
      rentOrder._id === action.updatedRentOrder._id
        ? action.updatedRentOrder
        : rentOrder
    ),
    rentOrderUser: state.rentOrderUser.map((rentOrder) =>
      rentOrder._id === action.updatedRentOrder._id
        ? action.updatedRentOrder
        : rentOrder
    ),
    loading:false,
  })),

  on(rentAction.updateEventOrderFailed,(state,action)=>({
    ...state,
    error:action.error,
    loading:false
  }))
);

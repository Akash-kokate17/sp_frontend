import { createReducer, on } from '@ngrx/store';
import { SpService } from '../../interface/sp-service';
import * as serviceAction from '../../store/service/service.action';

export interface service {
  allService: SpService[];
  loading: boolean;
  error: any;
}

export const initialState: service = {
  allService: [],
  loading: false,
  error: null,
};

export const serviceReducer = createReducer(
  initialState,

  // for upload a service
  on(serviceAction.uploadService, (state, action) => ({
    ...state,
    loading: true,
  })),
  on(serviceAction.uploadServiceSuccess, (state, action) => ({
    ...state,
    allService: [...state.allService, action.uploadService],
    loading: false,
  })),
  on(serviceAction.uploadServiceFailed, (state, action) => ({
    ...state,
    error: action.error,
    loading: false,
  })),

  // for get all service
  on(serviceAction.getAllService, (state, action) => ({
    ...state,
    loading: true,
  })),

  on(serviceAction.getAllServiceSuccess, (state, action) => ({
    ...state,
    allService: action.allServices,
    loading: false,
  })),

  on(serviceAction.getAllServiceFailed, (state, action) => ({
    ...state,
    error: action.error,
    loading: false,
  })),

  on(serviceAction.modifyService, (state, action) => ({
    ...state,
    loading: true,
  })),

  on(serviceAction.modifyServiceSuccess, (state, action) => ({
    ...state,
    allService: state.allService.map((service) =>
      service._id === action.updatedService._id
        ? action.updatedService
        : service
    ),
    loading: false,
  })),

  on(serviceAction.modifyServiceFailed, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  })),

  // delete service

  on(serviceAction.deleteService, (state, action) => ({
    ...state,
    loading: true,
  })),

  on(serviceAction.deleteServiceSuccess, (state, action) => ({
    ...state,
    allService: state.allService.filter(
      (service) => service._id !== action.deleteService._id
    ),
    loading: false,
  })),

  on(serviceAction.deleteServiceFailed, (state, action) => ({
    ...state,
    error: action.error,
    loading: false,
  }))
);

import { createAction, props } from '@ngrx/store';
import { SpService } from '../../interface/sp-service';

export const uploadService = createAction(
  '[uploadService] service upload action',
  props<{ formData: FormData }>()
);
export const uploadServiceSuccess = createAction(
  '[uploadService] service upload action success',
  props<{ uploadService: SpService }>()
);
export const uploadServiceFailed = createAction(
  '[uploadService] service upload action error',
  props<{ error: string }>()
);

//  get all services

export const getAllService = createAction('[getAllService] get all service');

export const getAllServiceSuccess = createAction(
  '[getAllService] get all service success',
  props<{ allServices: SpService[] }>()
);
export const getAllServiceFailed = createAction(
  '[getAllService] get all service failed',
  props<{ error: string }>()
);

// modify service
export const modifyService = createAction(
  '[modifyService] modify service',
  props<{ updatedData:FormData}>()
);

export const modifyServiceSuccess = createAction(
  '[modifyService] modify service success',
  props<{ updatedService: SpService }>()
);
export const modifyServiceFailed = createAction(
  '[modifyService] modify service failed',
  props<{ error: string }>()
);

// delete service 

export const deleteService = createAction(
  '[deleteService] modify service',
  props<{ _id: string;}>()
);

export const deleteServiceSuccess = createAction(
  '[deleteService] modify service success',
  props<{ deleteService: SpService }>()
);
export const deleteServiceFailed = createAction(
  '[deleteService] modify service failed',
  props<{ error: string }>()
);



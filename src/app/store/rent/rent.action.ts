import { createAction, props } from '@ngrx/store';
import { RentMaterial } from '../../interface/rent-material';

export const rentOrderPlace = createAction(
  `[rentOrderPlace] rent place order`,
  props<{ rentOrder: FormData }>()
);

export const rentOrderPlaceSuccess = createAction(
  '[rentOrderPlaced] rent order place successfully',
  props<{ rentOrder: RentMaterial }>()
);

export const rentOrderPlaceFailed = createAction(
  '[rentOrderPlaced] rent order place failed',
  props<{ error: string }>()
);

export const getRentOrder = createAction(
  `[getRentOrder] get user rent order`,
  props<{ email: string }>()
);

export const getRentOrderSuccess = createAction(
  '[getRentOrder] get all user rent order success',
  props<{ rentOrderUser: RentMaterial[] }>()
);

export const getRentOrderFiled = createAction(
  '[getRentOrder] get rent order user failed',
  props<{ error: string }>()
);

export const fetchAllRenOrder = createAction(
  `[fetchAllRentOrder] fetch all event order`
);

export const fetchAllRenOrderSuccess = createAction(
  '[fetchAllRentOrder] fetch all rent order success',
  props<{ rentOrderAll: RentMaterial[] }>()
);

export const fetchAllRentFailed = createAction(
  '[fetchAllRentOrder] fetch all event order failed',
  props<{ error: string }>()
);

export const updateRentOrder = createAction(
  `[updateEventOrder] `,
  props<{ _id: string; status: string }>()
);

export const updateRentOrderSuccess = createAction(
  '[updateEventOrderSuccess] fetch all rent order success',
  props<{ updatedRentOrder: RentMaterial }>()
);

export const updateEventOrderFailed = createAction(
  '[updateEventOrder] fetch all event order failed',
  props<{ error: string }>()
);

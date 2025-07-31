import { createAction, props } from '@ngrx/store';
import { Event } from '../../interface/event';

// place order
export const placeOrder = createAction(
  '[event] place order',
  props<{ eventOrder: Event }>()
);
export const placeOrderSuccess = createAction(
  '[event] place order success',
  props<{ eventOrder: Event }>()
);
export const placeOrderFailure = createAction(
  '[event] place order failed',
  props<{ error: string }>()
);

// fetch all order

export const getEventUser = createAction(
    '[eventOrderUser] get user order',
    props<{email:string}>()
);

export const getEventUserSuccess = createAction(
    '[eventOrderUser] get user order fetch successfully',
    props<{userOrder:Event[]}>()
)

export const getEventUserFailed = createAction(
    '[eventOrderUser] failed to get user order',
    props<{error:string}>()
)

// get all user order for admin

export const getAllEventOrder = createAction(
    '[allEventOrder] get all event order',
);

export const getAllEventOrderSuccess = createAction(
    '[allEventOrder] get all event order success',
    props<{allEventOrder:Event[]}>()
)

export const getAllEventOrderFailed = createAction(
'[allEventOrder] failed to get all event order',
props<{error:any}>()
)

// update event status
export const updateEventStatus = createAction(
    '[allEventOrder] update event status',
    props<{_id:string,status:string;}>()
);

export const updateEventStatusSuccess = createAction(
    '[allEventOrder] update event status successfully',
    props<{updatedOrder:Event}>()
)

export const updateEventStatusFailed = createAction(
'[allEventOrder] failed to update event status',
props<{error:any}>()
)
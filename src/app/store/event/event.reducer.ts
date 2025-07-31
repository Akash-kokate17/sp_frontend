import { createReducer, on } from '@ngrx/store';
import { Event } from '../../interface/event';
import * as eventAction from '../../store/event/event.action';

export interface EventState {
  eventOrder: Event[];
  allEventOrder: Event[];
  error: any;
  loading: boolean;
}

export const initialState: EventState = {
  eventOrder: [],
  allEventOrder: [],
  loading: false,
  error: null,
};

export const eventReducer = createReducer(
  initialState,

  // Start placing order
  on(eventAction.placeOrder, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // Order placed successfully
  on(eventAction.placeOrderSuccess, (state, action) => ({
    ...state,
    eventOrder: [...state.eventOrder, action.eventOrder],
    loading: false,
    error: null,
  })),

  // Order place failed
  on(eventAction.placeOrderFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // fetch all order

  on(eventAction.getEventUser, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // fetch all order success

  on(eventAction.getEventUserSuccess, (state, action) => ({
    ...state,
    eventOrder: action.userOrder,
    loading: false,
  })),

  // fetch all order failure

  on(eventAction.getEventUserFailed, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  })),

  // get all user order for admin

  on(eventAction.getAllEventOrder, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(eventAction.getAllEventOrderSuccess, (state, action) => ({
    ...state,
    allEventOrder: action.allEventOrder,
    loading: false,
    error: null,
  })),

  on(eventAction.getAllEventOrderFailed, (state, action) => ({
    ...state,
    error: action.error,
    loading: false,
  })),

  // update event status

  on(eventAction.updateEventStatusSuccess, (state, {updatedOrder}) => ({
    ...state,
    loading: false,
    eventOrder: state.eventOrder.map((order) =>
      order._id === updatedOrder._id ? updatedOrder: order
    ),
    allEventOrder: state.allEventOrder.map((order) =>
      order._id === updatedOrder._id ? updatedOrder: order
    ),
  })),

  on(eventAction.updateEventStatusFailed, (state, action) => ({
    ...state,
    error: action.error,
    loading: false,
  }))
);

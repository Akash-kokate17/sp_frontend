import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EventServiceService } from '../../services/event/event-service.service';
import { Event } from '../../interface/event';
import {
  placeOrder,
  placeOrderSuccess,
  placeOrderFailure,
  getEventUser,
  getEventUserFailed,
  getAllEventOrder,
  getAllEventOrderSuccess,
  getAllEventOrderFailed,
  updateEventStatus,
  updateEventStatusSuccess,
  updateEventStatusFailed,
  getEventUserSuccess,
} from './event.action';
import { exhaustMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class EventEffects {
  private actions$ = inject(Actions);

  placeOrder$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(placeOrder),
      exhaustMap(({ eventOrder }) =>
        this.eventServices.sendEventOrder(eventOrder).pipe(
          map((response: any) =>
            placeOrderSuccess({ eventOrder: response.eventOrder })
          ),
          catchError((error) =>
            of(placeOrderFailure({ error: error.message || 'Order failed' }))
          )
        )
      )
    );
  });

  fetchUserAllOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getEventUser),
      exhaustMap(({ email }) =>
        this.eventServices.eventOrder(email).pipe(
          map((response: any) =>
            getEventUserSuccess({ userOrder: response.eventOrder })
          ),
          catchError((error: string) => {
            return of(getEventUserFailed({ error }));
          })
        )
      )
    )
  );

  allEventOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllEventOrder),
      exhaustMap(() =>
        this.eventServices.allEventOrder().pipe(
          map((response: any) =>
            getAllEventOrderSuccess({ allEventOrder: response.allEventOrder })
          ),
          catchError((error) => of(getAllEventOrderFailed({ error })))
        )
      )
    )
  );

  updateEventOrderStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateEventStatus),
      exhaustMap(({ _id, status }) =>
        this.eventServices
          .updateEventStatus(_id, status as Event['status'])
          .pipe(
            map((response: any) =>
              updateEventStatusSuccess({
                updatedOrder: response.userEventOrder,
              })
            ),
            catchError((error) => of(updateEventStatusFailed({ error })))
          )
      )
    )
  );

  constructor(private eventServices: EventServiceService) {
    if (!this.actions$) {
      throw new Error(
        'Actions stream is undefined! Did you forget provideEffects([EventEffects])?'
      );
    }
  }
}

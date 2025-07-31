import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RentService } from '../../services/rentMaterial/rent.service';
import { catchError, exhaustMap, map, of } from 'rxjs';
import {
  fetchAllRenOrder,
  fetchAllRenOrderSuccess,
  fetchAllRentFailed,
  getRentOrder,
  getRentOrderFiled,
  getRentOrderSuccess,
  rentOrderPlace,
  rentOrderPlaceFailed,
  updateEventOrderFailed,
  updateRentOrder,
  updateRentOrderSuccess,
} from './rent.action';
import { RentMaterial } from '../../interface/rent-material';

@Injectable()
export class RentEffect {
  postRentMaterial$ = createEffect(() =>
    this.action$.pipe(
      ofType(rentOrderPlace),
      exhaustMap(({ rentOrder }) =>
        this.rentService.postRentMaterial(rentOrder).pipe(
          map((response: any) =>({
            type:'[rentOrderPlaced] rent order place successfully',
           rentOrder:response.data
          })
          ),
          catchError((error: any) => of(rentOrderPlaceFailed({ error })))
        )
      )
    )
  );

  getRentOrderUser$ = createEffect(() =>
    this.action$.pipe(
      ofType(getRentOrder),
      exhaustMap(({ email }) =>
        this.rentService.getUserRentOrder(email).pipe(
          map((response: any) =>
            getRentOrderSuccess({ rentOrderUser: response.rentOrder })
          ),
          catchError((error: any) => of(getRentOrderFiled({ error })))
        )
      )
    )
  );

  fetchAllRentOrder$ = createEffect(() =>
    this.action$.pipe(
      ofType(fetchAllRenOrder),
      exhaustMap(() =>
        this.rentService.fetchAllRentORder().pipe(
          map((response: any) =>
            fetchAllRenOrderSuccess({ rentOrderAll: response.allRentOrder })
          ),
          catchError((error) => of(fetchAllRentFailed({ error })))
        )
      )
    )
  );

  updateRentStatus$ = createEffect(() =>
    this.action$.pipe(
      ofType(updateRentOrder),
      exhaustMap(({ _id, status }) =>
        this.rentService.updateRentStatus(_id, status).pipe(
          map((response: any) =>
            updateRentOrderSuccess({ updatedRentOrder: response.userRentOrder })
          ),
          catchError((error) => of(updateEventOrderFailed({ error })))
        )
      )
    )
  );
  constructor(private action$: Actions, private rentService: RentService) {}
}

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SpServiceService } from '../../services/sp_services/sp-service.service';
import {
    deleteService,
  deleteServiceFailed,
  deleteServiceSuccess,
  getAllService,
  getAllServiceFailed,
  getAllServiceSuccess,
  modifyService,
  modifyServiceFailed,
  modifyServiceSuccess,
  uploadService,
  uploadServiceFailed,
  uploadServiceSuccess,
} from './service.action';
import { catchError, exhaustMap, map, of } from 'rxjs';

@Injectable()
export class SpService {
  constructor(private actions$: Actions, private spService: SpServiceService) {}

  uploadService$ = createEffect(() =>
    this.actions$.pipe(
      ofType(uploadService),
      exhaustMap(({ formData }) =>
        this.spService.uploadService(formData).pipe(
          map((response) =>
            uploadServiceSuccess({ uploadService: response.data })
          ),
          catchError((error) => of(uploadServiceFailed({ error })))
        )
      )
    )
  );

  getAllService$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllService),
      exhaustMap(() =>
        this.spService.getAllServices().pipe(
          map((response) =>
            getAllServiceSuccess({ allServices: response.allService })
          ),
          catchError((error) => of(getAllServiceFailed({ error })))
        )
      )
    )
  );

  modifyService$ = createEffect(() =>
    this.actions$.pipe(
      ofType(modifyService),
      exhaustMap(({ updatedData }) =>
        this.spService.modifyService(updatedData).pipe(
          map((response) =>
            modifyServiceSuccess({ updatedService: response.data })
          ),
          catchError((error) => of(modifyServiceFailed({ error })))
        )
      )
    )
  );

  deleteSErvice$ = createEffect(()=>
   this.actions$.pipe(
    ofType(deleteService),
    exhaustMap(({_id})=>this.spService.deleteService(_id).pipe(
        map((response)=>deleteServiceSuccess({deleteService:response.result})),
        catchError((error)=>of(deleteServiceFailed({error})))
    ))
   )
)
}

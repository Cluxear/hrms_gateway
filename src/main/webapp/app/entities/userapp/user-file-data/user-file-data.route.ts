import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IUserFileData, UserFileData } from 'app/shared/model/userapp/user-file-data.model';
import { UserFileDataService } from './user-file-data.service';
import { UserFileDataComponent } from './user-file-data.component';
import { UserFileDataDetailComponent } from './user-file-data-detail.component';
import { UserFileDataUpdateComponent } from './user-file-data-update.component';
import {UserFileDataListComponent} from "./user-file-data-list.component";

@Injectable({ providedIn: 'root' })
export class UserFileDataResolve implements Resolve<IUserFileData> {
  constructor(private service: UserFileDataService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUserFileData> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((userFileData: HttpResponse<UserFileData>) => {
          if (userFileData.body) {
            return of(userFileData.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new UserFileData());
  }
}

export const userFileDataRoute: Routes = [
  {
    path: '',
    component: UserFileDataComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hrmsGatewayApp.userappUserFileData.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: UserFileDataDetailComponent,
    resolve: {
      userFileData: UserFileDataResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hrmsGatewayApp.userappUserFileData.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: UserFileDataUpdateComponent,
    resolve: {
      userFileData: UserFileDataResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hrmsGatewayApp.userappUserFileData.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: UserFileDataUpdateComponent,
    resolve: {
      userFileData: UserFileDataResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hrmsGatewayApp.userappUserFileData.home.title',
    },
    canActivate: [UserRouteAccessService],
  },

  {
    path: 'user/:userId',
    component: UserFileDataListComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hrmsGatewayApp.userappUserFileData.home.title',
    },
    canActivate: [UserRouteAccessService],
  },


];

import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import {
  IApplicationRecrutementStatus,
  ApplicationRecrutementStatus,
} from 'app/shared/model/applicationapp/application-recrutement-status.model';
import { ApplicationRecrutementStatusService } from './application-recrutement-status.service';
import { ApplicationRecrutementStatusComponent } from './application-recrutement-status.component';
import { ApplicationRecrutementStatusDetailComponent } from './application-recrutement-status-detail.component';
import { ApplicationRecrutementStatusUpdateComponent } from './application-recrutement-status-update.component';

@Injectable({ providedIn: 'root' })
export class ApplicationRecrutementStatusResolve implements Resolve<IApplicationRecrutementStatus> {
  constructor(private service: ApplicationRecrutementStatusService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IApplicationRecrutementStatus> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((applicationRecrutementStatus: HttpResponse<ApplicationRecrutementStatus>) => {
          if (applicationRecrutementStatus.body) {
            return of(applicationRecrutementStatus.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ApplicationRecrutementStatus());
  }
}

export const applicationRecrutementStatusRoute: Routes = [
  {
    path: '',
    component: ApplicationRecrutementStatusComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hrmsGatewayApp.applicationappApplicationRecrutementStatus.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ApplicationRecrutementStatusDetailComponent,
    resolve: {
      applicationRecrutementStatus: ApplicationRecrutementStatusResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hrmsGatewayApp.applicationappApplicationRecrutementStatus.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ApplicationRecrutementStatusUpdateComponent,
    resolve: {
      applicationRecrutementStatus: ApplicationRecrutementStatusResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hrmsGatewayApp.applicationappApplicationRecrutementStatus.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ApplicationRecrutementStatusUpdateComponent,
    resolve: {
      applicationRecrutementStatus: ApplicationRecrutementStatusResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hrmsGatewayApp.applicationappApplicationRecrutementStatus.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];

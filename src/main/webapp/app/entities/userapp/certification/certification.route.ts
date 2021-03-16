import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICertification, Certification } from 'app/shared/model/userapp/certification.model';
import { CertificationService } from './certification.service';
import { CertificationComponent } from './certification.component';
import { CertificationDetailComponent } from './certification-detail.component';
import { CertificationUpdateComponent } from './certification-update.component';

@Injectable({ providedIn: 'root' })
export class CertificationResolve implements Resolve<ICertification> {
  constructor(private service: CertificationService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICertification> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((certification: HttpResponse<Certification>) => {
          if (certification.body) {
            return of(certification.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Certification());
  }
}

export const certificationRoute: Routes = [
  {
    path: '',
    component: CertificationComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hrmsGatewayApp.userappCertification.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CertificationDetailComponent,
    resolve: {
      certification: CertificationResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hrmsGatewayApp.userappCertification.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CertificationUpdateComponent,
    resolve: {
      certification: CertificationResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hrmsGatewayApp.userappCertification.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CertificationUpdateComponent,
    resolve: {
      certification: CertificationResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hrmsGatewayApp.userappCertification.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];

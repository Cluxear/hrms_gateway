import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IJobpost, Jobpost } from 'app/shared/model/jobposting/jobpost.model';
import { JobpostService } from './jobpost.service';
import { JobpostComponent } from './jobpost.component';
import { JobpostDetailComponent } from './jobpost-detail.component';
import { JobpostUpdateComponent } from './jobpost-update.component';
import { JoblistingComponent } from './joblisting-component';

@Injectable({ providedIn: 'root' })
export class JobpostResolve implements Resolve<IJobpost> {
  constructor(private service: JobpostService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IJobpost> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((jobpost: HttpResponse<Jobpost>) => {
          if (jobpost.body) {
            return of(jobpost.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Jobpost());
  }
}

export const jobpostRoute: Routes = [
  {
    path: '',
    component: JobpostComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hrmsGatewayApp.jobpostingJobpost.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: JobpostDetailComponent,
    resolve: {
      jobpost: JobpostResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hrmsGatewayApp.jobpostingJobpost.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: JobpostUpdateComponent,
    resolve: {
      jobpost: JobpostResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hrmsGatewayApp.jobpostingJobpost.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: JobpostUpdateComponent,
    resolve: {
      jobpost: JobpostResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hrmsGatewayApp.jobpostingJobpost.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'joblisting',
    component: JoblistingComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hrmsGatewayApp.jobpostingJobpost.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];

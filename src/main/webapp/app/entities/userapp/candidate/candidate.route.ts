import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICandidate, Candidate } from 'app/shared/model/userapp/candidate.model';
import { CandidateService } from './candidate.service';
import { CandidateComponent } from './candidate.component';
import { CandidateDetailComponent } from './candidate-detail.component';
import { CandidateUpdateComponent } from './candidate-update.component';
import { AccountService } from '../../../core/auth/account.service';

@Injectable({ providedIn: 'root' })
export class CandidateResolve implements Resolve<ICandidate> {
  constructor(private service: CandidateService, private authService: AccountService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICandidate> | Observable<never> {
    const id = route.params['id'];
    const jobId = route.params['jpid'];
    const login = route.params['login'];

    if (id) {
      return this.service.find(id).pipe(
        flatMap((candidate: HttpResponse<Candidate>) => {
          if (candidate.body) {
            return of(candidate.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    if (jobId) {
      return this.service.findByLogin(this.authService.getLogin()).pipe(
        flatMap((candidate: HttpResponse<Candidate>) => {
          if (candidate.body) {
            return of(candidate.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    if (route.url.toString() === 'profile') {
      return this.service.findByLogin(this.authService.getLogin()).pipe(
        flatMap((candidate: HttpResponse<Candidate>) => {
          if (candidate.body) {
            return of(candidate.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }

    return of(new Candidate());
  }
}

export const candidateRoute: Routes = [
  {
    path: '',
    component: CandidateComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hrmsGatewayApp.userappCandidate.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CandidateDetailComponent,
    resolve: {
      candidate: CandidateResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hrmsGatewayApp.userappCandidate.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CandidateUpdateComponent,
    resolve: {
      candidate: CandidateResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hrmsGatewayApp.userappCandidate.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CandidateUpdateComponent,
    resolve: {
      candidate: CandidateResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hrmsGatewayApp.userappCandidate.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':jpid/postuler',
    component: CandidateUpdateComponent,
    resolve: {
      candidate: CandidateResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hrmsGatewayApp.userappCandidate.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];

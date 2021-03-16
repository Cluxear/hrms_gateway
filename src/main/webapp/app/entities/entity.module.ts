import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'position',
        loadChildren: () => import('./userapp/position/position.module').then(m => m.UserappPositionModule),
      },
      {
        path: 'candidate',
        loadChildren: () => import('./userapp/candidate/candidate.module').then(m => m.UserappCandidateModule),
      },
      {
        path: 'professional-experience',
        loadChildren: () =>
          import('./userapp/professional-experience/professional-experience.module').then(m => m.UserappProfessionalExperienceModule),
      },
      {
        path: 'academic-experience',
        loadChildren: () => import('./userapp/academic-experience/academic-experience.module').then(m => m.UserappAcademicExperienceModule),
      },
      {
        path: 'certification',
        loadChildren: () => import('./userapp/certification/certification.module').then(m => m.UserappCertificationModule),
      },
      {
        path: 'country',
        loadChildren: () => import('./userapp/country/country.module').then(m => m.UserappCountryModule),
      },
      {
        path: 'address',
        loadChildren: () => import('./userapp/address/address.module').then(m => m.UserappAddressModule),
      },
      {
        path: 'seniority-level',
        loadChildren: () => import('./userapp/seniority-level/seniority-level.module').then(m => m.UserappSeniorityLevelModule),
      },
      {
        path: 'degree-level',
        loadChildren: () => import('./userapp/degree-level/degree-level.module').then(m => m.UserappDegreeLevelModule),
      },
      {
        path: 'employee',
        loadChildren: () => import('./userapp/employee/employee.module').then(m => m.UserappEmployeeModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class HrmsGatewayEntityModule {}

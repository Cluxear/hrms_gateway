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
      {
        path: 'jobpost',
        loadChildren: () => import('./jobposting/jobpost/jobpost.module').then(m => m.JobpostingJobpostModule),
      },
      {
        path: 'application',
        loadChildren: () => import('./applicationapp/application/application.module').then(m => m.ApplicationappApplicationModule),
      },
      {
        path: 'application-recrutement-status',
        loadChildren: () =>
          import('./applicationapp/application-recrutement-status/application-recrutement-status.module').then(
            m => m.ApplicationappApplicationRecrutementStatusModule
          ),
      },
      {
        path: 'user-application',
        loadChildren: () => import('./dataapp/user-application/user-application.module').then(m => m.DataappUserApplicationModule),
      },
      {
        path: 'skill',
        loadChildren: () => import('./skillapp/skill/skill.module').then(m => m.SkillappSkillModule),
      },
      {
        path: 'domain',
        loadChildren: () => import('./skillapp/domain/domain.module').then(m => m.SkillappDomainModule),
      },
      {
        path: 'skill-job-post',
        loadChildren: () => import('./dataapp/skill-job-post/skill-job-post.module').then(m => m.DataappSkillJobPostModule),
      },
      {
        path: 'user-skill',
        loadChildren: () => import('./dataapp/user-skill/user-skill.module').then(m => m.DataappUserSkillModule),
      },
      {
        path: 'interview',
        loadChildren: () => import('./interviewapp/interview/interview.module').then(m => m.InterviewappInterviewModule),
      },
      {
        path: 'evaluation-sheet',
        loadChildren: () =>
          import('./interviewapp/evaluation-sheet/evaluation-sheet.module').then(m => m.InterviewappEvaluationSheetModule),
      },
      {
        path: 'user-file-data',
        loadChildren: () => import('./userapp/user-file-data/user-file-data.module').then(m => m.UserappUserFileDataModule),
      },
      {
        path: 'user-interview',
        loadChildren: () => import('./dataapp/user-interview/user-interview.module').then(m => m.DataappUserInterviewModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class HrmsGatewayEntityModule {}

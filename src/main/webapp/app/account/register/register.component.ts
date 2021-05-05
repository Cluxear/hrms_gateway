import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { first } from 'rxjs/operators';
import {UserService} from "app/core/user/user.service";
import {AccountService} from "app/core/auth/account.service";
import {KeycloakService} from "../../../keycloak/keycloak.service";
import {Authority} from "app/shared/constants/authority.constants";
import {Candidate, ICandidate} from "app/shared/model/userapp/candidate.model";
import {NgbDateMomentAdapter} from "app/shared/util/datepicker-adapter";
import {IManagedUser, ManagedUser} from "app/core/user/managedUser.model";



@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
  registerForm = this.fb.group({
    firstName:String,
    lastName: String,
    login:String,
    email: String,
    password: String,

  })
  loading = false;
  submitted = false;

  constructor(

    private router: Router,
   // private authenticationService: AuthenticationService,
    private accountService: AccountService,
    private userService: UserService,
    private keycloakService: KeycloakService,
    private fb: FormBuilder
   // private alertService: AlertService
  ) {

    // redirect to home if already logged in
    if (this.accountService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() :void  {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      login: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],

    });
  }

  // convenience getter for easy access to form fields
  get f() : { [p: string]: AbstractControl } { return this.registerForm.controls; }

  private createFromForm(): IManagedUser {
    //  let testArray: FormArray = new FormArray([]);
    const user : IManagedUser = new ManagedUser();
    // formulating the address
    user.authorities = [Authority.CANDIDATE, Authority.USER];
    user.firstName = this.registerForm.get(['firstName'])?.value;
    user.lastName = this.registerForm.get(['lastName'])?.value;
    user.email = this.registerForm.get(['email'])?.value;
    user.login = this.registerForm.get(['login'])?.value;
    user.password = this.registerForm.get(['password'])?.value;

    return user;
  }
  onSubmit() :void  {
    this.submitted = true;
    // reset alerts on submit
  //  this.alertService.clear();

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    const managedUser = this.createFromForm();
    this.loading = true;

    // creating a user in keycloak
    //this.keycloakService.create(this.registerForm.value);

    this.userService.register(managedUser)
      .pipe(first())
      .subscribe(
        data => {

          //this.alertService.success('Registration successful', true);
          this.router.navigate(['']);
        },
        error => {
         // this.alertService.error(error);
          this.loading = false;
        });
  }
}

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



@Component({
  selector: 'jhi-login',
  templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({

    login:String,
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
    this.loginForm = this.fb.group({

      login: ['', Validators.required],
      //password: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required]]
    });
  }

  // convenience getter for easy access to form fields
  get f() : { [p: string]: AbstractControl } { return this.loginForm.controls; }

  private createFromForm(): IManagedUser {
    //  let testArray: FormArray = new FormArray([]);
    const user : IManagedUser = new ManagedUser();
    // formulating the address
    user.authorities = [Authority.CANDIDATE, Authority.USER];

    user.email = this.loginForm.get(['email'])?.value;
    user.login = this.loginForm.get(['login'])?.value;
    user.password = this.loginForm.get(['password'])?.value;

    return user;
  }
  onSubmit() :void  {
    this.submitted = true;
    // reset alerts on submit
    //  this.alertService.clear();

    // stop here if form is invalid
    if (this.loginForm.invalid) {
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

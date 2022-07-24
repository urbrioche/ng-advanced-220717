import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NgForm, NgModel} from "@angular/forms";

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  private origBodyClass = document.body.className;
  data: any = {
    email: '',
    password: '',
    isRememberMe: true,
    tab1: {
      addr: '',
      zip: '',
    }
  }

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    document.body.className = 'bg-gradient-primary';
  }

  ngOnDestroy(): void {
    document.body.className = this.origBodyClass;
  }

  doLogin(form: NgForm) {
    if (form.valid) {
      localStorage.setItem('apikey', 'TEST');
      const url = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
      this.router.navigateByUrl(url);
    }
  }

  isInvalid(control: NgModel, form: NgForm) {
    return control.invalid && (control.touched || form.submitted);
  }

  isValid(control: NgModel) {
    return control.valid;
  }

  disableField(control: NgModel) {
    if (control.disabled) {
      control.control.enable();
    } else {
      control.control.disable();
    }
  }
}

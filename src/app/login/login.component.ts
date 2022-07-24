import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NgModel} from "@angular/forms";

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  data: any = {
    email: '',
    password: '',
    isRememberMe: true,
  }

  private origBodyClass = document.body.className;

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    document.body.className = 'bg-gradient-primary';
  }

  ngOnDestroy(): void {
    document.body.className = this.origBodyClass;
  }

  doLogin() {
    localStorage.setItem('apikey', 'TEST');
    const url = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    this.router.navigateByUrl(url);
  }

  isInvalid(control: NgModel) {
    return control.invalid && control.touched;
  }

  isValid(control: NgModel) {
    return control.valid;
  }
}

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormBuilder, FormControl, FormGroup, UntypedFormGroup, Validators} from "@angular/forms";

@Component({
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.component.css']
})
export class Login2Component implements OnInit {
  data = {
    email: 'user@example.com',
    password: '123123',
    isRememberMe: true,
    city: 'Taipei',
  };

  orig_body_className = document.body.className;

  // form!: FormGroup;
  // form = this.fb.group(this.data);
  form = this.fb.group({
    email: this.fb.control('', {
      validators: [Validators.required, Validators.email],
      updateOn: 'blur'
    }),
    password: this.fb.control('', {
      validators: [Validators.required]
    }),
    isRememberMe: this.fb.control(true, {}),
    profiles: this.fb.array([
      this.fb.group({
        city: this.fb.control('Taipei', {validators: [Validators.required]}),
        tel: this.fb.control('0988-888888', {validators: [Validators.required]})
      }),
      this.fb.group({
        city: this.fb.control('Taichung', {validators: [Validators.required]}),
        tel: this.fb.control('0944-444444', {validators: [Validators.required]})
      }),
    ])
  })

  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    document.body.className = 'bg-gradient-primary';
    // 這邊是模擬從遠端抓資料回來
    setTimeout(() => {
      // this.form.setValue(this.data);
      // data多一個city，但form沒有，用setValue會噴錯，改用patchValue則不會
      // 了解何時改用set，何時改用patch
      this.form.patchValue(this.data);
    }, 2000)
  }

  ngOnDestroy(): void {
    document.body.className = this.orig_body_className;
  }

  fc(name: string) {
    return this.form.get(name) as FormControl;
  }

  fg(name: string) {
    return this.form.get(name) as FormGroup;
  }

  fa(name: string) {
    return this.form.get(name) as FormArray;
  }

  // doLogin(form: NgForm) {
  //   if (form.valid) {
  //     localStorage.setItem('apikey', 'TEST');
  //     var url = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
  //     this.router.navigateByUrl(url);
  //     this.router.navigate(['/'], {
  //       state: {},
  //     });
  //   }
  // }

  // isInvalid(control: NgModel, form: NgForm) {
  //   return control.invalid && (control.touched || form.submitted);
  // }

  // isValid(control: NgModel) {
  //   return control.valid;
  // }

  // disableField(control: NgModel) {
  //   if (control.disabled) {
  //     control.control.enable();
  //   } else {
  //     control.control.disable();
  //   }
  // }
  resetForm() {
    this.form.reset(this.data);
  }
}

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  UntypedFormGroup,
  Validators
} from "@angular/forms";

@Component({
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.component.css']
})
export class Login2Component implements OnInit {
  data = {
    email: 'user@example.com',
    password: '123123',
    // city: 'Taipei',
    isRememberMe: true,
    profiles: [
      {
        city: 'Taipei',
        tel: '0988-888888'
      },
      {
        city: 'Taichung',
        tel: '0944-444444'
      },
      {
        city: 'Kaohsiung',
        tel: '0911-111111'
      },
    ]
  };

  orig_body_className = document.body.className;

  // form = this.fb.group(this.data);
  form = this.fb.group({
    email: this.fb.nonNullable.control('', {
      validators: [Validators.required, Validators.email],
      updateOn: 'blur',
    }),
    password: this.fb.control('', {
      validators: [Validators.required, Validators.minLength(6), Validators.maxLength(32)]
    }),
    isRememberMe: this.fb.control(true, {}),
    profiles: this.fb.array([
      this.makeProfile('Taipei', '0988-888888'),
      this.makeProfile('Taichung', '0944-444444'),
    ])
  })

  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    document.body.className = 'bg-gradient-primary';

    // 模擬從後段拿資料
    setTimeout(() => {
      // this.form.setValue(this.data);
      // this.form.patchValue(this.data);
      this.form.controls.profiles.clear();
      this.data.profiles.forEach(profile => {
        this.form.controls.profiles.push(this.makeProfile(profile.city, profile.tel));
      })
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

  resetForm() {
    this.form.reset(this.data);
  }

  addProfile() {
    this.form.controls.profiles.push(this.makeProfile('', ''))
  }

  makeProfile(city: string, tel: string) {
    return this.fb.group({
      city: this.fb.control(city, {validators: [Validators.required]}),
      tel: this.fb.control(tel, {validators: [Validators.required]})
    });
  }

  doLogin() {
    if (this.form.valid) {
      localStorage.setItem('apikey', 'TEST');
      const url = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
      this.router.navigateByUrl(url);
      this.router.navigate(['/'], {
        state: {},
      });
    }
  }

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
}

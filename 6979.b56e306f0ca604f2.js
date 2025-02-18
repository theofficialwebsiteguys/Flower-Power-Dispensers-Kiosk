"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[6979],{6979:(w,h,l)=>{l.r(h),l.d(h,{AuthPageModule:()=>J});var p=l(177),n=l(4341),c=l(4742),g=l(6549),e=l(4438),m=l(7423),u=l(600),f=l(671),b=l(9216);const v=()=>({mode:"forgot-password"}),_=()=>({mode:"register"});function M(r,s){if(1&r&&(e.j41(0,"div",20),e.EFF(1),e.k0s()),2&r){const i=e.XpG();e.R7$(),e.SpI(" ",i.error," ")}}function y(r,s){1&r&&(e.j41(0,"div",21),e.EFF(1," Valid email is required. "),e.k0s())}function C(r,s){1&r&&(e.j41(0,"div",21),e.EFF(1," Password is required. "),e.k0s())}function k(r,s){1&r&&e.nrm(0,"ion-spinner",22)}let F=(()=>{var r;class s{constructor(o,t,a,d,P){this.fb=o,this.router=t,this.authService=a,this.settingsService=d,this.accessibilityService=P,this.loading=!1,this.submitted=!1,this.error="",this.darkModeEnabled=!1,this.loginForm=this.fb.group({email:["",[n.k0.required,n.k0.email]],password:["",n.k0.required]})}ngOnInit(){this.settingsService.isDarkModeEnabled$.subscribe(o=>this.darkModeEnabled=o)}ngOnDestroy(){this.resetForm()}resetForm(){this.loginForm.reset(),this.submitted=!1,this.error="",this.loading=!1}onSubmit(){if(this.submitted=!0,this.loginForm.invalid)return this.error="Please fill in all required fields correctly.",void this.accessibilityService.announce(this.error,"assertive");this.loading=!0,this.error="",this.accessibilityService.announce("Attempting to log in...","polite"),this.authService.login(this.loginForm.value).subscribe({next:()=>{this.resetForm(),this.accessibilityService.announce("Login successful. Redirecting to rewards page.","polite"),this.router.navigate(["/rewards"])},error:o=>{this.loading=!1,this.error=this.getErrorMessage(o),this.accessibilityService.announce(this.error,"assertive")}})}getErrorMessage(o){return 400===o.status?"Invalid email or password. Please try again.":500===o.status?"Server error. Please try again later.":0===o.status?"Network error. Please check your internet connection.":"An unexpected error occurred. Please try again."}}return(r=s).\u0275fac=function(o){return new(o||r)(e.rXU(n.ok),e.rXU(g.Ix),e.rXU(f.u),e.rXU(b.h),e.rXU(m.s))},r.\u0275cmp=e.VBU({type:r,selectors:[["app-login"]],decls:29,vars:11,consts:[[1,"log-in-page"],[1,"login-container"],[1,"login-header"],[1,"login-header-logo"],["alt","Your Website Guy Logo",1,"logo",3,"src"],["class","error-message","aria-live","assertive",4,"ngIf"],["aria-labelledby","login-heading",3,"ngSubmit","formGroup"],["id","login-heading",1,"sr-only"],[1,"form-group"],["for","email",1,"required"],["type","email","id","email","formControlName","email","placeholder","Enter your email","required","","aria-required","true","aria-label","Enter your email address"],["class","form-error","aria-live","assertive",4,"ngIf"],["for","password",1,"required"],["type","password","id","password","formControlName","password","placeholder","Enter your password","required","","aria-required","true","aria-label","Enter your password"],[1,"forgot-password"],["routerLink","/auth","aria-label","Forgot your password? Navigate to reset page",3,"queryParams"],["expand","block","type","submit","aria-label","Log in to your account",3,"disabled"],["slot","start","aria-hidden","true",4,"ngIf"],[1,"login-link"],["routerLink","/auth","aria-label","Sign up for a new account",3,"queryParams"],["aria-live","assertive",1,"error-message"],["aria-live","assertive",1,"form-error"],["slot","start","aria-hidden","true"]],template:function(o,t){if(1&o&&(e.j41(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3),e.nrm(4,"img",4),e.k0s()(),e.DNE(5,M,2,1,"div",5),e.j41(6,"form",6),e.bIt("ngSubmit",function(){return t.onSubmit()}),e.j41(7,"h1",7),e.EFF(8,"Login to Your Account"),e.k0s(),e.j41(9,"div",8)(10,"label",9),e.EFF(11,"Email"),e.k0s(),e.nrm(12,"input",10),e.DNE(13,y,2,0,"div",11),e.k0s(),e.j41(14,"div",8)(15,"label",12),e.EFF(16,"Password"),e.k0s(),e.nrm(17,"input",13),e.DNE(18,C,2,0,"div",11),e.k0s(),e.j41(19,"div",14)(20,"a",15),e.EFF(21,"Forgot your password?"),e.k0s()(),e.j41(22,"ion-button",16),e.DNE(23,k,1,0,"ion-spinner",17),e.EFF(24," Login "),e.k0s()(),e.j41(25,"p",18),e.EFF(26," Don\u2019t have an account? "),e.j41(27,"a",19),e.EFF(28,"Sign Up"),e.k0s()()()()),2&o){let a,d;e.R7$(4),e.Y8G("src",t.darkModeEnabled?"assets/logo-dark-mode.png":"assets/logo.png",e.B4B),e.R7$(),e.Y8G("ngIf",t.error),e.R7$(),e.Y8G("formGroup",t.loginForm),e.R7$(7),e.Y8G("ngIf",t.submitted&&(null==(a=t.loginForm.get("email"))?null:a.invalid)),e.R7$(5),e.Y8G("ngIf",t.submitted&&(null==(d=t.loginForm.get("password"))?null:d.invalid)),e.R7$(2),e.Y8G("queryParams",e.lJ4(9,v)),e.R7$(2),e.Y8G("disabled",t.loginForm.invalid||t.loading),e.R7$(),e.Y8G("ngIf",t.loading),e.R7$(4),e.Y8G("queryParams",e.lJ4(10,_))}},dependencies:[p.bT,n.qT,n.me,n.BC,n.cb,n.YS,c.Jm,c.w2,c.oY,g.Wk,n.j4,n.JD],styles:['.log-in-page[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;padding:20px;padding-top:calc(env(safe-area-inset-top,20px) + 20px);height:100vh;overflow-y:auto}@supports (padding-bottom: env(safe-area-inset-bottom)){.log-in-page[_ngcontent-%COMP%]{padding-bottom:calc(env(safe-area-inset-bottom) + 50px)}}.login-container[_ngcontent-%COMP%]{width:100%;max-width:400px;padding:20px;background-color:var(--ion-color-primary-contrast);border-radius:8px;box-shadow:0 4px 12px #0000001a;animation:fadeInUp .4s ease-in-out;display:flex;flex-direction:column;align-items:stretch;max-height:calc(100vh - 50px);overflow-y:auto}.login-header[_ngcontent-%COMP%]{text-align:center;margin-bottom:16px}.login-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:24px;margin-bottom:16px;font-weight:700;color:var(--ion-color-primary)}.login-header-logo[_ngcontent-%COMP%]{text-align:center;margin:16px auto}.login-header-logo[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%]{width:150px;height:auto}.form-group[_ngcontent-%COMP%]{margin-bottom:16px}.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{display:block;margin-bottom:6px;font-weight:600;color:var(--ion-color-primary)}.form-group[_ngcontent-%COMP%]   label.required[_ngcontent-%COMP%]:after{content:"*";color:var(--ion-color-danger);margin-left:2px}.form-group[_ngcontent-%COMP%]   input[type=email][_ngcontent-%COMP%], .form-group[_ngcontent-%COMP%]   input[type=password][_ngcontent-%COMP%]{width:100%;padding:12px;border:1px solid #dcdcdc;border-radius:8px;font-size:16px;background-color:#f9f9f9;color:var(--ion-color-primary)}.form-group[_ngcontent-%COMP%]   input[type=email][_ngcontent-%COMP%]:focus, .form-group[_ngcontent-%COMP%]   input[type=password][_ngcontent-%COMP%]:focus{border-color:var(--ion-color-primary);outline:none}.forgot-password[_ngcontent-%COMP%]{text-align:right;margin-bottom:16px}.forgot-password[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:var(--ion-color-primary-tint);text-decoration:none;font-size:14px;font-weight:500}.forgot-password[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{color:var(--ion-color-primary)}.error-message[_ngcontent-%COMP%]{color:var(--ion-color-danger);background:rgba(var(--ion-color-danger-rgb),.12);padding:.8rem;border-radius:8px;margin-bottom:1rem;font-size:.9rem;text-align:center}']}),s})();const x=()=>({mode:"login"});function O(r,s){1&r&&(e.j41(0,"h1"),e.EFF(1,"Forgot Password"),e.k0s())}function E(r,s){1&r&&(e.j41(0,"p"),e.EFF(1,"Enter your email to receive a password reset link."),e.k0s())}function S(r,s){1&r&&(e.j41(0,"p",12),e.EFF(1,"Check your email for reset instructions."),e.k0s())}function R(r,s){if(1&r&&(e.j41(0,"div",13),e.EFF(1),e.k0s()),2&r){const i=e.XpG();e.R7$(),e.SpI(" ",i.errorMessage," ")}}function G(r,s){1&r&&(e.j41(0,"div",20),e.EFF(1," Please enter a valid email address. "),e.k0s())}function I(r,s){if(1&r){const i=e.RV6();e.j41(0,"form",14),e.bIt("ngSubmit",function(){e.eBV(i);const t=e.XpG();return e.Njj(t.onSubmit())}),e.j41(1,"div",15)(2,"label",16),e.EFF(3,"Email"),e.k0s(),e.nrm(4,"input",17),e.DNE(5,G,2,0,"div",18),e.k0s(),e.j41(6,"ion-button",19),e.EFF(7," Send Reset Link "),e.k0s()()}if(2&r){let i;const o=e.XpG();e.Y8G("formGroup",o.forgotPasswordForm),e.R7$(5),e.Y8G("ngIf",(null==(i=o.forgotPasswordForm.get("email"))?null:i.invalid)&&(null==(i=o.forgotPasswordForm.get("email"))?null:i.touched)),e.R7$(),e.Y8G("disabled",o.forgotPasswordForm.invalid)}}function j(r,s){1&r&&(e.j41(0,"p",21),e.EFF(1," Remembered your password? "),e.j41(2,"a",22),e.EFF(3,"Log In"),e.k0s()()),2&r&&(e.R7$(2),e.Y8G("queryParams",e.lJ4(1,x)))}let T=(()=>{var r;class s{constructor(o,t,a,d,P){this.fb=o,this.authService=t,this.settingsService=a,this.location=d,this.accessibilityService=P,this.emailSent=!1,this.errorMessage="",this.darkModeEnabled=!1,this.forgotPasswordForm=this.fb.group({email:["",[n.k0.required,n.k0.email]]})}ngOnInit(){this.settingsService.isDarkModeEnabled$.subscribe(o=>{this.darkModeEnabled=o})}onSubmit(){if(this.forgotPasswordForm.invalid)return this.errorMessage="Please enter a valid email address.",void this.accessibilityService.announce(this.errorMessage,"assertive");const o=this.forgotPasswordForm.value.email;this.errorMessage="",this.authService.sendPasswordReset(o).subscribe({next:()=>{this.emailSent=!0,this.errorMessage="",this.accessibilityService.announce("Password reset email sent. Please check your inbox.","polite")},error:t=>{this.errorMessage=this.getErrorMessage(t),this.accessibilityService.announce(this.errorMessage,"assertive")}})}goBack(){this.location.back(),this.accessibilityService.announce("Returned to the previous page.","polite")}getErrorMessage(o){return 404===o.status?"The email is not associated with a registered account.":400===o.status?"The email address provided is invalid.":500===o.status?"An error occurred on the server. Please try again later.":"An unexpected error occurred. Please try again."}}return(r=s).\u0275fac=function(o){return new(o||r)(e.rXU(n.ok),e.rXU(f.u),e.rXU(b.h),e.rXU(p.aZ),e.rXU(m.s))},r.\u0275cmp=e.VBU({type:r,selectors:[["app-forgot-password"]],decls:13,vars:7,consts:[[1,"forgot-password-page"],[1,"forgot-password-container"],["role","button","aria-label","Go back to the previous page",1,"back-button",3,"click"],["name","arrow-back-outline","aria-hidden","true"],[1,"forgot-password-header"],[1,"forgot-password-header-logo"],["alt","Your Website Guy Logo",1,"logo",3,"src"],[4,"ngIf"],["aria-live","polite",4,"ngIf"],["class","error-message","aria-live","assertive",4,"ngIf"],[3,"formGroup","ngSubmit",4,"ngIf"],["class","back-to-login-link",4,"ngIf"],["aria-live","polite"],["aria-live","assertive",1,"error-message"],[3,"ngSubmit","formGroup"],[1,"form-group"],["for","email",1,"required"],["type","email","id","email","formControlName","email","placeholder","Enter your email","required","","aria-required","true","aria-label","Enter your email address",1,"input-field"],["class","form-error","aria-live","assertive",4,"ngIf"],["type","submit","expand","block","aria-label","Send password reset link",3,"disabled"],["aria-live","assertive",1,"form-error"],[1,"back-to-login-link"],["routerLink","/auth","aria-label","Go to login page",3,"queryParams"]],template:function(o,t){1&o&&(e.j41(0,"div",0)(1,"div",1)(2,"div",2),e.bIt("click",function(){return t.goBack()}),e.nrm(3,"ion-icon",3),e.k0s(),e.j41(4,"div",4)(5,"div",5),e.nrm(6,"img",6),e.k0s(),e.DNE(7,O,2,0,"h1",7)(8,E,2,0,"p",7)(9,S,2,0,"p",8),e.k0s(),e.DNE(10,R,2,1,"div",9)(11,I,8,3,"form",10)(12,j,4,2,"p",11),e.k0s()()),2&o&&(e.R7$(6),e.Y8G("src",t.darkModeEnabled?"assets/logo-dark-mode.png":"assets/logo.png",e.B4B),e.R7$(),e.Y8G("ngIf",!t.emailSent),e.R7$(),e.Y8G("ngIf",!t.emailSent),e.R7$(),e.Y8G("ngIf",t.emailSent),e.R7$(),e.Y8G("ngIf",t.errorMessage),e.R7$(),e.Y8G("ngIf",!t.emailSent),e.R7$(),e.Y8G("ngIf",!t.emailSent))},dependencies:[p.bT,n.qT,n.me,n.BC,n.cb,n.YS,c.Jm,c.iq,c.oY,g.Wk,n.j4,n.JD],styles:['.error-message[_ngcontent-%COMP%]{color:var(--ion-color-danger);background:rgba(var(--ion-color-danger-rgb),.12);padding:.8rem;border-radius:8px;font-size:.9rem;text-align:center;margin-bottom:1rem}.back-button[_ngcontent-%COMP%]{cursor:pointer;font-size:1.6em;color:var(--ion-color-primary-tint);display:flex}.form-error[_ngcontent-%COMP%]{color:var(--ion-color-danger);font-size:.8rem;margin-top:.4rem;display:block;text-align:left}.forgot-password-page[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;padding:20px}.forgot-password-container[_ngcontent-%COMP%]{width:100%;max-width:400px;padding:20px;border-radius:8px;box-shadow:0 4px 12px #0000001a;animation:fadeInUp .4s ease-in-out;display:flex;flex-direction:column;align-items:stretch}.forgot-password-header[_ngcontent-%COMP%]{text-align:center;margin-bottom:16px}.forgot-password-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:24px;font-weight:700;color:var(--ion-color-primary);margin-bottom:8px}.forgot-password-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:14px;color:var(--ion-color-secondary-contrast);margin-bottom:16px}.forgot-password-header[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%]{width:150px;height:auto;margin:16px auto}.form-group[_ngcontent-%COMP%]{margin-bottom:16px}.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{display:block;margin-bottom:6px;font-weight:600;color:var(--ion-color-primary)}.form-group[_ngcontent-%COMP%]   label.required[_ngcontent-%COMP%]:after{content:"*";color:var(--ion-color-danger);margin-left:2px}.form-group[_ngcontent-%COMP%]   input[type=email][_ngcontent-%COMP%]{width:100%;padding:12px;border:1px solid #dcdcdc;border-radius:8px;font-size:16px;background-color:#f9f9f9;color:var(--ion-color-primary)}.form-group[_ngcontent-%COMP%]   input[type=email][_ngcontent-%COMP%]:focus{border-color:var(--ion-color-primary);outline:none}.back-to-login-link[_ngcontent-%COMP%]{text-align:center;margin-top:16px}.back-to-login-link[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:var(--ion-color-primary-tint);text-decoration:underline;font-size:14px}.back-to-login-link[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{color:var(--ion-color-primary)}']}),s})();const Y=()=>({mode:"login"});function $(r,s){if(1&r&&(e.j41(0,"div",19)(1,"p"),e.EFF(2),e.k0s()()),2&r){const i=e.XpG();e.R7$(2),e.JRh(i.errorMessage)}}function L(r,s){1&r&&(e.j41(0,"div",20),e.EFF(1," Password must be at least 6 characters long. "),e.k0s())}function A(r,s){1&r&&(e.j41(0,"div",20),e.EFF(1," Please confirm your password. "),e.k0s())}let D=(()=>{var r;class s{constructor(o,t,a,d){this.fb=o,this.authService=t,this.router=a,this.accessibilityService=d,this.token="",this.errorMessage=null,this.resetPasswordForm=this.fb.group({newPassword:["",[n.k0.required,n.k0.minLength(6)]],confirmPassword:["",[n.k0.required]]})}ngOnInit(){this.token?this.authService.validateResetToken(this.token).subscribe({next:o=>{o.success?(console.log(o.message),this.accessibilityService.announce("Reset token validated successfully.","polite")):this.handleError("Invalid or expired reset token.")},error:()=>{this.handleError("Failed to validate the reset token. Please try again.")}}):this.handleError("Invalid or missing reset token.")}handleError(o){this.errorMessage=o,this.accessibilityService.announce(o,"assertive"),this.router.navigateByUrl("/rewards")}onSubmit(){if(this.resetPasswordForm.invalid)return this.errorMessage="Please fill in all required fields correctly.",void this.accessibilityService.announce(this.errorMessage,"assertive");const{newPassword:o,confirmPassword:t}=this.resetPasswordForm.value;if(o!==t)return this.errorMessage="Passwords do not match. Please try again.",void this.accessibilityService.announce(this.errorMessage,"assertive");this.errorMessage=null,this.authService.resetPassword(o,this.token).subscribe({next:()=>{this.accessibilityService.announce("Password reset successful!","polite"),alert("Password reset successful!"),this.router.navigate(["/auth"],{queryParams:{mode:"login"}})},error:a=>{this.errorMessage=this.getErrorMessage(a),this.accessibilityService.announce(this.errorMessage,"assertive")}})}getErrorMessage(o){return 400===o.status?"The reset token is invalid or expired. Please request a new reset link.":500===o.status?"An error occurred on the server. Please try again later.":"An unexpected error occurred. Please try again."}}return(r=s).\u0275fac=function(o){return new(o||r)(e.rXU(n.ok),e.rXU(f.u),e.rXU(g.Ix),e.rXU(m.s))},r.\u0275cmp=e.VBU({type:r,selectors:[["app-reset-password"]],inputs:{token:"token"},decls:31,vars:8,consts:[[1,"reset-password-page"],[1,"reset-password-container"],[1,"reset-password-header"],[1,"reset-password-header-logo"],["src","assets/logo.png","alt","Your Website Guy Logo",1,"logo"],["id","reset-password-heading"],["id","reset-password-description"],["class","error-message","role","alert","aria-live","assertive",4,"ngIf"],["aria-labelledby","reset-password-heading","aria-describedby","reset-password-description",3,"ngSubmit","formGroup"],[1,"form-group"],["for","new-password"],[1,"sr-only"],["type","password","id","new-password","formControlName","newPassword","placeholder","Enter your new password","required","","aria-required","true","aria-describedby","new-password-requirements",1,"input-field"],["class","form-error","role","alert","aria-live","assertive",4,"ngIf"],["for","confirm-password"],["type","password","id","confirm-password","formControlName","confirmPassword","placeholder","Confirm your new password","required","","aria-required","true",1,"input-field"],["type","submit",1,"submit-button",3,"disabled"],[1,"back-to-login-link"],["routerLink","/auth","aria-label","Go to login page",3,"queryParams"],["role","alert","aria-live","assertive",1,"error-message"],["role","alert","aria-live","assertive",1,"form-error"]],template:function(o,t){if(1&o&&(e.j41(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3),e.nrm(4,"img",4),e.k0s(),e.j41(5,"h1",5),e.EFF(6,"Reset Password"),e.k0s(),e.j41(7,"p",6),e.EFF(8,"Enter your new password below to reset your account."),e.k0s()(),e.DNE(9,$,3,1,"div",7),e.j41(10,"form",8),e.bIt("ngSubmit",function(){return t.onSubmit()}),e.j41(11,"div",9)(12,"label",10),e.EFF(13,"New Password* "),e.j41(14,"span",11),e.EFF(15,"(required)"),e.k0s()(),e.nrm(16,"input",12),e.DNE(17,L,2,0,"div",13),e.k0s(),e.j41(18,"div",9)(19,"label",14),e.EFF(20,"Confirm Password* "),e.j41(21,"span",11),e.EFF(22,"(required)"),e.k0s()(),e.nrm(23,"input",15),e.DNE(24,A,2,0,"div",13),e.k0s(),e.j41(25,"button",16),e.EFF(26," Reset Password "),e.k0s()(),e.j41(27,"p",17),e.EFF(28," Remembered your password? "),e.j41(29,"a",18),e.EFF(30,"Log In"),e.k0s()()()()),2&o){let a,d;e.R7$(9),e.Y8G("ngIf",t.errorMessage),e.R7$(),e.Y8G("formGroup",t.resetPasswordForm),e.R7$(7),e.Y8G("ngIf",(null==(a=t.resetPasswordForm.get("newPassword"))?null:a.invalid)&&(null==(a=t.resetPasswordForm.get("newPassword"))?null:a.touched)),e.R7$(7),e.Y8G("ngIf",(null==(d=t.resetPasswordForm.get("confirmPassword"))?null:d.invalid)&&(null==(d=t.resetPasswordForm.get("confirmPassword"))?null:d.touched)),e.R7$(),e.Y8G("disabled",t.resetPasswordForm.invalid),e.BMQ("aria-disabled",t.resetPasswordForm.invalid),e.R7$(4),e.Y8G("queryParams",e.lJ4(7,Y))}},dependencies:[p.bT,n.qT,n.me,n.BC,n.cb,n.YS,c.oY,g.Wk,n.j4,n.JD],styles:[".form-error[_ngcontent-%COMP%]{color:var(--ion-color-danger);font-size:.8rem;margin-top:.4rem;display:block;text-align:left;padding-left:.2rem}.error-message[_ngcontent-%COMP%]{color:var(--ion-color-danger);background:rgba(var(--ion-color-danger-rgb),.12);padding:.8rem;border-radius:8px;margin-bottom:1rem;font-size:.9rem;text-align:center}.reset-password-page[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;padding:20px}.reset-password-container[_ngcontent-%COMP%]{width:100%;max-width:400px;padding:20px;border-radius:8px;box-shadow:0 4px 12px #0000001a;animation:fadeInUp .4s ease-in-out;display:flex;flex-direction:column;align-items:stretch}.reset-password-header[_ngcontent-%COMP%]{text-align:center;margin-bottom:16px}.reset-password-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:24px;font-weight:700;color:#333;margin-bottom:8px}.reset-password-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:14px;color:#666;margin-bottom:16px}.reset-password-header[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%]{width:150px;height:auto;margin:16px auto}.form-group[_ngcontent-%COMP%]{margin-bottom:16px}.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{display:block;margin-bottom:6px;font-weight:600;color:#333}.form-group[_ngcontent-%COMP%]   input[type=password][_ngcontent-%COMP%]{width:100%;padding:12px;border:1px solid #dcdcdc;border-radius:8px;font-size:16px;background-color:#f9f9f9;color:#333}.form-group[_ngcontent-%COMP%]   input[type=password][_ngcontent-%COMP%]:focus{border-color:#4caf50;outline:none}button[type=submit][_ngcontent-%COMP%]{width:100%;padding:14px;background-color:#4caf50;color:#fff;border:none;border-radius:8px;font-size:18px;font-weight:700;cursor:pointer;transition:background-color .3s}button[type=submit][_ngcontent-%COMP%]:hover{background-color:#3d8b40}button[type=submit][_ngcontent-%COMP%]:disabled{background-color:#e0e0e0;cursor:not-allowed}.back-to-login-link[_ngcontent-%COMP%]{text-align:center;margin-top:16px}.back-to-login-link[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:#4caf50;text-decoration:underline;font-size:14px}.back-to-login-link[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{color:#3d8b40}"]}),s})();function U(r,s){1&r&&e.nrm(0,"app-login",6)}function q(r,s){1&r&&e.nrm(0,"app-register",7)}function X(r,s){1&r&&e.nrm(0,"app-forgot-password",8)}function N(r,s){if(1&r&&e.nrm(0,"app-reset-password",9),2&r){const i=e.XpG();e.Y8G("token",i.resetToken)}}const B=[{path:"",component:(()=>{var r;class s{constructor(o,t){this.route=o,this.accessibilityService=t,this.showMode="login",this.resetToken="",this.route.queryParams.subscribe(({mode:a,token:d})=>{this.showMode=a,this.accessibilityService.announce(`${this.getModeLabel(a)} loaded`,"polite"),d&&(this.resetToken=d)})}getModeLabel(o){switch(o){case"login":return"Login form";case"register":return"Registration form";case"forgot-password":return"Forgot password form";case"reset-password":return"Reset password form";default:return"Authentication form"}}}return(r=s).\u0275fac=function(o){return new(o||r)(e.rXU(g.nX),e.rXU(m.s))},r.\u0275cmp=e.VBU({type:r,selectors:[["app-auth"]],decls:7,vars:5,consts:[["role","main",1,"auth-container"],[3,"ngSwitch"],["aria-label","Login Form",4,"ngSwitchCase"],["aria-label","Registration Form",4,"ngSwitchCase"],["aria-label","Forgot Password Form",4,"ngSwitchCase"],["aria-label","Reset Password Form",3,"token",4,"ngSwitchCase"],["aria-label","Login Form"],["aria-label","Registration Form"],["aria-label","Forgot Password Form"],["aria-label","Reset Password Form",3,"token"]],template:function(o,t){1&o&&(e.j41(0,"ion-content")(1,"div",0),e.qex(2,1),e.DNE(3,U,1,0,"app-login",2)(4,q,1,0,"app-register",3)(5,X,1,0,"app-forgot-password",4)(6,N,1,1,"app-reset-password",5),e.bVm(),e.k0s()()),2&o&&(e.R7$(2),e.Y8G("ngSwitch",t.showMode),e.R7$(),e.Y8G("ngSwitchCase","login"),e.R7$(),e.Y8G("ngSwitchCase","register"),e.R7$(),e.Y8G("ngSwitchCase","forgot-password"),e.R7$(),e.Y8G("ngSwitchCase","reset-password"))},dependencies:[p.ux,p.e1,c.W9,u.d,F,T,D],styles:[".auth-container[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;height:100%}"]}),s})()}];let z=(()=>{var r;class s{}return(r=s).\u0275fac=function(o){return new(o||r)},r.\u0275mod=e.$C({type:r}),r.\u0275inj=e.G2t({imports:[g.iI.forChild(B),g.iI]}),s})();var W=l(3887);let J=(()=>{var r;class s{}return(r=s).\u0275fac=function(o){return new(o||r)},r.\u0275mod=e.$C({type:r}),r.\u0275inj=e.G2t({imports:[p.MD,n.YN,c.bv,z,n.X1,n.X1,W.G]}),s})()},3887:(w,h,l)=>{l.d(h,{G:()=>m});var p=l(177),n=l(4742),c=l(4341),g=l(6549),e=l(4438);let m=(()=>{var u;class f{}return(u=f).\u0275fac=function(v){return new(v||u)},u.\u0275mod=e.$C({type:u}),u.\u0275inj=e.G2t({imports:[p.MD,n.bv,c.YN,g.iI,c.X1]}),f})()}}]);
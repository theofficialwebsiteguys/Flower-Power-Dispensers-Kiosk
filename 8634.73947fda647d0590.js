"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[8634],{2431:(U,S,r)=>{r.d(S,{m:()=>f});var u=r(467),t=r(4412),P=r(5312),v=r(5083),b=r(4438),x=r(1626),O=r(671),C=r(3117);let f=(()=>{var E;class m{constructor(o,s,c){this.http=o,this.authService=s,this.employeeService=c,this.cartKey="cart",this.cartSubject=new t.t(this.getCart()),this.cart$=this.cartSubject.asObservable(),this.inactivityTime=0,this.inactivityLimit=600,this.userId=null,this.lastNotificationKey="lastCartAbandonmentNotification",sessionStorage.getItem(this.cartKey)||sessionStorage.setItem(this.cartKey,JSON.stringify([])),this.authService.isLoggedIn().subscribe(d=>{d&&this.authService.getUserInfo().subscribe(l=>{l&&(this.userId=l.id,sessionStorage.removeItem(this.lastNotificationKey),this.setupTracking())})})}setupTracking(){document.addEventListener("mousemove",()=>this.resetInactivity()),document.addEventListener("keypress",()=>this.resetInactivity());const o=()=>{this.inactivityTime+=1,this.inactivityTime>this.inactivityLimit&&this.getCart().length>0&&this.handleAbandonedCart(),this.inactivityTimer=setTimeout(o,1e3)};o()}ngOnDestroy(){this.inactivityTimer&&clearTimeout(this.inactivityTimer)}resetInactivity(){0===this.getCart().length&&sessionStorage.removeItem(this.lastNotificationKey),this.inactivityTime>0&&(this.inactivityTime=0)}handleAbandonedCart(){const o=this.getCart(),s=sessionStorage.getItem(this.lastNotificationKey);o.length>0&&this.userId&&!s&&(this.sendCartAbandonmentNotification(this.userId),sessionStorage.setItem(this.lastNotificationKey,"sent"))}sendCartAbandonmentNotification(o){return(0,u.A)(function*(){const s={userId:o,title:"Forget To Checkout?",body:"Come back to checkout and feel the power of the flower!"},c=localStorage.getItem("sessionData"),l={Authorization:c?JSON.parse(c).token:null,"Content-Type":"application/json"};try{const g=yield v.pX.post({url:`${P.c.apiUrl}/notifications/send-push`,headers:l,data:s});console.log("Cart abandonment notification sent",g)}catch(g){console.error("Error sending notification",g)}})()}getCart(){const o=sessionStorage.getItem(this.cartKey);return o?JSON.parse(o):[]}addToCart(o){const s=this.getCart(),c=s.findIndex(d=>d.id===o.id);-1!==c?s[c].quantity+=o.quantity:s.push(o),this.saveCart(s)}updateQuantity(o,s){const c=this.getCart(),d=c.findIndex(l=>l.id===o);-1!==d&&(c[d].quantity=s,c[d].quantity<=0&&c.splice(d,1),this.saveCart(c))}removeFromCart(o){const c=this.getCart().filter(d=>d.id!==o);this.saveCart(c)}clearCart(){this.saveCart([])}checkout(o,s,c,d){var l=this;const g=this.getCart();let a,n=0,_=0;const e=[...g],i=function(){var y=(0,u.A)(function*(){a=yield l.authService.getCurrentUser(),console.log(a)});return function(){return y.apply(this,arguments)}}(),p=function(){var y=(0,u.A)(function*(){const A={id_customer:null!=d?d:a.alleaves_customer_id,id_external:null,id_location:1e3,id_status:1,type:s,use_type:"adult",auto_apply_discount_exclusions:[],delivery_address:"delivery"===s?c:null,complete:!1,verified:!1,packed:!1,scheduled:!1};n=(yield l.createOrder(A)).id_order});return function(){return y.apply(this,arguments)}}(),h=function(){var y=(0,u.A)(function*(){_=(yield l.addCheckoutItemsToOrder(n,e)).reduce((k,T)=>k+(T.price||0),0)});return function(){return y.apply(this,arguments)}}(),M=function(){var y=(0,u.A)(function*(){let A=o/20;const k=[...e].sort((T,D)=>D.price-T.price);for(const T of k){if(A<=0)break;const D=Math.min(Number(T.price),A);A-=D;const j=Number(T.price)-D,B={url:`https://app.alleaves.com/api/order/${n}/item/${T.posProductId}`,method:"PUT",headers:{Authorization:`Bearer ${JSON.parse(sessionStorage.getItem("authTokensAlleaves")||"{}")}`,"Content-Type":"application/json; charset=utf-8",Accept:"application/json; charset=utf-8"},data:{price_override:j,price_override_reason:"Points redemption applied"}};yield v.pX.request(B)}});return function(){return y.apply(this,arguments)}}();return(0,u.A)(function*(){try{return yield i(),yield p(),yield h(),yield M(),{user_info:a,id_order:n,checkoutItems:e,subtotal:_}}catch(y){throw console.error("Checkout process failed:",y),y}})()}saveCart(o){sessionStorage.setItem(this.cartKey,JSON.stringify(o)),this.cartSubject.next(o)}fetchInventory(o,s){return(0,u.A)(function*(){console.log(sessionStorage.getItem("authTokensAlleaves"));const g={url:"https://app.alleaves.com/api/inventory/search",method:"POST",headers:{Authorization:`Bearer ${JSON.parse(sessionStorage.getItem("authTokensAlleaves")||"{}")}`,"Content-Type":"application/json; charset=utf-8",Accept:"application/json; charset=utf-8"},data:{skip:o,take:s}};return v.pX.request(g).then(n=>n.data).catch(n=>{throw console.error("Error fetching inventory:",n),n})})()}createCustomer(o){return(0,u.A)(function*(){const d={url:"https://app.alleaves.com/api/customer",method:"POST",headers:{Authorization:`Bearer ${JSON.parse(sessionStorage.getItem("authTokensAlleaves")||"{}")}`,"Content-Type":"application/json; charset=utf-8",Accept:"application/json; charset=utf-8"},data:o};return v.pX.request(d).then(l=>l.data).catch(l=>{throw console.error("Error creating User:",l),l})})()}createOrder(o){return(0,u.A)(function*(){const d={url:"https://app.alleaves.com/api/order",method:"POST",headers:{Authorization:`Bearer ${JSON.parse(sessionStorage.getItem("authTokensAlleaves")||"{}")}`,"Content-Type":"application/json; charset=utf-8",Accept:"application/json; charset=utf-8"},data:o};return v.pX.request(d).then(l=>l.data).catch(l=>{throw console.error("Error creating order:",l),l})})()}addCheckoutItemsToOrder(o,s){return(0,u.A)(function*(){const c={Authorization:`Bearer ${JSON.parse(sessionStorage.getItem("authTokensAlleaves")||"{}")}`,"Content-Type":"application/json; charset=utf-8",Accept:"application/json; charset=utf-8"},d=`https://app.alleaves.com/api/order/${o}/item`,l=[];for(const n of s){const a={url:d,method:"POST",headers:c,data:{id_batch:n.id_batch,id_area:1e3,qty:n.quantity}};try{var g;const e=yield v.pX.request(a);if(null!=e&&null!==(g=e.data)&&void 0!==g&&g.items){const i=e.data.items.map(p=>({...n,id_item:p.id_item}));l.push(...i)}else console.warn(`Unexpected response format for item ${n.id_batch}:`,e)}catch(e){console.error(`Error adding item (id_batch: ${n.id_batch}):`,e);continue}}return l})()}placeOrder(o=562,s,c,d,l,g){var n=this;return(0,u.A)(function*(){const _=n.employeeService.getSelectedUser(),e={user_id:o,pos_order_id:s,points_add:c,points_redeem:d,amount:l,cart:g};_&&_.id&&(e.employee_id=n.authService.getCurrentUser().id);const i=localStorage.getItem("sessionData"),p=i?JSON.parse(i).token:null,h={"Content-Type":"application/json",Accept:"application/json"};if(n.authService.isGuest())h["x-auth-api-key"]=P.c.db_api_key;else{if(!p)throw console.error("No authentication token found"),new Error("Unauthorized: No API key or token found");h.Authorization=`${p}`}return v.pX.request({url:`${P.c.apiUrl}/orders/create`,method:"POST",headers:h,data:e}).then(y=>(n.clearCart(),y.data)).catch(y=>{throw console.error("Error in placeOrder:",y),y})})()}updateOrder(o,s,c,d,l){return(0,u.A)(function*(){const g={id_order:o,pickup_date:s,pickup_time:c,id_customer:l,id_location:1e3},n={Authorization:`Bearer ${JSON.parse(sessionStorage.getItem("authTokensAlleaves")||"{}")}`,"Content-Type":"application/json; charset=utf-8",Accept:"application/json; charset=utf-8"};return v.pX.request({url:`https://app.alleaves.com/api/order/${o}`,method:"PUT",headers:n,data:g}).then(a=>a.data).catch(a=>{throw console.error("Error in updateOrder:",a),a})})()}createAlleavesCustomer(o){return(0,u.A)(function*(){try{const s={method:"POST",url:"https://app.alleaves.com/api/customer",headers:{Authorization:`Bearer ${JSON.parse(sessionStorage.getItem("authTokensAlleaves")||"{}")}`,"Content-Type":"application/json; charset=utf-8",Accept:"application/json; charset=utf-8"},data:{name_first:o.fname,name_last:o.lname,phone:o.phone,email:o.email,date_of_birth:o.dob}},c=yield v.pX.request(s);return console.log("External API Response:",c),c.data}catch(s){throw console.error("Error calling Alleaves API:",s),new Error("Failed to create Alleaves customer")}})()}}return(E=m).\u0275fac=function(o){return new(o||E)(b.KVO(x.Qq),b.KVO(O.u),b.KVO(C.O))},E.\u0275prov=b.jDH({token:E,factory:E.\u0275fac,providedIn:"root"}),m})()},3117:(U,S,r)=>{r.d(S,{O:()=>O});var u=r(1626),t=r(4412),P=r(9437),v=r(8810),b=r(5312),x=r(4438);let O=(()=>{var C;class f{constructor(m){this.http=m,this.selectedUserSubject=new t.t(null),this.selectedUser$=this.selectedUserSubject.asObservable()}getHeaders(){const m=localStorage.getItem("sessionData"),I=m?JSON.parse(m).token:null;if(!I)throw console.error("No API key found, user needs to log in."),new Error("Unauthorized: No API key found");return new u.Lr({Authorization:I})}getUserByEmail(m){return this.http.get(`${b.c.apiUrl}/users/email?email=${m}`,{headers:this.getHeaders()}).pipe((0,P.W)(I=>(console.error("Error fetching user by email:",I),(0,v.$)(()=>I))))}getUserByPhone(m){return this.http.get(`${b.c.apiUrl}/users/phone?phone=${m}`,{headers:this.getHeaders()}).pipe((0,P.W)(I=>(console.error("Error fetching user by phone:",I),(0,v.$)(()=>I))))}setSelectedUser(m){this.selectedUserSubject.next(m)}clearSelectedUser(){this.selectedUserSubject.next(null)}getSelectedUser(){return this.selectedUserSubject.getValue()}}return(C=f).\u0275fac=function(m){return new(m||C)(x.KVO(u.Qq))},C.\u0275prov=x.jDH({token:C,factory:C.\u0275fac,providedIn:"root"}),f})()},2152:(U,S,r)=>{r.d(S,{l:()=>g});var u=r(467),t=r(4438),P=r(671),v=r(9216),b=r(2431),x=r(6549),O=r(7423),C=r(177),f=r(4742);const E=()=>({mode:"login"});function m(n,_){1&n&&(t.j41(0,"ion-button",11),t.EFF(1," Log In "),t.k0s()),2&n&&t.Y8G("queryParams",t.lJ4(1,E))}function I(n,_){if(1&n&&(t.j41(0,"ion-label",12),t.EFF(1),t.k0s()),2&n){const a=t.XpG();t.R7$(),t.SpI("Welcome ",a.userName," -")}}function o(n,_){if(1&n&&(t.j41(0,"ion-label",12),t.EFF(1),t.k0s()),2&n){const a=t.XpG();t.R7$(),t.SpI(" ",a.userPoints," Points")}}function s(n,_){if(1&n&&(t.j41(0,"ion-badge",13),t.EFF(1),t.k0s()),2&n){const a=t.XpG();t.BMQ("aria-label",a.cartItemCount+" items in cart"),t.R7$(),t.SpI(" ",a.cartItemCount," ")}}function c(n,_){1&n&&(t.j41(0,"div",22),t.EFF(1," No new notifications. "),t.k0s())}function d(n,_){if(1&n){const a=t.RV6();t.j41(0,"div",23),t.bIt("click",function(){const i=t.eBV(a).$implicit,p=t.XpG(2);return t.Njj(p.markAsRead(i))}),t.nrm(1,"ion-icon",24),t.j41(2,"span"),t.EFF(3),t.k0s(),t.j41(4,"ion-button",25),t.bIt("click",function(){const i=t.eBV(a).$implicit,p=t.XpG(2);return t.Njj(p.clearNotification(i))}),t.EFF(5,"Clear"),t.k0s()()}if(2&n){const a=_.$implicit;t.AVh("unread",!a.read),t.R7$(3),t.JRh(a.message)}}function l(n,_){if(1&n){const a=t.RV6();t.j41(0,"ion-header")(1,"ion-toolbar")(2,"ion-title",14),t.EFF(3,"Notifications"),t.k0s(),t.j41(4,"ion-buttons",4)(5,"ion-button",15),t.bIt("click",function(){t.eBV(a);const i=t.XpG();return t.Njj(i.closeNotifications())}),t.nrm(6,"ion-icon",16),t.k0s()()()(),t.j41(7,"div",17),t.DNE(8,c,2,0,"div",18)(9,d,6,3,"div",19),t.j41(10,"div",20)(11,"ion-button",21),t.bIt("click",function(){t.eBV(a);const i=t.XpG();return t.Njj(i.clearAllNotifications())}),t.EFF(12," Clear All "),t.k0s()()()}if(2&n){const a=t.XpG();t.R7$(8),t.Y8G("ngIf",0===a.notifications.length),t.R7$(),t.Y8G("ngForOf",a.notifications)}}let g=(()=>{var n;class _{constructor(e,i,p,h,M){this.authService=e,this.settingsService=i,this.cartService=p,this.router=h,this.accessibilityService=M,this.isLoggedIn=!1,this.darkModeEnabled=!1,this.userPoints=0,this.cartItemCount=0,this.showNotifications=!1,this.unreadCount=2,this.userName="",this.notifications=[],this.isGuest=!1}ngOnInit(){var e=this;return(0,u.A)(function*(){e.authService.isLoggedIn().subscribe(function(){var i=(0,u.A)(function*(p){e.isLoggedIn=p,p?(e.authService.guest$.subscribe(h=>{e.isGuest=h,console.log(h)}),e.authService.getUserInfo().subscribe(h=>{h&&(e.userPoints=h.points,e.userName=h.fname,e.accessibilityService.announce(`You have ${e.userPoints} reward points.`,"polite"))})):e.accessibilityService.announce("You are logged out.","polite")});return function(p){return i.apply(this,arguments)}}()),e.settingsService.isDarkModeEnabled$.subscribe(i=>{e.darkModeEnabled=i,e.accessibilityService.announce((i?"Dark mode":"Light mode")+" is enabled.","polite")}),e.cartService.cart$.subscribe(i=>{const p=i.reduce((h,M)=>h+M.quantity,0);e.cartItemCount!==p&&(e.cartItemCount=p,e.accessibilityService.announce(`You have ${e.cartItemCount} items in your cart.`,"polite"))})})()}refreshApp(){window.location.reload()}markAllNotificationsAsRead(){var e=this;return(0,u.A)(function*(){if(e.unreadCount>0)try{yield e.settingsService.markAllNotificationsAsRead(e.authService.getCurrentUser().id),e.notifications.forEach(i=>i.status="read"),e.unreadCount=0}catch(i){console.error("Error marking all notifications as read:",i)}})()}toggleNotifications(){this.showNotifications=!0,this.markAllNotificationsAsRead()}closeNotifications(){this.showNotifications=!1}clearNotification(e){var i=this;return(0,u.A)(function*(){const p=i.notifications.indexOf(e);if(p>-1){i.notifications.splice(p,1),i.unreadCount--;try{yield i.settingsService.deleteNotification(e.id)}catch(h){console.error("Error deleting notification:",h)}}})()}clearAllNotifications(){var e=this;return(0,u.A)(function*(){try{yield e.settingsService.deleteAllNotifications(e.authService.getCurrentUser().id),e.notifications=[],e.unreadCount=0}catch(i){console.error("Error deleting all notifications:",i)}})()}markAsRead(e){e.read||(e.read=!0,this.unreadCount--)}logout(){this.authService.logout(),this.accessibilityService.announce("You have been logged out successfully.","polite")}goToCart(){this.router.navigateByUrl("/cart"),this.accessibilityService.announce("Navigating to your shopping cart.","polite")}}return(n=_).\u0275fac=function(e){return new(e||n)(t.rXU(P.u),t.rXU(v.h),t.rXU(b.m),t.rXU(x.Ix),t.rXU(O.s))},n.\u0275cmp=t.VBU({type:n,selectors:[["app-header"]],decls:14,vars:6,consts:[[1,"heading-container"],["slot","start"],["aria-label","Go to home page",1,"action-button",3,"click"],["alt","Company logo",1,"logo",3,"src"],["slot","end"],["class","action-button","routerLink","/auth","aria-label","Log in to your account",3,"queryParams",4,"ngIf"],["class","points-display","aria-live","polite",4,"ngIf"],["routerLink","/cart","aria-label","View your shopping cart",1,"action-button","cart-button"],[1,"fas","fa-cart-shopping"],["class","cart-badge",4,"ngIf"],["aria-labelledby","sort-filter-title",3,"ionModalDidDismiss","isOpen"],["routerLink","/auth","aria-label","Log in to your account",1,"action-button",3,"queryParams"],["aria-live","polite",1,"points-display"],[1,"cart-badge"],["id","sort-filter-title"],["aria-label","Close notifications",3,"click"],["slot","icon-only","name","close","aria-hidden","true"],[1,"filters-container"],["class","empty-notifications",4,"ngIf"],["class","notification-item",3,"unread","click",4,"ngFor","ngForOf"],[1,"sticky-footer"],["fill","solid","expand","full",1,"clear-all-button",3,"click"],[1,"empty-notifications"],[1,"notification-item",3,"click"],["name","alert-circle","aria-hidden","true",1,"notification-icon"],["fill","clear","slot","end",3,"click"]],template:function(e,i){1&e&&(t.j41(0,"ion-toolbar",0)(1,"ion-buttons",1)(2,"ion-button",2),t.bIt("click",function(){return i.refreshApp()}),t.nrm(3,"img",3),t.k0s()(),t.j41(4,"ion-buttons",4),t.DNE(5,m,2,2,"ion-button",5),t.qex(6),t.DNE(7,I,2,1,"ion-label",6)(8,o,2,1,"ion-label",6),t.j41(9,"ion-button",7),t.nrm(10,"i",8),t.DNE(11,s,2,2,"ion-badge",9),t.k0s(),t.bVm(),t.k0s()(),t.j41(12,"ion-modal",10),t.bIt("ionModalDidDismiss",function(){return i.closeNotifications()}),t.DNE(13,l,13,2,"ng-template"),t.k0s()),2&e&&(t.R7$(3),t.Y8G("src",i.darkModeEnabled?"assets/logo-dark-mode.png":"assets/logo.png",t.B4B),t.R7$(2),t.Y8G("ngIf",!i.isLoggedIn||i.isGuest),t.R7$(2),t.Y8G("ngIf",i.isLoggedIn&&!i.isGuest),t.R7$(),t.Y8G("ngIf",i.isLoggedIn&&!i.isGuest),t.R7$(3),t.Y8G("ngIf",i.cartItemCount>0),t.R7$(),t.Y8G("isOpen",i.showNotifications))},dependencies:[C.Sq,C.bT,f.In,f.Jm,f.QW,f.eU,f.iq,f.he,f.BC,f.ai,f.Sb,f.N7,x.Wk],styles:["img[_ngcontent-%COMP%]{height:55px}.cart-button[_ngcontent-%COMP%]{position:relative;--background: transparent;--box-shadow: none;padding:0}.cart-button[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{font-size:22px;color:var(--ion-color-primary)}.cart-badge[_ngcontent-%COMP%]{position:absolute;top:-4px;right:-6px;background:var(--ion-color-secondary);color:#fff;font-size:10px;font-weight:700;padding:2px 6px;border-radius:50%;min-width:16px;height:16px;display:flex;align-items:center;justify-content:center;box-shadow:0 0 2px #0003}.action-button[_ngcontent-%COMP%]{position:relative;padding:10px}.action-button[_ngcontent-%COMP%]{text-transform:capitalize;--border-radius: 0 !important}.action-button[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{text-decoration:none;color:#000}.points-display[_ngcontent-%COMP%]{font-size:14px;font-weight:700;margin-left:8px;color:var(--ion-color-primary)}.heading-container[_ngcontent-%COMP%]{position:sticky;top:0;z-index:1;background:#fff;padding:calc(5px + env(safe-area-inset-top)) 5px 5px 5px;box-shadow:0 2px 4px #0000001a}ion-icon[name=cart-outline][_ngcontent-%COMP%]{font-size:24px;color:var(--ion-color-primary)}.notification-button[_ngcontent-%COMP%]{position:relative;--background: transparent;--box-shadow: none;padding:0}.notification-button[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{font-size:22px;color:var(--ion-color-primary)}.notification-badge[_ngcontent-%COMP%]{position:absolute;top:-4px;right:-6px;background:var(--ion-color-secondary);color:#fff;font-size:10px;font-weight:700;padding:2px 6px;border-radius:50%;min-width:16px;height:16px;display:flex;align-items:center;justify-content:center;box-shadow:0 0 2px #0003}.modal-container[_ngcontent-%COMP%]{display:flex;flex-direction:column;height:100%;background-color:#f7f7f7;border-radius:10px;padding:10px;overflow:hidden}.notification-content[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:8px;padding:16px}.clear-all-button[_ngcontent-%COMP%]{margin:0;color:#fff;font-weight:700;border-radius:8px;box-shadow:0 2px 5px #0000001a}.sticky-footer[_ngcontent-%COMP%]{position:sticky;margin-top:10px;bottom:0;background:#fff;padding:10px;border-top:1px solid #ddd;box-shadow:0 -2px 4px #0000001a;z-index:10}.notification-item[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;padding:12px;border-radius:6px;box-shadow:0 2px 4px #0000001a;cursor:pointer;font-size:14px;transition:background .3s ease}.notification-item.unread[_ngcontent-%COMP%]{font-weight:700}.notification-item[_ngcontent-%COMP%]:hover{background-color:#e0e0e0}.notification-icon[_ngcontent-%COMP%]{font-size:18px;margin-right:12px;color:var(--ion-color-primary)}ion-button.clear[_ngcontent-%COMP%]{font-size:12px;color:var(--ion-color-danger);padding:0;margin-left:12px}.empty-notifications[_ngcontent-%COMP%]{text-align:center;color:#aaa;font-size:16px}"]}),_})()},3887:(U,S,r)=>{r.d(S,{G:()=>x});var u=r(177),t=r(4742),P=r(4341),v=r(6549),b=r(4438);let x=(()=>{var O;class C{}return(O=C).\u0275fac=function(E){return new(E||O)},O.\u0275mod=b.$C({type:O}),O.\u0275inj=b.G2t({imports:[u.MD,t.bv,P.YN,v.iI,P.X1]}),C})()}}]);
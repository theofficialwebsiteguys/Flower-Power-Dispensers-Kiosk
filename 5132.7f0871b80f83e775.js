"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[5132],{5132:(T,d,r)=>{r.r(d),r.d(d,{ProductDisplayPageModule:()=>w});var s=r(177),g=r(4341),a=r(4742),l=r(6549),m=r(5862),t=r(4438),p=r(1369),h=r(2152),P=r(1790),y=r(467),f=r(2431),b=r(671),v=r(7423);const _=()=>({mode:"register"});function C(o,c){if(1&o){const i=t.RV6();t.j41(0,"span",15),t.bIt("click",function(){t.eBV(i);const e=t.XpG();return t.Njj(e.toggleDescription())})("keydown.enter",function(){t.eBV(i);const e=t.XpG();return t.Njj(e.toggleDescription())})("keydown.space",function(){t.eBV(i);const e=t.XpG();return t.Njj(e.toggleDescription())}),t.EFF(1),t.k0s()}if(2&o){const i=t.XpG();t.BMQ("aria-expanded",i.showFullDescription)("aria-label",i.showFullDescription?"See less of the product description":"See more of the product description"),t.R7$(),t.SpI(" ",i.showFullDescription?"See Less":"See More"," ")}}function k(o,c){if(1&o){const i=t.RV6();t.qex(0),t.j41(1,"div",16)(2,"button",17),t.bIt("click",function(){t.eBV(i);const e=t.XpG();return t.Njj(e.decrementQuantity())}),t.EFF(3,"-"),t.k0s(),t.j41(4,"span",18),t.EFF(5),t.k0s(),t.j41(6,"button",19),t.bIt("click",function(){t.eBV(i);const e=t.XpG();return t.Njj(e.incrementQuantity())}),t.EFF(7,"+"),t.k0s()(),t.j41(8,"ion-button",20),t.bIt("click",function(){t.eBV(i);const e=t.XpG();return t.Njj(e.addToCart())}),t.EFF(9," Add to Cart "),t.k0s(),t.bVm()}if(2&o){const i=t.XpG();t.R7$(5),t.JRh(i.quantity),t.R7$(3),t.BMQ("aria-label","Add "+i.currentProduct.title+" to cart")}}function x(o,c){if(1&o&&(t.j41(0,"ion-button",21),t.EFF(1," Register to Add to Cart "),t.k0s()),2&o){const i=t.XpG();t.Y8G("queryParams",t.lJ4(2,_)),t.BMQ("aria-label","Register to add "+i.currentProduct.title+" to your cart")}}let M=(()=>{var o;class c{constructor(n,e,u,D,j,I,R){this.productService=n,this.cartService=e,this.authService=u,this.location=D,this.router=j,this.toastController=I,this.accessibilityService=R,this.currentProduct={id:"",posProductId:"",category:"FLOWER",title:"",brand:"",desc:"",strainType:"HYBRID",thc:"",weight:"",price:"",quantity:0,image:""},this.showFullDescription=!1,this.quantity=1,this.isLoggedIn=!1}ngOnInit(){this.productService.currentProduct$.subscribe(n=>{n?(this.currentProduct=n,this.quantity=1,this.accessibilityService.announce(`Now viewing ${n.title} by ${n.brand}.`,"polite")):this.router.navigateByUrl("/home")}),this.authService.isLoggedIn().subscribe(n=>{this.isLoggedIn=n})}ngOnDestroy(){this.quantity=1}toggleDescription(){this.showFullDescription=!this.showFullDescription,this.accessibilityService.announce(this.showFullDescription?"Full description shown.":"Description collapsed.","polite")}getDescription(){return this.currentProduct.desc?this.showFullDescription||this.currentProduct.desc.length<=75?this.currentProduct.desc:this.currentProduct.desc.substring(0,75)+"...":""}goBack(){this.location.back(),this.accessibilityService.announce("Returned to the previous page.","polite")}incrementQuantity(){this.quantity<this.currentProduct.quantity&&(this.quantity++,this.accessibilityService.announce(`Quantity increased to ${this.quantity}.`,"polite"))}decrementQuantity(){this.quantity>1&&(this.quantity--,this.accessibilityService.announce(`Quantity decreased to ${this.quantity}.`,"polite"))}addToCart(){var n=this;return(0,y.A)(function*(){const e={...n.currentProduct,quantity:n.quantity};n.cartService.addToCart(e),n.accessibilityService.announce(`${n.currentProduct.title} added to cart. Quantity: ${n.quantity}.`,"assertive")})()}getProductImage(n){return n.image?n.image:"assets/default.png"}}return(o=c).\u0275fac=function(n){return new(n||o)(t.rXU(p.g),t.rXU(f.m),t.rXU(b.u),t.rXU(s.aZ),t.rXU(l.Ix),t.rXU(a.K_),t.rXU(v.s))},o.\u0275cmp=t.VBU({type:o,selectors:[["app-single-product"]],decls:22,vars:15,consts:[[1,"product-detail"],["role","button","tabindex","0","aria-label","Go back to the previous page",1,"back-button",3,"click","keydown.enter","keydown.space"],["name","arrow-back-outline","aria-hidden","true"],[1,"image-container"],[3,"src","alt"],["aria-labelledby","product-title","aria-describedby","product-description product-price product-strain product-weight",1,"product-info"],[1,"brand"],["id","product-title",1,"title"],["id","product-price",1,"price"],["id","product-strain",1,"strain"],["id","product-description",1,"description"],["class","see-more","role","button","tabindex","0",3,"click","keydown.enter","keydown.space",4,"ngIf"],["id","product-weight",1,"weight"],[4,"ngIf"],["expand","block","routerLink","/auth",3,"queryParams",4,"ngIf"],["role","button","tabindex","0",1,"see-more",3,"click","keydown.enter","keydown.space"],["aria-label","Select product quantity",1,"quantity-counter"],["aria-label","Decrease quantity",3,"click"],["aria-live","polite"],["aria-label","Increase quantity",3,"click"],["expand","block",3,"click"],["expand","block","routerLink","/auth",3,"queryParams"]],template:function(n,e){1&n&&(t.j41(0,"div",0)(1,"div",1),t.bIt("click",function(){return e.goBack()})("keydown.enter",function(){return e.goBack()})("keydown.space",function(){return e.goBack()}),t.nrm(2,"ion-icon",2),t.k0s(),t.j41(3,"div",3),t.nrm(4,"img",4),t.k0s(),t.j41(5,"div",5)(6,"p",6),t.EFF(7),t.k0s(),t.j41(8,"h2",7),t.EFF(9),t.k0s(),t.j41(10,"span",8),t.EFF(11),t.nI1(12,"currency"),t.k0s(),t.j41(13,"p",9),t.EFF(14),t.k0s(),t.j41(15,"p",10),t.EFF(16),t.DNE(17,C,2,3,"span",11),t.k0s(),t.j41(18,"span",12),t.EFF(19),t.k0s()(),t.DNE(20,k,10,2,"ng-container",13)(21,x,2,3,"ion-button",14),t.k0s()),2&n&&(t.R7$(4),t.Y8G("src",e.getProductImage(e.currentProduct),t.B4B)("alt",e.currentProduct.title?e.currentProduct.title+" image":"Product Image"),t.R7$(3),t.JRh(e.currentProduct.brand),t.R7$(2),t.JRh(e.currentProduct.title),t.R7$(2),t.JRh(t.bMT(12,13,e.currentProduct.price)),t.R7$(3),t.E5c(" ",e.currentProduct.strainType," ",e.currentProduct.strainType&&e.currentProduct.thc?"-":""," ",e.currentProduct.thc," "),t.R7$(2),t.SpI(" ",e.getDescription()," "),t.R7$(),t.Y8G("ngIf",e.currentProduct.desc),t.R7$(2),t.JRh(e.currentProduct.weight),t.R7$(),t.Y8G("ngIf",e.isLoggedIn),t.R7$(),t.Y8G("ngIf",!e.isLoggedIn))},dependencies:[s.bT,a.Jm,a.iq,a.N7,l.Wk,s.oe],styles:[".product-detail[_ngcontent-%COMP%]{width:100%;margin:0 auto;font-family:Arial,sans-serif;color:#333;padding:16px;border-radius:12px;background-color:#fff}.back-button[_ngcontent-%COMP%]{cursor:pointer;font-size:1.2em;color:var(--ion-color-primary-tint);display:flex!important;align-items:center;justify-content:flex-start;position:relative;z-index:10;visibility:visible!important;opacity:1!important}@media (display-mode: standalone){.back-button[_ngcontent-%COMP%]{display:flex!important;position:fixed;top:10px;left:10px}}.back-button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%]{margin-right:8px}.image-container[_ngcontent-%COMP%]{width:100%;padding-top:100%;position:relative;background-color:#f5f5f5;border-radius:10px;overflow:hidden}.image-container[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover}.product-info[_ngcontent-%COMP%]{padding:15px 0;text-align:left}.brand[_ngcontent-%COMP%]{font-size:.9em;color:#888;margin-bottom:4px}.title[_ngcontent-%COMP%]{font-size:1.3em;font-weight:700;margin:5px 0;color:#333}.price[_ngcontent-%COMP%]{font-size:1.2em;font-weight:700;color:var(--ion-color-primary);margin:8px 0}.strain[_ngcontent-%COMP%]{font-size:.9em;color:#555;margin-top:10px;text-transform:capitalize}.description[_ngcontent-%COMP%]{font-size:1em;color:#666;line-height:1.5;margin:10px 0}.see-more[_ngcontent-%COMP%]{color:var(--ion-color-primary-tint);cursor:pointer;font-weight:700;text-decoration:none}.see-more[_ngcontent-%COMP%]:hover{text-decoration:underline}.weight[_ngcontent-%COMP%]{font-size:.9em;color:#666;display:block;margin-top:8px}button[_ngcontent-%COMP%], .back-button[_ngcontent-%COMP%]{padding:10px;border:none;background:transparent;color:#000;font-size:1em;display:flex;cursor:pointer;transition:color .3s;font-size:1.6em}button[_ngcontent-%COMP%]:hover, .back-button[_ngcontent-%COMP%]:hover{color:var(--ion-color-primary-shade)}.quantity-counter[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;margin:16px 0}.quantity-counter[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], .quantity-counter[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:20px}.quantity-counter[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;width:32px;height:32px;color:var(--ion-color-dark);background-color:#ddd;border:none;padding:8px 12px;cursor:pointer;border-radius:4px}.quantity-counter[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover{background-color:#ccc}.quantity-counter[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{min-width:24px;margin:0 12px;font-weight:700;text-align:center}ion-button[_ngcontent-%COMP%]{margin-top:16px}.custom-toast[_ngcontent-%COMP%]{--background: #333333;--color: #ffffff;font-family:Arial,sans-serif;font-size:1.2rem;padding:16px 24px;border-radius:12px;box-shadow:0 4px 10px #0000004d;margin:0 16px 50px;max-width:calc(100% - 32px);position:relative;color:var(--color)}"]}),c})();const S=[{path:"",component:(()=>{var o;class c{constructor(n){this.productService=n}ngOnInit(){this.productService.updateProductFilters({...m.Kr,sortMethod:{criterion:"RECENT",direction:"DESC"}})}}return(o=c).\u0275fac=function(n){return new(n||o)(t.rXU(p.g))},o.\u0275cmp=t.VBU({type:o,selectors:[["app-product-display"]],decls:6,vars:2,consts:[[3,"fullscreen"],["aria-label","Product details"],["id","similar-items-heading",1,"similar-title"],["role","region","aria-labelledby","similar-items-heading","aria-label","List of similar items",3,"showSimilarItems"]],template:function(n,e){1&n&&(t.j41(0,"ion-content",0),t.nrm(1,"app-header")(2,"app-single-product",1),t.j41(3,"h2",2),t.EFF(4,"Similar Items"),t.k0s(),t.nrm(5,"app-product-list",3),t.k0s()),2&n&&(t.Y8G("fullscreen",!0),t.R7$(5),t.Y8G("showSimilarItems",!0))},dependencies:[a.W9,h.l,P.t,M],styles:[".similar-title[_ngcontent-%COMP%]{margin:20px;font-size:1.8em}"]}),c})()}];let F=(()=>{var o;class c{}return(o=c).\u0275fac=function(n){return new(n||o)},o.\u0275mod=t.$C({type:o}),o.\u0275inj=t.G2t({imports:[l.iI.forChild(S),l.iI]}),c})();var O=r(3887);let w=(()=>{var o;class c{}return(o=c).\u0275fac=function(n){return new(n||o)},o.\u0275mod=t.$C({type:o}),o.\u0275inj=t.G2t({imports:[s.MD,g.YN,a.bv,F,O.G]}),c})()}}]);
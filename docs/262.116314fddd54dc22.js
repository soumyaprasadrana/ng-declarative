"use strict";(self.webpackChunkdeclarative_doc_app=self.webpackChunkdeclarative_doc_app||[]).push([[262],{9262:(N,c,a)=>{a.r(c),a.d(c,{RouteexamplesModule:()=>M});var l=a(6814),m=a(2151),r=a(594),t=a(5678),p=a(1996);let g=(()=>{class e{constructor(o){this.appPropvider=o,this.app=o.getApp(),this.appCtrl=this.app.getAppController()}static#t=this.\u0275fac=function(n){return new(n||e)(t.Y36(p.h))};static#e=this.\u0275cmp=t.Xpm({type:e,selectors:[["app-route-Routeexamples-outlet"]],decls:1,vars:0,template:function(n,s){1&n&&t._UZ(0,"router-outlet")},dependencies:[r.lC],encapsulation:2})}return e})();class u{constructor(i){this.app=i,this.example3source='.....\n    <dataset name="nyttopsciencestories" data-key="results" type="url" src="&apos;https://api.nytimes.com/svc/topstories/v2/science.json?api-key=zFN5CcUscU5jFK98fkzgcYXuFdhSV8GV&apos;" id="it9RAzz"></dataset>\n\n     <column border="minimal" border-color="var(--bs-warning)" height="define-380px" overflow="scroll" id="kbz8tUT">\n            <block padding="large" direction="column" id="EXJZIE8">\n              <row background-color="#000" justify-contents="center" id="P7BIo8V">\n                <column id="WMmbIkT">\n                  <label text-color="var(--bs-warning)" theme="wrap,bold,heading-large" text="New York Times Top Science Stories" id="abO70Js"></label>\n                </column>\n              </row>\n              <row padding="small" id="abDY3Tp">\n                <loop items="app.datasets.nyttopsciencestories.dataset$" id="zst5YJP">\n                  <label display-condition="$index!=0 and $index%2==0 and item.title!=&apos;&apos;" theme="wrap,bold,heading-smallest" text="Title: %%item.title%%" id="hzpZL8S"></label>\n                  <loop display-condition="$index!=0 and $index%2==0 and item.title!=&apos;&apos;" outer-loop-item="item" outer-loop-index="$index" inner-loop="true" inner-loop-items="item.multimedia" id="AURlGo1">\n                    <image display-condition="$index==0" type="image" src="%%item.url%%" id="Jb0gYS7"></image>\n                  </loop>\n                </loop>\n              </row>\n            </block>\n    </column>\n    .......'}}var h=a(1403),d=a(2441),f=a(5015),v=a(1734),x=a(675),y=a(9198),_=a(3491),C=a(6778),L=a(6235);let I=(()=>{class e extends L.X{static#t=this.\u0275fac=(()=>{let o;return function(s){return(o||(o=t.n5z(e)))(s||e)}})();static#e=this.\u0275cmp=t.Xpm({type:e,selectors:[["ng-declarative-loader"]],features:[t.qOj],decls:4,vars:2,consts:[[1,"d-flex","align-items-center","justify-content-center","w-100",3,"ngClass","ngStyle"],["role","status",1,"spinner-border"],[1,"visually-hidden"]],template:function(n,s){1&n&&(t.TgZ(0,"div",0)(1,"div",1)(2,"span",2),t._uU(3,"Loading..."),t.qZA()()()),2&n&&t.Q6J("ngClass",s.getcComponentClasses())("ngStyle",s.getComponentStyles())},dependencies:[l.mk,l.PC],styles:["[_nghost-%COMP%]{display:contents}"]})}return e})();var b=a(3084);const T=()=>[l.O5,b.c];function w(e,i){if(1&e&&t._UZ(0,"ng-declarative-image",1,2),2&e){const o=t.oxw().$implicit;t.Q6J("imageUrl",o.url)}}function J(e,i){1&e&&t.YNc(0,w,2,1,"ng-declarative-image",0),2&e&&t.Q6J("ngIf",0==i.$index)}function Y(e,i){if(1&e&&t.SjG(0,J,1,1,"ng-declarative-image",1,t.x6l),2&e){const o=t.oxw();t.wJu(o.innerLoopItems)}}let R=(()=>{class e{constructor(o){this.appPropvider=o,this.app=o.getApp(),this.appCtrl=this.app.getAppController(),this.routeCtrl=this.app.getCurrentRoute().getController()}static#t=this.\u0275fac=function(n){return new(n||e)(t.Y36(p.h))};static#e=this.\u0275cmp=t.Xpm({type:e,selectors:[["app-loop-AURlGo1"]],inputs:{innerLoopItems:"innerLoopItems",outerLoopIndex:"outerLoopIndex",outerLoopItem:"outerLoopItem"},decls:3,vars:0,consts:[["type","image",3,"imageUrl",4,"ngIf"],["type","image",3,"imageUrl"],["Jb0gYS7",""]],template:function(n,s){1&n&&(t.YNc(0,Y,2,0),t.EqZ(1,0,T),t.II9())},styles:["[_nghost-%COMP%]{display:contents}"]})}return e})();const A=()=>[l.O5,d._,R];function U(e,i){if(1&e&&t._UZ(0,"ng-declarative-label",2,3),2&e){const o=t.oxw().$implicit;t.MGl("text","Title: ",o.title,"")}}function z(e,i){if(1&e&&t._UZ(0,"app-loop-AURlGo1",4),2&e){const o=t.oxw(),n=o.$implicit,s=o.$index;t.Q6J("innerLoopItems",n.multimedia)("outerLoopItem",n)("outerLoopIndex",s)}}function Z(e,i){if(1&e&&t.YNc(0,U,2,1,"ng-declarative-label",0)(1,z,1,3,"app-loop-AURlGo1",1),2&e){const o=i.$implicit,n=i.$index;t.Q6J("ngIf",0!=n&&n%2==0&&""!=o.title),t.xp6(1),t.Q6J("ngIf",0!=n&&n%2==0&&""!=o.title)}}function P(e,i){if(1&e&&t.SjG(0,Z,2,2,null,null,t.x6l),2&e){const o=t.oxw(2);t.wJu(o.items)}}function S(e,i){1&e&&(t.YNc(0,P,2,0),t.EqZ(1,0,A),t.II9())}function F(e,i){1&e&&t._UZ(0,"ng-declarative-loader",5)}let D=(()=>{class e{constructor(o){this.appPropvider=o,this.dataset="nyttopsciencestories",this.app=o.getApp(),this.appCtrl=this.app.getAppController(),this.routeCtrl=this.app.getCurrentRoute().getController(),this.componentLoading=!0}ngOnInit(){try{this.app.datasets[this.dataset].isReady()?(this.items=this.app.datasets[this.dataset].dataset$,setTimeout(()=>this.componentLoading=!1,1e3)):this.app.datasets[this.dataset].dataset.subscribe(o=>{this.items=o,setTimeout(()=>this.componentLoading=!1,1e3)})}catch(o){this.app.handleFrameworkError(o),this.componentLoading=!1}}static#t=this.\u0275fac=function(n){return new(n||e)(t.Y36(p.h))};static#e=this.\u0275cmp=t.Xpm({type:e,selectors:[["app-loop-zst5YJP"]],inputs:{innerLoopItems:"innerLoopItems",outerLoopIndex:"outerLoopIndex",outerLoopItem:"outerLoopItem"},decls:2,vars:1,consts:[["theme","wrap,bold,heading-smallest",3,"text",4,"ngIf"],[3,"innerLoopItems","outerLoopItem","outerLoopIndex",4,"ngIf"],["theme","wrap,bold,heading-smallest",3,"text"],["hzpZL8S",""],[3,"innerLoopItems","outerLoopItem","outerLoopIndex"],["height","40px"]],template:function(n,s){1&n&&t.YNc(0,S,3,0)(1,F,1,0),2&n&&t.um2(0,s.componentLoading?1:0)},dependencies:[I],styles:["[_nghost-%COMP%]{display:contents}"]})}return e})();const $=[{path:"",component:(()=>{class e{constructor(o){this.appPropvider=o,this.app=o.getApp(),this.appCtrl=this.app.getAppController(),this.routeCtrl=new u(this.app),this.app.setCurrentRoute(this)}ngOnInit(){this.app.setCurrentRoute(this)}getController(){return this.routeCtrl}static#t=this.\u0275fac=function(n){return new(n||e)(t.Y36(p.h))};static#e=this.\u0275cmp=t.Xpm({type:e,selectors:[["app-route-Routeexamples"]],decls:43,vars:1,consts:[["uri","/examples","controller","ExampleController","title","Examples"],["examples",""],["customClass","doc-app-home-main","width","100%","height","auto"],["IM3RDPb",""],["padding","24px","layoutDirection","column","customClass","doc-app-home-main-content","backgroundColor","transperant","width","100%","height","auto","marginTop","80px"],["baJRSO7",""],["GVf58NT",""],["sB4MZwz",""],["margin","24px","customClass","doc-app-card"],["Gayg06W",""],["cardbody","","customClass","display-contents"],["JVeSMDn",""],["layoutDirection","column"],["f7owv42",""],["theme","wrap,bold,muted,display-large","text","Magic of ng-declartive"],["izsXZkrO",""],["text","This example illustrates how developers can effortlessly leverage the dataset component to seamlessly load API data with a single line of code, simplifying the design process and embracing a more declarative approach.\n\nIn this particular instance, the New York Times API, accompanied by an API key, is employed to retrieve top science stories for the day within a dataset component. Subsequently, two loop components are employed\u2014one for displaying titles and the other for showcasing images.Notably, the entire process is accomplished without relying on a single line of additional JavaScript code.  To streamline the presentation, a display condition is implemented to exhibit only half of the retrieved stories and the initial image of each story. This approach aims to streamline design complexities and promote a more straightforward, declarative methodology."],["oThiFLU",""],["paddingStart","32px","paddingEnd","32px"],["Sv1gY6y",""],["hjNFmXL",""],["width","100%"],["Tjw8fCz",""],["t3yN373",""],["customClass","code-section",3,"text"],["trYf38y",""],["transition","tada","transitionDuration","2s","border","1px solid","borderColor","var(--bs-warning)","height","880px","overflow","scroll"],["kbz8tUT",""],["padding","24px","layoutDirection","column"],["EXJZIE8",""],["backgroundColor","#000","justifyContents","center"],["P7BIo8V",""],["WMmbIkT",""],["color","var(--bs-warning)","theme","wrap,bold,heading-large","text","New York Times Top Science Stories"],["abO70Js",""],["padding","8px"],["abDY3Tp",""]],template:function(n,s){1&n&&(t.TgZ(0,"ng-declarative-route",0,1)(2,"ng-declarative-block",2,3)(4,"ng-declarative-block",4,5)(6,"ng-declarative-container",null,6)(8,"ng-declarative-row",null,7)(10,"ng-declarative-card",8,9)(12,"ng-declarative-block",10,11)(14,"ng-declarative-block",12,13),t._UZ(16,"ng-declarative-label",14,15)(18,"ng-declarative-paragraph",16,17),t.TgZ(20,"ng-declarative-row",18,19)(22,"ng-declarative-col",null,20)(24,"ng-declarative-row",21,22)(26,"ng-declarative-col",null,23),t._UZ(28,"ng-declarative-paragraph",24,25),t.qZA()()(),t.TgZ(30,"ng-declarative-col",26,27)(32,"ng-declarative-block",28,29)(34,"ng-declarative-row",30,31)(36,"ng-declarative-col",null,32),t._UZ(38,"ng-declarative-label",33,34),t.qZA()(),t.TgZ(40,"ng-declarative-row",35,36),t._UZ(42,"app-loop-zst5YJP"),t.qZA()()()()()()()()()()()()),2&n&&(t.xp6(28),t.Q6J("text",s.routeCtrl.example3source))},dependencies:[h.g,d._,f.l,v.n,x.W,y.X,_.J,C.Z,D],styles:["[_nghost-%COMP%]{display:contents!important}"]})}return e})(),data:{title:"Examples"}}];let G=(()=>{class e{static#t=this.\u0275fac=function(n){return new(n||e)};static#e=this.\u0275mod=t.oAB({type:e});static#o=this.\u0275inj=t.cJS({imports:[r.Bz.forChild($),r.Bz]})}return e})();var O=a(8062);let M=(()=>{class e{static#t=this.\u0275fac=function(n){return new(n||e)};static#e=this.\u0275mod=t.oAB({type:e,bootstrap:[g]});static#o=this.\u0275inj=t.cJS({imports:[l.ez,m.l,O.IJ,r.Bz,G]})}return e})()}}]);
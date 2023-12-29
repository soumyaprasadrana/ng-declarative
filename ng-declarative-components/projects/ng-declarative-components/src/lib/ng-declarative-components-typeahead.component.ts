import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, ViewEncapsulation } from "@angular/core";
import { ApplicationService } from "./ng-declarative-components.service";
import { Base } from "./ng-declarative-components-base.component";
import { AnimationService } from "./ng-declarative-animation.service";
import { NgModel } from "@angular/forms";
import { SuggestionFilterPipe } from "./ng-declarative-filtered-suggestions-typeahead";

@Component({
  selector: "ng-declarative-typeahead",
  template: `
  
    <div #inputRef class="typeahead-input"  [ngClass]="groupClasses" [ngStyle]="groupStyles">
      @if(this.label){
        <label class="form-label" [for]="inputID" [class]="labelCssClass">{{label}}</label>
      }
      @if(before || after){
        
        @if(this.required){
          @if(this.signal){
            <div class="input-group">
          @if(prependText || prependIcon){
        <div (click)="handlePrependClick()" class="input-group-prepend" [ngClass]="{'link':prependOnClick}">
          <div class="input-group-text" [ngClass]="{'ng-declarative-input-group-text-bordered':!disableInputBorder,'ng-declarative-input-group-text':disableInputBorder,'is-invalid': submitted && (input.invalid || this.invalid)}">
          @if(prependText){
            {{prependText}}
          } @else if(prependIcon){
            <i [class]="prependIcon"></i>
          }
          
          </div>
        </div>
          }
            <input (focus)="onInputFocus()"
  (blur)="onInputBlur()" #inputFieldValue #inputvalue="ngModel" required  [(ngModel)]="typeaheadInputLabelMode" [type]="inputType" [class]="inputClass" [id]="inputID" [style.ariaDescribedby]="helpID" placeholder="{{placeholder}}" [ngClass]="{ 'is-invalid': submitted && (input.invalid || this.invalid) }">
            <input (focus)="onInputFocus()"
  (blur)="onInputBlur()" #inputField #input="ngModel" style="display:none;" required (ngModelChange)="this.signal.set($event)" [ngModel]="this.signal()" [type]="inputType" [class]="inputClass" [id]="inputID" [style.ariaDescribedby]="helpID" placeholder="{{placeholder}}" [ngClass]="{ 'is-invalid': submitted && (input.invalid || this.invalid) }">
           
                 
     
             @if(passwordEyeSlash){
              <div (click)="handlePasswordEyeSpashClick()" class="input-group-text link" [ngClass]="{'ng-declarative-input-group-text-bordered':!disableInputBorder,'ng-declarative-input-group-text':disableInputBorder,'is-invalid': submitted && (input.invalid || this.invalid)}">
          
            <i [class]="passwordEyeSlashIcon"></i>
       
          </div>
             }
            @if((afterText || afterIcon) && !passwordEyeSlash){
        
          <div (click)="handleAfterClick()" class="input-group-text" [ngClass]="{'ng-declarative-input-group-text-bordered':!disableInputBorder,'ng-declarative-input-group-text':disableInputBorder,'is-invalid': submitted && (input.invalid || this.invalid),'link':afterOnClick}">
          @if(afterText){
            {{afterText}}
          } @else if(afterIcon){
            <i [class]="afterIcon"></i>
          }

          </div>
          <ul *ngIf="suggestions.length > 0 && showSuggestions " class="suggestions-box">
                  <li *ngFor="let suggestion of filteredSuggestions" (mousedown)="selectSuggestion(suggestion)">
                  {{  labelkey? suggestion[labelkey] :suggestion.label }}
                  </li>
              </ul>
           <ul *ngIf="filteredSuggestions.length == 0 && showSuggestions " class="suggestions-box">
                  <li >
                  <p class="fst-italic"> No items found </p>
                  </li>
              </ul>
          }
            </div>
             @if(help){
                <small [id]="helpID" class="form-text text-muted">{{help}}</small>
              }
            <div *ngIf="input.invalid && submitted" class="p-2 text-danger">
              <div *ngIf="input.errors && input.errors['required']">{{this.currentKey}} is required.</div>
          </div>
          <div *ngIf="this.invalid && this.submitted" class="p-2  text-danger">
            <div *ngIf="this.errors.email">Invalid email address!</div>
            <div *ngIf="this.errors.uppercase">Invalid uppercase value!</div>
          </div>
        
          }@else{
            <div class="input-group">
            @if(prependText || prependIcon){
        <div (click)="handlePrependClick()" class="input-group-prepend" [ngClass]="{'link':prependOnClick}">
          <div class="input-group-text" [ngClass]="{'ng-declarative-input-group-text-bordered':!disableInputBorder,'ng-declarative-input-group-text':disableInputBorder,'is-invalid': submitted && (input.invalid || this.invalid)}"> @if(prependText){
            {{prependText}}
          } @else if(prependIcon){
            <i [class]="prependIcon"></i>
          }</div>
        </div>
            }
            <input (focus)="onInputFocus()"
  (blur)="onInputBlur()" #inputFieldValue #inputvalue="ngModel" required (ngModelChange)="onNgModelChange()" [(ngModel)]="typeaheadInputLabelMode" [type]="inputType" [class]="inputClass" [id]="inputID" [style.ariaDescribedby]="helpID" placeholder="{{placeholder}}" [ngClass]="{ 'is-invalid': submitted && (input.invalid || this.invalid) }">
            
            <input (focus)="onInputFocus()"
  (blur)="onInputBlur()" #inputField #input="ngModel" style="display:none;" required (ngModelChange)="onNgModelChange()" [(ngModel)]="dataset?(datasetKey?app.datasets[dataset].dataset$[datasetKey][datasetattribute]:app.datasets[dataset].newItem[datasetattribute]):inputModel!=null?inputModel:inputValue" [type]="inputType" [class]="inputClass" [id]="inputID" [style.ariaDescribedby]="helpID" placeholder="{{placeholder}}" [ngClass]="{ 'is-invalid': submitted && (input.invalid || this.invalid) }">

             
            @if(passwordEyeSlash){
              <div (click)="handlePasswordEyeSpashClick()" class="input-group-text link" [ngClass]="{'ng-declarative-input-group-text-bordered':!disableInputBorder,'ng-declarative-input-group-text':disableInputBorder,'is-invalid': submitted && (input.invalid || this.invalid)}">

            <i [class]="passwordEyeSlashIcon"></i>

          </div>
             }
            @if((afterText || afterIcon) && !passwordEyeSlash){

          <div (click)="handleAfterClick()"  class="input-group-text" [ngClass]="{'ng-declarative-input-group-text-bordered':!disableInputBorder,'ng-declarative-input-group-text':disableInputBorder,'is-invalid': submitted && (input.invalid || this.invalid),'link':afterOnClick}">
          @if(afterText){
            {{afterText}}
          } @else if(afterIcon){
            <i [class]="afterIcon"></i>
          }

          </div>
            <ul *ngIf="suggestions.length > 0 && showSuggestions " class="suggestions-box">
                  <li *ngFor="let suggestion of filteredSuggestions" (mousedown)="selectSuggestion(suggestion)">
                  {{  labelkey? suggestion[labelkey] :suggestion.label }}
                  </li>
              </ul>
               <ul *ngIf="filteredSuggestions.length == 0 && showSuggestions " class="suggestions-box">
                  <li >
                  <p class="fst-italic"> No items found </p>
                  </li>
              </ul>
          }
            </div>
            @if(help){
                <small [id]="helpID" class="form-text text-muted">{{help}}</small>
              }
            <div *ngIf="input.invalid && submitted" class="p-2 text-danger">
              <div *ngIf="input.errors && input.errors['required']">{{this.currentKey}} is required.</div>
          </div>
          <div *ngIf="this.invalid && this.submitted" class="p-2  text-danger">
            <div *ngIf="this.errors.email">Invalid email address!</div>
            <div *ngIf="this.errors.uppercase">Invalid uppercase value!</div>
          </div>
          
          }
          
        }
        @else{
          @if(this.signal){
            <div class="input-group">
              @if(prependText || prependIcon){
        <div (click)="handlePrependClick()" class="input-group-prepend" [ngClass]="{'link':prependOnClick}">
          <div class="input-group-text" [ngClass]="{'ng-declarative-input-group-text-bordered':!disableInputBorder,'ng-declarative-input-group-text':disableInputBorder,'is-invalid': submitted && (input.invalid || this.invalid)}"> @if(prependText){
            {{prependText}}
          } @else if(prependIcon){
            <i [class]="prependIcon"></i>
          }</div>
        </div>
              }
            <input (focus)="onInputFocus()"
  (blur)="onInputBlur()" #inputFieldValue #inputValue="ngModel"  [(ngModel)]="typeaheadInputLabelMode" [type]="inputType" [class]="inputClass" [id]="inputID" [style.ariaDescribedby]="helpID" placeholder="{{placeholder}}" [ngClass]="{ 'is-invalid': submitted && (input.invalid || this.invalid) }">
            <input (focus)="onInputFocus()"
  (blur)="onInputBlur()" #inputField #input="ngModel" style="display:none;" (ngModelChange)="this.signal.set($event)" [ngModel]="this.signal()" [type]="inputType" [class]="inputClass" [id]="inputID" [style.ariaDescribedby]="helpID" placeholder="{{placeholder}}" [ngClass]="{ 'is-invalid': submitted && (input.invalid || this.invalid) }">
             
              @if(passwordEyeSlash){
              <div (click)="handlePasswordEyeSpashClick()" class="input-group-text link" [ngClass]="{'ng-declarative-input-group-text-bordered':!disableInputBorder,'ng-declarative-input-group-text':disableInputBorder,'is-invalid': submitted && (input.invalid || this.invalid)}">

            <i [class]="passwordEyeSlashIcon"></i>

          </div>
             }
            @if((afterText || afterIcon) && !passwordEyeSlash){

          <div (click)="handleAfterClick()"  class="input-group-text" [ngClass]="{'ng-declarative-input-group-text-bordered':!disableInputBorder,'ng-declarative-input-group-text':disableInputBorder,'is-invalid': submitted && (input.invalid || this.invalid),'link':afterOnClick}">
          @if(afterText){
            {{afterText}}
          } @else if(afterIcon){
            <i [class]="afterIcon"></i>
          }

          </div>
           <ul *ngIf="suggestions.length > 0 && showSuggestions " class="suggestions-box">
                  <li *ngFor="let suggestion of filteredSuggestions" (mousedown)="selectSuggestion(suggestion)">
                  {{  labelkey? suggestion[labelkey] :suggestion.label }}
                  </li>
              </ul>
               <ul *ngIf="filteredSuggestions.length == 0 && showSuggestions " class="suggestions-box">
                  <li >
                  <p class="fst-italic"> No items found </p>
                  </li>
              </ul>
          }
            </div>
            @if(help){
                <small [id]="helpID" class="form-text text-muted">{{help}}</small>
              }
            <div *ngIf="this.invalid && this.submitted" class="p-2  text-danger">
            <div *ngIf="this.errors.email">Invalid email address!</div>
            <div *ngIf="this.errors.uppercase">Invalid uppercase value!</div>
          </div>
          
          }@else{
            <div class="input-group">
            @if(prependText || prependIcon){
        <div (click)="handlePrependClick()" class="input-group-prepend" [ngClass]="{'link':prependOnClick}">
          <div class="input-group-text" [ngClass]="{'ng-declarative-input-group-text-bordered':!disableInputBorder,'ng-declarative-input-group-text':disableInputBorder,'is-invalid': submitted && (input.invalid || this.invalid)}"> @if(prependText){
            {{prependText}}
          } @else if(prependIcon){
            <i [class]="prependIcon"></i>
          }</div>
        </div>
            }
            <input (focus)="onInputFocus()"
  (blur)="onInputBlur()" #inputFieldValue #inputvalue="ngModel" (ngModelChange)="onNgModelChange()" [(ngModel)]="typeaheadInputLabelMode" [type]="inputType" [class]="inputClass" [id]="inputID" [style.ariaDescribedby]="helpID" placeholder="{{placeholder}}" [ngClass]="{ 'is-invalid': submitted && (input.invalid || this.invalid) }">
            <input (focus)="onInputFocus()"
  (blur)="onInputBlur()" #inputField #input="ngModel" style="display:none;" (ngModelChange)="onNgModelChange()" [(ngModel)]="dataset?(datasetKey?app.datasets[dataset].dataset$[datasetKey][datasetattribute]:app.datasets[dataset].newItem[datasetattribute]):inputModel!=null?inputModel:inputValue" [type]="inputType" [class]="inputClass" [id]="inputID" [style.ariaDescribedby]="helpID" placeholder="{{placeholder}}" [ngClass]="{ 'is-invalid': submitted && (input.invalid || this.invalid) }">
              
              @if(passwordEyeSlash){
              <div (click)="handlePasswordEyeSpashClick()" class="input-group-text link" [ngClass]="{'ng-declarative-input-group-text-bordered':!disableInputBorder,'ng-declarative-input-group-text':disableInputBorder,'is-invalid': submitted && (input.invalid || this.invalid)}">

            <i [class]="passwordEyeSlashIcon"></i>

          </div>
             }
            @if((afterText || afterIcon) && !passwordEyeSlash){

          <div (click)="handleAfterClick()"  class="input-group-text" [ngClass]="{'ng-declarative-input-group-text-bordered':!disableInputBorder,'ng-declarative-input-group-text':disableInputBorder,'is-invalid': submitted && (input.invalid || this.invalid),'link':afterOnClick}">
          @if(afterText){
            {{afterText}}
          } @else if(afterIcon){
            <i [class]="afterIcon"></i>
          }

          </div>
          <ul *ngIf="suggestions.length > 0 && showSuggestions " class="suggestions-box">
                  <li *ngFor="let suggestion of filteredSuggestions" (mousedown)="selectSuggestion(suggestion)">
                  {{  labelkey? suggestion[labelkey] :suggestion.label }}
                  </li>
              </ul>
               <ul *ngIf="filteredSuggestions.length == 0 && showSuggestions " class="suggestions-box">
                  <li >
                  <p class="fst-italic"> No items found </p>
                  </li>
              </ul>

          }
            </div>
             @if(help){
                <small [id]="helpID" class="form-text text-muted">{{help}}</small>
              }
            <div *ngIf="this.invalid && this.submitted" class="p-2  text-danger">
            <div *ngIf="this.errors.email">Invalid email address!</div>
            <div *ngIf="this.errors.uppercase">Invalid uppercase value!</div>
          </div>
        
          }
           
        }
        
        
      }
      @else {

        @if(this.required){
          @if(this.signal){
            <input (focus)="onInputFocus()"
  (blur)="onInputBlur()" #inputFieldValue #inputvalue="ngModel" required [type]="inputType"  [(ngModel)]="typeaheadInputLabelMode" [class]="inputClass" [id]="inputID" [style.ariaDescribedby]="helpID" placeholder="{{placeholder}}" [ngClass]="{ 'is-invalid': submitted && (input.invalid || this.invalid) }">
            <input (focus)="onInputFocus()"
  (blur)="onInputBlur()" #inputField #input="ngModel" style="display:none;" required [type]="inputType" (ngModelChange)="this.signal.set($event)" [ngModel]="this.signal()" [class]="inputClass" [id]="inputID" [style.ariaDescribedby]="helpID" placeholder="{{placeholder}}" [ngClass]="{ 'is-invalid': submitted && (input.invalid || this.invalid) }">
            <ul *ngIf="suggestions.length > 0 && showSuggestions " class="suggestions-box">
                  <li *ngFor="let suggestion of filteredSuggestions" (mousedown)="selectSuggestion(suggestion)">
                  {{  labelkey? suggestion[labelkey] :suggestion.label }}
                  </li>
              </ul>
               <ul *ngIf="filteredSuggestions.length == 0 && showSuggestions " class="suggestions-box">
                  <li >
                  <p class="fst-italic"> No items found </p>
                  </li>
              </ul>
            <div *ngIf="input.invalid && submitted" class="p-2 text-danger">
            <div *ngIf="input.errors && input.errors['required']">{{this.currentKey}} is required.</div>
          </div>
           <div *ngIf="this.invalid && this.submitted" class="p-2 text-danger">
            <div *ngIf="this.errors.email">Invalid email address!</div>
            <div *ngIf="this.errors.uppercase">Invalid uppercase value!</div>
          </div>
          }@else{
            <input (focus)="onInputFocus()"
  (blur)="onInputBlur()" #inputFieldValue #inputvalue="ngModel" required [type]="inputType" (ngModelChange)="onNgModelChange()" [(ngModel)]="typeaheadInputLabelMode" [class]="inputClass" [id]="inputID" [style.ariaDescribedby]="helpID" placeholder="{{placeholder}}" [ngClass]="{ 'is-invalid': submitted && (input.invalid || this.invalid) }">
            <input (focus)="onInputFocus()"
  (blur)="onInputBlur()" #inputField #input="ngModel" style="display:none;" required [type]="inputType" (ngModelChange)="onNgModelChange()" [(ngModel)]="dataset?(datasetKey?app.datasets[dataset].dataset$[datasetKey][datasetattribute]:app.datasets[dataset].newItem[datasetattribute]):inputModel!=null?inputModel:inputValue" [class]="inputClass" [id]="inputID" [style.ariaDescribedby]="helpID" placeholder="{{placeholder}}" [ngClass]="{ 'is-invalid': submitted && (input.invalid || this.invalid) }">
            <ul *ngIf="suggestions.length > 0 && showSuggestions " class="suggestions-box">
                  <li *ngFor="let suggestion of filteredSuggestions" (mousedown)="selectSuggestion(suggestion)">
                  {{  labelkey? suggestion[labelkey] :suggestion.label }}
                  </li>
              </ul>
               <ul *ngIf="filteredSuggestions.length == 0 && showSuggestions " class="suggestions-box">
                  <li >
                  <p class="fst-italic"> No items found </p>
                  </li>
              </ul>
            <div *ngIf="input.invalid && submitted" class="p-2 text-danger">
            <div *ngIf="input.errors && input.errors['required']">{{this.currentKey}} is required.</div>
          </div>
           <div *ngIf="this.invalid && this.submitted" class="p-2 text-danger">
            <div *ngIf="this.errors.email">Invalid email address!</div>
            <div *ngIf="this.errors.uppercase">Invalid uppercase value!</div>
          </div>
          }
         
        }@else{
          @if(this.signal){
            <input (focus)="onInputFocus()"
  (blur)="onInputBlur()" #inputFieldValue #inputvalue="ngModel" [type]="inputType"  [(ngModel)]="typeaheadInputLabelMode" [class]="inputClass" [id]="inputID" [style.ariaDescribedby]="helpID" placeholder="{{placeholder}}" [ngClass]="{ 'is-invalid': submitted && (input.invalid || this.invalid) }">
            <input (focus)="onInputFocus()"
  (blur)="onInputBlur()" #inputField #input="ngModel" style="display:none;" [type]="inputType" (ngModelChange)="this.signal.set($event)" [ngModel]="this.signal()" [class]="inputClass" [id]="inputID" [style.ariaDescribedby]="helpID" placeholder="{{placeholder}}" [ngClass]="{ 'is-invalid': submitted && (input.invalid || this.invalid) }">
            <ul *ngIf="suggestions.length > 0 && showSuggestions " class="suggestions-box">
                  <li *ngFor="let suggestion of filteredSuggestions" (mousedown)="selectSuggestion(suggestion)">
                  {{  labelkey? suggestion[labelkey] :suggestion.label }}
                  </li>
              </ul>
               <ul *ngIf="filteredSuggestions.length == 0 && showSuggestions " class="suggestions-box">
                  <li >
                  <p class="fst-italic"> No items found </p>
                  </li>
              </ul>
             <div *ngIf="this.invalid && this.submitted" class="p-2 text-danger">
            <div *ngIf="this.errors.email">Invalid email address!</div>
            <div *ngIf="this.errors.uppercase">Invalid uppercase value!</div>
          </div>
          }@else{
            <input (focus)="onInputFocus()"
  (blur)="onInputBlur()" #inputFieldValue #inputvalue="ngModel" [type]="inputType" (ngModelChange)="onNgModelChange()" [(ngModel)]="typeaheadInputLabelMode" [class]="inputClass" [id]="inputID" [style.ariaDescribedby]="helpID" placeholder="{{placeholder}}" [ngClass]="{ 'is-invalid': submitted && (input.invalid || this.invalid) }">
            <input (focus)="onInputFocus()"
  (blur)="onInputBlur()" #inputField #input="ngModel" style="display:none;" [type]="inputType" (ngModelChange)="onNgModelChange()" [(ngModel)]="dataset?(datasetKey?app.datasets[dataset].dataset$[datasetKey][datasetattribute]:app.datasets[dataset].newItem[datasetattribute]):inputModel!=null?inputModel:inputValue" [class]="inputClass" [id]="inputID" [style.ariaDescribedby]="helpID" placeholder="{{placeholder}}" [ngClass]="{ 'is-invalid': submitted && (input.invalid || this.invalid) }">
            <ul *ngIf="suggestions.length > 0 && showSuggestions " class="suggestions-box">
                  <li *ngFor="let suggestion of filteredSuggestions" (mousedown)="selectSuggestion(suggestion)">
                  {{  labelkey? suggestion[labelkey] :suggestion.label }}
                  </li>
              </ul>
               <ul *ngIf="filteredSuggestions.length == 0 && showSuggestions " class="suggestions-box">
                  <li >
                  <p class="fst-italic"> No items found </p>
                  </li>
              </ul>
             <div *ngIf="this.invalid && this.submitted" class="p-2 text-danger">
            <div *ngIf="this.errors.email">Invalid email address!</div>
            <div *ngIf="this.errors.uppercase">Invalid uppercase value!</div>
          </div>
          }
         
        }
        @if(help){
        <small [id]="helpID" class="form-text text-muted">{{help}}</small>
        }
        
      }
      
    
     
    </div>
   
  `,
  styles: [`:host{
    display:contents;
  }
 /* Style for the suggestion box */
.suggestions-box {
  list-style: none;
  padding: 0;
  margin: 0;
  position: absolute;
  z-index: 9999;
  margin-top: 37px;
  width: 100%;
  max-height: 200px; /* Adjust as needed */
  overflow-y: auto;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  transition: opacity 0.3s ease, transform 0.3s ease;

}

/* Show suggestions when input is focused */
 .suggestions-box-active {
 
}

/* Style for each suggestion item */
.suggestions-box li {
  padding: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.suggestions-box li:hover {
  background-color: #f0f0f0;
}

  
  `]
})
export class TypeaheadComponent extends Base implements OnInit, AfterViewInit, OnChanges {

  @Input() label: string | undefined;
  @Input() fontSize: string | undefined;
  @Input() color: string | undefined;
  @Input() fontWeight: string = "normal";
  @Input() override height: string | undefined;
  @Input() override width: string | undefined;
  @Input() override customClass: string = "";
  @Input() theme: string | undefined;
  @Input() placeholder: string | undefined;
  @Input() help: string | undefined;
  @Input() labelCssClass: string = "label";
  @Input() inputClass: string = " form-control ";
  @Input() prependText: string | undefined;
  @Input() prependIcon: string | undefined;
  @Input() dataset: any | undefined;
  @Input() datasetKey: any | undefined;
  @Input() datasetattribute: any | undefined;
  @Input() attributeName: any | undefined;
  @Input() inputModel: any | undefined;
  @Output() inputModelChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() required: boolean = false;
  @Input() predefinedValidations: any | undefined;
  @Input() disableInputBorder: boolean = false;
  @Input() signal: any;
  @Input() onChangeEvent: any;
  @Input() prependOnClick: any;
  @Input() prependOnClickArgs: any;
  @Input() before: boolean = false;
  @Input() after: boolean = true;
  @Input() afterText: string | undefined;
  @Input() afterIcon: string | undefined = "bi bi-arrow-down link";
  @Input() afterOnClick: any = () => {
    this.showSuggestions = !this.showSuggestions;
    if (this.afterIcon == "bi bi-arrow-down link") {
      this.afterIcon = "bi bi-arrow-up link";
      return;
    }
    if (this.afterIcon == "bi bi-arrow-up link") {
      this.afterIcon = "bi bi-arrow-down link";
      return;
    }


  };
  @Input() afterOnClickArgs: any;
  @Input() passwordEyeSlash: boolean | undefined;
  @Input() suggestions: any | undefined;
  @Input() labelkey: any | undefined;
  @Input() valuekey: any | undefined;

  showSuggestions: boolean = false;


  @ViewChild("inputField") inputField: ElementRef | undefined;

  @ViewChild("inputFieldValue") inputFieldValue: ElementRef | undefined;

  @ViewChild("inputRef") inputRef: ElementRef | any;

  @ViewChild("input") inputFieldNgModelInterface: NgModel | undefined;

  @ViewChild("inputvalue") inputvalueFieldNgModelInterface: NgModel | undefined;

  invalid: boolean = false;
  errors: any = {};

  inputID: string | undefined;
  labelFor: string | undefined;
  inputType: string | undefined;
  helpID: string | undefined;
  inputValue: any;
  submitted: boolean = false;
  originalSugeestions: any;

  typeaheadInputLabelMode: any;

  groupClasses: string | undefined;
  groupStyles: any | undefined;
  currentKey: any;

  passwordEyeSlashIcon: string = "bi bi-eye-slash-fill";

  constructor(elementRef: ElementRef,
    animationService: AnimationService,
    app: ApplicationService,
    private suggestionFilterPipe: SuggestionFilterPipe) {
    super(elementRef, animationService, app);

  }

  override ngOnInit() {
    console.log("=========>>>>> DEUBG TYPEAHEAD <<<<<===========", this.inputModel, this.suggestions, this.valuekey, this.labelkey)
    this.inputID = this.randomAlphanumeric(7);
    this.helpID = this.randomAlphanumeric(7);
    this.groupClasses = this.getInputClasses() + " m-2 ";
    this.groupStyles = this.getInputStyles();
    this.currentKey = this.getInputAttributeName();
    if (this.disableInputBorder) {
      this.inputClass = this.inputClass + " ng-declarative-input ";
    } else {
      this.inputClass = this.inputClass + " ng-declarative-input-bottom-bordered ";
    }

    if (this.required) {
      this.groupClasses = this.groupClasses + " required";
    }
    if (this.passwordEyeSlash) {
      this.inputType = "password";
    }
    this.originalSugeestions = [...this.suggestions];

  }
  handlePasswordEyeSpashClick() {
    if (this.inputType == "password") {
      this.inputType = "text";
      this.passwordEyeSlashIcon = "bi bi-eye-fill";
    } else {
      this.inputType = "password";
      this.passwordEyeSlashIcon = "bi bi-eye-slash-fill";
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.groupClasses = this.getInputClasses() + " m-2 ";
    this.groupStyles = this.getInputStyles();
    this.currentKey = this.getInputAttributeName();
    if (this.disableInputBorder) {
      this.inputClass = this.inputClass + " ng-declarative-input ";
    } else {
      this.inputClass = this.inputClass + " ng-declarative-input-bottom-bordered ";
    }

    if (this.required) {
      this.groupClasses = this.groupClasses + " required";
    }

  }

  runValidations() {

    if (this.inputField?.nativeElement.value || this.inputField?.nativeElement.value != "") {
      //console.log("========DEBUG RUN INPUT VALIDATION", this.inputField, this.inputFieldNgModelInterface, this.currentKey);
      if (this.predefinedValidations) {
        const valarry = this.predefinedValidations.split(",");
        for (var item of valarry) {
          this.processValidation(item, this.inputField?.nativeElement.value)
        }
      }
    }

  }

  processValidation(validation: any, value: any) {
    switch (validation) {
      case "email":
        if (!this.isValidEmail(value)) {
          this.invalid = true;
          this.errors.email = true;
        }
        else {
          this.invalid = false;
          delete this.errors.email;
        }
        break;
      case "uppercase":
        if (!this.isUppercase(value)) {
          this.invalid = true;
          this.errors.uppercase = true;
        }
        else {
          this.invalid = false;
          delete this.errors.uppercase;
        }
        break;
    }
  }

  // Email validator
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Mobile number validator (simple check)
  isValidMobileNumber(mobileNumber: string): boolean {
    const mobileRegex = /^\d{10}$/; // Assumes a 10-digit mobile number
    return mobileRegex.test(mobileNumber);
  }

  // Check if string is uppercase
  isUppercase(input: string): boolean {
    return input === input.toUpperCase();
  }

  // Check if string is lowercase
  isLowercase(input: string): boolean {
    return input === input.toLowerCase();
  }

  // Check if string is numeric
  isNumeric(input: string): boolean {
    return !isNaN(Number(input));
  }

  // Check if string length is greater than a specified length
  isLengthGreaterThan(input: string, length: number): boolean {
    return input.length > length;
  }

  // Check if string length is less than a specified length
  isLengthLessThan(input: string, length: number): boolean {
    return input.length < length;
  }


  isValid() {
    return this.inputFieldNgModelInterface ? !this.inputFieldNgModelInterface.errors && !this.invalid : !this.invalid;
  }

  public updateSubmitted(submitted: boolean) {
    this.submitted = submitted;
    this.runValidations();
  }
  selectSuggestion(suggestion: any) {
    if (this.dataset) {
      if (this.datasetKey)
        this.app.datasets[this.dataset].dataset$[this.datasetKey][this.datasetattribute] = this.valuekey ? suggestion[this.valuekey] : suggestion.key;
      else
        this.app.datasets[this.dataset].newItem[this.datasetattribute] = this.valuekey ? suggestion[this.valuekey] : suggestion.key;
    }
    if (this.signal) {
      this.signal.set(this.valuekey ? suggestion[this.valuekey] : suggestion.key);
    }
    console.log("Input Model ", this.inputModel);
    if (this.inputModel != null) {
      console.log("Input Model Selected")
      this.inputModelChange.emit(this.valuekey ? suggestion[this.valuekey] : suggestion.key);
    } else {
      this.inputValue = this.valuekey ? suggestion[this.valuekey] : suggestion.key;
    }
    this.typeaheadInputLabelMode = this.labelkey ? suggestion[this.labelkey] : suggestion.label;

  }
  onInputFocus() {

    this.showSuggestions = true;
    if (this.afterIcon == "bi bi-arrow-down link")
      this.afterIcon = "bi bi-arrow-up link";
  }
  onInputBlur() {
    this.validateValueFromSuggestion();
    this.showSuggestions = false;
    if (this.afterIcon == "bi bi-arrow-up link")
      this.afterIcon = "bi bi-arrow-down link";
  }
  validateValueFromSuggestion() {
    const inputVal = this.inputFieldValue?.nativeElement.value;
    let found = false;
    for (var item of this.suggestions) {
      if (this.labelkey) {
        if (item[this.labelkey] == inputVal) {
          found = true;
          break;
        }
      } else {
        if (item.label == inputVal) {
          found = true;
          break;
        }
      }

    }
    if (!found) {
      console.warn("Invalid value for typeahead, no value matched from suggestions.");
      if (this.inputFieldValue)
        this.inputFieldValue.nativeElement.value = '';
      if (this.inputField)
        this.inputField.nativeElement.value = '';
    }
  }
  onNgModelChange() {
    if (this.inputModel != null) {
      this.inputModelChange.emit(this.inputField?.nativeElement.value);
    }
    else if (this.dataset) {
      if (this.datasetKey)
        this.app.datasets[this.dataset].dataset$[this.datasetKey][this.datasetattribute] = this.inputField?.nativeElement.value;
      else
        this.app.datasets[this.dataset].newItem[this.datasetattribute] = this.inputField?.nativeElement.value;
    }
    this.runValidations();
    if (this.onChangeEvent) {
      if (typeof this.onChangeEvent == "string") {
        if (this.onChangeEvent.includes("appCtrl.")) {
          this.app.getAppController()[this.onChangeEvent.split(".")[1]](this.inputField?.nativeElement.value);
        } else if (this.onChangeEvent.includes("routeCtrl.")) {
          this.app.getCurrentRoute().getController()[this.onChangeEvent.split(".")[1]](this.inputField?.nativeElement.value);
        }
      }
      else
        this.onChangeEvent(this.inputField?.nativeElement.value);
    }

  }
  getInputClasses(): string {
    // Apply Bootstrap classes along with custom class
    let classes = ` ${this.customClass} `;
    if (this.theme && this.theme != "") {
      let size: string | undefined;
      let themeS: string | undefined;
      if (this.theme.includes("-")) {
        themeS = this.theme.split("-")[0];
        size = this.theme.split("-")[1];
      }
      else {
        themeS = this.theme;
      }
      switch (themeS) {
        case "email":
          classes += " form-group ";
          this.inputType = "email";
          break;
        case "password":
          classes += " form-group ";
          this.inputType = "password";
          break;
        case "checkbox":
          classes += " form-check ";
          this.inputType = "checkbox";
          this.labelCssClass = this.labelCssClass ? this.labelCssClass += " form-check-label" : "form-check-label";
          break;
        case "text":
          classes += " form-group ";
          this.inputType = "text";
          break;
        case "number":
          classes += " form-group ";
          this.inputType = "number";
          break;
        case "file":
          classes += " form-group ";
          this.inputType = "file";
          break;
        case "readonly":
          classes += " disabled ";
          break;
      }
      switch (size) {
        case "large":
          this.inputClass = this.inputClass + " form-control-lg ";
          break;
        case "small":
          this.inputClass = this.inputClass + " form-control-sm ";
          break;
      }
    }
    return classes;
  }
  public getCurrentValue() {
    return this.inputField?.nativeElement.value;

  }

  public getCurrentKeyValue() {
    let result: any = {};
    console.log("==== DEBUG getCurrentValue ", this.datasetattribute, this.inputField, this.attributeName);
    if (this.datasetattribute) {
      const keyForDatasetAttribute = `app.datasets.${this.dataset}${this.datasetKey ? `.dataset$[${this.datasetKey}].${this.datasetattribute}` : `newItem.${this.datasetattribute}`}`
      result[keyForDatasetAttribute] = this.inputField?.nativeElement.value;
    }
    else {
      result[this.attributeName] = this.inputField?.nativeElement.value;
    }
    return result;
  }

  public getInputAttributeName() {
    if (this.dataset && this.datasetattribute) {
      const keyForDatasetAttribute = `app.datasets.${this.dataset}${this.datasetKey ? `.dataset$[${this.datasetKey}].${this.datasetattribute}` : `newItem.${this.datasetattribute}`}`;
      return keyForDatasetAttribute;
    }
    else
      return this.attributeName;
  }

  override ngAfterViewInit(): void {

    if (this.transition && this.elementRef) {
      this.animationService.animate(
        this.transition,
        this.inputRef.nativeElement,
        this.transitionDuration
      );
    }

  }

  getInputStyles(): { [key: string]: string } {
    let styles: any = this.getComponentStyles();
    if (this.fontSize) styles["font-size"] = this.fontSize;
    if (this.fontWeight) styles["font-weight"] = this.fontWeight;
    if (this.color) styles.color = this.color;
    return styles;
  }
  private randomAlphanumeric(length: number): string {
    const alphabetChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const numericChars = "0123456789";

    // Ensure the first character is an alphabet
    let result = alphabetChars.charAt(Math.floor(Math.random() * alphabetChars.length));

    // Generate the rest of the string
    for (let i = 1; i < length; i++) {
      const allChars = alphabetChars + numericChars;
      result += allChars.charAt(Math.floor(Math.random() * allChars.length));
    }

    console.log(`Generated random alphanumeric: ${result}`);
    return result;
  }

  handlePrependClick() {
    if (this.prependOnClick) {
      if (typeof this.prependOnClick == "string") {
        if (this.prependOnClick.includes("appCtrl.")) {
          // console.log(this.app.getAppController());
          if (!this.prependOnClickArgs)
            this.app.getAppController()[this.prependOnClick.split(".")[1]]();
          else {
            if (Array.isArray(this.prependOnClickArgs)) {
              this.app.getAppController()[this.prependOnClick.split(".")[1]](...this.prependOnClickArgs);
            } else {
              const argStrings = this.prependOnClickArgs.split(/,(?![^{}]*})/);
              //console.log(argStrings);

              // Map over the argument strings and parse them as JSON if they start with '{'
              const args = argStrings.map((arg: string) => {
                console.log(arg, arg.replace(/'([^']*)'/g, '"$1"'));
                let res = arg.trim().startsWith("{")
                  ? JSON.parse(arg.replace(/'([^']*)'/g, '"$1"'))
                  : arg.trim();
                return res;
              });

              // Now you have an array of arguments, including the parsed objects
              console.log(args, this.app.getAppController());
              this.app.getAppController()[this.prependOnClick.split(".")[1]](...args);
            }
          }
        }
        else if (this.prependOnClick.includes("routeCtrl.")) {
          // console.log(this.app.getCurrentRoute().getController());
          if (!this.prependOnClickArgs)
            this.app.getCurrentRoute().getController()[this.prependOnClick.split(".")[1]]();
          else {
            if (Array.isArray(this.prependOnClickArgs)) {
              this.app.getCurrentRoute().getController()[this.prependOnClick.split(".")[1]](...this.prependOnClickArgs);
            } else {
              const argStrings = this.prependOnClickArgs.split(/,(?![^{}]*})/);
              console.log(argStrings);

              // Map over the argument strings and parse them as JSON if they start with '{'
              const args = argStrings.map((arg: string) => {
                console.log(arg, arg.replace(/'([^']*)'/g, '"$1"'));
                let res = arg.trim().startsWith("{")
                  ? JSON.parse(arg.replace(/'([^']*)'/g, '"$1"'))
                  : arg.trim();
                return res;
              });

              // Now you have an array of arguments, including the parsed objects
              console.log(args, this.app.getCurrentRoute().getController());
              this.app.getCurrentRoute().getController()[this.prependOnClick.split(".")[1]](...args);
            }
          }
        }
        else if (this.prependOnClick.includes("app.")) {
          const appS: any = this.app;
          if (!this.prependOnClickArgs) {
            appS[this.prependOnClick.split(".")[1]]();
          }

          else {
            if (Array.isArray(this.prependOnClick)) {
              appS[this.prependOnClick.split(".")[1]](...this.prependOnClickArgs);
            } else {
              const argStrings = this.prependOnClickArgs.split(/,(?![^{}]*})/);
              //console.log(argStrings);

              // Map over the argument strings and parse them as JSON if they start with '{'
              const args = argStrings.map((arg: string) => {
                console.log(arg, arg.replace(/'([^']*)'/g, '"$1"'));
                let res = arg.trim().startsWith("{")
                  ? JSON.parse(arg.replace(/'([^']*)'/g, '"$1"'))
                  : arg.trim();
                return res;
              });

              // Now you have an array of arguments, including the parsed objects
              console.log(args, appS);
              appS[this.prependOnClick.split(".")[1]](...args);
            }
          }

        }

      } else {

        if (!this.prependOnClickArgs)
          this.prependOnClick();
        else {
          if (Array.isArray(this.prependOnClickArgs)) {
            this.prependOnClick(...this.prependOnClickArgs);
          } else {
            const argStrings = this.prependOnClickArgs.split(/,(?![^{}]*})/);
            console.log(argStrings);

            // Map over the argument strings and parse them as JSON if they start with '{'
            const args = argStrings.map((arg: string) => {
              console.log(arg, arg.replace(/'([^']*)'/g, '"$1"'));
              let res = arg.trim().startsWith("{")
                ? JSON.parse(arg.replace(/'([^']*)'/g, '"$1"'))
                : arg.trim();
              return res;
            });

            // Now you have an array of arguments, including the parsed objects
            console.log(args, this.app.getAppController());
            this.prependOnClick(...args);
          }
        }
      }

    }
  }
  handleAfterClick() {
    if (this.afterOnClick) {
      if (typeof this.afterOnClick == "string") {
        if (this.afterOnClick.includes("appCtrl.")) {
          // console.log(this.app.getAppController());
          if (!this.afterOnClickArgs)
            this.app.getAppController()[this.afterOnClick.split(".")[1]]();
          else {
            if (Array.isArray(this.afterOnClickArgs)) {
              this.app.getAppController()[this.afterOnClick.split(".")[1]](...this.afterOnClickArgs);
            } else {
              const argStrings = this.afterOnClickArgs.split(/,(?![^{}]*})/);
              console.log(argStrings);

              // Map over the argument strings and parse them as JSON if they start with '{'
              const args = argStrings.map((arg: string) => {
                console.log(arg, arg.replace(/'([^']*)'/g, '"$1"'));
                let res = arg.trim().startsWith("{")
                  ? JSON.parse(arg.replace(/'([^']*)'/g, '"$1"'))
                  : arg.trim();
                return res;
              });

              // Now you have an array of arguments, including the parsed objects
              console.log(args, this.app.getAppController());
              this.app.getAppController()[this.afterOnClick.split(".")[1]](...args);
            }
          }
        }
        else if (this.afterOnClick.includes("routeCtrl.")) {
          // console.log(this.app.getCurrentRoute().getController());
          if (!this.afterOnClickArgs)
            this.app.getCurrentRoute().getController()[this.afterOnClick.split(".")[1]]();
          else {
            if (Array.isArray(this.afterOnClickArgs)) {
              this.app.getCurrentRoute().getController()[this.afterOnClick.split(".")[1]](...this.afterOnClickArgs);
            } else {
              const argStrings = this.afterOnClickArgs.split(/,(?![^{}]*})/);
              console.log(argStrings);

              // Map over the argument strings and parse them as JSON if they start with '{'
              const args = argStrings.map((arg: string) => {
                console.log(arg, arg.replace(/'([^']*)'/g, '"$1"'));
                let res = arg.trim().startsWith("{")
                  ? JSON.parse(arg.replace(/'([^']*)'/g, '"$1"'))
                  : arg.trim();
                return res;
              });

              // Now you have an array of arguments, including the parsed objects
              console.log(args, this.app.getCurrentRoute().getController());
              this.app.getCurrentRoute().getController()[this.afterOnClick.split(".")[1]](...args);
            }
          }
        }
        else if (this.afterOnClick.includes("app.")) {
          const appS: any = this.app;
          if (!this.afterOnClickArgs) {
            appS[this.afterOnClick.split(".")[1]]();
          }

          else {
            if (Array.isArray(this.afterOnClickArgs)) {
              appS[this.afterOnClick.split(".")[1]](...this.afterOnClickArgs);
            } else {
              const argStrings = this.afterOnClickArgs.split(/,(?![^{}]*})/);
              console.log(argStrings);

              // Map over the argument strings and parse them as JSON if they start with '{'
              const args = argStrings.map((arg: string) => {
                console.log(arg, arg.replace(/'([^']*)'/g, '"$1"'));
                let res = arg.trim().startsWith("{")
                  ? JSON.parse(arg.replace(/'([^']*)'/g, '"$1"'))
                  : arg.trim();
                return res;
              });

              // Now you have an array of arguments, including the parsed objects
              console.log(args, appS);
              appS[this.afterOnClick.split(".")[1]](...args);
            }
          }

        }

      } else {

        if (!this.afterOnClickArgs)
          this.afterOnClick();
        else {
          if (Array.isArray(this.afterOnClickArgs)) {
            this.afterOnClick(...this.afterOnClickArgs);
          } else {
            const argStrings = this.afterOnClickArgs.split(/,(?![^{}]*})/);
            console.log(argStrings);

            // Map over the argument strings and parse them as JSON if they start with '{'
            const args = argStrings.map((arg: string) => {
              console.log(arg, arg.replace(/'([^']*)'/g, '"$1"'));
              let res = arg.trim().startsWith("{")
                ? JSON.parse(arg.replace(/'([^']*)'/g, '"$1"'))
                : arg.trim();
              return res;
            });

            // Now you have an array of arguments, including the parsed objects
            console.log(args, this.app.getAppController());
            this.afterOnClick(...args);
          }
        }
      }

    }
  }
  get filteredSuggestions() {
    return this.suggestionFilterPipe.transform(this.suggestions, this.inputFieldValue?.nativeElement.value);
  }
}

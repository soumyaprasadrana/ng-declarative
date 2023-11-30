import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from "@angular/core";
import { ApplicationService } from "./ng-declarative-components.service";
import { Base } from "./ng-declarative-components-base.component";
import { AnimationService } from "./ng-declarative-animation.service";
import { NgModel } from "@angular/forms";

@Component({
  selector: "ng-declarative-input",
  template: `
  
    <div  [ngClass]="groupClasses" [ngStyle]="groupStyles">
      @if(this.label){
        <label class="form-label" [for]="inputID" [class]="labelCssClass">{{label}}</label>
      }
      @if(prependText){
        <div class="input-group">
        <div class="input-group-prepend">
          <div class="input-group-text">{{prependText}}</div>
        </div>
        @if(this.required){
          <input #inputField #input="ngModel" required (ngModelChange)="onNgModelChange()" [(ngModel)]="dataset?(datasetKey?app.datasets[dataset].dataset$[datasetKey][datasetattribute]:app.datasets[dataset].newItem[datasetattribute]):inputModel?inputModel:inputValue" [type]="inputType" [class]="inputClass" [id]="inputID" [style.ariaDescribedby]="helpID" placeholder="{{placeholder}}" [ngClass]="{ 'is-invalid': submitted && (input.invalid || this.invalid) }">
          <div *ngIf="input.invalid && submitted" class="p-2 text-danger">
              <div *ngIf="input.errors && input.errors['required']">{{this.currentKey}} is required.</div>
          </div>
          <div *ngIf="this.invalid && this.submitted" class="p-2  text-danger">
            <div *ngIf="this.errors.email">Invalid email address!</div>
            <div *ngIf="this.errors.uppercase">Invalid uppercase value!</div>
          </div>
        }@else{
          <input #inputField #input="ngModel" (ngModelChange)="onNgModelChange()" [(ngModel)]="dataset?(datasetKey?app.datasets[dataset].dataset$[datasetKey][datasetattribute]:app.datasets[dataset].newItem[datasetattribute]):inputModel?inputModel:inputValue" [type]="inputType" [class]="inputClass" [id]="inputID" [style.ariaDescribedby]="helpID" placeholder="{{placeholder}}" [ngClass]="{ 'is-invalid': submitted && (input.invalid || this.invalid) }">
           <div *ngIf="this.invalid && this.submitted" class="p-2  text-danger">
            <div *ngIf="this.errors.email">Invalid email address!</div>
            <div *ngIf="this.errors.uppercase">Invalid uppercase value!</div>
          </div>
        }
        @if(help){
        <small [id]="helpID" class="form-text text-muted">{{help}}</small>
        }
        </div>
      }
      @else {

        @if(this.required){
         <input #inputField #input="ngModel" required [type]="inputType" (ngModelChange)="onNgModelChange()" [(ngModel)]="dataset?(datasetKey?app.datasets[dataset].dataset$[datasetKey][datasetattribute]:app.datasets[dataset].newItem[datasetattribute]):inputModel?inputModel:inputValue" [class]="inputClass" [id]="inputID" [style.ariaDescribedby]="helpID" placeholder="{{placeholder}}" [ngClass]="{ 'is-invalid': submitted && (input.invalid || this.invalid) }">
         <div *ngIf="input.invalid && submitted" class="p-2 text-danger">
            <div *ngIf="input.errors && input.errors['required']">{{this.currentKey}} is required.</div>
          </div>
           <div *ngIf="this.invalid && this.submitted" class="p-2 text-danger">
            <div *ngIf="this.errors.email">Invalid email address!</div>
            <div *ngIf="this.errors.uppercase">Invalid uppercase value!</div>
          </div>
        }@else{
          <input #inputField #input="ngModel" [type]="inputType" (ngModelChange)="onNgModelChange()" [(ngModel)]="dataset?(datasetKey?app.datasets[dataset].dataset$[datasetKey][datasetattribute]:app.datasets[dataset].newItem[datasetattribute]):inputModel?inputModel:inputValue" [class]="inputClass" [id]="inputID" [style.ariaDescribedby]="helpID" placeholder="{{placeholder}}" [ngClass]="{ 'is-invalid': submitted && (input.invalid || this.invalid) }">
          <div *ngIf="this.invalid && this.submitted" class="p-2 text-danger">
            <div *ngIf="this.errors.email">Invalid email address!</div>
            <div *ngIf="this.errors.uppercase">Invalid uppercase value!</div>
          </div>
        }
        @if(help){
        <small [id]="helpID" class="form-text text-muted">{{help}}</small>
        }
        
      }
      
    
     
    </div>
   
  `,
  styles: [`:host{
    display:contents;
  }`]
})
export class InputComponent extends Base implements OnInit, AfterViewInit {
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
  @Input() inputClass: string = "form-control";
  @Input() prependText: string | undefined;
  @Input() dataset: any | undefined;
  @Input() datasetKey: any | undefined;
  @Input() datasetattribute: any | undefined;
  @Input() attributeName: any | undefined;
  @Input() inputModel: any | undefined;
  @Output() inputModelChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() required: boolean = false;
  @Input() predefinedValidations: any | undefined;
  @Input() disableInputBorder: boolean = false;

  @ViewChild("inputField") inputField: ElementRef | undefined;

  @ViewChild("input") inputFieldNgModelInterface: NgModel | undefined;

  invalid: boolean = false;
  errors: any = {};

  inputID: string | undefined;
  labelFor: string | undefined;
  inputType: string | undefined;
  helpID: string | undefined;
  inputValue: any;
  submitted: boolean = false;


  groupClasses: string | undefined;
  groupStyles: any | undefined;
  currentKey: any;


  constructor(elementRef: ElementRef,
    animationService: AnimationService,
    app: ApplicationService) {
    super(elementRef, animationService, app);

  }

  override ngOnInit() {
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

  onNgModelChange() {
    if (this.inputModel) {
      this.inputModelChange.emit(this.inputField?.nativeElement.value);
    }
    else if (this.dataset) {
      if (this.datasetKey)
        this.app.datasets[this.dataset].dataset$[this.datasetKey][this.datasetattribute] = this.inputField?.nativeElement.value;
      else
        this.app.datasets[this.dataset].newItem[this.datasetattribute] = this.inputField?.nativeElement.value;
    }
    this.runValidations();
  }
  getInputClasses(): string {
    // Apply Bootstrap classes along with custom class
    let classes = `${this.customClass}`;
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
          classes += " form-group";
          this.inputType = "email";
          break;
        case "password":
          classes += " form-group";
          this.inputType = "password";
          break;
        case "checkbox":
          classes += " form-check";
          this.inputType = "checkbox";
          this.labelCssClass = this.labelCssClass ? this.labelCssClass += " form-check-label" : "form-check-label";
          break;
        case "text":
          classes += " form-group";
          this.inputType = "text";
          break;
        case "readonly":
          classes += " disabled";
          break;
      }
      switch (size) {
        case "large":
          this.inputClass = this.inputClass + " form-control-lg";
          break;
        case "small":
          this.inputClass = this.inputClass + " form-control-sm";
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
    // console.log(this.datasetKey, this.app.datasets[this.dataset].dataset$[this.datasetKey][this.datasetattribute], this.app.datasets[this.dataset].dataset$[this.datasetKey][this.datasetattribute], this.app.datasets.hasOwnProperty(this.datasetKey))
    console.log("======DEBUG: INPUT FIELD = ", this.inputField);
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
}

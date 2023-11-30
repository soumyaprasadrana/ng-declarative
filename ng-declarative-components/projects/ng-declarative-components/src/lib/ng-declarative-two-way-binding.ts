import { Directive, EventEmitter, Input, Output } from '@angular/core';

@Directive({
    selector: '[appTwoWayBinding]',
})
export class TwoWayBindingDirective<T> {
    @Input() appTwoWayBinding: T | undefined;
    @Output() appTwoWayBindingChange: EventEmitter<T> = new EventEmitter<T>();

    constructor() { }

    ngOnChanges(): void {
        // Notify changes to the parent component
        this.appTwoWayBindingChange.emit(this.appTwoWayBinding);
    }
}

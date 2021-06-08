import { Component, forwardRef, Input, OnInit, Optional, Output, Self } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, NgControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(()=> CustomInputComponent),
    }
  ],
})
export class CustomInputComponent implements ControlValueAccessor {
  @Input() type = 'text';
  @Input() suffix = '';
  @Input() placeholder = '';
  @Input() label = '';
  @Input() leftIcon = '';
  @Input() hasError = false;

  value: any;
  touched = false;
  disabled = false;

  onTouched = () => {};

  onChange = (value: any) => {};

  constructor() {}

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  getValue(val: any) {
    console.log(val);
    const tmp = this.type === 'file' ? val?.files[0] : val;
    this.onChange(tmp);
  }
}

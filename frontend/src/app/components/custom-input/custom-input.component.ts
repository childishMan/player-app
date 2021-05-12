import { Component, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
})
export class CustomInputComponent implements OnInit {
  @Input() control = 'default';
  @Input() type = 'text';
  @Input() suffix = '';
  @Input() placeholder = '';
  @Input() label = '';
  @Input() leftIcon = '';
  @Input() mainControl: FormGroup;
  @Output() value: any;
  @Input() set predefined(val: any) {
    if (val) {
      this.value = val;
      this.mainControl.get(this.control)?.setValue(this.value);
    }
  }

  constructor(private _builder: FormBuilder) {
    this.mainControl ??= this._builder.group({
      default: '',
    });
  }

  ngOnInit() {
    //console.log(this.mainControl.get(this.control));
  }

  getError(): boolean | null | undefined {
    return (
      this.mainControl.get(this.control)?.errors &&
      this.mainControl.get(this.control)?.touched
    );
  }
}

import { Component, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss']
})
export class CustomInputComponent implements OnInit {
  @Input() control='default';
  @Input() type ='text';
  @Input() suffix = '';
  @Input() placeholder = '';
  @Input() label = '';
  @Input() leftIcon = '';
  @Input() mainControl:FormGroup;
  @Output() value = '';
  @Input() set predefined(val:any){
    this.value = val;
  }

  constructor(private _builder:FormBuilder) { 
    
    this.mainControl ??= _builder.group({
      default:''
    })
  }

  ngOnInit() {
  }

}

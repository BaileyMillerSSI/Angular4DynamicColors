import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'preview-color',
  templateUrl: './preview-color.component.html',
  styleUrls: ['./preview-color.component.css']
})
export class PreviewColorComponent implements OnInit {

  @Input() type: string;  
  @Input() disabled: boolean;
  constructor() { }

  ngOnInit() {
  }

}

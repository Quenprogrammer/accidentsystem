import {Component, Input} from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-loading-data',
  imports: [
    NgIf
  ],
  templateUrl: './loading-data.component.html',
  styleUrl: './loading-data.component.css'
})
export class LoadingDataComponent {

  @Input() loading!: boolean;
  @Input() message:string='loading';
}

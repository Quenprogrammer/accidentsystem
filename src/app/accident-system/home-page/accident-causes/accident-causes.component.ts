import {Component} from '@angular/core';

@Component({
  selector: 'app-accident-causes',
  imports: [],
  templateUrl: './accident-causes.component.html',
  styleUrl: './accident-causes.component.css'
})
export class AccidentCausesComponent {
  accidentCauses = [
    {
      name: 'Substance abuse',
      value: '',
      description: 'Driving under the influence impairs judgment and increases the risk of accidents.'
    },
    {
      name: 'Human Error',
      value: '',
      description: 'Driver mistakes like distraction or misjudgment often lead to road accidents.'
    },
    {
      name: 'Lack of training or experience',
      value: '',
      description: 'Inexperienced drivers often make unsafe decisions on the road.'
    },
    {
      name: 'Mechanical or Equipment Failure',
      value: '',
      description: 'Poorly maintained vehicles often suffer mechanical faults causing crashes.'
    },
    {
      name: 'Speeding or reckless driving',
      value: '',
      description: 'Driving too fast or aggressively increases accident risk and severity.'
    },
    {
      name: 'Poor road or weather conditions',
      value: '',
      description: 'Bad roads or weather reduce vehicle control and visibility.'
    },
    {
      name: 'Ignoring traffic rules or signals',
      value: '',
      description: 'Disregarding traffic laws often leads to collisions and road hazards.'
    },
    {
      name: 'Overloading of vehicles',
      value: '',
      description: 'Heavy loads make vehicles unstable and harder to control.'
    },
    {
      name: 'Speeding',
      value: '',
      description: 'Excessive speed reduces reaction time and increases crash impact.'
    }
  ];



}

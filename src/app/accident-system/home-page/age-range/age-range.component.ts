import {Component} from '@angular/core';

@Component({
  selector: 'app-age-range',
  imports: [],
  templateUrl: './age-range.component.html',
  styleUrl: './age-range.component.css'
})
export class AgeRangeComponent {
  ageRanges = [
    {
      name: '0-12',
      icon: 'FIRS/baby.svg',
      value: '',
      category: 'Child',
      description: 'Children in early stages of growth and development.'
    },
    {
      name: '12-20',
      icon: 'FIRS/young.svg',
      value: '',
      category: 'Teenager',
      description: 'Young individuals undergoing adolescence and entering adulthood.'
    },
    {
      name: '20-40',
      icon: 'FIRS/teenage.svg',
      value: '',
      category: 'Adult',
      description: 'Working-age adults typically focused on career and family.'
    },
    {
      name: '40-60',
      icon: 'FIRS/adult.svg',
      value: '',
      category: 'Middle-aged',
      description: 'People in midlife, often managing careers and health.'
    },
    {
      name: '60-90',
      icon: 'FIRS/sinor.svg',
      value: '',
      category: 'Senior',
      description: 'Older adults approaching or enjoying retirement age.'
    },
    {
      name: '90-above',
      icon: 'FIRS/old.svg',
      value: '',
      category: 'Elderly',
      description: 'Elderly individuals requiring increased care and support.'
    }
  ];

}

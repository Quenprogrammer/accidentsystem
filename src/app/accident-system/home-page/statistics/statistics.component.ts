import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgForOf, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';

interface AccidentStat {
  name: string;
  value: number;
  logo: string;
  description: string;
  chartValue?: number;
}

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    NgIf,
    NgForOf
  ],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent implements OnChanges {
  @Input() stats!: any;

  accidentStats: AccidentStat[] = [
    {
      name: 'Average Accident Monthly',
      value: 0,
      logo: '',
      description: 'Represents the average number of accidents recorded per month across selected regions.'
    },
    {
      name: 'Average Accident Daily',
      value: 0,
      logo: '',
      description: 'Shows the estimated daily accident count based on regional traffic reports.'
    },
    {
      name: 'Kano',
      value: 0,
      logo: '',
      description: 'Accident data and trends recorded within Kano State on a daily and monthly basis.',
      chartValue: 0
    },
    {
      name: 'Kaduna',
      value: 0,
      logo: '',
      description: 'Average road accident metrics reported in Kaduna State.',
      chartValue: 0
    },
    {
      name: 'Katsina',
      value: 0,
      logo: '',
      description: 'Traffic and accident statistics sourced from Katsina State road safety reports.',
      chartValue: 0
    },
    {
      name: 'Abuja',
      value: 0,
      logo: '',
      description: 'Daily and monthly accident statistics for the Federal Capital Territory.',
      chartValue: 0
    },
    {
      name: 'Jigawa',
      value: 0,
      logo: 'FIRS/maps/jigawa.svg',
      description: 'Accident trends and averages based on data from Jigawa State.',
      chartValue: 0
    }
  ];

  percent = 77;
  percentColor = 'red';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['stats'] && this.stats) {
      this.updateStatsWithValues();
    }
  }

  updateStatsWithValues() {
    let totalAccidents = 0;
    const stateKeys = ['kano', 'kaduna', 'katsina', 'abuja', 'jigawa'];

    // Update each state's accident count from stats
    this.accidentStats = this.accidentStats.map(stat => {
      const key = stateKeys.find(k => stat.name.toLowerCase().includes(k));
      if (key) {
        const count = this.stats['state_' + key] || 0;
        totalAccidents += count;
        return { ...stat, value: count, chartValue: count };
      }
      return stat;
    });

    // Calculate average daily/monthly and update
    const avgMonthly = Math.round(totalAccidents / stateKeys.length);
    const avgDaily = Math.round(avgMonthly / 30);

    this.accidentStats[0].value = avgMonthly; // Monthly avg
    this.accidentStats[1].value = avgDaily;   // Daily avg
  }

  getCirclePath(percent: number): string {
    const radius = 23.5;
    const circumference = 2 * Math.PI * radius;
    const angle = 2 * Math.PI * (percent / 100);
    const x = 25 + radius * Math.sin(angle);
    const y = 25 - radius * Math.cos(angle);

    return `M 25 1.5 A ${radius} ${radius} 0 ${percent > 50 ? 1 : 0} 1 ${x} ${y}`;
  }
}

import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DecimalPipe, NgForOf } from '@angular/common';

@Component({
  selector: 'app-economic-setback',
  standalone: true,
  imports: [NgForOf, DecimalPipe],
  templateUrl: './economic-setback.component.html',
  styleUrl: './economic-setback.component.css'
})
export class EconomicSetbackComponent implements OnChanges {
  @Input() stats!: any;

  totalMoneyLost = 0;

  stateLossStats: {
    state: string;
    monetaryDeficit: number;
    averageDay: number;
    averageMonth: number;
    averageYear: number;
    percentage: number;
    logo: string;
    color: string;
  }[] = [
    { state: 'Kano', monetaryDeficit: 0, averageDay: 0, averageMonth: 0, averageYear: 0, percentage: 0, logo: 'FIRS/maps/kano.svg', color: '' },
    { state: 'Kaduna', monetaryDeficit: 0, averageDay: 0, averageMonth: 0, averageYear: 0, percentage: 0, logo: 'FIRS/maps/kaduna.avif', color: '' },
    { state: 'Jigawa', monetaryDeficit: 0, averageDay: 0, averageMonth: 0, averageYear: 0, percentage: 0, logo: 'FIRS/maps/jigawa.svg', color: '' },
    { state: 'Abuja', monetaryDeficit: 0, averageDay: 0, averageMonth: 0, averageYear: 0, percentage: 0, logo: 'FIRS/maps/abuja.avif', color: '' },
    { state: 'Katsina', monetaryDeficit: 0, averageDay: 0, averageMonth: 0, averageYear: 0, percentage: 0, logo: 'FIRS/maps/katsina.svg', color: '' }
  ];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['stats'] && this.stats) {
      this.updateStateLossStats();
    }
  }

  updateStateLossStats() {
    this.totalMoneyLost = 0;

    const stateKeys = {
      Kano: 'money_state_kano',
      Kaduna: 'money_state_kaduna',
      Jigawa: 'money_state_jigawa',
      Abuja: 'money_state_abuja',
      Katsina: 'money_state_katsina'
    };

    const colors = ['bg-primary', 'bg-success', 'bg-warning', 'bg-info', 'bg-danger'];

    this.stateLossStats = this.stateLossStats.map((item, index) => {
      const key = stateKeys[item.state as keyof typeof stateKeys];
      const monetaryDeficit = this.stats?.[key] ?? 0;
      this.totalMoneyLost += monetaryDeficit;

      return {
        ...item,
        monetaryDeficit,
        averageDay: monetaryDeficit / 365,
        averageMonth: monetaryDeficit / 12,
        averageYear: monetaryDeficit,
        percentage: 0, // temporary, will recalculate below
        color: colors[index % colors.length]
      };
    });

    // Recalculate percentage after totalMoneyLost is known
    this.stateLossStats = this.stateLossStats.map(item => ({
      ...item,
      percentage: this.totalMoneyLost > 0 ? (item.monetaryDeficit / this.totalMoneyLost) * 100 : 0
    }));
  }

  calculateTotalMoney(): number {
    return this.stateLossStats.reduce((sum, item) => sum + item.monetaryDeficit, 0);
  }
}

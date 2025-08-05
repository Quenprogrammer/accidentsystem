import {AfterViewInit, Component, computed, effect, ElementRef, signal, ViewChild} from '@angular/core';
import {DecimalPipe, NgClass, NgForOf, NgIf, TitleCasePipe} from '@angular/common';
import {VehiclesComponent} from './vehicles/vehicles.component';
import {StatisticsComponent} from './statistics/statistics.component';
import {StatisticsCardComponent} from './statistics-card/statistics-card.component';
import {EconomicSetbackComponent} from './economic-setback/economic-setback.component';
import {AgeRangeComponent} from './age-range/age-range.component';
import {AccidentCausesComponent} from './accident-causes/accident-causes.component';
import {AccidentByStateComponent} from './accident-by-state/accident-by-state.component';
import {RouterLink} from '@angular/router';
import {StatisticsService} from './add-accident/statistics.service';
import {StatsComponent} from './stats/stats.component';
import {MenuComponent} from '../menu/menu.component';
import {AccidentsComponent} from './accidents/accidents.component';
import {PasswordModalComponent} from '../password-modal/password-modal.component';

@Component({
  selector: 'app-home-page',
  imports: [
    NgForOf,
    NgClass,
    NgIf,
    VehiclesComponent,
    StatisticsComponent,
    StatisticsCardComponent,
    EconomicSetbackComponent,
    AgeRangeComponent,
    AccidentCausesComponent,
    AccidentByStateComponent,
    RouterLink,
    TitleCasePipe,
    DecimalPipe,
    StatsComponent,
    MenuComponent,
    AccidentsComponent,
    PasswordModalComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements AfterViewInit{
  statistics: any = null;
  loading = true;

  constructor(private statsService: StatisticsService) {
    effect(() => {
      this.drawPieChart();
    });
  }

  async ngOnInit() {
    this.statistics = await this.statsService.getStatsOnce();
    this.loading = false;
  }

  // ✅ Add these helper methods inside the class
  vehicleKeys(): string[] {
    if (!this.statistics) return [];
    return Object.keys(this.statistics)
      .filter(k => k.startsWith('vehicle_'))
      .map(k => k.replace('vehicle_', ''));
  }

  stateKeys(): string[] {
    if (!this.statistics) return [];
    return Object.keys(this.statistics)
      .filter(k => k.startsWith('money_'))
      .map(k => k.replace('money_', ''));
  }



  isLoading = signal<boolean>(false);

  @ViewChild('pieCanvas', { static: true }) pieCanvas!: ElementRef<HTMLCanvasElement>;

  // Hardcoded values
  public maleCount = signal<number>(16);      // <-- CHANGED TO public
  public femaleCount = signal<number>(30);

  totalPeople = computed(() => this.maleCount() + this.femaleCount());

  malePercentage = computed(() => {
    const total = this.totalPeople();
    return total === 0 ? 0 : (this.maleCount() / total) * 100;
  });

  femalePercentage = computed(() => {
    const total = this.totalPeople();
    return total === 0 ? 0 : (this.femaleCount() / total) * 100;
  });

  // Chart data
  data = computed(() => [this.malePercentage(), this.femalePercentage()]);
  colors = ['#4e73df', '#e83e8c']; // blue for male, pink for female
  labels = ['Male', 'Female'];



  ngAfterViewInit(): void {
    // Delay to ensure ViewChild is ready
    setTimeout(() => {
      this.drawPieChart();
    });
  }

  drawPieChart(): void {
    const canvas = this.pieCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const data = this.data();
    const total = data.reduce((sum, value) => sum + value, 0);
    const centerX = 200;
    const centerY = 200;
    const radius = 150;
    let currentAngle = -0.5 * Math.PI;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < data.length; i++) {
      const sliceAngle = (data[i] / total) * 2 * Math.PI;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
      ctx.closePath();

      ctx.fillStyle = this.colors[i];
      ctx.fill();

      currentAngle += sliceAngle;
    }
  }

  loadingData() {
    this.isLoading.set(true);
  }

  loadingDone() {
    this.isLoading.set(false);
  }

  accessGranted = false;
  onUnlock(success: boolean): void {
    this.accessGranted = success;
  }
}

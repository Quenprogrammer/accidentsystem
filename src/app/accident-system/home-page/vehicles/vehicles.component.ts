import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {LoadingDataComponent} from "../../../core/loading-data/loading-data.component";
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-vehicles',
  imports: [
    LoadingDataComponent,
    NgIf
  ],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.css'
})
export class VehiclesComponent implements OnChanges {
  @Input() stats!: any;
  loading: boolean=false;
  vehicleCategories = [
    { name: 'Car', key: 'car', logo: 'FIRS/accidentsMenu/car-svgrepo-com.svg', value: 0 },
    { name: 'Truck', key: 'truck', logo: 'FIRS/lorry.svg', value: 0 },
    { name: 'Bike', key: 'bike', logo: 'FIRS/bike.svg', value: 0 },
    { name: 'Bus', key: 'bus', logo: 'FIRS/bus.svg', value: 0 },
    { name: 'Van', key: 'van', logo: 'FIRS/van.svg', value: 0 },
    { name: 'Tricycle (Keke Napep)', key: 'tricycle_(keke_napep)', logo: 'FIRS/tricycle.svg', value: 0 },
    { name: 'Bicycle', key: 'bicycle', logo: 'FIRS/bike.svg', value: 0 },
    { name: 'Trailer', key: 'trailer', logo: 'FIRS/lorry.svg', value: 0 },
    { name: 'Construction Vehicle', key: 'construction_vehicle', logo: '', value: 0 },
    { name: 'Emergency Vehicle', key: 'emergency_vehicle', logo: 'FIRS/ambulance.svg', value: 0 }
  ];


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['stats'] && this.stats) {
      this.updateVehicleCounts();
    }
  }

  updateVehicleCounts() {
    this.loading=true;
    this.vehicleCategories = this.vehicleCategories.map(cat => ({
      ...cat,
      value: this.stats['vehicle_' + cat.key] || 0
    }));
    this.loading=false;
  }
}

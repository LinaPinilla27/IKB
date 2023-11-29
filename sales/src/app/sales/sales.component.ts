import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SalesService } from './sales.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [CommonModule, HttpClientModule, TableModule, ButtonModule, MultiSelectModule, FormsModule, CalendarModule
  ],
  providers: [HttpClient, DatePipe],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.scss',
  encapsulation: ViewEncapsulation.Emulated,
})
export class SalesComponent implements OnInit {
  sales!: any[];
  categories: string[] = ['customer', 'country', 'provider', 'category', 'variety', 'color'];

  selectedCategory!: any[];
  dateEnd!: Date;
  dateIni: Date | string | undefined = new Date('2023-10-02');
  salesGroupedByDate: { [date: string]: any[] } = {};

  constructor(private saleService: SalesService, private datePipe: DatePipe) { }

  ngOnInit(): void {

  }

  filter() {

    if (this.selectedCategory.includes('variety') && this.selectedCategory.includes('color')) {
      this.selectedCategory.push('category')
      console.log(this.selectedCategory);

    }
    this.datePipe.transform(this.dateIni, 'yyyy-MM-dd');


    this.dateIni = this.datePipe.transform(this.dateIni, 'yyyy-MM-dd') || '';
    this.saleService.getSales(this.dateIni, this.selectedCategory).subscribe(data => {
      data.forEach(sale => {
        if (!this.salesGroupedByDate[sale.date]) {
          this.salesGroupedByDate[sale.date] = [];
        }
        this.salesGroupedByDate[sale.date].push(sale);
      });

      this.sales = data
      // console.log(this.sales)
    })
  }

  calcularTotalColumna(columna: string): number {
    let total = 0;

    if (this.sales) {
      this.sales.forEach((sale: any) => {
        total += sale[columna] || 0; // Asegúrate de manejar valores nulos o indefinidos
      });
    }

    return total;
  }

}



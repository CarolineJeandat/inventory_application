import { Component, OnInit } from '@angular/core';
import { CrudService } from './../../services/crud.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  Products: any = [];

  constructor(private crudService: CrudService) {
    this.crudService.GetProducts().subscribe((data: any) => {
      this.Products = data.data;
    });
  }

  ngOnInit() {
  }

  delete(id: any) {
    if (window.confirm('Do you want to go ahead?')) {
      this.crudService.deleteProduct(id).subscribe((data: any) => {
        location.reload();
      });
    }
  }

}
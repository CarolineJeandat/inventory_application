import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent implements OnInit {

  productId!: any;
  product!: Product;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private crudService: CrudService,
    private ngZone: NgZone
  ) { }

  ngOnInit() { 
    this.productId = this.activatedRoute.snapshot.paramMap.get('id');
    this.crudService.GetProductById(this.productId).subscribe( 
      (res: any) => {
        this.product = {
          "_id": res.data._id,
          "name": res.data.name,
          "price": res.data.price,
          "quantity": res.data.quantity
        }
      }
    );
  }

  delete(id: any) {
    if (window.confirm('Do you want to go ahead?')) {
      this.crudService.deleteProduct(id).subscribe((data: any) => { });
      this.ngZone.run(
        () => this.router.navigateByUrl('/products-list')
      );
    }
  }

}

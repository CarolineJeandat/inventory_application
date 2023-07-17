import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../../services/crud.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss']
})
export class SearchProductComponent implements OnInit {

  productForm: FormGroup;
  invalidProduct: boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private crudService: CrudService
  ) {
    this.productForm = this.formBuilder.group({
      name: ['']
    });
  }

  ngOnInit() {}

  onSubmit(): any {
    this.crudService.GetProductByName(this.productForm.value.name).subscribe(
      (res: any) => {
        if (res.data) {
          console.log('Product found!' + res);
          this.invalidProduct = false;
          const productId = res.data._id;
          this.ngZone.run(() => this.router.navigateByUrl('/product/' + productId));
        } else {
          console.log("No product found");
          this.invalidProduct = true;
        }
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
  
}

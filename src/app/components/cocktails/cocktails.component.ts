import { Component, OnInit } from '@angular/core';
import { CocktailService } from '../../services/cocktail.service';
import { Router } from '@angular/router';
import { ISortOption } from '../../models/sort-option';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-cocktails',
  templateUrl: './cocktails.component.html',
  styleUrls: ['./cocktails.component.scss']
})
export class CocktailsComponent implements OnInit {
  
  public cocktails = [];
  public cocktailsConstant = [];
  public userName = '';

  sortOptions: ISortOption[] = [
    {value: 'name', viewValue: 'Name'},
    {value: 'rating', viewValue: 'Rating'},
    {value: 'reviews', viewValue: 'Review'}
  ];

  selectedValue = this.sortOptions[0].value; // default sorting

  constructor(private _cocktailService: CocktailService, private router: Router) { }

  inputName = async() => {
    await Swal.fire({
      title: 'Your name?',
      text: "We keep your name confidential!",
      input: 'text',
      confirmButtonColor: '#ff8000',
      allowOutsideClick: false,
      allowEscapeKey: false,
      inputValidator: (value) => {
        if (!value) {
          return 'Please enter your name!'
        }
        else {
          this._cocktailService.setUserName(value);
          this.userName = this._cocktailService.userName;
        }
      }
    });
  }

  searchQuery = (query) => {
    this.cocktails = this.cocktailsConstant.filter((cocktail) =>  JSON.stringify(cocktail).toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }

  sortCocktails = (selectedValue) => {

    if (selectedValue === 'rating'){
      this.cocktails = this.cocktails.sort((a,b) => {
        return b.ratings - a.ratings
      });
    }

    else if (selectedValue === 'reviews'){
      this.cocktails = this.cocktails.sort((a,b) => {
        return b.reviews - a.reviews
      });
    }

    else if (selectedValue === 'name'){
       function compareName (a, b)  {
        // case-insensitive comparison
        a = a.toLowerCase();
        b = b.toLowerCase();
      
        return (a < b) ? -1 : (a > b) ? 1 : 0;
      }
      this.cocktails = this.cocktails.sort((a,b) => {
        return compareName(a.name, b.name)
      });
    }
  }

  goToCocktail = (cocktail) => {
    localStorage.setItem(this.userName+"-viewed-"+cocktail.id,"true");
    this.router.navigate(['/cocktails', cocktail.id])
  }

  isViewed=(cocktail) =>{
    return localStorage.getItem(this.userName+"-viewed-"+cocktail.id)!=null;
  }


  ngOnInit(): void {
    this._cocktailService.getCocktails().subscribe((data) => {
      this.cocktailsConstant = this.cocktails = data;
      this.sortCocktails(this.selectedValue);
      this.userName = this._cocktailService.userName;
      if(!this._cocktailService.userName) {
        this.inputName();
      }
    });
    
  }

}

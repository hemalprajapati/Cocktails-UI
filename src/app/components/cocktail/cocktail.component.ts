import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CocktailService } from '../../services/cocktail.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { MatSidenav } from '@angular/material/sidenav';
import { SideNavService } from '../../services/side-nav.service';

@Component({
  selector: 'app-cocktail',
  templateUrl: './cocktail.component.html',
  styleUrls: ['./cocktail.component.scss']
})
export class CocktailComponent implements OnInit, AfterViewInit {

  @ViewChild('sidenav', {static: true}) public sidenav: MatSidenav;

  public cocktails = [];
  public cocktail;
  public isFetched: boolean = false;
  public toggleMode = "over";
  public userName = '';
  public isSideNavShowing: boolean = false; 
  public isFavorite: boolean = false;
 


  constructor(private _cocktailService: CocktailService, private route: ActivatedRoute, 
    private router: Router, private _sidenavService: SideNavService) { }

  scrollTop = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  removeFavorite= () => {
    localStorage.removeItem(this.userName+"-favorite-"+this.cocktail.id);   
    this.isFavorite=false; 
  }

  addToFavorite= () => {
    localStorage.setItem(this.userName+"-favorite-"+this.cocktail.id,"true");    
    this.isFavorite=true;
  }

  

  goToCocktailList= () => {
    this.router.navigateByUrl("/cocktails");
  }
  getCocktail = (id: number) => {
    try {
      return this.cocktail.filter((cocktail) => cocktail.id == id);
    }
    catch(e) {
      console.log(e);
    }
  }


  

  ngAfterViewInit(): void {
    this._sidenavService.setSidenav(this.sidenav);
  }

  ngOnInit(): void {
    this.scrollTop();

    this.route.paramMap.subscribe((params: ParamMap) => {
      this._cocktailService.getCocktailDetails(params.get('id')).subscribe((data) => {
        this.cocktail=data;
        this.isFavorite=localStorage.getItem(this._cocktailService.userName+"-favorite-"+this.cocktail.id)!=null;

      });
    })
    
   

    this.userName = this._cocktailService.userName;

    if(!this.userName) {
      this.router.navigateByUrl("/cocktails");
    }
  }
}

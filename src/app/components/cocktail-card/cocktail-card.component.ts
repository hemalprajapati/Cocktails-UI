import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cocktail-card',
  templateUrl: './cocktail-card.component.html',
  styleUrls: ['./cocktail-card.component.scss']
})
export class CocktailCardComponent implements OnInit {

  @Input() public cocktailName;
  @Input() public cocktailThumbnail;
  @Input() public cocktailImage;
  @Input() public cuisines;
  @Input() public rating;
  @Input() public review;
  @Input() public isViewed;

  public math = Math;

  constructor() { }

  ngOnInit(): void {
  }

}

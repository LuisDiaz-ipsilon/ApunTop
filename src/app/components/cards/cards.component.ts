import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { VisorComponent } from '../visor/visor.component';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent{

  @Input()
  items: any[]=[];

  constructor(private router: Router, private visor: VisorComponent) { }

  
  //Esta funcion rutea a un componente en donde se abrira el libro
  //Depues se carga en el componente el libro presionado
  verLibro(item: any){
    this.router.navigate(['/visor', item]);
    this.visor.downloadAndOpenPDF();
  }

}

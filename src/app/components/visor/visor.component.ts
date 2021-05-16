import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-visor',
  templateUrl: './visor.component.html',
  styleUrls: ['./visor.component.scss'],
})
export class VisorComponent implements OnInit {

  //pdfURL: File=

  constructor() { 
    /*let pdffile =URL.createObjectURL(this.pdfURL);
    console.log(pdffile);*/
    //document.querySelector('#visorPDF').setAttribute('src', 'C:/PIA.pdf');
  }

  ngOnInit() {}

}

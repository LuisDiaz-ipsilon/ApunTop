import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { computeStackId } from '@ionic/angular/directives/navigation/stack-utils';
import { GoogleBooksService } from '../../services/api/google-books.service';

//para el visor
import { DocumentViewerOptions, DocumentViewer } from '@ionic-native/document-viewer/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { Platform } from '@ionic/angular';
import { File } from "@ionic-native/file/ngx";

@Component({
  selector: 'app-visor',
  templateUrl: './visor.component.html',
  styleUrls: ['./visor.component.scss'],
})
export class VisorComponent {

  
  book: any = {};
  loading: boolean;

  constructor(private router: ActivatedRoute,
    private gglBooks: GoogleBooksService,
    private file: File,
    private transfer: FileTransfer,
    private document: DocumentViewer,
    private platform: Platform
  ) {
    this.loading = true;
    this.router.params.subscribe(params => {
      this.getBook(params['id']);
      this.book = params;
      this.loading = false;
      console.log(this.book);
    });
    
  }

  openLocalPDF() {
    const options: DocumentViewerOptions = {
      title: 'My PDF'
    };
    this.document.viewDocument('', 'application/pdf', options);
  }

  downloadAndOpenPDF() {
    let path = null;

    if (this.platform.is('android')) {
      path = this.file.documentsDirectory;
    } else {
      path = this.file.dataDirectory;
    }
  
    
    let downloadLinkBook : string= this.book.accessInfo.epub.downloadLink;

    const transfer = this.transfer.create();
    transfer.download(downloadLinkBook, path + this.book.id).then(entry => {
      let url = entry.toURL();
      this.document.viewDocument(url, 'application/pdf', {})
    });
  }

  getBook(id: string) {
    this.gglBooks.getBookForId(id);
  }
  
  
}


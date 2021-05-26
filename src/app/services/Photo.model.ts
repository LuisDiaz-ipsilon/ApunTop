export class PhotoService {
    public photos: Photo[] = [];
  
    // other code
}

export interface Photo {
    filepath: string;
    webviewPath: string;
  }
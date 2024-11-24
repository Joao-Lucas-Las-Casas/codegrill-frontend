import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CommentsDto} from '../dto/CommentsDto';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

  constructor(private readonly http: HttpClient) {
  }

  public listComments(): Observable<CommentsDto[]> {
    return this.http.get<CommentsDto[]>('http://localhost:8080/v1/comments');
  }

  public sendComment(comment: string) {
    return this.http.post<void>('http://localhost:8080/v1/comments', {
      comment: comment
    });
  }
}

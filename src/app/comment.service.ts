import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions,Jsonp} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class CommentService {

  constructor(private http:Http,private jsonp:Jsonp) { }
  
  addComment(comment:any,replyId:any):Observable<any>{
    let data={};
    if(replyId==null){
      data={
        value:comment,
        main:"1"
      }
    }
    else{
      console.log(comment,replyId);
      data={
        value:comment,
        main:"0",
        commentId:replyId
      }
    }
    
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    const url="http://localhost:3000/comment/post-comment";
    return this.http.post(url,data,options).map(data=>{return data.json();});
  }

  getComment(){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    const url="http://localhost:3000/comment/get-comment";
    return this.http.get(url,options).map(data=>{return data.json();});
  }

  deleteComment(id){
    let data={
      comment_id:id
    }
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    const url="http://localhost:3000/comment/delete-comment";
    return this.http.post(url,data,options).map(data=>{return data.json();});
  }

  getReplies(){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    const url="http://localhost:3000/comment/get-replies";
    return this.http.get(url,options).map(data=>{return data.json();});
  }
}

import { Component, OnInit } from '@angular/core';
import {CommentService} from '../comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
  providers:[CommentService]
})
export class CommentComponent implements OnInit {

  userComment:string;
  commentList:any;
  allComments:Array<any>=[];
  allReplies:Array<any>=[];
  replyValue:any;
  replyData:any;

  constructor(private commentService:CommentService) { }

  ngOnInit() {
    this.readComment();
    this.getReplies();
  }

  writeComment(){
    this.commentService.addComment(this.userComment,null).subscribe(data=>{
      this.readComment();
    });
    this.userComment="";
  }
  readComment(){
    this.commentService.getComment().subscribe(data=>{
      this.allComments=data.doc;
    });
  }
  deleteComment(id){
    this.commentService.deleteComment(id).subscribe(data=>{
      this.allComments=data.doc;
    })
  }

  doReply(id){
    this.replyValue=id;
  }

  reply(id){
    this.commentService.addComment(this.replyData,id).subscribe(data=>{
      this.getReplies();
    });
    this.replyData="";
    this.replyValue="";
  }

  getReplies(){
    this.commentService.getReplies().subscribe(data=>{
      this.allReplies=data.doc;
    });
  }
}

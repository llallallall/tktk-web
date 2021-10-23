import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cd } from 'src/app/models/codes/cd';
import { EvalData } from 'src/app/models/posts/eval-data';
import { EvaluateModel } from 'src/app/models/posts/evaluate.model';
import { PostModel } from 'src/app/models/posts/post.model';
import { UserModel } from 'src/app/models/users/user-model';
import { ApiService } from 'src/app/service/api.service';
import { PostService } from 'src/app/service/post.service';
import { fadeIn } from 'src/app/share/animations/fade-in.animation';
import DlgUtil from 'src/app/utils/dlg.util';


@Component({
  selector: 'app-eval-tools',
  templateUrl: './eval-tools.component.html',
  styleUrls: ['./eval-tools.component.scss',],
  animations: [fadeIn,],
})
export class EvalToolsComponent implements OnInit {

  @Input() model: PostModel;

  constructor() { }

  ngOnInit(): void {
  }

}

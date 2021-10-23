import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { SiteModel } from 'src/app/models/site/site.model';
import { UserProcessModel } from 'src/app/models/users/user-process.model';
import { ApiService } from 'src/app/service/api.service';
import { fadeIn } from 'src/app/share/animations/fade-in.animation';
import DlgUtil from 'src/app/utils/dlg.util';

// https://tktk.crazyupinc.com/theenm/p/up/i?t=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0eXBlIjoiY2hhbmdlX3B3Iiwic3RhcnRUcyI6MTYzMjU3NDIzMjM3MiwidXNlcklkeCI6IjYxNGVmOTEyODIzOWNkZmFiNGQ5MzdmMyIsImVtYWlsIjoiam1AY3Jhenl1cGluYy5jb20iLCJvYmplY3RJZCI6IjYxNGYxYjE4MjM4MWU2NDA2ZjI3MWYyYiJ9.19cicybrKH9gO5iqY4OfyyAmkWvlnC6XLeR6ByL6Rlw" style="text-decoration:none" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://tktk.crazyupinc.com/theenm/p/up/i?t%3DeyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0eXBlIjoiY2hhbmdlX3B3Iiwic3RhcnRUcyI6MTYzMjU3NDIzMjM3MiwidXNlcklkeCI6IjYxNGVmOTEyODIzOWNkZmFiNGQ5MzdmMyIsImVtYWlsIjoiam1AY3Jhenl1cGluYy5jb20iLCJvYmplY3RJZCI6IjYxNGYxYjE4MjM4MWU2NDA2ZjI3MWYyYiJ9.19cicybrKH9gO5iqY4OfyyAmkWvlnC6XLeR6ByL6Rlw
// http://localhost:1290/theenm/p/up/i?t=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0eXBlIjoiY2hhbmdlX3B3Iiwic3RhcnRUcyI6MTYzMjU3NDIzMjM3MiwidXNlcklkeCI6IjYxNGVmOTEyODIzOWNkZmFiNGQ5MzdmMyIsImVtYWlsIjoiam1AY3Jhenl1cGluYy5jb20iLCJvYmplY3RJZCI6IjYxNGYxYjE4MjM4MWU2NDA2ZjI3MWYyYiJ9.19cicybrKH9gO5iqY4OfyyAmkWvlnC6XLeR6ByL6Rlw" style="text-decoration:none" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://tktk.crazyupinc.com/theenm/p/up/i?t%3DeyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0eXBlIjoiY2hhbmdlX3B3Iiwic3RhcnRUcyI6MTYzMjU3NDIzMjM3MiwidXNlcklkeCI6IjYxNGVmOTEyODIzOWNkZmFiNGQ5MzdmMyIsImVtYWlsIjoiam1AY3Jhenl1cGluYy5jb20iLCJvYmplY3RJZCI6IjYxNGYxYjE4MjM4MWU2NDA2ZjI3MWYyYiJ9.19cicybrKH9gO5iqY4OfyyAmkWvlnC6XLeR6ByL6Rlw

// http://localhost:1290/theenm/p/up/i?t=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0eXBlIjoiY2hhbmdlX3B3Iiwic3RhcnRUcyI6MTYzMjU3NDIzMjM3MiwidXNlcklkeCI6IjYxNGVmOTEyODIzOWNkZmFiNGQ5MzdmMyIsImVtYWlsIjoiam1AY3Jhenl1cGluYy5jb20iLCJvYmplY3RJZCI6IjYxNGYxYjE4MjM4MWU2NDA2ZjI3MWYyYiJ9.19cicybrKH9gO5iqY4OfyyAmkWvlnC6XLeR6ByL6Rlw" style="text-decoration:none" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://tktk.crazyupinc.com/theenm/p/up/i?t%3DeyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0eXBlIjoiY2hhbmdlX3B3Iiwic3RhcnRUcyI6MTYzMjU3NDIzMjM3MiwidXNlcklkeCI6IjYxNGVmOTEyODIzOWNkZmFiNGQ5MzdmMyIsImVtYWlsIjoiam1AY3Jhenl1cGluYy5jb20iLCJvYmplY3RJZCI6IjYxNGYxYjE4MjM4MWU2NDA2ZjI3MWYyYiJ9.19cicybrKH9gO5iqY4OfyyAmkWvlnC6XLeR6ByL6Rlw

// http://localhost:1290/theenm/p/up/i?t=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0eXBlIjoiY2hhbmdlX3B3Iiwic3RhcnRUcyI6MTYzMjYzMTA1MTUyMSwidXNlcklkeCI6IjYxNGVmOTEyODIzOWNkZmFiNGQ5MzdmMyIsImVtYWlsIjoiam1AY3Jhenl1cGluYy5jb20iLCJvYmplY3RJZCI6IjYxNGZmOTBiZGNlODJjNDEzMjUwNGQ0MCJ9.srTT1mvfInFpthsdG9yUFP8ZHKy4npZcubMFN_sv0dk


@Component({
  selector: 'app-up-intro',
  templateUrl: './up-intro.component.html',
  animations: [fadeIn,],
})
export class UpIntroComponent implements OnInit {

  isLoading = false;
  model = new UserProcessModel();

  constructor(
    private _api: ApiService,
    private _aRoute: ActivatedRoute,
    private _sb: MatSnackBar,
    private _dlg: MatDialog,
  ) { }

  ngOnInit(): void {
    const ftag = `ngOnInit(),`;
    this.parseParams();
    // console.log(ftag, 'siteModel=', this.siteModel);
  }

  parseParams() {
    const ftag = `parseParams()`;
    this._aRoute.queryParams.subscribe((querys) => {
      console.log(ftag, 'querys=', querys);
      // querys.title = querys.title || 'pdf';
      this.parse_token(querys.t);
    });
  }

  get siteModel(): SiteModel {
    return this._api.siteModel;
  }

  async parse_token(t: string) {
    const ftag = `parse_token(),`;
    try {
      this.isLoading = true;
      const res = await this._api.reqAuthCmd('parse_token', {
        t: t,
      });
      this.isLoading = false;
      console.log(ftag, 'res=', res);
      if (res.result) {
        this.model = new UserProcessModel(res.result);
      }
      console.log(ftag, 'model=', this.model);
      if (this.model.expireTs < (new Date()).getTime()) {
        console.log(ftag, 'expireTs=', this.model.expireTs);
        this.gotoFail(t);
        return;
      }
      if (this.model.state !== UserProcessModel.St.wait_mail_accept) {
        console.log(ftag, 'state=', this.model.state);
        this.gotoFail(t);
        return;
      }
      switch (this.model.type) {
        case UserProcessModel.Type.change_pw: {
          this._api.navigate('/p/up/cp', {
            queryParams: {
              t: t,
            },
            replaceUrl: true,
          });
          return;
        }
        case UserProcessModel.Type.dormant_release: {
          this._api.navigate('/p/up/dr', {
            queryParams: {
              t: t,
            },
            replaceUrl: true,
          });
          return;
        }
      }
      console.log(ftag, `unknown type=`, this.model.type);
      this.gotoFail(t);
    } catch (err) {
      this.isLoading = false;
      console.log(ftag, 'err=', err);
    }
  }

  gotoFail(t: string) {
    this._api.navigate('/p/up/fail', {
      queryParams: {
        t: t,
      },
      replaceUrl: true,
    });
  }



}

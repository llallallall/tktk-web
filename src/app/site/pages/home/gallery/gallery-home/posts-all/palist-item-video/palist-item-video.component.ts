import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { PostModel } from 'src/app/models/posts/post.model';
import { fadeIn } from 'src/app/share/animations/fade-in.animation';
import { YouTubePlayer } from '@angular/youtube-player'

let apiLoaded = false;

@Component({
  selector: 'app-palist-item-video',
  templateUrl: './palist-item-video.component.html',
  animations: [fadeIn,],
})
export class PalistItemVideoComponent implements OnInit {

  @Input() model: PostModel;
  // player: YouTubePlayer;
  @ViewChild('youtube_player', { static: false }) player: YouTubePlayer;

  constructor() { }

  ngOnInit(): void {
    const ftag = `ngOnInit(),`;
    // console.log(ftag, 'model=', this.model);    
    console.log(ftag, 'apiLoaded=', apiLoaded);
    if (!apiLoaded) {
      // This code loads the IFrame Player API code asynchronously, according to the instructions at
      // https://developers.google.com/youtube/iframe_api_reference#Getting_Started
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      apiLoaded = true;
    }
  }

  ngAfterViewInit(): void {
    const ftag = `ngAfterViewInit(),`;
    
    console.log(ftag, 'player=', this.player);
    // this.player.playVideo()
  }

  get youtubeId(): string {
    return this.model.youtubeId;
  }

  on_ready($event) {
    const ftag = `on_ready(),`;
    console.log(ftag, '$event=', $event);
    // this.player = $event.target;
    // console.log(ftag, 'player=', this.player);

  }

  on_mouseover() {
    if (this.player) {
      this.player.playVideo();
    }
  }

  on_mouseleave() {
    if (this.player) {
      this.player.pauseVideo();
    }
    
  }
}

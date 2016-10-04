import template from './set-name.html!text';
import {RouteConfig, Component, View, Inject} from '../../ng-decorators.js';

@RouteConfig('set-name', {
  url: '/set-name',
  template: '<set-name></set-name>'
})
@Component({
  selector: 'set-name'
})
@View({
  template: template
})
@Inject('$state', 'GroupService')

class SetName {
  constructor($state, GroupService) {
    this.router = $state;
    this.peerService = GroupService.get().getService('peer');

    this.canvas = document.getElementById('set-name-canvas');
    this.context = this.canvas.getContext('2d');
    this.video = document.getElementById('set-name-video');

    var identity = this.peerService.getIdentity();

    if (identity && identity.photo) {
      this.photo = identity.photo;

      var img = new Image();
      img.src = this.photo;
      this.context.drawImage(img, 0, 0, 160, 120);
    } else {
      this.photo = false;
    }

    if (identity && identity.name) {
      this.name = identity.name;
    }

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then((stream) => {
        this.stream = stream;
        this.video.src = window.URL.createObjectURL(stream);
        this.video.play();
      });
    }
  }

  removePhoto () {
    this.context.clearRect(0, 0, 160, 120);
    this.photo = false;
    this.snappedPhoto = false;
  }

  makePhoto () {
    this.context.drawImage(this.video, 0, 0, 160, 120);
    this.photo = this.canvas.toDataURL();
    this.snappedPhoto = true;
  }

  saveForm () {
    this.peerService.setIdentity({
      name: this.name,
      photo: this.photo
    });

    this.track = this.stream.getVideoTracks()[0];
    this.video.pause();
    this.track.stop();
    this.router.go('chat');
  }
}

export default SetName;
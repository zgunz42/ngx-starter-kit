import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ANIMATE_ON_ROUTE_ENTER } from '@nx-starter-kit/animations';
// import * as Trianglify from 'trianglify';
declare var Trianglify: any;
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/fromEvent';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { map, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'nxtk-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, OnDestroy, AfterViewInit {
  private _destroyed = new Subject();

  animateOnRouteEnter = ANIMATE_ON_ROUTE_ENTER;
  @ViewChild('trianglify') trianglifyCanvasRef: ElementRef;
  color = 'YlGnBu'; // 'random'
  private _sub: Subscription;
  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    fromEvent<Event>(window, 'resize')
      .pipe(
        takeUntil(this._destroyed),
        debounceTime(100),
        map(event => [(<Window>event.target).innerWidth, (<Window>event.target).innerHeight]),
        distinctUntilChanged()
      )
      .subscribe(res => {
        // setTimeout(() => {this.renderCanvas() }, 1000)
        this.renderCanvas();
      });
  }

  ngOnDestroy() {
    this._destroyed.next();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.renderCanvas();
    }, 500);
  }

  renderCanvas() {
    if (!this.elementRef.nativeElement.parentNode) return;
    const width = this.elementRef.nativeElement.children[0].offsetWidth;
    // const height = this.elementRef.nativeElement.children[0].offsetHeight;
    const height = this.elementRef.nativeElement.parentNode.offsetHeight;

    const pattern = Trianglify({
      cell_size: width / 50 + Math.random() * 100,
      variance: Math.random(),
      x_colors: this.color,
      // x_colors: 'Blues',
      y_colors: 'match_x',
      palette: Trianglify.colorbrewer,
      color_space: 'lab',
      color_function: false,
      stroke_width: 1.51,
      width: width,
      height: height,
      seed: Math.random()
    });
    pattern.canvas(this.trianglifyCanvasRef.nativeElement);
  }
}

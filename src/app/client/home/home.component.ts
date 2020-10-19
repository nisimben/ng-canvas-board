import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import { DbService } from 'src/app/services/db.service';
import { User } from 'src/app/server/db';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  user: User
  cx: CanvasRenderingContext2D
  lineSize:any =3
  @Input() public width = 560;
  @Input() public height = 360;
  
  @ViewChild('canvas') public canvas: ElementRef;
  constructor(private svDb: DbService) { }

  ngAfterViewInit(): void {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.cx = canvasEl.getContext('2d');
    this.cx.lineWidth = this.lineSize 

    canvasEl.width = this.width;
    canvasEl.height = this.height;




    // When true, moving the mouse draws on the canvas
    let isDrawing = false;
    let x = 0;
    let y = 0;
    
    this.cx.strokeStyle = '#000000';



    // event.offsetX, event.offsetY gives the (x,y) offset from the edge of the canvas.

    // Add the event listeners for mousedown, mousemove, and mouseup
    canvasEl.addEventListener('mousedown', e => {
      x = e.offsetX;
      y = e.offsetY;
      isDrawing = true;
    });

    canvasEl.addEventListener('mousemove', e => {
      if (isDrawing === true) {
        drawLine(this.cx, x, y, e.offsetX, e.offsetY);
        x = e.offsetX;
        y = e.offsetY;
        this.cx.lineWidth =this.lineSize
      }
    });

    window.addEventListener('mouseup', e => {
      if (isDrawing === true) {
        drawLine(this.cx, x, y, e.offsetX, e.offsetY);
        x = 0;
        y = 0;
        isDrawing = false;
      }
    });
    function drawLine(context, x1, y1, x2, y2) {
      context.beginPath();
      context.strokeStyle = 'black';
      context.lineWidth = this.lineSize;
      context.moveTo(x1, y1);
      context.lineTo(x2, y2);
      context.stroke();
      context.closePath();

    }

  }


  ngOnInit(): void {
    

    this.svDb.getUser().subscribe((val) => {
      this.user = val
      console.log(val);
    })
  }
  clearCanvas() {
    console.log('clear that canvas');
    this.cx.clearRect(0, 0, this.width, this.height);
  }
  enlargeLine() {
    
    this.cx.lineWidth = this.lineSize++
    console.log(this.lineSize);

  }
  


}

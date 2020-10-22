import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import { DbService } from 'src/app/services/db.service';
import { User } from 'src/app/models/UserModel';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  user: User
  cx: CanvasRenderingContext2D
  message: string
  messages: string[] = [];
  lineWidth = 3
  @Input() public width = 560;
  @Input() public height = 360;


  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('cursor ') cursor: ElementRef;

  constructor(private svDb: DbService, private chatService: ChatService) { }
  /**
   * CHAT
   */
  sendMessage() {
    this.chatService.sendMessage(this.message);
    this.message = '';
  }

  /**
   * CANVAS
   */
  ngAfterViewInit(): void {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.cx = canvasEl.getContext('2d');

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
      this.cx.lineWidth = this.lineWidth

    });

    canvasEl.addEventListener('mousemove', e => {
      if (isDrawing === true) {
        drawLine(this.cx, x, y, e.offsetX, e.offsetY);
        x = e.offsetX;
        y = e.offsetY;
        this.cx.lineWidth = this.lineWidth

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
      context.lineCap = 'round';
      context.moveTo(x1, y1);
      context.lineTo(x2, y2);
      context.stroke();
      context.closePath();
    }


  }

  enlargeLine() {
    this.lineWidth++
    console.log(this.lineWidth);

  }
  lowLine() {
    this.lineWidth--
    console.log(this.lineWidth);

  }
  clearCanvas() {
    console.log('clear that canvas');
    this.cx.clearRect(0, 0, this.width, this.height);
  }

  ngOnInit(): void {
// subscribe to  DB Service
    this.svDb.getUser().subscribe((val) => {
      this.user = val
      console.log(val);
    })
// subscribe to Chat Service
this.chatService.getMessages().subscribe((val)=>{
  this.messages.push(val)
  console.log(val);
  
})
  }






}

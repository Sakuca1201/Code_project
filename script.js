let x = []; //建立空集合，讓路徑座標x,y能夠一一被儲存至中
let y = [];
let fourierX; //定義變數名稱
let fourierY;

let theta=0;
let path=[]; //把wave改成path來更直觀描述

 function setup() {
      createCanvas(2000, 1200);
        for (let i=0;i<drawing.length;i++){
          x.push(drawing[i].x); //分別儲存座標點x,y
          y.push(drawing[i].y);
        }
        
        fourierX = dft(x); //！--變數的意義分別是對x,y做DFT，其結果像：fourierX=X[k]的資料包，裡面有i=1(X[1]},i=2...個資料夾
        fourierY = dft(y);

        fourierX.sort((a, b) => b.amp - a.amp);
        fourierY.sort((a, b) => b.amp - a.amp);
}

function epiCycles(x, y,rotation, fourier) { //!--對於 ' 繪製轉盤 ' 的動作，用程式epiCycle表示之
     for( let i=0; i<fourier.length ;i++){ //轉盤總數=訊號長度=傅立葉長度
         let prevx= x;
         let prevy= y;
         let freq = fourier[i].freq;
         let radius = fourier[i].amp; //fourier是一個數組，包含了freq,radius,phase
         let phase = fourier[i].phase; //不像在繪製方波時有明確的指示，這裡我們要把得到的freq，radius，phase分別考量進轉盤中
         x += radius/2 * cos(freq*theta + phase + rotation); //rotation是整個轉盤在一開始就不同的差角，如x和y轉盤一開始就差HALF_PI
         y += radius/2 * sin(freq*theta + phase + rotation);

         stroke (255,100);
         noFill();
         ellipse(prevx, prevy, radius);

         stroke(255);
         line(prevx,prevy,x,y);
         }
         return createVector(x, y); //！--返回最終的x分量和y分量
 }


function draw() { 
      background(0);
      
     let vx = epiCycles(400, 100, 0, fourierX); //vx,vy分別代表對x,y的DFT結果做繪圖轉盤
     let vy = epiCycles (100, 200, HALF_PI, fourierY);
     let v = createVector(vx.x , vy.y); //!--v點是由vx的x分量和vy的y分量組成，成功讓兩個末端座標點(x,0),(0,y)結合
      path.unshift(v);
    
      line(vx.x , vx.y, v.x, v.y); //將x,y轉盤的最末點與v點連線
      line(vy.x , vy.y, v.x, v.y);
      beginShape();
      noFill();
      for(let i=0; i<path.length ;i++) {
          vertex (path[i].x , path[i].y);
      }
      endShape();

const dt = TWO_PI / fourierY.length; //讓每秒走的弧度=訊號長度，使越多訊號時能增加計算次數，獲得較平整的路徑結果
theta += dt ;
}


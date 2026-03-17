function dft(x) { //定義甚麼是 ' 離散傅立葉變換 '
  let X= []; //建立一個集合X[]，他將會儲存每一個X[k]
  const N = x.length; //點序列個數也就是x.length
  for ( let k=0 ; k<N ; k++) { //根據公式編寫迴圈：每一個頻率下對每一個採樣x[n]做點乘
  let re= 0; //引入複平面概念，拆分 實部 與 虛部
  let im= 0;
    for ( let n=0 ;n<N ; n++)  {
        const phi = (TWO_PI * k* n) / N; //對公式套入 歐拉公式 ，其中(TWO_PI*k*n)/N 用phi表示
        re +=x[n] * cos (phi); //得到實部為：x[n]*cos(TWO_PI*k*n)/N
        im -=x[n] * sin(phi); //得到虛部為：x[n]*sin(TWO_PI*k*n)/N
     }
  re = re/N; //標準DFT，讓頻域的振幅貼近信號的實際振幅
  im = im/N;

 let freq = k;
 let amp = sqrt (re*re + im*im);
 let phase = atan2 (im, re); //定義每一個頻域的：頻率，振幅，相位角

  X[k] = { freq, amp, phase }; //每一個頻率下包含的資訊
 }
return X; //！--返回頻域數組
}

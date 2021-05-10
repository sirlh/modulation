
 ////////////////////////////////////////////////////// 
//           
//                 绘制函数的图像/示波器
//
////////////////////////////////////////////////////
//  function osc()
//  
//  
//  图像显示界面 
//  
//  ctx: 画板的上下文，ctx 获取方法如下：
//            const $id = document.getElementById('id') , id 指的是 canvas 中设定的值
//            const ctx = $id.getContext('2d')
// 
//  xs : x 轴产生的点，可视为 x
//  scale_x : x轴的单位长度，单位是像素
//  scale_y ： y轴的单位长度
//  func    ： x 对应的函数值，可视为 y
//  width   ： 画板的宽度
//  heigth  ： 画板的高度
//  show_Num： 是否显示坐标，1：显示 0：否
//  

    function draw(ctx, xs, scale_x, scale_y, func, width, height,show_Num){
        
            //先清除画板上的内容
            ctx.clearRect(0, 0 , width, height);
            ctx.strokeStyle = 'black'
            //中点的坐标
            const xD = width / 2, yD = height /2;
            
            // 绘制 x 轴
            ctx.beginPath();
            ctx.moveTo(0,yD);
            ctx.lineTo(width,yD);
            ctx.stroke();
            
            // x 轴的箭头
            ctx.beginPath();
            ctx.moveTo(width - 10, yD - 5);
            ctx.lineTo(width,yD);
            ctx.lineTo(width - 10, yD + 5);
            ctx.stroke();
            
            // x 轴的文字
            ctx.font = '25px Gabriol';
            ctx.fillText('x', width - 20, yD +20);

            //绘制 y 轴
            ctx.beginPath();
            ctx.moveTo(xD,0);
            ctx.lineTo(xD,height);
            ctx.stroke();

            // y 轴的箭头
            ctx.beginPath();
            ctx.moveTo(xD - 5, 5);
            ctx.lineTo(xD, 0);
            ctx.lineTo(xD + 5, 5);
            ctx.stroke();

            // y 轴的文字
            ctx.font = '25px Gabriol';
            ctx.fillText('y', xD - 20, 20);

            //绘制 0 点
            ctx.font = '25px Gabriol';
            ctx.fillText('0', xD - 20, yD + 20);

            //生成 x 轴的坐标标点
            const xAxis = new Array(Math.ceil(width / scale_x)).fill(1)
                .map((_,i,arr) => i - Math.floor(arr.length / 2));
            xAxis.forEach(x =>{
                if(x!=0 && show_Num == 1)
                {
                    ctx.beginPath();
                    ctx.moveTo(Math.round(x * scale_x + xD), Math.round(yD));
                    ctx.lineTo(Math.round(x * scale_x + xD), Math.round(yD-3));
                    
                    //坐标轴标数字
                    ctx.font = '10px Gabriol' ;
                    ctx.fillText(x, x * scale_x + xD - 3, yD + 15);}
   
                    ctx.stroke();
                }
            );

            //生成 y 轴的坐标标点
            const yAxis = new Array(Math.ceil(height / scale_y)).fill(1)
                .map((_,i,arr) => i - Math.floor(arr.length / 2));
            yAxis.forEach(y =>{
                if(y!=0 && show_Num == 1){
                    ctx.beginPath();
                    ctx.moveTo(Math.round(xD), Math.round(y * scale_y + yD));
                    ctx.lineTo(Math.round(xD-3), Math.round(y * scale_y + yD));
            
                    //坐标轴标数字
                    ctx.font = '10px Gabriol' ;
                    ctx.fillText(-y, xD - 15, y * scale_y + yD);}
                
                    ctx.stroke();
                }
            );
            
            //绘制图像
            //设置画笔为红色
            ctx.strokeStyle = 'red'
            ctx.beginPath();
            xs.forEach((x,i) => {
                //如果是第一个，则是 moveTo
                if(i == 0){
                    // x 需要乘以每个的像素点，不然会很密集，再加上 x0 将原点一到画板中间，
                    // y 值也一样，符号是因为画板的y轴与数学上的数轴正好相反
                    ctx.moveTo(Math.round(x * scale_x + xD), Math.round(-func(x) * scale_y + yD));
                }else{
                    ctx.lineTo(Math.round(x * scale_x + xD), Math.round(-func(x) * scale_y + yD));
                }
            });
            ctx.stroke();
        }

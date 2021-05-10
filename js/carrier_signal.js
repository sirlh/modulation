
    ////////////////////////////////////////////
    //
    //           载波信号的参数
    //
    ////////////////////////////////////////////

    //-------------- 信号默认值确定 ----------
    // 定义函数的三个参数 a f p 的初始值
    var a_carrier = 1 ;
    var f_carrier = 15 ;
    var p_carrier = 0 ;

    var x_carrier = document.getElementById('slider_x_carrier').value ;
    var y_carrier = document.getElementById('slider_y_carrier').value ;

    //定义采样率
    var fps_carrier = 500 * f_carrier;
    // 信号默认值 1：sin函数；  2：cos函数； 3：三角波; 4：锯齿波； 5：方波
    var func_carrier = 2;


    
    //-------------- 图形界面 ----------
    //获取输入信号画板元素
    const $carrier_Signal = document.getElementById('carrier_Signal')

   //获取输入信号画板的上下文
    const ctx_carrier = $carrier_Signal.getContext('2d')
    
    //生成一些列 x 的值, 
    const xs_carrier = new Array(50000).fill(1).map((x,i,arr) => ( i - Math.floor(arr.length / 2 )) /fps_carrier);
    console.log(xs_carrier);
    
    //生成 x 值对应的 y 的值，便于调试
    const ys_carrier = xs_carrier.map(x => signal_carrier(x));
    console.log(ys_carrier);

    // scale_in_x  scale_in_y 是 代表输入信号 x , y 轴的单位尺度 100 像素为 1 格
    var  scale_carrier_x =  scale_carrier_y = 100;
    
    // 定义画板的宽高 要与 canvas 标签中相同
    var width_carrier = 400, height_carrier = 300;
    
    //是否展示坐标, 默认打开
    var show_Num_carrier = 1; 
    
   
    //-------------- 画图  ----------

    draw(ctx_carrier, xs_carrier, scale_carrier_x,scale_carrier_y, signal_carrier, width_carrier, height_carrier, show_Num_carrier);


    //-------------- 交互页面 ----------
    function init_carrier(){
        draw(ctx_mo, xs_mo, scale_mo_x,scale_mo_y, signal_mo, width_mo, height_mo, show_Num_mo);
        draw(ctx_carrier, xs_carrier, scale_carrier_x,scale_carrier_y, signal_carrier, width_carrier, height_carrier, show_Num_carrier);
        draw(ctx_in, xs_in, scale_in_x,scale_in_y, signal_input, width_in, height_in, show_Num_in);
    }

    //移动幅值信号的响应
    function carrier_slider_change(){

        a_carrier = + (document.getElementById('slider_a_carrier').value || 1);
        f_carrier = + (document.getElementById('slider_f_carrier').value || 1);
        p_carrier = + (document.getElementById('slider_p_carrier').value || 0);

        x_carrier = + (document.getElementById('slider_x_carrier').value || 1);
        y_carrier = + (document.getElementById('slider_y_carrier').value || 1);


        document.getElementById('field_a_carrier').value = a_carrier;
        document.getElementById('field_f_carrier').value = f_carrier;
        document.getElementById('field_p_carrier').value = p_carrier;

        document.getElementById('field_x_carrier').value = x_carrier;
        document.getElementById('field_y_carrier').value = y_carrier;

        
        // 调节x 轴的尺度
        scale_carrier_x  = Math.max(1,x_carrier*100); //1代表最小尺度  

        // 调节y 轴的尺度
        scale_carrier_y  = Math.max(1,y_carrier*100); //1代表最小尺度
        
        init_carrier();
    }

    //输入幅值信号的响应
    function carrier_field_change(){
        //将新获取的值幅值给a，f，p
        a_carrier = + (document.getElementById('field_a_carrier').value || 1);
        f_carrier = + (document.getElementById('field_f_carrier').value || 1);
        p_carrier = + (document.getElementById('field_p_carrier').value || 0);

        

        x_carrier = + (document.getElementById('field_x_carrier').value || 1);
        y_carrier = + (document.getElementById('field_y_carrier').value || 1);

        // 调节x 轴的尺度
        scale_carrier_x  = Math.max(1,x_carrier*100); //1代表最小尺度  

        // 调节y 轴的尺度
        scale_carrier_y  = Math.max(1,y_carrier*100); //1代表最小尺度


        document.getElementById('slider_a_carrier').value = a_carrier;
        document.getElementById('slider_f_carrier').value = f_carrier;
        document.getElementById('slider_p_carrier').value = p_carrier;

        document.getElementById('slider_x_carrier').value = x_carrier;
        document.getElementById('slider_y_carrier').value = y_carrier;

        init_carrier();
    }


    // 函数类型选择框
    var sel_carrier = document.getElementById("myselect_carrier");
   
    sel_carrier.onchange = function () {
        var index = this.selectedIndex;
        func_carrier = this.value;
        init_carrier();
       }    
       

    //点击坐标的事件,show_Num = 1 显示
    function checkbox_carrier(){
        show_Num_carrier = !show_Num_carrier;
        init_carrier();
    } 

    ///////////////////////////////////////
    //
    //     根据 x 的值计算 信号 值
    //
    //////////////////////////////////////

    function signal_carrier(x){
        var signal_value = 0;
        if(func_carrier == 1) signal_value = sin(x,a_carrier,f_carrier,p_carrier);
        else if(func_carrier == 2) signal_value = cos(x,a_carrier,f_carrier,p_carrier);
        else if(func_carrier == 3) signal_value = Triangle(x,a_carrier,f_carrier,p_carrier);
        else if(func_carrier == 4) signal_value = Jagged(x,a_carrier,f_carrier,p_carrier);
        else if(func_carrier == 5) signal_value =  square(x,a_carrier,f_carrier,p_carrier);
        else signal_value = x * x;

        return signal_value;
    }

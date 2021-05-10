
    ////////////////////////////////////////////
    //
    //           输入信号的参数
    //
    ////////////////////////////////////////////

    //-------------- 信号默认值确定 ----------
    // 定义函数的三个参数 a f p 的初始值
    var a_in = 1 ;
    var f_in = 1 ;
    var p_in = 0 ;

    var x_in = document.getElementById('slider_x_in').value ;
    var y_in = document.getElementById('slider_y_in').value ;

    //定义采样率
    var fps =300*f_in;

    // 信号默认值 1：sin函数；  2：cos函数； 3：三角波; 4：锯齿波； 5：方波
    var func_in = 1;


    
    //-------------- 图形界面 ----------
    //获取输入信号画板元素
    const $inSignal = document.getElementById('inSignal')

   //获取输入信号画板的上下文
    const ctx_in = $inSignal.getContext('2d')
    
    //生成一些列 x 的值, 
    var xs_in = new Array(10000).fill(1).map((x,i,arr) => ( i - Math.floor(arr.length / 2 )) /fps);
    console.log(xs_in);
    
    //生成 x 值对应的 y 的值，便于调试
    const ys_in = xs_in.map(x => signal_input(x));
    console.log(ys_in);

    // scale_in_x  scale_in_y 是 代表输入信号 x , y 轴的单位尺度 100 像素为 1 格
    var  scale_in_x = scale_in_y = 100;
    
    // 定义画板的宽高 要与 canvas 标签中相同
    var width_in = 400, height_in = 300;
    
    //是否展示坐标, 默认打开
    var show_Num_in = 1; 
    //-------------- 交互页面 ----------


    function init_in(){
        draw(ctx_mo, xs_mo, scale_mo_x,scale_mo_y, signal_mo, width_mo, height_mo, show_Num_mo);
        draw(ctx_carrier, xs_carrier, scale_carrier_x,scale_carrier_y, signal_carrier, width_carrier, height_carrier, show_Num_carrier);
        draw(ctx_in, xs_in, scale_in_x,scale_in_y, signal_input, width_in, height_in, show_Num_in);
    }

    //移动幅值信号的响应
    function in_slider_change(){
        a_in = + (document.getElementById('slider_a_in').value || 1);
        f_in = + (document.getElementById('slider_f_in').value || 1);
        p_in = + (document.getElementById('slider_p_in').value || 0);

        x_in = + (document.getElementById('slider_x_in').value || 1);
        y_in = + (document.getElementById('slider_y_in').value || 1);


        document.getElementById('field_a_in').value = a_in;
        document.getElementById('field_f_in').value = f_in;
        document.getElementById('field_p_in').value = p_in;

        document.getElementById('field_x_in').value = x_in;
        document.getElementById('field_y_in').value = y_in;

        
        // 调节x 轴的尺度
        scale_in_x  = Math.max(1,x_in*100); //1代表最小尺度  

        // 调节y 轴的尺度
        scale_in_y  = Math.max(1,y_in*100); //1代表最小尺度

        init_in();

    }

    //输入幅值信号的响应
    function in_field_change(){
        //将新获取的值幅值给a，f，p
        a_in = + (document.getElementById('field_a_in').value || 1);
        f_in = + (document.getElementById('field_f_in').value || 1);
        p_in = + (document.getElementById('field_p_in').value || 0);


        x_in = + (document.getElementById('field_x_in').value || 1);
        y_in = + (document.getElementById('field_y_in').value || 1);

        // 调节x 轴的尺度
        scale_in_x  = Math.max(1,x_in*100); //1代表最小尺度  

        // 调节y 轴的尺度
        scale_in_y  = Math.max(1,y_in*100); //1代表最小尺度


        document.getElementById('slider_a_in').value = a_in;
        document.getElementById('slider_f_in').value = f_in;
        document.getElementById('slider_p_in').value = p_in;

        document.getElementById('slider_x_in').value = x_in;
        document.getElementById('slider_y_in').value = y_in;

        init_in();
    }
       
    // 函数类型选择框
     var sel = document.getElementById("myselect_in");
    //输入变化时
    sel.onchange = function () {
        var index = this.selectedIndex;
        func_in = this.value;
        init_in(); //调用点击事件
     }

    //点击坐标的事件,show_Num = 1 显示
     function checkbox_in(){
        show_Num_in = !show_Num_in;
        init_in();
    } 
    
    ///////////////////////////////////////
    //
    //     根据 x 的值计算 y 值的函数
    //
    //////////////////////////////////////

    function signal_input(x_value){
        var signal_value = 0;

        if(func_in == 1)      signal_value = sin(x_value,a_in,f_in,p_in);
        else if(func_in == 2) signal_value = cos(x_value,a_in,f_in,p_in);
        else if(func_in == 3) signal_value = Triangle(x_value,a_in,f_in,p_in);
        else if(func_in == 4) signal_value = Jagged(x_value,a_in,f_in,p_in);
        else if(func_in == 5) signal_value =  square(x_value,a_in,f_in,p_in);
        else signal_value = x_value * x_value;

        return signal_value;
    }

       
    //-------------- 画图  ----------

    draw(ctx_in, xs_in, scale_in_x,scale_in_y, signal_input, width_in, height_in, show_Num_in);
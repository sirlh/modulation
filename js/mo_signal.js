    //-------------- 信号默认值确定 ----------

    //定义调制方式
    // 1: AM  2:PM   0:为测试状态，图形展示是 y = x*x
    var myselect_mo = 1; 

    //定义采样率
    var fps_mo = 2000;
    
    //-------------- 图形界面 ----------
    //获取载波信号画板元素
    const $mo_Signal = document.getElementById('mo_Signal');

   //获取输入信号画板的上下文
    const ctx_mo = $mo_Signal.getContext('2d');
    
    //生成一些列 x 的值, 
    const xs_mo = new Array(50000).fill(1).map((x,i,arr) => ( i - Math.floor(arr.length / 2 )) /fps_mo);
    console.log(xs_mo);
    
    //生成 x 值对应的 y 的值，便于调试
    const ys_mo = xs_mo.map(x => signal_mo(x));
    console.log(ys_mo);
    
    // scale_in_x  scale_in_y 是 代表输入信号 x , y 轴的单位尺度 100 像素为 1 格
    var  scale_mo_x =  scale_mo_y = 50;
    
    // 定义画板的宽高 要与 canvas 标签中相同
    var width_mo = 400, height_mo = 300;
    
    //是否展示坐标, 默认打开
    var show_Num_mo = 1; 
    
   
    //-------------- 画图  ----------

    draw(ctx_mo, xs_mo, scale_mo_x,scale_mo_y, signal_mo, width_mo, height_mo, show_Num_mo);

    //-------------- 交互页面 ----------
    function init_mo(){
        draw(ctx_mo, xs_mo, scale_mo_x,scale_mo_y, signal_mo, width_mo, height_mo, show_Num_mo);
        draw(ctx_carrier, xs_carrier, scale_carrier_x,scale_carrier_y, signal_carrier, width_carrier, height_carrier, show_Num_carrier);
        draw(ctx_in, xs_in, scale_in_x,scale_in_y, signal_input, width_in, height_in, show_Num_in);
    }

    // 调制方式选择框
    var sel_carrier = document.getElementById("myselect_mo");
   
    sel_carrier.onchange = function () {
        var index = this.selectedIndex;
        myselect_mo = this.value;

        //AM 文字说明
        if(myselect_mo==1) {
            document.getElementById("am_doc").style.display= '';
            document.getElementById("fm_doc").style.display= 'none';
            document.getElementById("pm_doc").style.display= 'none' ;
        }
        
        //FM 文字说明
        if(myselect_mo==2) {
            document.getElementById("am_doc").style.display= 'none';
            document.getElementById("fm_doc").style.display= '';
            document.getElementById("pm_doc").style.display= 'none' ;
        }

        //PM 文字说明
        if(myselect_mo==3) {
            document.getElementById("am_doc").style.display= 'none';
            document.getElementById("fm_doc").style.display= 'none';
            document.getElementById("pm_doc").style.display= '';
        }

        init_mo();
       }    
       

    //移动幅值信号的响应
    function mo_slider_change(){

        x_mo = + (document.getElementById('slider_x_mo').value || 1);
        y_mo = + (document.getElementById('slider_y_mo').value || 1);

        document.getElementById('field_x_mo').value = x_mo;
        document.getElementById('field_y_mo').value = y_mo;

        // 调节x 轴的尺度
        scale_mo_x  = Math.max(1,x_mo*50); //1代表最小尺度  

        // 调节y 轴的尺度
        scale_mo_y  = Math.max(1,y_mo*50); //1代表最小尺度
        
        init_mo();
    }

    //输入幅值信号的响应
    function mo_field_change(){
        x_mo = + (document.getElementById('field_x_mo').value || 1);
        y_mo = + (document.getElementById('field_y_mo').value || 1);

        // 调节x 轴的尺度
        scale_mo_x  = Math.max(1,x_mo*100); //1代表最小尺度  

        // 调节y 轴的尺度
        scale_mo_y  = Math.max(1,y_mo*100); //1代表最小尺度


        document.getElementById('slider_x_mo').value = x_mo;
        document.getElementById('slider_y_mo').value = y_mo;

        init_mo();
    }


    //点击坐标的事件,show_Num = 1 显示
    function checkbox_mo(){
        show_Num_mo = !show_Num_mo;
        init_mo();
    } 


    ////////////////////////////////////////////
    //
    //           调制的相关参数
    //
    ////////////////////////////////////////////

    //  输入信号： inSignal 参数， 幅值a，频率f 相位p
    //  载波信号:  
    //         carrier_Signal 参数， 幅值a_carrier，频率f_carrier 相位p_carrier
    //         载波一般用余弦波          
    //
    // -------- AM信号的参数-------         
    //      
    //  AM = [(A0+m(t))] * cos(wc * t) 
    //     = A0*cos(wc * t) + m(t)*cos(wc * t)
    //  其中:
    //       t    =  x
    //       m(t) =  signal_input(x) 输入信号
    //       wc   =  f_carrier  载波频率
    //       A0 : 调制程度，默认值为1
    //          A0 = 输入信号幅值, 调制临界
    //          A0 > 输入信号幅值, 调制正常
    //          A0 < 输入信号幅值, 调制过载
    //       cos(wc * t): 载波，signal_carrier
    //
    // 
    // 
    // -------- PM信号的参数-------
    // 
    //  PM = A*cos[ wc*t + Kp*m(t) ]
    //  其中:
    //       t    =  x
    //       A    =  a_carrier  载波幅值
    //       m(t) =  signal_input(x) 输入信号
    //       wc   =  f_carrier  载波频率
    //       Kp : 默认值为100
    ///////////////////////////////////////////////////////    

    function signal_mo(x){
    
    // ------ 定义初始值 -------
        var signal_value = 0;
        var mt =  signal_input(x); //输入信号
    //  ---- 测试----
        if(myselect_mo == 0){
            signal_value =  x*x;
        }
 
    // ------ AM 调制 ----------
        var ct =  signal_carrier(x);
             A0 = 1;
        if(myselect_mo == 1){
            signal_value =  (A0+mt)*ct;
        }

    // ------ FM 调制 ----------

    // 单音调制,基带调制的信号通过用频率 fm 正弦的幅波信号来近似
    f_p = 25;
    f_pm = cos(x,25/f_in,f_in,0);
    if(myselect_mo == 2){
        if(func_carrier == 1) signal_value = sin(x,a_carrier,f_carrier,f_pm);
        else if(func_carrier == 2) signal_value = cos(x,a_carrier,f_carrier,f_pm);
        else if(func_carrier == 3) signal_value = Triangle(x,a_carrier,f_carrier,f_pm);
        else if(func_carrier == 4) signal_value = Jagged(x,a_carrier,f_carrier,f_pm);
        else if(func_carrier == 5) signal_value =  square(x,a_carrier,f_carrier,f_pm);
        else signal_value = x * x;
    }
    
    // ------ PM 调制 ----------
        Kp = 25;
        p_pm = Kp * mt;
        if(myselect_mo == 3){
            if(func_carrier == 1) signal_value = sin(x,a_carrier,f_carrier,p_pm);
            else if(func_carrier == 2) signal_value = cos(x,a_carrier,f_carrier,p_pm);
            else if(func_carrier == 3) signal_value = Triangle(x,a_carrier,f_carrier,p_pm);
            else if(func_carrier == 4) signal_value = Jagged(x,a_carrier,f_carrier,p_pm);
            else if(func_carrier == 5) signal_value =  square(x,a_carrier,f_carrier,p_pm);
            else signal_value = x * x;
        }
    return signal_value;
    }

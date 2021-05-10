
//----------- 波形信号 -----------
//
// a: 幅值 f：频率 p:相位  x：自变量
//
//--------------------------------

// 方波 
function square(x,a,f,p){
    var y;
    x = x+p;
    if(Math.abs(x % (1/f)) > 1/(2*f)){
        y = a;
    }else{
        y = -a;
    }
    if(x <0) y = -y; 

    return y;
}

// 锯齿波
function Jagged(x,a,f,p){
    var y;
    x = x+p;

    if(x>0)
        y = f*a*(x%(1/f));
    else
        y = f*a*(x%(1/f))+a;

    return y;
}

// 三角波
function Triangle(x,a,f,p){
    var y;
    x = x+p;

    if(x>0){
        if(Math.abs(x) % (1/f) < 1/(2*f)){
            y = 2*a*(x % (1/f))*f ;
        }else{
            y = -2*a*(x % (1/f))*f +2*a  ;
        }
    }
    else{
        if(Math.abs(x)% (1/f) < 1/(2*f)){
            y = -2*a*(x % (1/f))*f;
        }else{
            y = 2*a*(x % (1/f))*f +2*a 
        }
    }

    return y;
}

//正弦波
function sin(x,a,f,p){
    var y;
    y = a * Math.sin(2*Math.PI * f * x + p); 
    return y;
}

//余弦波
function cos(x,a,f,p){
    var y;
    y = a * Math.cos(2*Math.PI * f * x + p); 
    return y;
}

//心形
function heart(x){    
    x = x*8/5;
    y= 0.5*(Math.pow(Math.abs(x),2/3) + (0.9*Math.pow((3.3-x*x),1/2))*Math.sin(25000*Math.PI*x));
    return y;
}
    

//----------- 调制方法信号 -----------
//
// 
//
//--------------------------------

// ------- AM调制------
//
//  原信号： m(t)  
//  载波信号: 一般用余弦波
//          c = cos(wc * t);          
//
//  AM = [(A0+m(t))] * cos(wc * t) 
//     = A0*cos(wc * t) + m(t)*cos(wc * t)
//

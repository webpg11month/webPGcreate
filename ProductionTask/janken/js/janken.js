let result = 0;
//配列
let battledata = [];

// オブジェクトと変数の準備
let count_disp = document.getElementById("disp_count");
let win_rate = document.getElementById("win_rate");
let disp_text = document.getElementById("disp_text");
let imgoji = document.getElementById("imgoji");
let imgnone = document.getElementById("imgnone");
let message = document.getElementById("message");
let link = document.getElementById("link");
let jkresult = document.getElementById("jkresult");
let count_up_btn = document.getElementsByClassName("btn");
let jkresult_data = document.getElementById("jkresult_data");

//初期値設定
let count_value = 0;
let flag = 0;
let cpu = 0;
let you = 0;
let draw = 0;

//データを格納する
function battleData($data){
    console.log($data);
    battledata.push($data);
    console.log(battledata);
    let stockList = '';
    for(let i=0;i<battledata.length;i++){
        stockList += "<h3>"+battledata[i]+"<h3>";
    }
    document.getElementById('jkresult_data').innerHTML=stockList;
}
$(function(){

    count_disp.innerHTML = '開始やで';
    imgnone.innerHTML = '';
    let btnstart = document.getElementsByClassName("btnstart");


    //取りまボタン制御
    btnstart[0].disabled = false;
    count_up_btn[0].disabled = true;
    count_up_btn[1].disabled = true;
    count_up_btn[2].disabled = true;
    $('.btnstart').on('click', function(){
        btnstart[0].disabled = true;
        count_up_btn[0].style.background = "";
        count_up_btn[1].style.background = "";
        count_up_btn[2].style.background = "";
        count_up_btn[0].disabled = false;
        count_up_btn[1].disabled = false;
        count_up_btn[2].disabled = false;
    });
    $('.btn').on('click', function(){
        btnstart[0].disabled = false;
    });

    $('.btn1').on('click', function(){
        btnstart[0].disabled = false;
        count_up_btn[0].disabled = true;
        count_up_btn[0].style.background = "gray";
        count_up_btn[1].disabled = true;
        count_up_btn[2].disabled = true;
    });
    $('.btn2').on('click', function(){
        btnstart[0].disabled = false;
        count_up_btn[0].disabled = true;
        count_up_btn[1].disabled = true;
        count_up_btn[1].style.background = "gray";
        count_up_btn[2].disabled = true;
    });
    $('.btn3').on('click', function(){
        btnstart[0].disabled = false;
        count_up_btn[0].disabled = true;
        count_up_btn[1].disabled = true;
        count_up_btn[2].disabled = true;
        count_up_btn[2].style.background = "gray";
    });

    $('.btnstart').on('click', function(){
        let count = setInterval(changeImg, 70);//ミリ秒数
        //getRandomInt()//でもいけるが。。。。余裕でばれる（笑）後は時間にずれがある。settimeoutを使うも....
        i = 1;
        function changeImg(){
            $("#idImgchng").children("img").attr("src","img/"+"i" + i + ".png");
            if(i <= 2){  //3枚の画像を切替
                i++;
            }else{
                i = 1;
            }
        }
        //画像の0,1,2の配列で画像取得する
        for(let cnt = 0;cnt < 3;cnt++){
            count_up_btn[cnt].onclick = function (){
                imgoji.innerHTML='';
                count_value += 1;
                count_disp.innerHTML = count_value;
                disp_text.innerHTML = '戦目';
                let click =  $(this).data('id');
                if(count_value < 6){
                //相手の手
                    if(click === 2){
                        if(i === 1){
                            message.innerHTML="";
                            message.innerHTML="CPUはパーやであんたの負けや（笑）";
                            imgoji.innerHTML="<img src ='img/looser.png'>";
                            flag += 0;
                            cpu += 1;
                            clearTimeout(count);
                        }else if(i === 2){
                            imgoji.innerHTML='';
                            message.innerHTML="CPUはグーやで引きわけや";
                            flag += 1;
                            draw += 1;
                            clearTimeout(count);
                        }else {
                            imgoji.innerHTML='';
                            message.innerHTML="CPUはチョキやであんたの勝ちや";
                            flag += 2;
                            you += 1;
                            clearTimeout(count);
                        }
                        clearTimeout(count);
                    }
                    if(click === 3){
                        if(i === 3){
                            imgoji.innerHTML='';
                            message.innerHTML="CPUはチョキで引き分けやで";
                            flag += 1;
                            draw += 1;
                            clearTimeout(count);
                        }else if(i === 2){
                            imgoji.innerHTML='';
                            imgoji.innerHTML="<img src ='img/looser.png'>";
                            message.innerHTML="CPUはグーやであんたの負けや（笑）";
                            flag += 0;
                            cpu += 1;
                            clearTimeout(count);
                        }else {
                            imgoji.innerHTML='';
                            message.innerHTML="CPUはパーやであんたの勝ちや";
                            flag += 2;
                            you += 1;
                            clearTimeout(count);
                        }
                      clearTimeout(count);
                    }
                    if(click === 1){
                        if(i === 1){
                            imgoji.innerHTML='';
                            message.innerHTML="CPUはパーやで引き分けやで";
                            flag += 1;
                            draw += 1;
                            clearTimeout(count);
                        }else if(i === 2){
                            imgoji.innerHTML='';
                            message.innerHTML="CPUはグーやであんたの勝ちやで";
                            flag += 2;
                            you += 1;
                            clearTimeout(count);
                        }else {
                            imgoji.innerHTML='';
                            imgoji.innerHTML="<img src ='img/looser.png'>";
                            message.innerHTML="CPUはチョキやであんたの負けや（笑）";
                            cpu += 1;
                            flag += 0;
                            clearTimeout(count);
                        }
                      clearTimeout(count);
                    }

                    battleData(message.innerHTML);
                    // console.log(battledata.push[message.innerHTML]);
                    if(count_value === 5){
                        console.log(flag);
                        console.log('負け : ' + cpu);
                        console.log('勝ち : ' + you);
                        console.log('引き分け : ' + draw);
                        jkresult.innerHTML = '負け : ' + cpu + ' 勝ち : ' + you + ' 引き分け : ' + draw;
                        if( 0 <= flag && flag <= 3){
                          win_rate.innerHTML = '負けすぎやな';
                        }else if(4 <= flag && flag <= 6){
                          win_rate.innerHTML = 'ボチボチやな';
                        }else if(7 <= flag && flag <= 9){
                          win_rate.innerHTML = 'やるやん';
                        }
                        let btnstart = document.getElementsByClassName("btnstart");
                        count_disp.innerHTML = '終わりやでーまた遊びに来てやー';
                        disp_text.innerHTML = '';
                        count_value = 0;
                        clearTimeout(count);
                        console.log(click);
                        if(click === 1 || click === 2 || click === 3){
                            console.log('test1');
                            count_up_btn[0].disabled = true;
                            count_up_btn[1].disabled = true;
                            count_up_btn[2].disabled = true;
                            btnstart[0].disabled = true;
                        }
                        link.innerHTML="<a href='janken.html'>まだあそんじゃう</a>";
                    }
                }
            }
        }
    });
});

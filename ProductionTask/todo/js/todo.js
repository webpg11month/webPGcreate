//vueの記述方法 cdnにて取得
var app = new Vue({
    //id=appの内部オブジェクトに処理を記述する
    el: '#app',
    //データ空配列
    data: {
        todoLists: [
      ],
    //初期値なし
      newTitleToggle: false,
      newTitle: "",
    },
    //関数宣言
    methods: {
        //関数を取得して処理を記述する（jsコード）
        checkEnteredValue(){
          //もし、タイトルからでない場合trueをぶち込む
          if(this.newTitle !== ""){
            this.newTitleToggle = true;
        }else{
          //それ以外は、false
            this.newTitleToggle = false;
        }
      },
      //追加処理
      addToDoList(){
        //値をtodoListsにぶち込む
      this.todoLists.push({
        //バインドで取得してぶち込む
        title: this.newTitle,
        checkToggle: false
      });
      //falseは、なんもなし
      this.newTitleToggle = false;
      this.newTitle = '';
      },
      //削除処理
      deleteToDoList(){
          //複数のtodoでチェックされた値を削除する(check===false)
          this.todoLists = this.todoLists.filter(function(list) {
          return list.checkToggle === false; 
        });
      }
    }
  })
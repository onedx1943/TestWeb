let Test = (function () {
    let _init = function () {
        console.log('START!!!')
        let db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
        let msg;

        db.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS LOGS (id unique, log)');
            tx.executeSql('INSERT INTO LOGS (id, log) VALUES (6, "菜鸟教程1")');
            tx.executeSql('INSERT INTO LOGS (id, log) VALUES (7, "www.runoob.com")');
            tx.executeSql('INSERT INTO LOGS (id, log) VALUES (8, "233")');
            msg = '<p>数据表已创建，且插入了两条数据。</p>';
            $('#msg').html(msg);
        });

        db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM LOGS', [], function (tx, results) {
             let len = results.rows.length, i;
            msg = "<p>查询记录条数: " + len + "</p>";
            $('#msg').html($('#msg').html() + msg);

            for (i = 0; i < len; i++){
                msg = "<p><b>" + results.rows.item(i).log + "</b></p>";
                $('#msg').html($('#msg').html() + msg);
            }
        }, null);
        });
    };

    return {
        init: _init,
    }
})();

Test.init();

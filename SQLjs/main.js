//导入fs | SQL.js模块
import fs from 'fs';
import initSqlJs from 'sql.js';

//加载二进制文件
const SQL = await initSqlJs({locateFile:() => './node_modules/sql.js/dist/sql-wasm.wasm'});

//创建一个数据库
const db = new SQL.Database();

let sqlstr = "CREATE TABLE hello (a int, b char); \
INSERT INTO hello VALUES (0, 'hello'); \
INSERT INTO hello VALUES (1, 'world');";

db.run(sqlstr);

const stmt = db.prepare("SELECT * FROM hello WHERE a=:aval AND b=:bval");

//console.log(stmt);

const result = stmt.getAsObject({':aval' : 1, ':bval' : 'world'});

console.log(result); // Will print {a:1, b:'world'}
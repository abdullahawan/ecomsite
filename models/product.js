var mysql = require('mysql'); 

//setting up connection and end functions
//this database connection is 'root'...
//has access to all databases on RDS
function getConnection() {
    return mysql.createPool({
        host: 'ecomsite-rds.clpcnl2zsquk.us-east-1.rds.amazonaws.com',
        user: 'ecomsiteabdullah',
        password: 'setsuna00',
    });
}

function connectionEnd() {
    connection.end(); 
}

//setting up connection variable
var connection = getConnection(); 

//statement to create table
var stmt = `create table if not exists ecomsite.products(
    id int primary key auto_increment,
    title varchar(255) not null, 
    description text not null,
    imagePath longtext not null,
    price int not null)`;

//query statement to check if 'products' table is created
connection.query(stmt, (err, results, fields) => {
    if (err) {
        console.log('connection failed...'); 
        console.log(err.message); 
    } else {
        console.log('table created successfully, or is already created'); 
        connectionEnd(); 
    }
})


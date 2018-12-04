var mysql = require('mysql'); 

//setting up connection and end functions
//this database connection is 'root'...
//has access to all databases on RDS
function getConnection() {
    return mysql.createConnection({
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

var productObject = [
    {
        imagePath: 'https://media.wired.com/photos/5a99f809b4bf6c3e4d405abc/2:1/w_2500,c_limit/PS4-Pro-SOURCE-Sony.jpg',
        title: 'PS4 - Super Expensive Edition',
        descrption: 'The limited edition, super expensive PS4!!', 
        price: 400
    }, 
    {
        imagePath: 'https://media.wired.com/photos/5a99f809b4bf6c3e4d405abc/2:1/w_2500,c_limit/PS4-Pro-SOURCE-Sony.jpg',
        title: 'PS4 - Cheaper Edition',
        descrption: 'The common edition, cheaper PS4!!', 
        price: 300
    }, 
    {
        imagePath: 'https://media.wired.com/photos/5a99f809b4bf6c3e4d405abc/2:1/w_2500,c_limit/PS4-Pro-SOURCE-Sony.jpg',
        title: 'PS4 - Cheapest Edition',
        descrption: 'The super cheap PS4!!', 
        price: 200
    }
]

var done = 0;

for (var i = 0; i < productObject.length; i++) {
    var productObjectQuery = productObject[i];
    var query = `insert into ecomsite.products(
        title, description, imagePath, price) values(?, ?, ?, ?)`;

    connection.query(query, [productObjectQuery.title, productObjectQuery.descrption, productObjectQuery.imagePath, productObjectQuery.price], 
        (err, results, fields) => {
        if (err) {
            console.log('failed to insert product into database'); 
            console.log(err.message); 
        } else {
            done++; 
            console.log('successfully inserted into database');
            console.log(JSON.stringify(results));
            if (done === productObject.length) {
                connectionEnd(); 
            }
        }
    })
}
const { exit } = require('process');
const {Node,BST} = require('./BST.js');
const read_sync = require('readline-sync');

let tree = new BST();

console.log("\n Welcome to Banking Application!!! \n Please choose the type of service: \n");
let key;
do{console.log('1. Create account \n2. Delete Account \n3. Amount Transfer '+ 
    '\n4. Check Balance \n5. view History  \n6. Exit \n');
 key = read_sync.question("Enter your choice:");
 switch (key) {
     case '1': //Create account
         createAcount();
         break;
     case '2': //Delete Account
         deleteAccount();
         break;
     case '3': //Amount Transfer
         createTransaction();
         break;
     case '4': //Check Balance
         checkBalance();
         break;
     case '5': //Exit
         viewHistory();
         break;
     case '6': //Exit
         exit(0);
 
     default:
         console.log("Please choose the correct option between 1 and 6 !!!");
         break;
     }
}while(key<7);

function createAcount(){
    do{
        Account_no = parseInt(read_sync.question('Enter the account number : '));
        balance = parseInt(read_sync.question('Enter the amount to deposit(minimum balance: Rs.2500): '));
    }while(balance<2500);
    tree.root = tree.insert(tree.root,new Node(Account_no,balance));
}

function deleteAccount(){
    Account_no = parseInt(read_sync.question('Enter the account number : '));
     tree.root = tree.delete(tree.root,Account_no);
}

function createTransaction(){
    sender = parseInt(read_sync.question('Enter your account number : '));
    receiver = parseInt(read_sync.question('Enter the receiver\'s account number : '));
    amount = parseInt(read_sync.question('Enter the amount to deposit: '));
    tree.root = tree.makeTransaction(tree.root,sender,receiver,amount);
}


function checkBalance(){
    Account_no = parseInt(read_sync.question('Enter the account number : '));
    User = tree.search(tree.root,Account_no);
    if(User != false){
        console.log("Your Balance is: Rs."+User.balance);
    }
}

function viewHistory(){
    sender = parseInt(read_sync.question('Enter your account number : '));
    tree.viewTransactions(tree.root,sender);
}
    
class Node{
    constructor(account_no,balance){
        this.account_no = account_no;
        this.balance = balance;
        this.left = null;
        this.right = null;
        this.transactions = null
    }
}
class Transaction{
    constructor(action){
        this.action = action;
        this.next = null;
    }
    linkedListInsert(head,transaction){
        if(head == null){
            head = transaction;
            return head;
        }
        else{
            temp = head;
            while( temp.next != null){
                temp = temp.next;
            }
            temp.next = transaction;
            return head;
        }
    }
    displayStatement(transaction){
        while(transaction != null){
            console.log(transaction.action);
            transaction = transaction.next;
        } 
    }
}
class BST{
   constructor(){
    this.root = null;
   }
   /////////////////////////////////////////////////////////////////////////////////////

   insert(rootNode,newNode){
            if(rootNode === null){
                    ///creating root node
                    if(this.root === null){ 
                        this.root = newNode;
                        console.log("Account for "+newNode.account_no+" created Successfully!!!");
                        return this.root;
                    }
                    else{  // creating a new leaf node
                        rootNode = newNode;
                        console.log("Account for "+newNode.account_no+" created Successfully!!!");
                        return rootNode;
                    };    
            }
            // checking if the account already exists
            else if (newNode.account_no==rootNode.account_no){
                    console.log("Account no "+newNode.account_no+" already exists !!!");
                    return null;
            } 
            // traversing the tree to insert a new node to the left sub tree   
            else if(newNode.account_no<rootNode.account_no)
                rootNode.left = this.insert(rootNode.left,newNode);

            // traversing the tree to insert a new node to the right sub tree
            else 
                rootNode.right = this.insert(rootNode.right,newNode);
            return rootNode;
        }

   //////////////////////////////////////////////////////////////////////////////////////////

   search(rootNode,account_no){
        if(rootNode == null){ // when the account is not found
            console.log("Account Number "+account_no+" does not exists. Please check the account number!!!");
            return false;
        }
        // when the account is found
        else if(this.root.account_no == account_no || rootNode.account_no == account_no){
            return ((this.root.account_no == account_no)?this.root:rootNode);
        }
        else if(account_no<rootNode.account_no){  // traversing the left sub tree for the acoount
        return (this.search(rootNode.left,account_no));
        }
        else{ // traversing the right sub tree for the acoount
            return (this.search(rootNode.right,account_no));
        }
    }

   ////////////////////////////////////////////////////////////////////////////////////////

   update(rootNode,account_no,balance,transaction){
        if(rootNode == null){  //when the account is not found
            console.log("Account Number "+account_no+" not present!!!");
            return false;
        }
        // when the account is found
        else if(this.root.account_no == account_no || rootNode.account_no == account_no){
             if(this.root.account_no == account_no){  //for rootNode
                this.root.balance=balance;
                this.root.transactions = transaction;
                return this.root;
            }
            else{
                rootNode.balance = balance;
                rootNode.transactions = transaction;
                return rootNode;
            }     
        }
        // traversing the left sub tree for the acoount
        else if(account_no<rootNode.account_no){
            rootNode.left = this.search(rootNode.left,account_no);
            return rootNode;
        }
        else{  // traversing the right sub tree for the acoount
            rootNode.right = this.search(rootNode.right,account_no);
            return rootNode;
        }
    }

   ////////////////////////////////////////////////////////////////////////////////////////
   
   delete(rootNode,account_no){
        if(rootNode == null){
            console.log("Please check the account number!!!");
            return null;
        }
        if(account_no<rootNode.account_no)    
            rootNode.left = this.delete(rootNode.left,account_no);
        else if(account_no>rootNode.account_no)
            rootNode.right = this.delete(rootNode.right,account_no);
        else if(account_no == rootNode.account_no){
            if(rootNode.left==null && rootNode.right==null ){
                console.log("Account number "+account_no+" deleted successfully!!!");
                return null; 
            }
            else if(rootNode.left===null || rootNode.right===null){
                ///for deleting leaf nodes and subtrees with a child(left or right)
                let temp = ((rootNode.left === null)?rootNode.right : rootNode.left);
                console.log("Account number "+account_no+" deleted successfully!!!");
                return temp;
            }
            else{
                // for subtree with two children
                let Successor = this.getSuccessor((rootNode.right.left==null?rootNode:rootNode.right));// finding the substitute node
                //Successor.left = rootNode.left;
                //Successor.right = this.delete(rootNode.right,Successor.data);
                let leftchild = rootNode.left;
                let rightchild = rootNode.right;
                rootNode = Successor; // updating the fields of the successor
                rootNode.left = leftchild; // updating the subtrees of the new node
                rootNode.right = rightchild;
                console.log("Account number "+account_no+" deleted successfully!!!");
                return temp;
            }
        }
        else{
            console.log("Please check the account number!!!");
            return;
        }
        return temp;
        }
    getSuccessor(rootNode){
        while(rootNode.left.left !== null){ // more than one subtree.
            rootNode = rootNode.left; 
        }
        let temp = rootNode.left
        rootNode.left = null; // updating the successor's pointers 
        return temp; // returning the successor
    }
    makeTransaction(rootNode,sender,receiver,amount){
        let senderNode = this.search(rootNode,sender);
        let receiverNode = this.search(rootNode,receiver);
        if((senderNode == false && receiverNode == false)){
            console.log("Please check the account number!!!");
            return rootNode;
        }
        else if(senderNode.balance-amount<2500){
            console.log("Transaction failed due to insufficient balance!!!");
        }
        else{
            let date = (new Date()).toString();
            let senderHistory = new Transaction("Amount of Rs. "+amount+" debited to the account no. "+receiver+" on "+ date);
            senderNode.transactions = senderHistory.linkedListInsert(senderNode.transactions,senderHistory);
            let receiverHistory = new Transaction("Amount of Rs."+amount+" credited from the account no. "+receiver+" on "+ date);
            receiverNode.transactions = receiverHistory.linkedListInsert(receiverNode.transactions,receiverHistory);
            rootNode = this.update(rootNode,sender,senderNode.balance -= amount,senderNode.transactions);//
            rootNode = this.update(rootNode,receiver,receiverNode.balance += amount,receiverNode.transactions);//
            console.log("Transaction successful!!!");
            return rootNode;
        }
    }
    viewTransactions(rootNode,sender){
        let sender_acc = this.search(rootNode,sender);
        if(sender_acc != false){
            sender_acc.transactions.displayStatement(sender_acc.transactions);
        }
    }
}
module.exports = {Node,BST};

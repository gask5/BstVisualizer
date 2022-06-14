class BST{
      radice;
      constructor(){ this.radice = null;}

      insert(value){
            if(this._search(this.radice,value)) return null;
            var tmp = new NodeBST(value);
            var ptr = this.radice;
            var padre = ptr;

            if(this.radice == null ){
                  this.radice = tmp;
                  this.radice.setX(900);
                  this.radice.setY(100);
                  return tmp;
            }
            while(ptr != null){
                  if(ptr.getValue()==value) return;
                  padre = ptr;
                  if(value>= ptr.getValue()) {
                        ptr = ptr.getRight();
                  }
                  else ptr = ptr.getLeft();            
            }
            tmp.setParent(padre);
            if(value>=padre.getValue()){
                  tmp.setX(tmp.getParent().getX()+tmp.size);
                  padre.setRight(tmp);
            }
            else{
                  tmp.setX(tmp.getParent().getX()-tmp.size);
                  padre.setLeft(tmp);
            }
            
            
            tmp.setY(tmp.getParent().getY()+tmp.size);
            tmp.setDepth(tmp.getParent().getDepth()+1);
            return tmp;
      }

      _search(node,key){
            if(!node) return false;
            if(node.getValue()==key) return true;

            if(key > node.getValue()) this._search(node.getRight(),key);
            else  this._search(node.getLeft(),key);
      }

      search(key){
            this._search(this.radice,key);
      }

      // print() {
      //       print(this.radice);
      // }

      preOrder(node = this.radice){
            if(node==null) return;
            console.log(node.getValue()+ " ");
            this.preOrder(node.getRight());
            this.preOrder(node.getLeft()); 
      }
};
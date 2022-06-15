var targetNode;

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
            if(!node) return null;
            if(node.getValue()==key){
                  console.log("Found node");
                  targetNode = node;
                  return true;
            } 

            if(key > node.getValue()) this._search(node.getRight(),key);
            else  this._search(node.getLeft(),key);
      }

      search(key){
            this._search(this.radice,key);
      }

      succ(node){
            if(node.getRight()) return this.minimo(node.getRight());
            
            let p = node.getParent() ;
            while(p && node.getValue() > p.getValue()){
                p = p.getParent();
            }

            return p;
        }

      minimo(node){
            if(node.getLeft()) return this.minimo(node.getLeft());
            return node;
      }

      canc(key){
            this._search(this.radice,key);
            var tmp = targetNode;
            console.log(tmp.getValue());
            if(tmp) this._canc(tmp,key);
            return this;
      }

      _canc(node, key){
            // if(!node) return; <- controllo non necessario;
            console.log("HGLLO");
            if(node.getLeft()&&node.getRight()){
                let successore = this.succ(node);
                document.getElementById(parseInt(node.getValue())).innerHTML = successore.getValue();
                document.getElementById(successore.getValue()).id = -1;
                document.getElementById(node.getValue()).id = successore.getValue();
                node.setValue( successore.getValue() );
                console.log("BOTH" + successore.getValue());
                
               

                this._canc( successore, successore.getValue() );
            }

            else{
                
                let child = node.getRight();
                if(!child) child = node.getLeft();

                let padre = node.getParent();

                if(child) child.setParent(padre);

                if(!padre) {
                    this.radice = child;
                    return;
                }

               

                if(node.getValue() >= padre.getValue()){
                  padre.setRight(child);
                } 
                else {
                  padre.setLeft(child);
                }
                if(child) child.setY(child.getY()-child.size);
                document.getElementById(node.getValue()).id = -1;

               
                return;
                
            }
        }
      // print() {
      //       print(this.radice);
      // }
      
      preOrder(node = this.radice){
            if(node==null) return;
            console.log(node.getValue()+ " ");
       
            this.preOrder(node.getLeft()); 
            this.preOrder(node.getRight());   
      }
      
};

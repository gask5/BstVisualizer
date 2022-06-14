class NodeBST {
      value;
      color;
      parent; right; left;
      x; y;
      size = 20;
      depth= 0;
    
      constructor(_value) {
        this.value=_value;
        this.color = "hsl(" + _value + ", 100%, 90%)"
        this.parent = this.right = this.left = null;
      }
      
      getDepth(){
        return this.depth;
      }

      getColor(){
        return this.color;
      }

      setDepth(value){
        this.depth = value;
      }
      getValue() {
        if (this.value==null) return 0 ;
        return this.value;
      }
      getParent() {
        return this.parent;
      }
      getRight() {
        return this.right;
      }
      getLeft() {
        return this.left;
      }
    
      minimo(n) {
        if (n.getLeft()==null) return n;
        else return this.minimo(n.getLeft());
      }
    
      massimo(n) {
        if (n.getRight()==null) return n;
        else return this.massimo(n.getRight());
      }
    
      getX() {
        return this.x;
      }
      getY() {
        return this.y;
      }
    
      setValue(_value) {
        this.value = _value;
      }
      setParent(_parent) {
        this.parent = _parent;
      }
      setRight(_right) {
        this.right = _right;
      }
      setLeft(_left) {
        this.left = _left;
      }        
      setX(_x) {
        this.x = _x;
      }
      setY(_y) {
        this.y = _y;
      }
}
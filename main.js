var tree = new BST();
var slider = document.getElementById("canvasOffset");
var result = new Array();
const output = document.getElementById("output");




function deleteItem(value){
      tree.canc(value);
      
      let toDelete = document.getElementById(-1);
      while(toDelete != null){
            canvas.removeChild(toDelete);
            toDelete = document.getElementById(-1);
      }
     

      fixTree(tree.radice)
}

function insertItem(value){
      let newItem = value;
      var tempNode = tree.insert(newItem);
      if(!tempNode) return;
      //console.log(tempNode.getDepth());
      var div = document.createElement("div");
      var node = document.createElement("div");
      div.setAttribute('class', 'depth');
      div.setAttribute('id', newItem);
      node.innerHTML = String(newItem);
      node.setAttribute('id', newItem);
      node.setAttribute('order', newItem);
      //node.setAttribute('class', 'branch');
      



      document.getElementById("canvas").appendChild(node);
      //var main = document.getElementById("canvas");
      if(tempNode.getParent())
            var parentValue = tempNode.getParent().getValue();
      else node.setAttribute('class', 'radix');
      if (parentValue != null ){
            if(newItem < parentValue) node.setAttribute('class', 'left');
            else node.setAttribute('class', 'right');
      }
      
      if(tempNode.getParent()){
            let parentBackgroundColor = tempNode.getParent().getColor();
            document.getElementById(newItem).style.setProperty('--parent', parentBackgroundColor);
      }
      var ptr = tree.radice;

      var myInterval = setInterval(function () {
            if(ptr==null) clearInterval(myInterval);
            else{
                  document.getElementById(ptr.getValue()).style.backgroundColor = "hsl(" + ptr.getValue() + ", 100%, 90%)";
                  if(newItem>= ptr.getValue()) {
                        if(newItem!=ptr.getValue()) output.innerHTML = newItem + " > " + ptr.getValue();
                        ptr = ptr.getRight();
                  }
                  else{
                        if(newItem!=ptr.getValue())output.innerHTML = newItem + " < " + ptr.getValue();
                        ptr = ptr.getLeft(); 
                  }   
                  if(ptr!=null)document.getElementById(ptr.getValue()).style.backgroundColor = "hsl(0, 100%, 60%)";
            }
      }, 500);
      document.getElementById(newItem).style.animationDelay = tempNode.getDepth()/2 + "s";
      document.getElementById(newItem).style.marginLeft = tempNode.getX()+"px";
      document.getElementById(newItem).style.marginTop = tempNode.getY()+"px";
      document.getElementById(newItem).style.backgroundColor = tempNode.getColor();
      
      fixTree(tree.radice)
}

window.onload = function() {
      var canvas = document.getElementById(canvas);
}

async function preOrderTraversal(){
      disableButtons();
      await preOrder(tree.radice);
      //console.log(result);
      output.innerHTML = "PREORDER TRAVERSAL: ";
      printResult();
}

function disableButtons(){
      document.querySelector('#preOrderButton').disabled = true;
      document.querySelector('#inOrderButton').disabled = true;
      document.querySelector('#postOrderButton').disabled = true;
      document.querySelector('#randomValueButton').disabled = true;
      document.querySelector('#singleValueButton').disabled = true;

}

function enableButtons(){
      document.querySelector('#preOrderButton').disabled = false;
      document.querySelector('#inOrderButton').disabled = false;
      document.querySelector('#postOrderButton').disabled = false;
      document.querySelector('#randomValueButton').disabled = false;
      document.querySelector('#singleValueButton').disabled = false;

}

async function inOrderTraversal(){
      disableButtons();
      await inOrder(tree.radice);
      //console.log(result);
      output.innerHTML = "INORDER TRAVERSAL: ";
      printResult();
}

async function postOrderTraversal(){
      disableButtons();
      await postOrder(tree.radice);
      //console.log(result);
      output.innerHTML = "POSTORDER TRAVERSAL: ";
      printResult();
}

function printResult(){
      let tmpResult = result;
      result = [];
      for(let r in tmpResult){
            setTimeout(() => {
                  document.getElementById(tmpResult[r]).style.backgroundColor = "hsl(0, 100%, 60%)";
                  output.innerHTML = output.innerHTML + " " + tmpResult[r];
            }, r*1000);
      }
      setTimeout(() => { for(let r in tmpResult){
            document.getElementById(tmpResult[r]).style.backgroundColor ="hsl(" + tmpResult[r] + ", 100%, 90%)";
            enableButtons();
      } }, tmpResult.length*1000);
}



  

function moveRight(){
      let oldPosition = canvas.style.marginLeft;
      oldPosition = parseInt(oldPosition.substring(0, oldPosition.length -2));
      canvas.style.marginLeft = oldPosition + 50 + "px";
}

function moveLeft(){
      let oldPosition = canvas.style.marginLeft;
      oldPosition = parseInt(oldPosition.substring(0, oldPosition.length -2));
      canvas.style.marginLeft = oldPosition - 50 + "px";
}

function addValue(){
      let valueToInsert = document.getElementById("inputValue").value;
      if(valueToInsert <1000 && valueToInsert>0) insertItem(parseInt(valueToInsert));
}

function deleteValue(){
      let valueToInsert = document.getElementById("inputValue").value;
      if(valueToInsert <1000 && valueToInsert>0) deleteItem(parseInt(valueToInsert));
}

function addRandomValue(){
      insertItem(Math.floor(Math.random() * 1000));
}

slider.oninput = function() {
      canvas.style.marginLeft = this.value + "px";
}



function fix(node){
      let parent = node.getParent();
      if(parent == null) return;
      let min = node.minimo(node);
      //console.log(document.getElementById(tmp.getValue()).style.marginLeft);

      let minPosition = document.getElementById(min.getValue()).style.marginLeft;
      minPosition = parseInt(minPosition.substring(0, minPosition.length -2));

      let nodePosition = document.getElementById(node.getValue()).style.marginLeft;
      nodePosition = parseInt(nodePosition.substring(0, nodePosition.length -2));

      let parentPosition = document.getElementById(parent.getValue()).style.marginLeft;
      parentPosition = parseInt(parentPosition.substring(0, parentPosition.length -2));
      // console.log(minPosition + " - " + node.size + "<" + parentPosition);
      // console.log(min.getValue() + " " + parent.getValue())

      if (minPosition - node.size < parentPosition && nodePosition >= parentPosition){
            fixSons(node,node.size);
      }

      let max = node.massimo(node);

      let maxPosition = document.getElementById(max.getValue()).style.marginLeft;
      maxPosition = parseInt(maxPosition.substring(0, maxPosition.length -2));

      //console.log(max.getValue() + " " + parent.getValue())

      if (maxPosition + node.size > parentPosition && nodePosition <= parentPosition){
            fixSons(node,-node.size);
      }

      //connect(document.getElementById(node.getValue()),document.getElementById(node.getParent().getValue()), "#000" , 1);

}

function fixSons(n , delta){
      if (n==null) return;
      // let position = document.getElementById(n.getValue()).style.marginLeft;
      // position = parseInt(position.substring(0, position.length -2));

      // //console.log("Adjusting x from " + position + " to " + (position + delta) + "px")
      n.setX(n.getX()+delta);
      document.getElementById(n.getValue()).style.marginLeft = (n.getX() + "px");
      document.getElementById(n.getValue()).style.marginTop = (n.getY() + "px");


      let tempo =  n.getX() - n.getParent().getX() ;
      document.getElementById(n.getValue()).style.setProperty('--parentDistance', tempo + "px");
      fixSons(n.left, delta);
      fixSons(n.right, delta);
      
}

function fixTree(node){
      if(node==null) return;
      fixTree(node.getRight());
      
      fixTree(node.getLeft()); 
      
      fix(node);
      
}


async function preOrder(node){
      if(node==null) return;
      result.push(node.getValue());
      await preOrder(node.getLeft());
      await preOrder(node.getRight()); 
}

async function inOrder(node){
      if(node==null) return;
      await inOrder(node.getLeft());
      result.push(node.getValue());
      await inOrder(node.getRight()); 
}

async function postOrder(node){
      if(node==null) return;
      await postOrder(node.getLeft());
      await postOrder(node.getRight()); 
      result.push(node.getValue());
}



  
const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");

let toDos = []; //이것때문에 현재 application이 시작될 때마다 toDos array가 비어버리는 현상이 발생하고 있다. 일단 상수를 변수로 바꾸어 바꿀 수 있는 형태로 만들어 준다.
const TODO_KEY = "todos";

function saveToDos()
{
    localStorage.setItem(TODO_KEY, JSON.stringify(toDos));
}

function handleTodoSubmit(event)
{
    event.preventDefault();
    const newToDo = toDoInput.value;
    toDoInput.value = "";
    const newToDoObj = 
    {
        id: Date.now(),
        text: newToDo
    }
    toDos.push(newToDoObj);
    painToDo(newToDoObj);
    saveToDos();
}

function deleteTodo(event)
{
    const li = event.target.parentElement;
    li.remove();
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
    saveToDos();
}

function painToDo(newToDoObj)
{
    const li = document.createElement("li");   
    const span = document.createElement("span");
    li.id = newToDoObj.id
    span.innerText = newToDoObj.text;
    const button = document.createElement("button");
    button.innerText = "❌";
    button.addEventListener("click",deleteTodo);
    li.appendChild(span);   
    li.appendChild(button);
    toDoList.appendChild(li); //append는 제일 마지막에 놓아야 한다!
}

toDoForm.addEventListener("submit",handleTodoSubmit);

const savedToDos = localStorage.getItem(TODO_KEY);
if(savedToDos !== null)
{
    const parsedToDos = JSON.parse(savedToDos);//JavaScript의 object나 array등을 string으로 변환시킬 수 있었다.
    toDos = parsedToDos;
    //JSON.parse를 통해 array로 처리되는 모습(그 전까지는 arry의 형태를 가진 string형식이였다.)
    //parsedToDos.forEach((item)=> console.log("this is the turn of " , item));//forEach는 arr의 각 item에 대해 function을 실행하게 해준다.
                                                                             //위의 것들은 function을 작성할 때 더 짧게 쓰는 방법이다.-> arrow function이라고 한다.(화살표 함수)
    parsedToDos.forEach(painToDo);//사실 이렇게 처리할 수 있다.왜 가능하냐면, painToDo는 텍스트를 받는데, JavaScript는 텍스트를 painToDo에게 전달해주는 역할을 하기 때문,
                                  //즉, ["a","b","c","d"]등을 각각의 한 요소마다 다 paintodo를 실행시켜주는 역할을 하게 된다. 실행시켜보면 각각의 array들의 요소들이 한줄 한줄 화면에 출력된다.
                                  //아직 문제가 하나 있는데, 요소들을 새로 저장하면 기존의 것들이 삭제되고, 새로운것이 대체하는 형식밖에 안된다. 새로 추가만 가능하게 하는 방법은 없을까?
    //toDos = parsedToDos;//이렇게 원래 있던 toDos의 기억을 복원하는 형식으로 기존의 내용을 까먹지 않게 할 수 있다.
}
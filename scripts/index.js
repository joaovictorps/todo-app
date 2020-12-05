const newTodo = () => {
    let darkTheme = '';

    if(document.body.classList.contains('bg-dark')) {
        darkTheme = 'bg-dark-box';
    }

    const todo = document.getElementById('new-todo').value;

    const id = new Date().getMilliseconds() * (Math.floor(Math.random() * 10 + 1));

    let divTodos = document.getElementById('todos');
    divTodos.insertAdjacentHTML('afterbegin', `
        <div class='todo ${darkTheme}' id=${id}>
        
        <label> <input type='checkbox' class='input-checkbox' onChange='inputChange()'/>${todo}</label> 
    
        <svg onClick='removeTodo()' xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
        </div>
    `)
    itemsLeft();

    document.getElementById('new-todo').value = '';
}

const itemsLeft = () => {
    const divs = document.querySelectorAll('.todo');

    let todoChecked = 0;

    divs.forEach(item => {
        if(![...item.childNodes][1].children[0].checked) todoChecked++;
    });

    document.getElementById('items-left').innerHTML = `${todoChecked} items left`;
}

const changeTheme = () => {
    let body = document.body;
    let newTodo = document.getElementById('new-todo-div');
    let todos = document.getElementById('todos');
    let filters = document.getElementById('filters');
    let itemsClear = document.getElementById('items-clear');
    let todo = document.querySelectorAll('.todo');
    let btnFilter = document.querySelectorAll('.btn-filter')
    let btnFilterDark = document.querySelectorAll('.btn-dark')

    if(body.classList.contains('bg-dark')) {
        body.classList.remove('bg-dark');

        body.classList.remove('bg-dark-image');

        newTodo.classList.remove('bg-dark-box');

        todos.classList.remove('bg-dark-box');

        filters.classList.remove('bg-dark-box');

        itemsClear.classList.remove('bg-dark-box');

        [...todo].forEach( div => {
            div.classList.remove('bg-dark-box')
        }); 
        
        [...btnFilterDark].forEach( btn => {
            btn.classList.add('btn-filter');
            btn.classList.remove('btn-dark');
        });      


    } else {
        body.classList.add('bg-dark');
        body.classList.add('bg-dark-image');

        newTodo.classList.add('bg-dark-box');

        todos.classList.add('bg-dark-box');

        filters.classList.add('bg-dark-box');

        itemsClear.classList.add('bg-dark-box');

        [...todo].forEach( div => {
            div.classList.add('bg-dark-box')
        });

        [...btnFilter].forEach( btn => {
            btn.classList.add('btn-dark');
            btn.classList.remove('btn-filter');
        }); 
    }
}

const removeTodo = () => {
    let input = event.target;

    document.getElementById('todos').removeChild(input.parentNode);

    itemsLeft();
}

const clearCompleted = () => {
    const divs = document.querySelectorAll('.todo');

    let divPai = document.getElementById('todos');

    [...divs].forEach(div => {
        if(div.children[0].children[0].checked) {
            divPai.removeChild(div);
        }
    });

    itemsLeft();
}

const filterActive = () => {
    let btnAll = document.getElementById('btn-all');
    let btnActive = document.getElementById('btn-active');
    let btnCompleted = document.getElementById('btn-completed');

    if(btnAll.classList.contains('activated')) {
        btnAll.classList.remove('activated');

    } else if(btnCompleted.classList.contains('activated')) {
        btnCompleted.classList.remove('activated');
    }

    if(!btnActive.classList.contains('activated')) {
        btnActive.classList.add('activated');
    }

    const divs = document.querySelectorAll('.todo');

    [...divs].forEach(div => {
        if(div.classList.contains('filter-ocultar')) {
            div.classList.remove('filter-ocultar');
        }

        if(div.children[0].children[0].checked) {
            if(!div.classList.contains('filter-ocultar'))
                div.classList.add('filter-ocultar');
        }
    });

    itemsLeft();
}

const filterAll = () => {
    const divs = document.querySelectorAll('.todo');

    let btnAll = document.getElementById('btn-all');
    let btnActive = document.getElementById('btn-active');
    let btnCompleted = document.getElementById('btn-completed');

    if(btnActive.classList.contains('activated')) btnActive.classList.remove('activated');
    
    if(btnCompleted.classList.contains('activated')) btnCompleted.classList.remove('activated');

    if(!btnAll.classList.contains('activated')) btnAll.classList.add('activated');

    [...divs].forEach(div => {

        if(div.classList.contains('filter-ocultar')){
            div.classList.remove('filter-ocultar');
        };
        
    });

    itemsLeft();
}

const filterCompleted = () => {
    const divs = document.querySelectorAll('.todo');

    let btnAll = document.getElementById('btn-all');
    let btnActive = document.getElementById('btn-active');
    let btnCompleted = document.getElementById('btn-completed');

    if(btnAll.classList.contains('activated')) {
        btnAll.classList.remove('activated');

    } else if(btnActive.classList.contains('activated')) {
        btnActive.classList.remove('activated');
    }

    if(!btnCompleted.classList.contains('activated')) {
        btnCompleted.classList.add('activated');
    }

    [...divs].forEach(div => {
        if(div.classList.contains('filter-ocultar')) {
            div.classList.remove('filter-ocultar');
        }

        if(!div.children[0].children[0].checked) {
            if(!div.classList.contains('filter-ocultar'))
                div.classList.add('filter-ocultar');
        }
    });

    itemsLeft();
}

const inputChange = () => {
    let input = event.target;

    let classes = input.parentNode.classList

    let checked = classes.contains('checked');

    if(!checked) {
        classes.add('checked');
    } else {
        classes.remove('checked');
    }

    itemsLeft();
}

window.onload = (() => {
    itemsLeft();
});
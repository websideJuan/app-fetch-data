const calculadora = document.getElementById('calculadora');
const form = document.getElementById('form');
const divElement = document.createElement('div');
const wrapper = document.getElementById('wrapper');
const controller = document.getElementById('controller');


controller.innerHTML = '<P class="loading">Loading <span class="spinner"></span></p>'


async function dataFecht () {
    return await fetch("./fetchApiPrueba.json")
    .then(res => res.json())
    .catch(err => console.log(err))
}

window.addEventListener('DOMContentLoaded', async e => {
    e.stopPropagation()
    renderCalculator()

    const jsonData = await dataFecht()
    const findedData = jsonData.data.filter(data => data.idTarea < 2 )

    findedData.forEach(item => {
        const divCardElement = document.createElement('div')

        divCardElement.setAttribute('data-id', item.idTarea)

        divCardElement.classList.add('wrapper__card')

        divCardElement.innerHTML = `
            <h2>${item.title}</h2>
            <p>${item.description}</p>
            <span>${item.dataInfo}</span>
        `
        wrapper.appendChild(divCardElement)
    });
})

document.addEventListener('keyup', async ({target:{name, value}})=> {
    
    wrapper.innerHTML = ' '

    const res = await dataFecht() 

    let arrObj = []

    if(name === 'number'){
        const findData = res.data.find(item => item.id > parseInt(value))

        if(findData === undefined){
            return null
        }else{ 
            arrObj.push(findData)

            arrObj.forEach(finded => {
                const newDiv = document.createElement('div')
                newDiv.setAttribute('data', finded.id)
                newDiv.classList.add('wrapper__card')

                newDiv.innerHTML = `
                    <h2>${finded.title}</h2>
                    <p>${finded.description}</p>
                    `
                wrapper.appendChild(newDiv)

            })
        }
    }
})


document.addEventListener("click", e => {
    e.stopPropagation()
    if(e.target.parentElement.dataset.id === '1'){
        incorPorar(e)
    }
})

let arrShowWTwo = []

const incorPorar = ({target:{parentElement}}) => {

    const objElement = {
        title: parentElement.querySelector('h2').textContent,
        contenido: parentElement.querySelector('p').textContent,
        dataInfo: parentElement.querySelector('span').textContent
    }

    const validationCar = arrShowWTwo.findIndex(items =>  arrShowWTwo.length === items.id)


    if(validationCar === -1)
        arrShowWTwo.push(objElement)


    pintarListCart(arrShowWTwo)
}


const pintarListCart = (elements) => {
    const ulElement = document.createElement('ul')

    controller.innerHTML = ''

    const mutacion = elements.map(element => ({
        ...element,
        count: 1
    })).forEach(items => {
        ulElement.classList.add('list-dinamic')

        console.log(items)
        ulElement.innerHTML = `
            <li>
                <h3>${items.title}</h3>
                <p>${items.contenido}</p>
                <b>${items.dataInfo}</b><br /><br />
                <b>${items.dataInfo}</b><br /><br />
                <b>${items.dataInfo}</b>
            </li>     
       `

       controller.appendChild(ulElement)
    });

    console.log(mutacion)
}



function renderCalculator () {

    divElement.innerHTML = `

        <form id="form"> 

            <div class='search'>
                <input type='text' name='number' class='inpt' />  
                <button>
                    <i class="fa-solid fa-magnifying-glass"></i>
                </button>
            </div>
            
        </form>

    `

    calculadora.appendChild(divElement)

}
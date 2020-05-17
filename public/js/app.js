fetch('http://localhost:3000/weather?address=meerut').then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error)
        }else{
            console.log(data.location)
            console.log(data.forecast)
        }
    })
})

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'lorem10'
weatherForm.addEventListener('submit',(e)=>{
    //when u subit the form the data runs and flases away the 'e' element is the event listner
    //the event listener 'e' has prevent default the stops the age to refresh when form is submitted
    e.preventDefault()

    const location = search.value
    messageOne.textContent = 'loading...'
    messageTwo.textContent = ''

    if(value==null){
        console.log('input a value')
    }else{
        fetch('/weather?address='+location).then((response)=>{
                response.json().then((data)=>{
                if(data.error){
                    messageOne.textContent = data.error
                    messageTwo.textContent = ''
                }else{
                    messageOne.textContent = data.location
                    messageTwo.textContent = document.forecast
                    console.log(data.location)
                    console.log(data.forecast)
                }
            })
        })
    }


    console.log('testing')
})
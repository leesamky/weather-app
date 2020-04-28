console.log('js code is running')




const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector('#msg1')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value.trim()
    fetch(`http://localhost:3000/weather?address=${encodeURIComponent(location)}`).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                console.log(data.error)
            }else{
                messageOne.textContent=`longitude:${data.longitude};latitude:${data.latitude}`
            }
        })
    })
})
export default function swDev()
{
    let swUrl = '/public/sw.js'
    navigator.serviceWorker.register(swUrl).then((response)=>{
        console.warn("response",response)
    })
}
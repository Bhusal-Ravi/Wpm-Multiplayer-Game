export async function getQuote(){
    try{
        const response= await fetch('http://localhost:3000/quote')
        const data = await response.json();
        return data
    }catch(error){
        console.log('Quote Call:',error)
    }
}
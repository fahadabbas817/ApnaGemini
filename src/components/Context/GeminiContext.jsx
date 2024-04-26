import { createContext,useState } from "react";
import runChat from "../../config/geminiapi";

export const GeminiContext = createContext();

const ContextProvider = (props)=>{
    const [input,setInput]= useState('');
    const [loading, setLoading] = useState(false);
    const [result,setResult]= useState('');
    const [prevPrompt, setPrevPrompt] = useState([]);
    const [recentPrompt, setRecentPrompt] = useState('');
    const [showResult, setshowResult] = useState(false);


    const delayProvider =(index,nextWord)=>{
            setTimeout(function(){
                setResult(prev=>prev+nextWord);
            }, 70*index)
    }

    const newChatbtn=()=>{
        setLoading(false)
        setshowResult(false)
        
    }

    const onSent=async (prompt)=>{
        setResult('');
        setLoading(true);
        setshowResult(true)
        let response;
        if(prompt===undefined){
            setRecentPrompt(input)
            setPrevPrompt(prev=>[input,...prev])
            response = await runChat(input);
        }
        else{
            setRecentPrompt(prompt)
            response = await runChat(prompt);

        }
        
        let responseArray = response.split('**');
        let formattedResponse="";
        for (let i =0;i<responseArray.length;i++){
            if(i===0 || i%2 !== 1 ){
                formattedResponse += responseArray[i];
                // console.log(formattedResponse)

            }
            else{
                formattedResponse += '<b>'+responseArray[i]+'</b></br>'
            }
        }
        // const formattedResponse = response.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>\n');

        
        let finalFormat = formattedResponse.split('*').join('</br>')
        // let dummyrep = finalFormat.split(' ')
        // console.log(dummyrep)
        // setResult(finalFormat)
        let lastFormat = finalFormat.split(" ");
        for (let i = 0;i<lastFormat.length;i++){
            const nextWord = lastFormat[i];
            delayProvider(i,nextWord+" ");
        }
        setLoading(false);
        setInput('')

    }
    // onSent('What is react?');

    const contextValue = {
        input,
        setInput,
        loading,
        setLoading,
        result,
        setResult,
        prevPrompt,
        setPrevPrompt,
        recentPrompt,
        setRecentPrompt,
        showResult,
        setshowResult,
        onSent,
        newChatbtn,
    }
    return(

        <GeminiContext.Provider value={contextValue}>
            {props.children}
        </GeminiContext.Provider>
    )
}

export default ContextProvider;
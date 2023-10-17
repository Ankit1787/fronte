import React, { useState } from 'react'
import axios from 'axios'
import "./Home.css"
const Home = () => {
  const [show,setShow]=useState(false)
  const [myform,setMyform]=useState({method:'get'})
  const [result,setresult]=useState([])
  const [Error,setError]=useState(null)
  const [change,setchange]=useState(false)
   
  const [searchdata,setSearchData]=useState( localStorage.getItem('previosrequest') ? JSON.parse(localStorage.getItem('previosrequest')) : [] )
  

  const handleChange=(e)=>{
      const {name,value}=e.target
      setMyform({...myform,[name]:value})
  }
  
  const handleJson=(e)=>{ 
    
    try {
      const parsedJson = JSON.parse(e.target.value);
    
      setMyform({ ...myform, json: parsedJson });
      setchange(true)
    } catch (error) {
      // Handle parsing errors, e.g., show an error message or reset the input
      setchange(false)
      setMyform({ ...myform, json: e.target.value }); 
    
      // You might want to set an error state or provide user feedback here.
    }
   
  }
  const handleData=async()=>{
   try {
    let response;

    if(myform.method==='get'){
      if(!myform.url){
        return alert('please enter url ')
      }
      
     response=await axios.get(`${myform.url}`)

    }

  
    if(myform.method==='post'){
      if(!myform.url){
        return alert('please enter url ')
      }
      if(!myform.json){
        return alert('please enter json content')
      }
     

// Now, dataObject contains the JavaScript object


        response = await axios.post(`${myform.url}`,myform.json)
      
      }
    if(myform.method==='put'){
      if(!myform.url){
        return alert('please enter url ')
      }
      if(!myform.json){
        return alert('please enter json content')
      }
      
     
    
    response = await axios.put(`${myform.url}`,myform.json)
      
      }
    if(myform.method==='delete'){
      if(!myform.url){
        return alert('please enter url ')
      }
      if(!myform.json){
        return alert('please enter json content')
      }
      
     
   
    response = await axios.delete(`${myform.url}`)
      
      }
  
 
   
    setError(null)
    setresult({result:[response?.data],Status:response?.status})
   
  }
    catch (error) {
   
      setError({ message: error?.response?.data?.error?.message || 'something went wrong',Status:error?.response?.status })
      setresult(null)
   }

   }
   const formSubmit=(e)=>{
    e.preventDefault()
  
    
   handleData();
   const isObjectInArray = searchdata.find(item => item.method === myform.method && item.url === myform.url);
  if(!isObjectInArray ){
  
    console.log(myform,'myform');
  const updatedsearchdata=[...searchdata,myform]
  setSearchData([...updatedsearchdata])
  localStorage.setItem('previosrequest',JSON.stringify(searchdata))

  
  
  console.log(updatedsearchdata,'updattedd')
   
  }
  
     
 
  
   console.log(myform,'myform')
   console.log(searchdata)
    
   
   
   
   }

  // useEffect(()=>{
    
    
  //      if(myform.method && myform.url ){
  //   const isObjectInArray = searchdata.find(item => item.method === myform.method && item.url === myform.url);

  //       if(result && !isObjectInArray){
  //         setSearchData([...searchdata,myform])
  //         localStorage.setItem('previosrequest',JSON.stringify(searchdata))
    
  //      } 
      
  //    }
  // },[result,myform,searchdata])
  
 
  return (
    <>
      <div className="home">
    
      <div className="home-container">
   { show ?  
    <>
          <div className="col-1">
            <div>
             <form className='form' onSubmit={formSubmit} action="">
             <select name='method'  onChange={handleChange}>
           
              <option  value="get">GET</option>
              <option  value="post">Post</option>
              <option  value="put">Put</option>
              <option  value="delete">Delete</option>
             </select>
              <input type="url" placeholder='Enter url' name='url' value={myform.url} onChange={handleChange}/>
              <button type='submit'>Submit</button>
             </form>
             <div className="col-body">
              <h2>Json content</h2>
              <div>
               <textarea className='textarea' onChange={handleJson} name="json" value={change ? JSON.stringify(myform.json,null,2): myform.json} ></textarea>
              </div>
             </div>
            </div>
          </div>
          <div className="col-2">
           <div>
          
            <h2>Status:<span className={`${result? 'green' :'red'}`}> {Error? Error.Status :result.Status}</span></h2>
         
            <div className="col-body">
              <div>
           {!Error?     <div  className='textarea'  > {result && <pre>{JSON.stringify(result, null, 2)}</pre>}</div>
               : <div  className='textarea'  > {Error.message}</div>
             } </div>
          
            </div>


           
          
           
           </div>
          </div>
   </> : 
   <div className='btn-request-container'><button className='btn-request ' onClick={()=>setShow(true)}>new request</button></div>}
    </div> 

  
      </div>

     {searchdata.length>0 ? <div className="previous-request">
          <div className="previous-request-main">
            <h2>Previous Requests</h2>

            <div className="previous-request-body">
            {searchdata.length > 0 ? 
  searchdata.map((item, index) => {
    
    return (
      <div key={index} value={item}>
    
      <p>{index+1}</p>
    <p>Method: <span>{item.method}</span></p>
     <p>Url: <span>{item.url}</span></p>
     <hr /> 
  
      </div> 
      )

  })
   :''}
           
            </div>
          </div>
       </div> :""}
    </>
  )
}

export default Home
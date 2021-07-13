import React,  {Component} from "react";

import axios from 'axios';

export default class Home extends Component{

  constructor(props){
    super(props);

    this.state={
      posts:[]
    };


  }

componentDidMount(){
  this.retrievePosts();

}



retrievePosts(){
  axios.get("/posts").then(res =>{
  if(res.data.success){
    this.setState({
      posts:res.data.existingPosts

    });
    console.log(this.state.posts);

  }
  });
}


onDelete = (id) =>{

  axios.delete(`/post/delete/${id}`).then((res)=>{
   
    alert("Delte succesfully")
  this.retrievePosts();


  })
}


filterData(posts,serchkey){

  const result = posts.filter((post)=>
   
  post.topic.toLowerCase().includes(serchkey) 


  )
  

  this.setState({posts:result})

}


handleSearchArea =(e) =>{

 const serchkey=  e.currentTarget.value;
 axios.get("/posts").then(res =>{
  if(res.data.success){
   
    this.filterData(res.data.existingPosts , serchkey)
  }
  });
}

















  render(){

    return(
      <div className="container">
     <p>All posts </p>
    
     <table className="table">
     <thead>
       <tr>
         <th Scope="col"> #</th>
          <th Scope="col"> Topic</th>
           <th Scope="col">Description</th>
            <th Scope="col"> Post Category</th>
              <th Scope="col"> Action</th>
              <div className="col-lg-9 mt-2 mb-2">
                <input
                  className="form-control"
                  type="search"
                  placeholder="searchQuery"
                  name="searchQuery"
                  onChange={this.handleSearchArea}/>

              </div>
           
       </tr>
     </thead>
                     <tbody>
                     {this.state.posts.map((posts,index) =>(
                      
                      <tr key={index}>
                        <th scope="row">{index+1}</th>


                        <td> 
                            <a href={`/post/${posts._id}`} style={{textDecoration:'none'}}>
                             {posts.topic}
                             </a>
                             </td>
                        <td>{posts.description}</td>
                        <td>{posts.postCategory}</td>
                      

                      <td>
                        <a className="btn btn-warning" href={`/edit/${posts._id}`}>
                          <i className="fas fa-edit"></i>&nbsp;Edit
                        </a>
                       &nbsp;
                        <a className="btn btn-danger" href="#" onClick={() => this.onDelete(posts._id)}>
                          <i className="far fa-trash-alt"></i>&nbsp;Delete
                        </a>
                      </td>
                       


                      </tr>

                     ))}
                    

                     
                     

          
                     </tbody>


     </table>

     <button className="btn btn-success"><a href="/add" style={{textDecoration:'none' , color:'white'}}>create new post</a></button>
    </div>
    )
  }
}


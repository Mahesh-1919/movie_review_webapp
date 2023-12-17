let data=document.getElementById('searchText');
    let submitBtn=document.getElementsByName('submitBtn');
    let movieContainer =document.querySelector('.movieContainer');
    let titles='';
    let route=localStorage.getItem('route');
    let review =document.querySelector('.review');
    let close=document.querySelector('.fa-solid');
    close.addEventListener('click',()=>{
        review.classList.toggle('check');
    })
    if (route){
        submit();
    }

    function submit(){
        if (data.value){
            route=data.value;
        }
        movieContainer.innerHTML='';
        let url=`http://localhost:3000/find/${route}`;
    
        fetch(url)
        .then(res=>res.json())
        .then(data=>{
            if (!data.length){
                movieContainer.innerHTML='<h1>Not found...</h1>';
            }else{
                for (let i=0;i<data.length;i++){
                    if (data[i].poster_path){
                        let ele=(data[i].poster_path);
                        let imgEle=document.createElement('div');
                        imgEle.innerHTML=`<img src='https://image.tmdb.org/t/p/original${ele}'>`;
                        imgEle.addEventListener('click',()=>{
                            review.classList.toggle('check');
                        });
                        
                        if (data[i].original_name){
                            titles=`<p>${data[i].original_name}<p>`;
                        }else{
                            titles=`<p>${data[i].title}<p>`;
                        };
                        imgEle.innerHTML+=titles;
                        movieContainer.appendChild(imgEle);  
                    };
                };
            };
        });
        data.value='';
    };
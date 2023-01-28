import { useParams } from "react-router-dom";

function Detail(props){
    
    // useParams은 현재 url의 파라미터정보들을 가져온다
    // 유저가 :id 자리에 적은것을 가져와 줌
    let {id} = useParams();
    let nowshoes = props.shoes.find((value)=>value.id==id);
    console.log(nowshoes)

    return(
        <div className="container">
            <div className="row">
            <div className="col-md-6">
                <img src={"https://codingapple1.github.io/shop/shoes"+Number(nowshoes.id+1)+".jpg"} width="100%" />
            </div>
            <div className="col-md-6">
                <h4 className="pt-5">{nowshoes.title}</h4>
                <p>{nowshoes.content}</p>
                <p>{nowshoes.price}</p>
                <button className="btn btn-danger">주문하기</button> 
            </div>
            </div>
        </div> 
    )
}

export default Detail;
import { useState, useTransition, useDeferredValue } from "react"

function Opt (){
  
  let [name,setName]= useState("")
  
  // 고의적으로 성능저하를 일으키기
  let a= new Array(3000).fill(0)

  // 성능향상하는 법
  let [isPending,startTransition] = useTransition()
  // startTransition으로 성능저하를 일으키는 함수를 감싼다.
  // isPending는 startTransition이 처리중일때 true가 된다.

  let state = useDeferredValue(name)
  // 위와 유사한 역할
  // 넣은 state나 props에 변동사항이 생기면 해당 변동을 늦게 처리하게 함.
  
  return (
    <div>
      <input type="text" onChange={(e)=>{
        startTransition(()=>{
          setName(e.target.value)
          // startTransition내부의 코드를 약간 늦게 실행시켜줌
          // 위 예시에선 타이핑한 글을 input에 먼저 보여준 뒤,
          // div x 3000 을 만든다. (startTransition내부를 늦게 처리)
        })
        }} />
      {isPending?"로딩중":
      a.map((a,i)=>{
        return(<div key={i}>{name}</div>)
      })}
    </div>
  )
}

export default Opt
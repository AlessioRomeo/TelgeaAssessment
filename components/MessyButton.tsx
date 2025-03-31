// MessyButton.tsx
// @ts-ignore
export default function Btn({click,text}) {
    return <button onClick={click} style={{backgroundColor: "blue",padding:10,color:"white"}}>{text ? text : "Click me"}</button>
}

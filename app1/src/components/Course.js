const Header = (props) => {
  return <h2>{props.name}</h2>
}

const Part = (props) => {
  console.log(props)
  return <p>{props.part.name} : {props.part.exercises}</p>
}

const Content = (props) => {
  console.log('Content props', props);
  return (
    <>
    {props.parts.map(part =>
      <Part key={part.id} part={part} />
    )}
    </>
  )
}

const Total = (props)=> {
  return (
    <>
    <h3>Total of {props.total} exercises</h3>
    </>
  )
}

const Course = (props) => {
  const total = props.course.parts.reduce((s,p) => s + p.exercises, 0);
  return (
    <>
      <Header name={props.course.name}/>
      <Content parts={props.course.parts} />
      <Total total={total} />
    </>
  )
}

export default Course
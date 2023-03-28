const Header = (props) => {
  return <h1>{props.name}</h1>
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
    <div>
      <Header name={props.course.name}/>
      <Content parts={props.course.parts} />
      <Total total={total} />
    </div>
  )
}

const App = () => {

  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />

  // return (
  //   <div>
  //     <Header name={course.name}/>      
  //     <Content parts={course.parts} />
  //     <Total total={course.parts[0].exercises+course.parts[1].exercises+course.parts[2].exercises} />
  //   </div>
  // )
}

export default App;

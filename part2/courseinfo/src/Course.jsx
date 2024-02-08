const Name = (props) => {
    return (
        <h2>{props.course.name}</h2>
    )
}

const Part = (props) => {
    return (
        <p>
            {props.name} {props.exercises}
        </p>
    )
}

const Total = (props) => {
    const total = props.course.parts.reduce((total, part) => {
        return total + part.exercises
        },
        0
    )
    return (
        <p><b>total of {total} exercises</b></p>
    )
}

const Content = (props) => {
    return (
        <>
            {props.course.parts.map(part => 
                <Part key={part.id} name={part.name} exercises={part.exercises} />
            )}
        </>
    )
}

const Course = ({ course }) => {
    return (
        <>
            <Name course={course}/>
            <Content course={course}/>
            <Total course={course} />
        </>    
    )
}

const Courses = ({ courses }) => {
    return (
      <>
        {courses.map(course => 
          <Course key={course.id} course={course} />
        )}
      </>
    )
}

export default Courses
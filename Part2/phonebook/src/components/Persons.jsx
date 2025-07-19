const Persons = ({ persons }) => (
  <ul>
    {persons.map(person => (
      <p key={person.id}>
        {person.name} {person.number}
      </p>
    ))}
  </ul>
)

export default Persons

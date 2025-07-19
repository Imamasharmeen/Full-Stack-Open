const Persons = ({ persons, handleDelete, handleUpdate }) => (
  <ul>
    {persons?.map(person => (
      <p key={person.id}>
        {person.name} {person.number}
        <button 
        onClick={() => handleDelete(person.id, person.name)}
        >delete</button>
      </p>
    ))}
  </ul>
)

export default Persons

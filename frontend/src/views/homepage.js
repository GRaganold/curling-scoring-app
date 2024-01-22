
import { useQuery } from '@apollo/client';
import { gql } from 'graphql-tag';


const CityList = ({ loading, error, data }) => {
  if (loading) return <p>Loading...</p>;

  if (error) {
    console.error('GraphQL Error:', error);
    return <p>Error: Unable to fetch data</p>;
  }

  return (
    <ul>
      {data.cities.map(city => (
        <li key={city.id}>{city.name}</li>
      ))}
    </ul>
  );
};




const GET_CITIES = gql`
  query {
    cities {
      id
      name
    }
  }  
`;

const HASURA_ADMIN_SECRET = process.env.REACT_APP_HASURA_ADMIN_SECRET;

const App123 = () => {
  const { loading, error, data } = useQuery(GET_CITIES, {
    context: {
      headers: {
        'x-hasura-admin-secret': HASURA_ADMIN_SECRET,
      },
    },
  });

  return <CityList loading={loading} error={error} data={data} />;
};

export default App123;

import React from 'react';
import { useQuery } from '@apollo/client';
import { gql } from 'graphql-tag';
import {  Link, Flex, Table, TableCaption, Tbody, Td, Text, Tr,HStack, Box} from '@chakra-ui/react';
import TeamDetails from './TeamDetails';  // Import the modified TeamDetails




const GET_COUNTRIES = gql`
  query MyQuery @cached {
    scores: curlingdatabase_scores {
      gameid
      hometeamscore
      endnumber
      awayteamscore
    }
    games: curlingdatabase_games {
      gameid
      gamedate
      gametime
      hometeamid
      awayteamid
    }
    countries: curlingdatabase_countries {
      countryname
      countryid
    }
    curlingdatabase_teams {
      teamid
      teamname
      countryid
      provinceorstateid
      foundingyear
      coachname
      cityid
    }
  }
`;

const Game = (
  // { eventGameId }
  ) => {
  const { loading, error, data } = useQuery(GET_COUNTRIES, {
    context: {
      headers: {
        'x-hasura-admin-secret': process.env.REACT_APP_HASURA_ADMIN_SECRET,
      },
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const eventGameId = "1"
  const fetchedGameId = parseInt(eventGameId, 10);
  const homeTeamId = data.games.find((game) => game.gameid === fetchedGameId)?.hometeamid;
  const awayTeamId = data.games.find((game) => game.gameid === fetchedGameId)?.awayteamid;

  return (
    <>
      <Table w="300px" fontSize="sm">
        <TableCaption p={0} m={0} borderX="1px solid black" borderBottom="1px solid black">
          <Flex justify="space-between" paddingLeft={3} paddingRight={3}>
            <Text>View Game Details</Text>
            <Link onClick={() => window.location.reload()}>Refresh</Link>
          </Flex>
        </TableCaption>
        <Tbody>
        <Tr p={0} m={0}>
      <Td border="1px solid black" p={0} m={0}>
        <HStack>
          <Box h="50px" w="50px">
            team
          </Box>
          <Box w="200px">
            
            <Text fontSize="xs">city, prov/state</Text>
          </Box>
          <Box h="54px" w="15px" borderLeft="1px solid black" />
        </HStack>
      </Td>
      <Td border="1px solid black" p={0} m={0}>
        <Flex justify="center" alignItems="center">
          Hm
        </Flex>
      </Td>
      <Td border="1px solid black" p={0} m={0} fontSize="sm">
        eamScores
      </Td>
    </Tr>
            <Tr> 
            <Td border="1px solid black" p={0} m={0} fontSize="sm">
              {/* Pass data for Home Team */}
              <TeamDetails
                gameIdToFetch={eventGameId}
                teamType="home"
                color="red"
                teamId={homeTeamId}
                data={data}
              />
              </Td>
              </Tr>
              <Tr> 
            <Td border="1px solid black" p={0} m={0} fontSize="sm">
              {/* Pass data for Away Team */}
              <TeamDetails
                gameIdToFetch={eventGameId}
                teamType="away"
                color="yellow"
                teamId={awayTeamId}
                data={data}
              />
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </>
  );
};

export default Game;

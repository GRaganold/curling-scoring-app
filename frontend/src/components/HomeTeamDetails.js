import React from 'react';
import { useQuery } from '@apollo/client';
import { gql } from 'graphql-tag';
import { Box, Flex, HStack, Link, Td, Text, Tr } from '@chakra-ui/react';
import LoadingGame from './LoadingGame';

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

const HomeTeamDetails = ({ gameIdToFetch, color }) => {
  const { loading, error, data } = useQuery(GET_COUNTRIES, {
    context: {
      headers: {
        'x-hasura-admin-secret': process.env.REACT_APP_HASURA_ADMIN_SECRET,
      },
    },
  });

  if (loading) return (<LoadingGame />);
  if (error) return <p>Error: {error.message}</p>; // Display specific error message

  const fetchedGameId = parseInt(gameIdToFetch, 10);

  const selectedGame = data.games.find((game) => game.gameid === fetchedGameId);
  if (!selectedGame) return <p>No game found </p>;

  const homeTeamId = selectedGame.hometeamid;
  const homeTeam = data.curlingdatabase_teams.find((team) => team.teamid === homeTeamId);
  if (!homeTeam) return <p>No home team found </p>;

  const homeTeamScores = data.scores
    .filter((score) => score.gameid === fetchedGameId)
    .slice(0, 8)
    .map((score, index, array) => (
      <Td
        key={index}
        style={{ borderRight: index === array.length - 1 ? 'none' : '1px solid black' }}
        p={0}
        m={0}
        h="54px"
      >
        <Flex justify="center" w="calc(20px + 2vw)">
          <Text w="10px" textAlign="center">
            {score.hometeamscore}
          </Text>
        </Flex>
      </Td>
    ));

  const homeTeamCountry = data.countries.find((country) => homeTeam.countryid === country.countryid);

  return (
    <Tr p={0} m={0}>
      <Td border="1px solid black" p={0} m={0}>
        <HStack>
          <Box h="50px" w="50px">
            {homeTeamCountry && homeTeamCountry.countryname}
          </Box>
          <Box w="200px">
            <Link fontWeight="bold">{homeTeam.teamname}</Link>
            <Text fontSize="xs">city, prov/state</Text>
          </Box>
          <Box h="54px" bg={color || 'red'} w="15px" borderLeft="1px solid black" />
        </HStack>
      </Td>
      <Td border="1px solid black" p={0} m={0}>
        <Box> </Box>
      </Td>
      <Td border="1px solid black" p={0} m={0} fontSize="sm">
        {homeTeamScores}
      </Td>
    </Tr>
  );
};

export default HomeTeamDetails;

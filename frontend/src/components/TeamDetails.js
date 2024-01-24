import React from 'react';
import { Td, Tr, Box, HStack, Link, Text, Flex } from '@chakra-ui/react';

const TeamDetails = ({ gameIdToFetch, teamType, color, teamId, data }) => {
  const fetchedGameId = parseInt(gameIdToFetch, 10);
  const selectedGame = data.games.find((game) => game.gameid === fetchedGameId);

  if (!selectedGame) return null;

  const team = teamType === 'home' ? 'hometeam' : 'awayteam';
  const selectedTeamId = selectedGame[`${team}id`];

  if (teamId !== selectedTeamId) return null;

  const teamScores = data.scores
    .filter((score) => score.gameid === fetchedGameId)
    .slice(0, 8)
    .map((score, index, array) => (
      <Td
        key={index}
        p={0}
        m={0}
        style={{ borderRight: index === array.length - 1 ? 'none' : '1px solid black' }}
        h="54px"
      >
        <Flex justify="center" w="calc(20px + 2vw)">
          <Text w="10px" textAlign="center">
            {teamType === 'home' ? score.hometeamscore : score.awayteamscore}
          </Text>
        </Flex>
      </Td>
    ));

  const teamCountry = data.countries.find((country) => selectedGame[`${team}id`] === country.countryid);

  return (
    <Tr p={0} m={0}>
      <Td border="1px solid black" p={0} m={0}>
        <HStack>
          <Box h="50px" w="50px">
            {teamCountry && teamCountry.countryname}
          </Box>
          <Box w="200px">
            <Link fontWeight="bold">
              {teamType === 'home' ? data.curlingdatabase_teams.find((t) => t.teamid === selectedGame.hometeamid)?.teamname : data.curlingdatabase_teams.find((t) => t.teamid === selectedGame.awayteamid)?.teamname}
            </Link>
            <Text fontSize="xs">city, prov/state</Text>
          </Box>
          <Box h="54px" bg={color || 'red'} w="15px" borderLeft="1px solid black" />
        </HStack>
      </Td>
      <Td border="1px solid black" p={0} m={0}>
        <Flex justify="center" alignItems="center">
          Hm
        </Flex>
      </Td>
      <Td border="1px solid black" p={0} m={0} fontSize="sm">
        {teamScores}
      </Td>
    </Tr>
  );
};

export default TeamDetails;

import React from 'react';
import { useQuery } from '@apollo/client';
import { gql } from 'graphql-tag';
import { Box, Flex, HStack, Link, Td, Text, Tr } from '@chakra-ui/react';
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'

export default function LoadingGame() {

    const ends = "8";
  const length = parseInt(ends, 10);

    const endScores = Array.from({ length }).map((_, index) => (
        <Td key={index} p={0} m={0} style={{ borderRight: index === length - 1 ? 'none' : '1px solid black' }} h="54px">
          <Flex  justify={"center"} w="calc(20px + 2vw)">
          <Text w="10px"  textAlign={"center"}>   
          <Skeleton height='20px' />          
          </Text> 
            </Flex>
        </Td>
      ));
    return (
        <>
            <Tr p={0} m={0}>
                <Td border="1px solid black" p={0} m={0}>
                    <HStack>
                        <Box h="50px" w="50px">
                            <Skeleton height='100%' />
                        </Box>
                        <Box w="200px">
                            <SkeletonText height='100%' />                            
                        </Box>
                        <Box h="54px"  w="15px" borderLeft="1px solid black" />
                    </HStack>
                </Td>
                <Td border="1px solid black" p={0} m={0}>
                    <Box> </Box>
                </Td>
                <Td border="1px solid black" p={0} m={0} fontSize="sm">
              {endScores}
            </Td>
            </Tr></>
    )
}
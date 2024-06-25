import React, { useState } from 'react';
import { Box, Image, Badge, Flex, Heading, Text } from '@chakra-ui/react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faComment, faThumbsUp, faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";

const SpaceCard = ({ space, file }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const thumbnailPath = file && file.fileName
    ? file.fileName
    : 'http://via.placeholder.com/1000.jpg';

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    setIsFavorited(!isFavorited);
  };

  return (
    <Box
      maxW='sm'
      borderWidth='1px'
      borderRadius='xl'
      overflow='hidden'
      height='450px'
      position='relative'
      onClick={() => console.log("Card clicked")}
      transition="all 0.3s"
      _hover={{
        transform: 'translateY(-5px)',
        boxShadow: 'xl'
      }}
    >
      <Image
        src={thumbnailPath}
        alt={space.title}
        objectFit="cover"
        width="100%"
        height="250px"
      />
      <Box
        position='absolute'
        top={4}
        right={4}
        zIndex={1}
        onClick={handleFavoriteClick}
        cursor="pointer"
        transition="transform 0.2s"
        _hover={{ transform: "scale(1.2)" }}
      >
        <Box
          width="40px"
          height="40px"
          borderRadius="full"
          bg="rgba(255, 255, 255, 0.6)"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <FontAwesomeIcon
            icon={isFavorited ? solidHeart : regularHeart}
            color={isFavorited ? "red.500" : "gray.600"}
            style={{
              filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.3))',
              stroke: 'white',
              strokeWidth: 30,
              paintOrder: 'stroke fill'
            }}
            size="lg"
          />
        </Box>
      </Box>

      <Box p='6' bg="white">
        <Flex justifyContent="space-between" alignItems="center" mb={2}>
          <Badge borderRadius='full' px='2' colorScheme='teal'>
            New
          </Badge>
          <Text color='gray.500' fontSize='sm'>{space.type}</Text>
        </Flex>

        <Heading as='h3' size='md' mb={2} color="gray.700">{space.title}</Heading>

        <Text fontWeight="bold" fontSize="xl" color="teal.600" mb={2}>
          ₩{space.price}<Text as='span' color='gray.500' fontSize='sm'> / 시간</Text>
        </Text>

        <Flex alignItems='center' mb={3}>
          {Array(5).fill('').map((_, i) => (
            <FontAwesomeIcon
              key={i}
              icon={faStar}
              color={i < space.rating ? '#FFC107' : 'gray.300'}
            />
          ))}
          <Text ml='2' color='gray.600' fontSize='sm'>
            {space.reviewCount} reviews
          </Text>
        </Flex>

        <Flex justify='space-between' color="gray.600">
          <Flex alignItems='center'>
            <FontAwesomeIcon icon={faComment} />
            <Text ml='1' fontSize="sm">{space.reviewCount} 리뷰</Text>
          </Flex>
          <Flex alignItems='center'>
            <FontAwesomeIcon icon={faThumbsUp} />
            <Text ml='1' fontSize="sm">{space.likes} 좋아요</Text>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default SpaceCard;
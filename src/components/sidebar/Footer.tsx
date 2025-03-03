import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { GithubSvg } from "@/components/ui/GithubSvg";

interface SideBarFooterProps {
  textColor: string;
}

export const Footer: React.FC<SideBarFooterProps> = ({ textColor }) => {
  return (
    <Box
      marginTop="auto"
      bottom="0"
      borderTop={`1px solid ${textColor}`}
      height="3rem"
      p="4"
      display="flex"
      alignItems="center"
      color={textColor}
    >
      <a
        href="https://github.com/allister-grange/startertab"
        aria-label="Link to this website's code"
      >
        <GithubSvg fill={textColor} />
      </a>
      <Box
        ml="3"
        borderLeft={`1px solid ${textColor}`}
        height="180%"
        width="1px"
      />
      <Text ml="3" fontSize="smaller">
        &copy; 2022, Starter Tab - v1.00
      </Text>
    </Box>
  );
};

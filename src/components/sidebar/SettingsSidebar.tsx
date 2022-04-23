import {
  Box,
  BoxProps,
  Button,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { SideBarTitle } from "@/components/sidebar/SideBarTitle";

interface SettingsSideBarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsSideBar: React.FC<SettingsSideBarProps> = ({
  isOpen,
  onClose,
}) => {
  const backgroundColor = useColorModeValue("gray.100", "#33393D");
  const textColor = useColorModeValue("#303030", "#fff");
  const subTextColor = useColorModeValue("#606060", "#ddd");
  const options = [
    {
      title: "Light theme background color",
      subText: "Controls the light theme background color of the main page",
      localStorageId: "lightThemeBackgroundColor",
    },
    {
      title: "Dark theme background color",
      subText: "Controls the dark theme background color of the main page",
      localStorageId: "darkThemeBackgroundColor",
    },
  ];

  return isOpen ? (
    <Box
      minWidth={300}
      width={300}
      height="100%"
      transition={"width 0.3s ease-in-out"}
      zIndex="10"
      bg={backgroundColor}
    >
      <Box
        height="100%"
        width="100%"
        bg={backgroundColor}
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      >
        <SideBarTitle onClose={onClose} textColor={textColor} />

        <Box p="3">
          <ul>
            {options.map((option) => (
              <>
                <Box key={option.localStorageId} my="2">
                  <Text fontSize="md" color={textColor}>
                    {option.title}
                  </Text>
                  <Text fontSize="xs" color={subTextColor}>
                    {option.subText}
                  </Text>
                </Box>
                <hr />
              </>
            ))}
          </ul>
        </Box>
      </Box>
    </Box>
  ) : null;
};

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

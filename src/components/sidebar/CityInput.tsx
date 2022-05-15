import { Option, TileId } from "@/types";
import { Box, BoxProps, Input, Text } from "@chakra-ui/react";
import { title } from "process";
import React, { useEffect, useState } from "react";

interface CityInputProps extends BoxProps {
  option: Option;
  textColor: string;
  subTextColor: string;
  value: string;
  changeSetting: (key: string, value: string, tileId: TileId) => void;
  resetOptionToDefault: (option: Option) => void;
}

export const CityInput: React.FC<CityInputProps> = ({
  option,
  textColor,
  subTextColor,
  changeSetting,
  value,
  resetOptionToDefault,
}) => {
  const { title, subTitle, localStorageId } = option;
  const [inputValue, setInputValue] = useState(value);

  const onCityNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // will set the subreddit in the in memory copy of the settings
  // to then be staged into the localStorage, need the timeout for 
  // performance reasons (only refresh every half a second)
  useEffect(() => {
    if (value === inputValue) {
      return;
    }
    const timeoutIdentifier = setTimeout(() => {      
      changeSetting(option.localStorageId, inputValue, option.tileId);
    }, 800);

    return () => {
      clearTimeout(timeoutIdentifier);
    };
  }, [changeSetting, inputValue, option.localStorageId, option.tileId, value]);

  return (
    <Box key={localStorageId} my="2">
      <Text fontSize="md" color={textColor}>
        {title}
      </Text>
      <Text fontSize="xs" color={subTextColor}>
        {subTitle}
        <span
          style={{ cursor: "pointer" }}
          onClick={() => resetOptionToDefault(option)}
        >
          .&nbsp;Reset to default.
        </span>
      </Text>
      <Box display="flex" flexDir="column" mt="1">
        <Input
          marginLeft="auto"
          display="block"
          value={inputValue}
          size="sm"
          onChange={onCityNameChange}
          height="8"
        />
      </Box>
    </Box>
  );
};

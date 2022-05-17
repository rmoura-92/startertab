import { Option, OptionType, TileId } from "@/types";
import { Box, BoxProps, Select, Text } from "@chakra-ui/react";
import React from "react";

interface TypePickerProps extends BoxProps {
  option: Option;
  textColor: string;
  subTextColor: string;
  value: string;
  changeSetting: (key: string, value: string, tileId: TileId) => void;
  resetOptionToDefault: (option: Option) => void;
  sizeOfTileForTypes: OptionType;
}

export const TypePicker: React.FC<TypePickerProps> = ({
  option,
  textColor,
  subTextColor,
  changeSetting,
  value,
  resetOptionToDefault,
  sizeOfTileForTypes,
}) => {
  const { title, subTitle, localStorageId } = option;

  const onTypeSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    changeSetting(option.localStorageId, e.target.value, option.tileId);
  };

  let options;

  // console.log("loaded in");
  

  switch (sizeOfTileForTypes) {
    case "SmallTileTypePicker":
      options = (
        <>
          <option value="Weather">Weather</option>
          <option value="Time">Time</option>
          <option value="Theme Picker">Theme Picker</option>
        </>
      );
      break;
    case "MediumTileTypePicker":
      options = (
        <>
          <option value="Reddit Feed">Reddit Feed</option>
          <option value="Hacker News Feed">Hacker News Feed</option>
          <option value="Todo List">Todo List</option>
          <option value="Bonsai">Bonsai</option>
        </>
      );
      break;
    case "LargeTileTypePicker":
      options = (
        <>
          <option value="Strava Graph">Strava Graph</option>
          <option value="UV Graph">UV Graph</option>
          <option value="Large Spotify Tile">Large Spotify Tile</option>
        </>
      );
      break;

    default:
      options = null;
  }

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
        <Select
          placeholder="Select option"
          size="sm"
          onChange={onTypeSelectChange}
          value={value}
        >
          {options}
        </Select>
      </Box>
    </Box>
  );
};

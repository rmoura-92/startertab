import { TileGrid } from "@/components/grid/TileGrid";
import { Tutorial } from "@/components/tutorial/Tutorial";
import { MobileWarning } from "@/components/ui/MobileWarning";
import { SettingsToggle } from "@/components/ui/SettingsToggle";
import { SettingsContext } from "@/context/UserSettingsContext";
import { getCurrentTheme } from "@/helpers/settingsHelpers";
import { getUVData } from "@/pages/api/weather";
import { TileId, UserSettingsContextInterface, UvGraphData } from "@/types";
import { Box, useColorMode, useDisclosure } from "@chakra-ui/react";
import cloneDeep from "lodash.clonedeep";
import type { GetServerSideProps, NextPage } from "next";
import dynamic from "next/dynamic";
import { useContext, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import NoSSR from "react-no-ssr";
const SettingsSideBar = dynamic(
  () => import("@/components/sidebar/SettingsSidebar")
);

type PageProps = {
  uvData: UvGraphData[];
};

const Home: NextPage<PageProps> = ({ uvData }) => {
  // Sidebar hook
  const { isOpen, onOpen, onClose } = useDisclosure();
  // to highlight what tile you are looking to edit from the sidebar
  const [optionHovered, setOptionHovered] = useState<undefined | TileId>();
  const { settings, setSettings } = useContext(
    SettingsContext
  ) as UserSettingsContextInterface;
  const [showingTutorial, setShowingTutorial] = useState(false);
  const [tutorialProgress, setTutorialProgress] = useState(0);
  const [inMemorySettings, setInMemorySettings] = useState(() =>
    cloneDeep(settings)
  );
  const [showingMobileWarning, setShowingMobileWarning] = useState(false);
  const { colorMode, setColorMode } = useColorMode();

  useEffect(() => {
    if (isMobile) {
      setShowingMobileWarning(true);
    }

    const hasVisitedBefore = localStorage.getItem("hasVisitedBefore");

    if (!hasVisitedBefore) {
      setShowingTutorial(true);
      localStorage.setItem("hasVisitedBefore", "true");
    }
  }, [setColorMode]);

  const currentTheme = getCurrentTheme(settings, colorMode);
  const gridGap = currentTheme.globalSettings.gridGap;
  const settingsToggleColor = currentTheme.globalSettings.textColor;
  let toDisplay;

  if (showingMobileWarning) {
    toDisplay = <MobileWarning />;
  } else {
    toDisplay = (
      <Box h="100vh" display="flex" alignItems="center">
        <SettingsSideBar
          onClose={onClose}
          isOpen={isOpen}
          setOptionHovered={setOptionHovered}
          settings={settings}
          inMemorySettings={inMemorySettings}
          setSettings={setSettings}
          setInMemorySettings={setInMemorySettings}
          setTutorialProgress={setTutorialProgress}
        />
        <NoSSR>
          <>
            {showingTutorial ? (
              <Tutorial
                setShowingTutorial={setShowingTutorial}
                tutorialProgress={tutorialProgress}
                setTutorialProgress={setTutorialProgress}
              />
            ) : null}
            <TileGrid
              optionHovered={optionHovered}
              inMemorySettings={inMemorySettings}
              uvData={uvData}
              gridGap={gridGap}
            />
          </>
        </NoSSR>
      </Box>
    );
  }

  return (
    <>
      {toDisplay}
      {!isOpen && (
        <SettingsToggle
          onOpen={() => {
            onOpen();
            setTutorialProgress(tutorialProgress + 1);
          }}
          color={settingsToggleColor}
        />
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const uvData = await getUVData("Wellington");

  return {
    props: { uvData },
  };
};

export default Home;

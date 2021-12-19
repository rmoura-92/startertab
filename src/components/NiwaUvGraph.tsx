import { Center, Heading, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis
} from "recharts";
import { getApiUrl } from "../helpers/getApiUrl";
import { TransformedNiwaData } from "../types/niwa";

interface NiwaUvGraphProps {}

export const NiwaUvGraph: React.FC<NiwaUvGraphProps> = () => {
  const [niwaData, setNiwaData] = useState<undefined | TransformedNiwaData[]>();

  useEffect(() => {
    const getNiwaData = async () => {
      try {
        const res = await fetch("/api/niwaUV");
        const data = (await res.json()) as TransformedNiwaData[];

        setNiwaData(data);
      } catch (err) {
        console.error(err);
      }
    };

    getNiwaData();
  }, []);

  return (
    <div>
      <Heading color="white" fontSize="2xl" ml="10" mb="4">
        UV Index Wellington
      </Heading>

      {niwaData ? (
        <ResponsiveContainer width="95%" height={250}>
          <BarChart data={niwaData}>
            <XAxis dataKey="name" tick={{ fontSize: 8 }} />
            <YAxis />
            <Legend />
            <Bar dataKey="sunny" fill="white" />
            <Bar dataKey="cloudy" fill="#1A202C" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <Center minH="250">
          <Spinner color="white" />
        </Center>
      )}
    </div>
  );
};

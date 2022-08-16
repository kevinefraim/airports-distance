import { DistanceProps } from "types/props";
import { formatMiles } from "utils/helpers";

import { Box, Typography } from "@mui/material";

const Distance = ({ leg }: DistanceProps) => {
  if (!leg.distance) return null;
  const {
    distance: { text },
  } = leg;
  const nauticalMiles: number = formatMiles(text);

  return (
    <Box className="p-2 bg-slate-100 shadow-lg rounded-md w-[fit-content]">
      <Typography variant="h6" className="font-mono">
        Distance: {nauticalMiles} NMI.
      </Typography>
    </Box>
  );
};

export default Distance;

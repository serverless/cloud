import { Grid } from "@chakra-ui/react";

import { Incidents } from "./Incidents";
import { Services } from "./Services";

export const Home = () => {
  return (
    <Grid mt={20} templateColumns="1.4fr 1fr" gap={6}>
      <Incidents />
      <Services />
    </Grid>
  );
};

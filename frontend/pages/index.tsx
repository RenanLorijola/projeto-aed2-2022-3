import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import AutocompleteHighlight from "components/AutocompleteHighlight";
import { Box, Typography } from "@mui/material";

const Home: NextPage = () => {
  return (
    <Box>
      <Head>
        <title>InfoMovie</title>
        <meta name="description" content="Recomendação de filmes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box component="main">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#282c34",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Typography
            variant="h1"
            component="h1"
            fontWeight={700}
            mt={16}
            color="#61dafb"
          >
            InfoMovie
          </Typography>
          <Typography
            variant="h4"
            component="h4"
            fontWeight={500}
            mt={-1}
            mb={8}
            color="#fff"
          >
            Sua enciclopédia de filmes
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#fff",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Typography mt={8} variant="h6">
          Encontre todas informações sobre seus filmes favoritos, além de
          reviews de críticos aclamados, filmes relacionados e mais
        </Typography>
        <AutocompleteHighlight />
      </Box>
    </Box>
  );
};

export default Home;

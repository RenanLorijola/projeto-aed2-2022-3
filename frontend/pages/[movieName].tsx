import { useRouter } from "next/router";
import useSWR, { Fetcher } from "swr";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArticleIcon from "@mui/icons-material/Article";
import Link from "next/link";
import Image from "next/image";
import ReviewAccordions from "components/ReviewsAccordions";

export type Movie = {
  rotten_tomatoes_link: string;
  movie_title: string;
  movie_info: string;
  critics_consensus: string;
  genres: string[];
  directors: string[];
  authors: string[];
  actors: string[];
  original_release_date: string;
  runtime: string;
  reviews: Array<{
    critic_name: string;
    score: string;
    date: string;
    content: string;
  }>;
  suggested_movies: Array<{
    rotten_tomatoes_link: string;
    movie_title: string;
  }>;
};

const fetcher: Fetcher<Movie, string> = (url: string) =>
  fetch(url).then((res) => res.json());

export default function MovieName() {
  const router = useRouter();
  const { movieName } = router.query;

  const { data, error } = useSWR(
    movieName ? `/api/movie/${movieName}` : null,
    fetcher
  );

  console.log(data);
  if (error) {
    return (
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: "#282c34",
        }}
      >
        <Typography color="error" fontSize={26}>
          Falhou em carregar, tente novamente
        </Typography>
        <Link href="/" style={{ textDecoration: "none" }} legacyBehavior>
          <Button
            color="primary"
            sx={{
              color: "#fff",
              mt: 4,
              width: 250,
              height: 40,
              fontSize: 20,
            }}
            startIcon={<ArrowCircleLeftIcon />}
            variant="contained"
          >
            Voltar
          </Button>
        </Link>
      </Box>
    );
  }
  if (!data)
    return (
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#282c34",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography color="primary" fontSize={26}>
            Carregando...
          </Typography>
          <CircularProgress />
        </Box>
      </Box>
    );

  return (
    <Box
      sx={{
        backgroundColor: "#282c34",
        color: "#fff",
        padding: 2,
      }}
    >
      <Typography variant="h2" component="h1" fontWeight={700} color="primary">
        {data.movie_title}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
          margin: "4px 0",
        }}
      >
        <Typography variant="h6">
          Generos <TheaterComedyIcon />
        </Typography>
        <Box
          component="ul"
          sx={{
            listStyleType: "none",
            display: "flex",
            paddingInlineStart: "8px",
          }}
        >
          {data.genres.map((genre) => (
            <Box component="li" key={genre} sx={{ margin: "0 4px" }}>
              <Chip label={genre} color="primary" />
            </Box>
          ))}
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
          margin: "4px 0",
        }}
      >
        <Typography variant="h6">Duração: {data.runtime} minutos</Typography>
      </Box>
      <Box
        sx={{
          background: "#fff",
          color: "#000",
          borderRadius: 4,
          padding: 2,
          mt: 2,
        }}
      >
        <Typography
          variant="h4"
          component="h4"
          fontWeight={500}
          sx={{ display: "flex", alignItems: "center" }}
        >
          Sinopse <ArticleIcon fontSize="large" sx={{ marginLeft: 2 }} />
        </Typography>
        <Typography variant="h6" component="h6" fontWeight={500} mt={2}>
          {data.movie_info}
        </Typography>
      </Box>
      <Typography
        variant="h3"
        component="h2"
        fontWeight={500}
        mt={2}
        textAlign="center"
        color="primary"
      >
        Participantes
      </Typography>
      <Box sx={{ display: "flex", marginTop: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyItems: "space-evenly",
            flexDirection: "column",
            flex: 1,
          }}
        >
          {data.authors?.length > 0 && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                margin: "4px 0",
              }}
            >
              <Typography variant="h6">Autores</Typography>
              <List
                dense
                sx={{
                  overflow: "auto",
                  maxHeight: 300,
                  maxWidth: 400,
                  background: "#fff",
                  color: "#000",
                  borderRadius: 4,
                  width: "100%",
                }}
              >
                {data.authors.map((authors) => (
                  <ListItem key={authors}>
                    <ListItemText primary={authors} />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
          {data.directors?.length > 0 && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                margin: "4px 0",
              }}
            >
              <Typography variant="h6">Diretores</Typography>
              <List
                dense
                sx={{
                  overflow: "auto",
                  maxHeight: 300,
                  maxWidth: 400,
                  background: "#fff",
                  color: "#000",
                  borderRadius: 4,
                  width: "100%",
                }}
              >
                {data.directors.map((authors) => (
                  <ListItem key={authors}>
                    <ListItemText primary={authors} />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </Box>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h6">Atores</Typography>
          <List
            dense
            sx={{
              overflow: "auto",
              maxHeight: 300,
              maxWidth: 400,
              background: "#fff",
              color: "#000",
              borderRadius: 4,
              width: "100%",
            }}
          >
            {data.actors.map((actor) => (
              <ListItem key={actor}>
                <ListItemText primary={actor} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
      <Typography
        variant="h3"
        component="h2"
        fontWeight={500}
        mt={2}
        textAlign="center"
        color="primary"
      >
        Reviews
      </Typography>
      <Box mt={4}>
        <ReviewAccordions reviews={data.reviews} />
      </Box>
      <Box sx={{ mt: 4, display: "flex", justifyContent: "end" }}>
        <Typography
          variant="button"
          color="#fff"
          sx={{ display: "flex", alignItems: "center" }}
        >
          Acessar no{" "}
          <Button
            href={`https://rottentomatoes.com/${data.rotten_tomatoes_link}`}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              textDecoration: "underline",
              textDecorationColor: "#FA320A",
              padding: 0,
            }}
          >
            <Typography
              component="span"
              variant="button"
              color="#FA320A"
              sx={{ ml: 1 }}
            >
              Rotten Tomatoes
            </Typography>
            <Image
              src="https://www.rottentomatoes.com/assets/pizza-pie/images/icons/tomatometer/tomatometer-fresh.149b5e8adc3.svg"
              alt="Rotten Tomatoes logo"
              width={20}
              height={20}
              style={{ marginLeft: 4 }}
            />
          </Button>
        </Typography>
      </Box>
    </Box>
  );
}

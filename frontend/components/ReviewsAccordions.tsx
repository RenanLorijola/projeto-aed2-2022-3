import { Movie } from "pages/[movieName]";
import Accordion from "@mui/material/Accordion";
import Box from "@mui/material/Box";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { SyntheticEvent, useState, Fragment } from "react";

type ReviewsAccordionsProps = {
  reviews: Movie["reviews"];
};

export default function ReviewAccordions({ reviews }: ReviewsAccordionsProps) {
  const [expanded, setExpanded] = useState<string | false>(false);
  const handleChange =
    (panel: string) => (_: SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Box>
      {reviews.map((review) => (
        <Fragment key={review.critic_name}>
          {review.critic_name && (
            <Accordion
              expanded={expanded === review.critic_name}
              onChange={handleChange(review.critic_name)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`${review.critic_name}bh-content`}
                id={`${review.critic_name}bh-header`}
              >
                <Typography sx={{ flexGrow: 1, marginLeft: 2 }}>
                  {review.critic_name}
                </Typography>
                {review.score && (
                  <Typography sx={{ marginRight: 4 }}>
                    Nota: {review.score}
                  </Typography>
                )}
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{review.content}</Typography>
              </AccordionDetails>
            </Accordion>
          )}
        </Fragment>
      ))}
    </Box>
  );
}

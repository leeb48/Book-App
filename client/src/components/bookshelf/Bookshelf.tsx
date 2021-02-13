import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { RootState } from "app/rootReducer";
import { useAppDispatch } from "app/store";
import {
  createBookshelf,
  CreateBookshelfDto,
  getUsersBookshelves,
} from "features/bookshelf";
import React, { Fragment, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useForm } from "utils/useForm";

const initialFormValues: CreateBookshelfDto = {
  bookshelfName: "",
};

const Bookshelf = () => {
  const dispatch = useAppDispatch();
  const { inputErrors } = useSelector((state: RootState) => {
    return {
      inputErrors: state.alerts.inputErrors,
    };
  }, shallowEqual);

  useEffect(() => {
    dispatch(getUsersBookshelves());
  }, [dispatch]);

  const { values, onChange } = useForm<CreateBookshelfDto>(initialFormValues);

  const { bookshelfName } = values;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createBookshelf(values));
  };

  return (
    <Fragment>
      <Container maxWidth="md">
        <Typography component="h4" variant="h4">
          Create Bookshelf
        </Typography>
        <form onSubmit={onSubmit}>
          <Grid container direction="row" alignItems="center">
            <TextField
              error={inputErrors.bookshelfName ? true : false}
              helperText={inputErrors.bookshelfName}
              name="bookshelfName"
              value={bookshelfName}
              onChange={onChange}
              label="New Bookshelf Name"
            />
            <Button variant="outlined" type="submit">
              Create
            </Button>
          </Grid>
        </form>
      </Container>

      <Container maxWidth="md">
        <Typography component="h4" variant="h4">
          View Bookshelves
        </Typography>

        <div>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Accordion 1</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>Accordion 2</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </Container>
    </Fragment>
  );
};

export default Bookshelf;

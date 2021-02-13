import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { useAppDispatch } from "app/store";
import React from "react";
import { useForm } from "utils/useForm";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { searchBooks, SearchInfo } from "features/bookSearch";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "app/rootReducer";

const useStyles = makeStyles({
  root: {
    marginTop: "1rem",
    marginBottom: "1rem",
  },
  form: {
    width: "80%",
  },
  inputField: {
    "& .MuiInputBase-input": {
      padding: ".8rem",
    },
  },
  searchDetailsInput: {
    margin: ".5rem",
  },
  searchBtn: {
    padding: ".6rem 1.2rem .6rem 1.2rem",
  },
});

const BookSearchBar = () => {
  const classes = useStyles();

  const { inputErrors } = useSelector((state: RootState) => {
    return {
      inputErrors: state.alerts.inputErrors,
    };
  }, shallowEqual);

  const { values, onChange } = useForm<SearchInfo>({
    generalSearch: "",
    title: "",
    author: "",
    publisher: "",
    subject: "",
    isbn: "",
    startIndex: 0,
    resultsPerPage: 40,
  });

  const { generalSearch, title, author, publisher, subject, isbn } = values;

  const dispatch = useAppDispatch();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // remove hyphens from isbn
    dispatch(searchBooks({ ...values, isbn: values.isbn.replace(/-/g, "") }));
  };

  return (
    <Grid className={classes.root} item container justify="center" xs={12}>
      <form className={classes.form} onSubmit={onSubmit}>
        <Grid container justify="flex-end" alignItems="flex-end">
          <TextField
            error={inputErrors.emptySearchTerm ? true : false}
            helperText={inputErrors.emptySearchTerm}
            id="general-search"
            name="generalSearch"
            value={generalSearch}
            onChange={onChange}
            label="Search field"
            type="search"
            className={classes.inputField}
          />
          <Button
            className={classes.searchBtn}
            variant="contained"
            color="primary"
            type="submit"
          >
            Submit
          </Button>
          <Grid item xs={12}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Search Details</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container justify="center">
                  <TextField
                    name="title"
                    value={title}
                    onChange={onChange}
                    label="Title"
                    type="text"
                    className={`${classes.inputField} ${classes.searchDetailsInput}`}
                  />
                  <TextField
                    name="author"
                    value={author}
                    onChange={onChange}
                    label="Author"
                    type="text"
                    className={`${classes.inputField} ${classes.searchDetailsInput}`}
                  />

                  <TextField
                    name="subject"
                    value={subject}
                    onChange={onChange}
                    label="Subject"
                    type="text"
                    className={`${classes.inputField} ${classes.searchDetailsInput}`}
                  />
                  <TextField
                    name="publisher"
                    value={publisher}
                    onChange={onChange}
                    label="Publisher"
                    type="text"
                    className={`${classes.inputField} ${classes.searchDetailsInput}`}
                  />
                  <TextField
                    name="isbn"
                    value={isbn}
                    onChange={onChange}
                    label="ISBN"
                    type="text"
                    className={`${classes.inputField} ${classes.searchDetailsInput}`}
                  />
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};

export default BookSearchBar;

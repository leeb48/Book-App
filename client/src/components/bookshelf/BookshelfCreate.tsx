import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
} from "@material-ui/core";
import { RootState } from "app/rootReducer";
import { useAppDispatch } from "app/store";
import { CreateBookshelfDto, createBookshelf } from "features/bookshelf";
import React from "react";
import { useSelector, shallowEqual } from "react-redux";
import { useForm } from "utils/useForm";

const initialFormValues: CreateBookshelfDto = {
  bookshelfName: "",
};

const BookshelfCreate = () => {
  const dispatch = useAppDispatch();
  const { inputErrors } = useSelector((state: RootState) => {
    return {
      inputErrors: state.alerts.inputErrors,
    };
  }, shallowEqual);

  const { values, onChange, setValues } = useForm<CreateBookshelfDto>(
    initialFormValues
  );

  let { bookshelfName } = values;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createBookshelf(values));
    setValues({ bookshelfName: "" });
  };

  return (
    <Container maxWidth="md">
      <Grid container justify="space-between" style={{ marginTop: "2rem" }}>
        <Grid item>
          <Typography component="h4" variant="h4">
            Create Bookshelf
          </Typography>
        </Grid>

        <Grid item>
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
              <Button
                style={{ padding: "10px 20px 10px 20px" }}
                variant="outlined"
                color="primary"
                type="submit"
              >
                Create
              </Button>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BookshelfCreate;
